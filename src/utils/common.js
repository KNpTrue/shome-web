export default {
  // 通过id找到列表中的元素
  getItemById: (list, id) => list.find(item => item.id === id),
  // 根据id获得房间列表中元素的名字 noset: 找不到名字时返回的字符串
  getRoomNameById: (list, id, noset) => {
    var item = list.find(item => item.id === id)
    return (item === undefined || item.id === -1) ? noset : item.name
  }
}
