export default {
  name: 'Cinspect',
  data() {
    return {
       // 市场商家类型
      radioList: [
        {
          name: 'unit',
          value: '批发市场',
          checked: 'true'
        },
        {
          name: 'oneseif',
          value: '农贸市场'
        },
      ],
      insTodayArray: {}, // 抽检市场列表
      insTodayIndex: 0, // 抽检市场
      insTodayDefault: '--请选择--', // 抽检市场默认值
      insResultArray: ['合格', '不合格'],
      insResultIndex: 0,
      insResultObject: [
        {
          id: 1,
          name: '合格'
        },
         {
          id: 2,
          name: '不合格'
        }
      ],
      insMerchantIndex: 0, // 市场商家
      insMerchantDefault: '请选择', // 市场商家默认值
      insCheckClassArray: [
        {
          id: 1,
          name: '农药残留'
        },
        {
          id: 2,
          name: '兽药残留'
        },
        {
          id: 3,
          name: '瘦肉精'
        },
        {
          id: 4,
          name: '亚硝酸盐'
        }
      ],
      insCheckClassIndex: 0,
      inputUnitName: '', //单位名称
      inputGoods: '', // 商品类型
      factoryID: '', // 市场商家ID
      selectOneseif: '0', // 1.批发市场 2.农贸市场
    }
  },
  props: {
    insUnitName: {
      type: String,
      value: '默认'
    },
    insTodayName: {
      type: String,
      value: '默认'
    },
    bazaarClass: {
      type: String,
      value: ''
    },
    insMerchant: {
      type: String,
      value: '默认'
    },
    insGoods: {
      type: String,
      value: '默认'
    },
    insResult: {
      type: String,
      value: '默认'
    },
    insCheckName: {
      type: String,
      value: '检测员'
    },
    insCheckNamePlc: {
      type: String,
      value: '默认'
    },
    insCheckClass: {
      type: String,
      value: '检测项'
    },
    insGoodsPlaceholder: {
      type: String,
      value: "商品类型"
    },
    reportImg: {
      type: String,
    },
    currentTime: {
      type: String,
    },
    //抽检市场list
    insTodayArray: {
      type: Object,
      observer: function(newVal, oldVal){
        console.log('我是新传入的',newVal)
        console.log('我是旧的传入的',oldVal)
      }
    },
    //市场商家
    insMerchantArray: {
      type: Object
    }
  },
  methods: {
    // 日检市场
    insTodayChange: function (e) {
      console.log('选择抽检市场', e.detail.value)
      console.log(this.insTodayArray)
      this.insTodayIndex = e.detail.value,
      this.factoryID = this.insTodayArray[e.detail.value].FactoryID,
      this.insTodayDefault = this.insTodayArray[e.detail.value].FactoryName
      let data = {
        factoryID: this.data.factoryID
      }
      this.$emit('selectBazaar', data, {});
    },
    //市场商家
    insMerchantChange: function(e) {
      console.log('监督单位 - 日检 - 市场商家', e.detail.value)
      this.insMerchantIndex = e.detail.value
    },
     //检测项
     insCheckClassChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.insCheckClassIndex = e.detail.value
    },
     //检测结果
    insResultChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.insResultIndex = e.detail.value
    },
    //获取单位名称
    inputUnitName(e){
     this.inputUnitName = e.detail.value
    },
    //获取商品名称
    inputGoods(e){
     this.inputGoods = e.detail.value
    },
    //《winner 20201117》 选择认证类型
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
      let selectOneseif = 1;
      switch(e.detail.value) {
        case "unit":
          selectOneseif = 1;
        break;
        case "oneseif":
          selectOneseif = 2
        break;
      }
      this.selectOneseif = selectOneseif
      let data = {
        selectOneseif: selectOneseif
      }
      this.$emit('radioChange', data, {})
    },
    //发出上传事件函数
    uploadFile:function() {
      let data = {}
      this.$emit('uploadFile',data,{});
    },
    //保存
    sumitSave() {
      let insTodayIndex = this.insTodayIndex
      let insCheckClassIndex = this.insCheckClassIndex
      let insResultIndex = this.insResultIndex
      let insMerchantIndex = this.insMerchantIndex
      console.log('选择市场ID', this.insTodayArray[insTodayIndex].FactoryID)
      let data = {
        LoginKey: globalData.loginKey,
        AppType: globalData.appType,
        SystemID: globalData.systemID,
        GoodsName : this.inputGoods,
        OutletsID :  this.insMerchantArray[insMerchantIndex].OutletsID,
        FactoryID : this.insTodayArray[insTodayIndex].FactoryID,
        TestItems : this.insCheckClassArray[insCheckClassIndex].id,
        Fruit : this.insResultObject[insResultIndex].id,
        FactoryType: this.selectOneseif || 1
      }
      this.$emit('sumitSave', data, {});
    }
  }
}
  /**
   * 组件的属性列表
   */

  // options: {
  //   addGlobalClass: true,
  //   multipleSlots: true,
  //   stylelsolation: "isolated"
  // },
