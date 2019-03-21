/**
 * websocket.js
 * 与websocket相关的方法都会在这里, 由vuex托管，可以给各个组件调用。
 */

import { set } from '@/utils/vuex'
import WEB from '@/utils/web-enum'
import webMethods from '@/utils/web-method'
import keyMethods from '@/utils/key-method'
import config from '@/config'

const state = {
  websocket: null, // websocket对象
  online: false, // 是否在线
  password: '', // 密码，用于异常断开时可以自动重连
  count: 0, // 计算断开后尝试连接的次数
  dialog: true // 登陆界面的显示由该变量控制
}

const mutations = {
  setWebSocket: set('websocket'),
  setPassword: set('password'),
  setDialog: set('dialog'),
  sendToServer: (state, msg) => { // msg 为 json数据
    state.websocket.send(JSON.stringify(msg))
  }
}

const actions = {
  initWebSocket ({ commit, dispatch, rootState }, passwd) {
    // 创建websocket连接
    commit('setWebSocket', new WebSocket('ws://' + config.websocket.ip + config.websocket.port, passwd))
    state.websocket.onopen = function () { // 在打开时
      state.online = true
      state.dialog = false
      state.count = 0
      state.password = passwd
      // 接收全部数据
      let getAll = { method: WEB.method.get, type: WEB.type.all, data: {} }
      state.websocket.send(JSON.stringify(getAll))
    }
    state.websocket.onclose = function () {
      state.count++
      state.online = false
      // 如果有密码 重连
      if (state.count < 10 && state.password !== '') { 
        dispatch('initWebSocket', state.password)
      } else {
        state.password = ''
        state.dialog = true
      }
    }
    state.websocket.onmessage = function (event) {
      let obj = JSON.parse(event.data)
      switch (obj.type) {
        case 'dev': webMethods.updateList(rootState.devlist, obj.data); break
        case 'todo': webMethods.updateList(rootState.todolist, obj.data); break
        case 'set': webMethods.updateList(rootState.setlist, obj.data); break
        case 'room':
          webMethods.updateList(rootState.roomlist, obj.data)
          var devIdList = obj.data.devlist
          rootState.devlist.forEach(dev => {
            if (dev.roomid === obj.data.id) dev.roomid = -1
            for (var i = 0, len = devIdList.length; i < len; i++) {
              if (dev.id === devIdList[i]) dev.roomid = obj.data.id
            }
          })
          break
        case 'all':
          rootState.devlist = obj.data.devlist
          rootState.roomlist = obj.data.roomlist
          rootState.roomlist.unshift({ id: -1, name: 'all' })
          break
      }
    }
  },
  changeKeyValue ({ commit }, { dev, keyname, value }) { // 改变dev的key之后将数据发送给服务器
    var key = keyMethods.getKey(dev.keylist, keyname)
    if (key === undefined) return
    commit('sendToServer', webMethods.packageMsg(WEB.method.set, WEB.type.dev, {
      id: dev.id,
      who: 'key',
      what: {
        name: key.name,
        value: value
      }
    }))
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
