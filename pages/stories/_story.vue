<template>
  <div class="container">
    <nuxt-link to="/">
      Back
    </nuxt-link>
    
    <div class="full-width">
      <div 
        class="video-iframe-wrapper" 
        @click="play">
        <vimeo-player 
          ref="player" 
          :video-id="277006925" 
          :options="options"
          :video-url="videoUrl" 
          :player-height="height" 
          @ready="onReady"
          @ended="ended">
        </vimeo-player>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      videoID: 'some-id',
      videoUrl: 'https://vimeo.com/277006925/c16e626108',
      height: 500,
      options: {
        autoplay: true,
        controls: false,
        loop: false,
        muted: true
      },
      playerReady: false
    }
  },
  methods: {
    onReady() {
      this.playerReady = true
    },
    play () {
      this.$refs.player.play();
      console.log('played')
    },
    pause () {
      this.$refs.player.pause()
    },
    ended () {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
a {
  color: white;
  text-decoration: none;
}

.full-width > div {
  width: 1280px;
  height: 720px;
  margin: 0 auto;
}
</style>
