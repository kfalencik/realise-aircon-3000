<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="inside col-lg-8 col-xs-12">

          <VotingOverlay></VotingOverlay>

          <div class="inside__wrapper">
            <div class="inside__office-side">
              <Desk v-for="index in [1,2,3,4,5]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [6,7,8,9,10]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [11,12,13,14,15]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [16,17,18,19,20]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [21,22,23,24,25]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [26,27,28,29,30]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [31,32,33,34,35]" :key="index" :desk="index"></Desk>
            </div>
            <div class="inside__office-side">
              <Desk v-for="index in [36,37,38,39,40]" :key="index" :desk="index"></Desk>
            </div>

            <div class="inside__office-tv"></div>



            <div class="inside__aircons">
              <Aircon airconNumber="aircon1"></Aircon>
              <Aircon airconNumber="aircon2"></Aircon>
              <Aircon airconNumber="aircon3"></Aircon>
            </div>

            <div class="inside__heating">
              <span><input type="text" @keyup="updateHeating('input', $event)" :value="centralHeating" />°C</span>
              <div class="inside__heating-controls">
                <i class="fas fa-caret-up" @click="updateHeating(centralHeating + 1)"></i>
                <i class="fas fa-caret-down" @click="updateHeating(centralHeating - 1)"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="outside col-lg-4 col-xs-12">
          <div class="outside__temp-tint" :style="'background: ' + tempColour"></div>
          <div class="outside__wrapper">
            <div class="outside__temperature">
              <span>{{ currentTemp }}°C</span>

              <div class="outside__icon">
                <img src="~assets/img/clouds.png" v-if="weatherIcon == 'Clouds'" />
                <img src="~assets/img/clear.png" v-if="weatherIcon == 'Clear'" />
                <img src="~assets/img/snow.png" v-if="weatherIcon == 'Snow'" />
                <img src="~assets/img/rain.png" v-if="weatherIcon == 'Rain'" />
                <img src="~assets/img/drizzle.png" v-if="weatherIcon == 'Drizzle'" />
                <img src="~assets/img/thunderstorm.png" v-if="weatherIcon == 'Thunderstorm'" />
                <img src="~assets/img/beer.png" v-if="weatherIcon == 'Beer'" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <canvas></canvas>

    <audio controls>
      <source src="bark.mp3" type="audio/mp3">
    </audio>
  </section>
</template>

<script>
  import Desk from './Desk';
  import Aircon from './Aircon';
  import VotingOverlay from './VotingOverlay';

  export default{
    components: {
      Desk,
      Aircon,
      VotingOverlay
    },
    computed: {
      currentTemp () {
        return this.$store.state.currentTemp;
      },
      weatherIcon () {
        return this.$store.state.weatherIcon;
      },
      tempColour () {
        return this.$store.state.tempColour;
      },
      centralHeating () {
        return this.$store.state.centralHeating;
      }
    },
    methods: {
      updateHeating: function(value, event) {
        if (value === 'input') {
          value = parseInt(event.target.value);
        }

        if (value > 0 && value < 50) {
          this.$store.commit('updateHeating', value);
        }
      }
    },
    watch: {
      weatherIcon (){
        if(this.weatherIcon == 'Beer') {
          let canvas = document.querySelector('canvas');
          let ctx = canvas.getContext('2d');

          canvas.width = document.body.clientWidth;
          canvas.height = document.body.clientHeight;

          let centerX = canvas.width / 2;
          let centerY = canvas.height / 2;
          let offsetX = 0;
          let mouseX = 0;
          let mouseDown = false;
          let time;
          let beerImg = document.createElement('img');
          let beer = {
            img: beerImg,
            width: 0,
            height: 0,
            x: centerX,
            y: centerY
          };

          let beers = [];
          let count = document.body.clientWidth < 424 ? 1 : 20;

          function addbeer(x, y, w) {
            beers.push({
              x: x,
              y: y,
              w: w,
              h: Math.ceil(w * beer.height / beer.width),
              v: w * 0.003,
              r: 0
            });

            console.log(beers);
          }

          function update(dt) {
            for(let i = 0; i < beers.length; i++) {
              beers[i].y += dt * beers[i].v + i * 0.003;
              beers[i].x = beers[i].x + (offsetX * beers[i].v * 0.1);
              //beers[i].r += Math.sin(dt + 0.04) * 0.01;

              if (mouseDown) {
                offsetX = mouseX - centerX;
              }

              if (beers[i].y > canvas.height) {
                beers[i].x = Math.random() * canvas.width;
                beers[i].y = -beers[i].h;
              }
            }
          }

          function draw() {
            requestAnimationFrame(draw);

            let now = new Date().getTime();
            let dt = now - (time || now);
            time = now;
            update(dt);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < beers.length; i++) {
              if (beers[i].x < canvas.width && beers[i].y < canvas.height) {
                ctx.save()
                ctx.translate(beers[i].x, beers[i].y);
                ctx.rotate(beers[i].r);
                ctx.drawImage(
                  beer.img,
                  -beers[i].w / 2,
                  0,
                  beers[i].w,
                  beers[i].h,
                );
                ctx.translate(-beers[i].x,-beers[i].y);
                ctx.restore()
              }
            }
          }

          beer.img.src = 'beer1.png';

          beer.img.onload = function() {
            beer.width = beer.img.width / 2;
            beer.height = beer.img.height / 2;
            beer.x = centerX - beer.width / 2;
            beer.y = centerY - beer.height / 2;

            for (let i = 0; i < count; i++) {
              addbeer(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                (beer.width * 0.3) + Math.random() * (beer.width * 0.5)
              )
            }

            for (let i = 0; i < count; i++) {
              addbeer(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                (beer.width * 0.3) + Math.random() * (beer.width * 0.5)
              )
            }

            draw();
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.inside {
  background: #333;
  height: 100vh;
  position: relative;
  background-size: 100px;
  border-right: 10px solid brown;
  overflow: hidden;
  padding-top: 50px;

  @media (max-width: $breakpoint-sm) {
    border-bottom: 10px solid brown;
    border-right: none;
    height: 450px;
    padding-top: 0;
  }

  &__office-tv {
    width: 100px;
    height: 5px;
    background: #999;
    box-shadow: 0 0 10px rgba(255,255,255,0.8);
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  &__office-side {
    width: 50%;
    float: left;
    padding: 50px 70px 0 0;
    position: relative;

    &:nth-child(even) {
      float: right;
      padding-right: 0;
      padding-left: 70px;

      .desk {
        float: right;

        &:nth-child(5) {
          left: auto;
          right: calc(70% - 50px);
          background-position: center;
        }
      }
    }
  }

  &__heating {
    border: 2px solid #666;
    background: #eee;
    width: 120px;
    height: 75px;
    position: absolute;
    top: 700px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;

    &::after {
      background: #666;
      width: 25px;
      height: 25px;
      border-radius: 100%;
      display: block;
      content: '';
      position: absolute;
      bottom: 10px;
      left: 10px;
    }

    &-controls {
      margin-left: 10px;
      margin-top: 5px;
    }

    span {
      border: 2px solid #666;
      background: #7bbede;
      float: right;
      color: #eee;
      margin: 10px;
      padding: 5px 10px;

      input {
        display: inline-block;
        background: none;
        border: none;
        color: #fff;
        width: 20px;
        font-size: inherit;
      }
    }
  }
}

.outside {
  background: url(~assets/img/cars.jpg);
  border-left: 10px solid brown;
  background-size: 100%;
  height: 100vh;
  position: relative;

  @media (max-width: $breakpoint-sm) {
    border-bottom: 10px solid brown;
    border-left: none;
    height: 480px;
  }

  &__temp-tint {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.5;
    left: 0;
    top: 0;
    mix-blend-mode: overlay;
  }

  &__temperature {
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
    z-index: 6;

    span {
      position: relative;
      z-index: 10;
    }
  }

  &__icon {
    position: absolute;
    z-index: 8;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 125px;
    height: 125px;
  }
}

audio {
  display: none;
}

canvas {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
}
</style>
