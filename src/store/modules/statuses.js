// import Vue from 'vue'
// import bookmarkslistApi from '../../api/bookmarkslist'

const state = {
  possibleStatuses: [
    {name: 'Hot', color: '#FF8000', default: false},
    {name: 'Warm', color: '#63C94F', default: true},
    {name: 'Cold', color: '#70A2FF', default: false}
  ]
}

const getters = {
  possibleStatuses (state) {
    return state.possibleStatuses
  }
}

const actions = {
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
