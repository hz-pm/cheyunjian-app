<template>
	<view class="content">
		<view v-html="htmlContent" v-if="htmlContent != ''" style="width: 100%;"></view>
		
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
				isEmpty:false
			}
		},
		onLoad(op) {
			if(op.checkId){
				if(op.type == 1){
					//车事故查询
					getSgReport({
						checkId:op.checkId,
					},{custom: {catch: true,}
					}).then((res) => {
						if(res.code != 200){
							console.log('=====获取报告失败===='+res.msg)
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel:false,
								success: function (res) {
									uni.navigateBack();
								}
							});
						}else{
							this.htmlContent = res.data.data.replace(/\n/g, '')
							// console.log('=========获取成功========'+res)
						}
					});
				}else{
					//车维保报告查询
					getWbReport({
						checkId:op.checkId,
					},{custom: {catch: true,}
					}).then((res) => {
						if(res.code != 200){
							console.log('=====获取报告失败===='+res.msg)
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel:false,
								success: function (res) {
									uni.navigateBack();
								}
							});
						}else{
							this.htmlContent = res.data.data.replace(/\n/g, '')
							// console.log('=========获取成功========'+res)
						}
					});
				}
			}else{
				this.isEmpty = true;
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	
</style>