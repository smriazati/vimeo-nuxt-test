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
        <div 
          class="body-text-grid about-crew-bios"
          v-html="introData.AboutCrewBios.data"
          ></div>
      </section>

      <section class="about-section artist-bios">
        <h2>Cast</h2>
        <div class="full-col artist-bio-grid">
          <div 
            v-for="item in filmData" 
            :key="item.id"
            class="artist-bio-grid-item">
              <img :src="item.fields.poster" alt="coming soon" />
              <h3>{{ item.fields.Name }}</h3>
              <h4>{{ item.fields.Location }}</h4>
              <p>{{ item.fields.bio }} <a :href="item.fields.PrivateLink" target="_blank" class="strong">Link</a></p>
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
        <PlayButton />
      </nav>
</div>
</template>

<script>
import PlayButton from '@/components/PlayButton.vue'
import VidSubtitles from '@/components/VidSubtitles.vue'

export default {
  components: {
    PlayButton,
    VidSubtitles
  },
  computed: {
    introData() {
      return this.$store.state.content.testStaticData;
    },
    filmData() {
      return this.$store.state.content.testData;
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
