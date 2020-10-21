<template>
  <div class="container">
    <audio ref="music">
      <source src="song-comp.mp3" type="audio/mpeg">
    </audio>
    <div class="music-btn">
      <div v-if="!isMusicPlaying" @click="playMusic">
        <p>Play Music</p>
      </div>
      <div v-else @click="pauseMusic">
        <p>Pause Music</p>
      </div>
    </div>
    <client-only>
    <div class="vid-grid">
      <div 
        v-for="(item,index) in numVids" 
        :key="index"
        class="vid-grid-item"
      > 
        <div 
          class="video-iframe-wrapper" 
          @click="play">
          <vimeo-player 
            ref="player" 
            :video-id="videoId" 
            :options="options"
            :video-url="videoUrl" 
            :player-height="height" 
            @ready="onReady"
            @ended="ended">
          </vimeo-player>
        </div>
        <nuxt-link 
          :to="'stories/' + index"
          class="link-overlay"
        > 
        </nuxt-link>
      </div>
    </div>
    </client-only>
  </div>
</template>

<script>
// import VideoEmbedItem from '~/components/VideoEmbedItem.vue'

export default {
  fetch({ store, params, $axios }) {
    return $axios.get('https://proxy.russellfavret.com/?rest_route=/wp/v2/vimeotest').then(res => {
        store.commit('api/setData', res.data)
    })
  },
  data() {
    return {
      numVids: 12,
      isMusicPlaying: false,
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
  computed: {
    videoId: function() {
      return this.$store.state.api.data[0].ACF.video_id
    },
    videoUrl: function() {
      return this.$store.state.api.data[0].ACF.video_url
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
      console.log('ended!')
      this.pauseMusic();
    },
    playMusic() {
      this.$refs.music.play();
      this.isMusicPlaying = true;
    },
    pauseMusic() {
      this.$refs.music.pause();
      this.isMusicPlaying = false;
    }
  },
  mounted() {
    this.playMusic();
  }
}
</script>

<style lang="scss">

body {
  background: #000;
  color: #fff;
  font-family: sans-serif;
}

.big.video-iframe-wrapper {
  width: 100vw;
  height: 100vh;
}

.video-iframe-wrapper div,
.video-iframe-wrapper iframe {
  width: 100%;
  height: 100%;
}

.vid-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 25vh;
}

.vid-grid-item {
  position: relative;
  
  .link-overlay,
  .video-iframe-wrapper {
    position: absolute;
    top: 0;
  }
  .link-overlay {
    position: absolute;
    top: 0;
    display: block;
    height: 100%;
    width: 100%;
  }
}


</style>
