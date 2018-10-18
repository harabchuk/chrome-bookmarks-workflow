import bookmarkslist from '../api/bookmarkslist'

console.log('background!')

const currentListId = bookmarkslist.getLastListId()
const lists = bookmarkslist.loadLists()

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg, sender.tab, sender.frameId)
  sendResponse('Gotcha!')
})

console.log(currentListId, lists, 1)
