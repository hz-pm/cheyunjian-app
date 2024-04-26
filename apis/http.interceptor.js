// common/http.interceptor.js

import projectConfig from '@/common/config.js';

const codeMessage = {
	404: '您所请求的资源无法找到',
	500: '服务器内部错误，无法完成请求',
};

import Request from '@/utils/luch-request/index.js'
const http = new Request();

//国际化
// import Vue from 'vue'
// import messages from '../locale/index'
// let i18nConfig = {
//   // locale: localStorage.getItem('locale'),
//   locale: 'en',
//   messages
// }
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// const i18n = new VueI18n(i18nConfig)

const install = (Vue, vm) => {
	// 这个配置是一次配置，全局通用的，具体参数见
	http.setConfig((config) => {
		// 域名设置
		config.baseURL = projectConfig.baseUrl;
		// 全局header
		config.header = {};
		// 
		config.method = '';
		// 设置为json，返回后会对数据进行一次JSON.parse()
		config.dataType = 'json';
		// 
		config.responseType = 'text';
		// 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
		config.custom = {
			// 请求接口展示Loading
			ShowLoading: true,
			// Loading中是否遮罩
			LoadingMask: true,
			// Loading文本
			// LoadingText: vm.$tc('logding.t'),
			//错误提示框
			toast:true,
			catch: true,
		}; // 全局自定义参数默认值
		// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
		config.timeout = 60000;
		// #endif
		// #ifdef APP-PLUS
		// 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
		config.sslVerify = true;
		// #endif
		// #ifdef H5
		// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
		config.withCredentials = false;
		// #endif
		// #ifdef APP-PLUS
		// DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
		config.firstIpv4 = false;
		// #endif
		// 局部优先级高于全局，返回当前请求的task,options。请勿在此处修改options。非必填
		// getTask: (task, options) => {
		// 相当于设置了请求超时时间500ms
		//   setTimeout(() => {
		//     task.abort()
		//   }, 500)
		// },
		// 全局自定义验证器。参数为statusCode 且必存在，不用判断空情况。
		config.validateStatus = (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
			return statusCode >= 200 && statusCode < 300
		};
		return config;
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	http.interceptors.request.use((config) => {

		if (config.custom.ShowLoading) {
			uni.showLoading({
				title: config.custom.LoadingText || vm.$tc('logding.t'),
				mask: config.custom.LoadingMask || false
			});
		}
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		// config.header.Token = 'xxxxxx';
		let lang = localStorage.getItem('locale')
		if(lang == 'en'){
		    config.header['Accept-Language'] = 'en-us,en;q=0.9'
		}else if(lang == 'ja'){
		    config.header['Accept-Language'] = 'jp-jp,jp;q=0.9'
		}

		if (vm.$store.state.vuex_token != '') {
			config.header.authorization = vm.$store.state.vuex_token
		}else{
			//过滤掉指定url
			// if (config.url != '/web/user/do_login' && config.url != '/web/user/do_register' 
			// && config.url != '/web/user/kefu' && config.url != '/web/user/content'){
			// 	//跳转到登录
			// 	uni.reLaunch({
			// 		url: "/pages/login/login"
			// 	})
			// }
		}
		
		//统一添加语言参数
		if(config.data){
			config.data.lang = lang
		}
		
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		
		// console.log('==>>>'+JSON.stringify(config))
		
		// config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	})

	// 响应拦截，如配置，每次请求结束都会执行本方法
	http.interceptors.response.use((res) => {
		// 自定义参数
		const custom = res.config?.custom
		if (custom.ShowLoading) {
			uni.hideLoading();
		}
		console.log('==>' + JSON.stringify(res))
		// if 状态码是否正常
		if (res.statusCode == 200) {
			let data = res.data;
			if (data.code !== undefined && data.code !== 0) { // 服务端返回的状态码不等于200，则reject()
				// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
				if (res.config.url.includes('do_order')) {
					return Promise.reject(data)
				}
				if (custom.toast !== false) {
					uni.hideLoading()
					// getApp().globalData.$jj_alert('', data.info, vm.$tc('logding.t'))
					getApp().globalData.$jj_alert({
						type: 'alert', //弹窗的类型有alert和sheet
						position: 'center', //有center和bottom
						// btnDirection: btnDirection, //按钮的排列方向,row和column
						width: '70%', //设置弹窗的宽度
						padding: '24rpx 30rpx', //设置内容的上下左右偏移
						maskColor: "rgba(0, 0, 0, 0.55)", //遮罩层的背景颜色
						touchClose: true, //点击背景图层，是否关闭弹框
						showClose: false, //是否显示右上角的关闭按钮
						radius: 10, //设置圆角
						title: '', //标题
						isUseHTMLString: false, //是否将 message 属性作为 HTML 片段处理
						message: data.info, //内容
						btns: [{
							title: vm.$tc('confirm'),
							activeColor: "#FFF",
							style: {
								'color': '#21b1ff',
							},
							click: () => {
								console.log("点击Cancel")
							}
						}]
					})
					
					
					// uni.showModal({
					// 	title: '', //提示标题
					// 	content: data.info, //提示内容
					// 	showCancel: false, //是否显示取消按钮，默认ture
					// 	success: function(res) {

					// 	}
					// });
				}
				// 如果需要catch返回，则进行reject
				if (custom?.catch) {
					return Promise.reject(data)
				} else {
					// 否则返回一个pending中的promise
					return new Promise(() => {})
				}
			}
			// console.log(data.data)
			return data || {}
		} else {
			return Promise.reject(res.data)
			
			// let errorMessage = codeMessage[res.statusCode] ? codeMessage[res.statusCode] : res.statusCode;
			// vm.$u.toast(errorMessage);
		}
		return false;
	}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
		console.log('==E=>'+JSON.stringify(response))
		let code = response.statusCode;
		if(code == undefined || code == null){
			code = 500
		}
		uni.hideLoading();
		const statusCode = response.statusCode
		// const data = response.data
		
		if(code == 401){
			vm.$u.toast('Token expired');
			//token过期
			uni.reLaunch({
				url: "/pages/login/login"
			})
			return
		}
		// if (data.code !==undefined  && data.code == 1 && data.info == 'Expired token'  ) { // 服务端返回的状态码不等于200，则reject()
		//     // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
		//     //跳转到登录
		// 	uni.reLaunch({
		// 		url: "/pages/login/login"
		// 	})
		// 	return
		// }
		if(code >= 500){
			vm.$u.toast('NetWork Error:'+code);
			return
		}
		
		getApp().globalData.$jj_alert({
			type: 'alert', //弹窗的类型有alert和sheet
			position: 'center', //有center和bottom
			// btnDirection: btnDirection, //按钮的排列方向,row和column
			width: '70%', //设置弹窗的宽度
			padding: '24rpx 30rpx', //设置内容的上下左右偏移
			maskColor: "rgba(0, 0, 0, 0.55)", //遮罩层的背景颜色
			touchClose: true, //点击背景图层，是否关闭弹框
			showClose: false, //是否显示右上角的关闭按钮
			radius: 10, //设置圆角
			title: '', //标题
			isUseHTMLString: false, //是否将 message 属性作为 HTML 片段处理
			message: 'Error:'+code, //内容
			btns: [{
				title: vm.$tc('confirm'),
				activeColor: "#FFF",
				style: {
					'color': '#21b1ff',
				},
				click: () => {
					console.log("点击Cancel")
				}
			}]
		})
        return Promise.reject(response)
    })
}

export default {
	install
}