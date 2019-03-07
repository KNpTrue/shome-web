//websocket.js
import {set} from '@/utils/vuex'

const state = {
  websocket: null,
  online: false,
  password: '',
  count: 0 //计算断开后尝试连接的次数
}

const mutations = {
  setWebSocket: set('websocket'),
  setPassword: set('password')
}

const actions = {
  initWebSocket ({commit, dispatch, rootState}, passwd) {
    commit('setWebSocket', new WebSocket("ws://192.168.1.107:8001", passwd));
    state.websocket.onopen = function () { //在打开时
      state.online = true;
      state.count = 0;
      state.websocket.send('get all');
    };
    state.websocket.onclose = function () {
      state.count++;
      state.online = false;
      if(state.count < 10 && state.password != '') { //如果有密码 重连
        dispatch('initWebSocket', state.password);
      }
    };
    state.websocket.onmessage = function (event) {
        let obj = JSON.parse(event.data);
        console.log(obj);
        console.log(rootState.devlist);
        rootState.devlist = [];
        rootState.devlist = obj.data.devlist;
        //
    }
  }
}

const getters = {
  getWebSocket: state => state.websocket,
  getOnline: state => state.online
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}