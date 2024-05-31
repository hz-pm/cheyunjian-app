<template>
	<view class="content">
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">订单编号</text>
				<text style="color: #111;">B883517127928565760</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">购买积分</text>
				<text style="color: #111;">100</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">应付金额</text>
				<text style="color: #111;">30元</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">实付金额</text>
				<text style="color: #111;">30元</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">优惠金额</text>
				<text style="color: #111;">0元</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">支付方式</text>
				<text style="color: #111;">微信支付</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">支付单号</text>
				<text style="color: #111;">4200001814202307319324.</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">支付时间</text>
				<text style="color: #111;">2023-07-31 22:22:44</text>
			</view>
			<view class="line"></view>
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
				list: ['', '', '', '', '', ''],
				isEmpty: false
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5;
	}
	
	.cell{
		width: 100%;display: flex;flex-direction: column;align-items: center;background-color: #FFF;
		.cell-1{
			width: 95%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
			margin-top: 30rpx;margin-bottom: 30rpx;font-size: 30rpx;
			margin-left: 15rpx;
		}
	}
	.line{
		height: 1rpx;
		width: 95%;
		align-self: flex-end;
		background-color: #f5f5f5;
	}
</style>