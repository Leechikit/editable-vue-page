<template>
  <div class="editor">
    <codemirror v-model="value.template" :options="editorOption"></codemirror>
    <codemirror v-model="value.script" :options="editorOption"></codemirror>
    <codemirror v-model="value.style" :options="editorOption"></codemirror>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')

require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')
export default {
  name: 'editor',
  comments: {
    codemirror
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          template: '',
          script: '',
          style: ''
        }
      }
    }
  },
  watch: {
    value: {
      handler(value) {
        this.$emit('input', value)
      },
      deep: true
    }
  },
  data() {
    return {
      editorOption: {
        tabSize: 4,
        lineNumbers: true,
        fixedGutter: true
      }
    }
  }
}
</script>
<style lang="scss" scope>
</style>
