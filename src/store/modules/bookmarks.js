import Vue from 'vue'
import bookmarkslistApi from '../../api/bookmarkslist'

const state = {
  currentUrl: '',
  currentTitle: '',
  currentListId: 0,
  items: [],
  lists: []
}

const findBookmark = (items, url) => items.find(i => i.url === url)

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
  addBookmark ({ commit, state }, bookmark) {
    if (!bookmark) {
      throw new Error('addBookmark: bookmark is empty')
    }
    if (findBookmark(state.items, bookmark.url)) {
      return
    }
    commit('pushBookmark', bookmark)
    bookmarkslistApi.addBookmark(state.currentListId, bookmark)
    return bookmark
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
  updateItems (state, items) {
    Vue.set(state, 'items', items)
  },
  pushBookmark (state, bookmark) {
    state.items.push(bookmark)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
