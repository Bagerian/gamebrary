<!-- TODO: abstract styles, only add card specific styles in each component -->
<template lang="html">
  <div v-if="gameId && games[gameId]" :class="gameCardClass">
    <img
      :src="coverUrl"
      :alt="game.name"
      @click="openDetails"
    >

    <div class="game-info">
      <a
        v-if="list.view !== 'covers'"
        v-text="game.name"
        class="drag-filter"
        @click="openDetails"
      />

      <i class="fas fa-grip-vertical draggable-icon game-drag-handle" />

      <game-progress
        v-if="gameProgress"
        small
        :progress="gameProgress"
        class="drag-filter"
        @click.native="openDetails"
      />

      <b-rate
        v-if="showGameRatings"
        :value="roundedRating"
        size="is-small"
        disabled
        @click.native="openDetails"
      />

      <i
        v-if="note"
        :title="note"
        class="fas fa-sticky-note note drag-filter"
        @click="openDetails"
      />

      <!-- TODO: use array function -->
      <b-taglist v-if="hasTags" class="drag-filter">
        <b-tag
          v-for="({ games, hex, tagTextColor }, name) in tags"
          v-if="games.includes(game.id)"
          :key="name"
          :style="`background-color: ${hex}; color: ${tagTextColor}`"
          @click.native="openTags"
        >
          {{ name }}
        </b-tag>
      </b-taglist>
  </div>
</div>
</template>

<script>
import GameProgress from '@/components/GameDetail/GameProgress';
import GameCardUtils from '@/components/GameCards/GameCard';

export default {
  components: {
    GameProgress,
  },

  mixins: [GameCardUtils],
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  $gameCoverWidth: 80px;

  .card {
    background: var(--game-card-background);
    margin-bottom: $gp / 2;
    position: relative;
    display: grid;
    grid-template-columns: $gameCoverWidth auto;
    border-radius: var(--border-radius);
    overflow: hidden;

    &.card-placeholder {
      background: #e5e5e5;
      outline: 1px dashed #a5a2a2;
      opacity: 0.3;

      img {
        filter: grayscale(1);
      }

      .game-card-options {
        display: none;
      }
    }

    img {
      width: $gameCoverWidth;
      height: auto;
      display: flex;
      align-self: center;
      cursor: pointer;
    }

    .game-info {
      padding: $gp / 2 $gp;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &:hover {
        a {
          text-decoration: underline;
        }
      }

      a {
        cursor: pointer;
        margin-right: $gp / 2;
        color: var(--game-card-text-color);
      }
    }

    .draggable-icon {
      @include drag-cursor;
      position: absolute;
      color: #e5e5e5;
      right: $gp / 3;
      top: $gp / 3;

      &:hover {
        color: #a5a2a2;
      }
    }
  }

  .note {
    color: var(--note-color);
  }
</style>

