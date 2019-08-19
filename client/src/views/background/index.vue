<template>
  <div class="container">
    <div class="sidebar">
      <controlButton
        :disabled="controlkey === 'app'"
        :setable="false"
        @click="changeControl(appCodes, 'app')"
        >表单设置</controlButton
      >
      <div class="title">
        <span class="mark">自定义控件</span>
        <span class="add-btn" @click="showAddDialog"
          ><i class="el-icon-plus"></i>新增</span
        >
      </div>
      <controlButton
        v-for="(control, $index) in controlsCodes"
        :key="$index"
        :disabled="controlkey === control.controlkey"
        @click="changeControl(control, control.controlkey)"
        @modify="showModifyDialog(control)"
        @delete="deleteControl(control)"
        :setable="true"
        >{{ control.displayname }}</controlButton
      >
    </div>
    <div class="content">
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, $index) in editorType"
          :key="$index"
          :label="item.toUpperCase()"
        >
          <codemirror
            :value="editorCode[item]"
            :options="editorOption"
          ></codemirror>
          <!-- <editor :ref="item" :language="item" @change="codeChange"></editor> -->
        </el-tab-pane>
      </el-tabs>
      <div class="save-btn">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <el-dialog
      title="新增控件"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="hideAddDialog"
    >
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="控件KEY" prop="controlkey">
          <el-input
            type="text"
            v-model="ruleForm.controlkey"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="displayname">
          <el-input
            type="text"
            v-model="ruleForm.displayname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addControl()">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改显示名称"
      :visible.sync="modifyDialogVisible"
      width="30%"
      :before-close="hideModifyDialog"
    >
      <el-input
        v-model="ruleForm.displayname"
        placeholder="请输入内容"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyControl()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import * as monaco from 'monaco-editor'
// import editor from '@/components/editor.vue'
import { codemirror } from 'vue-codemirror-lite'
import controlButton from '@/components/controlButton.vue'
import API_CODE from '@/api/code.js'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/vue/vue')

require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')
export default {
  name: 'background',
  components: { codemirror, controlButton },
  data() {
    return {
      controlkey: null,
      appCodes: {},
      controlsCodes: [],
      editorType: ['html', 'css', 'javascript'],
      editorCode: {
        html: '',
        css: '',
        javascript: ''
      },
      editorOption: {
        tabSize: 4,
        lineNumbers: true
      },
      currTabIndex: 0,
      ruleForm: {
        controlkey: '',
        displayname: ''
      },
      rules: {},
      addDialogVisible: false,
      modifyDialogVisible: false
    }
  },
  computed: {
    currEditorType() {
      return this.editorType[this.currTabIndex]
    }
  },
  async mounted() {
    await this.getData()
    // this.$refs[this.currEditorType][0].initEditor()
    // this.$refs[this.currEditorType][0].setValue('')
    this.resetEditor(this.appCodes, 'app')
  },
  methods: {
    async getData() {
      const codes = await API_CODE.getCodes()
      this.appCodes = codes.app
      this.controlsCodes = codes.controls
    },
    changeControl(obj) {
      this.getData()
      this.resetEditor(obj)
    },
    resetEditor(obj, controlkey = obj.controlkey) {
      this.controlkey = controlkey
      this.editorCode.html = obj.html || ''
      this.editorCode.css = obj.style || ''
      this.editorCode.javascript = obj.javascript || ''

      // this.$refs[this.currEditorType][0].setValue(
      //   this.editorCode[this.currEditorType]
      // )
    },
    handleClick(tab, event) {
      this.currTabIndex = tab.index
      // const editor = this.$refs[this.currEditorType][0]
      // setTimeout(() => {
      //   editor.initEditor()
      //   editor.setValue(this.editorCode[this.currEditorType])
      // }, 0)
    },
    codeChange({ type, value }) {
      this.editorCode[type] = value
    },
    async save() {
      const result = await API_CODE.save({
        codes: this.editorCode,
        controlkey: this.controlkey === 'app' ? null : this.controlkey
      })
      if (+result.code === 0) {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: result.msg || '保存失败',
          type: 'error'
        })
      }
    },
    async addControl() {
      const result = await API_CODE.add({
        displayname: this.ruleForm.displayname,
        controlkey: this.ruleForm.controlkey
      })
      if (+result.code === 0) {
        await this.getData()
        const control = this.controlsCodes[this.controlsCodes.length - 1]
        this.resetEditor(control)
        this.$message({
          message: '新增控件成功',
          type: 'success'
        })
        this.addDialogVisible = false
      } else {
        this.$message({
          message: result.msg || '新增控件失败',
          type: 'error'
        })
      }
    },
    showAddDialog() {
      this.addDialogVisible = true
    },
    hideAddDialog() {
      this.addDialogVisible = false
      this.resetRuleForm()
    },
    showModifyDialog(control) {
      this.modifyDialogVisible = true
      this.ruleForm.controlkey = control.controlkey
      this.ruleForm.displayname = control.displayname
    },
    hideModifyDialog() {
      this.modifyDialogVisible = false
      this.resetRuleForm()
    },
    resetRuleForm() {
      this.ruleForm.controlkey = ''
      this.ruleForm.displayname = ''
    },
    async modifyControl() {
      const result = await API_CODE.modify({
        displayname: this.ruleForm.displayname,
        controlkey: this.ruleForm.controlkey
      })
      if (+result.code === 0) {
        this.getData()
        this.$message({
          message: '修改控件成功',
          type: 'success'
        })
        this.modifyDialogVisible = false
      } else {
        this.$message({
          message: result.msg || '修改控件失败',
          type: 'error'
        })
      }
    },
    async deleteControl(control) {
      this.$confirm(
        `此操作将永久删除 ${control.displayname} 控件, 是否继续?`,
        '删除控件',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          const result = await API_CODE.delete({
            controlkey: this.ruleForm.controlkey
          })
          if (+result.code === 0) {
            await this.getData()
            if (this.controlkey === control.controlkey) {
              this.resetEditor(this.appCodes, 'app')
            }
            this.$message({
              type: 'success',
              message: '删除控件成功'
            })
          } else {
            this.$message({
              message: result.msg || '删除控件失败',
              type: 'error'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  padding: 50px;
  background-color: #fff;
  .sidebar {
    flex-shrink: 0;
    width: 200px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
      .mark {
        color: #333;
        font-size: 16px;
        font-weight: 700;
        line-height: 40px;
        height: 40px;
      }
      .add-btn {
        font-size: 12px;
        color: #409eff;
        cursor: pointer;
      }
    }
    .button {
      display: flex;
      align-items: center;
      [class|='el-icon'] {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  .content {
    position: relative;
    flex-grow: 1;
    padding: 0 50px;
    .save-btn {
      position: absolute;
      right: 50px;
      top: 0;
    }
  }
}
</style>
