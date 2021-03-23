const urlUtil = require('network/url_util.js')
const globalData = require('config/global_config.js').globalData
const httpRequest = require("network/httpPromise.js");

import {checkMobile} from 'utils/validate.js'


export default {
	data() {
		return {
			registerFlag: '', // 1.市场监督管理局 2.检测中心登录 3.检疫中心登录
			Rid: '', //内部自检id
			//选择自检/巡检
			inspectionIndex: 0,
			errMessage: '', // 错误提示
			time: '立即获取',
			currentTime: 60, //验证时间
			interval: "", //计时器
      slaughteID: '', //4.屠宰厂小程序登录
			submitData: {
				phoneNum: '', //手机号
				tempVerifyCode: '', //验证码
				outletsType: null ,//outletsType：注册身份标识--商家类别 1.网点商家 2.供货商 3.批发商 4.生产者
				roleType: '',
				identityType: '' //身份参数
			},
			inspectionList: [
				{
					id: 1,
					name: '日检',
					checked: 'true'
				},
				{
					id: 2,
					name: '巡检'
				},
			],
			//选择抽检/巡检
			inspectionIndexChoujian: 0,
			inspectionListChoujian: [
				{
					id: 1,
					name: '抽检',
					checked: 'true'
				},
				{
					id: 2,
					name: '巡检'
				},
			],
			// 选择批发市场/农贸市场
			identityIndex: 0,
			identityList: [
				{
					identityID: 1,
					identityName: '批发自检',
					identityType: 3,
					checked: 'true'
				},
				{
					identityID: 2,
					identityName: '农贸自检',
					identityType: 4
				}
			],
			//种养殖选择身份
			plantIndex: 1,
			plantList: [
			 {
				 id: 1,
				 name: '种植',
				 checked: 'true'
			 },
			 {
				 id: 2,
				 name: '养殖'
			 },
		 ]
		}
	},
	components: {

	},
	onLoad: function(e) {
		console.log('我是onload',e)
		this.registerFlag = e.registerFlag || ''
		this.Rid = e.rid || ''
		this.submitData.outletsType = e.outletsType || ''
    this.slaughteID = e.slaughteID || ''

	},
	methods: {
		// 登录
		//《winner 20201208》登录
    handleLogin() {
      //1.外部抽检 2.外部日检 3.批发自检 4.农贸自检 5.网点商家 6.供应商 7.批发商8生产者 9.屠宰场运营人员
      if(this.Validate(true)) {
        let url = urlUtil.UserLogin
        let operatorID = '' //把operatorID存到缓存
        let operatorName = '' //把operatorName存到缓存
        let identityType = this.submitData.identityType ? this.submitData.identityType : ''// 内部自检选择身份 -- 批发市场、农贸市场
        let tradeInspectionUrl = '' //跳转内部自检下 -- 批发市场、农贸市场路径
        let inspectionUrl = '' //跳转：外部抽检、外部日检、屠宰单位、批发商、生产源头、供货商、网点商家
        let outletsType = this.submitData.outletsType //选择身份标识
        let registerFlag = this.registerFlag
        let slaughteID = this.slaughteID
        let data = {
          LoginKey: globalData.loginKey,
          AppType: globalData.appType,
          SystemID: globalData.systemID,
          PhoneNum : this.submitData.phoneNum,
          TempVerifyCode : this.submitData.tempVerifyCode,
        }
        console.log('outletsType---' + outletsType + 'registerFlag---' + registerFlag + 'slaughteID---' + slaughteID + 'identityType---', identityType)
        // 登录判断是否选择了身份，只有内部自检选择身份
        if(identityType) {
          data.RoleType = identityType //	1.外部抽检 2.外部日检 3.批发自检 4.农贸自检 5.网点商家 6.供应商 7.批发商 8生产者 9.屠宰场运营人员
        }
        if(outletsType) {
          // 接收的参数outletsType 注册身份标识--商家类别 1.网点商家 2.供货商 3.批发商 4.生产者
          switch(outletsType) {
            case '3': //批发商
              data.RoleType = 7
            break;
            case '4': // 种植/养殖源头
              data.RoleType = 8
            break;
            case '1': // 网点商家
              data.RoleType = 5
            break;
          }
        }
        // 根据选择不同的身份传递不同的登录参数；1.市场监督管理局 2.检测中心登录 3.检疫中心登录 4. 屠宰场小程序登录
        if(registerFlag) {
          // console.log('wdebug--inspectionIndexChoujian', typeof this.inspectionIndexChoujian)
          switch(registerFlag) {
            case '1':
              switch(this.inspectionIndexChoujian) { // 选择抽检方式 0.抽检 2.巡检
                case 0:
                  data.RoleType = 1
                break;
                case 1:
                  data.RoleType = 2
                break;
              }
            break;
            case '2':
              // 选择抽检方式 1.日检 2.巡检
              switch(this.inspectionIndex) {
                case 0:
                  data.RoleType = 10
                break;
                case 1:
                  data.RoleType = 11
                break;
              }
            break;
            case '3':
              // 选择抽检方式 1.日检 2.巡检
              switch(this.inspectionIndex) {
                case 0:
                  data.RoleType = 12
                break;
                case 1:
                  data.RoleType = 13
                break;
              }
            break;
          }
        }
        if(slaughteID) {
          data.RoleType = 9
        }
        console.log('提交数据登录信息', data)
        httpRequest.post(url, data).then(res=> {
          console.log('登录成功', res)
          operatorID = res.data.Data.OperatorID
          operatorName = res.data.Data.OperatorName
          try {
            uni.setStorageSync('operatorID', operatorID)
            uni.setStorageSync('operatorName', operatorName)

          } catch(e) {
            console.log('login-tel-登录成功保存本地失败', e)
          }
          // 内部自检登录判断
          if(identityType) {
            switch(identityType) {
              case 3: //批发自检
              console.log('wdebug 2021-02-23-12:51', identityType)
                // tradeInspectionUrl = '/pages/wholesale-inspection/tabbar/tabbar'
                tradeInspectionUrl = '/pages/wholesale-inspection/pages/index/index'
              break;
              case 4: //农贸自检
                // tradeInspectionUrl = '/pages/trade-inspection/tabbar/tabbar'
                tradeInspectionUrl = '/pages/trade-inspection/pages/index/index'
              break;
            }
            uni.reLaunch({
              url: tradeInspectionUrl
            })
          }
          // 批发商、生产源头、供货商、网点商家登录判断
          if(outletsType) {
            console.log('选择身份', outletsType)
            switch(outletsType) {
              case '4': // 种/养殖小程序
                // inspectionUrl = '/pages/plant-breed/tabbar/tabbar'
                inspectionUrl = '/pages/plant-breed/pages/index/index?plantID=' + this.plantIndex
              break;
              case '3': //批发商小程序
                // inspectionUrl = '/pages/wholesaler/tabbar/tabbar'
                inspectionUrl = '/pages/wholesaler/pages/index/index'
              break;
              case '1': // 网点商家
                // inspectionUrl = '/pages/merchant/tabbar/tabbar'
                inspectionUrl = '/pages/merchant/pages/index/index'
              break;
            }
            uni.reLaunch({
              url: inspectionUrl
            })
          }
          // 市场监督管理局、检测中心、检疫中心判断登录
          if(registerFlag) {
            console.log('0000000000', typeof registerFlag, '----',this.inspectionIndexChoujian)
            switch(registerFlag) {
              case '1':
                switch(this.inspectionIndexChoujian) { // 选择抽检方式 0.日检 2.巡检
                  case 0:
                    // inspectionUrl = '/pages/bazaar-rijian/tabbar/tabbar'
                    inspectionUrl = '/pages/bazaar-rijian/pages/index/index'
                  break;
                  case 1:
                    inspectionUrl = '/pages/bazaar-xunjian/pages/index/index'
                  break;
                }
              break;
              case '2':
                switch(this.inspectionIndex) {
                  case 0:
                    console.log('wdebug 2021-02-23', this.inspectionIndex)
                    // inspectionUrl = '/pages/daily-detection-unit/tabbar/tabbar'
                    inspectionUrl = '/pages/daily-detection-unit/pages/index/index'
                  break;
                  case 1:
                    inspectionUrl = '/pages/daily-detection-unit-xunjian/pages/index/index'
                  break;
                }
              break;
              case '3':
                switch(this.inspectionIndex) {
                  case 0:
                    // inspectionUrl = '/pages/quarantine-unit/tabbar/tabbar'
                    inspectionUrl = '/pages/quarantine-unit/pages/index/index'
                  break;
                  case 1:
                    // inspectionUrl = '/pages/detection-unit/tabbar/tabbar'
                    inspectionUrl = '/pages/detection-unit/pages/index/index'
                  break;
                }
              break;
            }
            uni.reLaunch({
              url: inspectionUrl
            })
          }
          if(slaughteID) {
            // inspectionUrl = '/pages/slaughter/tabbar/tabbar'
            inspectionUrl = '/pages/slaughter/pages/index/index'
            uni.reLaunch({
              url: inspectionUrl
            })
          }
        }).catch(error=> {
          console.log('登录失败', error)
          if((identityType || registerFlag || outletsType == 3) && error.data.Result == 'false') {
            // getmessage.getErrorAlert('暂无权限，联系管理员！')
            uni.showToast({
              title: '暂无权限，联系管理员！',
              icon: 'none',
              time: 1000
            })
          }else {
            if(error.data.Result == 'false' && error.data.Notice == "该手机号还没注册！") {
              let skipUrl = '/pages/global/reg-supplier/reg-supplier?outletsType=' + outletsType
              // getmessage.getErrorMsgs('您输入的手机号未注册', '', skipUrl, 1, '' , true, '去注册')
            }else{
              // getmessage.getErrorAlert('账号或者验证码错误');

            }
          }
        })
      }
    },
		 /**
		 * 获取验证码<winner443@163.com>
		 *
		 * @param {Object} e
		 */
		_getMsg(e) {
      console.log(globalData.loginKey)
      if(this.Validate(false)){
        let url = urlUtil.getUserSMSVerifyCode
        let identityType = this.submitData.identityType //内部自检选择身份
        let outletsType = this.submitData.outletsType //选择身份标识
        let registerFlag = this.registerFlag
        let slaughteID = this.slaughteID
        let data = {
        	LoginKey: globalData.loginKey,
        	AppType: globalData.appType,
        	SystemID: globalData.systemID,
        	PhoneNum : this.submitData.phoneNum,
        	LogType :	1 //	1.登陆获取验证码 2.注册获取验证码
        }
        //获取验证码判断是否选择了身份，只有内部自检选择身份
        if(identityType) {
          data.RoleType = identityType //		1.监督抽检 2.监督巡检 3.批发自检 4.农贸自检 5.网点商家 6.供应商 7.批发商8生产者 9.屠宰场运营人员 10.检测日检 11.检测巡检 12.检疫日检 13.检疫巡检
        }
        if(outletsType) {
          // 接收的参数outletsType 注册身份标识--商家类别 1.网点商家 2.供货商 3.批发商 4.生产者
          switch(outletsType) {
            case '3': //批发商
              data.RoleType = 7
            break;
            case '4': // 种植/养殖源头
              data.RoleType = 8
            break;
            case '1': // 网点商家
              data.RoleType = 5
            break;
          }
        }
        // 根据选择不同的身份传递不同的登录参数；1.市场监督管理局 2.检测中心登录 3.检疫中心登录 4.屠宰厂小程序登录
        if(registerFlag) {
          console.log('wdebug---1839',typeof registerFlag)
          switch(registerFlag) {
            case '1':
              switch(this.inspectionIndexChoujian) { // 选择抽检方式 0.日检 2.巡检
                case 0:
                  data.RoleType = 1
                break;
                case 1:
                  data.RoleType = 2
                break;
              }
            break;
            case '2':
              // 选择抽检方式 1.日检 2.巡检
              switch(this.inspectionIndex) {
                case 0:
                  // this.$set(data, 'RoleType', 10)
                  data.RoleType = 10
                break;
                case 1:
                  data.RoleType = 11
                break;
              }
            break;
            case '3':
              // 选择抽检方式 1.日检 2.巡检
              switch(this.inspectionIndex) {
                case 0:
                  data.RoleType = 12
                break;
                case 1:
                  data.RoleType = 13
                break;
              }
            break;
          }
        }
        // 屠宰场登录
        if(slaughteID) {
          data.RoleType = 9
        }
        console.log('wdebug验证码手机号', this.submitData.phoneNum)
        this.disabled = true,
        this.currentTime = 60
        //请求发送短信接口
        httpRequest.post(url,data).then(res=> {
          console.log('获取验证码成功', res)
        }).catch(error=> {
          console.log('获取验证码失败', error)
          // 手机号未注册
          // if((identityType || registerFlag || outletsType==3) && error.data.Result == 'false') {
          if((identityType || registerFlag) && error.data.Result == 'false') {
            uni.showToast({
            	title: '暂无权限，联系管理员！',
            	icon: 'none',
            	time: 1000
            })
            this.getMsgTimer()
            clearInterval(this.interval)
          }else {
            if(error.data.Result == 'false' && error.data.Notice == "该手机号还没注册！"){
              let skipUrl = '/pages/global/reg-supplier/reg-supplier?outletsType=' + this.submitData.outletsType
              this.getMsgTimer()
              clearInterval(this.interval)
              // 提示用户，该手机号未注册引导用户去注册
              // getmessage.getErrorMsgs('您输入的手机号尚未注册', '', skipUrl, 1, '' , true, '去注册')
              uni.showToast({
              	title: '您输入的手机号尚未注册',
              	icon: 'none',
              	time: 1000
              })
              return false;
            }
          }
        })
        // 调用计时器方法
        this.last()
      }
    },
    getMsgTimer() {
      this.disabled = false,
      this.currentTime = 0,
      this.time = '立即获取'
    },
		radioChange(e) {
			console.log('wdebug 2021-3-11', e)
      let flag = parseInt(e.detail.value - 1)
			console.log(this.registerFlag)
      if(this.registerFlag) {
        this.inspectionIndex = flag
        this.inspectionIndexChoujian = flag
      }
      if(this.Rid) {
        this.inspectionIndex = flag
        this.submitData.identityType = this.identityList[flag].identityType
      }
      // 种养殖选择角色
      if(this.outletsType == '4') {
        this.plantIndex = flag
      }
		},
		// 关闭uni-popup
		close(done) {
			// console.log('关闭', done)
			done()
		},
		confirm(done, value) {
			//console.log('确认', done +'===' + value)
			done()
		},
		/**
		 * 验证器
		 * @param {Boolean} code 获取验证码的时候不验证验证码是否为空。默认为验证true
		 */
		Validate(code = true) {
			if(this.registerFlag && (this.inspectionIndex == null && this.inspectionIndexChoujian == null)){
				// 选择日检巡检
				this.errMessage = '请选择抽检方式';
				return false
			}
			if(this.Rid && this.identityIndex == null) {
				// 选择身份
				this.errMessage = '请选择身份';
				return false
			}
			if(this.submitData.phoneNum == ""){
				//验证手机号是否为空
				// this.errMessage = '手机号为必填项'
				uni.showToast({
					title: '手机号为必填项',
					icon: 'none',
					time: 1000
				})
				return false
			}else if(!checkMobile(this.submitData.phoneNum)){
				//验证手机正则
				// this.errMessage = '手机号格式不正确'
				uni.showToast({
					title: '手机号格式不正确',
					icon: 'none',
					time: 1000
				})
				return false;
			} else if(code){
				if(this.submitData.tempVerifyCode == ""){
					// this.errMessage = '验证码不能为空'
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						time: 1000
					})
					return false;
				}else{
					return true;
				}
			}else{
				return true
			}
		},
		//计时器
		last() {
			let currentTime = this.currentTime
			this.time = currentTime + '秒'
			this.interval = setInterval(()=> {
				this.time = (currentTime - 1) + '秒'
				currentTime--;
        // console.log('我进来了没', currentTime)
				if (currentTime <= 0) {
					clearInterval(this.interval)
					this.time = '重新获取'
					this.currentTime = 60
					this.disabled = false
					return 0
				}
			}, 1000)
		},
	}
}
