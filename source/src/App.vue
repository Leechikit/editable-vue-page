<template>
  <component :is="componentName"></component>
</template>

<script>
let controls = require.context('./components/', true, /.*\.vue$/)
let components = {}
controls.keys().forEach(key => {
  let control = controls(key)
  components[control.default.name] = control.default
})
export default {
  components: {
    ...components
  },
  data() {
    return {
      componentName: Object.keys(components)[0]
    }
  }
}
</script>
