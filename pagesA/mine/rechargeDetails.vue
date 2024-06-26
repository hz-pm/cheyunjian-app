<template>
	<view class="content">
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">订单编号</text>
				<text style="color: #111;">{{detail.orderCode}}</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">购买积分</text>
				<text style="color: #111;">{{detail.qty}}</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">应付金额</text>
				<text style="color: #111;">{{detail.payable}}元</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">实付金额</text>
				<text style="color: #111;">{{detail.actuallyPaid}}元</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">优惠金额</text>
				<text style="color: #111;">{{detail.couponAmount}}元</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">支付方式</text>
				<text style="color: #111;">{{detail.payWay}}</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">支付单号</text>
				<text style="color: #111;">{{detail.payNo}}</text>
			</view>
			<view class="line"></view>
		</view>
		<view class="cell">
			<view class="cell-1">
				<text style="color: #a6a6a6;">支付时间</text>
				<text style="color: #111;">{{detail.payTime}}</text>
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
				detail:{},
			}
		},
		onLoad() {
			let that = this
			uni.$once('details', (data) => {
			      that.detail = data;
			    });
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