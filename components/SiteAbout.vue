<template>
  <div
    :class="transition"
    class="scroll-container transition-container"
  >
    <div class="site-intro">
      <SiteIntro />
    </div>

    <div 
      :class="isAboutOpen ? 'enterFadeIn' : 'exitFadeOut' "
    class="transition-container site-grid page-container about-container">
      <!-- <nav>
        <PlayButton />
      </nav> -->
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
              class="artist-bio-grid-item"
            >
              <img :src="item.fields.poster" alt="coming soon" />
              <h3>{{ item.fields.Name }}</h3>
              <h4>{{ item.fields.Location }}</h4>
              <p>
                {{ item.fields.bio }}
                <a
                  :href="item.fields.PrivateLink"
                  target="_blank"
                  class="strong"
                  >Link</a
                >
              </p>
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
              <img :src="item.url" alt="logo image" />
            </div>
          </div>
        </section>
      </main>
      <footer
        class="about-footer-text"
        v-html="introData.AboutFooterText.data"
      ></footer>
    </div>


  </div>
</template>

<script>
import SiteIntro from "@/components/SiteIntro.vue";
// import PlayButton from "@/components/PlayButton.vue";
import VidSubtitles from "@/components/VidSubtitles.vue";

export default {
  components: {
    SiteIntro,
    // PlayButton,
    VidSubtitles,
  },
  data() {
    return {
      transition: "",
      routeName: "about",
    };
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
    },
    isAboutOpen() {
      return this.$store.state.grid.isAboutOpen;
    },
    routes() {
      const routes = {
        new: this.$store.state.transitions.newRoute,
        old: this.$store.state.transitions.oldRoute,
      };
      return routes;
    },
  },
  watch: {
    routes() {
      if (this.routes.new === this.routeName && this.routes.old === "intro") {
        console.log("About transition: enterSlideUp");
        this.transition = "enterSlideUp";
      }

      if (this.routes.new === this.routeName && this.routes.old === "film13") {
        console.log("About transition: enterSlideRight");
        this.transition = "enterSlideRight";
      }

      if (this.routes.new === "film13" && this.routes.old === this.routeName) {
        console.log("About transition: exitSlideLeft");
        this.transition = "exitSlideLeft";
      }
    },
  },
};
</script>

<style lang="scss">
</style>
