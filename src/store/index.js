import Vue from 'vue'
import Vuex from 'vuex'

// Store对象的属性方法模块
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import websocket from './modules/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    websocket
  }
})
