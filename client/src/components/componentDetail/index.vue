<template>
  <div class="componentDetail">
    <moduleBox title="组件名称">
      <el-form :model="value" label-width="100px">
        <el-form-item label="组件中文名称">
          <el-input v-model="value.cnName" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="组件英文名称">
          <el-input v-model="value.enName" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
    </moduleBox>
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
          cnName: ''
        }
      }
    },
    disabled: {
      type: Boolean,
      default: () => false
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
