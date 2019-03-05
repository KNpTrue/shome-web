/** 
 * key.js
 * 放置处理key的方法
*/
//根据name查找Key
const getKey = (keylist, name) => keylist.find(item => item.name == name); 

const getKeyValue = function (key) { //获取KeyValue
  if (key.type == 'bool')
    return key.value ? 'open' : 'close';
  else if (key.type == 'number')
    return key.value;
  else if (key.type == 'range') {
    return key.value.split('/', 1)[0];
  }
}

export default {
  getKeyValue, 
  getKey
}