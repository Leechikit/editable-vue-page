<template>
  <el-input
    v-model="currentValue"
    :readonly="!config.Editable"
    :clearable="!config.Editable"
    :placeholder="config.placeholder || '请输入单行文本'"
    @change="handleInput"
  ></el-input>
</template>

<script>
/**
 * @name: form-text-box
 * @description: 单行文本控件
 */
import base from './mixins/base'

export default {
  name: 'FormTextBox',
  mixins: [base]
}
</script>
