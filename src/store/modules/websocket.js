//websocket.js
import {set} from '@/utils/vuex'
import WEB from '@/utils/web-enum'
import webMethods from '@/utils/web-method'
import keyMethods from '@/utils/key-method'

const state = {
  websocket: null,
  online: false,
  password: '',
  count: 0, //计算断开后尝试连接的次数
  dialog: true
}

const mutations = {
  setWebSocket: set('websocket'),
  setPassword: set('password'),
  setDialog: set('dialog'),
  sendToServer: (state, msg) => {
    state.websocket.send(JSON.stringify(msg));
  }
}

const actions = {
  initWebSocket ({commit, dispatch, rootState}, passwd) {
    commit('setWebSocket', new WebSocket("ws://192.168.1.103:8001", passwd));
    state.websocket.onopen = function () { //在打开时
      state.online = true;
      state.dialog = false;
      state.count = 0;
      state.password = passwd;
      //接收全部数据
      //commit('sendToServer', WEB.method.get, WEB.type.all);
      let getAll = {method: WEB.method.get, type: WEB.type.all, data: {}};
      state.websocket.send(JSON.stringify(getAll));
    };
    state.websocket.onclose = function () {
      state.count++;
      state.online = false;
      if(state.count < 10 && state.password != '') { //如果有密码 重连
        dispatch('initWebSocket', state.password);
      } else {
        state.password = '';
        state.dialog = true;
      }
    };
    state.websocket.onmessage = function (event) {
        let obj = JSON.parse(event.data);
        //console.log(obj);
        switch(obj.type) {
          case 'dev': webMethods.updateList(rootState.devlist, obj.data);  break;
          case 'todo':  webMethods.updateList(rootState.todolist, obj.data); break;
          case 'set': webMethods.updateList(rootState.setlist, obj.data);  break;
          case 'room':  webMethods.updateList(rootState.roomlist, obj.data); break;
          case 'all':
            rootState.devlist = obj.data.devlist;
            rootState.roomlist = obj.data.roomlist;
            rootState.roomlist.unshift({name: 'all'});
            break;
        }
    }
  },
  changeKeyValue({commit}, {dev, keyname, value}) {
    var key = keyMethods.getKey(dev.keylist, keyname);
    if(key == undefined)  return;
    commit('sendToServer',webMethods.packageMsg(WEB.method.set, WEB.type.dev, {
      id: dev.id,
      who: 'key',
      what: {
        name: key.name,
        value: value
      }
    }));
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