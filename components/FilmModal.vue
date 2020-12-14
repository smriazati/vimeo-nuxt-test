<template>
  <div class="modal-grid">
    <div class="modal-close-overlay" @click="closeModal"></div>
    <div 
      :class="isModalOpen ? 'modal-controls-anim-enter' : 'modal-controls-anim-exit'"
      class="modal-close-btn" 
      @click="closeModal"
    >
      <button>x</button>
    </div>
    <div class="modal-iframe-wrapper">
      <div 
        v-if="isModalLoading || isModalTransitioning"
        class="loading-iframe">
      </div>
      <client-only>
      <vimeo-player
        ref="modalPlayer"
        :key="item.id"
        :video-id="item.fields.VideoID"
        :options="options"
        :video-url="item.fields.PrivateLink"
        @ready="onReady"
        @loaded="onLoading"
        @play="onPlaying"
        @ended="onEnding"
      >
      </vimeo-player>
      </client-only>
    </div>
    <div class="modal-pagination">
      <FilmPagination :item="item" :expanded="false" />
    </div>
  </div>
</template>

<script>
import FilmPagination from "@/components/FilmPagination.vue";

export default {
  components: {
    FilmPagination
  },
  props: {
    item: Object,
  },
  data() {
    return {
      height: 720,
      width: 1280,
      isModalLoading: true,
      options: {
        autoplay: true,
        autopause: false,
        controls: false,
        loop: false,
        muted: false,
        texttrack: this.$store.state.grid.subtitleLanguage,
      },
    };
  },
  computed: {
    isModalOpen() {
      return this.$store.state.grid.isModalOpen;
    },
    isModalTransitioning() {
      return this.$store.state.grid.isModalTransitioning
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("grid/closeModal");
    },
    onReady() {
      this.$store.commit("grid/isModalTransitioning", false);
      this.isModalLoading = true;
    },
    onPlaying() {
      this.isModalLoading = false;
      console.log('im playing now')
      this.$store.commit("grid/setModalPlaying", true);
    },
    onEnding() {
      this.$store.commit("grid/setModalPlaying", false);
      this.$store.commit("grid/expandPagination");
    },
    onLoading() {
      // console.log("hi im loaded");
      let ref = this.$refs.modalPlayer;
      ref.player
          .setCurrentTime(3.000)
          .then(function (seconds) {
            ref.player.play();
            // console.log("jumped & played at", seconds);
          })
          .catch(function (error) {
            console.log(
              `${ref} player time jump/pause failed. error: ${error}`
            );
          });
    }
  },
};
</script>