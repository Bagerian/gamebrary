<template lang="html">
  <div>
    <b-modal :active.sync="modalOpen" has-modal-card trap-focus aria-role="dialog" aria-modal>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('list.settings') }}</p>
        </header>

        <div class="modal-card-body" v-if="localList">
            <section>
              <h4>List name</h4>

              <b-input ref="input" v-model="localList.name" />

              <b-button
                :title="$t('global.save')"
                class="is-primary"
                type="button"
                @click="save"
              >
                {{ $t('global.save') }}
              </b-button>
            </section>

            <section>
              <h4>{{ $t('list.view') }}</h4>

              <b-field>
                <b-radio-button
                  v-for="(icon, view) in views"
                  :key="view"
                  :native-value="view"
                  @input="save"
                  v-model="localList.view"
                >
                  <b-icon pack="fas" :icon="icon" />
                  <span>{{ $t(`list.views.${view}`) }}</span>
                </b-radio-button>
              </b-field>
            </section>

            <section v-if="hasMultipleGames">
              <h4>{{ $t('list.sortList') }}</h4>

              <b-field>
                <b-radio-button
                  v-for="(icon, sortOrder) in sortOrders"
                  :key="sortOrder"
                  :native-value="sortOrder"
                  @input="save"
                  v-model="localList.sortOrder"
                >
                  <b-icon pack="fas" :icon="icon" />
                  <span>{{ $t(`list.${sortOrder}`) }}</span>
                </b-radio-button>
              </b-field>
            </section>

            <section v-if="localList.view === 'grid'">
              <h4>Compact grid view</h4>

              <b-switch v-model="localList.hideGameInfo" @input="save" />
            </section>

            <section
              :class="{ disabled: !localList.hideGameInfo }"
              v-if="localList.view === 'grid'"
            >
              <h4>Hide game info on top of game covers</h4>

              <toggle-switch
                id="hideGameInfoOnCover"
                @change="save"
                v-model="localList.hideGameInfoOnCover"
              />
            </section>

            <section>
              <h4>Move list</h4>

              <b-button
                class="is-primary"
                :title="$t('list.moveLeft')"
                :disabled="isFirst"
                @click="moveList(listIndex, listIndex - 1)"
              >
                <i class="fas fa-arrow-left" />

                {{ $t('list.moveLeft') }}
              </b-button>

              <b-button
                class="is-primary"
                :title="$t('list.moveRight')"
                :disabled="isLast"
                @click="moveList(listIndex, listIndex + 1)"
              >
                {{ $t('list.moveRight') }}
                <i class="fas fa-arrow-right" />
              </b-button>
            </section>

            <section :class="{ disabled: localList.view === 'masonry' }">
              <h4>Hide game ratings</h4>

              <b-switch
                v-model="localList.hideGameRatings"
                @input="save"
              />
            </section>
        </div>

      <footer class="modal-card-foot">
          <b-button
            :title="$t('list.delete')"
            class="is-danger"
            @click="tryDelete"
          >
            <i class="far fa-trash-alt" />
            {{ $t('list.delete') }}
          </b-button>
        </footer>
      </div>
    </b-modal>

    <!-- TODO: trigger modal and pass component -->

    <b-dropdown-item aria-role="listitem" @click.native="open">
      Settings
    </b-dropdown-item>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    listIndex: {
      type: [Number, String, Boolean],
      required: true,
      default: 0,
    },
  },

  data() {
    return {
      modalOpen: false,
      localList: null,
      views: {
        single: 'square',
        masonry: 'th',
        grid: 'th-large',
        compact: 'minus',
        text: 'font',
      },
      sortOrders: {
        sortByName: 'fas fa-sort-alpha-down',
        sortByRating: 'fas fa-star',
        sortByReleaseDate: 'fas fa-calendar-alt',
        sortByProgress: 'fas fa-clock',
        sortByCustom: 'fas fa-user',
      },
    };
  },

  computed: {
    ...mapState(['user', 'gameLists', 'platform']),

    isFirst() {
      return this.listIndex === 0;
    },

    activeList() {
      return this.gameLists[this.platform.code][this.listIndex];
    },

    isLast() {
      const lastListIndex = Object.keys(this.gameLists[this.platform.code]).length - 1;

      return this.listIndex === lastListIndex;
    },

    hasMultipleGames() {
      return this.activeList.games.length > 1;
    },

    disableSave() {
      return this.localList.name === this.activeList.name;
    },

    warningMessage() {
      const gameCount = this.activeList.games.length;

      return `This list contains ${gameCount} games, all games will be deleted as well.`;
    },
  },

  mounted() {
    this.localList = JSON.parse(JSON.stringify(this.activeList));
  },

  methods: {
    tryDelete() {
      return this.localList && this.localList.games && this.localList.games.length
        ? this.promptDelete()
        : this.deleteList();
    },

    promptDelete() {
      this.$buefy.dialog.confirm({
        title: 'Delete list?',
        message: 'All data will be lost',
        type: 'is-warning',
        onConfirm: () => this.deleteList(),
      });
    },

    deleteList() {
      this.$store.commit('REMOVE_LIST', this.listIndex);

      this.$store.dispatch('SAVE_LIST', this.gameLists)
        .then(() => {
          this.$buefy.toast.open({ message: 'List deleted', type: 'is-success' });
        })
        .catch(() => {
          this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });
    },

    save() {
      // TODO: use mutations instead of this logic here, have action save whatever is in store
      const gameLists = JSON.parse(JSON.stringify(this.gameLists));

      gameLists[this.platform.code][this.listIndex] = this.localList;

      setTimeout(() => {
        this.$store.dispatch('SAVE_LIST', gameLists)
          .then(() => {
            this.$buefy.toast.open({ message: 'List saved', type: 'is-success' });
          })
          .catch(() => {
            this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
            this.$router.push({ name: 'sessionExpired' });
          });
      }, 500);
    },

    async moveList(from, to) {
      this.$store.commit('MOVE_LIST', { from, to });

      await this.$store.dispatch('SAVE_LIST', this.gameLists)
        .catch(() => {
          this.$buefy.toast.open({ message: 'Authentication error', type: 'is-danger' });
          this.$router.push({ name: 'sessionExpired' });
        });

      this.$buefy.toast.open({ message: 'List saved', type: 'is-success' });
    },

    open() {
      if (this.localList) {
        this.localList = null;
      }

      this.localList = JSON.parse(JSON.stringify(this.activeList));
      this.modalOpen = true;

      if (this.open) {
        this.focusInput();
      }
    },

    focusInput() {
      setTimeout(() => {
        this.$refs.input.focus();
      }, 100);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/styles";

  section {
    margin-bottom: $gp * 2;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  h4 {
    margin-bottom: $gp / 2;
  }

  footer {
    border-top: 1px solid var(--modal-text-color);
    padding-top: $gp * 2;
    display: flex;
    justify-content: space-between;
  }
</style>
