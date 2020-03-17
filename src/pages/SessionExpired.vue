<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="session-expired">
    <b-message type="is-warning">
      {{ $t('sessionExpired.title') }}
    </b-message>

    <div class="actions">
      <b-button
        class="is-primary"
        @click="login"
      >
        {{ $t('sessionExpired.login') }}
      </b-button>

      <a
        :href="exitUrl"
        class="button"
      >
        {{ $t('sessionExpired.exit') }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    exitUrl() {
      // TODO: move to getter and replace other instances
      return process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://gamebrary.com';
    },

    homeUrl() {
      // TODO: move to getter and replace other instances
      return process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'https://app.gamebrary.com';
    },
  },

  methods: {
    login() {
      this.$store.commit('CLEAR_SESSION');
      window.location.href = this.homeUrl;
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~styles/styles";

.session-expired {
  color: #555555;
  min-height: calc(100vh - #{$navHeight});
  padding: 0 $gp;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.actions {
  display: grid;
  margin-top: $gp;
  grid-template-columns: auto auto;
  grid-gap: $gp;
  text-align: center;
  align-items: center;
}
</style>
