<template>
  <div class="pluginList">
    <el-tabs :stretch="true">
      <el-tab-pane label="页面组件">页面组件</el-tab-pane>
      <el-tab-pane label="页面配置">页面配置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'pluginList'
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base.scss';
.pluginList {
  height: 100%;
  border-left: 1px solid $color-layout-border;
  overflow: auto;
}
</style>
