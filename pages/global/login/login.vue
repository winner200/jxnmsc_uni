<template>
	<view class="body login-border" :style="{heigth: heigth}">
	  <img src="/static/images/image/1.png" alt="" class="login-bang" />
	  <view class="body-nav">
	    <view class="nav">
	      <text>点击选择身份将为您提供更加精准的服务</text>
	    </view>
	  </view>
	  <view class="catalog" v-if="Object.keys(role).length !== 0">
	    <view class="catalog-body" v-for="(item, index) in role" :key="index" @click="Fn(item.bindEvent)" :style="{backgroundColor: item.backgroundColor}">
	      <view>
	        <img class="catalog-icon" :src="item.iconUrl"/>
	      </view>
	      <view class="global-size login-size">
	        <text>{{item.rName}}</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>
<script>
	import login from './login.js'
	export default {
		name: 'login',
		...login
	}
</script>
<style scoped>
	@import url("./login.css");
</style>