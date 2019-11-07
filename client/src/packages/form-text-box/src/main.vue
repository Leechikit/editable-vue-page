<template>
  <div>
    {{ data.label }}：
    <el-input
      v-model="currentValue"
      :readonly="data.readonly"
      :clearable="data.clearable"
      :placeholder="data.placeholder"
      @change="handleInput"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'FormTextBox',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          label: '',
          value: '',
          readonly: false,
          clearable: false,
          placeholder: ''
        }
      }
    }
  },
  data() {
    return {
      currentValue: this.data.value
    }
  },
  watch: {
    data(val) {
      this.currentValue = val.value
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    console.log(this.data)
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
