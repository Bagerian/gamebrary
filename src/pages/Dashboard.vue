<template lang="html">
  <div class="dashboard">
    <header>
      <h1 class="title">Dashboard</h1>
    </header>

    <section>
      <h2 class="subtitle">Boards</h2>

      <b-button
        type="is-primary"
        icon-left="plus"
        @click="addBoard"
      >
        Add board
      </b-button>
    </section>

    <div class="boards">
      <div class="card" v-for="id in 3" :key="id">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
              </figure>
            </div>
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
    </div>

    <h2 class="subtitle">Legacy boards</h2>

    <platforms />
  </div>
</template>

<script>
import AddBoard from '@/components/Dashboard/AddBoard';
import Platforms from '@/components/Dashboard/Platforms';

export default {
  components: {
    Platforms,
  },

  methods: {
    addBoard() {
      this.$buefy.modal.open({
        parent: this,
        component: AddBoard,
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
section {
  display: grid;
  // align-items: center;
  grid-template-columns: 1fr auto;
}

.dashboard {
  padding: 16px;
}

.boards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
}
</style>
