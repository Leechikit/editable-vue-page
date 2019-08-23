<template>
  <div class="plugin" v-loading="loading">
    <div
      class="plugin-item"
      v-for="(item, $index) in list"
      :key="$index"
      @click="clickHandle(item.id)"
    >
      {{ item.cnName }}
    </div>
    <div
      v-if="compType !== 'platform'"
      class="plugin-item btn-create"
      @click="clickHandle('create')"
    >
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>
<script>
import HTTP_PLUGIN from '@/api/plugin'
export default {
  name: 'plugin',
  data() {
    return {
      list: [],
      compType: this.$route.params.compType,
      loading: false
    }
  },
  watch: {
    $route() {
      this.compType = this.$route.params.compType
      this.resetData()
      this.getData()
    }
  },
  created() {
    this.resetData()
    this.getData()
  },
  methods: {
    resetData() {
      this.list = []
    },
    async getData() {
      this.loading = true
      let result = await HTTP_PLUGIN.getList({
        compType: this.compType
      })
      this.loading = false
      if (+result.code === 0) {
        this.list = result.result
      }
    },
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
