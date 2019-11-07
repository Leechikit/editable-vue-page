<template>
  <div>
    {{ config.cnName }}
    <el-input v-model="currentValue"></el-input>
  </div>
</template>

<script>
export default {
  name: 'PropertyText',
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
      type: String
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
