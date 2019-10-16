import Vue from 'vue'
import Vuex from 'vuex'
import { findIndex } from 'lodash'
import randomString from 'random-string'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPlugins: []
  },
  mutations: {
    addSelectedPlugins(state, val) {
      const { enName, cnName, width, height, focus = false } = val
      state.selectedPlugins.push({
        enName,
        cnName,
        w: Math.ceil(width / 125),
        h: Math.ceil(height / 50),
        id: randomString({ length: 10 }),
        focus
      })
    },
    addSelectedPlugins2(state, val) {
      const { enName, cnName, x, y, w, h, i, focus = false } = val
      state.selectedPlugins.push({
        enName,
        cnName,
        x,
        y,
        w,
        h,
        id: i || randomString({ length: 10 }),
        focus
      })
    },
    removeSelectedPlugin(state, id) {
      const index = findIndex(state.selectedPlugins, { id })
      state.selectedPlugins.splice(index, 1)
    },
    modifySelectedPlugins(state, val) {
      const index = findIndex(state.selectedPlugins, { id: val.id })
      if (index > -1) {
        state.selectedPlugins.splice(index, 1, val)
      }
    },
    focusSelectedPlugin(state, id) {
      state.selectedPlugins.forEach(item => {
        if (item.id === id) {
          item.focus = true
        } else {
          item.focus = false
        }
      })
    }
  },
  actions: {}
})
