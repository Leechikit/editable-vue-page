import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rightAsideVisible: false
  },
  mutations: {
    setRightAsideVisible(state, val) {
      state.rightAsideVisible = val
    }
  },
  actions: {}
})
