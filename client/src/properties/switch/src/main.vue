<template>
  <div>
    {{ config.cnName }}
    <el-switch
      v-model="currentValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  name: 'PropertySwitch',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          cnName: '',
          enName: '',
          tips: ''
        }
      }
    },
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
