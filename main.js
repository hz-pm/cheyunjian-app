import Vue from 'vue'
import App from './App'
import store from '@/store';

import * as filters from '@/common/filters.js';

// 注入全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// 引入路由
// import {router,RouterMount} from './common/router.js';
// Vue.use(router);

if (!uni.$u) {
  uni.$u = {};
  Vue.prototype.$u = uni.$u
}

// 全局引入vuex
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// 引入扩展方法
import '@/common/extend.js';

//-----------------请求方法封装----------------------
import http from '@/apis/http.interceptor.js'
//全局挂载引入，配置相关在该index.js文件里修改
Vue.prototype.$http = http

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})

// import installPlugin from 'pages/components/jj-messagebox/messageView/index.js'
// installPlugin(Vue)

// http接口API集中管理引入部分
import httpApi from '@/apis/http.api.js'
Vue.use(httpApi, app)

//微信分享
import share from '@/common/share.js'	
Vue.mixin(share)

import tools from '@/common/tools.js';
Vue.use(tools, app)

	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// // #ifdef H5
// 	RouterMount(app,router,'#app')
// // #endif
// // #ifndef H5
//// #endif