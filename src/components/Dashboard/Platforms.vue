<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="platforms-page">
    <platforms-grid
      :platforms="filteredPlatforms"
    />

    <platforms-footer />
  </div>
</template>

<script>
import platforms from '@/platforms';
import PlatformsFooter from '@/components/Platforms/PlatformsFooter';
import PlatformsGrid from '@/components/Platforms/PlatformsGrid';
import { mapState } from 'vuex';

export default {
  components: {
    PlatformsFooter,
    PlatformsGrid,
  },

  data() {
    return {
      platforms,
      searchText: '',
    };
  },

  computed: {
    ...mapState(['gameLists', 'platform', 'settings']),

    // TODO: move to getter and replace other instances
    hasLists() {
      return Object.keys(this.gameLists).length > 0;
    },

    listView() {
      return this.settings && this.settings.platformsView
        ? this.settings.platformsView
        : 'grid';
    },

    platformsComponent() {
      return this.listView === 'list'
        ? 'PlatformsList'
        : 'PlatformsGrid';
    },

    platformsFilterField() {
      return this.settings && this.settings.platformsFilterField
        ? this.settings.platformsFilterField
        : null;
    },

    platformsSortField() {
      return this.settings && this.settings.platformsSortField
        ? this.settings.platformsSortField
        : 'releaseYear';
    },

    ownedListsOnly() {
      return this.settings && this.settings.ownedListsOnly
        ? this.settings.ownedListsOnly
        : false;
    },

    filteredPlatforms() {
      const availableLists = this.ownedListsOnly
        ? this.platforms.filter(({ code }) => this.gameLists[code])
        : this.platforms;

      return this.platformsFilterField
        ? availableLists.filter(({ type }) => type === this.platformsFilterField)
        : availableLists;
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
