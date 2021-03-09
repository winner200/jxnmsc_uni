/**
 * 封装小程序http请求方法
 * 
 * @Author <winner443@163.com>
 * @Date 20200424
 */

/**
 * 供外部get请求
 */
function getReques(){
    console.log('我是get请求');
}

/**
 *供外部post请求使用 
 */ 

function postRequest(url, data,onSuccess, onFailed){
    request(url, data,onSuccess, onFailed)
}

/**
 * http网络post请求
 * @paran url请求地址
 * @data 请求参数
 * @onSuccess 成功回调
 * @onFailed 失败回调
 * 
 */
function request(url, data, onSuccess, onFailed){
    wx.showLoading({
        title: '数据加载中',
        icon: 'loading'
    });
    wx.request({
        url:url,
        method:'POST',
        header: {
            'Content-Type': 'application/json'
       },
        data:data,
        success:(result)=>{
            wx.hideLoading();//关闭loading
            if(result.data.Result=="true"){
                //请求成功返回
                onSuccess(result);
            }else{
                //请求失败返回
                onFailed(result)
            }
        },
        fail:()=>{
            onFailed('');  
            console.log('请求失败');
        }
    });
}
// 1.通过module.exports方式，将方法暴露出去，提供给外部调用
module.exports = {
    postRequest: postRequest
}