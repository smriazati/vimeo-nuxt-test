<template>
<div class="site-grid page-container about-container scroll-container">
    <header class="about-header">
      <h1 class="headline">{{ introData.AboutHeadline.data }}</h1>
    </header>

    <main>
      <section 
        class="about-section about-body-text"
        v-html="introData.AboutBodyText.data"
        ></section>

      <section class="tutorial">
        <h3>How it works</h3>
        <p>{{ introData.IntroTutorialText.data }}</p>
      </section>

      <VidSubtitles />

      <section class="about-section crew-bios">
        <h2>Crew</h2>
        <div 
          class="body-text-grid about-crew-bios"
          v-html="introData.AboutBodyText.data"
          ></div>
      </section>

      <section class="about-section artist-bios">
        <h2>Artists</h2>
        <div class="full-col artist-bio-grid">
          <div 
            v-for="item in filmData" 
            :key="item.id"
            class="artist-bio-grid-item">
              <img :src="testPosterImage.sizes.medium" :alt="testPosterImage.alt" />
              <h3>{{ item.fields.Name }}</h3>
              <h4>{{ item.fields.Location }}</h4>
              <p>Duis vestibulum dapibus nisl, ut luctus orci dictum non. Vestibulum ultricies efficitur consectetur. Curabitur eu nisi ultricies, dictum ante ut, feugiat velit. Proin bibendum placerat sapien, at laoreet dui finibus eget. Pellentesque mattis tortor sollicitudin, mollis velit eu, tincidunt leo. Phasellus pulvinar purus orci, sit amet ultricies purus molestie at. Praesent convallis ut dolor sit amet sollicitudin. Pellentesque accumsan sagittis bibendum. Aenean lobortis lectus eu consectetur pulvinar. <a :href="item.fields.PrivateLink" target="_blank" class="strong">Link</a></p>
          </div>
        </div>
      </section>

      <section class="about-section funding-info">
        <h2>Supporters</h2>
        <div 
          class="about-funding-credit-text"
          v-html="introData.AboutFundingCreditsText.data"
          ></div>
          <div class="funding-logos-grid">
            <div 
              v-for="item in introData.AboutFundingCreditsLogos"
              :key="item.id"
              :class="item.id"
              class="funding-logos-grid-item"
              >
              <img :src="item.url" alt="logo image">
            </div>
          </div>
      </section>
    </main>
    <footer 
      class="about-footer-text"
      v-html="introData.AboutFooterText.data"
      >

    </footer>
      <nav>
        <button 
          class="back-btn play-btn btn" 
          role="button"
          @click="toggleAbout"
          >
          Play Film
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
  computed: {
    introData() {
      return this.$store.state.content.testStaticData;
    },
    filmData() {
      return this.$store.state.content.testData;
    },
    testPosterImage() {
      // delete after CMS
      if (!this.$store.state.content.apiDataFilms) {
        return null;
      }
      return this.$store.state.content.apiDataFilms[0].ACF.featured_image;
    },
    activeSubtitle() {
      return this.$store.state.grid.subtitleLanguage;
    }
  },
  methods: {
    toggleAbout() {
      this.$store.commit("grid/toggleAbout");
    },
    subtitleChange(payload) {
      this.$store.commit("grid/setSubtitle", payload);
    }
  }
};
</script>

<style lang="scss">
</style>
