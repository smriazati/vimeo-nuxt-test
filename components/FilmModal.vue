<template>
<div 
  :class="transition"
  class="transition-container">
<div 
    v-if="item" 
    :class="isModalEnded ? 'modal-ended' : 'modal-not-ended'"
    class="modal-grid"
    >
    
    <div class="modal-close-overlay" @click="closeModal">      
      <button class="modal-close-btn">x</button>
    </div>

    <div 
      :class="isModalEnded ? 'modal-iframe-fadeOut' : 'modal-iframe-inView' "
      class="modal-iframe-wrapper"
      >
      <div 
        v-if="isModalLoading"
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
      <FilmPagination :item="item" :isModalEnded="isModalEnded" />
    </div>
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
      routeName: 'modal',
      transition: 'exitSlideRight',
      height: 720,
      width: 1280,
      isModalLoading: true,
      options: {
        autoplay: true,
        autopause: false,
        controls: true,
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
    },
    isModalEnded() {
      return this.$store.state.grid.isModalEnded;
    },
    routes() {
      const routes = {
        new: this.$store.state.transitions.newRoute,
        old: this.$store.state.transitions.oldRoute
      } 
      return routes;
    },
    modalRouteDirection() {
      return this.$store.state.transitions.modalRouteDirection;
    }
  },
  watch: {
    routes() {
      if (this.routes.new === this.routeName && this.routes.old === 'film13') {
        console.log('Modal transition: enterSlideLeft')
        this.transition = 'enterSlideLeft';
      }
     
      if (this.routes.new === 'film13' && this.routes.old === this.routeName ) {
        console.log('Modal transition: exitSlideRight')
        this.transition = 'exitSlideRight';
      }
    },
    modalRouteDirection() {
      if (this.modalRouteDirection === 'prev') {
        console.log('Modal direction: prev')
        this.transition = "anim-previous"
      } else if (this.modalRouteDirection === 'next') {
        console.log('Modal direction: next');
        this.transition = "anim-next"
      }
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("grid/closeModal");

      const payload = {
        old: this.routeName,
        new: 'film13'
      }
      this.$store.commit("transitions/routeChange", payload );
    },
    onReady() {
      this.$store.commit("grid/isModalTransitioning", false);
      this.isModalLoading = true;
    },
    onPlaying() {
      this.isModalLoading = false;
      this.$store.commit("grid/setModalPlaying", true);
    },
    onEnding() {
      this.$store.commit("grid/setModalPlaying", false);
      this.$store.commit("grid/isModalEnded", true);
    },
    onLoading() {
      // console.log("hi im loaded");
      let ref = this.$refs.modalPlayer;
      ref.player
          .setCurrentTime(2.000)
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