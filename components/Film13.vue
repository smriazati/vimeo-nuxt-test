<template>
  <div class="film13-container">
    <nav 
      v-if="!neverBeenPlayed"
      class="site-logo"
      >
      <div class="logo link link-invert" @click="toggleAbout">
        <h1>3x13</h1>
      </div>
      <VidSubtitles :stack="true" />
    </nav>
    <div class="master-track">
      <audio ref="music">
        <source :src="masterScore" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
    <div ref="vidGrid" class="film13-grid">
      <div
        v-for="item in vidsInOrder"
        :key="item.id"
        ref="vidWrapper"
        :data-grid-order="item.fields.Order"
        class="film13-grid-item"
        @click="openModal(item)"
        @mouseenter="playSfx(item.fields.Order)"
      >
        <div class="sfx-wrapper">
          <audio
            ref="sfx"
            :data-sfx-id="item.fields.Order"
            @ended="onSfxEnding(item.fields.Order)"
          >
            <!-- <source src="/sfx.mp3" type="audio/mpeg" /> -->
            Your browser does not support the audio tag.
          </audio>
        </div>
        <div class="iframe-wrapper">
          <client-only>
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
          >
          </vimeo-player>
          </client-only>
        </div>
        <div
          class="poster-wrapper"
          :class="showPosterImages ? 'show-images' : 'hide-images'"
        >
          <img :src="testPosterImage.sizes.large" :alt="testPosterImage.alt" />
        </div>
        <div class="text-wrapper">
          <div class="inner-text">
            <h2>{{ item.fields.Name }}</h2>
            <h3>{{ item.fields.Location }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VidSubtitles from '@/components/VidSubtitles.vue'

export default {
  components: {
    VidSubtitles
  },
  props: {
    isPlaying: Boolean,
  },
  data() {
    return {
      devUtil: {
        muteMusic: false,
      },
      isMounted: false,
      areVideosLoaded: false,
      areVideosPlaying: false,
      areVideosJumpedAndPaused: false,
      areVideosSynced: false,
      startPlayback: false,
      gridState: "Loading",
      numVids: 12,
      height: 500,
      loadedCount: 0,
      playingCount: 0,
      jumpedAndPausedCount: 0,
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
    masterScore: function () {
      // update to API data
      return this.$store.state.content.testScore;
    },
    vidsFromStore: function () {
      // update to API data
      return this.$store.state.content.testData;
    },
    vidsInOrder: function () {
      const vidsInOrder = this.$store.getters["content/vidsInOrder"];
      return vidsInOrder;
    },
    activeSfx() {
      return this.$store.state.sound.activeSfx;
    },
    neverBeenPlayed() {
      return this.$store.state.grid.neverBeenPlayed;
    },  
    showPosterImages() {
      const isGridPlaying = this.isPlaying;
      const neverBeenPlayed = this.neverBeenPlayed;
      if (!isGridPlaying && neverBeenPlayed) {
        return true;
      } else {
        return false;
      }
    },
    testPosterImage() {
      // delete after CMS
      if (!this.$store.state.content.apiDataFilms) {
        return null;
      }
      return this.$store.state.content.apiDataFilms[0].ACF.featured_image;
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
    },
  },
  methods: {
    toggleAbout() {
      // if (!this.isModalOpen && !this.isPaginationExpanded) {
        this.$store.commit("grid/toggleAbout");
      // }
    },
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
        // console.log(p);
      });
    },
    playVideos() {
      this.$refs.player.forEach((p) => {
        p.player.play();
        this.pausedCount--;
        // console.log(p);
      });
    },
    playMusic() {
      this.$refs.music.play();
    },
    pauseMusic() {
      this.$refs.music.pause();
    },
    playSfx(order) {
      if (!this.activeSfx) {
        // the first time
        this.playSound(order);
        this.$store.commit("sound/addSfx", order);
      } else if (!this.activeSfx.includes(order)) {
        this.$store.commit("sound/addSfx", order);
        this.playSound(order);
      }
    },
    playSound(order) {
      // console.log(order);
      this.$refs.sfx.forEach((s) => {
        if (order === parseInt(s.dataset.sfxId)) {
          s.play();
        }
      });
    },
    onSfxEnding(order) {
      this.$store.commit("sound/removeSfx", order);
    },
  },
};
</script>

<style lang="scss">
</style>
