<!-- TODO: when file management is in place, allow to insert image from your files -->
<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Add note for {{ game.name }}
      </p>
    </header>

    <section class="modal-card-body">
      <b-field label="Message">
        <b-input
          type="textarea"
          v-model.trim="localNote.text"
          placeholder="Type note here"
        />
      </b-field>

      <small>
        <a href="https://guides.github.com/features/mastering-markdown/" target="_blank">
          <i class="fab fa-markdown" />
          Markdown supported
        </a>
      </small>

      <div class="preview" v-if="!isEmptyNote && showPreview">
        <h3>Preview</h3>

        <div class="markdown">
          <vue-markdown :source="localNote.text" />
        </div>
      </div>
    </section>

    <footer class="modal-card-foot">
      <b-button
        class="is-primary save"
        :disabled="isEmptyNote"
        @click="saveNote"
      >
        {{ $t('global.save') }}
      </b-button>

      <b-button
        v-if="localNote.text"
        @click="togglePreview"
      >
        <i :class="`far fa-eye${showPreview ? '-slash' : ''}`" />
        Toggle preview
      </b-button>

      <!-- TODO: Add confirmation -->
      <b-button
        type="is-danger"
        icon-right="trash"
        @click="deleteNote"
      />
    </footer>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    VueMarkdown,
  },

  data() {
    return {
      showPreview: false,
      localNote: {
        text: null,
      },
    };
  },

  computed: {
    ...mapState(['game']),
    ...mapGetters(['gameNote']),

    isEmptyNote() {
      return Boolean(this.localNote && this.localNote.text === null);
    },
  },

  methods: {
    reset() {
      this.localNote = this.gameNote
        ? JSON.parse(JSON.stringify(this.gameNote))
        : { text: null };
    },

    async deleteNote() {
      this.$store.commit('REMOVE_GAME_NOTE');

      await this.$store.dispatch('SAVE_NOTES_NO_MERGE')
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error deleting your note', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'Note deleted', type: 'is-success' });
      this.$refs.notesModal.close();
    },

    togglePreview() {
      this.showPreview = !this.showPreview;
    },

    async saveNote() {
      this.$store.commit('SET_GAME_NOTE', this.localNote);

      await this.$store.dispatch('SAVE_NOTES')
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error saving your note', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'Note saved', type: 'is-success' });
      this.$parent.close();
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  // .preview {
  //   margin: $gp 0 $gp * 2;
  //
  //   .markdown {
  //     margin-bottom: $gp;
  //   }
  // }
</style>
