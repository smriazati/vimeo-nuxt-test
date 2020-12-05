<template>
<div class="container">
    <div class="close-modal btn-hover" @click="closeModal">
       x
    </div>
    <div class="modal-iframe-wrapper">
        <vimeo-player
            ref="player"
            :key="item.id"
            :video-id="item.fields.VideoID"
            :options="options"
            :video-url="item.fields.PrivateLink"
            @played="onPlaying"
            @ended="onEnding"
          >
          </vimeo-player>
    </div>
</div>    
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
      return {
        height: 720,
        width: 1280,
        options: {
            autoplay: true,
            autopause: false,
            controls: true,
            loop: false,
            muted: false,
            texttrack: 'en'
        }
      }
  },
  methods: {
    closeModal() {
        this.$store.commit('grid/closeModal');
    },
    onPlaying() {
        this.$store.commit('grid/setModalPlaying', true)
    },
    onEnding() {
        this.$store.commit('grid/setModalPlaying', false)
        this.$store.commit('grid/expandPagination')
    }
  }
}
</script>