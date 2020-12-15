<template>
    <section class="tutorial">
        <h3>How it works</h3>
        <p>{{ introData.IntroTutorialText.data }}</p>
    </section>
</template>

<script>

export default {
//   props: {
//     stack: Boolean
//   },
  computed: {
    introData() {
        return this.$store.state.content.testStaticData;
    }
  }
};
</script>
