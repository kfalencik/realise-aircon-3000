<template>
  <div>
    <Main />
  </div>
</template>

<script>
import Main from '~/components/Main.vue';

export default {
  components: {
    Main
  },
  mounted: function(){
    this.$store.dispatch('getVotes');
    this.$store.dispatch('weatherBalloon');
  }
}
</script>
