<template>
  <div
    class="film-pagination"
    :class="expanded ? 'film-pagination-expanded' : 'film-pagination-minimal'"
  >
    <div v-if="currentFilm">
      <div
        v-if="!expanded"
        :class="isModalOpen ? 'modal-controls-anim-enter' : 'modal-controls-anim-exit'"
        class="pagination-wrapper pagination-wrapper-minimal"
      >
        <div class="pagination-button prev-wrapper btn-hover" @click="openModal(prevFilm)">
          <button class="pagination-link">←</button>
          <div class="button-hover-overlay">
            <div class="image-wrapper">
              <img :src="testPosterImage.sizes.large" :alt="testPosterImage.alt" />
            </div>
            <div class="text-wrapper">
              <h2>{{ prevFilm.fields.Name }}</h2>
              <h3>{{ prevFilm.fields.Location }}</h3>
            </div>
          </div>
        </div>
        <div class="pagination-button next-wrapper btn-hover" @click="openModal(nextFilm)">
          <button class="pagination-link">→</button>
          <div class="button-hover-overlay">
            <div class="image-wrapper">
              <img :src="testPosterImage.sizes.large" :alt="testPosterImage.alt" />
            </div>
            <div class="text-wrapper">
              <h2>{{ nextFilm.fields.Name }}</h2>
              <h3>{{ nextFilm.fields.Location }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="expanded"
        class="pagination-wrapper pagination-wrapper-expanded"
      >
        <div class="close-modal btn-hover" @click="closeModal">x</div>
        <div class="pagination-controls">
          <div class="prev-wrapper btn-hover" @click="openModal(prevFilm)">
            <p class="small">Previous</p>
            <h2>{{ prevFilm.fields.Name }}</h2>
          </div>
          <div class="next-wrapper btn-hover" @click="openModal(nextFilm)">
            <p class="small">Next</p>
            <h2>{{ nextFilm.fields.Name }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    expanded: Boolean,
  },
  computed: {
    isModalOpen() {
      return this.$store.state.grid.isModalOpen;
    },
    filmData() {
        // update to API data
      return this.$store.state.content.testData;
    },
    testPosterImage() {
      // delete after CMS
      if (!this.$store.state.content.apiDataFilms) {
        return null;
      }
      return this.$store.state.content.apiDataFilms[0].ACF.featured_image;
    },
    currentFilm() {
      if (!this.item) {
        return null;
      }
      // update to Wordpress data shape
      return parseInt(this.item.fields.Order);
    },
    prevFilm() {
      if (!this.currentFilm) {
        return null;
      }

      let index = null;
      if (this.currentFilm > 1) {
        index = this.currentFilm - 1;
      } else {
        index = 12;
      }
      // update to Wordpress data shape
      let prev = this.filmData.filter((r) => r.fields.Order === index);
      return prev[0];
    },
    nextFilm() {
      if (!this.currentFilm) {
        return null;
      }

      let index = null;
      if (this.currentFilm < 12) {
        index = this.currentFilm + 1;
      } else {
        index = 1;
      }

      // update to Wordpress data shape
      let next = this.filmData.filter((r) => r.fields.Order === index);
      return next[0];
    },
  },
  methods: {
    closeModal() {
      this.$store.commit("grid/closeModal");
    },
    openModal(payload) {
      // console.log(payload);
      this.$store.commit("grid/isModalTransitioning", true);
      this.$store.commit("grid/openModal", payload);
    },
  },
};
</script>