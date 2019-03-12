export default {
  updateList: (list, data) => list.splice(list.findIndex(item => item.id == data.id), 1, data),
  packageMsg: (_method, _type, _data) => ({method: _method, type: _type, data: _data}),
}