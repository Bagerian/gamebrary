<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
        <p class="modal-card-title">
          Board Settings
        </p>
    </header>
    <section class="modal-card-body">
      <b-button class="is-primary" @click="openTags">
        Manage tags
      </b-button>

      <game-board-settings v-model="localSettings" v-if="localSettings" @save="save" />

      <div class="setting">
        <i class="fas fa-sign-out-alt" />
        {{ $t('settings.signOut') }}
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button @click="signOut">
        {{ $t('settings.signOut') }}
      </b-button>
    </footer>
</div>

    <!-- <modal
    :message="$t('settings.deleteAccount.message')"
    :title="$t('settings.deleteAccount.title')"
    :action-text="$t('settings.deleteAccount.button')"
    @action="deleteAccount"
    >
    <div class="setting">
      <i class="fas fa-exclamation-triangle" />
      {{ $t('settings.deleteAccount.button') }}

      <button class="danger">
        {{ $t('settings.deleteAccount.button') }}
      </button>
    </div>
  </modal> -->
</template>

<script>
import { mapState } from 'vuex';
import 'firebase/firestore';
import 'firebase/auth';
import Gravatar from 'vue-gravatar';
import GameBoardSettings from '@/components/Settings/GameBoardSettings';
import SettingsGlobal from '@/components/Settings/SettingsGlobal';
import AboutSettings from '@/components/Settings/AboutSettings';
import TagsSettings from '@/components/Settings/TagsSettings';
import moment from 'moment';
import firebase from 'firebase/app';

export default {
  components: {
    GameBoardSettings,
    SettingsGlobal,
    AboutSettings,
    TagsSettings,
    Gravatar,
  },

  data() {
    return {
      activeSection: null,
      activeComponent: null,
      language: null,
      reloading: false,
      localSettings: null,
      moment,
      defaultSettings: {
        language: 'en',
        theme: {
          global: 'default',
        },
        position: {
          global: 'top',
        },
        borderRadius: true,
        showGameCount: false,
      },
    };
  },

  computed: {
    ...mapState(['user', 'gameLists', 'settings', 'platform']),

    dateJoined() {
      return moment(this.user.dateJoined).format('LL');
    },

    isGameBoard() {
      return this.$route.name === 'game-board';
    },

    exitUrl() {
      // TODO: move to getter and replace other instances
      return process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://gamebrary.com';
    },
  },

  mounted() {
    this.localSettings = this.settings !== null
      ? JSON.parse(JSON.stringify(this.settings))
      : JSON.parse(JSON.stringify(this.defaultSettings));

    if (this.platform && !this.localSettings[this.platform.code]) {
      this.localSettings[this.platform.code] = {
        theme: 'default',
        position: 'top',
        borderRadius: true,
        showGameCount: false,
      };
    }
  },

  methods: {
    openTags() {
      this.$buefy.modal.open({
        parent: this,
        component: TagsSettings,
      });
    },

    save() {
      // TODO: make async
      this.$store.dispatch('SAVE_SETTINGS', this.localSettings)
        .then(() => {
          this.$buefy.toast.open({ message: 'Settings saved', type: 'is-success' });
        })
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error saving your settings', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });
    },

    deleteAccount() {
      const db = firebase.firestore();

      // TODO: Add progress bar, delete tags, files, etc...
      // TODO: move to actions
      db.collection('settings').doc(this.user.uid).delete()
        .then(() => {
        // TODO: move to actions
          db.collection('lists').doc(this.user.uid).delete()
            .then(() => {
              this.$buefy.toast.open({ message: 'Account deleted', type: 'is-success' });
              this.exit();
            })
            .catch(() => {
              this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
              this.$router.push({ name: 'sessionExpired' });
            });
        })
        .catch(() => {
          this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });
    },

    signOut() {
      firebase.auth().signOut()
        .then(() => {
          this.exit();
        })
        .catch((message) => {
          this.$buefy.toast.open({ message, type: 'is-danger' });
        });
    },

    exit() {
      this.$store.commit('CLEAR_SESSION');
      window.location.href = this.exitUrl;
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  $avatarSize: 30px;

  .settings {
    display: flex;
    flex-direction: column;
  }

  .avatar {
    width: $avatarSize;
    height: $avatarSize;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
</style>
