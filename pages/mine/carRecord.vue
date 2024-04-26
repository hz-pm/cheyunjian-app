<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="车云检记录" defaultTextColor="#FFF"></cl-header>

		<view style="height: 89rpx;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;background-color: #FFF;">
			<u-search placeholder="搜索车架号" shape="square" style="margin: 20rpx 30rpx;"></u-search>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;background-color: #FFF;margin-top: 30rpx;">
			<text style="font-size: 28rpx;color: #a6a6a6;width: 95%;
					align-self: flex-end;margin-top: 20rpx;margin-bottom: 20rpx;">共有0条检测记录</text>
			<u-line color="#f5f5f5" hairline='false' style="width: 95%;align-self: flex-end;"></u-line>

			<view style="width: 100%;display: flex;flex-direction: column;align-items: center;"
			v-for="(index,item) in list">
				<view style="width: 95%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;"
				@click="clickItem(item)">
					<view style="display: flex;flex-direction: row;align-items: center;margin-top: 20rpx;
					margin-bottom: 20rpx;">
						<image src="../../static/img-car-jili.png" style="width: 110rpx;height: 110rpx;border-radius: 10rpx;"></image>
						<view style="display: flex;flex-direction: column;justify-content: flex-end;
						margin-left: 20rpx;">
							<text style="font-size: 32rpx;color: #111;">吉利汽车</text>
							<text style="font-size: 30rpx;color: #111;margin-top: 10rpx;">B378******185641</text>
							<text style="font-size: 26rpx;color: #a6a6a6;margin-top: 10rpx;">2023-12-05 17:04:56</text>
						</view>
					</view>
					
					<u-icon name="arrow-right" color="#a6a6a6" size="35rpx"></u-icon>
				</view>
				<u-line color="#f5f5f5" hairline='false' style="width: 95%;align-self: flex-end;"></u-line>
			</view>

			<u-empty mode="data" icon="../../static/img-nodata.png" text="暂无数据" width="90rpx"
				style="margin-top: 40rpx;" v-if="isEmpty"></u-empty>
		</view>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				list:['','','','','',''],
				isEmpty:false
			}
		},
		methods: {
			clickItem(item){
				uni.$u.route({
					url:'pages/main/detectionReport'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {}

	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5;
	}
</style>