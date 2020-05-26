<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="game-actions">

    <b-button
      class="is-primary"
      icon-right="clock"
      @click="openProgress"
    />

    <b-button
      class="is-primary"
      :title="$t('notes.addNote')"
      icon-right="sticky-note"
      @click="openNotes"
    />

    <div v-if="hasTags" class="tags">
      <b-button
        class="is-primary"
        :title="$t('tags.addTag')"
        @click="openTags"
      >
        <i class="fas fa-tag" />
    </b-button>
    </div>

    <b-button
      v-if="game && !list.games.includes(game.id)"
      class="is-primary"
      :title="$t('list.addGame')"
      @click="addGame"
    >
      <i class="fas fa-plus" />
  </b-button>

    <b-button
      v-else
      class="is-danger"
      :title="$t('gameDetail.removeFromList')"
      @click="removeGame"
    >
      <i class="far fa-trash-alt" />
  </b-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameNotes from '@/components/GameDetail/GameNotes';
import GameTagsModal from '@/components/GameBoard/GameTagsModal';
import GameProgressModal from '@/components/GameDetail/GameProgressModal';

export default {
  components: {
    GameNotes,
    GameTagsModal,
    GameProgressModal,
  },

  props: {
    listId: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    ...mapState(['gameLists', 'platform', 'game']),
    ...mapGetters(['hasTags']),

    // TODO: create getter for activeList
    activePlatform() {
      return this.gameLists[this.platform.code];
    },

    list() {
      return this.activePlatform[this.listId];
    },
  },

  methods: {
    openProgress() {
      this.$buefy.modal.open({
        parent: this,
        component: GameProgressModal,
      });
    },

    openNotes() {
      this.$buefy.modal.open({
        parent: this,
        component: GameNotes,
      });
    },

    openTags() {
      this.$buefy.modal.open({
        parent: this,
        component: GameTagsModal,
        props: {
          gameTagsId: this.game.id,
        },
        trapFocus: true,
      });
    },

    removeGame() {
      const data = {
        listId: this.listId,
        gameId: this.game.id,
      };

      this.$store.commit('REMOVE_GAME', data);

      this.$store
        .dispatch('SAVE_LIST', this.gameLists)
        .then(() => {
          this.$buefy.toast.open({ message: `Removed ${this.game.name} from list ${this.list.name}`, type: 'is-success' });
        })
        .catch(() => {
          this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });
    },

    addGame() {
      const data = {
        listId: this.listId,
        gameId: this.game.id,
      };

      // this.$emit('added');
      this.$store.commit('ADD_GAME', data);

      this.$ga.event({
        eventCategory: 'game',
        eventAction: 'add',
        eventLabel: 'addGame',
        eventValue: data,
      });

      this.$store.dispatch('SAVE_LIST', this.gameLists)
        .then(() => {
          this.$buefy.toast.open({ message: `Added ${this.game.name} to list ${this.list.name}`, type: 'is-success' });
        })
        .catch(() => {
          this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.game-actions {
  background: #ccf;
  display: grid;
  grid-template-columns: repeat(4, 44px);
  grid-gap: 8px;
  margin-top: 16px;
  text-align: left;
}
</style>
