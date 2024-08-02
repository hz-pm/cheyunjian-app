// test user request api
import {http} from '../http.interceptor.js'
// const http = new Request();

//
// export function getUserInfo(params){
// 	return http.get('/http/getUserInfo', params)
// }

//首页按钮
export function fetchMenu(params){
	return http.post('/ebapi/public_api/index', params)
}

//注册
export function phoneRegister(params){
	return http.post('/index/user/phoneReg', params)
}

//发送短信验证码
export function sendSms(params1){
	return http.post('/sms/send',{},{params:params1})
}

//验证码登录
export function loginByCode(params1){
	return http.post('/index/user/loginByCode',{},{params:params1})
}

//登录
export function userLogin(params){
	return http.post('/index/user/login', params)
}

//微信登录
export function loginByWX(params1){
	return http.post('/index/user/miniProgramLogin',{},{params:params1})
}

//重置密码
export function resetPwd(params1){
	return http.post('/sms/resetPwd',{},{params:params1})
}

//获取用户信息
export function getUserInfo(params){
	return http.get('/index/user/getUserInfo',params)
}

//获取用户积分信息
export function getPointsInfo(params){
	return http.get('/index/points/getPointInfo',params)
}

//用户绑定的车辆
export function getCarInfoList(params){
	return http.get('/car/info/list',params)
}

//添加绑定车辆
export function addMyCar(params){
	return http.post('/car/info/addMyCar', params)
}

//修改车辆信息
export function editCarInfo(params){
	return http.post('/car/info/updateInfo', params)
}

//绑定手机号
export function bindPhoneNumber(params1){
	return http.post('/sms/bindPhoneNumber',{},{params:params1})
}

//绑定邮箱
export function bindEmail(params1){
	return http.post('/index/user/bindEmail',{},{params:params1})
}

//提交企业认证
export function certifiedSubmit(params){
	return http.post('/index/enterprise/certifiedSubmit',params)
}

//获取认证信息
export function getUserEnterprise(params){
	return http.get('/index/enterprise/getUserEnterprise',params)
}

//获取消费记录
export function pointsRecordList(params1){
	return http.get('/index/points/pointsRecordList',{params:params1})
}

//充值积分
export function rechargePoints(params){
	return http.post('/Wx/rechargePoints',params)
}

//充值记录
export function getRechargeRecordList(params){
	return http.get('/index/rechargeRecord/getRechargeList',params)
}

//购买vip
export function buyVip(params){
	return http.post('/Wx/buyVip',params)
}

//获取已绑定车辆的报告
export function submitGetMyCarReport(params){
	return http.post('/car/info/submitGetMyCarReport',params)
}

//车云检
export function checkCar(params,config){
	return http.post('/index/cloud/checkCar',params,config)
}

//获取车云检记录
export function cloudRecordList(params){
	return http.get('/index/cloud/list',params)
}

//获取车云检详情
export function cloudDetails(params1){
	return http.get('/index/cloud/getDetails',{params:params1})
}

//导出检测报告图片
export function reportImgUrl(params1){
	return http.get('/index/cloud/reportImgUrl',{params:params1})
}

//积分购买列表
export function getPointsSkuList(params){
	return http.get('/index/points/pointsSkuList',params)
}

//获取用户vip信息
export function getUserVipInfo(params){
	return http.get('/index/vip/getUserVipInfo',params)
}

//获取VIP列表
export function getVipCardInfo(params){
	return http.get('/index/vip/getVipCardList',params)
}

//电易估
export function eleCheck(params,config){
	return http.post('/index/ele/eleCheck',params,config)
}

//获取电易估记录
export function eleRecordList(params){
	return http.get('/index/ele/list',params)
}

//获取电易估详情
export function eleDetails(params1){
	return http.get('/index/ele/getDetails',{params:params1})
}

//获取openId
export function getOpenId(params1){
	return http.get('/index/user/getWxOpenId',{params:params1})
}

