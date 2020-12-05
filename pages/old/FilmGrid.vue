<template>
  <div class="container">
    <p class="dev-info hide">
      {{ gridStateMsg }}
      </p>
    <div v-if="!areVideosSynced" class="dev-info">
        Loading....
    </div>
    <div v-if="areVideosSynced" class="dev-info">
        <span role="button" class="btn" @click.prevent="playFilmGrid">Play it!</span>
    </div>
    <div ref="vidGrid" class="vid-grid">
      <div
        v-for="item in vidsFromStore"
        :key="item.id"
        ref="vidWrapper"
        :data-grid-order="item.fields.Order"
        class="vid-grid-item"
      >
        <div
          class="video-iframe-wrapper"
          @mouseover="mouseOverGridItem(item.fields.Order)"
        >
          <vimeo-player
            ref="player"
            :key="item.id"
            :video-id="item.fields.VideoID"
            :options="options"
            :video-url="item.fields.PrivateLink"
            :player-height="height"
            @loaded="onLoaded"
            @play="onPlaying"
            @pause="onPausing"
            @timeupdate="logCurrentTime"
            @ended="onEnding"
          >
          </vimeo-player>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  data() {
    return {
      isMounted: false,
      areVideosLoaded: false,
      areVideosPlaying: false,
      areVideosJumpedAndPaused: false,
      areVideosSynced: false,
      startPlayback: false,
      gridStateMsg: "Loading",
      numVids: 12,
      loadedCount: 0,
      playingCount: 0,
      jumpedAndPausedCount: 0,
      endedCount: 0,
      logTimingInfo: false,
      height: 500,
      userClicksPlay: false,
      options: {
        autoplay: true,
        autopause: false,
        controls: false,
        loop: false,
        muted: true,
      },
      playerReady: false,
    };
  },
  computed: {
    vidsFromStore: function () {
      return this.$store.state.content.records;
    },
  },
  watch: {
    loadedCount() {
      if (this.loadedCount === this.numVids && !this.areVideosSynced) {
        this.areVideosLoaded = true;
        this.gridStateMsg = "Before Sync: Initial Playback";
      }
    },
    playingCount() {
      if (this.playingCount === this.numVids && !this.areVideosSynced) {
        // this.logTimingInfo = true;
        this.gridStateMsg = "Before Sync: All Videos Are Playing";
        this.areVideosPlaying = true;
      }
    },
    areVideosPlaying() {
      if (this.areVideosPlaying && !this.areVideosSynced) {
        this.jumpCurrentTimeAndPause();
        this.gridStateMsg = "Before Sync: Just jumped and paused everyone...";
      }
    },
    jumpedAndPausedCount() {
      if (this.jumpedAndPausedCount === this.numVids && !this.areVideosSynced) {
        this.areVideosSynced = true;
        this.gridStateMsg = "Omg Synced";
      }
    },
    userClicksPlay() {
      if (this.areVideosSynced) {
        this.playVideos();
      }
    },
    endedCount() {
      if (this.endedCount === this.numVids) {
        this.gridStateMsg = "All films are over";
      }
    },
  },
  methods: {
    playFilmGrid() {
        this.userClicksPlay = true;
    },
    jumpCurrentTimeAndPause() {
      this.$refs.player.forEach((p) => {
        p.player
          .setCurrentTime(0.01)
          .then(function (seconds) {
            p.player.pause();
            // console.log('jumped & paused to', seconds)
          })
          .catch(function (error) {
            console.log(`${p} player time jump/pause failed. error: ${error}`);
          });
      });
    },
    logCurrentTime(event, data, player) {
      if (this.logTimingInfo) {
        console.log(event, data, player);
      }
    },
    onLoaded() {
      this.loadedCount++;
    },
    onPlaying() {
      this.playingCount++;
    },
    onPausing() {
      this.jumpedAndPausedCount++;
    },
    onEnding() {
      this.endedCount++;
    },
    pauseVideos() {
      this.$refs.player.forEach((p) => {
        p.player.pause();
        this.playingCount--;
      });
    },
    playVideos() {
      this.$refs.player.forEach((p) => {
        p.player.play();
        this.pausedCount--;
      });
    },
    mouseOverGridItem(order) {
     const ref = this.$refs.vidWrapper.filter( f => parseInt(f.dataset.gridOrder) === parseInt(order) );
     this.addGridItemHoverAnimation(ref);
    },
    addGridItemHoverAnimation(ref) {
        // gsap.to(ref, {
        //     x: 100
        // })
    },
  },
  head() {
    return {
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.4.2/gsap.min.js",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.dev-info {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 10px;
  font-size: 12px;
  background: pink;
  color: black;
  font-family: monospace;
}
.btn:hover {
    cursor: pointer;
}
.hide {
    display: none;
}
</style>
