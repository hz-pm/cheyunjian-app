const CONFIG = {
	// 开发环境配置
	development: {
		baseUrl: 'http://192.168.9.57:8086',
		// baseUrl: 'https://api.xinnengyuanyunjian.top',
		baseImageUrl: 'https://api.xinnengyuanyunjian.top/profile/upload/images/',
		// 请求Header中token的KEY
		TOKEN_KEY: "Authorizationpas",
		PLATFORM: "pas",
		// 加载动画持续时间(ms)
		LOADING_DELAY: 500,
		phone: '17673040529',
		pwd: '123456',
	},
	// 生产环境配置
	production: {
		baseUrl: 'https://api.xinnengyuanyunjian.top',
		baseImageUrl: 'https://api.xinnengyuanyunjian.top/profile/upload/images/',
		// baseUrl: 'http://120.77.15.225:8086',
		// 请求Header中token的KEY
		TOKEN_KEY: "Authorizationpas",
		PLATFORM: "pas",
		// 加载动画持续时间(ms)
		LOADING_DELAY: 500,
	}
}
export default CONFIG[process.env.NODE_ENV];
