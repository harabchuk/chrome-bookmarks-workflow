<template>
  <div>
    <span class="Popup-sectionTitle">New bookmark</span>
    <EditBookmark
      v-if="contentInfoLoaded"
      :bookmark="emptyBookmark"
      :possibleStatuses="possibleStatuses"
      @saved="onSave"
      @cancel="onCancel"
    ></EditBookmark>
    <div v-if="!contentInfoLoaded">Loading...</div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import EditBookmark from '../../components/EditBookmark'
  import tabs from '../../api/tabs'

  export default {
    name: 'EditBookmarkScreen',
    components: {
      EditBookmark
    },
    data () {
      return {
        contentInfoLoaded: false,
        price: '',
        currency: '',
        productName: ''
      }
    },
    created () {
      chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.type === 'content_init') {
          this.productName = msg.name
          this.price = msg.price
          this.currency = msg.currency
          this.contentInfoLoaded = true
        }
      })
      tabs.currentTab().then(tab => {
        chrome.tabs.executeScript(tab.id, {file: 'js/extractors/default.js'})
      })
    },
    computed: {
      ...mapState('bookmarks', [
        'currentUrl',
        'currentTitle',
        'currentListId'
      ]),
      ...mapGetters('bookmarks', [
        'possibleStatuses'
      ]),
      emptyBookmark () {
        const tags = []
        if (this.price) {
          tags.push(this.price + ' ' + this.currency)
        }
        return {
          title: this.productName || this.currentTitle,
          url: this.currentUrl,
          tags,
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