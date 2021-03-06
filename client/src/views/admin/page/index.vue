<template>
  <div class="page" v-loading="loading">
    <el-container class="page-container">
      <el-main class="page-main">
        <componentDetail
          ref="componentDetail"
          v-model="detail"
          :visible="['name']"
          :mode="mode"
          prefix="页面"
          prepend="pg-"
        ></componentDetail>
        <div>
          <el-switch
            v-model="isLayout"
            inactive-text="代码编辑"
            active-text="拖拽布局"
            @change="changeEditType"
          >
          </el-switch>
        </div>
        <template v-if="!isLayout">
          <editorBox v-model="code"></editorBox>
        </template>
        <template v-else>
          <layoutBox></layoutBox>
        </template>
        <div class="button-list">
          <el-button type="primary" :loading="saveLoading" @click="save"
            >保存</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-main>
      <transition name="slide-in">
        <el-aside v-show="asideVisible" class="page-aside" width="220px">
          <pluginList></pluginList>
        </el-aside>
      </transition>
    </el-container>
  </div>
</template>
<script>
import componentDetail from '@/components/componentDetail'
import editorBox from '@/components/editorBox'
import layoutBox from '@/components/layoutBox'
import pluginList from '@/components/pluginList'
import HTTP_PAGE from '@/api/page'

export default {
  name: 'page',
  components: {
    componentDetail,
    editorBox,
    layoutBox,
    pluginList
  },
  data() {
    return {
      pageId: this.$route.params.pageId,
      mode: 'edit', // 表单类型 edit-编辑 create-创建
      loading: false,
      saveLoading: false,
      isLayout: true,
      asideVisible: true,
      detail: {
        enName: '',
        cnName: ''
      },
      code: {
        template: '',
        script: '',
        style: ''
      }
    }
  },
  watch: {
    $route() {
      this.pageId = this.$route.params.pageId
      this.resetData()
      if (this.pageId === 'create') {
        this.mode = 'create'
      } else {
        this.mode = 'edit'
        this.getData()
      }
    }
  },
  created() {
    this.resetData()
    if (this.pageId === 'create') {
      this.mode = 'create'
    } else {
      this.getData()
    }
  },
  methods: {
    resetData() {
      this.detail = {
        enName: '',
        cnName: ''
      }
      this.code = {
        template: '',
        script: '',
        style: ''
      }
    },
    async getData() {
      this.loading = true
      let result = await HTTP_PAGE.getDetail({
        pageId: this.pageId
      })
      this.loading = false
      if (+result.code === 0) {
        this.detail.enName = result.result.enName
        this.detail.cnName = result.result.cnName
        this.code.template = result.result.template
        this.code.script = result.result.script
        this.code.style = result.result.style
      }
    },
    async save() {
      const valid = await this.$refs.componentDetail.validate()
      if (valid === false) return
      this.saveLoading = true
      HTTP_PAGE.save({
        pageId: this.pageId === 'create' ? void 0 : this.pageId,
        detail: this.detail,
        code: this.code
      })
        .then(res => {
          if (+res.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '保存失败!\n' + res.msg
            })
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '保存失败!\n' + err
          })
        })
        .finally(() => {
          this.saveLoading = false
        })
    },
    cancel() {
      this.$router.back()
    },
    changeEditType(val) {
      this.asideVisible = val
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  margin: -20px;
  height: calc(100% + 40px);
  overflow: hidden;
  &-container {
    height: 100%;
  }
  &-main {
    height: 100%;
    overflow: auto;
  }
  &-aside {
    background-color: #fff;
  }
}
.button-list {
  padding-left: 20px;
}
.slide-in-enter-active {
  display: block;
  transition: all 0.3s ease;
}
.slide-in-leave-active {
  display: none;
  // transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-in-enter, .slide-in-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(200px);
  opacity: 0;
}
</style>
