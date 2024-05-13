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
