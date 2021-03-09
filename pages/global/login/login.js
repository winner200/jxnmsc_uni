
export default {
/**
 * 页面的初始数据
 */
	data(){
		return {
			//登录角色对象
			role: [
				{
					rID: '1',
					rName: '市场监督管理局',
					iconUrl: '/static/images/image/rule2.png', //图标路径
					bindEvent: 'skipExternalCheck',// 绑定的事件
					backgroundColor: '#75D6FA'
				},
				{
					rID: '2',
					rName: '检测中心登录',
					iconUrl: '/static/images/image/rule1.png', //图标路径
					bindEvent: 'skipDailyCheck',// 绑定的事件71A0E1
					backgroundColor: '#71A0E1'
				},
				{
					rID: '3',
					rName: '检疫中心登录',
					iconUrl: '/static/images/image/rule7.png', //图标路径
					bindEvent: 'skipSlaughter', // 绑定的事件
					backgroundColor: '#71A0E1'
				},
				{
					rID: '4',
					rName: '批发农贸市场登录',
					iconUrl: '/static/images/image/rule7.png', //图标路径
					bindEvent: 'skipInteriorCheck',// 绑定的事件
					backgroundColor: '#75D6FA'
				},
				{
					rID: '5',
					rName: '屠宰单位登录',
					iconUrl: '/static/images/image/rule4.png', //图标路径
					bindEvent: 'skipWholesaler',// 绑定的事件
					backgroundColor: '#75D6FA'
				},
				{
					rID: '6',
					rName: '种植/养殖源头',
					iconUrl: '/static/images/image/rule8.png', //图标路径
					bindEvent: 'skipSkipProduction',// 绑定的事件
					backgroundColor: '#71A0E1'
					
				},
				{
					rID: '7',
					rName: '批发商登录',
					iconUrl: '/static/images/image/rule5.png', //图标路径
					bindEvent: 'skipSkipMerchant',// 绑定的事件
					backgroundColor: '#71A0E1'
				},
				{
					rID: '8',
					rName: '网点商家/企业/院校/登录',
					iconUrl: '/static/images/image/rule3.png', //图标路径
					bindEvent: 'skipSkipBranch',// 绑定的事件
					backgroundColor: '#75D6FA'
				}
			],
			height: '1212' //背景图高度
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this
		uni.getSystemInfo({
			success (res) {
				console.log(res.model)
				console.log(res.pixelRatio)
				console.log(res.windowWidth)
				console.log(res.windowHeight)
				console.log(res.language)
				console.log(res.version)
				console.log(res.platform)
				//动态给首页设置高度
				
				that.height = res.windowHeight
			}
		});
	},
	computed: {
	},
	methods: {
		Fn(method) {
			this[method]()
		},
		/**
		 * 	outletsType：注册身份标识--商家类别 1.网点商家 2.供货商 3.批发商 4.生产者
		 */
		 //市场监督管理局
		 skipExternalCheck() {
			// registerFlag = 1 登录时标识 -- 显示选择日检、巡检
			console.log('我到这了哈哈哈')
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?registerFlag=1'
			})
		},
		
		//检测中心登录
		skipDailyCheck() {
			//清空检疫ID
			uni.removeStorage({
				key: 'quarantineID',
				success(res){
					console.log('清除成功20201209', res)
				}
			})
			// registerFlag = 1 登录时标识 -- 显示选择日检、巡检
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?registerFlag=2'
			})
		},
		
		 //检疫中心登录
		 skipSlaughter() {
			 // registerFlag = 1 登录时标识 -- 显示选择日检、巡检
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?registerFlag=3'
			})
		},
		
		 //批发农贸市场登录
		 skipInteriorCheck() {
			//rid=3 内部自检
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?rid=3'
				// url: '/pages/trade-inspection/tabbar/tabbar'
			})
		},
		
		 //屠宰单位登录
		 skipWholesaler() {
			uni.navigateTo({
				// url: '/pages/global/reg-supplier/reg-supplier?outletsType=3'
				url: '/pages/global/login-tel/login-tel?slaughteID=3'
			})
		},
		 //种植/养殖源头登录
		 skipSkipProduction() {
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?outletsType=4'
			})
		},
		
		//批发商登录
		skipSkipMerchant() {
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?outletsType=3'
			})
		},
		
		//网点商家、商家、企业、院校登录
		skipSkipBranch() {
			console.log('网点商家');
			uni.navigateTo({
				url: '/pages/global/login-tel/login-tel?outletsType=1'
			})
		}
	}
}
