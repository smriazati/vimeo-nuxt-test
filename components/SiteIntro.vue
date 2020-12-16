<template>
  <div 
    class="site-grid page-container intro-container">
    <header>
      <h1 class="title">{{ introData.IntroHeadline.data }}</h1>
      <h2 class="subheadline">{{ introData.IntroSubheadline.data }}</h2>
    </header>
    <main class="main-grid">
      <section 
        class="intro-body-text"
        v-html="introData.IntroBodyText.data" 
        ></section>
        <section class="small-about-link">
          <p v-show="!isAboutOpen" class="small link" role="button" @click="openAbout">About the project</p>
        </section>
    </main>
    <nav class="highlight-card">
        <SiteTutorial />
        <VidSubtitles />
        <PlayButton />
      </nav>

  </div>

</template>

<script>
import VidSubtitles from '@/components/VidSubtitles.vue'
import SiteTutorial from '@/components/SiteTutorial.vue'
import PlayButton from '@/components/PlayButton.vue'

export default {
  components: {
    VidSubtitles,
    SiteTutorial,
    PlayButton
  },
  computed: {
    areVidsSynced() {
      return this.$store.state.grid.areVidsSynced;
    },
    introData() {
      return this.$store.state.content.testStaticData;
    },
    isAboutOpen() {
      return this.$store.state.grid.isAboutOpen
    },
    routes() {
      const routes = {
        new: this.$store.state.transitions.newRoute,
        old: this.$store.state.transitions.oldRoute
      } 
      return routes;
    }
  },
  methods: {
    openAbout() {
      this.$store.commit("grid/openAbout");
    }
  }
};
</script>

<style lang="scss">

</style>
