 export default {
	data() {
		return {
			share: {
				title: '一码速查电动汽车评估报告',
				path: '/pages/main/main',
				imageUrl: '/static/mp-share.png',  
			}
		}
	},
	// 分享给朋友
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
		}
	},
	// 分享到朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
		}
	},
}