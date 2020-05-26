<template lang="html">
  <div class="platforms">
    <div
      v-for="platform in platforms"
      :key="platform.name"
      :class="['platform', 'card', platform.code]"
      :style="`background-color: ${platform.hex || '#fff'}`"
      @click="changePlatform(platform)"
    >
      <img
        :src="`/static/img/platforms/logos/${platform.code}.svg`"
        :alt="platform.name"
      >

      <span v-if="hasLists(platform.code)" class="lists-indicator" />
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
    ...mapState(['gameLists', 'settings']),
  },

  methods: {
    hasLists(platform) {
      return Boolean(this.gameLists[platform] && this.gameLists[platform].length);
    },

    changePlatform(platform) {
      this.$store.commit('SET_PLATFORM', platform);
      this.$router.push({ name: 'game-board' });
    },

    showCount({ code }) {
      return this.gameCount && this.ownedPlatform(code) && this.getGameCount(code) > 0;
    },

    ownedPlatform(platformCode) {
      const isOwned = this.gameLists
      && this.gameLists[platformCode]
      && Object.keys(this.gameLists[platformCode]).length;

      return isOwned && this.clickable;
    },

    getGameCount(platform) {
      return this.gameLists[platform]
        .map(({ games }) => games.length)
        .reduce((totalCount, listCount) => totalCount + listCount);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.platforms {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;

  @media(max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 780px) {
    grid-template-columns: 1fr;
  }
}

img {
  max-width: 200px;
  max-height: 100%;
  display: flex;
  align-items: center;
}

.platform {
  height: 80px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
