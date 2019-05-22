<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="inside col-lg-8 col-xs-12">
          <div v-if="votingOverlay" class="voting-overlay">
            <div class="voting-overlay__wrapper">
              <input type="text" :value="currentDeskName" @keyup="changeName" placeholder="Type in your name" />
              <p>How is the temperature?</p>
              <div class="voting-overlay__options">
                <button class="btn" @click="addVote('cold')">Too cold</button>
                <button class="btn" @click="addVote('good')">All good</button>
                <button class="btn" @click="addVote('hot')">Too warm</button>
              </div>
            </div>
          </div>
          <div class="inside__wrapper">

            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(1)" :key="1" :temp="deskTemp(1)" :title="deskName(1)"><span>{{deskName(1)}}</span></button>
              <button class="desk" @click="enableDeskVote(2)" :key="2" :temp="deskTemp(2)" :title="deskName(2)"><span>{{deskName(2)}}</span></button>
              <button class="desk" @click="enableDeskVote(3)" :key="3" :temp="deskTemp(3)" :title="deskName(3)"><span>{{deskName(3)}}</span></button>
              <button class="desk" @click="enableDeskVote(4)" :key="4" :temp="deskTemp(4)" :title="deskName(4)"><span>{{deskName(4)}}</span></button>
              <button class="desk" @click="enableDeskVote(5)" :key="5" :temp="deskTemp(5)" :title="deskName(5)"><span>{{deskName(5)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(6)" :key="6" :temp="deskTemp(6)" :title="deskName(6)"><span>{{deskName(6)}}</span></button>
              <button class="desk" @click="enableDeskVote(7)" :key="7" :temp="deskTemp(7)" :title="deskName(7)"><span>{{deskName(7)}}</span></button>
              <button class="desk" @click="enableDeskVote(8)" :key="8" :temp="deskTemp(8)" :title="deskName(8)"><span>{{deskName(8)}}</span></button>
              <button class="desk" @click="enableDeskVote(9)" :key="9" :temp="deskTemp(9)" :title="deskName(9)"><span>{{deskName(9)}}</span></button>
              <button class="desk" @click="enableDeskVote(10)" :key="10" :temp="deskTemp(10)" :title="deskName(10)"><span>{{deskName(10)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(11)" :key="11" :temp="deskTemp(11)" :title="deskName(11)"><span>{{deskName(11)}}</span></button>
              <button class="desk" @click="enableDeskVote(12)" :key="12" :temp="deskTemp(12)" :title="deskName(12)"><span>{{deskName(12)}}</span></button>
              <button class="desk" @click="enableDeskVote(13)" :key="13" :temp="deskTemp(13)" :title="deskName(13)"><span>{{deskName(13)}}</span></button>
              <button class="desk" @click="enableDeskVote(14)" :key="14" :temp="deskTemp(14)" :title="deskName(14)"><span>{{deskName(14)}}</span></button>
              <button class="desk" @click="enableDeskVote(15)" :key="15" :temp="deskTemp(15)" :title="deskName(15)"><span>{{deskName(15)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(16)" :key="16" :temp="deskTemp(16)" :title="deskName(16)"><span>{{deskName(16)}}</span></button>
              <button class="desk" @click="enableDeskVote(17)" :key="17" :temp="deskTemp(17)" :title="deskName(17)"><span>{{deskName(17)}}</span></button>
              <button class="desk" @click="enableDeskVote(18)" :key="18" :temp="deskTemp(18)" :title="deskName(18)"><span>{{deskName(18)}}</span></button>
              <button class="desk" @click="enableDeskVote(19)" :key="19" :temp="deskTemp(19)" :title="deskName(19)"><span>{{deskName(19)}}</span></button>
              <button class="desk" @click="enableDeskVote(20)" :key="20" :temp="deskTemp(20)" :title="deskName(20)"><span>{{deskName(20)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(21)" :key="21" :temp="deskTemp(21)" :title="deskName(21)"><span>{{deskName(21)}}</span></button>
              <button class="desk" @click="enableDeskVote(22)" :key="22" :temp="deskTemp(22)" :title="deskName(22)"><span>{{deskName(22)}}</span></button>
              <button class="desk" @click="enableDeskVote(23)" :key="23" :temp="deskTemp(23)" :title="deskName(23)"><span>{{deskName(23)}}</span></button>
              <button class="desk" @click="enableDeskVote(24)" :key="24" :temp="deskTemp(24)" :title="deskName(24)"><span>{{deskName(24)}}</span></button>
              <button class="desk" @click="enableDeskVote(25)" :key="25" :temp="deskTemp(25)" :title="deskName(25)"><span>{{deskName(25)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(26)" :key="26" :temp="deskTemp(26)" :title="deskName(26)"><span>{{deskName(26)}}</span></button>
              <button class="desk" @click="enableDeskVote(27)" :key="27" :temp="deskTemp(27)" :title="deskName(27)"><span>{{deskName(27)}}</span></button>
              <button class="desk" @click="enableDeskVote(28)" :key="28" :temp="deskTemp(28)" :title="deskName(28)"><span>{{deskName(28)}}</span></button>
              <button class="desk" @click="enableDeskVote(29)" :key="29" :temp="deskTemp(29)" :title="deskName(29)"><span>{{deskName(29)}}</span></button>
              <button class="desk" @click="enableDeskVote(30)" :key="30" :temp="deskTemp(30)" :title="deskName(30)"><span>{{deskName(30)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(31)" :key="31" :temp="deskTemp(31)" :title="deskName(31)"><span>{{deskName(31)}}</span></button>
              <button class="desk" @click="enableDeskVote(32)" :key="32" :temp="deskTemp(32)" :title="deskName(32)"><span>{{deskName(32)}}</span></button>
              <button class="desk" @click="enableDeskVote(33)" :key="33" :temp="deskTemp(33)" :title="deskName(33)"><span>{{deskName(33)}}</span></button>
              <button class="desk" @click="enableDeskVote(34)" :key="34" :temp="deskTemp(34)" :title="deskName(34)"><span>{{deskName(34)}}</span></button>
              <button class="desk" @click="enableDeskVote(35)" :key="35" :temp="deskTemp(35)" :title="deskName(35)"><span>{{deskName(35)}}</span></button>
            </div>
            <div class="inside__office-side">
              <button class="desk" @click="enableDeskVote(36)" :key="36" :temp="deskTemp(36)" :title="deskName(36)"><span>{{deskName(36)}}</span></button>
              <button class="desk" @click="enableDeskVote(37)" :key="37" :temp="deskTemp(37)" :title="deskName(37)"><span>{{deskName(37)}}</span></button>
              <button class="desk" @click="enableDeskVote(38)" :key="38" :temp="deskTemp(38)" :title="deskName(38)"><span>{{deskName(38)}}</span></button>
              <button class="desk" @click="enableDeskVote(39)" :key="39" :temp="deskTemp(39)" :title="deskName(39)"><span>{{deskName(39)}}</span></button>
              <button class="desk" @click="enableDeskVote(40)" :key="40" :temp="deskTemp(40)" :title="deskName(40)"><span>{{deskName(40)}}</span></button>
            </div>

            <div class="inside__office-tv"></div>

            <div class="inside__aircons">
              <div @click="updateAircon('aircon1', !aircon1)" :class="{'aircon': true, 'active': aircon1}"></div>
              <div @click="updateAircon('aircon2', !aircon2)" :class="{'aircon': true, 'active': aircon2}"></div>
              <div @click="updateAircon('aircon3', !aircon3)" :class="{'aircon': true, 'active': aircon3}"></div>
              <div @click="bark" class="monty"><img src="~assets/img/monty.jpg"></div>
            </div>
          </div>
        </div>

        <div class="outside col-lg-4 col-xs-12">
          <div class="outside__temp-tint" :style="'background: ' + tempColour"></div>
          <div class="outside__wrapper">
            <div class="outside__temperature">{{ currentTemp }}°C</div>
          </div>
        </div>
      </div>
    </div>

    <audio controls>
      <source src="bark.mp3" type="audio/mp3">
    </audio>
  </section>
</template>

<script>
  export default{
    data: function(){
      return{

      }
    },
    computed: {
      votes (){
        return this.$store.state.votes;
      },
      currentTemp () {
        return this.$store.state.currentTemp;
      },
      tempColour () {
        return this.$store.state.tempColour;
      },
      aircon1 () {
        return this.$store.state.aircon1;
      },
      aircon2 () {
        return this.$store.state.aircon2;
      },
      aircon3 () {
        return this.$store.state.aircon3;
      },
      votingOverlay () {
        return this.$store.state.votingOverlay;
      },
      currentDeskName () {
        return this.$store.state.currentDeskName;
      },
      desks () {
        return this.$store.state.desks;
      }
    },
    methods: {
      bark: function(){
        var audio = document.querySelector('audio');
        audio.play();
      },
      updateAircon: function(aircon, value){
        this.$store.commit('updateAircon', [aircon, value]);
      },
      enableDeskVote: function(desk){
        this.$store.commit('setValue', ['votingOverlay', true]);
        this.$store.commit('setValue', ['votingDesk', desk]);

        let desks = this.desks;
        let name = '';
        desks.forEach(function(deskNode){

          if(deskNode.desk == desk){
            name = deskNode.name;
          }
        })

        this.$store.commit('setValue', ['currentDeskName', name]);
      },
      addVote: function(temp){
        this.$store.commit('addVote', temp);
      },
      deskTemp: function(desk){
        let votes = this.votes;
        let temperature = null;
        votes.forEach(function(vote){

          if(vote.desk == desk){
            temperature = vote.temperature;
          }
        })

        return temperature;
      },
      deskName: function(deskId){
        let desks = this.desks;
        let name = '';
        desks.forEach(function(desk){

          if(desk.desk == deskId){
            name = desk.name;
          }
        })

        return name;
      },
      changeName: function(event){
        this.$store.commit('updateName', event.target.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .inside{
    background: #333;
    height: 100vh;
    position: relative;
    background-size: 100px;
    border-right: 10px solid brown;
    overflow: hidden;
    padding-top: 50px;

    &__office-tv{
      width: 100px;
      height: 5px;
      background: #999;
      box-shadow: 0 0 10px rgba(255,255,255,0.8);
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }

    &__office-side{
      width: 50%;
      float: left;
      padding: 50px 70px 0 0;
      position: relative;

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

        &:hover{
          background-color: #eee;
        }

        span{
          background: #fff;
          padding: 10px 15px;
          border-radius: 10px;
        }

        &:nth-child(5){
          position: absolute;
          width: 70px;
          left: calc(70% - 50px);
          height: calc(100% - 50px);
          background-position: center;

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

      &:nth-child(even){
        float: right;
        padding-right: 0;
        padding-left: 70px;

        .desk{
          float: right;

          &:nth-child(5){
            left: auto;
            right: calc(70% - 50px);
            background-position: center;
          }
        }
      }
    }

    .monty{
      width: 80px;
      height: 120px;
      position: absolute;
      top: 680px;
      left: calc(50% - 40px);
      border: 2px solid rgb(255, 187, 0);
      overflow: hidden;
      cursor: pointer;

      img{
        object-fit: cover;
        display: block;
        max-width: unset;
      }
    }

    .aircon{
      border: 2px solid #eee;
      background: #666;
      background-size: 100%;
      width: 80px;
      height: 120px;
      position: absolute;
      top: 110px;
      left: calc(50% - 40px);

      &::after{
        position: absolute;
        width: 40px;
        height: 40px;
        content: '';
        text-align: center;
        line-height: 40px;
        display: block;
        background: url(~assets/img/fan.png) no-repeat center;
        background-size: 40px;
        border-radius: 100%;
        top: 40px;
        left: 18px;
        transform-origin: center;
        transition: all .3s linear;
      }

      &:nth-child(2){
        top: 300px;
      }

      &:nth-child(3){
        top: 490px;
      }

      &.active{
        box-shadow: 0 0 50px rgb(109, 184, 253);
        animation: pulse 1s infinite linear;

        &::after{
          animation: spin 1s infinite linear;
        }
      }
    }

    .voting-overlay{
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before{
        z-index: 400;
        content: '';
        display: block;
        background: rgba(0,0,0,0.75);
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
      }

      &__wrapper{
        width: 640px;
        background: #fff;
        z-index: 500;
        padding: 20px;
        text-align: center;
        font-size: 20px;

        input{
          border: none;
          text-align: center;
          font-weight: bold;
          font-size: 30px;
          margin-bottom: 20px;
        }

        button{
          display: inline-block;
          margin: 15px 5px 0;
          background: rgb(102, 182, 108);

          &:first-child{
            background: rgb(107, 107, 255);
          }
          &:last-child{
            background: rgb(255, 107, 107);
          }
        }
      }
    }

  }
  .outside{
    background: url(~assets/img/cars.jpg);
    border-left: 10px solid brown;
    background-size: 100%;
    height: 100vh;
    position: relative;

    &__temp-tint{
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0.5;
      left: 0;
      top: 0;
      mix-blend-mode: overlay;
    }

    &__temperature{
      width: 150px;
      height: 150px;
      border-radius: 100%;
      background: #fff;
      border: 5px solid #000;
      color: #000;
      font-weight: bold;
      font-size: 60px;
      text-align: center;
      line-height: 140px;
      position: absolute;
      top: calc(50% - 75px);
      left: calc(50% - 75px);
    }
  }

  audio{
    display: none;
  }
</style>
