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
            @saved="bookmarkCreated"
        ></AddBookmark>
      </div>

      <div v-if="lists.length && bookmark" class="BookmarkDetailContainer">
        <BookmarkDetail
            :bookmark="bookmark"
        ></BookmarkDetail>
      </div>

      <div v-if="lists.length && currentListId" class="BookmarksContainer">
        <div class="label">Bookmarks in this list</div>
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
      currentListId: 0
    }),
    components: {
      BookmarkCard,
      ListSelector,
      AddBookmark,
      BookmarkDetail
    },
    created () {
      tabs.currentTab().then(activeTab => {
        this.currentUrl = activeTab.url
        this.currentTitle = activeTab.title
        this.lists = bookmarkslist.loadLists()
        if (this.lists.length) {
          this.currentListId = this.lists[0].id
          this.bookmark = bookmarkslist.getBookmark(this.items, this.currentUrl)
        } else {
          this.currentListId = 0
          this.bookmark = null
        }
      })
    },
    methods: {
      listChanged (list) {
        this.currentListId = list.id
        this.items = bookmarkslist.loadItems(this.currentListId)
        this.bookmark = bookmarkslist.getBookmark(this.items, this.currentUrl)
      },
      listCreated (list) {
        const newList = bookmarkslist.getListTemplate(list.name)
        bookmarkslist.saveList(newList)
        this.lists = bookmarkslist.loadLists()
        this.currentListId = newList.id
        this.items = bookmarkslist.loadItems(this.currentListId)
        this.bookmark = bookmarkslist.getBookmark(this.items, this.currentUrl)
      },
      listDeleted (list) {
        bookmarkslist.removeList(list.id)
        this.lists = bookmarkslist.loadLists()
        if (this.lists.length) {
          this.currentListId = this.lists[0].id
          this.bookmark = bookmarkslist.getBookmark(this.items, this.currentUrl)
        } else {
          this.currentListId = 0
          this.bookmark = null
        }
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
        this.items = bookmarkslist.loadItems(this.currentListId)
      },
      updatedBookmark (bookmark) {
        console.log('update')
      },
    }
  }
</script>

<style lang="scss">

  body {
    margin: 0px !important;
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

  .label {
    font-size: 14px;
  }
</style>
