<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="container">
    <header class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Boards
          </h1>
          <h2 class="subtitle">
            Manage your boards!
          </h2>
        </div>
      </div>
    </header>

    <section>
      <b-button class="is-primary">Add board</b-button>

      <h2>My boards</h2>

      <div class="boards">
        <a v-for="board in 10" class="box" :key="board" :href="`/board/${board}`">
          {{ board }}
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
