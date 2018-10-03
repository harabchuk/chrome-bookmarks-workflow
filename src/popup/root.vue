<template>
    <div class="popup">
        <div class="listControls">
            <a href="#">New list</a><a href="#">Delete list</a>
        </div>
        <div class="addBookmark">
            <el-button size="mini">Add bookmark</el-button>
            <span>to</span>
             <ListSelector
                :lists="lists"
                :selectedListId="1"
                @created="listCreated"
                @deleted="listDeleted"
            ></ListSelector>
        </div>
        <div class="listSelector">
            <AddBookmark
                :title="currentTitle"
                :url="currentUrl"
                @saved="bookmarkCreated"
            ></AddBookmark>
        </div>
        <div v-if="currentUrl">

        </div>
        <!--<div class="header">
            <div>
                <el-tooltip class="item" effect="light" content="Add current page to the list" placement="bottom">
                    <el-button type="warning" icon="el-icon-star-off" size="small" circle
                               @click="newBookmark" ></el-button>
                </el-tooltip>
            </div>
        </div>
        <div class="items">
            <BookmarkCard v-for="bookmark in items"
                          :bookmark="bookmark" :key="bookmark.url"
                          :active="bookmark.url==currentUrl"
                          @linkClick="clickLink"
                          @delete="deleteBookmark"
                          @updated="updatedBookmark"
            >
            </BookmarkCard>
        </div>-->
    </div>
</template>

<script>
  import domain from '../utils/domain'
  import storage from '../api/storage'
  import bookmarks from '../api/bookmarks'
  import tabs from '../api/tabs'
  import BookmarkCard from '../components/BookmarkCard'
  import ListSelector from '../components/ListSelector'
  import AddBookmark from '../components/AddBookmark'

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
      ]
    }),
    components: {
      BookmarkCard,
      ListSelector,
      AddBookmark
    },
    computed: {
      subdomainsCurrentOption () {
        return this.showAllSubdomains ? '*.' + this.currentTopDomain : this.currentSubdomain
      }
    },
    created () {
      tabs.currentTab().then(activeTab => {
        this.currentUrl = activeTab.url
        this.currentTitle = activeTab.title
        this.currentTopDomain = domain.getDomain(activeTab.url, 2)
        this.currentSubdomain = domain.getDomain(activeTab.url, 3)
        this.showAllSubdomains = storage.get('show_subdomains_' + this.currentTopDomain)
        const searchTerm = this.showAllSubdomains ? this.currentTopDomain : this.currentSubdomain
        bookmarks.findBookmarks(searchTerm).then(items => {
          this.items = items
        })
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

      },
      clickLink (bookmark) {
        const { url } = bookmark
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
      changedDomainsOptions (showAllSubdomains) {
        storage.set('show_subdomains_' + this.currentTopDomain, showAllSubdomains)
        const searchTerm = showAllSubdomains ? this.currentTopDomain : this.currentSubdomain
        bookmarks.findBookmarks(searchTerm).then(items => {
          this.items = items
        })
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
    .listControls {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }
    .listControls a {
        margin-left: 1em;
        align-self: flex-end;
    }

.addBookmark {
    display: flex;
}
.popup {
  width: 350px;
  min-height: 180px;
  max-height: 500px;
  overflow-y: auto;
}
.header {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
    align-items: center;
}
.checkBoxSubtitle {
  font-size: 80%;
  margin-left: 24px;
}
</style>
