import DEV from './dev-enum'
const devIconColorList = [ //根据类型来确定icon
  {type: DEV.light, icon: 'mdi-lightbulb-on-outline', color: 'success'},
  {type: DEV.switch, icon: 'mdi-switch', color: 'warning'},
  {type: DEV.air_con, icon: 'mdi-air-conditioner', color: 'blue'},
  {type: DEV.templ, icon: 'mdi-thermometer', color: 'info'},
  {type: DEV.camera, icon: 'mdi-camera', color: 'purple'},
];

const getIconColorItem = (type) => {
  return devIconColorList.find(item => item.type == type);
};
export {
  getIconColorItem,
  DEV,
}