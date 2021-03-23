import Dialog from '../miniprogram_npm/@vant/weapp/dist/dialog/dialog'
/**
 * 提示错误信息类
 *  
 * @Author <winner443@163.com>
 * @Date 20200422
*/
class GetMessage{
   /*  constructor(message='温馨提示', url='',title='',skipForm=1){
        this.message = message;
        this.url = url;
        this.title = title;
        this.skipForm = skipForm;
    } */
    
    /**提示错误信息类，带有model对话框
     * 
     * @param {string} message 错误信息填写
     * @param {string} url 跳转ulr，默认为空，不跳转。
     * @param {boolean} context 代表的当前页面 可以写this
     * @param {string} title vant提示model对话框标题
     * @param {int} skipForm  跳转方式，skipForm=1，默认跳转保留页面栈，skipForm=2，不保留页面栈
     * @param {string} content 选择器的选择范围，this
     * @param {boolean} cancel 取消按钮执行操作，一般用于tabbar
     * @param {string} cancel_url 取消跳转的路径
     * @param {boolean} cancelSkipUrl 点击取消按钮是否跳转页面；true跳转，false默认不跳转。cancelSkipUrl = false
     * @param {string} confirmButtonText 确认按钮的文案
    */
    getErrorMsgs(message='', context='', url='', skipForm = 1, title='温馨提示', cancel = false, cancel_url, cancelSkipUrl = false, confirmButtonText = '确认'){
        Dialog.confirm({
        context:context,//代表的当前页面
        selector:"#van-dialog",//选择器
        title: title,
        message: message,
        confirmButtonText: confirmButtonText
        }).then(() => {
            // on confirm
            console.log('我点击了确认');
            if(url){
                //判断跳转的方式
                switch(skipForm){
                    case 1:
                        wx.navigateTo({
                            url: url
                        });
                    case 2:
                        wx.redirectTo({
                            url: url
                        }); 
                    default:
                        return false;
                }
            }else{
                return false;//不跳转
            }
        }).catch(() => {
            if(cancel){
                //执行取消操作
                if(cancelSkipUrl){
                    wx.redirectTo({
                        url: cancel_url
                    });
                }else{}
               
            }
            // on cancel
            console.log('我点击了取消了,关闭model窗口');
        });
    };
    /**提示错误信息类，带有model对话框
     * 
     * @param message 错误信息填写
     * @param title vant提示model对话框标题
     * @param content 选择器的选择范围，注意，这里this不能直接在这里写死，因为要是写在这this代表的就是这个getErrorMsgs方法本身。所以在调用的时候传入this，代表的是方法本身，不然就会提示：
    */
    getErrorAlert(message='',content='',title=''){
        Dialog.alert({
            content:content,
            title: title,
            message: message
        }).then(() => {
            // on close
        });
    }
}
//将类暴露出去，供外面使用
export{
    GetMessage
}