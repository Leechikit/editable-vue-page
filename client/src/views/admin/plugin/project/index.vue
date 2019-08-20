<template>
  <div class="project">
    <el-card class="project-card">
      <div
        class="project-item"
        v-for="(item, $index) in list"
        :key="$index"
        @click="clickHandle(item.id)"
      >
        {{ item.name }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'project',
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
    clickHandle(id) {
      this.$router.push({
        name: 'plugin/project/editor',
        params: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scope>
.project {
  height: 100%;
  &-card {
    min-height: 100%;
    overflow: hidden;
  }
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
    cursor: pointer;
    background-color: #f1f1f1;
  }
}
</style>
