<template>
  <div class="project">
    <div
      class="project-item"
      v-for="(item, $index) in list"
      :key="$index"
      @click="clickHandle(item.id)"
    >
      {{ item.name }}
    </div>
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
<style lang="scss" scoped>
.project {
  height: 100%;
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
