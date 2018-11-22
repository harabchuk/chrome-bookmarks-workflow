<template>
  <div>
    <div class="ListSelectorContainer">
      <ListSelector
        :lists="lists"
        :selectedListId="currentListId"
        @changed="onListChanged"
        @new="onListNew"
        @deleted="onListDeleted"
      ></ListSelector>
    </div>

    <div v-if="lists.length && currentUrl" class="AddBookmarkContainer">
      <AddBookmark @clicked="onNewBookmark" />
    </div>

    <div v-if="lists.length && currentListId" class="BookmarksContainer">
        <div class="BookmarksContainer-title">
          <span class="Popup-sectionTitle">Bookmarks in this list</span>
          <el-select
            v-if="items.length && currentListId"
            v-model="statusFilter"
            multiple
            collapse-tags
            placeholder="Filter"
            size="mini"
            class="BookmarksContainer-filter"
            @change="onFilterChanged"
          >
            <el-option
              v-for="status in possibleStatuses"
              :key="status.name"
              :label="status.name"
              :value="status.name">
            </el-option>
          </el-select>
        </div>
        <div v-if="!items.length">No bookmarks yet.</div>
        <BookmarkCard
          v-for="bookmark in filteredBookmarks"
          :bookmark="bookmark" :key="bookmark.url"
          :active="bookmark.url==currentUrl"
          :possibleStatuses="possibleStatuses"
          @linkClick="onClickLink"
          @delete="onDeleteBookmark"
          @updated="onUpdatedBookmark"
        />
      </div>

  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import tabs from '../../api/tabs'
  import ListSelector from '../../components/ListSelector'
  import AddBookmark from '../../components/AddBookmark'
  import BookmarkCard from '../../components/BookmarkCard'

  export default {
    name: 'BookmarksListScreen',
    data () {
      return {
        statusFilter: []
      }
    },
    mounted () {
      this.reloadFilters()
    },
    components: {
      ListSelector,
      AddBookmark,
      BookmarkCard
    },
    computed: {
      ...mapState('bookmarks', [
        'items',
        'lists',
        'currentListId',
        'currentUrl'
      ]),
      ...mapGetters('bookmarks', [
        'currentList',
        'possibleStatuses'
      ]),
      filteredBookmarks () {
        if (!this.currentListId) {
          return this.items
        }
        if (!this.statusFilter.length) {
          return this.items
        }
        return this.items.filter((i) => this.statusFilter.includes(i.status))
      }
    },
    methods: {
      ...mapActions('bookmarks', [
        'setCurrentListId',
        'updateBookmark',
        'deleteBookmark',
        'deleteList',
        'getFilters',
        'updateFilters'
      ]),
      onNewBookmark () {
        this.$xtransition('NEW_BOOKMARK')
      },
      onListNew () {
        this.$xtransition('NEW_LIST')
      },
      onListChanged (list) {
        this.setCurrentListId(list.id)
        this.reloadFilters()
      },
      onListDeleted (listId) {
        this.$confirm('Delete this list and all bookmarks in it?')
          .then(_ => {
            this.items.forEach(this.notifyTabBookmarkDeleted)
            this.deleteList(listId).then(lists => {
              if (!lists.length) {
                this.$xtransition('NEW_LIST')
              } else {
                this.reloadFilters()
              }
            })
          })
          .catch(_ => {})
      },
      onClickLink (bookmark) {
        const {url} = bookmark
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          const activeTab = tabs[0]
          chrome.tabs.update(activeTab.id, {url})
          window.close()
        })
      },
      onDeleteBookmark (bookmark) {
        this.$confirm('Delete bookmark?')
          .then(_ => {
            this.deleteBookmark(bookmark)
            this.notifyTabBookmarkDeleted(bookmark)
          })
          .catch(_ => {})
      },
      onUpdatedBookmark (bookmark) {
        this.updateBookmark(bookmark)
        this.notifyTabBookmarkUpdated(bookmark)
      },
      onFilterChanged (newFilters) {
        this.updateFilters(newFilters)
      },
      notifyTabBookmarkUpdated (bookmark) {
        tabs.sendMessageByUrl(bookmark.url, {
          type: 'bookmark_updated',
          possibleStatuses: this.possibleStatuses,
          bookmark
        })
      },
      notifyTabBookmarkDeleted (bookmark) {
        tabs.sendMessageByUrl(bookmark.url, {
          type: 'bookmark_deleted',
          bookmark
        })
      },
      reloadFilters () {
        if (this.currentList) {
          this.statusFilter = this.currentList.filters || []
        }
      }
    }
  }
</script>

<style>

</style>