const app = getApp()
/**
 * 上传文件到服务器 <winner443@163.com>
 * 
 * @param {String} url //上传接口
 * @param {String} filePath //上传路径
 * @param {String} name //文件名称
 * @param {Int} uploadID //文件ID
 * @param {Int} uploadtype //1. 外部检查 2.内部自检 3.商家注册 身份证正面 4.商家注册 身份证反面 5.商家注册 营业执照 6.监督单位 检疫附件文件 7.屠宰申报 票据图片 8.检测中心-日检 检测录入 自检报告
 */
function uploadFileServer(url, filePath, name, uploadID, uploadtype) {
  let formData = {}
  switch(uploadtype) {
    case 1: 
      formData = {
        BigProductsID: uploadID
      }
    break;
    case 2:
      formData = {
        ProductsID: uploadID
      }
    break;
    case 3:
      formData = {
        IDPhotoFront: uploadID
      }
    break;
    case 4:
      formData = {
        IDPhotoBack: uploadID
      }
    break;
    case 5:
      formData = {
        BusinessLicenseFieldID: uploadID
      }
    break;
    case 6:
      formData = {
        BusinessLicenseFieldID: uploadID
      }
    break;
    case 7:
      formData = {
        BillPicture: uploadID
      }
    break;
    case 8:
      formData = {
        checkPicture: uploadID
      }
    break;
    case 9:
      formData = {
        AttachedPicture: uploadID
      }
    break;
  }
 
  wx.uploadFile({
    url: url, //仅为示例，非真实的接口地址
    filePath: filePath,
    name: name,
    formData: formData,
    success(res) {
      console.log('证件上传成功',res)
      //do something
    },
    fail(error) {
      console.log('证件上传失败',error)
    }
  })
}
module.exports = {
  uploadFileServer
}