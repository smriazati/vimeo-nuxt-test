<template>
<div class="video-item">
    <div 
      class="video-iframe-wrapper big" 
      @click="play"
    >
      <vimeo-player 
        ref="player" 
        :video-id="videoID" 
        :options="options"
        :video-url="videoUrl" 
        :player-height="height" 
        @ready="onReady"
        @ended="ended">
      </vimeo-player>
    </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            videoID: 'some-id',
            videoUrl: 'https://vimeo.com/277006925/c16e626108',
            height: 500,
            options: {
                autoplay: true,
                controls: false,
                loop: true
            },
            playerReady: false
        }
    },
    methods: {
        onReady() {
            this.playerReady = true;
            console.log('ready');
        },
        play () {
        this.$refs.player.play();
            console.log('played')
        },
        pause () {
            this.$refs.player.pause()
            console.log('paused')
        },
        ended () {
            console.log('ended!')
        }
    }
}
</script>

<style lang="scss">

</style>