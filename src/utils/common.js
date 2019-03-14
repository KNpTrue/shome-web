export default {
  getNameById: (list, id) => list.find(item => item.id == id).name
}