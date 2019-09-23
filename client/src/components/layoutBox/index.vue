<template>
  <div style="width: 100%; overflow: hidden;">
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
          @layout-updated="layoutUpdatedEvent"
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
            {{ item.cnName }}
          </grid-item>
        </grid-layout>
      </div>
      <div class="layoutBox-background"></div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
import { mapState } from 'vuex'
import { find } from 'lodash'
export default {
  name: 'layoutBox',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      layout: [],
      maxY: 0
    }
  },
  computed: {
    ...mapState(['selectedPlugins'])
  },
  watch: {
    selectedPlugins(val) {
      val.forEach(item => {
        if (!find(this.layout, { i: item.id })) {
          this.layout.push(this.setLayoutParams({ ...item, i: item.id }))
        }
      })
    }
  },
  created() {
    this.layout = this.selectedPlugins.map((item, index) => {
      return this.setLayoutParams({ ...item, i: index })
    })
  },
  methods: {
    setLayoutParams({ x = 0, y = this.maxY, w = 4, h = 2, i, enName, cnName }) {
      let result = {
        x,
        y,
        w,
        h,
        i,
        enName,
        cnName
      }
      this.maxY = y + h
      return result
    },
    layoutUpdatedEvent(newLayout) {
      this.maxY = 0
      newLayout.forEach(item => {
        if (item.y + item.h > this.maxY) {
          this.maxY = item.y + item.h
        }
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
