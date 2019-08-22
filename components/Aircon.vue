<template>
  <div @click="updateAircon(airconNumber, !aircon)" :class="{'aircon': true, 'active': aircon}"></div>
</template>

<script>
export default {
  props: ['airconNumber'],
  computed: {
    aircon () {
      return this.$store.state[this.airconNumber];
    }
  },
  methods: {
    updateAircon: function(aircon, value){
      this.$store.commit('updateAircon', [aircon, value]);
    }
  }
}
</script>


<style lang="scss" scoped>
.aircon{
  border: 2px solid #eee;
  background: #666;
  background-size: 100%;
  width: 80px;
  height: 120px;
  position: absolute;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;

  @media (max-width: $breakpoint-sm){
    width: 40px;
    height: 60px;
    top: 45px;
  }

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

    @media (max-width: $breakpoint-sm){
      height: 20px;
      width: 20px;
      left: 8px;
      top: 20px;
    }
  }

  &:nth-child(2){
    top: 300px;

    @media (max-width: $breakpoint-sm){
      top: 145px;
    }
  }

  &:nth-child(3){
    top: 490px;

    @media (max-width: $breakpoint-sm){
      top: 245px;
    }
  }

  &.active{
    box-shadow: 0 0 50px rgb(109, 184, 253);
    animation: pulse 1s infinite linear;

    &::after{
      animation: spin 1s infinite linear;
    }
  }
}
</style>
