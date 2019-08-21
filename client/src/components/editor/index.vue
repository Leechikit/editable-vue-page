<template>
  <div class="editor">
    <moduleBox title="VUE模板">
      <div class="editor-box">
        <pre class="editor-tag">&lt;template&gt;</pre>
        <codemirror
          v-model="value.template"
          :options="editorOption.template"
        ></codemirror>
        <pre class="editor-tag">&lt;/template&gt;</pre>
        <pre class="editor-tag">
&lt;script&gt;
    export default {</pre
        >
        <codemirror
          v-model="value.script"
          :options="editorOption.script"
        ></codemirror>
        <pre class="editor-tag">
    }
&lt;/script&gt;</pre
        >
        <pre class="editor-tag">&lt;style  lang="scss" scoped&gt;</pre>
        <codemirror
          v-model="value.style"
          :options="editorOption.style"
        ></codemirror>
        <pre class="editor-tag">&lt;/style&gt;</pre>
      </div>
    </moduleBox>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')

require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')
import moduleBox from '@/components/moduleBox'
const editorOptionDefault = {
  tabSize: 4,
  lineNumbers: true,
  fixedGutter: true
}
export default {
  name: 'editor',
  components: {
    codemirror,
    moduleBox
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
      editorOptionDefault: {
        tabSize: 4,
        lineNumbers: true,
        fixedGutter: true
      },
      editorOption: {
        template: {
          ...editorOptionDefault,
          mode: 'text/x-vue'
        },
        script: {
          ...editorOptionDefault,
          mode: 'javascript'
        },
        style: {
          ...editorOptionDefault,
          mode: 'text/x-sass'
        }
      }
    }
  },
  created() {
    console.log(this.editorOption)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base';
.editor {
  &-box {
    padding: 20px;
    border: 1px solid $color-layout-border;
    background-color: #f7f7f7;
  }
  &-tag {
    font-family: inherit;
    color: #6a825e;
    margin: 5px 0;
  }
}
</style>
