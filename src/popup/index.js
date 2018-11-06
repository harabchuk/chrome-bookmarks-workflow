import Vue from 'vue'
import store from '../store'
import root from './root.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import XRouter from '../libs/xrouter'
import states from './screens_states'
import BookmarksList from '../popup/screens/BookmarksList'
import EditBookmark from '../popup/screens/EditBookmark'
import EditList from '../popup/screens/EditList'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'abstract',
  routes: [
    {path: '/BookmarksList', component: BookmarksList},
    {path: '/EditBookmark', component: EditBookmark},
    {path: '/EditList', component: EditList}
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
