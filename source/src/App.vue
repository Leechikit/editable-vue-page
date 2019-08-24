<template>
  <div :id="elementId">
    <component v-for="item in componentName" :key="item" :is="item"></component>
  </div>
</template>

<script>
import { elementId } from '@/element-id'
let controls = require.context('./components/', true, /.*\.vue$/)
let components = {}
controls.keys().forEach(key => {
  let control = controls(key)
  components[control.default.name] = control.default
})
export default {
  name: elementId,
  components: {
    ...components
  },
  data() {
    return {
      elementId,
      componentName: Object.keys(components)
    }
  }
}
</script>
