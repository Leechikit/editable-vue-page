<template>
  <div class="componentDetail">
    <el-form :model="value" label-width="100px">
      <moduleBox :title="`${prefix}名称`" v-if="visible.includes('name')">
        <el-form-item :label="`${prefix}中文名称`">
          <el-input v-model="value.cnName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item :label="`${prefix}英文名称`">
          <el-input v-model="value.enName" :disabled="disabled"></el-input>
        </el-form-item>
      </moduleBox>
      <moduleBox title="默认宽高" v-if="visible.includes('layout')">
        <el-form-item :label="`${prefix}宽度`">
          <el-input v-model="value.width">
            <span slot="append">px</span>
          </el-input>
        </el-form-item>
        <el-form-item :label="`${prefix}高度`">
          <el-input v-model="value.height">
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
          width: 0,
          height: 0
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
    }
  },
  watch: {
    value: {
      handler(value) {
        this.$emit('input', value)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.componentDetail {
  max-width: 500px;
}
</style>
