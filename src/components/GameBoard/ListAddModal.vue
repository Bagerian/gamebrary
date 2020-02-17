<template lang="html">
  <form @submit.prevent="addList" class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ title }}</p>
    </header>

    <section class="modal-card-body">
      <b-field label="Name">
        <b-input
          ref="listNameInput"
          v-model.trim="listName"
          :placeholder="$t('list.placeholder')"
          type="text"
          autofocus
          required
        />
      </b-field>

      <b-message type="is-warning is-small" v-if="isDuplicate">
        {{ $t('list.duplicateWarning') }}
      </b-message>
    </section>

    <footer class="modal-card-foot">
      <b-button
        :disabled="isDuplicate"
        class="is-primary"
        native-type="submit"
      >
        {{ buttonLabel }}
      </b-button>
    </footer>
  </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      listName: '',
    };
  },

  mounted() {
    this.focusInput();
  },

  computed: {
    ...mapState(['gameLists', 'platform']),

    lists() {
      return this.gameLists[this.platform.code];
    },

    title() {
      return this.isEmptyBoard
        ? this.$t('list.addFirstTime')
        : this.$t('list.add');
    },

    buttonLabel() {
      return this.isEmptyBoard
        ? this.$t('list.getStarted')
        : this.$t('global.save');
    },

    existingListNames() {
      return this.lists
        ? this.lists.map(({ name }) => name.toLowerCase())
        : [];
    },

    isDuplicate() {
      return this.existingListNames.includes(this.listName.toLowerCase());
    },

    isEmptyBoard() {
      const newList = this.gameLists && this.platform && !this.gameLists[this.platform.code];
      const emptyList = this.gameLists[this.platform.code]
      && this.gameLists[this.platform.code].length === 0;

      return newList || emptyList;
    },
  },

  methods: {
    focusInput() {
      setTimeout(() => {
        this.$refs.listNameInput.focus();
      }, 100);
    },

    addList() {
      const list = {
        games: [],
        name: this.listName,
      };

      this.$store.commit('ADD_LIST', list);

      this.$store.dispatch('SAVE_LIST', this.gameLists)
        .then(() => {
          this.$buefy.toast.open({ message: 'List added', type: 'is-success' });
          this.$parent.close();
          this.scroll();
        });
    },

    scroll() {
      this.$nextTick(() => {
        const gameBoard = document.querySelector('.game-board');

        gameBoard.scrollLeft = gameBoard.scrollWidth;
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "src/styles/styles.scss";

  .add-list-button {
    margin-right: $gp;
  }

  small {
    color: var(--warning-color);
    margin: 0 $gp;
  }
</style>
