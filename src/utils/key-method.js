/**
 * key.js
 * 放置处理key的方法
*/
import KEY from './key-enum'
// 根据name查找Key
const getKey = (keylist, name) => keylist.find(item => item.name === name)
// 获取KeyValue
const getKeyValue = function (key) {
  if (key.type === KEY.type.bool) { return key.value ? 'open' : 'close' } else return key.value
}
// 设备是否打开
const isDevOpen = keylist => getKey(keylist, 'isOpen').value
// 设备是否具有开关key
const isDevHaveSwitch = keylist => getKey(keylist, 'isOpen') !== undefined

export default {
  getKeyValue,
  getKey,
  isDevOpen,
  isDevHaveSwitch
}
