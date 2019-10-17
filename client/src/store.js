import Vue from 'vue'
import Vuex from 'vuex'
import { findIndex } from 'lodash'
import randomString from 'random-string'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPlugins: [],
    dragareaVisible: false
  },
  mutations: {
    addSelectedPlugins(state, plugin) {
      const { enName, cnName, w, h, x, y, i, focus = false } = plugin
      state.selectedPlugins.push({
        enName,
        cnName,
        w,
        h,
        x,
        y,
        i,
        focus
      })
    },
    removeSelectedPlugin(state, i) {
      const index = findIndex(state.selectedPlugins, { i })
      state.selectedPlugins.splice(index, 1)
    },
    modifySelectedPlugins(state, plugin) {
      const index = findIndex(state.selectedPlugins, { i: plugin.i })
      if (index > -1) {
        state.selectedPlugins.splice(index, 1, plugin)
      }
    },
    focusSelectedPlugin(state, i) {
      state.selectedPlugins.forEach(item => {
        if (item.i === i) {
          item.focus = true
        } else {
          item.focus = false
        }
      })
    },
    setDragareaVisible(state, boolean) {
      state.dragareaVisible = boolean
    }
  },
  actions: {}
})
