const requireAll = context => context.keys().map(context)
const components = require.context('./', true, /[^.]\/index.js$/)

const install = function(Vue) {
  requireAll(components).forEach(component => {
    component.default.install(Vue)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}
