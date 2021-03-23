/*
微信支付工具   https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5
小程序支付逻辑
1、向后台服务器发起支付请求
2、商户在小程序中先调用该接口在微信支付服务后台生成预支付交易单，返回正确的预支付交易后调起支付。 
https://api.mch.weixin.qq.com/pay/unifiedorder
3、小程序调起支付API
*/

const urlUtil = require("../servers/url_util.js")

/**
 * 发起支付请求，获取预支付交易单
 * @param  {[type]} money [实际付款价格:如125.25（元）]
 * @return {[type]}       [description]
 */
function requestPay(orderID,money){
  wx.request({
    // 必需
    url: urlUtil.requestPay,
    data: {
      OpenID: getApp().globalData.openid,
      // 支付金额：单位元
      PayMoney: money,
      MemberID: getApp().globalData.memberID,
      OrderID: orderID,
      AppType: 1,
      PayMethod:0,
      SystemID: getApp().globalData.SystemID,
      LoginKey:9527
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      // 成功获取到预支付交易单
      // debugger
      if(res.data.Result){
        let data = (res.data.Data.OrderString.replace(/\"/g,''))
        data = data.replace('{','').replace('}','').split(',')
        getApp().globalData.orderID = res.data.Data.PayOrderID
        // 整理的待传送数据
        let postData = {}
        for(let index in data){
          if(data[index].indexOf("nonceStr") != -1){
            postData.nonceStr = data[index].replace('}','').split(':')[1]
            postData.nonceStr = postData.nonceStr
          }else if(data[index].indexOf("package") != -1){
            postData.package = data[index].split(':')[1]
          }else if(data[index].indexOf("timeStamp") != -1){
            postData.timeStamp = data[index].split(':')[1]
          }else if(data[index].indexOf("signType") != -1){
            postData.signType = data[index].split(':')[1]
          }else if(data[index].indexOf("paySign") != -1){
            postData.paySign = data[index].split(':')[1]
          }
        }
        // 调起微信支付
        confirmPay(postData)
      }else{
        console.log("失败获取到预支付交易单",res)
      }
    },
    fail: (res) => {
      // 请求失败，请再次重试
      wx.showToast({
        title: '请求失败，请重新再试！',
        icon: 'none', // "success", "loading", "none"
        duration: 1500,
        mask: false
      })
    }
  })
}

/**
 * 小程序调起支付API支付
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function confirmPay(data){
  wx.requestPayment({
    // timeStamp: now(),  //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
    timeStamp: data.timeStamp,  //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
    nonceStr: data.nonceStr,   //微信返回随机字符串，长度为32个字符以下
    package: data.package,    //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
    signType: data.signType,            //支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
    // paySign = MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id
    // =wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6
    paySign: data.paySign,                //签名，方法到此地址https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_3
    success: (res) => {
      console.log("支付成功!20200724",res)
    },
    fail: (res) => {
      console.log("支付失败!",res)
    }
  })
}
 /**
 * 发起支付请求，获取预支付交易单
 * @param  {[type]} money [实际付款价格:如125.25（元）]
 * @return {[type]}       [返回调用微信支付所需的参数]
 */
function getPrepayData(self,money){
  // 待传送到调用微信支付的数据
  let postData = {}
  wx.request({
    // 必需
    url: urlUtil.reservationWithSystemID,
    data: {
      // OpenID: getApp().globalData.openID,  oEQl95SowJ0i8Hhpx6oV_lre9_Wo
      OpenID: 'oEQl95SowJ0i8Hhpx6oV_lre9_Wo', 
      // 支付金额：单位元
      PayMoney: money,
      MemberID: '22',
      OrderID: new Date().getTime(),
      AppType: 1,
      PayMethod: 0,
      SystemID: getApp().globalData.systemID,
      LoginKey: 9527
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      console.log('0811支付',res)
      // 成功获取到预支付交易单
      if(res.data.Result=="true"){
        getApp().globalData.orderID = res.data.Data.PayOrderID
        let data = (res.data.Data.OrderString.replace(/\"/g,''))
        data = data.replace('{','').replace('}','').split(',')
        
        // 整理待传送到调用微信支付的数据
        for(let index in data){
          if(data[index].indexOf("nonceStr") != -1){
            postData.nonceStr = data[index].replace('}','').split(':')[1]
            postData.nonceStr = postData.nonceStr
          }else if(data[index].indexOf("package") != -1){
            postData.package = data[index].split(':')[1]
          }else if(data[index].indexOf("timeStamp") != -1){
            postData.timeStamp = data[index].split(':')[1]
          }else if(data[index].indexOf("signType") != -1){
            postData.signType = data[index].split(':')[1]
          }else if(data[index].indexOf("paySign") != -1){
            postData.paySign = data[index].split(':')[1]
          } 
        }
        console.log('winner我在这')
        self.executeWXPay(postData)
      }else{
        console.log("失败获取到预支付交易单",res)
        self.executeWXPay(postData)
      }
    },
    fail: (res) => {
      // 请求失败，请再次重试
      console.log("请求预支付订单号失败，请再次重试")
      self.executeWXPay(postData)
    }
  })
}
function manager(self, money, OutTradeNo,OrderID) {
  // 待传送到调用微信支付的数据
  let postData = {}
  wx.request({
    // 必需
    url: urlUtil.getPayConfigPurchaseOrder,
    data: {
      OpenID:getApp().globalData.openId,
      AppType: 3,//1小程序 2APP 0公众号
      SystemID: getApp().globalData.SystemID,
      LoginKey: 9527,
      MemberID: wx.getStorageSync('UserID'),
      OrderID: OrderID,//订单编号，提交订单后获得
      OutTradeNo: OutTradeNo,//商户系统订单号，唯一，提交订单后获得
      OrderType: 1,//订单类型：1普通订单支付
      TotalAmount: money
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      // 成功获取到预支付交易单
      // debugger
      console.log('resres',res)
      if (res.data.Result=="true") {
        // getApp().globalData.orderID = res.data.Data.PayOrderID
        let data = res.data.Data.WXPayConfig
        // data = data.replace('{', '').replace('}', '').split(',')
        postData.nonceStr = data.nonceStr
        postData.package = data.package
        postData.timeStamp = data.timeStamp
        postData.signType = data.signType
        postData.paySign = data.paySign
        self.executeWXPay(postData)
      } else {
        console.log("失败获取到预支付交易单", res)
        self.executeWXPay(postData)
      }
    },
    fail: (res) => {
      // 请求失败，请再次重试
      console.log("请求预支付订单号失败，请再次重试",res)
      self.executeWXPay(postData)
    }
  })
}
module.exports = {
  excutePay : requestPay,
  getPrepayData: getPrepayData,
  manager:manager
}