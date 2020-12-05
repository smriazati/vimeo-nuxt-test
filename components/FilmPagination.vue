<template>
<div class="film-pagination" :class="expanded ? 'film-pagination-expanded' : 'film-pagination-minimal' ">
    <div v-if="currentFilm">

        <div v-if="!expanded" class="pagination-wrapper pagination-wrapper-minimal">
            <div class="prev-wrapper btn-hover" @click="openModal(prevFilm)">
                <div role="button" class="pagination-link">←</div>
            </div>
            <div class="next-wrapper btn-hover" @click="openModal(nextFilm)">
                <div role="button" class="pagination-link">→</div>
            </div>
        </div>

        <div v-if="expanded" class="pagination-wrapper pagination-wrapper-expanded">
            <div class="prev-wrapper btn-hover" @click="openModal(prevFilm)">
                <p class="small">Previous</p>
                <h2>{{ prevFilm.fields.Name }}</h2>
            </div>
            <div class="next-wrapper btn-hover" @click="openModal(nextFilm)">
                <p class="small">Next</p>
                <h2>{{ nextFilm.fields.Name }}</h2>
            </div>
        </div>
    </div>
</div>    
</template>

<script>
export default {
  props: {
    item: Object,
    expanded: Boolean
  },
  computed: {
    currentFilm() {
        if (!this.item) {
            return null
        }

        return parseInt(this.item.fields.Order);
    },
    prevFilm() {
        if (!this.currentFilm) {
            return null
        }

        let index = null;
        if (this.currentFilm > 1) {
            index = this.currentFilm - 1;
        } else {
            index = 12;
        }
        let prev = this.$store.state.content.records.filter( r => r.fields.Order === index);
        return prev[0];
    },
    nextFilm() {
        if (!this.currentFilm) {
            return null
        }

        let index = null;
        if (this.currentFilm < 12) {
            index = this.currentFilm + 1;
        } else {
            index = 1;
        }

        let next = this.$store.state.content.records.filter( r => r.fields.Order === index);
        return next[0];
    }
  },
  methods: {
    openModal(payload) {
        // console.log(payload);
        this.$store.commit("grid/openModal", payload);
    }
  }
}
</script>