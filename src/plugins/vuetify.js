import Vue from 'vue'
// vuetify-loader自动导入用到的组件，无法识别的手动导入
import Vuetify, { VList } from 'vuetify/lib'
// 颜色主题
import theme from './theme'
// vuetify组件样式
import 'vuetify/src/stylus/app.styl'
// mdi图标字体的样式文件
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi', // 图标
  theme, // 颜色主题
  components: { // 手动导入组件
    VList
  }
})
