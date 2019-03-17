import Vue from 'vue'
import Vuetify, { VList } from 'vuetify/lib'
import theme from './theme'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme,
  components: {
    VList
  }
})
