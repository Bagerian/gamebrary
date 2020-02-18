<template lang="html">
  <header>
    <b-button @click="toggleView" class="is-primary small">
      <i :class="viewIcon" />
    </b-button>

    <!-- <modal
      ref="listAddModal"
      title="Filter and sort platforms"
    >
      <b-button class="primary small filter-button">
        <i class="fas fa-filter" :class="{ 'filter-active': filterField }" />
        <span class="indicator" v-if="ownedListsOnly" />
      </b-button>

      <div slot="content">
        <section>
          <h3>Show</h3>

          <b-button
            :class="{ 'is-primary': !ownedListsOnly }"
            @click="setOwned(false)"
          >
            All
          </b-button>

          <b-button
            :class="{ 'is-primary': ownedListsOnly }"
            @click="setOwned(true)"
          >
            Mine
          </b-button>
        </section>

        <section>
          <h3>Filter by</h3>

          <b-button
            :class="{ 'is-primary': filter === filterField }"
            v-for="filter in availableFilters"
            :key="filter"
            @click="setFilter(filter)"
          >
            <span v-if="filter">{{ $t(`platforms.${filter}`) }}</span>
            <span v-else>All</span>
          </b-button>
        </section>

        <section>
          <h3>Sort by</h3>

          <b-button
            :class="{ 'is-primary': field === sortField }"
            v-for="field in availableSortFields"
            :key="field"
            @click="setSortField(field)"
          >
            <span v-if="field">{{ $t(`platforms.${field}`) }}</span>
            <span v-else><i class="fas fa-times" /> Clear field</span>
          </b-button>
        </section>
      </div>
    </modal> -->
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      availableFilters: [
        null,
        'home',
        'handheld',
        'computer',
      ],
      availableSortFields: [
        'releaseYear',
        'name',
        'type',
      ],
    };
  },

  computed: {
    ...mapState(['settings']),

    viewIcon() {
      return this.listView === 'list'
        ? 'fas fa-th-large'
        : 'fas fa-list';
    },

    filterField() {
      return this.settings && this.settings.platformsFilterField
        ? this.settings.platformsFilterField
        : null;
    },

    sortField() {
      return this.settings && this.settings.platformsSortField
        ? this.settings.platformsSortField
        : 'releaseYear';
    },

    listView() {
      return this.settings && this.settings.platformsView
        ? this.settings.platformsView
        : 'grid';
    },

    ownedListsOnly() {
      return this.settings && this.settings.ownedListsOnly
        ? this.settings.ownedListsOnly
        : false;
    },
  },

  methods: {
    clearFilter() {

    },

    async saveSettings() {
      await this.$store.dispatch('SAVE_SETTINGS', this.settings)
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error saving your settings', type: 'is-danger' });
        });

      this.$buefy.toast.open({ message: 'Settings saved', type: 'is-success' });
    },

    setFilter(value) {
      this.$store.commit('UPDATE_SETTING', { key: 'platformsFilterField', value });
      this.saveSettings();
    },

    setSortField(value) {
      this.$store.commit('UPDATE_SETTING', { key: 'platformsSortField', value });
      this.saveSettings();
    },

    toggleView() {
      const value = this.listView === 'grid'
        ? 'list'
        : 'grid';

      this.$store.commit('UPDATE_SETTING', { key: 'platformsView', value });

      this.saveSettings();
    },

    setOwned(value) {
      this.$store.commit('UPDATE_SETTING', { key: 'ownedListsOnly', value });

      this.saveSettings();
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~styles/styles";

header {
  // display: inline-grid;
  // align-items: center;
  display: flex;
  align-items: center;
  margin-bottom: $gp;
  grid-gap: $gp;

  button {
    margin-right: $gp / 2;
  }
}

.filter-button {
  position: relative;
  overflow: hidden;
}

.indicator {
  position: absolute;
  top: -10px;
  right: -15px;
  width: 30px;
  height: 20px;
  transform: rotate(45deg);
  background: red;
  border-bottom: 3px solid var(--body-background);
  background-color: #555;
}

.filter-active {
  color: var(--success-background);
}

section {
  padding-top: $gp;
}

h3 {
  margin-bottom: $gp / 2;
}
</style>
