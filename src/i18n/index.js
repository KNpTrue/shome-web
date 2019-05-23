import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  zh: require('./zh.json'),
  en: require('./en.json')
}

const i18n = new VueI18n({
  fallbackLocale: 'en',
  messages
})

// 从localStorage读取语言
if (window.localStorage) {
  if (localStorage.language === undefined) {
    localStorage.language = i18n.fallbackLocale
  }
  i18n.locale = localStorage.language
} else {
  i18n.locale = i18n.fallbackLocale
}

export default i18n
