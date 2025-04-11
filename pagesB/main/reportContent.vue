<template>
	<view class="content">
		
		<view class="webview-container">
		    <web-view :src="htmlContent" v-show="htmlContent != ''"></web-view>
		  </view>
		
		<view style="width: 100%;height: 50vh;display: flex;flex-direction: column;align-items: center;
		justify-content: center;" v-if="isEmpty">
			<image src="../../static/img-nodata.png" style="width: 120rpx;height: 160rpx;"></image>
			<text style="font-size: 32rpx;color: #888;margin-top: 25rpx;">暂无数据</text>
		</view>
	</view>
</template>

<script>
	import {
		getWbReport,
		getSgReport
	} from '../../apis/modules/user';
	
	export default {
		data() {
			return {
				htmlContent:'',
				isEmpty:false,
				isShare:0,
				checkId:0,
				type:2
			}
		},
		onLoad(op) {
			
			// eleCheck({
			// 	vinCode:this.vinCode,
			// 	requestIdType:this.companyType,
			// },{custom: {catch: true,}
			// }).then((res) => {
			// 	if(res.code === 200){
			// 		if(res.data){
			// 			//进入详情页
			// 			uni.navigateTo({
			// 				url:'/pagesB/main/newBattery?vinCode='+this.vinCode
			// 			})
			// 			return
			// 		}
			// 	}
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: res.msg,
			// 		showCancel:false,
			// 		success: function (res) {
			// 		}
			// 	});
			// });
			
			// export function eleCheck(params,config){
			// 	return http.post('/index/ele/eleCheck',params,config)
			// }
			this.isShare = op.isShare;
			this.checkId = op.checkId
			this.type = op.type
			
			if(op.checkId){
				if(op.type == 2){
					//车事故查询
					getSgReport({
						checkId:op.checkId,
						isShare:op.isShare,
						payOrderId:op.payOrderId?op.payOrderId:'0'
					},{catch: true}).then((res) => {
						console.log('=====获取报告====',res)
						if(res.code != 200){
							this.isEmpty = true;
							uni.hideShareMenu();
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel:false,
								success: function (res) {
									uni.navigateBack();
								}
							});
						}else{
							this.htmlContent = res.data.data
							uni.showShareMenu();
							// console.log('=========获取成功========'+res)
						}
					});
				}else{
					//车维保报告查询
					getWbReport({
						checkId:op.checkId,
						isShare:op.isShare,
						payOrderId:op.payOrderId?op.payOrderId:'0'
					},{catch: true}).then((res) => {
						console.log('=====获取报告====',res)
						if(res.code != 200){
							this.isEmpty = true;
							uni.hideShareMenu();
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel:false,
								success: function (res) {
									uni.navigateBack();
								}
							});
						}else{
							this.htmlContent = res.data.data
							uni.showShareMenu();
							// console.log('=========获取成功========'+res)
						}
					});
				}
			}else{
				this.isEmpty = true;
			}
		},
		methods: {
			onShareAppMessage() {
			  return {
			    path: `/pagesB/main/reportContent?checkId=${this.checkId}&type=${this.type}&isShare=1`,  // 携带参数
			  }
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.webview-container {
	  overflow: hidden;
	}
	::v-deep ::-webkit-scrollbar {
	  display: none !important;
	}
</style>