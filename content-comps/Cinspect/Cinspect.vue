<!--components/c-inspect/c-inspect.wxml-->
<template>
  <view class="body">
    2222222222222222
  <view class="incpect-body-1">
    <view class="incpect-body-1-border">
      <view class="incpect-body-1-input global-size">
        <!-- <view class="incpect-body-1-input-1">
          <text>{{insUnitName}}：</text>
          <text>北京运营中心</text>
          <input class="incpect-body-1-text" type="text" placeholder="请填写单位名称" bind:input="inputUnitName"/>
        </view> -->
        <!-- 市场类型 -->
        <view class="incpect-body-1-input-1">
          <text>{{bazaarClass}}：</text>
           <radio-group class="radio-group" @change="radioChange">
            <radio class="radio" v-for="(item, index) in radioList" :key="index" :value="item.name" :checked="item.checked">
              <text>{{item.value}}</text>
            </radio>
          </radio-group>
          <!-- <input class="incpect-body-1-text" type="text" placeholder="{{insPlaceholder}}" bind:input="inputUnitName"/> -->
        </view>
        <view>
          <!-- <text>抽检市场：</text> -->
          <picker @change="insTodayChange" :value="insTodayIndex" :range="insTodayArray">
            <!-- <view class="incpect-picker">
              {{insTodayName}}：{{insTodayArray[insTodayIndex].FactoryName}}
            </view> -->
            {{insTodayName}}：{{insTodayDefault}}
          </picker>
        </view>
        <view>
          <!-- <text>市场商家：</text> -->
          <picker @change="insMerchantChange" :value="insMerchantIndex" :range="insMerchantArray">
            <view class="incpect-picker">
              {{insMerchant}}：{{insMerchantArray[insMerchantIndex].OutletsName || insMerchantDefault}}
            </view>
          </picker>
        </view>
        <view class="incpect-body-1-input-1">
          <text>{{insGoods}}：</text>
          <input class="incpect-body-1-text" type="text" :placeholder="insGoodsPlaceholder" v-model="inputGoods"/>
        </view>
        <view>
          <!-- <text>：检测项</text> -->
          <picker @change="insCheckClassChange" :value="insCheckClassIndex" :range="insCheckClassArray">
            <view class="incpect-picker">
              {{insCheckClass}}：{{insCheckClassArray[insCheckClassIndex].name}}
            </view>
        </picker>
        </view>
         <view>
          <!-- <text>：检测结果</text> -->
          <picker @change="insResultChange" :value="insResultIndex" :range="insResultArray">
            <view class="incpect-picker">
              {{insResult}}：{{insResultArray[insResultIndex]}}
            </view>
        </picker>
        </view>
        <!-- <view class="incpect-body-1-input-1">
          <text>{{insCheckName}}：</text>
          <text>张三</text>
          <input class="incpect-body-1-text" type="text" placeholder="{{insCheckNamePlc}}" bind:input="inputCheckName" />
        </view> -->
        <!-- <view>
          <text>抽检时间：</text>
          <text>{{currentTime}}</text>
        </view> -->
      </view>
      <!-- 扫一扫 -->
       <!-- <view class="body-1-send">
          <image src="/assets/images/scan.png"/>
      </view> -->
    </view>
  </view>
  <view class="incpect-body-2">
    <view class="incpect-body-2-upload" @click="uploadFile">
      <view class="incpect-body-2-title">
        <text>上传日检报告</text>
      </view>
      <view class="incpect-body-2-image">
        <image class="incpect-body-2-image-1" :src="reportImg ? reportImg : '/assets/images/up-image.png'" />
      </view>
    </view>
  </view>
  <view class="save" @click="sumitSave">
    <text>保存</text>
  </view>
</view>
</template>
<script>
  import Cinspect from './Cinspect.js'
  export default {
    ...Cinspect
  }
</script>
<style scoped>
  @import url("./Cinspect.css");
</style>
