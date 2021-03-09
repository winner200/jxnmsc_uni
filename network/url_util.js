const server = require('config/global_config').apiUrl

//抽查 巡查
const parkPatrolCheck = server + "pi.Manager.parkPatrolCheck.hf"

//录入外部检查记录
const setExternalCheckInspect = server + "pi.User.setExternalCheckInspect.hf"

//注册
const UserLogon = server + "pi.User.UserLogon.hf"

// 上传文件
const uploadSignContent = server + "pi.Manager.uploadSignContent.hf"

//获取验证码
const getUserSMSVerifyCode = server + "pi.User.getUserSMSVerifyCode.hf"

//获取批发市场
const getFactoryList = server + "pi.User.getFactoryList.hf"

//获取市场商家
const getOutletsListByFactoryID = server + "pi.User.getOutletsListByFactoryID.hf"

//获取外部内部检查记录（批发市场）
const getCheckInspectLogis = server + "pi.User.getCheckInspectLogis.hf"

//获取农贸市场外部内部记录
const getCheckInspectFactory = server + "pi.User.getCheckInspectFactory.hf"

//登录
const UserLogin = server + "pi.User.UserLogin.hf"

// 根据登陆角色查看检疫记录 -- 获取检疫记录
const findCheckQuarantinereport = server + "pi.User.findCheckQuarantinereport.hf"

//获取抽检/日检
const findCount = server + "pi.User.findCount.hf"

//获取日检检疫记录
const findCheckCount = server + "pi.User.findCheckCount.hf"

//查看验收记录列表
const getQuarantinereportList = server + "pi.User.getQuarantinereportList.hf"

//监督单位-检疫录入
const setQuarantinereport = server + "pi.User.setQuarantinereport.hf"

//获取登陆检查角色信息
const getOperatorRoleInfo = server + "pi.User.getOperatorRoleInfo.hf"

// 录入内部自检记录
const setInsideCheckInspect = server + "pi.User.setInsideCheckInspect.hf"

//获取自己发布入场申报注册记录
const getAdmissionapList = server + "pi.User.getAdmissionapList.hf"

//查看接收到的入场申报注册记录列表 -- 批发商自检入场审核
const getAdmissionapListByLogisticianID = server + "pi.User.getAdmissionapListByLogisticianID.hf"

// 根据登陆ID获取销售订单 -- 批发商
const getOrderListByID = server + "pi.User.getOrderListByID.hf"

//获取所有批发商农贸市场
const findFactoryList = server + "pi.User.findFactoryList.hf"

//根据登陆ID获取采购订单 批发商 -- 采购订单
const getPurchaseOrderListByID = server + "pi.User.getPurchaseOrderListByID.hf"

// 根据商家类别获取供货商列表 批发商 -- 选择生产源
const getOutletsListByOutletsType = server + "pi.User.getOutletsListByOutletsType.hf"

//公用发布预购接口
const setPreOrder = server + "pi.User.setPreOrder.hf"

// 获取自己发布的预购信息
const getReleasePreOrder = server + "pi.User.getReleasePreOrder.hf"

// 检测中心 - 日检 - 待检测记录
const findAdmissionaptList = server + "pi.User.findAdmissionaptList.hf"

// 检测中心 - 日检 - 录入
const insertAdmissionapt = server + "pi.User.insertAdmissionapt.hf"

// 检测中心 - 日检 - 获取待检测记录
const getCheckAdmissionaptList = server + "pi.User.getCheckAdmissionaptList.hf"

// 监督单位 - 日检 - 获取ID
const getFactorysByProductID = server + "pi.User.getFactorysByProductID.hf"

// 批发商 - 入场申报 - 新增
const InsertAdmissionap = server + "pi.User.InsertAdmissionap.hf"

// 批发商 - 屠宰申报 - 新增
const InsertPrediction = server + "pi.User.InsertPrediction.hf"

// 批发商 - 屠宰记录
const getPredictionList = server + "pi.User.getPredictionList.hf"

// 批发商 - 有货接单、无货取消
const updateAcceptPreOrderStatus = server + "pi.User.updateAcceptPreOrderStatus.hf"

// 获取接收的预购订单
const getAcceptPreOrder = server + "pi.User.getAcceptPreOrder.hf"

// 获取接收到的屠宰申报
const getPredictionListByLogisticianID = server + "pi.User.getPredictionListByLogisticianID.hf"

// 屠宰厂 - 验收录入
const inserTquarantinereport = server + "pi.User.inserTquarantinereport.hf"

// 屠宰场小程序- 检疫详情
const getQuarantByProductsID = server + "pi.User.getQuarantByProductsID.hf"

// 批发自检小程序 - 入场注册验收
const insertAdmissionap = server + "pi.User.insertAdmissionap.hf"

// 商家小程序 查看验收详情
const getQuarantinereByOrderID = server + "pi.User.getQuarantinereByOrderID.hf"

// 商家小程序 检疫详情
const getQuarantByOrderID = server + "pi.User.getQuarantByOrderID.hf"

// 屠宰申报 商品列表
const getChargeGoods = server + "pi.User.getChargeGoods.hf"

module.exports = {
  parkPatrolCheck: parkPatrolCheck,
  setExternalCheckInspect: setExternalCheckInspect,
  UserLogon: UserLogon,
  uploadSignContent: uploadSignContent,
  getUserSMSVerifyCode: getUserSMSVerifyCode,
  getFactoryList: getFactoryList,
  getOutletsListByFactoryID: getOutletsListByFactoryID,
  getCheckInspectLogis: getCheckInspectLogis,
  getCheckInspectFactory: getCheckInspectFactory,
  UserLogin: UserLogin,
  findCheckQuarantinereport: findCheckQuarantinereport,
  findCount: findCount,
  findCheckCount: findCheckCount,
  getQuarantinereportList: getQuarantinereportList,
  setQuarantinereport: setQuarantinereport,
  getOperatorRoleInfo: getOperatorRoleInfo,
  setInsideCheckInspect: setInsideCheckInspect,
  getAdmissionapList: getAdmissionapList,
  getAdmissionapListByLogisticianID: getAdmissionapListByLogisticianID,
  findFactoryList: findFactoryList,
  getOrderListByID: getOrderListByID,
  getPurchaseOrderListByID: getPurchaseOrderListByID,
  getOutletsListByOutletsType: getOutletsListByOutletsType,
  setPreOrder: setPreOrder,
  getReleasePreOrder: getReleasePreOrder,
  findAdmissionaptList: findAdmissionaptList,
  insertAdmissionapt: insertAdmissionapt,
  getCheckAdmissionaptList: getCheckAdmissionaptList,
  getFactorysByProductID: getFactorysByProductID,
  InsertAdmissionap: InsertAdmissionap,
  InsertPrediction: InsertPrediction,
  getPredictionList: getPredictionList,
  updateAcceptPreOrderStatus: updateAcceptPreOrderStatus,
  getAcceptPreOrder: getAcceptPreOrder,
  getPredictionListByLogisticianID: getPredictionListByLogisticianID,
  inserTquarantinereport: inserTquarantinereport,
  getQuarantByProductsID: getQuarantByProductsID,
  insertAdmissionap: insertAdmissionap,
  getQuarantinereByOrderID: getQuarantinereByOrderID,
  getQuarantByOrderID: getQuarantByOrderID,
  getChargeGoods:getChargeGoods
}