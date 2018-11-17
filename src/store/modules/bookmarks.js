import Vue from 'vue'
import bookmarkslistApi from '../../api/bookmarkslist'

const state = {
  currentUrl: '',
  currentTitle: '',
  currentListId: 0,
  items: [],
  lists: []
}

const findBookmarkIndex = (items, bookmark) => items.findIndex(i => i.url === bookmark.url)
const bookmarkExists = (items, bookmark) => findBookmarkIndex(items, bookmark) > -1

const getters = {
}

const actions = {
  setUrlTitle ({ commit }, { url, title }) {
    commit('updateCurrentUrlTitle', { url, title })
  },
  setCurrentListId ({ commit, state }, listId) {
    if (state.currentListId === listId) {
      return
    }
    commit('updateCurrentListId', listId)
    commit('updateItems', bookmarkslistApi.loadItems(listId))
    bookmarkslistApi.setLastListId(listId)
  },
  loadLists ({ commit, dispatch }) {
    const lists = bookmarkslistApi.loadLists()
    commit('updateLists', lists)
    const currentListId = bookmarkslistApi.getLastListId()
    dispatch('setCurrentListId', currentListId)
    return lists
  },
  createList ({ commit }, name) {
    const newList = bookmarkslistApi.getListTemplate(name)
    bookmarkslistApi.saveList(newList)
    commit('addList', newList)
    return newList
  },
  deleteList ({ commit, state, dispatch }, listId) {
    bookmarkslistApi.removeItems(listId)
    bookmarkslistApi.removeList(listId)
    commit('removeList', listId)
    if (state.currentListId === listId) {
      if (state.lists.length) {
        dispatch('setCurrentListId', state.lists[0].id)
      } else {
        dispatch('setCurrentListId', 0)
      }
    }
    return state.lists
  },
  addBookmark ({ commit, state }, bookmark) {
    if (!bookmark) {
      throw new Error('addBookmark: bookmark is empty')
    }
    if (bookmarkExists(state.items, bookmark)) {
      return
    }
    commit('pushItem', bookmark)
    bookmarkslistApi.addBookmark(state.currentListId, bookmark)
    return bookmark
  },
  updateBookmark ({ commit, state }, bookmark) {
    if (!bookmark) {
      throw new Error('updateBookmark: bookmark is empty')
    }
    if (!bookmarkExists(state.items, bookmark)) {
      return
    }
    commit('setItem', bookmark)
    bookmarkslistApi.saveBookmark(state.currentListId, bookmark)
    return bookmark
  },
  deleteBookmark ({ commit, state }, bookmark) {
    if (!bookmark) {
      throw new Error('deleteBookmark: bookmark is empty')
    }
    if (!bookmarkExists(state.items, bookmark)) {
      return
    }
    commit('deleteItem', bookmark)
    bookmarkslistApi.removeBookmark(state.currentListId, bookmark)
  }
}

const mutations = {
  updateCurrentUrlTitle (state, { url, title }) {
    state.currentUrl = url
    state.currentTitle = title
  },
  updateCurrentListId (state, listId) {
    state.currentListId = listId
  },
  updateLists (state, lists) {
    lists.forEach(l => {
      state.lists.push(l)
    })
  },
  addList (state, list) {
    state.lists.push(list)
  },
  removeList (state, listId) {
    const index = state.lists.findIndex(l => l.id === listId)
    if (index > -1) {
      state.lists.splice(index, 1)
    }
  },
  updateItems (state, items) {
    Vue.set(state, 'items', items)
  },
  pushItem (state, bookmark) {
    state.items.push(bookmark)
  },
  setItem (state, bookmark) {
    const index = findBookmarkIndex(state.items, bookmark)
    if (index > -1) {
      Vue.set(state.items, index, bookmark)
    }
  },
  deleteItem (state, bookmark) {
    const index = findBookmarkIndex(state.items, bookmark)
    if (index > -1) {
      state.items.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
