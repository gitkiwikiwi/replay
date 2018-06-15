<template>
  <div class="hello landing">
    <div>
    <h1 class="landing-title">Welcome to Replay</h1>
      <div class="landing-logo">
          <img src="https://raw.githubusercontent.com/cryptocracy/images/master/replay.png" alt="Replay" height="168" width="168">
      </div>
    <div class="landing-subtitle">
      <p>A decentralized video sharing app that gives YOUR video's Blockchain SUPER POWERS</p>
    </div>
        <div class="landing-button"><md-button class="btn landing btn-default" @click="signIn">Sign In With Blockstack</md-button></div>
    <div class="landing-heros">
          <img src="https://raw.githubusercontent.com/cryptocracy/images/master/replay_heros.png" alt="Replay" height="250" width="250">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },

  methods: {
    signIn () {
      const blockstack = this.blockstack
      blockstack.redirectToSignIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/app.scss";
@import "../assets/sass/main.scss";

</style>
