<template>
  <div class="moduleBox">
    <div class="title" v-text="title"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'moduleBox',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.moduleBox {
  padding: 0 20px;
  margin: 20px 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 18px;
  }
}
</style>
