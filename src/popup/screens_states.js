export default {
  initial: 'BookmarksList',
  states: {
    BookmarksList: {
      on: {
        NEW_BOOKMARK: 'EditBookmark',
        EDIT_BOOKMARK: 'EditBookmark',
        NEW_LIST: 'EditList',
        EDIT_LIST: 'EditList'
      }
    },
    EditBookmark: {
      on: {
        BOOKMARK_SAVED: 'BookmarksList',
        BOOKMARK_CANCEL: 'BookmarksList'
      }
    },
    EditList: {

    }
  }
}
