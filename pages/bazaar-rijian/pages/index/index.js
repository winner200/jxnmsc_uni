const util = require('utils/util.js')

import Clogout from 'contentComps/Clogout/Clogout.vue'
import textc from '/components/textc/textc.vue'
export default {
  data() {
    return {
      roleList: [
        {
          rid: 1,
          rname: "开始抽检",
          bindTap: "skipInspect",
          imageSrc: '/static/images/login-img/1.png'
        },
        {
          rid: 2,
          rname: "今日抽检",
          bindTap: "skipTodayInspect",
          imageSrc: '/static/images/login-img/3.png'
        },
        {
          rid: 3,
          rname: "累计抽检",
          bindTap: "skipCountInspect",
          imageSrc: '/static/images/login-img/3.png'
        }
      ],
      loginTime: '',
      loginName: ''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(util.formatTime(new Date()))
    this.loginTime = util.formatTime(new Date()),
    this.loginName = uni.getStorageSync('operatorName')
  },
  components: {
    Clogout,
    textc
  },
  methods: {
    Fn(method) {
    	this[method]()
    },
    // 开始抽检
    skipInspect() {
      console.log('进入开始抽检')
      uni.navigateTo({
        url: "/pages/bazaar-rijian/pages/inspect/inspect"
      })
    },
    // 今日抽检
    skipTodayInspect() {
      console.log('进入今日抽检')
      uni.navigateTo({
        url: "/pages/bazaar-rijian/pages/record/record?toTime=1"
      })
    },
    // 累计抽检
    skipCountInspect() {
      console.log('进入累计抽检')
      uni.navigateTo({
        url: "/pages/bazaar-rijian/pages/record/record?toTime=2"
      })
    },
  }
}
