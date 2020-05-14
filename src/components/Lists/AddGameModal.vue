<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div>
    <header class="modal-card-head">
      <p class="modal-card-title">
        Add game
      </p>
    </header>

    <section class="modal-card-body">
      <form @submit.prevent="search">
        <b-field>
          <b-input
           placeholder="Search..."
           type="search"
           icon="search"
           :loading="loading"
           v-model="searchText"
           @input="search"
          />

          <p class="control">
            <b-button
              class="is-primary"
              icon-right="search"
              @click="search"
            />
          </p>
        </b-field>
      </form>

      <b-message type="is-warning is-small" v-if="gamesInList.length > 0">
        <b-tooltip
          :label="gamesInListNames"
          position="is-bottom"
          multilined
          size="is-small"
        >
          <p>{{ `${gamesInListMessage} ${$t('gameSearch.alreadyInList')}` }}</p>
        </b-tooltip>
      </b-message>

      <div
        v-if="filteredResults.length > 0"
        ref="searchResults"
      >
        <game-card-search
          v-for="{ id } in filteredResults"
          :key="id"
          :game-id="id"
          :list-id="listId"
          search-result
          @added="added"
        />
      </div>

      <span
        v-if="!noResults"
        class="no-results"
      >
        {{ $t('gameSearch.noResultsFound') }}
      </span>
    </section>

    <footer class="modal-card-foot">
      <igdb-credit linkable />
    </footer>
  </div>
</template>

<script>
import GameCardSearch from '@/components/GameCards/GameCardSearch';
import IgdbCredit from '@/components/IgdbCredit';
import { debounce } from 'lodash';
import { mapState } from 'vuex';

export default {
  components: {
    GameCardSearch,
    IgdbCredit,
  },

  props: {
    listId: {
      type: [Number, String, Boolean],
      required: true,
      default: 0,
    },
  },

  data() {
    return {
      searchText: '',
      loading: false,
    };
  },

  computed: {
    ...mapState(['results', 'gameLists', 'platform']),

    noResults() {
      return !this.loading
        && this.filteredResults.length === 0
        && this.searchText.trim().length > 0;
    },

    list() {
      return this.gameLists[this.platform.code];
    },

    listName() {
      return this.list[this.listId].name;
    },

    filteredResults() {
      return this.results
        ? this.results.filter(({ id }) => !this.list[this.listId].games.includes(id))
        : [];
    },

    gamesInListNames() {
      return this.gamesInList.map(({ name }) => name).join(', ');
    },

    gamesInList() {
      return this.results
        ? this.results.filter(({ id }) => this.list[this.listId].games.includes(id))
        : [];
    },

    gamesInListMessage() {
      const gameCount = this.gamesInList.length;
      const plural = gameCount === 1 ? '' : 's';

      return `${gameCount} game${plural}`;
    },
  },

  watch: {
    searchText(value) {
      if (value) {
        this.loading = true;
        this.search();
      }
    },
  },

  methods: {
    clear() {
      this.searchText = '';
      this.$store.commit('CLEAR_SEARCH_RESULTS');
      this.focusInput();
    },

    focusInput() {
      setTimeout(() => {
        this.$refs.searchInput.focus();
      }, 100);
    },

    added() {
      if (this.filteredResults.length === 1) {
        this.clear();
      }
    },

    search: debounce(
      // eslint-disable-next-line
      function() {
        this.$store.dispatch('SEARCH', this.searchText)
          .then(() => {
            this.error = null;
            this.loading = false;
            this.$refs.searchResults.scrollTop = 0;
          })
          .catch(({ data }) => {
            this.loading = false;
            this.error = data;
          });
      }, 300),
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  form {
    margin-bottom: $gp;
  }
</style>
