<template>
	<view class="body" style="height: 100vh">
	  <image class="body-background" src="/static/images/image/logo-background.png" />
	  <view class="body-content">
	    <image class="touxiangkuang" src="/static/images/image/logo.png" />
	    <view class="bidy-content-logo">
	      <view v-if="registerFlag == 1">
	        <image class="ipone" src="/static/images/image/shenfen.png"></image>
	        <text class="section__title">选择身份</text>
	        <radio-group class="selectPicker" @change="radioChange">
	          <radio class="radio" v-for="(item, index) in inspectionListChoujian" :value="item.id" :checked="item.checked">
	            <text>{{item.name}}</text>
	          </radio>
	        </radio-group>
				</view>
	      <view v-if="registerFlag == 2 || registerFlag == 3">
	        <!-- <view class="section__title">选择角色</view> -->
	        <image class="ipone" src="/static/images/image/shenfen.png"></image>
	        <text class="section__title">选择身份</text>
	        <radio-group class="selectPicker" @change="radioChange">
	          <radio class="radio" v-for="(item, index) in inspectionList" :key="index" :value="item.id" :checked="item.checked">
	            <text>{{item.name}}</text>
	          </radio>
	        </radio-group>
				</view>
	      <view v-if="Rid == 3">
	        <!-- <view class="section__title">选择角色</view> -->
	        <image class="ipone" src="/static/images/image/shenfen.png"></image>
	        <text class="section__title">选择身份</text>
	       <radio-group class="selectPicker" style="margin: 0px 0px 0px 40px" @change="radioChange">
	          <radio style="width: 90px" class="radio" v-for="(item,index) in identityList" :key="index" :value="item.identityID" :checked="item.checked">
	            <text>{{item.identityName}}</text>
	          </radio>
	        </radio-group>
				</view>
	
	      <!-- 种养殖选择身份 -->
	      <view v-if="submitData.outletsType == 4">
	        <!-- <view class="section__title">选择角色</view> -->
	        <image class="ipone" src="/static/images/image/shenfen.png"></image>
	        <text class="section__title">选择身份</text>
	       <radio-group class="selectPicker" style="margin: 0px 0px 0px 40px" @change="radioChange">
	          <radio style="width: 90px" class="radio" v-for="(item, index) in plantList" :key="index" :value="item.id" :checked="item.checked">
	            <text>{{item.name}}</text>
	          </radio>
	        </radio-group>
				</view>
	
	      <view>
	        <image class="ipone" src="/static/images/image/ipone.png" />
	        <input type="text" placeholder="请输入账号" placeholder-class="pler-account" v-model="submitData.phoneNum" />
	      </view>
	      <view>
	        <image class="password" src="/static/images/image/password.png" />
	        <input type="text" placeholder="请输入验证码" placeholder-class="pler-account" v-model="submitData.tempVerifyCode" />
	        <button class="button-big" size="mini" @click="_getMsg">{{time}}</button>
	      </view>
	    </view>
	    <button class="button-logo" @click="handleLogin">立即登录</button>
	  </view>
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog 
					type="error" 
					message="成功消息" 
					:duration="2000" 
					:before-close="true" 
					:content="errMessage || '默认提示'" 
					@close="close" 
					@confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import loginTel from './login-tel.js'
	export default {
		name: 'login-tel',
		...loginTel
	}
</script>
<style>
	@import url("./login-tel.css");
</style>