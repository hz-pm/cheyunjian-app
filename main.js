import Vue from 'vue'
import App from './App'
import store from '@/store';
import messages from './locale/index'

// let lang = localStorage.getItem('locale')
// if(!lang){
//   lang = 'en'
//   localStorage.setItem('locale', lang);
// }
// let i18nConfig = {
//   // locale: 'zh-Hant',
//   locale: lang,
//   messages
// }

import * as filters from '@/common/filters.js';

// 注入全局过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

// 引入路由
import {router,RouterMount} from './common/router.js';
Vue.use(router);

// 引入uview
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);

// 全局引入vuex
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// 引入扩展方法
import '@/common/extend.js';

//国际化
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)
// const i18n = new VueI18n(i18nConfig)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	// i18n,
	store,
    ...App
})
// if(lang){
//   uni.setLocale(lang)
// }

import installPlugin from 'pages/components/jj-messagebox/messageView/index.js'
installPlugin(Vue)

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/apis/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/apis/http.api.js'
Vue.use(httpApi, app)

import tools from '@/common/tools.js';
Vue.use(tools, app)

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif