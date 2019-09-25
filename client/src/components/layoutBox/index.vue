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
    selectedPlugins: {
      handler: function(val) {
        console.log(val)
        // 添加或修改
        if (val.length >= this.layout.length) {
          val.forEach((item, index) => {
            if (!find(this.layout, { i: item.id })) {
              this.layout.push(this.setLayoutParams({ ...item, i: item.id }))
            } else {
              this.layout[index].focus = item.focus
            }
          })
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
    this.layout = this.selectedPlugins.map(item => {
      return this.setLayoutParams({ ...item, i: item.id })
    })
  },
  methods: {
    setLayoutParams({
      x = 0,
      y = this.maxY,
      w = 4,
      h = 2,
      i,
      enName,
      cnName,
      focus
    }) {
      let result = {
        x,
        y,
        w,
        h,
        i,
        enName,
        cnName,
        focus
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
    },
    clickEvent(item) {
      const { i: id } = item
      this.focusSelectedPlugin(id)
    },
    ...mapMutations(['focusSelectedPlugin'])
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
