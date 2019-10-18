<template>
  <div style="width: 100%; overflow: hidden;">
    <div class="layoutBox">
      <div
        v-show="dragareaVisible"
        class="layoutBox-dragarea"
        @dragenter="dragenter"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      ></div>
      <div class="layoutBox-edit">
        <grid-layout
          ref="gridLayout"
          :layout.sync="layout"
          :col-num="1000 / colWidth"
          :row-height="colHeight"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :margin="[0, 0]"
          :autoSize="true"
          :use-css-transforms="true"
        >
          <grid-item
            v-for="item in layout"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
          >
            <div
              class="layoutBox-item"
              :class="{ 's-selected': item.focus }"
              @click="clickEvent(item)"
            >
              {{ item.cnName }}
            </div>
          </grid-item>
        </grid-layout>
      </div>
      <div class="layoutBox-background"></div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import { mapState, mapMutations } from 'vuex'
import { find } from 'lodash'
import randomString from 'random-string'
import eventBus from '@/helper/eventBus'
export default {
  name: 'layoutBox',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      layout: [],
      colWidth: 125,
      colHeight: 50,
      currentPlugin: null,
      dragareaVisible: false
    }
  },
  computed: {
    ...mapState(['selectedPlugins'])
  },
  watch: {
    selectedPlugins: {
      handler: function(val) {
        console.log(val)
        // 添加或修改
        if (val.length >= this.layout.length) {
          this.layout = val
          // 删除
        } else {
          let deleteIndex = null
          for (let i = 0, len = this.layout.length; i < len; i++) {
            if (!find(val, { id: this.layout[i].i })) {
              deleteIndex = i
              break
            }
          }
          if (deleteIndex !== null) {
            this.layout.splice(deleteIndex, 1)
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.layout = this.selectedPlugins
    eventBus.$on('dragstart', this.dragstart)
    eventBus.$on('dragend', this.dragend)
  },
  methods: {
    dragstart(plugin) {
      this.dragareaVisible = true
      this.currentPlugin = this.formatPlugin(plugin)
    },
    dragend() {
      this.dragareaVisible = false
      this.currentPlugin = null
    },
    dragenter() {
      this.addSelectedPlugins(this.currentPlugin)
    },
    dragover(event) {
      event.preventDefault()
      this.$refs.gridLayout.dragEvent(
        'dragmove',
        this.currentPlugin.i,
        Math.floor(event.offsetX / this.colWidth),
        Math.floor(event.offsetY / this.colHeight),
        this.currentPlugin.h,
        this.currentPlugin.w
      )
    },
    dragleave() {
      this.removeSelectedPlugin(this.currentPlugin.i)
    },
    drop(event) {
      this.$refs.gridLayout.dragEvent(
        'dragend',
        this.currentPlugin.i,
        Math.floor(event.offsetX / this.colWidth),
        Math.floor(event.offsetY / this.colHeight),
        this.currentPlugin.h,
        this.currentPlugin.w
      )
      // this.$refs.gridLayout.layoutUpdate()
      this.focusSelectedPlugin(this.currentPlugin.i)
    },
    formatPlugin(plugin) {
      const {
        enName,
        cnName,
        width,
        height,
        x = 0,
        y = 0,
        i = randomString({ length: 10 }),
        focus = false
      } = plugin
      return {
        enName,
        cnName,
        w: Math.ceil(+width / this.colWidth),
        h: Math.ceil(+height / this.colHeight),
        x: Math.floor(+x / this.colWidth),
        y: Math.floor(+y / this.colHeight),
        i,
        focus
      }
    },
    clickEvent(item) {
      const { i: id } = item
      this.focusSelectedPlugin(id)
    },
    ...mapMutations([
      'focusSelectedPlugin',
      'removeSelectedPlugin',
      'addSelectedPlugins'
    ])
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base.scss';
.layoutBox {
  position: relative;
  width: 100%;
  overflow-x: auto;
  &-dragarea {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &-edit {
    position: relative;
    z-index: 1;
    width: 1000px;
    min-height: 600px;
  }
  &-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 1000px;
    height: 100%;
    background-color: rgba(#dcdfe6, 0.5);
    background-image: -webkit-linear-gradient(top, transparent 48px, #fff 50px),
      -webkit-linear-gradient(left, transparent 123px, #fff 125px);
    background-size: 125px 50px;
  }
  &-item {
    width: 100%;
    height: 100%;
    &.s-selected {
      border: 1px solid yellow;
    }
  }
}
</style>
<style lang="scss">
@import '~@/assets/styles/base.scss';
.vue-grid-item {
  background: #fff;
  border: 1px solid $color-layout-border;
}
</style>
