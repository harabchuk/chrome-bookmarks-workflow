import bookmarkslist from '../api/bookmarkslist'

function getBookmark (url) {
  const currentListId = bookmarkslist.getLastListId()
  return bookmarkslist.getBookmark(currentListId, url)
}

function initListeners () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'content_init') {
      sendResponse(getBookmark(sender.tab.url))
    }
  })
}

initListeners()
