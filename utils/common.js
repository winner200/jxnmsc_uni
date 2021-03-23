/**
 * 公用引用js类及vant提示模态框
 * 
 * @Autor 《winner443@163.com》
 * @Date  20200528
 * 
 */
 //引用vant提示类
import {GetMessage} from '../utils/GetMessage';
//实例化vant类
const getmessage = new GetMessage;

//引用调用接口类
const httpRequest = require('../utils/httpRequest.js');

//引用api接口路径
const urlUtils = require('../servers/url_util');