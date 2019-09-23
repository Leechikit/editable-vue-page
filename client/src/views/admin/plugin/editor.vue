<template>
  <div class="editor" v-loading="loading">
    <componentDetail
      v-model="detail"
      :visible="['name', 'layout']"
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
import HTTP_PLUGIN from '@/api/plugin'

export default {
  name: 'editor',
  components: {
    componentDetail,
    editorbox
  },
  data() {
    return {
      compId: this.$route.params.compId,
      compType: this.$route.params.compType,
      type: 'edit', // 表单类型 edit-编辑 create-创建
      loading: false,
      saveLoading: false,
      detail: {
        enName: '',
        cnName: '',
        width: 0,
        height: 0
      },
      code: {
        template: '',
        script: '',
        style: ''
      }
    }
  },
  created() {
    this.resetData()
    if (this.compId === 'create') {
      this.type = 'create'
    } else {
      this.getData()
    }
  },
  methods: {
    resetData() {
      this.detail = {
        enName: '',
        cnName: '',
        width: 0,
        height: 0
      }
      this.code = {
        template: '',
        script: '',
        style: ''
      }
    },
    async getData() {
      this.loading = true
      let result = await HTTP_PLUGIN.getDetail({
        compId: this.compId,
        compType: this.compType
      })
      this.loading = false
      if (+result.code === 0) {
        this.detail.enName = result.result.enName
        this.detail.cnName = result.result.cnName
        this.detail.width = result.result.width
        this.detail.height = result.result.height
        this.code.template = result.result.template
        this.code.script = result.result.script
        this.code.style = result.result.style
      }
    },
    save() {
      this.saveLoading = true
      HTTP_PLUGIN.save({
        compId: this.compId === 'create' ? void 0 : this.compId,
        compType: this.compType,
        detail: this.detail,
        code: this.code
      }).finally(() => {
        this.saveLoading = false
      })
      console.log(this.detail)
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
