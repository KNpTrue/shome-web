//websocket.js
import {set} from '@/utils/vuex'
const state = {
  websocket: null,
  online: false
}

const mutations = {
  setWebSocket: set('websocket')
}

const actions = {
  initWebSocket ({commit}, passwd) {
    commit('setWebSocket', new WebSocket("ws://192.168.1.108:8001", passwd));
    state.websocket.onopen = function () {
      state.online = true;
    };
    state.websocket.onclose = function () {
      state.online = false;
    };
  }
}

const getters = {
  getWebSocket: () => state.websocket
}

export default {
  state,
  mutations,
  actions,
  getters
}