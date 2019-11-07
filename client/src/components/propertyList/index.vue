<template>
  <div v-if="visible">
    <component
      v-for="(item, $index) in properties"
      :key="$index"
      :is="`property-${item.type}`"
      :config="item"
      v-model="currentValue[item.enName]"
    ></component>
  </div>
</template>
<script>
export default {
  name: 'PropertyList',
  props: {
    currCompId: {
      type: String
    },
    properties: {
      type: Array
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      visible: true,
      currentValue: this.value
    }
  },
  watch: {
    currCompId() {
      this.visible = false
      this.$nextTick(() => {
        this.visible = true
      })
      this.currentValue = this.value
    },
    currentValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss" scope>
</style>