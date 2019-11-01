const requireAll = context => context.keys().map(context)
const components = require.context('./', true, /[^.]\/index.js$/)

class InsertModule {
  constructor(element, componentsData, thatVue) {
    if (element instanceof String) {
      const el = document.getElementById(element)
      this.element = el ? el : document.body
    } else if (element instanceof HTMLElement) {
      this.element = element
    } else {
      return console.error('传入的元素不是一个dom元素id或者dom元素')
    }

    if (JSON.stringify(componentsData) == '[]') {
      return console.error('传入的组件列表为空')
    }

    this.componentsData = componentsData
    this.vueInstance = thatVue
    this.insertToElement()
  }

  insertToElement() {
    this.componentsData.forEach((component, index) => {
      const componentInstance =
        (this.vueInstance[component.fnName] &&
          this.vueInstance[component.fnName] instanceof Function &&
          this.vueInstance[component.fnName]({
            propsData: component.propsData
          })) ||
        {}

      if (componentInstance.$el) {
        componentInstance.$el.setAttribute('component-index', index)
        componentInstance.$el.setAttribute('isComponent', 'true')
        componentInstance.$el.setAttribute('component-name', component.fnName)
        this.element.appendChild(componentInstance.$el)
      } else {
        console.error(`组件 ${component.fnName} 不存在`)
      }
    })
  }
}

const install = function(Vue) {
  requireAll(components).forEach(component => {
    component.default.install(Vue)
  })
  Vue.prototype.$insertModule = function(element, componentsData) {
    const self = this
    return new InsertModule(element, componentsData, self)
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}
