import {checkMobile} from 'utils/validate.js'
const urlUtils = require('network/url_util.js')
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
	},
	methods: {
		// 登录
		handleLogin() {
			console.log('登录', this.submitData)
			
			this.Validate()
			// this.$refs.popup.open()
		},
		 /**
		 * 获取验证码<winner443@163.com>
		 * 
		 * @param {Object} e 
		 */
		_getMsg(e) {
			let url = urlUtil.getUserSMSVerifyCode
			let identityType = _this.data.submitData.identityType //内部自检选择身份
			let outletsType = _this.data.submitData.outletsType //选择身份标识
			let registerFlag = _this.data.registerFlag
			let slaughteID = _this.data.slaughteID
			let data = {
				LoginKey: app.globalData.loginKey,
				AppType: app.globalData.appType,
				SystemID: app.globalData.systemID,
				PhoneNum : _this.data.submitData.phoneNum,
				LogType :	1 //	1.登陆获取验证码 2.注册获取验证码
			}
		},
		radioChange(e) {
			console.log('wdebug 2021-3-9', e)
			console.log(this.registerFlag)
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
		last: function () {
			let currentTime = this.currentTime
			this.time = currentTime + '秒'
			this.interval = setInterval(function () {
				this.time = (currentTime - 1) + '秒'
				currentTime--
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