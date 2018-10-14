<template>
  <div class="Popup">

    <div class="Popup-header">
      Bookmarks workflow
    </div>

    <div class="Popup-main">

      <div class="ListSelectorContainer">
        <ListSelector
            :lists="lists"
            :selectedListId="currentListId"
            @changed="listChanged"
            @created="listCreated"
            @deleted="listDeleted"
        ></ListSelector>
      </div>

      <div v-if="lists.length && currentUrl && !bookmark" class="AddBookmarkContainer">
        <AddBookmark
            :title="currentTitle"
            :url="currentUrl"
            :possibleStatuses="possibleStatuses"
            @saved="bookmarkCreated"
        ></AddBookmark>
      </div>

      <div v-if="lists.length && bookmark" class="BookmarkDetailContainer">
        <div class="Popup-sectionTitle">Current page</div>
        <BookmarkDetail
            :bookmark="bookmark"
            :possibleStatuses="possibleStatuses"
            @statusChanged="bookmarkStatusChanged"
        ></BookmarkDetail>
      </div>

      <div v-if="lists.length && currentListId" class="BookmarksContainer">
        <div class="Popup-sectionTitle">Bookmarks in this list</div>
        <div v-if="!items.length">No bookmarks yet.</div>
        <BookmarkCard
            v-for="bookmark in items"
            :bookmark="bookmark" :key="bookmark.url"
            :active="bookmark.url==currentUrl"
            @linkClick="clickLink"
            @delete="deleteBookmark"
            @updated="updatedBookmark"
        >
        </BookmarkCard>
      </div>

    </div> <!-- /main -->

    <div class="Popup-footer"></div>
  </div>
</template>

<script>
  import bookmarkslist from '../api/bookmarkslist'
  import tabs from '../api/tabs'
  import BookmarkCard from '../components/BookmarkCard'
  import ListSelector from '../components/ListSelector'
  import AddBookmark from '../components/AddBookmark'
  import BookmarkDetail from '../components/BookmarkDetail'

  export default {
    data: () => ({
      currentUrl: null,
      currentTitle: '',
      lists: [],
      items: [],
      bookmark: null,
      currentListId: 0,
      possibleStatuses: [
        {name: 'Hot', color: '#333'},
        {name: 'Warm', color: '#533'},
        {name: 'Cold', color: '#553'}
      ]
    }),
    components: {
      BookmarkCard,
      ListSelector,
      AddBookmark,
      BookmarkDetail
    },
    created () {
      this.currentListId = bookmarkslist.getLastListId()
      tabs.currentTab().then(activeTab => {
        this.currentUrl = activeTab.url
        this.currentTitle = activeTab.title
        this.lists = bookmarkslist.loadLists()
        if (this.lists.length) {
          this.updateCurrentListId(this.currentListId)
        } else {
          this.updateCurrentListId(0)
        }
      })
    },
    methods: {
      updateCurrentListId (listId) {
        if (listId) {
          bookmarkslist.setLastListId(listId)
          this.currentListId = listId
          this.items = bookmarkslist.loadItems(this.currentListId)
          this.bookmark = this.items.find(i => i.url === this.currentUrl)
        } else {
          this.currentListId = 0
          this.items = []
          this.bookmark = null
        }
      },
      listChanged (list) {
        this.updateCurrentListId(list.id)
      },
      listCreated (name) {
        const newList = bookmarkslist.getListTemplate(name)
        bookmarkslist.saveList(newList)
        this.lists = bookmarkslist.loadLists()
        this.updateCurrentListId(newList.id)
      },
      listDeleted (listId) {
        this.$confirm('Delete this list and all bookmarks in it?')
          .then(_ => {
            bookmarkslist.removeList(listId)
            this.lists = bookmarkslist.loadLists()
            if (this.lists.length) {
              this.updateCurrentListId(this.lists[0].id)
            } else {
              this.updateCurrentListId(0)
            }
          })
          .catch(_ => {})
      },
      bookmarkCreated (bookmark) {
        bookmarkslist.addBookmark(this.currentListId, bookmark)
        this.bookmark = bookmark
        this.items = bookmarkslist.loadItems(this.currentListId)
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
        bookmarkslist.removeBookmark(this.currentListId, bookmark)
        this.updateCurrentListId(this.currentListId)
      },
      updatedBookmark (bookmark) {
        bookmarkslist.saveBookmark(this.currentListId, bookmark)
        this.updateCurrentListId(this.currentListId)
      },
      bookmarkStatusChanged (name) {
        console.log(name)
        this.bookmark.status = name
        bookmarkslist.saveBookmark(this.currentListId, this.bookmark)
        this.updateCurrentListId(this.currentListId)
      }
    }
  }
</script>

<style lang="scss">

  body {
    margin: 0px !important;
    color: #333;
  }

  .Popup {
    width: 350px;
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .Popup-header {
    margin-bottom: 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    text-align: center;
    font-size: 18px;
    background-color: #717171;
  }

  .Popup-main {
    padding: 7px;
    flex: 1 0 0;
  }

  .Popup-footer {
    background-color: #717171;
    min-height: 10px;
  }

  .ListSelectorContainer {

  }

  .AddBookmarkContainer {

  }

  .BookmarkDetailContainer {

  }

  .BookmarksContainer {
    margin-top: 15px;
  }

  .listControls {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    border: solid 1px red;
  }

  .listControls a {
    margin-left: 1em;
    align-self: flex-end;
  }

  .addBookmark {
  }

  .checkBoxSubtitle {
    font-size: 80%;
    margin-left: 24px;
  }

  .Popup-sectionTitle {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .el-message-box {
    width: 99% !important;
  }
</style>
