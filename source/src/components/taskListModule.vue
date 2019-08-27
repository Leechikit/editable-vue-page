<template>
<div class="app-list-box">
  <div
    v-for="(item, index) in showWorkApp"
    :key="index"
    class="app-list"
    @click="toTaskMyWork(item.task)"
  >
    <!-- <CountTo :endVal="item.num"> </CountTo> -->
    <p class="name">{{ item.name }}</p>
    <div class="icon-box">
      <span class="iconfont" :class="item.class"></span>
    </div>
    <div v-if="index === showWorkApp.length - 1" class="app-btn">
      <!-- <el-button
        type="primary"
        size="mini"
        @click.stop="showQuickModel"
        >编辑</el-button
      > -->
    </div>
  </div>
</div>
</template>
<script>
export default {
// components: { CountTo },
data() {
  return {
    showWorkApp: [{
      name: '测试应用',
      task: 'test'
    }]
  }
},
created() {

},
methods: {
  toTaskMyWork(task) {
    console.log(task)
  }
}
}
</script>
<style lang="scss" scoped>
.app-list-box {
  .app-list {
    width: 300px;
    height: 200px;
    .name {
		color: yellow;
    }
  }
}

</style>