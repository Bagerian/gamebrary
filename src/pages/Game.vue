<template lang="html">
  <div class="game">
    <header>
      <img :src="coverUrl" :alt="games[id].name" class="game-cover" />

      <!-- <div
        v-if="game && game.age_ratings"
        class="game-rating"
      >
        <img
          v-for="{ rating, synopsis, id } in game.age_ratings"
          :key="id"
          :src="`/static/img/age-ratings/${ageRatings[rating]}.png`"
          :alt="synopsis"
        >
      </div> -->
    </header>

    <main>
      <div class="game-title">
        <h2>{{ games[id].name }}</h2>
        <h4>{{ platform.name }}</h4>

        <game-progress
          v-if="gameProgress"
          :progress="gameProgress"
        />

        <game-rating v-if="games[id].rating" :rating="games[id].rating" />
        <game-tags />

        <!-- TODO: set list id to store instead of passing it around -->
        <game-actions :list-id="listId" />
      </div>

      <div class="details" v-if="game">
        <game-description />
        <div class="markdown" v-if="hasNote">
          <vue-markdown :source="notes[game.id].text" />
        </div>
        <game-details />
        <game-links />
        <game-videos />
        <game-screenshots />
        <igdb-credit gray />

        <!-- <section v-if="gamePlatforms && gamePlatforms.length > 0">
          <h4>{{ $t('gameDetail.gamePlatforms') }}</h4>

          <div class="platforms">
            <platform
              v-for="platform in gamePlatforms"
              :key="platform.name"
              :platform="platform"
            />
          </div>
        </section> -->
      </div>

      <placeholder v-else :lines="3" class="game-placeholder" />
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GameScreenshots from '@/components/GameDetail/GameScreenshots';
import VueMarkdown from 'vue-markdown';
import GameProgress from '@/components/GameDetail/GameProgress';
import GameActions from '@/components/GameDetail/GameActions';
import GameTags from '@/components/GameDetail/GameTags';
import GameRating from '@/components/GameDetail/GameRating';
import GameLinks from '@/components/GameDetail/GameLinks';
import GameDescription from '@/components/GameDetail/GameDescription';
import GameVideos from '@/components/GameDetail/GameVideos';
import GameDetails from '@/components/GameDetail/GameDetails';
import Placeholder from '@/components/Placeholder';
import IgdbCredit from '@/components/IgdbCredit';
import GameDetailPlaceholder from '@/components/GameDetail/GameDetailPlaceholder';

export default {
  components: {
    IgdbCredit,
    GameRating,
    GameLinks,
    GameDescription,
    Placeholder,
    GameScreenshots,
    GameActions,
    VueMarkdown,
    GameProgress,
    GameTags,
    GameVideos,
    GameDetails,
    GameDetailPlaceholder,
  },

  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    listId: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    ...mapState(['game', 'user', 'platform', 'tags', 'gameLists', 'games', 'notes']),
    ...mapGetters(['ageRatings', 'gamePlatforms', 'hasTags', 'gameProgress']),

    // TODO: create getter for activeList
    activePlatform() {
      return this.gameLists[this.platform.code];
    },

    hasNote() {
      return this.notes && this.game && this.notes[this.game.id] && this.notes[this.game.id].text;
    },

    list() {
      return this.activePlatform[this.listId];
    },

    coverUrl() {
      return this.games[this.id] && this.games[this.id].cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${this.games[this.id].cover.image_id}.jpg`
        : '/static/no-image.jpg';
    },
  },

  mounted() {
    this.loadGame(this.id);
  },

  methods: {
    loadGame(gameId) {
      this.$store.commit('CLEAR_ACTIVE_GAME');

      this.$store
        .dispatch('LOAD_GAME', gameId)
        .then(() => {
          if (this.game) {
            this.$ga.event({
              eventCategory: 'game',
              eventAction: 'view',
              eventLabel: 'gameViewed',
              eventValue: `${this.platform.name} - ${this.game.name}`,
            });

            document.title = `${this.game.name} (${this.platform.name}) - Gamebrary`;
          }
        })
        .catch(() => {
          this.$bus.$emit('TOAST', { message: 'Error loading game', type: 'error' });
        });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '~styles/styles';

.game {
  display: grid;
  grid-template-columns: 180px auto;
  grid-gap: $gp;
  margin-top: $gp;

  @media ($small) {
    grid-template-columns: auto;
  }
}

header {
  @media ($small) {
    text-align: center;
  }
}

.game-cover {
  border-radius: var(--border-radius);
}

.game-title {
  @media($small) {
    text-align: center;
    width: calc(100vw - #{$gp * 2});
  }
}

.game-placeholder {
  margin-top: $gp;
}
</style>
