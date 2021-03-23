// 腾讯地图subKey
//const subKey = "HCNBZ-VTQKW-2LGRP-ODP6G-4YPGV-HEFTJ"
// 服务器资源信息
//const imgURL ="https://sdyzs.shidongvr.com/sdyzsdistfile/"
// 服务器域名
const apiUrl = "https://www.shiyoutong.cn/sznmpi/"
// 地图默认信息
// 纬度
const latitude = 39.928818
// 经度
const longitude = 116.184142
// 该经纬度对应默认位置
const markerName = '通景大厦'

//图片地址路径
const imageUrl = 'https://www.shiyoutong.cn/sznmdistfile/'

// 公共参数
const globalData = {
  userInfo: null,
  reportPatch: '', //图片路径
  //调用接口公共参数
  loginKey: 1,
  appType: '2',
  systemID: 2
  }

module.exports = {
  //subKey: subKey,
  apiUrl: apiUrl,
  //imgURL: imgURL,
  latitude: latitude,
  longitude: longitude,
  markerName: markerName,
  imageUrl: imageUrl,
  globalData: globalData
}
