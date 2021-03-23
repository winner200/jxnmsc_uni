const httpPromiseRequest = (url, options, headers = "application/json;") => {
  return new  Promise((resolve, reject) => {
    uni.showLoading({
      title: '数据加载中',
      icon: 'loading'
    });
    uni.request({
      url: url,
      method: options.method,
      data: options.data,
      header:{
        'Content-Type': headers
      },
      success(result){
        console.log(result);
        if(result.data.Result == "true"){
           //请求成功
          resolve(result);
        }else{
           //请求失败
          reject(result);
        }
        uni.hideLoading();//关闭loading
      },
      fail(error) {
        reject(error);
        uni.hideLoading();//关闭loading
      }
    })
  })
}
//get请求
const getPromise = (url, options = {}) => {
  return httpPromiseRequest(url, {method:'GET', data:options})
}
//post请求
const post = (url,options = {},headers) => {
  return httpPromiseRequest(url,{method:'POST', data:options}, headers)
}
module.exports = {
  post,
}
