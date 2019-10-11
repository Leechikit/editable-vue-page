<template>
  <div class="admin">
    <el-container>
      <el-header height="50px"></el-header>
      <el-container class="admin-container">
        <el-aside class="admin-aside" width="200px">
          <el-menu
            class="admin-menu"
            :default-openeds="['admin/page', 'admin/plugin']"
            :default-active="
              $route.path === '/admin/page/create'
                ? $route.path
                : $route.path.replace(/\/\d+$|\/create$/, '')
            "
            @select="selectMenu"
          >
            <el-submenu index="admin/page">
              <div slot="title">
                <i class="el-icon-s-home"></i>
                <span>页面管理</span>
              </div>
              <el-menu-item index="/admin/page/create">新增页面</el-menu-item>
              <el-menu-item
                v-for="item in pageList"
                :key="item.id"
                :index="`/admin/page/${item.id}`"
                >{{ item.cnName }}管理</el-menu-item
              >
            </el-submenu>
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
        <el-main class="admin-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import HTTP_PAGE from '@/api/page'

export default {
  name: 'admin',
  data() {
    return {
      pageList: []
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    async getPageList() {
      let result = await HTTP_PAGE.getList()
      if (+result.code === 0) {
        this.pageList = result.result
      }
    },
    selectMenu(index) {
      this.$router.replace({
        path: index
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base.scss';
.admin {
  height: 100vh;
  background-color: $color-background;
  overflow: hidden;
  &-menu {
    height: 100%;
  }
  &-main {
    height: calc(100vh - 50px);
    background-color: #fff;
    overflow: auto;
  }
}
</style>
