import bookmarkslistApi from '../api/bookmarkslist'
import statusesApi from '../api/statuses'

function getPossibleStatuses (listId) {
  const list = bookmarkslistApi.loadList(listId)
  if (list) {
    return statusesApi.getPossibleStatuses(list.statusSchemaId)
  }
}

function getBookmark (url) {
  const currentListId = bookmarkslistApi.getLastListId()
  return bookmarkslistApi.getBookmark(currentListId, url)
}

function initListeners () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'content_init') {
      sendResponse({
        bookmark: getBookmark(sender.tab.url),
        possibleStatuses: getPossibleStatuses(bookmarkslistApi.getLastListId())
      })
    }
  })
}

initListeners()
