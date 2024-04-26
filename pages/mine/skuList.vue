<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="积分充值" defaultTextColor="#FFF"></cl-header>
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<view style="height: 89rpx;"></view>
				<navigator url="/pages/mine/vipCard" style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #00acdd;">
					<image src="../../static/vip-banner.gif" style="width: 90%;height: 110rpx;
					margin-top: 20rpx;"></image>
				</navigator>
				<text style="width: 90%; font-size: 30rpx;color: #a6a6a6;
				margin-top: 25rpx;margin-bottom: 25rpx;">选择积分数量充值，积分可用于抵扣车辆评估服务</text>

				<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #FFF;">
					<u-radio-group v-model="radioValue" style="width: 100%; display: flex;flex-direction: column;align-items: center;"
							v-for="(item,index) in list">
							<view class="cell" @click="clickCell(item.qty)">
								<view class="c-left">
									<text class="c-jifen" v-if="index!=list.length-1">{{item.qty}}积分</text>
									<text class="shouchong" v-if="index==0">首单特惠</text>
									<u-input placeholder="请输入积分数量" v-if="index==list.length-1" border="none"
										type="number" color="#333" fontSize="32rpx" maxlength="10"></u-input>
								</view>
								<view class="c-right">
									<text class="c-money">￥{{item.price}}元</text>
									<u-radio :name="item.qty" size="45rpx"></u-radio>
								</view>
							</view>
							<view class="line"></view>
					</u-radio-group>
					
					<view style="width: 90%;background-color: #ecfaff;border: 1px solid #d9f5ff;
					height: 70rpx;border-radius: 10rpx;margin-top: 45rpx;margin-bottom: 30rpx;
					display: flex;flex-direction: row;justify-content: space-between;">
						<u-text text="了解更多大客户优惠政策，请联系客服" prefixIcon="info-circle-fill"
						 color="#00acdd" size="28rpx" :iconStyle="{color:'#00acdd',marginLeft:'20rpx',marginRight:'15rpx'}"></u-text>
						 <u-icon name="arrow-right" size="28rpx" color="#00acdd" style="margin-right: 20rpx;"></u-icon>
					</view>
				</view>
				
				<view style="width: 100%;display: flex;flex-direction: row;
				align-items: center;justify-content: space-between;background-color: #FFF;
				margin-top: 20rpx;">
					<text style="font-size: 30rpx;color: #a6a6a6;
					margin-left: 35rpx;">支付方式</text>
					<image src="../../static/wxpay.png" style="width: 210rpx;height: 80rpx;
					margin-right: 35rpx;margin-top: 20rpx;margin-bottom: 20rpx;"></image>
				</view>
				
				<u-button text="立即购买" class="btn" color="#FFF"></u-button>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {
		getDoOrder,
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				radioValue: 80,
				list: [{
					qty: 80,
					price: '30.00'
				}, {
					qty: 300,
					price: '234.00'
				}, {
					qty: 500,
					price: '390.00'
				}, {
					qty: 1000,
					price: '780.00'
				}, {
					qty: 2000,
					price: '1560.00'
				}, {
					qty: 1,
					price: '0.00'
				}]
			}
		},
		methods: {
			clickCell(item){
				this.radioValue = item;
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

	.cell {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;

		.c-left {
			display: flex;
			flex-direction: row;
			align-items: center;

			.c-jifen {
				font-size: 32rpx;
				font-weight: bold;
			}

			.shouchong {
				background-color: #fef0f0;
				color: #f56c6c;
				border-color: #fde2e2;
				font-size: 26rpx;
				padding: 5rpx 10rpx;
				border-radius: 5rpx;
				margin-left: 20rpx;
			}
		}

		.c-right {
			display: flex;
			flex-direction: row;
			align-items: center;

			.c-money {
				background-color: #fff8ed;
				color: #f3a54f;
				font-size: 28rpx;
				font-weight: bold;
				padding: 5rpx 10rpx;
				border-radius: 5rpx;
				margin-right: 30rpx;
				border: rgba(243, 165, 79, .3) solid 1rpx;
			}
		}
	}

	.line {
		width: 95%;
		align-self: flex-end;
		background-color: #f5f5f5;
		height: 3rpx;
	}
	
	.btn {
		width: 90%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
	}
</style>