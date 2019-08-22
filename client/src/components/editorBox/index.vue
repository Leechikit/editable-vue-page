<template>
  <div class="editor">
    <moduleBox title="vue模板">
      <div class="editor-box">
        <!-- template标签 START -->
        <div class="editor-tag cm-s-default">
          <pre
            class="CodeMirror-line cm-s-default"
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">template</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
        </div>
        <div class="editor-code">
          <codemirror
            v-model="value.template"
            :options="editorOption.template"
          ></codemirror>
          <span class="editor-code-tips">PC端vue模板</span>
        </div>
        <div class="editor-tag cm-s-default">
          <pre
            class="CodeMirror-line cm-s-default"
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">/template</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
        </div>
        <!-- template标签 END -->
        <!-- script标签 START -->
        <div class="editor-tag cm-s-default">
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">script</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;">    <span class="cm-keyword">export</span> <span class="cm-keyword">default</span> {</span></pre>
        </div>
        <div class="editor-code">
          <codemirror
            v-model="value.script"
            :options="editorOption.script"
          ></codemirror>
          <span class="editor-code-tips">PC端vue模板</span>
        </div>
        <div class="editor-tag cm-s-default">
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;">    }</span></pre>
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">script</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
        </div>
        <!-- script标签 END -->
        <!-- style标签 START -->
        <div class="editor-tag cm-s-default">
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;</span><span class="cm-tag">style</span>  <span class="cm-attribute">lang</span>=<span class="cm-string">"scss"</span> <span class="cm-attribute">scoped</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
        </div>
        <div class="editor-code">
          <codemirror
            v-model="value.style"
            :options="editorOption.style"
          ></codemirror>
          <span class="editor-code-tips">PC端vue模板</span>
        </div>
        <div class="editor-tag cm-s-default">
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;">    }</span></pre>
          <pre
            class=" CodeMirror-line "
            role="presentation"
          ><span role="presentation" style="padding-right: 0.1px;"><span class="cm-tag cm-bracket">&lt;/</span><span class="cm-tag">style</span><span class="cm-tag cm-bracket">&gt;</span></span></pre>
        </div>
        <!-- style标签 END -->
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
  name: 'editorBox',
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
    background-color: $color-background;
  }
  &-tag {
    margin: 5px 0;
    pre {
      font-family: inherit;
      margin: 0;
    }
  }
  &-code {
    position: relative;
    &-tips {
      position: absolute;
      top: 0;
      right: 0;
      padding: 3px 8px;
      font-size: 12px;
      color: #fff;
      background-color: $color-main;
    }
  }
}
</style>
