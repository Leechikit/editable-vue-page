<template>
  <div class="editor" v-loading="loading">
    <componentDetail
      v-model="name"
      prefix="页面"
      :disabled="type !== 'create'"
    ></componentDetail>
    <div>
      <el-switch
        v-model="editType"
        active-text="代码编辑"
        inactive-text="拖拽布局"
      >
      </el-switch>
    </div>
    <template v-if="editType">
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
  </div>
</template>
<script>
import componentDetail from '@/components/componentDetail'
import editorBox from '@/components/editorBox'
import layoutBox from '@/components/layoutBox'
import HTTP_PAGE from '@/api/page'

export default {
  name: 'editor',
  components: {
    componentDetail,
    editorBox,
    layoutBox
  },
  data() {
    return {
      pageId: this.$route.params.pageId,
      type: 'edit', // 表单类型 edit-编辑 create-创建
      loading: false,
      saveLoading: false,
      editType: true,
      name: {
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
        this.type = 'create'
      } else {
        this.type = 'edit'
        this.getData()
      }
    }
  },
  created() {
    this.resetData()
    if (this.pageId === 'create') {
      this.type = 'create'
    } else {
      this.getData()
    }
  },
  methods: {
    resetData() {
      this.name = {
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
        this.name.enName = result.result.enName
        this.name.cnName = result.result.cnName
        this.code.template = result.result.template
        this.code.script = result.result.script
        this.code.style = result.result.style
      }
    },
    save() {
      this.saveLoading = true
      HTTP_PAGE.save({
        pageId: this.pageId === 'create' ? void 0 : this.pageId,
        name: this.name,
        code: this.code
      }).finally(() => {
        this.saveLoading = false
      })
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.button-list {
  padding-left: 20px;
}
</style>
