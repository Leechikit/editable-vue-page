<template>
  <div class="editor">
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
export default {
  name: 'editor',
  components: {
    componentDetail,
    editorbox
  },
  data() {
    return {
      componentId: this.$route.params.compId,
      type: 'edit', // 表单类型 edit-编辑 create-创建
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
    if (this.componentId === 'create') {
      this.type = 'create'
    }
  },
  methods: {
    save() {
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
