console.log('Bookmarks!');

function updateBookmark (bookmark) {
  console.log('Bookmark: ', bookmark, bookmark.url === location.href);
}

function clearBookmark (bookmark) {
  console.log('Clear: ', bookmark, bookmark.url === location.href);
}

function initListeners () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'bookmark_updated') {
      updateBookmark(msg.bookmark);
    } else if (msg.type === 'bookmark_deleted') {
      clearBookmark(msg.bookmark);
    }
  })
}

initListeners();

chrome.runtime.sendMessage({ type: 'content_init' }, updateBookmark);