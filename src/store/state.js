export default {
  drawer: null,
  color: 'success',
  image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
  devlist: [ // 设备列表
    { name: '智能灯', id: 'aawdadwd', online: true, type: 2, roomid: 1, keylist: [{ name: 'isOpen', type: 2, mode: 1, value: true, unit: '' }, { name: 'bright', type: '4', mode: 1, value: '80/0/100', unit: '%' }, { name: 'R', type: '4', mode: 1, value: '80/0/100', unit: '%' }] },
    { name: '智能开关', id: 'awdascaw', online: true, type: 0, roomid: 2, keylist: [{ name: 'isOpen', type: 2, mode: 1, value: true, unit: '' }] },
    { name: '空调', id: 'scowndow', online: true, type: 4, roomid: 3, keylist: [{ name: 'isOpen', type: 2, mode: 1, value: false, unit: '' }] },
    { name: '智能灯', id: 'axzoenfis', online: true, type: 2, roomid: 4, keylist: [{ name: 'isOpen', type: 2, mode: 1, value: true, unit: '' }] },
    { name: '温湿度传感器', id: 'axsewnfis', online: true, type: 3, roomid: 4, keylist: [{ name: 'templ', type: 0, mode: 0, value: '26', unit: '℃' }] }
  ],
  todolist: [],
  setlist: [],
  roomlist: [ // 房间列表
    { id: 1, name: '客厅', devlist: ['awdascaw', 'awdascaw'] },
    { id: 2, name: '主房', devlist: ['scowndow'] },
    { id: 3, name: '客房', devlist: ['axzoenfis'] },
    { id: 4, name: '饭厅', devlist: ['axsewnfis'] }
  ],
  selroom: 'all', // 被选中的房间
  devid: '', // 设备详情的id
  selScene: 'todo' // 场景
}
