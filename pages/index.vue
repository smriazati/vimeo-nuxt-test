<template>
  <div class="container">
    <nav>
      <div to="/" class="logo btn" :class="isModalOpen || isPaginationExpanded ? 'disabled' : 'enabled' " @click="toggleAbout">
        <h1>3x13</h1>  
      </div>
    </nav>
    <div class="intro">
      <div v-if="!areVidsSynced" class="loading">
        {{ loadingText }}
      </div>
      <div v-if="areVidsSynced && !isGridPlaying && neverBeenPlayed" role="button" class="btn" @click="gridFirstPlay">
        {{ playBtnText }}
      </div>
    </div>
    <div class="film-grid-wrapper" :class="isGridPlaying ? 'anim-enter-films' : 'anim-loading-films' ">
      <Film13 :is-playing="isGridPlaying" />
    </div>

    <div v-if="isModalOpen" class="film-modal">
      <FilmPagination :item="activeModal" :expanded="false" />
      <FilmModal :item="activeModal" />
    </div>

    <div v-if="isPaginationExpanded" class="film-pagination-expanded">
      <FilmPagination :item="activeModal" :expanded="true" />
    </div>
    
  </div>
</template>

<script>
import Film13 from '@/components/Film13.vue'
import FilmModal from '@/components/FilmModal.vue'
import FilmPagination from '@/components/FilmPagination.vue'

export default {
  layout: 'default',
  components: {
    Film13,
    FilmModal,
    FilmPagination
  },
  data() {
    return {
      loadingText: 'Loading',
      playBtnText: 'Play the film'
    }
  },
  computed: {
    areVidsSynced() {
      return this.$store.state.grid.areVidsSynced;
    },
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
    }
  },
  methods: {
    gridFirstPlay() {
      this.$store.commit('grid/gridFirstPlay');
    },
    toggleAbout() {
      if (!this.isModalOpen && !this.isPaginationExpanded) {
        this.$store.commit('grid/toggleAbout');
      }
    }
  }
}
</script>

<style lang="scss">

nav {
  top: 0;
  left: 0;
  height: 100px;
  width: 200px;
  position: fixed;
  z-index: 9999;
}

.intro {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  width: 100vw;
  height: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.anim-loading-films {
  opacity: .1;
}

.anim-enter-film {
  opacity: 1;
  position: fixed;
  z-index: 100;
}


</style>
