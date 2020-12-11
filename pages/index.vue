<template>
  <div class="container layout-stack-wrapper">
    <div
      class="film-grid-wrapper layout-stack-item"
      :class="isGridPlaying ? 'anim-enter-films' : 'anim-loading-films'"
    >
      <Film13 :is-playing="isGridPlaying" />
    </div>
    <div 
      :class="neverBeenPlayed ? 'anim-page-inView' : 'anim-page-slideLeft' " 
      class="site-intro layout-stack-item layout-stack-top">
      <SiteIntro />
    </div>
    <div 
      v-if="!neverBeenPlayed" 
      :class="isAboutOpen ? 'anim-page-inView' : 'anim-page-slideLeft' " 
      class="site-about layout-stack-item layout-stack-top">
      <SiteAbout />
    </div>
    <div
      :class="isModalOpen ? 'anim-modal-inView' : 'anim-modal-slideRight' " 
      class="film-modal layout-stack-item"
    > 
      <div v-if="activeModal">
        <FilmModal :item="activeModal" />
      </div>
    </div>

    <div
      v-if="isPaginationExpanded"
      class="film-pagination-expanded layout-stack-item"
    >
      <FilmPagination :item="activeModal" :expanded="true" />
    </div>
  </div>
</template>

<script>
import SiteIntro from "@/components/SiteIntro.vue";
import SiteAbout from "@/components/SiteAbout.vue";
import Film13 from "@/components/Film13.vue";
import FilmModal from "@/components/FilmModal.vue";
import FilmPagination from "@/components/FilmPagination.vue";

export default {
  layout: "default",
  components: {
    SiteIntro,
    SiteAbout,
    Film13,
    FilmModal,
    FilmPagination,
  },
  asyncData({ store, $axios }) {
    // update to cms base url
    // update to query multiple APIs at once
    return $axios
      .get("https://proxy.russellfavret.com/?rest_route=/wp/v2/waterfall")
      .then((res) => {
        store.commit("content/setFilmData", res.data);
        return { apiDataFilms: res.data };
      });
  },
  computed: {
    isGridPlaying() {
      return this.$store.state.grid.isGridPlaying;
    },
    neverBeenPlayed() {
      return this.$store.state.grid.neverBeenPlayed;
    },
    isModalOpen() {
      return this.$store.state.grid.isModalOpen;
    },
    activeModal() {
      return this.$store.state.grid.activeModal;
    },
    isPaginationExpanded() {
      return this.$store.state.grid.isPaginationExpanded;
    },
    isAboutOpen() {
      return this.$store.state.grid.isAboutOpen;
    },
  }
};
</script>

