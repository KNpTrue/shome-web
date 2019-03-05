export default {
  drawer: null,
  color: 'success',
  image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
  devlist: [ //设备列表
    { name: '智能灯', id: 'aawdadwd', online: true, type: 'light', room: '客厅', keylist: [{ name: 'isOpen', type: 'bool', mode: 'rw', value: true, unit: ''},{ name: 'bright', type: 'range', mode: 'rw', value: '80/0/100', unit: '%'}]},
    { name: '智能开关', id: 'awdascaw', online: true, type: 'switch', room: '客厅', keylist: [{ name: 'isOpen', type: 'bool', mode:'rw', value: true, unit: ''}]},
    { name: '空调', id: 'scowndow', online: true, type: 'air-con', room: '主房', keylist: [{ name: 'isOpen', type: 'bool', mode:'rw', value: false, unit: ''}]},
    { name: '智能灯', id: 'axzoenfis', online: true, type: 'light', room: '客房', keylist: [{ name: 'isOpen', type: 'bool', mode:'rw', value: true, unit: ''}]},
    { name: '温湿度传感器', id: 'axsewnfis', online: true, type: 'templ', room: '饭厅', keylist: [{ name: 'templ', type: 'number', mode:'r', value: '26', unit: '℃'}]},
  ],
  selroom: 'all', //被选中的房间
  roomlist: [ //房间列表
    {name: 'all'},
    {name: '客厅', devIdList: ['awdascaw', 'awdascaw']},
    {name: '主房', devIdList: ['scowndow']},
    {name: '客房', devIdList: ['axzoenfis']},
    {name: '饭厅', devIdList: ['axsewnfis']},
  ],
}