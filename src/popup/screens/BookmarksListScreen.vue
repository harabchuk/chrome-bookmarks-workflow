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

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import ListSelector from '../../components/ListSelector'
  import AddBookmark from '../../components/AddBookmark'

  export default {
    name: 'BookmarksListScreen',
    components: {
      ListSelector,
      AddBookmark
    },
    computed: {
      ...mapState('bookmarks', [
        'items',
        'lists',
        'currentListId',
        'currentUrl'
      ])
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
      }
    }
  }
</script>

<style scoped>

</style>