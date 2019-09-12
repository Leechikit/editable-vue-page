<template>
  <div class="pluginList">
    <el-tabs :stretch="true">
      <el-tab-pane label="页面组件">
        <ul class="pluginList-list">
          <li></li>
        </ul>
        <div class="pluginList-buttons">
          <el-button-group>
            <div class="el-button">
              <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
              >
                <el-button slot="reference" size="mini"
                  >平台组件<i class="el-icon-plus el-icon--right"></i
                ></el-button>
              </el-popover>
            </div>
            <div class="el-button">
              <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
              >
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
export default {
  name: 'pluginList'
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
}
</style>
