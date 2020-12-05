<template>
  <div class="container">
    <nuxt-link to="/">
      ←
    </nuxt-link>
  
    <div class="full-width">
      <div v-if="thisVideo.fields">
        <div 
          class="video-iframe-wrapper" 
          @click="play">
          <vimeo-player 
            ref="player" 
            :video-id="thisVideo.fields.VideoID" 
            :options="options"
            :video-url="thisVideo.fields.PrivateLink" 
            :player-height="height" 
            @ready="onReady"
            @ended="ended">
          </vimeo-player>
        </div>
        <div class="vid-info">
          <div class="text-wrapper">
            <h1>{{ thisVideo.fields.Name }}</h1>
            <h2>{{ thisVideo.fields.Location }}</h2>
          </div>
          <div class="next-btn btn" @click.prevent="nextVid">
            <p>→</p>
          </div>
        </div>
      </div>
      <div v-else>
        LOADING
      </div>
    </div>
  </div>
</template>

<script>
import { TweenLite } from 'gsap'

export default {
  data() {
    return {
      height: 500,
      options: {
        autoplay: true,
        controls: false,
        loop: false,
        muted: false
      },
      playerReady: false
    }
  },
  computed: {
    thisOrder() {
      return parseInt(this.$route.params.story);
    },
    thisVideo() {
      const content = this.$store.state.content.records;
      const thisOrder = this.thisOrder;
      const theMatch = content.filter( c => c.fields.Order === thisOrder);
      return theMatch[0];
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
    nextVid() {
      let thisOne = this.thisOrder;
      let nextPath;
      if (thisOne < 12) {
        nextPath = `/stories/${thisOne + 1}`;
      } else {
        nextPath = `/stories/1`;
      }
      this.$router.push(nextPath);
    },
    ended () {
      this.nextVid();
    }
  }
}
</script>

<style lang="scss">

</style>
