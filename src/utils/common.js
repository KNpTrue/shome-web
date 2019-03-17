export default {
  getItemById: (list, id) => list.find(item => item.id === id),
  getRoomNameById: (list, id, noset) => {
    var item = list.find(item => item.id === id)
    return item === undefined ? noset : item.name
  }
}
