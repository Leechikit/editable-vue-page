<template>
  <div v-if="visible">
    <component
      v-for="(item, $index) in currentValue"
      :key="$index"
      :is="`property-${item.type}`"
      :config="item"
      v-model="item.value"
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
    value: {
      type: Array
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
    currentValue: {
      handler(value) {
        this.$emit('input', value)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scope>
</style>