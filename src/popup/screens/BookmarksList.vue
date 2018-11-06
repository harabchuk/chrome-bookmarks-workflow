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
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import ListSelector from '../../components/ListSelector'

  export default {
    name: 'BookmarksList',
    components: {
      ListSelector
    },
    computed: {
      ...mapState('bookmarks', {
        items: state => state.items,
        lists: state => state.lists,
        currentListId: state => state.currentListId
      })
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
      listCreated (name) {
        // const newList = bookmarkslist.getListTemplate(name)
        // bookmarkslist.saveList(newList)
        // this.lists = bookmarkslist.loadLists()
        // this.updateCurrentListId(newList.id)
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