<template>
  <div class="editor" v-loading="loading">
    <componentDetail
      ref="componentDetail"
      v-model="detail"
      :visible="['name', 'layout']"
      :mode="mode"
      :prepend="compType ? { platform: 'pf-', project: 'pj-' }[compType] : ''"
    ></componentDetail>
    <editorbox v-model="code"></editorbox>
    <div class="button-list">
      <el-button type="primary" :loading="saveLoading" @click="save"
        >保存</el-button
      >
      <el-button
        v-if="this.compId !== 'create'"
        :loading="removeLoading"
        @click="removeConfirm"
        >删除</el-button
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
      mode: 'edit', // 表单类型 edit-编辑 create-创建
      loading: false,
      saveLoading: false,
      removeLoading: false,
      detail: {
        enName: '',
        cnName: '',
        compWidth: 0,
        compHeight: 0
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
      this.mode = 'create'
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
      }).catch(err => {
        this.$message({
          type: 'error',
          message: '暂无数据\n' + err
        })
      })
      this.loading = false
      if (+result.code === 0) {
        this.detail.enName = result.result.enName
        this.detail.cnName = result.result.cnName
        this.detail.compWidth = result.result.width
        this.detail.compHeight = result.result.height
        this.code.template = result.result.template
        this.code.script = result.result.script
        this.code.style = result.result.style
      } else {
        this.$message({
          type: 'error',
          message: result.msg
        })
      }
    },
    async save() {
      const valid = await this.$refs.componentDetail.validate()
      if (valid === false) return
      this.saveLoading = true
      const {
        enName,
        cnName,
        compWidth: width,
        compHeight: height
      } = this.detail
      HTTP_PLUGIN.save({
        compId: this.compId === 'create' ? void 0 : this.compId,
        compType: this.compType,
        detail: {
          enName,
          cnName,
          width,
          height
        },
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
    removeConfirm() {
      this.$confirm('确定删除该组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.remove()
      })
    },
    remove() {
      this.removeLoading = true
      HTTP_PLUGIN.remove({ compId: this.compId })
        .then(res => {
          if (+res.code === 0) {
            this.$router.back()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!\n' + res.msg
            })
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: '删除失败!\n' + err
          })
        })
        .finally(() => {
          this.removeLoading = false
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
