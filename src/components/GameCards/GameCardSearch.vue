<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        pre
        <div class="media-content">
          <p class="title is-4">John Smith</p>
          <p class="subtitle is-6">@johnsmith</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  </div>
<!-- <template>
    <section>
        <article class="media" v-for="i in media" :key="i">
            <figure class="media-left">
                <p class="image is-64x64">
                    <b-skeleton circle width="64px" height="64px"></b-skeleton>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <b-skeleton active></b-skeleton>
                        <b-skeleton height="80px"></b-skeleton>
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </section>
</template>

<script>
export default {
    data() {
        return {
            media: 3
        }
    }
}
</script> -->
  <!-- <div v-if="gameId && games[gameId]" :class="gameCardClass">

    <img :src="coverUrl" :alt="game.name" />

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


      <b-button type="is-primary" icon-left="plus" @click="addGame">
        {{ $t('list.addGame') }}
      </b-button>
    </div>
  </div> -->
</template>

<script>
import GameCardUtils from '@/components/GameCards/GameCard';

export default {
  mixins: [GameCardUtils],
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// $gameCoverWidth: 80px;
//
// .card {
//   background: var(--game-card-background);
//   position: relative;
//   display: grid;
//   grid-template-columns: $gameCoverWidth auto;
//   border-radius: var(--border-radius);
//   overflow: hidden;
//   margin-bottom: $gp / 2;
//
//   img {
//     width: $gameCoverWidth;
//     height: auto;
//     display: flex;
//     align-self: center;
//     cursor: pointer;
//   }
//
//   .game-info {
//     padding: $gp / 2 $gp;
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//
//     a {
//       color: var(--game-card-text-color);
//     }
//   }
// }
</style>

