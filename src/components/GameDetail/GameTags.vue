<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="game-tags">
    <!-- TODO: use array function to filter out tags -->
    <tag
      v-for="({ games, hex, tagTextColor }, name) in tags"
      v-if="game && games.includes(game.id)"
      :key="name"
      :label="name"
      :hex="hex"
      :text-hex="tagTextColor"
      readonly
      @action="openTags"
      @close="removeTag(name)"
    />
  </div>
</template>

<script>
import Tag from '@/components/Tag';
import GameTagsModal from '@/components/GameBoard/GameTagsModal';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    Tag,
    GameTagsModal,
  },

  computed: {
    ...mapGetters(['hasTags']),
    ...mapState(['tags', 'games', 'game']),
  },

  methods: {
    removeTag(tagName) {
      this.$store.commit('REMOVE_GAME_TAG', { tagName, gameId: this.game.id });
      this.saveTags();
    },

    openTags() {
      this.$buefy.modal.open({
        parent: this,
        component: GameTagsModal,
        props: {
          gameTagsId: this.game.id,
        },
        trapFocus: true,
      });
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
.tag {
  margin-right: 8px;
}
</style>
