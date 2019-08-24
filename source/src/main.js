import Vue from 'vue'
import App from './App.vue'
import { elementId } from './element-id'

Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount(`#${elementId}`)
