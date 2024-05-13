/**
 * @author wz
 * @Description 专门管理 access_token 的，代码不多，同时将 userinfo 的管理也放在里面
 */
// import 
// 	setting
// from '@/common/env.run.js';

//===============缓存键的定义===============
const tokenKey = "TOKEN"; //键值
const userKey = "MEMBER"; // 用户信息
const openIdKey = "OPENID"; // openIdKey
//===============缓存方法的定义===============
// 获取token
const getAccessToken = function() {
	let token = '';
	try {
		//todo 测试
		// if(setting.WX_ENV ){
			token = uni.getStorageSync(tokenKey);
		// }else{
		// 	token = setting.TEST_OPENID;
		// }
	} catch (e) {}
	return token;
}
// 设置token
const setAccessToken = (access_token) => {
	try {
		uni.setStorageSync(tokenKey, access_token);
		return true;
	} catch (e) {
		return false;
	}
}
//清除token
const clearAccessToken = function() {
	try {
		uni.removeStorageSync(tokenKey);
	} catch (e) {}
}
//设置userinfo
const setUser = (user) => {
	try {
		uni.setStorageSync(userKey, user);
		return true;
	} catch (e) {
		return false;
	}
}
//获取userinfo
const getUser = function() {
	try {
		return uni.getStorageSync(userKey)
	} catch (e) {
		return false;
	}
}
//清除userinfo
const clearUser = function() {
	try {
		uni.removeStorageSync(userKey)
	} catch (e) {}
}

//设置openId
const setOpenId = (openId) => {
	try {
		uni.setStorageSync(openIdKey, openId);
		return true;
	} catch (e) {
		return false;
	}
}
//获取openId
const getOpenId = function() {
	try {
		return uni.getStorageSync(openIdKey)
	} catch (e) {
		return false;
	}
}
//清除openId
const clearOpenId = function() {
	try {
		uni.removeStorageSync(openIdKey)
	} catch (e) {}
}

export default {
	getAccessToken,
	setAccessToken,
	clearAccessToken,
	getUser,
	setUser,
	clearUser,
	setOpenId,
	getOpenId,
	clearOpenId
}
