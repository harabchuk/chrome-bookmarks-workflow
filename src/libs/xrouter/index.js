import { Machine } from 'xstate'

const getStateFromRoute = (route) => {
  let toState = (route.meta && route.meta.state) ? route.meta.state : route.path
  return toState.toLowerCase().replace(/^\/|\/$/g, '')
}

const getMatchingPathFromState = (router, state) => {
  try {
    return router.options.routes.filter(r => getStateFromRoute(r) === state.toLowerCase())[0].path
  } catch (error) {
    return null
  }
}

export default {
  install (Vue, options) {
    if (this.installed) {
      return
    }
    this.installed = true

    const router = options.router
    const machine = Machine(options.states)

    Vue.prototype.$xrouter = {
      machine: machine,
      current: machine.initialState,
      eventArgs: {},
      event: null
    }

    router.replace(getMatchingPathFromState(router, machine.initialState.value))

    Vue.prototype.$xtransition = function (eventName, eventArgs = {}) {
      const currentState = this.$xrouter.current
      const newState = this.$xrouter.machine.transition(currentState, eventName)
      this.$xrouter.current = newState
      this.$xrouter.event = eventName
      this.$xrouter.eventArgs = eventArgs
      const newPath = getMatchingPathFromState(router, newState.value)
      router.replace(newPath)
      console.log('navigated to', newPath)
      return newState
    }
  }
}
