<template lang="html">
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ $t('progresses.modalTitle') }}
      </p>
    </header>

    <section class="modal-card-body">
      <h2>{{ localProgress }}%</h2>

      <input
        v-model="localProgress"
        type="range"
        max="100"
        step="5"
        @change="saveProgress"
      >

      <b-button class="is-danger" @click="deleteProgress">
        {{ $t('progresses.deleteProgress') }}
      </b-button>
    </section>

    <footer class="modal-card-foot">
    </footer>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      localProgress: {},
    };
  },

  computed: {
    ...mapGetters(['gameProgress']),

    defaultValue() {
      return {
        value: 0,
      };
    },
  },

  watch: {
    gameProgress() {
      this.reset();
    },
  },

  mounted() {
    this.reset();
  },

  methods: {
    reset() {
      this.localProgress = this.gameProgress
        ? JSON.parse(JSON.stringify(this.gameProgress))
        : 0;
    },

    async deleteProgress() {
      this.$store.commit('REMOVE_GAME_PROGRESS');

      await this.$store.dispatch('SAVE_PROGRESSES_NO_MERGE')
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error deleting your progress', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'Progress deleted', type: 'is-success' });
      this.$refs.progressModal.close();
    },

    saveProgress: debounce(
      // eslint-disable-next-line
      function () {
        this.$store.commit('SET_GAME_PROGRESS', this.localProgress);

        this.$store.dispatch('SAVE_PROGRESSES')
          .then(() => {
            this.$buefy.toast.open({ message: 'Progress updated', type: 'is-success' });
          })
          .catch(() => {
            this.$buefy.toast.open({ message: 'There was an error saving your progress', type: 'is-danger' });
            this.$router.push({ name: 'sessionExpired' });
          });
      }, 300),
  },
};
</script>
