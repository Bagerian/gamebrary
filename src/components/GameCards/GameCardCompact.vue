<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
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
        @click="openDetails"
        class="drag-filter"
        v-text="game.name"
      />

      <b-button
        size="is-small"
        icon-left="grip-vertical"
        class="is-light draggable-icon game-drag-handle"
      />

      <span
        v-if="showReleaseDates && releaseDate"
        v-text="releaseDateText"
        class="release-date drag-filter"
      />

      <b-rate
        v-if="showGameRatings"
        :value="roundedRating"
        size="is-small"
        disabled
        class="drag-filter"
        @click.native="openDetails"
      />

      <b-progress
        v-if="gameProgress"
        type="is-success"
        size="is-small"
        format="percent"
        :value="Number(gameProgress)"
        show-value
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
import GameCardUtils from '@/components/GameCards/GameCard';

export default {
  mixins: [GameCardUtils],
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  .card {
    background: var(--game-card-background);
    margin-bottom: $gp / 2;
    position: relative;
    display: grid;
    grid-template-columns: 50px auto;
    border-radius: var(--border-radius);
    overflow: hidden;

    img {
      width: 50px;
      height: auto;
      display: flex;
      cursor: pointer;
    }

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

    .game-info {
      padding: $gp / 2 $gp;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .game-tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: $gp / 4;
      }

      .tag {
        margin-right: $gp / 4;
      }

      i.tags {
        position: absolute;
        bottom: $gp * 1.5;
        right: $gp / 4;
      }

      .release-date {
        color: var(--accent-color);
        margin: $gp / 4 0;
      }

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

    .game-tag {
      margin-bottom: $gp / 3;
    }
  }

  .note {
    color: var(--note-color);
  }
</style>

