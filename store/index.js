import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAt0a3PJg5LttNk1minti2mRn54Z2v1N30",
  authDomain: "temp-78c5e.firebaseapp.com",
  databaseURL: "https://temp-78c5e.firebaseio.com",
  projectId: "temp-78c5e",
  storageBucket: "temp-78c5e.appspot.com",
  messagingSenderId: "552054938858",
  appId: "1:552054938858:web:2a2fb4ae4e6c9e1a"
};

export const state = () => ({
  votes: false,
  aircon1: false,
  aircon2: false,
  aircon3: false,
  currentTemp: 0,
  weatherIcon: '',
  tempColour: false,
  currentDate: null,
  votingOverlay: false,
  currentDeskName: '',
  votingDesk: 0,
  votes: [],
  desks: []
})

export const mutations = {
  setValue (state, data) {
    state[data[0]] = data[1];
  },
  updateAircon(state, data) {
    firebase.firestore().collection('aircons').doc('aircons').update({
      [data[0]]: data[1]
    });
  },
  updateName(state, data) {
    state.currentDeskName = data;
    let desks = firebase.firestore().collection('desks');
    desks.get().then(function(querySnapshoter) {
      querySnapshoter.forEach(function(doc) {
        let deskData = doc.data();
        if(parseInt(deskData.desk) == state.votingDesk){
          doc.ref.update({
            name: data
          })
        }
      });
    });
  },
  addVote: function (state, data){
    let vote = {
      date: state.currentDate,
      desk: state.votingDesk,
      temperature: data
    }

    var votings = firebase.firestore().collection('votes').where('desk','==', state.votingDesk);
    votings.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
        firebase.firestore().collection('votes').add(vote);
      });
    });

    state.votingOverlay = false;
  },
}

export const actions = {
  async getVotes (context) {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let dateString = date + "-" + (month + 1) + "-" + year;

    // Set current date
    context.commit('setValue', ['currentDate', dateString]);

    firebase.initializeApp(config);
    const db = firebase.firestore();

    // Get aircon data
    db.collection("aircons").doc("aircons").onSnapshot(app => {
      let data = app.data();
      let aircon1 = data.aircon1;
      let aircon2 = data.aircon2;
      let aircon3 = data.aircon3;

      context.commit("setValue", ['aircon1', aircon1]);
      context.commit("setValue", ['aircon2', aircon2]);
      context.commit("setValue", ['aircon3', aircon3]);
    });

    // Set todays votes
    db.collection("votes").where('date', '==', context.state.currentDate).onSnapshot(snapshot => {
      const votes = [];

      snapshot.forEach(vote => {
        let data = vote.data();
        votes.push({
          desk: data.desk,
          temperature: data.temperature
        });
      });
      context.commit("setValue", ['votes', votes]);
    });

    // Set desk names
    db.collection("desks").onSnapshot(snapshot => {
      const desks = [];

      snapshot.forEach(desk => {
        let data = desk.data();
        desks.push({
          desk: data.desk,
          name: data.name
        });
      });
      context.commit("setValue", ['desks', desks]);
    });
  },
  async weatherBalloon ({ commit }) {
    // Openweather api key
    const key = '7cfeac2222e6f542eb12905cf4510851';

    // Get temperature
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=' + key)
    .then(function(resp) {
      return resp.json(); // Convert data to json
    })
    .then(function(data) {
      // Set temperature
      let celcius = Math.round(parseFloat(data.main.temp)-273.15);
      commit('setValue', ['currentTemp', celcius]);

      // Set weather icon
      let weatherIcon = data.weather[0].main;

      // Check if beer hour
      const currentDate = new Date();

      if(currentDate.getDay() == 5 && currentDate.getHours() >= 16) {
        weatherIcon = "Beer";
      }
      commit('setValue', ['weatherIcon', weatherIcon]);

      // Set weather overlay colour
      let colour = '#00c4ff';

      if(celcius > 0) {
        colour = '#00c4ff';
      }
      if(celcius > 10) {
        colour = '#FFB347';
      }
      if(celcius > 18) {
        colour = '#FF6961';
      }
      commit('setValue', ['tempColour', colour]);
    });
  }
}

