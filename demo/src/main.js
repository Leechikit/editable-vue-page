import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 公共样式
import '@/assets/style/common.scss'
// 布局样式
import '@/assets/style/layout.scss'
// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element.scss'
// 图标
import '@/assets/commonIcon/iconfont.js'
import '@/assets/commonIcon/iconfont.css'
import '@/assets/appIcon/iconfont.js'

import '@/sdk/evp-sdk'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
