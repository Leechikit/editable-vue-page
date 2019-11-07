import Vue from 'vue'
import TextBox from './src/main.vue'

// const Component = Vue.extend(TextBox)
TextBox.install = function(option) {
  Vue.component(TextBox.name, {
    props: {
      data: {
        type: Object,
        default: () => {
          return option.props
        }
      }
    },
    render(createElement) {
      return createElement(TextBox, {
        props: {
          data: this.data
        }
      })
    }
  })
  // const instance = new Component({
  //   render(createElement) {
  //     return createElement(TextBox, {
  //       on
  //     })
  //   }
  // })
  // return instance
}
export default TextBox
