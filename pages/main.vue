<template>
  <div class="container">
  <div class="loadingIcon pulsing" ref="loadingIcon">
    LOADING
  </div>
  <div class="loading-wrapper" ref="loadingWrapper">
    <audio ref="music">
      <source :src="$store.state.content.mainScore" type="audio/mpeg">
    </audio>
    <div role="button" class="music-controls btn visually-hidden">
      <span v-if="!isMusicPlaying" @click="playMusic">
        Play Music ►
      </span>
      <span v-else @click="pauseMusic">
        Pause Music || 
      </span>
    </div>
    <div class="vid-grid" ref="vidGrid">
      <div 
        v-for="item in vidsFromStore" 
        :key="item.id"
        class="vid-grid-item"
      > 
        <div 
          class="video-iframe-wrapper" 
          @click="play">
          <vimeo-player 
            ref="player" 
            :key="item.id"
            :video-id="item.fields.VideoID" 
            :options="options"
            :video-url="item.fields.PrivateLink" 
            :player-height="height" 
            @ready="onReady"
            @ended="ended">
          </vimeo-player>
        </div>
        <nuxt-link 
          :to="{ path: `stories/${item.fields.Order}` }"
          class="link-overlay"
        > 
        </nuxt-link>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// import VideoEmbedItem from '~/components/VideoEmbedItem.vue'

export default {
  // fetch({ store, params, $axios }) {
  //   return $axios.get('https://proxy.russellfavret.com/?rest_route=/wp/v2/vimeotest').then(res => {
  //       store.commit('content/setData', res.data)
  //   })
  // },
  data() {
    return {
      isMounted: false,
      isMusicPlaying: false,
      height: 500,
      options: {
        autoplay: true,
        controls: false,
        loop: false,
        muted: true
      },
      playerReady: false,
      readyCount: 0
    }
  },
  computed: {
    vidsFromStore: function() {
      return this.$store.state.content.records;
    },
    videoId: function() {
      // return this.$store.state.content.data[0].ACF.video_id
      return ''
    },
    videoUrl: function() {
      // return this.$store.state.content.data[0].ACF.video_url
      return ''
    },
    numVids: function() {
      // return this.$store.state.content.data.length;
      return 12;
    }
  },
  methods: {
    onReady() {
      this.playerReady = true;
      this.readyCount++;
      console.log('im ready')
    },
    play (el) {
      el.play();
      console.log('played', el)
    },
    pause () {
      this.$refs.player.pause()
    },
    ended () {
      console.log('ended!')
      this.pauseMusic();
    },
    playMusic() {
      if (this.$refs.music) {
        this.$refs.music.play();
        this.isMusicPlaying = true;
      }
    },
    pauseMusic() {
      if (this.$refs.music) {
        this.$refs.music.pause();
        this.isMusicPlaying = false;
      }
    }
  },
  mounted() {
    this.isMounted = true;
    this.$refs.player.forEach(p => {
      p.$el.style.opacity = 0;
    })
  },
  watch: {
    readyCount() {
      if (this.readyCount === this.numVids) {
        this.$refs.player.forEach(p => {
          this.play(p)
          p.$el.classList.add('fadeIn');
        })
        this.$refs.loadingIcon.classList.remove('pulsing');
        this.$refs.loadingIcon.classList.add('fadeOut');
        this.playMusic();
        // this.$refs.loadingWrapper.classList.add('fadeIn');
      }
    }
  }
}
</script>

<style lang="scss">


</style>
