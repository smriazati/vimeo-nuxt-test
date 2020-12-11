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
    </main>
    <nav class="highlight-card">
        <section class="tutorial">
          <h3>How it works</h3>
          <p>{{ introData.IntroTutorialText.data }}</p>
        </section>
        <section class="subtitles">
          <h3>Subtitles</h3>
          <ul>
            <li 
              :class="activeSubtitle === 'en' ? 'active-sub' : 'inactive-sub' "
              @click="subtitleChange('en')">English</li>
            <li 
              :class="activeSubtitle === 'ar' ? 'active-sub' : 'inactive-sub' "
              @click="subtitleChange('ar')">عربى</li>
          </ul>
        </section>
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

export default {
  layout: "default",
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
    },
    activeSubtitle() {
      return this.$store.state.grid.subtitleLanguage;
    }
  },
  methods: {
    gridFirstPlay() {
      this.$store.commit("grid/gridFirstPlay");
    },
    subtitleChange(payload) {
      this.$store.commit("grid/setSubtitle", payload);
    }
  },
};
</script>

<style lang="scss">

</style>
