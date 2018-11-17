<template>
  <div class="Popup">

    <div class="Popup-header">
      Bookmarks workflow
    </div>

    <div class="Popup-main">
      <router-view></router-view>
    </div> <!-- /main -->

    <div class="Popup-footer"></div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import tabs from '../api/tabs'

  export default {
    data: () => ({
      possibleStatuses: [
        {name: 'Hot', color: '#FF8000', default: false},
        {name: 'Warm', color: '#63C94F', default: true},
        {name: 'Cold', color: '#70A2FF', default: false}
      ]
    }),
    created () {
      tabs.currentTab().then(activeTab => {
        this.setUrlTitle(activeTab)
      })
      this.loadLists().then(lists => {
        if (!lists.length) {
          this.$xtransition('NEW_LIST')
        }
      })
    },
    computed: {
      filteredBookmarks () {
        if (!this.statusFilter.length) {
          return this.items
        }
        return this.items.filter((i) => this.statusFilter.includes(i.status))
      }
    },
    methods: {
      ...mapActions('bookmarks', [
        'setUrlTitle',
        'loadLists'
      ])
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

  .BookmarksContainer-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .BookmarksContainer-filter {
    width: 140px;
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
