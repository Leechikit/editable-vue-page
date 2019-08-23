<template>
  <div class="editor" v-loading="loading">
    <componentDetail
      v-model="name"
      :disabled="type !== 'create'"
    ></componentDetail>
    <editorbox v-model="code"></editorbox>
    <div class="button-list">
      <el-button type="primary" @click="save">保存</el-button>
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
    if (this.compId === 'create') {
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
      let result = await HTTP_PLUGIN.getCode({
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
      HTTP_PLUGIN.save({
        compId: this.compId,
        compType: this.compType,
        name: this.name,
        code: this.code
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
