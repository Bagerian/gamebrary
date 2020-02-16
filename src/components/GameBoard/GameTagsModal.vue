<template lang="html">
  <div class="modal-card">
    <header class="modal-card-head">
      {{ $t('tags.editTags') }}
    </header>

    <section class="modal-card-body">
      <h2 class="subtitle">
        All tags
      </h2>

      <b-taglist>
        <b-tag
          v-for="(tag, name) in tags"
          :key="name"
          v-if="tag.games.includes(gameTagsId)"
          closable
          aria-close-label="Close tag"
          :style="`background-color: ${tag.hex}; color: ${tag.tagTextColor}`"
          @click.native="tryAdd(tag.games, name)"
          @close="removeTag(name)"
        >
          {{ name }}
        </b-tag>
      </b-taglist>

      <tag
        v-for="(tag, name) in tags"
        v-if="!tag.platform"
        :key="name"
        :label="name"
        :hex="tag.hex"
        :text-hex="tag.tagTextColor"
        :readonly="!tag.games.includes(gameTagsId)"
        @action="tryAdd(tag.games, name)"
        @close="removeTag(name)"
      />

      <h3>{{ platform.name }} tags</h3>

      <tag
        v-for="(tag, name) in tags"
        v-if="tag.platform && tag.platform === platform.id"
        :key="name"
        :label="name"
        :hex="tag.hex"
        :text-hex="tag.tagTextColor"
        :readonly="!tag.games.includes(gameTagsId)"
        @action="tryAdd(tag.games, name)"
        @close="removeTag(name)"
      />
    </section>

    <footer class="modal-card-foot">
      footer
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tag from '@/components/Tag';

export default {
  components: {
    Tag,
  },

  props: {
    gameTagsId: {
      type: Number,
      default: null,
    },
  },

  computed: {
    ...mapState(['tags', 'platform', 'game']),
  },

  methods: {
    tryAdd(games, tagName) {
      if (!games.includes(this.gameTagsId)) {
        this.addTag(tagName);
      }
    },

    addTag(tagName) {
      this.$store.commit('ADD_GAME_TAG', { tagName, gameId: this.gameTagsId });
      this.saveTags();
    },

    removeTag(tagName) {
      this.$store.commit('REMOVE_GAME_TAG', { tagName, gameId: this.gameTagsId });
      this.saveTags();
    },

    async saveTags() {
      await this.$store.dispatch('SAVE_TAGS', this.tags)
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error saving your tag', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'Tags updated', type: 'is-success' });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
