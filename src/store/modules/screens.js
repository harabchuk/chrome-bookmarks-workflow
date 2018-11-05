import { Machine } from 'xstate'
import screensStates from './screens_states'

const machine = Machine(screensStates)

const state = {
  currentScreen: machine.initialState
}

const getters = {
  currentScreen (state) {
    return state.currentScreen
  }
}

const actions = {
  setEvent ({state, commit}, eventName) {
    const newScreen = machine.transition(state.currentScreen, eventName)
    if (newScreen !== state.currentScreen) {
      commit('updateCurrentScreen', newScreen)
    }
  }
}

const mutations = {
  updateCurrentScreen (state, name) {
    state.currentScreen = name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
