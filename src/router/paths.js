// path.js 放置路由的路径

export default [
  {
    path: '/home', // 路由路径
    name: 'home', // 路由名称
    view: 'Home' // 路由跳转的View组件
  },
  {
    path: '/scene',
    name: 'scene',
    view: 'Scene'
  },
  {
    path: '/log',
    name: 'log',
    view: 'Log'
  },
  {
    path: '/settings',
    name: 'settings',
    view: 'Settings'
  },
  {
    path: '/room-edit',
    name: 'room-edit',
    view: 'RoomEdit'
  },
  {
    path: '/dev-detail',
    name: 'dev-detail',
    view: 'DevDetail'
  }
]
