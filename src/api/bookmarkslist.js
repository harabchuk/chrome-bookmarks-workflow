import storage from './storage'

const generateId = () => (new Date()).getTime()
const listsKey = () => 'lists'
const itemsKey = (listId) => `b_${listId}`
const lastIdKey = () => 'last_list_id'
const findBookmark = (items, url) => items.find(i => i.url === url)

export default {
  getListTemplate (title) {
    return {
      name: title,
      id: null
    }
  },
  loadLists () {
    const lists = storage.get(listsKey())
    if (!lists) {
      return []
    }
    return lists
  },
  saveLists (lists) {
    storage.set(listsKey(), lists)
  },
  loadItems (listId) {
    const items = storage.get(itemsKey(listId))
    if (!items) {
      return []
    }
    return items
  },
  saveItems (listId, items) {
    storage.set(itemsKey(listId), items)
  },
  removeItems (listId) {
    storage.remove(itemsKey(listId))
  },
  loadList (listId) {
    const lists = this.loadLists()
    return lists.find(l => l.id === listId)
  },
  saveList (list) {
    const listObj = list
    if (!listObj.id) {
      listObj.id = generateId()
    }
    const lists = this.loadLists()
    lists.push(list)
    this.saveLists(lists)
  },
  getBookmark (listId, url) {
    return null
  },
  addBookmark (listId, bookmark) {
    const items = this.loadItems(listId)
    if (!findBookmark(items, bookmark.url)) {
      items.push(bookmark)
      this.saveItems(listId, items)
    }
  },
  saveBookmark (listId, bookmark) {
    const items = this.loadItems(listId)
    const existing = findBookmark(items, bookmark.url)
    existing.title = bookmark.title
    existing.tags = bookmark.tags
    existing.status = bookmark.status
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
  },
  getLastListId () {
    return storage.get(lastIdKey())
  },
  setLastListId (listId) {
    storage.set(lastIdKey(), listId)
  }
}
