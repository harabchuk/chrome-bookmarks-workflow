function findStatus (possibleStatuses, statusName) {
  return possibleStatuses.find(function (i) { return i.name === statusName; });
}

function getStatusColor (possibleStatuses, statusName) {
  var status = findStatus(possibleStatuses, statusName);
  if (status) {
    return status.color;
  }
  return 'transparent';
}

function getTagsHtml (tags) {
  return tags.join(', ');
}

function updateBookmark (msg) {
  if (!msg.bookmark) {
    return;
  }
  var statusColor = getStatusColor(msg.possibleStatuses, msg.bookmark.status);
  window.document.body.insertAdjacentHTML(
    'beforeend',
    '<div id="BookmarksWorkflowTab" class="BookmarksWorkflowTab">' +
      '<span class="BookmarksWorkflowTab-Status" style="background-color:' + statusColor + '">' + msg.bookmark.status + '</span>' +
      '<span class="BookmarksWorkflowTab-Tags">' + getTagsHtml(msg.bookmark.tags) + '</span>' +
    '</div>');
}

function clearBookmark (msg) {
  var tab = window.document.getElementById('BookmarksWorkflowTab');
  if (tab) {
    window.document.body.removeChild(tab);
  }
}

function initListeners () {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'bookmark_updated') {
      updateBookmark(msg);
    } else if (msg.type === 'bookmark_deleted') {
      clearBookmark(msg);
    }
  })
}

initListeners();

chrome.runtime.sendMessage({ type: 'content_init' }, updateBookmark);