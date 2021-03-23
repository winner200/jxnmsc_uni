// pages/operate/inspect/inspect.js
const urlUtil = require("network/url_util.js");
const httpRequest = require("network/httpPromise.js");
const dateTime = require('utils/util.js')
const uploadFile = require('utils/upload-file.js')
const globalData = require('config/global_config.js').globalData

import Cinspect from '../../../../content-comps/Cinspect/Cinspect.vue'
export default {
  name: 'inspect',
  data() {
    return {
      bazaarList: [], //农贸市场列表
      merchantList: [], //市场商家列表
      bazaarIndex:0,
      reportImg: '', //图片本地路径
      currentTime: '', //当前时间
      logisticianID: '', // 批发市场ID
      factoryID: '', //农场ID
      selectOneseif: 1 // 1.批发市场 2.农贸市场
    }
  },
  components: {
    Cinspect
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('page1 show')
    console.log('当前时间', dateTime.formatTime(new Date(),':'))
    this.currentTime = dateTime.formatTime(new Date(),':')
    this.readSuperviseID() //获取监督单位ID && 农场ID
  },
  methods: {
    // picker选择器
    bindPickerChange() {
      console.log('选择抽检市场', e.detail.value)
      this.bazaarIndex = e.detail.value
    },
    /**
     * 获取抽检巡检人员可检查的市场的ID
     */
    readSuperviseID(){
      let url = urlUtil.getFactorysByProductID
      let data = {
        LoginKey: globalData.loginKey,
        AppType: globalData.appType,
        SystemID: globalData.systemID,
        OperatorID : uni.getStorageSync('operatorID')
      }
      httpRequest.post(url, data).then(res=> {
        console.log('监督单位 - 自检 - 获取登陆检查角色成功', res)
        this.logisticianID = res.data.Data.Product.LogisticianIDs,
        this.factoryID = res.data.Data.Product.FactoryIDs
        //获取市场下的商家信息
        this.readBazaarList()
      }).catch(err=> {
        console.log('内部自检 -- 获取登陆检查角色失败', err)
      })
    },
    /**
     * 获取抽检市场
     *
     */
    readBazaarList() {
      let url = urlUtil.getFactoryList
      let data = {
        LoginKey: globalData.loginKey,
        AppType: globalData.appType,
        SystemID: globalData.systemID,
      }
      console.log('wdebug1442', this.selectOneseif)
      // 判断是选择的批发市场还是农贸市场
      switch(this.selectOneseif) {
        case 1: // 批发市场
          data.XXIDS = this.logisticianID,
          data.Type = 1
        break;
        case 2: // 农贸市场
          data.XXIDS = this.factoryID,
          data.Type = 2
        break;
      }
      httpRequest.post(url, data).then(res=> {
        // console.log('农贸市场参数', JSON.stringify(data))
        console.log('获取监督单位 - 日检 - 抽检市场', res)
        this.bazaarList = res.data.FactoryList
        console.log('wdebug农场市场列表', this.bazaarList)
      }).catch(err=> {
        console.log('获取农场失败', err)
      })
    },
      /**
     * 获取市场商家
     *
     */
    readBazaarMerchantList(factoryID) {
      let url = urlUtil.getOutletsListByFactoryID
      let data = {
        LoginKey: globalData.loginKey,
        AppType: globalData.appType,
        SystemID: globalData.systemID,
        FactoryID : factoryID
      }
        // 判断是选择的批发市场还是农贸市场
        switch(this.selectOneseif) {
        case 1: // 批发市场
          data.Type = 1
        break;
        case 2: // 农贸市场
          data.Type = 2
        break;
      }
      httpRequest.post(url, data).then(res=> {
        // console.log('获取市场商家', JSON.stringify(data))
        console.log('获取监督单位 - 日检 - 市场商家', res)
        this.merchantList = res.data.outletsList
        console.log('wdebug市场商家列表', this.merchantList)
      }).catch(err=> {
        console.log('获取场商家列表', err)
      })
    },
    /**
     * 获取市场类型
     */
    radioChange(e) {
      console.log('获取监督单位 - 日检 - 市场类型', e)
      let selectOneseif = e.detail.selectOneseif
      this.selectOneseif = selectOneseif
      this.readBazaarList() //选择市场类型，根据市场类型获取不同的市场。
    },
    /**
     * 获取市场商家 <winner 2020-12-21>
     */
    selectBazaar(e) {
      console.log('监督单位 - 日检 - 选择抽检市场', e)
      this.readBazaarMerchantList(e.detail.factoryID)
    },
    /**
     * 保存抽检信息
     */
    sumitSave(event) {
      console.log('winner保存抽检',event);
      let url = urlUtil.setExternalCheckInspect
      let data = event.detail
      data.Type = 2,
      data.FactoryType = this.selectOneseif //检查的市场类型 1.批发市场 2农贸市场
      data.OperatorID = uni.getStorageSync('operatorID')
      data.ProductID = 2
      httpRequest.post(url, data).then(res=> {
        console.log('添加成功', res)
        //上传图片到服务器
        if(this.reportImg){
          let BigProductsID = res.data.Data.BigProductsID
          uploadFile.uploadFileServer(urlUtil.uploadSignContent, this.reportImg[0], this.reportImg[0] + BigProductsID, BigProductsID, 1)
        }
        // uni.redirectTo({
        //   url: '/pages/bazaar-rijian/pages/index/index'
        // })
        uni.navigateBack({
          detail: 1
        })
      }).catch(error=> {
        console.log('外部抽检失败',error)
      })
    },
    /**
     * 上传文件<winner443@163.com>
     */
    uploadFileImg(e) {
      console.log('上传文件',e)
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log('选中了',res,'====',res.tempFilePaths)
          //取出路径
          const path = res.tempFilePaths;
          const tempFilePaths = [];
          for(let i = 0;i<path.length;i++){
              console.log('我是i',path[i])
              tempFilePaths.push(path[i])
          };
          this.reportImg = tempFilePaths
        }
      })
    }
  }
}
