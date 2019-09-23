import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPlugins: []
  },
  mutations: {
    setSelectedPlugins(state, val) {
      state.selectedPlugins.push({
        ...val,
        id: state.selectedPlugins.length
      })
    },
    removeSelectedPlugins(state, index) {
      state.selectedPlugins.splice(index, 1)
    }
  },
  actions: {}
})
