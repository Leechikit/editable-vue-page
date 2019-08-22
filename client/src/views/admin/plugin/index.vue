<template>
  <div class="plugin">
    <div
      class="plugin-item"
      v-for="(item, $index) in list"
      :key="$index"
      @click="clickHandle(item.id)"
    >
      {{ item.name }}
    </div>
    <div class="plugin-item btn-create" @click="clickHandle('create')">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'plugin',
  data() {
    return {
      list: [
        {
          name: '测试组件',
          id: '123'
        }
      ]
    }
  },
  methods: {
    clickHandle(compId) {
      this.$router.push({
        name: 'plugin/editor',
        params: {
          compId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base';

.plugin {
  height: 100%;
  margin-right: -20px;
  margin-bottom: -20px;
  overflow: hidden;
  &-item {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 80px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid $color-layout-border;
    cursor: pointer;
    background-color: #f1f1f1;
  }
  .btn-create {
    font-size: 20px;
  }
}
</style>
