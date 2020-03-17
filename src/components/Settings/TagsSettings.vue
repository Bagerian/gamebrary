<!-- TODO: replace tag with b-tags -->
<!-- TODO: Rename -->
<!-- TODO: CSS? -->
<!-- TODO: HTML? -->
<!-- TODO: imports -->
<template lang="html">
  <div class="tags-settings modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Tags
      </p>
    </header>

    <section class="modal-card-body">
      <form @submit.prevent="createTag">
          <b-field>
            <b-input
              ref="tagInput"
              v-model="tagName"
              required
              maxlength="20"
              :placeholder="$t('tags.inputPlaceholder')"
              type="text"
            />
          </b-field>

          <swatches
            v-model="tagHex"
            show-fallback
            popover-to="left"
            swatch-size="32"
            colors="basic"
          />

          <swatches
            v-model="tagTextColor"
            show-fallback
            popover-to="left"
            swatch-size="32"
            colors="basic"
          />

          <div class="preview">
            <small>Tag preview</small>
            <tag
              :label="tagName || 'Preview'"
              :hex="tagHex"
              :textHex="tagTextColor"
            />
          </div>
          <b-button
            :disabled="isDuplicate"
            class="is-primary"
            type="submit"
            @click="createTag"
          >
            {{ $t('global.save') }}
          </b-button>
        </form>

      <div class="exclusive-toggle">
        Exclusive to {{ platform.name }}

        <b-switch v-model="exclusive" />
      </div>

      <div class="existing-tags card" v-if="hasTags">
        <div class="level-left">
          <h3>All tags</h3>

          <b-taglist>
            <b-tag
              v-for="(tag, name) in localTags"
              v-if="!tag.platform"
              :key="name"
              closable
              aria-close-label="Close tag"
              :style="`background-color: ${tag.hex}; color: ${tag.tagTextColor}`"
              @close="deleteTag(name)"
            >
              {{ name }}
            </b-tag>
          </b-taglist>

          <tag
            v-for="(tag, name) in localTags"
            v-if="!tag.platform"
            :key="name"
            :label="name"
            :hex="tag.hex"
            :text-hex="tag.tagTextColor"
            @close="deleteTag(name)"
          />
        </div>

        <div class="level-right">
          <h3>{{ platform.name }} tags</h3>

          <tag
            v-for="(tag, name) in localTags"
            v-if="tag.platform && tag.platform === platform.id"
            :key="name"
            :label="name"
            :hex="tag.hex"
            :text-hex="tag.tagTextColor"
            @close="deleteTag(name)"
          />
        </div>
      </div>
    </section>

    <footer class="modal-card-foot">
      ...
    </footer>
  </div>
</template>

<script>
import Swatches from 'vue-swatches';
import Tag from '@/components/Tag';
import { mapState } from 'vuex';
import 'vue-swatches/dist/vue-swatches.min.css';

export default {
  components: {
    Tag,
    Swatches,
  },

  data() {
    return {
      localTags: {},
      tagName: '',
      tagHex: '',
      tagTextColor: '#f4b41a',
      defaultColor: '#143d59',
      exclusive: false,
    };
  },

  computed: {
    ...mapState(['tags', 'platform']),

    newTag() {
      return {
        hex: this.tagHex,
        tagTextColor: this.tagTextColor,
        games: [],
      };
    },

    isDuplicate() {
      const tagName = this.tagName.toLowerCase();

      const lowerCaseTags = Object.keys(this.localTags).map(field => field.toLowerCase());

      return lowerCaseTags && lowerCaseTags.includes(tagName);
    },

    hasTags() {
      return Object.keys(this.localTags).length > 0;
    },
  },

  mounted() {
    this.reset();
    this.localTags = JSON.parse(JSON.stringify(this.tags));
  },

  methods: {
    updateColor(e) {
      this.tagHex = e.srcElement.value;
    },

    updateTextColor(e) {
      this.tagTextColor = e.srcElement.value;
    },

    createTag() {
      if (!this.tagHex || !this.tagName || this.isDuplicate) {
        return;
      }

      if (this.exclusive) {
        this.newTag.platform = this.platform.id;
      }

      this.$set(this.localTags, this.tagName, this.newTag);
      this.saveTags();
    },

    deleteTag(tagName) {
      this.$delete(this.localTags, tagName);
      this.saveTags(true);
    },

    async saveTags(force) {
      const action = force
        ? 'SAVE_TAGS_NO_MERGE'
        : 'SAVE_TAGS';

      await this.$store.dispatch(action, this.localTags)
        .catch(() => {
          this.$buefy.toast.open({ message: 'There was an error saving your tag', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'Tags updated', type: 'is-success' });
      this.reset();
    },

    reset() {
      this.tagName = '';
      this.tagHex = this.defaultColor;
      this.exclusive = false;
      this.tagTextColor = '#f4b41a';

      this.$forceUpdate();
      this.focusInput();
    },

    focusInput() {
      setTimeout(() => {
        if (this.$refs.tagInput) {
          this.$refs.tagInput.focus();
        }
      }, 200);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  .tag-input {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
  }

  .existing-tags {
    padding: $gp;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }
</style>
