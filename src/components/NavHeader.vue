<template lang="html">
  <nav>
    <router-link
      :to="{ path: '/platforms' }"
      tag="img"
      class="logo"
      src="/static/gamebrary-logo.png"
    />

    <!-- <router-link
      :to="{ name: 'settings' }"
      v-if="user"
      tag="button"
      class="button is-primary"
    >
      <i class="fas fa-cog" />
    </router-link> -->
    <b-button
      class="is-primary"
      icon-right="cog"
      @click="openSettings"
    />
  </nav>
</template>

<script>
import Settings from '@/pages/Settings';
import { mapState } from 'vuex';

export default {
  components: {
    Settings,
  },

  computed: {
    ...mapState(['user', 'platform', 'settings']),

    isLoggedIn() {
      return this.user && this.user.email;
    },

    title() {
      return this.$route.name === 'game-board' && this.platform
        ? this.platform.name
        : 'Gamebrary';
    },

    logoRoute() {
      if (this.$route.name === 'game-detail' && this.platform) {
        return 'game-board';
      }

      if (this.$route.name === 'settings' && this.platform) {
        return 'game-board';
      }

      if (this.$route.name === 'game-board') {
        return 'platforms';
      }

      return null;
    },
  },

  methods: {
    openSettings() {
      this.$buefy.modal.open({
        parent: this,
        component: Settings,
        props: {
          listId: this.listIndex,
        },
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $gp / 2;

    .logo {
      height: 30px;
    }
  }
</style>
