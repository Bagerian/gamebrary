<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <b-navbar transparent>
      <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ name: 'dashboard' }">
              <img
                  src="/static/gamebrary-logo.png"
                  alt="Gamebrary"
              >
          </b-navbar-item>
      </template>
      <!-- <template slot="start">
          <b-navbar-item href="#">
              Home
          </b-navbar-item>
          <b-navbar-item href="#">
              Documentation
          </b-navbar-item>
          <b-navbar-dropdown label="Info">
              <b-navbar-item href="#">
                  About
              </b-navbar-item>
              <b-navbar-item href="#">
                  Contact
              </b-navbar-item>
          </b-navbar-dropdown>
      </template> -->

      <template slot="end">
          <b-navbar-item>
              <b-button
                class="is-primary"
                icon-right="cog"
                @click="openSettings"
              />
          </b-navbar-item>
      </template>
  </b-navbar>
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
  .navbar {
    background-color: transparent !important;
  }
</style>
