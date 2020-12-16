<template>
  <div
    class="film-pagination"
    :class="expanded ? 'film-pagination-expanded' : 'film-pagination-minimal'"
  >
    <div 
      v-if="currentFilm"
      class="pagination-wrapper"
      >
        <button class="btn btn-transp pagination-button prev-wrapper" @click="changeModal(prevFilm, 'prev')">
          <div class="pagination-link prev-arrow">←</div>
          <div class="pagination-info">
            <div class="image-wrapper">
              <img :src="prevFilm.fields.poster" alt="testPosterImage.alt" />
            </div>
            <div class="text-wrapper">
              <h2>{{ prevFilm.fields.Name }}</h2>
              <h3>{{ prevFilm.fields.Location }}</h3>
            </div>
          </div>
        </button>
        <button class="btn btn-transp pagination-button next-wrapper" @click="changeModal(nextFilm, 'next')">
          <div class="pagination-link next-arrow">→</div>
          <div class="pagination-info">
            <div class="image-wrapper">
              <img :src="nextFilm.fields.poster" alt="testPosterImage.alt" />
            </div>
            <div class="text-wrapper">
              <h2>{{ nextFilm.fields.Name }}</h2>
              <h3>{{ nextFilm.fields.Location }}</h3>
            </div>
          </div>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    isModalEnded: Boolean,
  },
  computed: {
    isModalOpen() {
      return this.$store.state.grid.isModalOpen;
    },
    expanded() {
      return this.isModalEnded;
    },
    filmData() {
        // update to API data
      return this.$store.state.content.testData;
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
    changeModal(item, direction) {
      this.$store.commit("grid/openModal", item);
      this.$store.commit("transitions/changeModal", direction)
    },
  },
};
</script>