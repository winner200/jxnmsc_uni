<tempalte name="Clogout">
  <view class="border-all">
    <view class="content" @click="logout">
      <button class="button-big">退出登录</button>
    </view>
  </view>
</tempalte>
<script>
  export default {
    name: 'cLogout',
    methods: {
      logout() {
        console.log('退出登录')
        // this.triggerEvent('')
        uni.showModal({
          title: '',
          content: '您确定要退出吗？',
          success(res){
            console.log('我是res',res)
            if (res.confirm) {
              uni.reLaunch({
                url: '/pages/global/login/login'
              })
            }else if(res.cancel){
              console.log('用户点击了取消');
            }else{
              console.log('我是取消')
            }
          }
        })
      }
    }
  }
</script>
<style scoped>
  @import url("./Clogout.css");
</style>
