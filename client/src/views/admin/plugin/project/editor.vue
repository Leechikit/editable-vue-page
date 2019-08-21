<template>
  <div class="editor">
    <editorbox v-model="code"></editorbox>
    <el-button @click="save">TEST</el-button>
  </div>
</template>
<script>
import editorbox from '@/components/editor'
export default {
  name: 'editor',
  components: {
    editorbox
  },
  data() {
    return {
      code: {
        template: '',
        script: '',
        style: ''
      }
    }
  },
  methods: {
    save() {
      console.log(this.code)
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
