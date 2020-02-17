<template lang="html">
  <div v-if="gameId && games[gameId]" :class="gameCardClass">

    <img :src="coverUrl" :alt="game.name" >

    <div class="game-info">
      <a @click="openDetails" v-text="game.name" />

      <b-rate
        v-if="showGameRatings"
        :value="roundedRating"
        size="is-small"
        disabled
        class="drag-filter"
        @click.native="openDetails"
      />

      <b-button
        class="is-primary is-small"
        @click="addGame"
      >
        {{ $t('list.addGame') }}
      </b-button>
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

$gameCoverWidth: 80px;

.card {
  background: var(--game-card-background);
  position: relative;
  display: grid;
  grid-template-columns: $gameCoverWidth auto;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: $gp / 2;

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

    button {
      margin-top: $gp / 2;
      align-self: flex-start;
    }

    a {
      color: var(--game-card-text-color);
    }
  }
}
</style>

