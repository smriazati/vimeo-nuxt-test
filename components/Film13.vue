<template>
  <div class="container">
    <div class="master-track">
      <audio ref="music">
        <source src="/song.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio> 
    </div>
    <div ref="vidGrid" class="vid-grid">
      <div
        v-for="item in vidsFromStore"
        :key="item.id"
        ref="vidWrapper"
        :data-grid-order="item.fields.Order"
        class="vid-grid-item"
        @click="openModal(item)"
      >
        <div 
          class="video-iframe-wrapper"         
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
          >
          </vimeo-player>
        </div>
        <div class="vid-grid-text">
          <h2>{{ item.fields.Name }}</h2>
          <h3>{{ item.fields.Location }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPlaying: Boolean
  },
  data() {
    return {
      isMounted: false,
      areVideosLoaded: false,
      areVideosPlaying: false,
      areVideosJumpedAndPaused: false,
      areVideosSynced: false,
      startPlayback: false,
      gridState: "Loading",
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
        muted: true,
      },
      playerReady: false
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
        this.gridState = "Before Sync: Initial Playback";
      }
    },
    playingCount() {
      if (this.playingCount === this.numVids && !this.areVideosSynced) {
        // this.logTimingInfo = true;
        this.gridState = "Before Sync: All Videos Are Playing";
        this.areVideosPlaying = true;
      }
    },
    areVideosPlaying() {
      if (this.areVideosPlaying && !this.areVideosSynced) {
        this.jumpCurrentTimeAndPause();
        this.gridState = "Before Sync: Just jumped and paused everyone...";
      }
    },
    jumpedAndPausedCount() {
      if (this.jumpedAndPausedCount === this.numVids && !this.areVideosSynced) {
        this.areVideosSynced = true;
        this.gridState = "Omg Synced";
      }
    },
    areVideosSynced() {
      if (this.areVideosSynced) {
        this.$store.commit("grid/areVidsSynced", true);
      }
    },
    isPlaying() {
      if (this.isPlaying) {
        this.playVideos();
        this.playMusic();
      } 

      if (!this.isPlaying) {
        this.pauseVideos();
        this.pauseMusic();
      }
    }
  },
  methods: {
    openModal(payload) {
      this.$store.commit("grid/openModal", payload);
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
    pauseVideos() {
      this.$refs.player.forEach((p) => {
        p.player.pause();
        this.playingCount--;
        console.log(p);
      });
    },
    playVideos() {
      this.$refs.player.forEach((p) => {
        p.player.play();
        this.pausedCount--;
        console.log(p);
      });
    },
    playMusic() {
      this.$refs.music.play();
    },
    pauseMusic() {
      this.$refs.music.pause();
    }
  },
};
</script>

<style lang="scss">
</style>
