import Vue from 'vue'
import Vuex from 'vuex'
import bookmarks from './modules/bookmarks'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    bookmarks
  },
  strict: debug
})
