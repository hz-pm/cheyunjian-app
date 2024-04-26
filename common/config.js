const CONFIG = {
	// 开发环境配置
	development: {
		baseUrl: 'http://120.77.15.225:8086', //泰 -en -USDT
	},
	// 生产环境配置
	production: {
		baseUrl: 'http://120.77.15.225:8086',
	}
}
export default CONFIG[process.env.NODE_ENV];
