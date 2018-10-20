import bookmarkslist from '../api/bookmarkslist'

function getPossibleStatuses (listId) {
  return [
    {name: 'Hot', color: '#FF8000', default: false},
    {name: 'Warm', color: '#63C94F', default: true},
    {name: 'Cold', color: '#70A2FF', default: false}
  ]
}

function getBookmark (url) {
  const currentListId = bookmarkslist.getLastListId()
  return bookmarkslist.getBookmark(currentListId, url)
}

function initListeners () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'content_init') {
      sendResponse({
        bookmark: getBookmark(sender.tab.url),
        possibleStatuses: getPossibleStatuses(bookmarkslist.getLastListId())
      })
    }
  })
}

initListeners()
