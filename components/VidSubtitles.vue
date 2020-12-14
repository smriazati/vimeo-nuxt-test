<template>
    <section :class="stack ? 'stacked-subs' : 'titled-subs' " class="subtitles">
        <h3>Subtitles</h3>
        <ul>
            <li 
            :class="activeSubtitle === 'en' ? 'active-sub' : 'inactive-sub' "
            @click="subtitleChange('en')">English</li>
            <li 
            :class="activeSubtitle === 'ar' ? 'active-sub' : 'inactive-sub' "
            @click="subtitleChange('ar')">عربى</li>
        </ul>
    </section>
</template>

<script>

export default {
  props: {
    stack: Boolean
  },
  computed: {
    activeSubtitle() {
      return this.$store.state.grid.subtitleLanguage;
    }
  },
  methods: {
    subtitleChange(payload) {
      this.$store.commit("grid/setSubtitle", payload);
    }
  }
};
</script>
