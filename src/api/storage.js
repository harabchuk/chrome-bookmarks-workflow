/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage}
 */
export default {
  get (key, defaultValue = null) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return defaultValue
    }
  },
  set (key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  },
  remove (key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {}
  },
  clear () {
    try {
      localStorage.clear()
    } catch (e) {}
  }
}
