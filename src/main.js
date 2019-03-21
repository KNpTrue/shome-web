/**
 * main.js
 * 项目的入口文件，这里将整合所有的外部的vue组件以及插件， 样式文件，以及App组件
 */
import Vue from 'vue'
// 导入vuetify, 这是一款基于material design的vue组件库
import './plugins/vuetify'
// 导入自定义主题的css文件，注意导入顺序
import '@/styles/index.scss'
// 导入自定义组件
import './components'

import App from './App.vue'
// 导入vue-router 用于跳转路由，实现单页web应用
import router from '@/router'
// 导入vue-i18n 用于实现国际化
import i18n from '@/i18n'
// 导入vuex 用于全局的状态管理，便于各个组件调用
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
