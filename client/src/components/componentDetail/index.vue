<template>
  <div class="componentDetail">
    <el-form ref="form" :model="value" :rules="rules" label-width="110px">
      <moduleBox :title="`${prefix}名称`" v-if="visible.includes('name')">
        <el-form-item :label="`${prefix}中文名称`" prop="cnName">
          <el-input
            v-model="value.cnName"
            :disabled="mode !== 'create'"
          ></el-input>
        </el-form-item>
        <el-form-item :label="`${prefix}英文名称`" prop="enName">
          <el-input v-model="value.enName" :disabled="mode !== 'create'">
            <span v-if="mode === 'create' && prepend" slot="prepend">{{
              prepend
            }}</span>
          </el-input>
        </el-form-item>
      </moduleBox>
      <moduleBox title="默认宽高" v-if="visible.includes('layout')">
        <el-form-item :label="`${prefix}宽度`" prop="compWidth">
          <el-input v-model="value.compWidth">
            <span slot="append">px</span>
          </el-input>
        </el-form-item>
        <el-form-item :label="`${prefix}高度`" prop="compHeight">
          <el-input v-model="value.compHeight">
            <span slot="append">px</span>
          </el-input>
        </el-form-item>
      </moduleBox>
    </el-form>
  </div>
</template>
<script>
import moduleBox from '@/components/moduleBox'

export default {
  name: 'componentDetail',
  components: {
    moduleBox
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          enName: '',
          cnName: '',
          compWidth: 0,
          compHeight: 0
        }
      }
    },
    prefix: {
      type: String,
      default: '组件'
    },
    mode: {
      type: String,
      default: 'create'
    },
    visible: {
      type: Array,
      default: () => ['name']
    },
    prepend: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rules: {
        cnName: [
          {
            required: !this.disabled,
            message: `请输入${this.prefix}中文名称`,
            trigger: 'blur'
          }
        ],
        enName: [
          {
            required: !this.disabled,
            message: `请输入${this.prefix}英文名称`,
            trigger: 'blur'
          }
        ],
        compWidth: [
          {
            required: true,
            message: `请输入${this.prefix}宽度`,
            trigger: 'blur'
          }
        ],
        compHeight: [
          {
            required: true,
            message: `请输入${this.prefix}高度`,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    value: {
      handler(value) {
        this.$emit('input', value)
      },
      deep: true
    },
    mode() {
      this.setRules()
    }
  },
  created() {
    this.setRules()
  },
  methods: {
    setRules() {
      this.rules = {
        cnName: [
          {
            required: this.mode === 'create',
            message: `请输入${this.prefix}中文名称`,
            trigger: 'blur'
          }
        ],
        enName: [
          {
            required: this.mode === 'create',
            message: `请输入${this.prefix}英文名称`,
            trigger: 'blur'
          }
        ],
        compWidth: [
          {
            required: true,
            message: `请输入${this.prefix}宽度`,
            trigger: 'blur'
          }
        ],
        compHeight: [
          {
            required: true,
            message: `请输入${this.prefix}高度`,
            trigger: 'blur'
          }
        ]
      }
    },
    validate() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            return resolve(true)
          } else {
            this.$message({
              type: 'warning',
              message: '请填写必填数据'
            })
            return resolve(false)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.componentDetail {
  max-width: 500px;
}
</style>
