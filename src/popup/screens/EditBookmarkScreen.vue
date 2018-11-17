<template>
  <div>
    <EditBookmark
      :bookmark="emptyBookmark"
      :possibleStatuses="possibleStatuses"
      @saved="onSave"
      @cancel="onCancel"
    ></EditBookmark>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import EditBookmark from '../../components/EditBookmark'

  export default {
    name: 'EditBookmarkScreen',
    components: {
      EditBookmark
    },
    computed: {
      ...mapState('bookmarks', [
        'currentUrl',
        'currentTitle',
        'currentListId'
      ]),
      possibleStatuses () {
        return []
      },
      emptyBookmark () {
        return {
          title: this.currentTitle,
          url: this.currentUrl,
          tags: [],
          status: ''
        }
      }
    },
    methods: {
      ...mapActions('bookmarks', [
        'addBookmark'
      ]),
      onSave (bookmark) {
        this.addBookmark(bookmark)
        this.$xtransition('BOOKMARK_SAVED')
      },
      onCancel () {
        this.$xtransition('CANCEL')
      }
    }
  }
</script>

<style scoped>

</style>