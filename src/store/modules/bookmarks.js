import bookmarkslistApi from '../../api/bookmarkslist'

const state = {
  currentUrl: '',
  currentTitle: '',
  currentListId: 0,
  items: [],
  lists: []
}

const getters = {
}

const actions = {
  setUrlTitle ({ commit }, url, title) {
    commit('updateCurrentUrlTitle', url, title)
  },
  setCurrentListId ({ commit }, listId) {
    commit('updateCurrentListId', listId)
  },
  loadLists ({ commit }) {
    const lists = bookmarkslistApi.loadLists()
    commit('updateLists', lists)
    const currentListId = bookmarkslistApi.getLastListId()
    commit('updateCurrentListId', currentListId)
    return lists
  },
  createList ({ commit }, name) {
    const newList = bookmarkslistApi.getListTemplate(name)
    bookmarkslistApi.saveList(newList)
    commit('addList', newList)
    return newList
  }
}

const mutations = {
  updateCurrentUrlTitle (state, url, title) {
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
