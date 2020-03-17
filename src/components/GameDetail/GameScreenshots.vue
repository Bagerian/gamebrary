<!-- TODO: center image on fullscreen -->
<!-- TODO: look up props -->
<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <section v-if="game.screenshots" class="game-screenshots">
    <h3 class="subtitle">Screenshots</h3>

    <b-carousel
      :overlay="overlay"
      :pause-info="false"
      :autoplay="false"
      indicator-style="is-lines"
    >
      <span
        v-if="overlay"
        class="modal-close is-large"
        @click="overlay = false"
      />

      <b-button
        v-else
        class="is-primary is-small fullscreen"
        icon-right="expand"
        @click="overlay = true"
      />

      <b-carousel-item v-for="screenshot in screenshots" :key="screenshot">
        <img :src="screenshot" />
      </b-carousel-item>
    </b-carousel>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      overlay: false,
    };
  },

  computed: {
    // TODO: pass game as prop
    // component should not be aware of data source, just render whatever is given
    ...mapState(['game']),

    screenshots() {
      // eslint-disable-next-line
      return this.game.screenshots
        ? this.game.screenshots.map((image) => {
          const url = 'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/';

          return `${url}${image.image_id}.jpg`;
        })
        : null;
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.fullscreen {
  position: absolute !important;
  top: 4px;
  right: 4px;
  z-index: 1;
}
</style>
