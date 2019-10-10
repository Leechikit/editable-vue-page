<template>
  <div class="componentDetail">
    <el-form ref="form" :model="value" :rules="rules" label-width="110px">
      <moduleBox :title="`${prefix}名称`" v-if="visible.includes('name')">
        <el-form-item :label="`${prefix}中文名称`" prop="cnName">
          <el-input v-model="value.cnName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item :label="`${prefix}英文名称`" prop="enName">
          <el-input v-model="value.enName" :disabled="disabled">
            <span v-if="!disabled && prepend" slot="prepend">{{
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
    disabled: {
      type: Boolean,
      default: () => false
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
            required: true,
            message: `请输入${this.prefix}中文名称`,
            trigger: 'blur'
          }
        ],
        enName: [
          {
            required: true,
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
    }
  },
  methods: {
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
