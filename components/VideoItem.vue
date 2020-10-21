<template>
    <div class="video-item">
        <client-only>
            <vimeo-player 
                ref="player"
                :video-id="videoID"
                :video-url="videoUrl"
                @ready="onReady"
                :player-height="height">
            </vimeo-player>
        </client-only>
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
                muted: true,
                autoplay: true
            },
            playerReady: false
        }
    },
    methods: {
        onReady() {
            this.playerReady = true
        },
        play () {
            this.$refs.player.play()
        },
        pause () {
            this.$refs.player.pause()
        }
    }
}
</script>