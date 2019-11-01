<template>
  <div>
    {{ config.cnName }}
    <el-input v-model="value"></el-input>
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
          tips: '',
          value: ''
        }
      }
    }
  },
  data() {
    return {
      value: this.config.value
    }
  },
  watch: {
    value(val) {
      this.$emit('input', val)
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './main.scss';
</style>
