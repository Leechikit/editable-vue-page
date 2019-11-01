<template>
  <div class="controlList">
    <p
      v-for="(value, key) in componentJson"
      :key="key"
      @click="clickEvent(key)"
    >
      {{ value.cnName }}
    </p>
  </div>
</template>
<script>
import componentJson from '@/components.json'
export default {
  name: 'controlList',
  data() {
    return {
      componentJson: componentJson
    }
  },
  methods: {
    clickEvent(compName) {
      this.$emit('click', compName)
    }
  }
}
</script>
<style lang="scss" scope>
.controlList {
}
</style>
