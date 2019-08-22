<template>
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
</template>

<script>
export default {
  computed: {
    votingOverlay () {
      return this.$store.state.votingOverlay;
    },
    currentDeskName () {
      return this.$store.state.currentDeskName;
    }
  },
  methods: {
    addVote: function(temp) {
      this.$store.commit('addVote', temp);
    },
    changeName: function(event) {
      this.$store.commit('updateName', event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.voting-overlay {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
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

  &__wrapper {
    width: 640px;
    background: #fff;
    z-index: 500;
    padding: 20px;
    text-align: center;
    font-size: 20px;

    input {
      border: none;
      text-align: center;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 20px;
    }

    button {
      display: inline-block;
      margin: 15px 5px 0;
      background: rgb(102, 182, 108);

      &:first-child {
        background: rgb(107, 107, 255);
      }
      &:last-child {
        background: rgb(255, 107, 107);
      }
    }
  }
}
</style>
