import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/normalize.css'
import '@/assets/styles/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCodeMirror from 'vue-codemirror-lite'
import Packages from './packages'
import Properties from './properties'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCodeMirror)
Vue.use(Packages)
Vue.use(Properties)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
