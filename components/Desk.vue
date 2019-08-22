<template>
  <button class="desk" @click="enableDeskVote(desk)" :temp="deskTemp(desk)" :title="deskName(desk)"><span>{{deskName(desk)}}</span></button>
</template>

<script>
export default {
  props: ['desk'],
  computed: {
    votes (){
      return this.$store.state.votes;
    },
    desks () {
      return this.$store.state.desks;
    },
    currentDeskName () {
      return this.$store.state.currentDeskName;
    },
  },
  methods: {
    deskTemp: function(desk) {
      let votes = this.votes;
      let temperature = null;

      votes.forEach(function(vote) {
        if (vote.desk == desk) {
          temperature = vote.temperature;
        }
      });

      return temperature;
    },
    deskName: function(deskId) {
      let desks = this.desks;
      let name = '';
      desks.forEach(function(desk) {
        if (desk.desk == deskId) {
          name = desk.name;
        }
      });

      return name;
    },
    enableDeskVote: function(desk) {
      this.$store.commit('setValue', ['votingOverlay', true]);
      this.$store.commit('setValue', ['votingDesk', desk]);

      let desks = this.desks;
      let name = '';
      desks.forEach(function(deskNode) {
        if (deskNode.desk == desk) {
          name = deskNode.name;
        }
      })

      this.$store.commit('setValue', ['currentDeskName', name]);
    }
  }
}
</script>

<style lang="scss" scoped>
.desk{
  width: 35%;
  height: 70px;
  background: #fff;
  background-size: 50px;
  border-radius: 5px;
  border: 2px solid #666;
  float: left;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

  @media (max-width: $breakpoint-sm){
    height: 25px;
  }

  &:hover{
    background-color: #eee;
  }

  span{
    background: #fff;
    padding: 10px 15px;
    border-radius: 10px;

    @media (max-width: $breakpoint-sm){
      display: none;
    }
  }

  &:nth-child(5){
    position: absolute;
    width: 70px;
    left: calc(70% - 50px);
    height: calc(100% - 50px);
    background-position: center;

    @media (max-width: $breakpoint-sm){
      width: 25px;
    }

    span{
      transform: rotate(-90deg);
    }
  }

  &[temp="cold"]{
    background-color: #a4eaff;
  }
  &[temp="good"]{
    background-color: #a4ffb3;
  }
  &[temp="hot"]{
    background-color: rgb(255, 147, 141);
  }
}
</style>
