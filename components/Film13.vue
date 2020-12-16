<template>
  <div 
    :class="transition"
    class="transition-container film13-container">
    <nav 
      v-if="!neverBeenPlayed"
      class="site-logo"
      >
      <div class="logo link link-invert" @click="openAbout">
        <h1>3x13</h1>
      </div>
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
            <source src="/sfx.mp3" type="audio/mpeg" />
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
            @ended="onEnded"
          >
          </vimeo-player>
          </client-only>
        </div>
        <div
          class="poster-wrapper"
          :class="showPosterImages ? 'show-images' : 'hide-images'"
        >
          <img :src="item.fields.poster" alt="coming soon" />
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
// import VidSubtitles from '@/components/VidSubtitles.vue'

export default {
  // components: {
  //   VidSubtitles
  // },
  props: {
    isPlaying: Boolean,
  },
  data() {
    return {
      devUtil: {
        muteMusic: false,
      },
      transition: '',
      routeName: 'film13',
      areVideosLoaded: false,
      areVideosPlaying: false,
      areVideosSynced: false,
      startPlayback: false,
      gridState: "Loading",
      numVids: 12,
      height: 500,
      loadedCount: 0,
      playingCount: 0,
      jumpedAndPausedCount: 0,
      endedCount: 0,
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
    routes() {
      const routes = {
        new: this.$store.state.transitions.newRoute,
        old: this.$store.state.transitions.oldRoute
      } 
      return routes;
    },
    isFilm13Ended() {
      return this.$store.state.grid.isFilm13Ended;
    },
    isFilm13Restarted() {
      return this.$store.state.grid.isFilm13Restarted;
    }
  },
  watch: {
    routes() {
      if (this.routes.new === this.routeName && this.routes.old === 'intro') {
        console.log('Film13 transition: enterSlideLeft')
        this.transition = 'enterSlideLeft';
      }
      if (this.routes.new === this.routeName && this.routes.old === 'about') {
        console.log('Film13 transition: enterSlideLeft')
        this.transition = 'enterSlideLeft';
      }
      if (this.routes.new === 'modal' && this.routes.old === this.routeName ) {
        console.log('Film13 transition: exitFadeOut')
        this.transition = 'exitFadeOutHalfway';
      }
      if (this.routes.new === this.routeName && this.routes.old === 'modal') {
        console.log('Film13 transition: enterFadeIn')
        this.transition = 'enterFadeIn';
      }
    },
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
    endedCount() {
      if (this.endedCount === this.numVids) {
        this.$store.commit("grid/endFilm13");
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
    isFilm13Ended() {
      if (this.isFilm13Ended) {
        this.resetGrid();
        this.cueFilm13Restart();
      }
    },
    isFilm13Restarted() {
      if (this.isFilm13Restarted) {
        this.restartFilm13();
      }
    }
  },
  methods: {
    openAbout() {
      this.$store.commit("grid/openAbout");
      this.$store.commit("grid/changeGridPlayback", false);

      const payload = {
        old: this.routeName,
        new: 'about'
      }
      this.$store.commit("transitions/routeChange", payload );
    },
    openModal(payload) {
      this.$store.commit("grid/openModal", payload);

      const payload2 = {
        old: this.routeName,
        new: 'modal'
      }
      this.$store.commit("transitions/routeChange", payload2 );
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
    onEnded() {
      this.endedCount++;
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
    resetGrid() {
      this.playingCount = 0;
      this.loadedCount = 0;
      this.jumpedAndPausedCount = 0;
    },
    cueFilm13Restart() {
      this.jumpCurrentTimeAndPause();
    },
    restartFilm13() {
      this.playVideos();
    }
  },
};
</script>

<style lang="scss">
</style>
