import Vue from 'vue'
import store from '../store'
import root from './root.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import XRouter from '../libs/xrouter'
import states from './screens_states'
import BookmarksListScreen from '../popup/screens/BookmarksListScreen'
import EditBookmarkScreen from '../popup/screens/EditBookmarkScreen'
import EditListScreen from '../popup/screens/EditListScreen'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'abstract',
  routes: [
    {path: '/BookmarksList', component: BookmarksListScreen},
    {path: '/EditBookmark', component: EditBookmarkScreen},
    {path: '/EditList', component: EditListScreen}
  ]
})

Vue.use(VueRouter)
Vue.use(XRouter, { router, states })
Vue.use(ElementUI, { locale })

new Vue({ // eslint-disable-line no-new
  el: '#root',
  router,
  store,
  render: h => h(root)
})
