import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    gameId: Number,
    listId: Number,
  },

  data() {
    return {
      showEditOptions: false,
    };
  },

  computed: {
    ...mapState(['settings', 'games', 'gameLists', 'platform', 'user', 'tags', 'activeList', 'notes', 'progresses']),
    ...mapGetters(['hasTags']),

    showGameRatings() {
      return this.game.rating && this.list && !this.list.hideGameRatings;
    },

    roundedRating() {
      return this.game && this.game.rating
        ? Math.round((this.game.rating / 20) * 2) / 2
        : 0;
    },

    showGameInfo() {
      return this.list && !this.list.hideGameInfo;
    },

    showGameInfoOnCover() {
      return this.list && !this.list.hideGameInfoOnCover;
    },

    gameProgress() {
      return this.game
        && this.platform
        && this.progresses[this.platform.code]
        && this.progresses[this.platform.code][this.game.id];
    },

    gameCardClass() {
      const badge = this.showGameInfoOnCover && this.gameProgress === '100'
        ? 'badge'
        : '';

      return [
        'card',
        this.list.view,
        badge,
      ];
    },

    activePlatform() {
      return this.gameLists[this.platform.code];
    },

    note() {
      return this.notes && this.notes[this.gameId] && this.notes[this.gameId].text;
    },

    progress() {
      return this.progresses && this.progresses[this.gameId] && this.progresses[this.gameId].number;
    },

    list() {
      return this.activePlatform[this.listId];
    },

    game() {
      return this.games[this.gameId];
    },

    coverUrl() {
      const game = this.games[this.gameId];

      return game.cover && game.cover.image_id
        ? `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover.image_id}.jpg`
        : '/static/no-image.jpg';
    },

    addToLabel() {
      return this.list.name.length >= 25
        ? 'list'
        : this.list.name;
    },
  },

  methods: {
    openDetails() {
      this.$bus.$emit('OPEN_GAME', {
        id: this.game.id,
        listId: this.listId,
      });
    },

    openTags() {
      this.$bus.$emit('OPEN_TAGS', this.game.id);
    },

    addGame() {
      const data = {
        listId: this.listId,
        gameId: this.gameId,
      };

      this.$emit('added');
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

    removeTag(tagName) {
      this.$store.commit('REMOVE_GAME_TAG', { tagName, gameId: this.gameId });
      this.saveTags();
    },

    async saveTags() {
      await this.$store.dispatch('SAVE_TAGS', this.tags)
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error saving your tag', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'Tags updated', type: 'is-success' });
    },
  },
};
