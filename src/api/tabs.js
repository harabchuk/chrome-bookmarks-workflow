export default {
  currentTab () {
    const exec = (resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => resolve(tabs[0]))
    }
    return new Promise(exec)
  },
  findTabs (url) {
    const exec = (resolve, reject) => {
      chrome.tabs.query({url}, resolve)
    }
    return new Promise(exec)
  },
  sendMessageByUrl (url, message) {
    this.findTabs(url).then(tabs => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, message)
      })
    })
  }
}
