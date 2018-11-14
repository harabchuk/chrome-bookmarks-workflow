<template>
  <div>
    <div class="ListSelectorContainer">
      <ListSelector
          :lists="lists"
          :selectedListId="currentListId"
          @changed="listChanged"
          @new="listNew"
          @deleted="listDeleted"
      ></ListSelector>
    </div>

    <div v-if="lists.length && currentUrl" class="AddBookmarkContainer">
      <AddBookmark @clicked="onNew"></AddBookmark>
    </div>

    <div v-if="lists.length && currentListId" class="BookmarksContainer">
        <div class="BookmarksContainer-title">
          <span class="Popup-sectionTitle">Bookmarks in this list</span>
          <!--<el-select
            v-if="items.length"
            v-model="statusFilter"
            multiple
            collapse-tags
            placeholder="Filter"
            size="mini"
            class="BookmarksContainer-filter"
          >
            <el-option
              v-for="status in possibleStatuses"
              :key="status.name"
              :label="status.name"
              :value="status.name">
            </el-option>
          </el-select>-->
        </div>
        <div v-if="!items.length">No bookmarks yet.</div>
        <BookmarkCard
            v-for="bookmark in items"
            :bookmark="bookmark" :key="bookmark.url"
            :active="bookmark.url==currentUrl"
            :possibleStatuses="possibleStatuses"
            @linkClick="clickLink"
            @delete="deleteBookmark"
            @updated="updatedBookmark"
        >
        </BookmarkCard>
      </div>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import ListSelector from '../../components/ListSelector'
  import AddBookmark from '../../components/AddBookmark'
  import BookmarkCard from '../../components/BookmarkCard'

  export default {
    name: 'BookmarksListScreen',
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
      possibleStatuses () {
        return []
      }
    },
    methods: {
      ...mapActions('bookmarks', [
        'setCurrentListId'
      ]),
      onNew () {
        this.$xtransition('NEW_BOOKMARK')
      },
      onEdit () {
        this.$xtransition('EDIT_BOOKMARK', { bookmark_id: 2 })
      },
      listNew () {
        this.$xtransition('NEW_LIST')
      },
      listChanged (list) {
        this.setCurrentListId(list.id)
      },
      listDeleted (listId) {
        this.$confirm('Delete this list and all bookmarks in it?')
          .then(_ => {
            // bookmarkslist.loadItems(listId).forEach(this.notifyTabBookmarkDeleted)
            // bookmarkslist.removeList(listId)
            // this.lists = bookmarkslist.loadLists()
            // if (this.lists.length) {
            //   this.updateCurrentListId(this.lists[0].id)
            // } else {
            //   this.updateCurrentListId(0)
            // }
          })
          .catch(_ => {})
      },
      clickLink (bookmark) {
        const {url} = bookmark
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          const activeTab = tabs[0]
          chrome.tabs.update(activeTab.id, {url})
          window.close()
        })
      },
      deleteBookmark (bookmark) {
        // bookmarkslist.removeBookmark(this.currentListId, bookmark)
        // this.updateCurrentListId(this.currentListId)
        // this.notifyTabBookmarkDeleted(bookmark)
      },
      updatedBookmark (bookmark) {
        // bookmarkslist.saveBookmark(this.currentListId, bookmark)
        // this.updateCurrentListId(this.currentListId)
        // this.notifyTabBookmarkUpdated(bookmark)
      }
    }
  }
</script>

<style scoped>

</style>