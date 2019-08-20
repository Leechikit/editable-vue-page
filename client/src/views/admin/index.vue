<template>
  <div class="admin">
    <el-container class="admin-container">
      <el-aside width="200px">
        <el-menu class="admin-menu" :default-active="$route.path" router>
          <el-submenu index="admin/plugin">
            <div slot="title">
              <i class="el-icon-set-up"></i>
              <span>组件管理</span>
            </div>
            <el-menu-item index="/admin/plugin/platform"
              >平台组件管理</el-menu-item
            >
            <el-menu-item index="/admin/plugin/project"
              >项目组件管理</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'admin',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scope>
@import '~@/assets/styles/base.scss';
.admin {
  background-color: $color-layout-border;
  &-container {
    min-height: 100vh;
  }
  &-menu {
    height: 100%;
  }
}
</style>
