<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div
    v-if="gameId && games[gameId]"
    :class="gameCardClass"
  >
    <img
      :src="coverUrl"
      :alt="game.name"
      @click="openDetails"
    >

    <b-progress
      v-if="gameProgress"
      type="is-success"
      size="is-small"
      :value="Number(gameProgress)"
    />

    <span
      v-if="showReleaseDates && showGameInfoOnCover && releaseDate"
      v-text="releaseDate"
      class="release-date drag-filter"
    >
    </span>

    <b-button
      size="is-small"
      icon-left="grip-vertical"
      class="is-light draggable-icon game-drag-handle"
    />
  </div>
</template>

<script>
import GameCardUtils from '@/components/GameCards/GameCard';

export default {
  mixins: [GameCardUtils],
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// .card {
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   width: calc((100%/3) - 5.5px);
//   margin-bottom: 4px;
//   border-radius: var(--border-radius);
//   overflow: hidden;
//   cursor: pointer;
//
//   img {
//     width: 100%;
//     height: auto;
//
//     + .release-date {
//       margin: 0;
//       position: absolute;
//       bottom: $gp / 4;
//       right: $gp / 4;
//       padding: $gp / 8 $gp / 6;
//       background: var(--list-background);
//     }
//   }
//
//   .release-date {
//     color: var(--accent-color);
//     font-size: $font-size-xsmall;
//     font-weight: bold;
//     justify-self: end;
//     margin: $gp / 4 0;
//     border-radius: calc(var(--border-radius) / 2);
//   }
//
//   .draggable-icon {
//     @include drag-cursor;
//     position: absolute;
//     color: #e5e5e5;
//     right: $gp / 3;
//     top: $gp / 3;
//
//     &:hover {
//       color: #a5a2a2;
//     }
//   }
// }
//
// .progress-wrapper {
//   position: absolute;
//   margin: 2px;
//   width: calc(100% - 4px);
//   bottom: 4px;
// }
</style>
