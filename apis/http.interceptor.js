// common/http.interceptor.js

/**
 * @version 3.0.5
 * @Author wz 
 * @description 无痛刷新,请求拦截
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */

import Request from '../utils/luch-request/index.js'
import jwt from '../utils/cache/jwt.js';
// import {silentLogin} from '@/utils/auth/auth.js';
import {httpCode,httpContentType} from '../common/constant.js';
// import projectConfig from '@/common/config.js';
import setting from '@/common/config.js';

const http = new Request()
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []

/**
 * 配置静态参数,仅在加载时执行一次
 */
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = setting.baseUrl
	console.log(config)
	config.header = {
		...config.header,
		'content-type': httpContentType.URL_ENCODED,
		//后端判断请求来自于哪里
		"X-Requested-With": "XMLHttpRequest"
	}
	// 是否使用loading
	config.custom = {
		// 请求接口展示Loading
		ShowLoading: true,
		// Loading中是否遮罩
		LoadingMask: true,
		// Loading文本
		LoadingText: 'Loading...',
		//错误提示框
		toast:true,
		catch: false,
	}; // 全局自定义参数默认值
	config.dataType = 'json'
	return config
})

/**
 * 拦截器:请求之前拦截
 * 配置动态参数,每次请求都会执行一次
 * 可以使用async await 做异步操作
 */
http.interceptors.request.use((config) => {
	config.header = {
		...config.header,
		//权限标识
		// 'Authorization':getApp().vuex_token,
		'Authorization':uni.getStorageSync("TOKEN"),
		//客户端标识
		platform:setting.PLATFORM
	}
	console.log("请求",config)
	// 展示loading页面
	if (config.custom.ShowLoading) {
		uni.showLoading({
			title: config.custom.LoadingText || 'Loading...',
			mask: config.custom.LoadingMask || false
		});
	}
	return config
}, (config) => {
	uni.showToast({
		icon: 'none',
		position: 'bottom',
		title: '网络请求异常'
	})
	return Promise.reject(config)
})

/**
 * 拦截器:请求之后拦截
 * 配置动态参数,每次请求都会执行一次
 * 可以使用async await 做异步操作
 */
http.interceptors.response.use(async (resp) => {
	console.log(resp);
	//解构出所需参数
	let {data} = resp
	let {code,msg} = data
	// 自定义参数
	const custom = resp.config?.custom
	if (custom.ShowLoading) {
		uni.hideLoading();
	}
	//1.请求成功则返回结果
	if (code === httpCode.SUCCESS) {
		return data;
	}
	if(custom.catch){
		return data;
	}
	// 2请求失败:
	// 	2.1 token 过期或者为空则 code = 401 重新获取
	// 	2.2 其他需要提示错误信息
	if (code === httpCode.JWTEXPIRE) {
		//记录本次请求,刷新token后再次执行
		//是否刷新token中,防止重复刷新
		console.log("token过期");
		msg = 'token过期'
		//跳转到登录
		uni.navigateTo({
			url:'/pages/login/login'
		})
		
		// if (!isRefreshing) {
		// 	//修改刷新状态为true
		// 	isRefreshing = true;
		// 	console.log("开始刷新token");
		// 	//重新登录保存新的token
		// 	// todo 此处改为静默登录
		// 	let member = await silentLogin();
		// 	console.log("刷新token成功");
		// 	console.log("开始执行队列请求！");
		// 	requests.forEach(cb => cb())
		// 	console.log("执行完成");
		// 	// 重试完了清空这个队列
		// 	requests = [];
		// 	isRefreshing = false;
		// 	//重新执行本次请求
		// 	return http.request(config);
		// } else {
		// 	console.log("存入队列自动刷新token后再执行请求！");
		// 	return new Promise((resolve) => {
		// 		// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
		// 		requests.push(() => {
		// 			resolve(http.request(config))
		// 		})
		// 	})
		// }
	}
	//服务端返回的状态码不等于200 也不等于401，则reject() 返回错误信息
	if(!msg){
		msg = '未知错误,请联系管理员'
	}
	//提示:信息
	// uni.showToast({
	// 	icon: "error",
	// 	title: 
	// })
	uni.showModal({
		title:'提示',
		content:msg,
		showCancel:false,
	})
	return Promise.reject(data)
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	uni.hideLoading();
	uni.showToast({
		icon: 'error',
		position: 'bottom',
		duration:3000,
		title: '网络错误'+response.statusCode
	})
	return Promise.reject(response)
})

export {
	http
}
