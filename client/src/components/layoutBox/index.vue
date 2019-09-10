<template>
  <div style="width: 100%; overflow: hidden;">
    <el-button @click="add">ADD</el-button>
    <div class="layoutBox">
      <div class="layoutBox-edit">
        <grid-layout
          :layout.sync="layout"
          :col-num="8"
          :row-height="50"
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
            {{ item.i }}
          </grid-item>
        </grid-layout>
      </div>
      <div class="layoutBox-background"></div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
var testLayout = [{ x: 0, y: 0, w: 1, h: 1, i: '0' }]
export default {
  name: 'layoutBox',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      layout: testLayout
    }
  },
  methods: {
    add() {
      let maxY = 0
      this.layout.forEach(item => {
        if (item.y + item.h > maxY) {
          maxY = item.y + item.h
        }
      })
      this.layout.push({
        x: 0,
        y: maxY,
        w: 4,
        h: 2,
        i: this.layout.length + ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/base.scss';
.layoutBox {
  position: relative;
  width: 100%;
  overflow-x: auto;
  &-edit {
    position: relative;
    z-index: 1;
    width: 1000px;
    min-height: 300px;
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
}
</style>
<style lang="scss">
@import '~@/assets/styles/base.scss';
.vue-grid-item {
  background: #fff;
  border: 1px solid $color-layout-border;
}
</style>
