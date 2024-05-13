<template>
	<view class="content">
		<text style="width: 95%;font-size: 30rpx;color: #a6a6a6;padding-bottom: 20rpx;
		">总计获得400积分，已使用400积分</text>
		<view style="height: 1rpx;width: 95%;align-self: flex-end;background-color: #f5f5f5;"></view>
		
		<view style="width: 95%;display: flex;flex-direction: column;"
		v-for="(index,item) in list">
			<view style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
				<view style="display: flex;flex-direction: column;margin-top: 30rpx;margin-bottom: 30rpx;">
					<text style="font-size: 32rpx;color: #111;">查询车辆:LCOC7******274830</text>
					<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 10rpx;">2023-12-03 09:36:55</text>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-end;">
					<text style="font-size: 32rpx;color: #dc4144;font-weight: bold;">-60</text>
					<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 10rpx;">剩余168积分</text>
				</view>
			</view>
			<view style="height: 1rpx;width: 95%;align-self: flex-end;background-color: #f5f5f5;"></view>
		</view>
		<u-empty mode="data" icon="../../static/img-nodata.png" text="暂无数据" width="90rpx"
		style="margin-top: 40rpx;" v-if="isEmpty"></u-empty>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				isEmpty:false,
				list:['','','','','']
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {}

	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFF;
	}
	
</style>