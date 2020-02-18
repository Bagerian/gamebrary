<template lang="html">
  <section>
    <h3>Theme</h3>

    <wallpaper-upload />

    <div class="setting" v-if="value[platform.code]">
      <i class="fas fa-palette" />
      <h5>Theme</h5>

      <b-select
        placeholder="Select a theme"
        v-model="value[platform.code].theme"
        @input="$emit('save')"
      >
        <option
          v-for="{ id, name } in themes"
          :key="id"
          :value="id"
        >
          {{ name }}
        </option>
      </b-select>
    </div>

    <div class="setting">
      <i class="fas fa-bars" />
      <h5>Header position (only affects mobile)</h5>

      <b-select v-model="value[platform.code].position" @input="$emit('save')">
        <option
          v-for="{ id, name } in positions"
          :key="id"
          :value="id"
        >
          {{ name }}
        </option>
      </b-select>
    </div>

    <div class="setting">
      <i class="fas fa-shapes" />
      <h5>Border Radius</h5>

      <b-switch v-model="value[platform.code].borderRadius" @input="$emit('save')" />
    </div>

    <h3>Gameboard</h3>
    <div class="setting">
      <i class="fas fa-heading" />
      <h5>Show amount of games next to list title</h5>

      <b-switch v-model="value[platform.code].showGameCount" @input="$emit('save')" />
    </div>

    <div class="setting">
      <i class="fas fa-exclamation-triangle" />
      <h5>{{ $t('gameBoard.settings.dangerZone') }}</h5>

      <b-button type="is-danger" @click="deleteBoard">
        Delete board
      </b-button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import themes from '@/themes';
import positions from '@/positions';
import WallpaperUpload from '@/components/WallpaperUpload';

export default {
  components: {
    WallpaperUpload,
  },

  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      themes,
      positions,
    };
  },

  computed: {
    ...mapState(['user', 'platform', 'gameLists']),

    shareText() {
      return `Check out my ${this.platform.name} collection at Gamebrary`;
    },

    tweetUrl() {
      return `https://twitter.com/intent/tweet?text=${this.shareText}&url=${encodeURIComponent(this.shareUrl)}`;
    },

    redditUrl() {
      return `https://www.reddit.com/submit?url=${this.shareUrl}&title=${this.shareText}`;
    },

    shareUrl() {
      const url = process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : 'https://app.gamebrary.com';

      return `${url}/s?id=${this.user.uid}&list=${this.platform.code}`;
    },
  },

  mounted() {
    if (!this.value[this.platform.code]) {
      this.value[this.platform.code] = {};
    }
  },

  methods: {
    deleteBoard() {
      this.$buefy.dialog.confirm({
        title: `Delete ${this.platform.name} collection`,
        message: `Your ${this.platform.name} collection will be deleted forever.`,
        type: 'is-warning',
        onConfirm: () => this.deletePlatform(),
      });
    },

    deletePlatform() {
      this.$store.commit('REMOVE_PLATFORM');

      this.$store.dispatch('SAVE_LIST_NO_MERGE', this.gameLists)
        .then(() => {
          this.$router.push({ name: 'platforms' });
        })
        .catch(() => {
          this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });
    },
  },
};
</script>
