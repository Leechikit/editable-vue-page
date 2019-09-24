import Vue from 'vue'
import Vuex from 'vuex'
import { findIndex } from 'lodash'

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
        id: state.selectedPlugins.length,
        focus
      })
    },
    removeSelectedPlugins(state, id) {
      const index = findIndex(state.selectedPlugins, { id })
      state.selectedPlugins.splice(index, 1)
    },
    modifySelectedPlugins(state, val) {
      const index = findIndex(state.selectedPlugins, { id: val.id })
      if (index > -1) {
        state.selectedPlugins.splice(index, 1, val)
      }
    }
  },
  actions: {}
})
