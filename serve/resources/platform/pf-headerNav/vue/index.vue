<template>
<div>
  <div class="place" :style="{ display }"></div>
  <div
    class="custom-main-header"
    :style="{ background: 'rgba(30,30,40,' + opacity + ')' }"
  >
    <div class="custom-main-logo" style="float:left">
      <router-link to="/home">
        <img
          :src="logoImg"
          height="50"
        />
      </router-link>
    </div>
    <div class="custom-header-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in currentPath"
          :key="index"
          :to="toName(item.name)"
        >
          {{ itemTitle(item) }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="custom-header-menu">
      <div class="custom-header-menu-item" @click="gotoMyWork">
        <span class="iconfont iconjilu blue"></span>
        <span class="custom-title">我的工作</span>
      </div>
      <div class="custom-header-menu-item" @click="gotoDocumentLib">
        <span class="iconfont iconwendang blue"></span>
        <span class="custom-title">文件库</span>
      </div>
      <div class="custom-header-menu-item">
          <span class="iconfont iconquanbu blue"></span>
          <span class="custom-title">应用</span>
      </div>
      <div
        class="custom-header-menu-item custom-header-menu-item-right"
        @click="gotoPersonalInformation"
      >
        <span class="iconfont iconL-gerenyonghu2 blue"></span>
        <span class="custom-title">个人信息</span>
      </div>
      <div
        class="custom-header-menu-item"
        @click="goAppManager"
      >
        <span class="iconfont iconLgongzuo blue"></span>
        <span class="custom-title">应用管理</span>
      </div>
      <div
        class="custom-header-menu-item"
        @click="gotoPage"
      >
        <span class="iconfont iconLtongxunlu blue"></span>
        <span class="custom-title">组织管理</span>
      </div>
      <div
        class="custom-header-menu-item custom-header-menu-item-right"
      >
        <el-dropdown trigger="click" @command="goSystem" placement="bottom">
          <span class="el-dropdown-link" style="color:#fff">
            <span class="iconfont iconLshezhi blue"></span>
            <span class="custom-title">系统管理</span>
            <span
              class="iconfont iconxia"
              style="font-size:8px;line-height: 28px;"
            ></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="ownspace_index">
              企业信息
            </el-dropdown-item>
            <el-dropdown-item command="file-setup">
              档案设置
            </el-dropdown-item>
            <el-dropdown-item command="monitor">
              监控中心
            </el-dropdown-item>
            <el-dropdown-item command="log-manage">
              日志管理
            </el-dropdown-item>
            <el-dropdown-item command="home-setting">
              首页配置
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="custom-header-menu-item">
        <el-dropdown trigger="click" @command="goSystem" placement="bottom">
          <span class="el-dropdown-link" style="color:#fff">
            <img
              class="custom-title"
              style="width:20px;height:20px;border-radius:50%;margin-right:5px;margin-top:3px"
            />
            <span class="custom-title">
              {{ userName }}
            </span>
            <span
              class="iconfont iconxia"
              style="font-size:8px;line-height: 28px;"
            ></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login">
              <span class="iconfont icontuichu blue"></span> 退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</div>


</template>
<script>
export default {
props: {
  opacity: {
    type: String,
    default: '1'
  },
  display: {
    type: String,
    default: 'block'
  }
},
data() {
  return {
    appListShow: false,
    popoverShow: false,
    logoImg: '',
    userName: '用户',
    currentPath: [
        {
          title: '首页',
          path: 'home',
          name: 'home_index'
        }
     ]
  }
},
methods: {
  toName(name) {
    return name ? { name } : ''
  },
  itemTitle(item) {
    return item.title
  },
  gotoMyWork() {
    this.$router.push({
      name: 'my-work'
    })
  },
  gotoDocumentLib() {
    this.$router.push({
      name: 'document-lib'
    })
  },
  gotoPersonalInformation() {
    this.$router.push({
      name: 'personal_information'
    })
  },
  goAppManager() {
    this.$router.push({
      name: 'workflow-design'
    })
  },
  gotoPage() {
    this.$router.push({
      name: 'people-manage'
    })
  },
  toApp(itemId, itemName) {
    
  },
  getModuleList(showAppList = true) {
    
  },
  goSystem(name) {
    
  }
}


}
</script>
<style lang="scss" scoped>
$height: 50px;

.iconfont {
  font-size: 16px;
}
.place {
  height: $height;
}
.blue {
  color: #327dff;
}
.custom-main-header {
  position: fixed;
  height: $height;
  top: 0;
  width: 100%;
  z-index: 1;
  .custom-main-logo {
    float: left;
    img {
      width: auto;
      max-width: 350px;
      padding: 5px;
    }
  }
  .custom-header-breadcrumb {
    float: left;
    margin-left: 20px;
    margin-top: 14px;
  }
  .custom-header-menu {
    position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 22px;
    .custom-header-menu-item {
      float: left;
      padding-right: 20px;
      color: #fff;
      cursor: pointer;
      .custom-title,
      .iconfont {
        margin-left: 4px;
        float: left;
        line-height: 24px;
      }
    }
    .custom-header-menu-item-right {
      border-right: 1px solid #3c3c46;
      margin-right: 20px;
    }
  }
}
.icons-item {
  margin: 0 0 15px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  color: #5c6b77;
}
.icons-item:hover {
  cursor: pointer;
  background-color: #f8f8f8;
}
.icons-item i {
  font-size: 30px;
}

.icons-item span {
  display: block;
}
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin: 0 auto;
}


</style>