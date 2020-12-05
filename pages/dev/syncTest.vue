<template>
  <div class="container">
    <p class="dev-info">
      {{ gridState }}
    </p>
    <div ref="vidGrid" class="vid-grid">
        <div v-for="item in vidsFromStore" :key="item.id" class="vid-grid-item">
            <div class="video-iframe-wrapper">
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
            >
            </vimeo-player>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'default',
  data() {
    return {
      isMounted: false,
      areVideosLoaded: false,
      areVideosPlaying: false,
      areVideosJumpedAndPaused: false,
      areVideosSynced: false,
      startPlayback: false,
      gridState: 'Loading',
      numVids: 12,
      loadedCount: 0,
      playingCount: 0,
      jumpedAndPausedCount: 0,
      logTimingInfo: false,
      height: 500,
      options: {
        autoplay: true,
        autopause: false,
        controls: false,
        loop: false,
        muted: true
      },
      playerReady: false
    }
  },
  computed: {
    vidsFromStore: function() {
      return this.$store.state.content.records;
    }
  },
  watch: {
      loadedCount() {
        if (this.loadedCount === this.numVids && !this.areVideosSynced) {
            this.areVideosLoaded = true;
            this.gridState = 'Before Sync: Initial Playback';
        }
      },
      playingCount() {
        if (this.playingCount === this.numVids && !this.areVideosSynced) {
            // this.logTimingInfo = true;
            this.gridState = 'Before Sync: All Videos Are Playing';
            this.areVideosPlaying = true;
        }
      },
      areVideosPlaying() {
        if (this.areVideosPlaying && !this.areVideosSynced) {
            this.jumpCurrentTimeAndPause();
            this.gridState = 'Before Sync: Just jumped and paused everyone...'
        }
      },
      jumpedAndPausedCount() {
          if (this.jumpedAndPausedCount === this.numVids && !this.areVideosSynced) {
            this.areVideosSynced = true;
            this.gridState = 'Omg Synced'
          }
      },
      areVideosSynced() {
          if (this.areVideosSynced) {
              this.playVideos();
          }
      }
  },
  methods: {
    jumpCurrentTimeAndPause() {
      this.$refs.player.forEach( p => {
        p.player.setCurrentTime(0.01).then(function(seconds) {
                p.player.pause();
                // console.log('jumped & paused to', seconds)
            }).catch(function(error) { console.log(`${p} player time jump/pause failed. error: ${error}`) })
        })  
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
    pauseVideos() {
      this.$refs.player.forEach(p => {
        p.player.pause();
        this.playingCount--;
        console.log(p);
      })
    },
    playVideos() {
      this.$refs.player.forEach(p => {
        p.player.play();
        this.pausedCount--;
        console.log(p);
      })
    }
  }
}
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
</style>
