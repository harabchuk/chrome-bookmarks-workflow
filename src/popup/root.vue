<template>
  <div class="Popup">

    <div class="Popup-header">
      Bookmarks workflow
    </div>

    <div class="Popup-main">

      <div class="ListSelectorContainer">
        <ListSelector
            :lists="lists"
            :selectedListId="1"
            @created="listCreated"
            @deleted="listDeleted"
        ></ListSelector>
      </div>

      <div v-if="lists && currentUrl && !bookmark" class="AddBookmarkContainer">
        <AddBookmark
            :title="currentTitle"
            :url="currentUrl"
            @saved="bookmarkCreated"
        ></AddBookmark>
      </div>

      <div v-if="lists && bookmark" class="BookmarkDetailContainer">
        <BookmarkDetail
            :bookmark="bookmark"
        ></BookmarkDetail>
      </div>

      <div v-if="lists && currentList" class="BookmarksContainer">
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
  import storage from '../api/storage'
  import bookmarks from '../api/bookmarks'
  import tabs from '../api/tabs'
  import BookmarkCard from '../components/BookmarkCard'
  import ListSelector from '../components/ListSelector'
  import AddBookmark from '../components/AddBookmark'
  import BookmarkDetail from '../components/BookmarkDetail'

  export default {
    data: () => ({
      items: [],
      currentUrl: null,
      currentTitle: '',
      showAllSubdomains: true,
      currentTopDomain: null,
      currentSubdomain: null,
      lists: [
        {
          id: 1,
          name: 'Default'
        }
      ],
      bookmark: null,
      currentList: 1
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
        storage.get('key')
      })
    },
    methods: {
      listCreated (list) {
        console.log(list)
        this.lists.push(list)
      },
      listDeleted (list) {
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i].id === list.id) {
            this.lists.splice(i, 1)
            return
          }
        }
      },
      bookmarkCreated (bookmark) {
        this.bookmark = bookmark
        this.items.push(bookmark)
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
        this.items = this.items.filter(b => b.id !== bookmark.id)
        bookmarks.deleteBookmark(bookmark.id)
      },
      updatedBookmark (bookmark) {
        bookmarks.updateBookmark(bookmark.id, bookmark.title)
      },
      newBookmark () {
        tabs.currentTab().then(activeTab => {
          bookmarks.getOtherBookmarksFolder()
            .then(folder => {
              return bookmarks.getOrCreateFolder(folder.id, 'Domain Bookmarks')
            })
            .then(folder => {
              return bookmarks.getOrCreateBookmark(folder.id, activeTab.url, activeTab.title)
            })
            .then(([b, created]) => {
              if (created) {
                this.items.push(b)
              }
            })
        })
      }
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
