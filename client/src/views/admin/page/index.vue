<template>
  <div class="editor" v-loading="loading">
    <componentDetail
      v-model="name"
      :disabled="type !== 'create'"
    ></componentDetail>
    <editorbox v-model="code"></editorbox>
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
import editorbox from '@/components/editorBox'
import HTTP_PAGE from '@/api/page'

export default {
  name: 'editor',
  components: {
    componentDetail,
    editorbox
  },
  data() {
    return {
      pageId: this.$route.params.pageId,
      type: 'edit', // 表单类型 edit-编辑 create-创建
      loading: false,
      saveLoading: false,
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
  created() {
    if (this.pageId === 'create') {
      this.type = 'create'
    } else {
      this.resetData()
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
        compId: this.compId,
        compType: this.compType
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
        compId: this.compId === 'create' ? void 0 : this.compId,
        compType: this.compType,
        name: this.name,
        code: this.code
      }).finally(() => {
        this.saveLoading = false
      })
      console.log(this.name)
      console.log(this.code)
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
