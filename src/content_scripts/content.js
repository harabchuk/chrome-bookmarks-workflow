console.log('Bookmarks!');

chrome.runtime.sendMessage(
  {
    type: 'content_init'
  },
  function (response) {
    console.log('Response: ', response);
  }
);