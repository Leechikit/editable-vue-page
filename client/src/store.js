import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPlugins: []
  },
  mutations: {
    setSelectedPlugins(state, val) {
      const { enName, cnName, width, height } = val
      state.selectedPlugins.push({
        enName,
        cnName,
        w: Math.ceil(width / 125),
        h: Math.ceil(height / 50),
        id: state.selectedPlugins.length
      })
    },
    removeSelectedPlugins(state, index) {
      state.selectedPlugins.splice(index, 1)
    }
  },
  actions: {}
})
