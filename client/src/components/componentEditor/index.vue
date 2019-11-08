<template>
  <div class="componentEditor" :class="{ 's-readonly': readonly }">
    <component :is="compName" :data="formatProperties"></component>
  </div>
</template>
<script>
export default {
  name: 'componentEditor',
  props: {
    compName: {
      type: String
    },
    properties: {
      type: Array
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formatProperties: this.formatPropertiesHandle(this.properties)
    }
  },
  watch: {
    properties: {
      handler(val) {
        this.formatProperties = this.formatPropertiesHandle(val)
      },
      deep: true
    }
  },
  methods: {
    formatPropertiesHandle(properties) {
      let result = {}
      properties.forEach(item => {
        result[item.enName] = item.value
      })
      return result
    }
  }
}
</script>
<style lang="scss" scope>
.componentEditor {
  &.s-readonly {
    pointer-events: none;
  }
}
</style>
