<template>
  <div class="pluginList">
    <el-tabs :stretch="true">
      <el-tab-pane label="页面组件">
        <ul class="pluginList-list">
          <li v-for="(item, $index) in selectedPlugins" :key="$index">
            {{ item.cnName }}
          </li>
        </ul>
        <div class="pluginList-buttons">
          <el-button-group>
            <div class="el-button">
              <el-popover placement="top-start" width="200" trigger="hover">
                <div class="pluginList-options" v-loading="platformLoading">
                  <div
                    class="option"
                    v-for="(item, $index) in platformPlugins"
                    :key="$index"
                    @click="select(item)"
                  >
                    {{ item.cnName }}
                  </div>
                </div>
                <el-button slot="reference" size="mini"
                  >平台组件<i class="el-icon-plus el-icon--right"></i
                ></el-button>
              </el-popover>
            </div>
            <div class="el-button">
              <el-popover placement="top-start" width="200" trigger="hover">
                <div class="pluginList-options" v-loading="platformLoading">
                  <div
                    class="option"
                    v-for="(item, $index) in projectPlugins"
                    :key="$index"
                    @click="select(item)"
                  >
                    {{ item.cnName }}
                  </div>
                </div>
                <el-button slot="reference" size="mini"
                  >项目组件<i class="el-icon-plus el-icon--right"></i
                ></el-button>
              </el-popover>
            </div>
          </el-button-group>
        </div>
      </el-tab-pane>
      <el-tab-pane label="页面配置">页面配置</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import HTTP_PLUGIN from '@/api/plugin'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'pluginList',
  data() {
    return {
      platformPlugins: [],
      projectPlugins: [],
      platformLoading: false,
      projectLoading: false
    }
  },
  computed: {
    ...mapState(['selectedPlugins'])
  },
  created() {
    this.getPlatformPlugins()
    this.getProjectPlugins()
  },
  methods: {
    async getPlatformPlugins() {
      this.platformLoading = true
      let result = await HTTP_PLUGIN.getList({
        compType: 'platform'
      })
      this.platformLoading = false
      if (+result.code === 0) {
        this.platformPlugins = result.result
      }
    },
    async getProjectPlugins() {
      this.projectLoading = true
      let result = await HTTP_PLUGIN.getList({
        compType: 'project'
      })
      this.projectLoading = false
      if (+result.code === 0) {
        this.projectPlugins = result.result
      }
    },
    select(item) {
      this.setSelectedPlugins(item)
    },
    ...mapMutations(['setSelectedPlugins'])
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base.scss';
.pluginList {
  height: 100%;
  border-left: 1px solid $color-layout-border;
  overflow: auto;
  &-buttons {
    text-align: center;
    .el-button-group {
      & > .el-button {
        padding: 0;
        border: 0;
      }
      .el-button {
        float: left;
        position: relative;
        &:first-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        &:last-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &:not(:first-child):not(:last-child) {
          border-radius: 0;
        }
      }
    }
  }
  &-options {
    min-height: 50px;
    .option {
      padding: 5px 0;
      cursor: pointer;
    }
  }
}
</style>
