<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="车智驾记录" defaultTextColor="#FFF"></cl-header>
		<view style="height: 89rpx;"></view>
		<view style="width: 100%;background: linear-gradient(180deg,#00acdd,#47ad13 150%);">
			<view style="display: flex;flex-direction: row;align-items: center;
			margin-left: 35rpx;margin-top: 20rpx;margin-bottom: 30rpx;">
				<image src="../../static/ic-car.png" style="width: 80rpx;height: 80rpx;background-color: #f1f1f1;
				border-radius: 15rpx;"></image>
				<view style="display: flex;flex-direction: column;color: #FFF;margin-left: 25rpx;">
					<text style="font-size: 30rpx;font-weight: bold;">大众汽车</text>
					<text style="font-size: 26rpx;margin-top: 15rpx;">VIN：SSVUD******022558</text>
				</view>
			</view>
		</view>
		
		<view style="width: 85%;display: flex;flex-direction: row;align-items: center;justify-content: space-around;">
			<text class="tab" :class="curIndex==1?'tab-active':''" @click="clickTab(1)">全部记录</text>
			<text class="tab" :class="curIndex==2?'tab-active':''" @click="clickTab(2)">免费版报告</text>
			<text class="tab" :class="curIndex==3?'tab-active':''" @click="clickTab(3)">专业版报告</text>
		</view>
		<view style="width: 100%;height: 20rpx;background-color: #f7fafa;"></view>
		<text style="width: 92%;font-size: 28rpx;color: #a6a6a6;
		border-bottom: 1px solid rgba(0,0,0,.1);line-height: 80rpx;">共有0条检测记录</text>
		
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
			<u-line color="#f5f5f5" hairline='false' style="width: 95%;align-self: flex-end;"></u-line>
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
				list:['','','','',''],
				curIndex:1,
			}
		},
		methods: {
			clickTab(index){
				this.curIndex = index;
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
		background-color: #FFF;
	}
	.tab{
		font-size: 30rpx;
		color: #333;
		line-height: 70rpx;
		border-bottom: 4rpx solid #FFF;
		margin-top: 10rpx;
	}
	.tab-active{
		font-weight: bold;
		color: #00acdd;
		border-bottom: 4rpx solid #00acdd;
	}
	
</style>