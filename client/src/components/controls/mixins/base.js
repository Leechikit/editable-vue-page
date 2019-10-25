export default {
  props: {
    config: {
      type: Object
    },
    value: {
      required: true
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  mounted() {
    this.currentValue = this.value
    // 挂载getValue到上一级组件
    this.$emit('getValue', this.getValue)
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
    /**
     * 获取提交表单的值
     *
     */
    getValue() {
      if (this.currentValue === void 0) {
        this.currentValue = null
      }
      return this.currentValue
    }
  }
}
