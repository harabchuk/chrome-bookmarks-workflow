import storage from './storage'

export default {
  generateListId () {
    return (new Date()).getTime()
  },
  getListTemplate (title) {
    return {
      name: title,
      id: null
    }
  },
  loadLists () {
    const lists = storage.get('lists')
    if (!lists) {
      return []
    }
    return lists
  },
  saveLists (lists) {
    storage.set('lists', lists)
  },
  loadItems (listId) {
    const items = storage.get(`b_${listId}`)
    if (!items) {
      return []
    }
    return items
  },
  saveItems (listId, items) {
    storage.set(`b_${listId}`, items)
  },
  removeItems (listId) {
    storage.remove(`b_${listId}`)
  },
  loadList (listId) {
    const lists = this.loadLists()
    return lists.find(l => l.id === listId)
  },
  saveList (list) {
    const listObj = list
    if (!listObj.id) {
      listObj.id = this.generateListId()
    }
    const lists = this.loadLists()
    lists.push(list)
    this.saveLists(lists)
  },
  getBookmark (items, url) {
    return items.find(i => i.url === url)
  },
  addBookmark (listId, bookmark) {
    const items = this.loadItems(listId)
    items.push(bookmark)
    this.saveItems(listId, items)
  },
  removeBookmark (listId, bookmark) {
    const items = this.loadItems(listId)
    for (let i = 0; i < items.length; i++) {
      if (items[i].url === bookmark.url) {
        items.splice(i, 1)
        break
      }
    }
    this.saveItems(listId, items)
  },
  removeList (listId) {
    const lists = this.loadLists()
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id === listId) {
        lists.splice(i, 1)
        break
      }
    }
    this.saveLists(lists)
    this.removeItems(listId)
  }
}
