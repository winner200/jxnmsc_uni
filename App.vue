<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	} 
	/* 设置全局背景颜色 */
	page {
	  background-color: #F6F5F5;
	}
	/* 全局字体大小 */
	.global-size {
	  font-size: 28rpx;
	}
	/* 全局宽度 */
	.body {
	  /* background-color: blue; */
	  width: 95%;
	  /* height: auto; */
	  margin: 0 auto;
	}
	/* 按钮 */
	.save {
	  background-color:#08C161;
	  height: 35px;
	  line-height: 35px;
	  font-size: 16px;
	  text-align: center;
	  color: #ffffff;
	  border-radius: 10px;
	  margin-top: 10px;
	}
	/* 清除button自定义样式 */
	button::after {
	  border: none;
	}
	button {
	  background-color: transparent;
	  padding-left: 0;
	  padding-right: 0;
	  line-height:inherit;
	}
	button {
	  border-radius:0;
	}
	.btn1 button {
	  color: #fff;
	  align-items: center;
	  text-align: center;
	  font-size: 11px;
	  background-color:#08C161;
	  border-radius: 11rpx;
	  font-weight: 500;
	  /* padding: 8px; */
	  margin: 0px;
	}
	/* 小按钮 - class直接放在button上 */
	.btn-small {
	  color: #fff;
	  font-size: 11px;
	  background-color: #08C161;
	  border-radius: 11rpx;
	  width: 92px !important;
	}
	.btn-middle {
	  color: #fff;
	  font-size: 11px;
	  background-color: #08C161;
	  border-radius: 11rpx;
	  width: 142px !important;
	}
	.btn-big {
	  color: #fff;
	  align-items: center;
	  text-align: center;
	  font-size: 11px;
	  background-color: #08C161;
	  border-radius: 11rpx;
	  font-weight: 500;
	  margin: 0px;
	}
	/* 登录按钮 */
	.button-big {
	  align-items: center;
	  background: #08C161;
	  color: #ffff;
	  border-radius: 30px;
	  font-size: 32rpx;
	  margin-top: 20px;
	}
</style>
