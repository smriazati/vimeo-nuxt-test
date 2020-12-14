<template>
  <div class="site-grid page-container intro-container scroll-container">
    <header class="intro">
      <h1 class="title">{{ introData.IntroHeadline.data }}</h1>
      <h2 class="subheadline">{{ introData.IntroSubheadline.data }}</h2>
    </header>
    <main class="main-grid">
      <section 
        class="intro-body-text"
        v-html="introData.IntroBodyText.data" 
        ></section>
        <section>
          <p class="small link" role="button" @click="openAbout">About the project</p>
        </section>
    </main>
    <nav class="highlight-card">
        <section class="tutorial">
          <h3>How it works</h3>
          <p>{{ introData.IntroTutorialText.data }}</p>
        </section>
  
        <VidSubtitles />

        <button 
          v-if="!areVidsSynced" 
          role="button"
          class="loading-btn btn disabled"
          >
          {{ loadingText }}
        </button>
        <button
          v-if="areVidsSynced"
          role="button"
          class="btn play-btn"
          @click="gridFirstPlay"
        >
          {{ playBtnText }}
        </button>

      </nav>

  </div>

</template>

<script>
import VidSubtitles from '@/components/VidSubtitles.vue'

export default {
  components: {
    VidSubtitles
  },
  data() {
    return {
      loadingText: "Loading",
      playBtnText: "Start Film",
    };
  },
  computed: {
    areVidsSynced() {
      return this.$store.state.grid.areVidsSynced;
    },
    introData() {
      return this.$store.state.content.testStaticData;
    }
  },
  methods: {
    gridFirstPlay() {
      this.$store.commit("grid/gridFirstPlay");
    },
    openAbout() {
      this.$store.commit("grid/openAbout");
    }
  },
};
</script>

<style lang="scss">

</style>
