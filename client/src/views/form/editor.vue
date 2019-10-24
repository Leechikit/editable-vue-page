<template>
  <div class="formEditor">
    <el-container>
      <el-header height="50px"></el-header>
      <el-container class="formEditor-container">
        <el-aside class="formEditor-aside" width="200px">
          <controlList></controlList>
        </el-aside>
        <el-main class="formEditor-main"> </el-main>
        <el-aside class="formEditor-aside" width="200px"> </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import controlList from '@/components/controlList'
export default {
  name: 'form-editor',
  components: { controlList }
}
</script>
<style lang="scss" scope>
.formEditor {
  height: 100vh;
  overflow: hidden;
  &-main {
    height: calc(100vh - 50px);
    overflow: auto;
  }
}
</style>
