/** 
 * key.js
 * 放置处理key的方法
*/
import KEY from './key-enum'
//根据name查找Key
const getKey = (keylist, name) => keylist.find(item => item.name == name); 
//获取KeyValue
const getKeyValue = function (key) { 
  if (key.type == KEY.type.bool)
    return key.value ? 'open' : 'close';
  else if (key.type == KEY.type.number)
    return key.value;
  else if (key.type == KEY.type.range) {
    return key.value.split('/', 1)[0];
  }
}

const isDevOpen = keylist => getKey(keylist, 'isOpen').value;

const isDevHaveSwitch = keylist => getKey(keylist, 'isOpen') != undefined;

export default {
  getKeyValue, 
  getKey,
  isDevOpen,
  isDevHaveSwitch
}