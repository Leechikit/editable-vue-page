<template>
  <div
    class="controlButton"
    :class="{'s-disabled': disabled}"
    @click="clickHandle()"
  >
    <div class="left">
      <slot></slot>
    </div>
    <div
      class="right"
      v-if="setable"
    >
      <i
        class="el-icon-setting"
        @click.stop="modifyHandle()"
      ></i>
      <i
        class="el-icon-delete"
        @click.stop="deleteHandle()"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'controlButton',
  props: ['setable', 'disabled'],
  data () {
    return {
    }
  },
  methods: {
    clickHandle () {
      if (this.disabled === false) {
        this.$emit('click')
      }
    },
    modifyHandle () {
      this.$emit('modify')
    },
    deleteHandle () {
      this.$emit('delete')
    }
  },
}
</script>
<style lang="scss" scoped>
.controlButton {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-radius: 3px;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  .right {
    display: none;
    flex-shrink: 0;
    & > i {
      width: 20px;
    }
  }
  &:hover {
    color: #409eff;
    border-color: #409eff;
    .right {
      display: block;
    }
  }
  &.s-disabled {
    color: #fff;
    background-color: #409eff;
  }
}
</style>
