<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="platform-list">
    <div
      class="card"
      v-for="platform in platforms"
      :key="platform.id"
      @click="changePlatform(platform)"
    >
    <pre>{{ platform }}</pre>
    <!-- <a
      class="image"
      :style="`background-color: ${platform.hex || '#fff'}`"
      @click="changePlatform(platform)"
    >
      <img
        :src="`/static/img/platforms/logos/${platform.code}.svg`"
        :alt="platform.name"
      />
    </a> -->

      <!-- <a
        class="thumbnail"
        :style="`background-color: ${platform.hex || '#fff'}`"
        @click="changePlatform(platform)"
      >
        <img
          :src="`/static/img/platforms/logos/${platform.code}.svg`"
          :alt="platform.name"
        />

        <span v-if="hasLists(platform.code)" class="lists-indicator" />
      </a>

      <div class="platform-info">
        <h4>{{ platform.name }}</h4>
        {{ platform.releaseYear }}
      </div> -->

      <!-- <div class="platform-info">
        <h4>{{ platform.name }}</h4>
        {{ platform.releaseYear }}
      </div> -->
    <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    platforms: Array,
  },

  computed: {
    ...mapState(['gameLists']),
  },

  methods: {
    changePlatform(platform) {
      this.$store.commit('SET_PLATFORM', platform);
      this.$router.push({ name: 'game-board' });
    },

    hasLists(platform) {
      return Boolean(this.gameLists[platform] && this.gameLists[platform].length);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  .platform-list {
    display: grid;
    grid-template-columns: auto auto auto;

    @media($small) {
      grid-template-columns: auto;
    }
  }

  .platform {
    margin-bottom: $gp;
    display: grid;
    grid-template-columns: 200px auto;
    grid-gap: $gp;
  }
</style>
