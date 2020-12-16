<template>
  <div class="container layout-stack-wrapper">
    <Film13
      :is-playing="isGridPlaying"
      class="film-grid-wrapper layout-stack-item"
    />
    <div 
      v-if="isFilm13Ended"
      class="layout-stack-item restart-film">
      <button @click="playFilm13Again()" class="btn play-btn">
        Play again
      </button>
    </div>
    <FilmModal :item="activeModal" class="film-modal layout-stack-item" />

    <SiteAbout class="site-about layout-stack-item layout-stack-top" />
  </div>
</template>

<script>
import SiteAbout from "@/components/SiteAbout.vue";
import Film13 from "@/components/Film13.vue";
import FilmModal from "@/components/FilmModal.vue";

export default {
  layout: "default",
  components: {
    SiteAbout,
    Film13,
    FilmModal,
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
    isFilm13Ended() {
      return this.$store.state.grid.isFilm13Ended;
    }
  },
  methods: {
    playFilm13Again() {
      console.log("restart all vids tktk");
      this.$store.commit('grid/restartFilm13');
    }
  },
};
</script>

