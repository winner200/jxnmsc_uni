<template>
  <!--pages/bazaar-rijian/pages/index/index.wxml-->
  <view class="border">
    <view class="title">
      <image class="title-img" src="/static/images/login-img/back-img.png" />
    </view>
    <view class="info">
      <view class="info-content">
        <text>欢迎</text>
        <text class="info-name">{{loginName}}</text>
        <text>登录</text>
      </view>
      <view class="info-time">
        <text>{{loginTime}}</text>
      </view>
    </view>
    <view class="border-bottom">
      <view class="content" v-for="(item, index) in roleList" :key="index" @click="Fn(item.bindTap)">
        <view class="content-top">
          <image class="content-img" :src="item.imageSrc" alt=""/>
        </view>
        <view class="content-bottom">
          <text>{{item.rname}}</text>
        </view>
      </view>
    </view>
    <textc/>
    <Clogout />
  </view>
</template>
<script>
  import index from './index.js'
  export default {
    name: 'index',
    ...index
  }

</script>

<style scoped>
  @import url("/static/css/index.css");
  /* @import url("./index.css"); */
</style>
