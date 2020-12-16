<template>
  <button
    :disabled="!areVidsSynced"
    :class="!areVidsSynced ? 'loading-btn disabled' : 'play-btn'"
    class="btn"
    @click="playGrid()"
  >
    <span v-if="!areVidsSynced">
      {{ loadingText }}
    </span>
    <span v-else-if="neverBeenPlayed">
      {{ startBtnText }}
    </span>
    <span v-else>
      {{ playBtnText }}
    </span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      loadingText: "Loading",
      startBtnText: "Start Film",
      playBtnText: "Play Film",
    };
  },
  computed: {
    areVidsSynced() {
      return this.$store.state.grid.areVidsSynced;
    },
    neverBeenPlayed() {
      return this.$store.state.grid.neverBeenPlayed;
    },
  },
  methods: {
    playGrid() {
      // console.log('clicky click')
      this.$store.commit("grid/changeGridPlayback", true);

      const payload = {
        old: 'about',
        new: 'film13'
      }
      this.$store.commit("transitions/routeChange", payload );
    },
  },
};
</script>
