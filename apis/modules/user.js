// test user request api
const http = uni.$u.http;

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
	return http.post('/phoneReg', params)
}

//发送短信验证码
export function sendSms(params){
	return http.post('/sms/send', params)
}

//登录
export function userLogin(params){
	return http.post('/web/user/do_login', params)
}
