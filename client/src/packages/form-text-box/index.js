import Vue from 'vue'
import TextBox from './src/main.vue'

const Component = Vue.extend(TextBox)
TextBox.install = function(Vue) {
  Vue.component(TextBox.name, TextBox)
  Vue.prototype.$FormTextBox = function() {
    const instance = new Component()
    instance.$mount()
    return instance
  }
}
export default TextBox
