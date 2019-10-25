<template>
  <component
    :is="type"
    v-model="currentValue"
    :type="type"
    :id="id"
    :config="config"
    @getValue="getValue"
    @input="handleInput"
  ></component>
</template>
<script>
let controls = require.context('./', true, /form-.*\.vue$/)
let components = {}
controls.keys().forEach(key => {
  let control = controls(key)
  components[control.default.name] = control.default
})
export default {
  props: {
    value: {},
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    getValue(event) {
      this.$emit('getValue', event)
    },
    handleInput(event) {
      this.$emit('input', event)
    }
  }
}
</script>
