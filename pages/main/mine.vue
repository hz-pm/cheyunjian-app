<template>
	<view class="content">
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			">
				<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background: linear-gradient(180deg,#00acdd,#47ad13 150%);">
					<view style="width: 92%;display: flex;flex-direction: row;align-items: center;margin-top: 40rpx;
					justify-content: space-between;">
						<view style="display: flex;flex-direction: row;align-items: center;">
							<image src="../../static/ic-default-avatar.png" style="width: 120rpx;height: 120rpx;">
							</image>
							<view style="display: flex;flex-direction: column;margin-left: 35rpx;color: #FFF;">
								<text style="font-size: 30rpx;font-weight: bold;">小程序用户</text>
								<text style="font-size: 26rpx;margin-top: 10rpx;">ID：946173477174890496</text>
							</view>
						</view>
						<uni-icons type="settings" color="#FFF" size="26" @click="goSetting"></uni-icons>
					</view>
					<navigator url="/pages/mine/vipCard" style="width: 92%;display: flex;flex-direction: row;align-items: center;justify-content: center;
					background-image: url('../../static/vip-menu-bg.png');background-repeat: no-repeat;background-size: 100% 100%;
					height: 80rpx;margin-top: 40rpx;border-top-left-radius: 15rpx;border-top-right-radius: 15rpx;">
						<view style="width: 92%; display: flex;flex-direction: row;align-items: center;
						justify-content: space-between;">
							<u-text prefix-icon="../../static/ic-VIP.png" text="升级车数万维VIP" size="28rpx" bold
								iconStyle='margin-right: 10rpx;'></u-text>
							<u-text suffixIcon="arrow-right" text="最高享全年5折" size="26rpx"
								iconStyle='margin-left: 5rpx;color:#000;font-size:26rpx;text-align:center;margin-top:8rpx'
								align="right"></u-text>
						</view>
					</navigator>
				</view>
				<navigator url="/pages/mine/baseCompany" style="width: 100%;height: 74rpx;color: #f3a54f;background: #fff8ed;text-align: center;font-size: 28rpx;z-index: 99;display: flex;flex-direction: column;
				justify-content: center;align-items: center;border-bottom: 1px solid rgba(243,165,79,.5);">
					<view style="display: flex;flex-direction: row;align-items: center;">
						<image src="../../static/safety_fill.png" style="width: 35rpx;height: 35rpx;"></image>
						<text style="font-size: 28rpx;margin-left: 5rpx;">申请企业认证，即可获得80积分</text>
						<uni-icons type="forward" color="#f3a54f" size="18"></uni-icons>
					</view>
				</navigator>

				<view style="width: 92%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
				margin-top: 25rpx;margin-bottom: 25rpx;">
					<navigator url="/pages/mine/bill" style="width: 33%;display: flex;flex-direction: column;align-items: center;
					border-right: 0.5px solid rgba(0,0,0,.1);">
						<text style="font-size: 32rpx;font-weight: bold;color: #00acdd;">13205</text>
						<text style="font-size: 28rpx;color: #808080;margin-top: 5rpx;">剩余积分</text>
					</navigator>
					<navigator url="/pages/mine/bill" style="width: 33%;display: flex;flex-direction: column;align-items: center;
					border-right: 0.5px solid rgba(0,0,0,.1);">
						<text style="font-size: 32rpx;font-weight: bold;color: #00acdd;">61790</text>
						<text style="font-size: 28rpx;color: #808080;margin-top: 5rpx;">已使用积分</text>
					</navigator>
					<navigator url="/pages/mine/recharge"
						style="width: 33%;display: flex;flex-direction: column;align-items: center;">
						<text style="font-size: 32rpx;font-weight: bold;color: #00acdd;">32416.5</text>
						<text style="font-size: 28rpx;color: #808080;margin-top: 5rpx;">总充值金额</text>
					</navigator>
				</view>
				<view style="width: 100%;height: 25rpx;background-color: #f5f5f5;"></view>

				<navigator url="/pages/mine/skuList" class="cell">
					<view class="cell-1">
						<view class="cell-1-left">
							<image src="../../static/ic-money-rmb.png" style="width: 60rpx;height: 60rpx;"></image>
							<text style="margin-left: 30rpx;">积分充值</text>
						</view>
						<u-icon name="arrow-right" color="#a6a6a6"></u-icon>
					</view>
					<u-line color="#f5f5f5" style="width: 84%;align-self: flex-end;" :hairline='false'></u-line>
				</navigator>

				<navigator url="/pages/mine/recharge" class="cell">
					<view class="cell-1">
						<view class="cell-1-left">
							<image src="../../static/ic-money-rmb.png" style="width: 60rpx;height: 60rpx;"></image>
							<text style="margin-left: 30rpx;">充值记录</text>
						</view>
						<u-icon name="arrow-right" color="#a6a6a6"></u-icon>
					</view>
					<u-line color="#f5f5f5" style="width: 84%;align-self: flex-end;" :hairline='false'></u-line>
				</navigator>

				<view style="width: 100%;height: 25rpx;background-color: #f5f5f5;"></view>
				<navigator url="/pages/mine/carRecord" class="cell">
					<view class="cell-1">
						<view class="cell-1-left">
							<image src="../../static/ic-money-rmb.png" style="width: 60rpx;height: 60rpx;"></image>
							<text style="margin-left: 30rpx;">车云检记录</text>
						</view>
						<u-icon name="arrow-right" color="#a6a6a6"></u-icon>
					</view>
					<u-line color="#f5f5f5" style="width: 84%;align-self: flex-end;" :hairline='false'></u-line>
				</navigator>
				<navigator url="/pages/mine/carRecord" class="cell">
					<view class="cell-1">
						<view class="cell-1-left">
							<image src="../../static/ic-money-rmb.png" style="width: 60rpx;height: 60rpx;"></image>
							<text style="margin-left: 30rpx;">电易估记录</text>
						</view>
						<u-icon name="arrow-right" color="#a6a6a6"></u-icon>
					</view>
					<u-line color="#f5f5f5" style="width: 84%;align-self: flex-end;" :hairline='false'></u-line>
				</navigator>
				<view style="width: 100%;height: 25rpx;background-color: #f5f5f5;"></view>

				<view style="display: flex;flex-direction: column;align-items: center;margin-top: 15rpx;
				margin-bottom: 15rpx;">
					<text style="font-size: 30rpx;color: #333;">客服咨询</text>
					<text style="font-size: 26rpx;color: #AAA;transform: scale(0.8);">工作日09:00-18:00</text>
				</view>
				<u-line color="#f5f5f5" :hairline='false'></u-line>

				<view style="width: 92%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
				margin-top: 25rpx;margin-bottom: 25rpx;">
					<view style="width: 50%;display: flex;flex-direction: column;align-items: center;"
						@click="clickKfPhone">
						<image src="../../static/ic-call-filled.png" style="width: 55rpx;height: 55rpx;"></image>
						<text style="font-size: 28rpx;color: #808080;margin-top: 5rpx;">电话咨询</text>
					</view>
					<view style="width: 1rpx;height: 90rpx;background-color: #f5f5f5;"></view>
					<view style="width: 50%;display: flex;flex-direction: column;align-items: center;"
					@click="onlineKefu">
						<image src="../../static/ic-msg.png" style="width: 55rpx;height: 55rpx;"></image>
						<text style="font-size: 28rpx;color: #808080;margin-top: 5rpx;">在线客服</text>
					</view>
				</view>
				<u-line color="#f5f5f5" :hairline='false'></u-line>

				<view style="height: 150rpx;"></view>
			</view>
		</scroll-view>

		<custom-tabbar :tabIndex="index1" @clickTabbar="clickTabbar"></custom-tabbar>
	</view>
</template>

<script>
	import customTabbar from "../../components/custom-tabbar/custom-tabbar.vue"
	import projectConfig from '@/common/config.js';
	import {
		getIndexContent,
	} from '../../apis/modules/user';
	export default {
		components: {
			customTabbar,
		},
		data() {
			return {
				index1: 2,
				phoneList: ['13316028972', '呼叫']
			}
		},
		methods: {
			clickTabbar(index) {
				let path = 'main'
				if (index == 0) {
					path = 'main'
				} else if (index == 1) {
					path = 'queryTramFiles'
				} else if (index == 2) {
					path = 'mine'
				}
				uni.switchTab({
					url: 'pages/main/' + path,
				})

				// uni.$u.route({
				// 	type:'tab',
				// 	url: 'pages/main/'+path,
				// })
			},
			goSetting() {
				uni.$u.route({
					url: 'pages/mine/myInfo'
				})
			},
			clickKfPhone() {
				let __this = this
				uni.showActionSheet({
					itemList: __this.phoneList,
					success: function(res) {
						uni.makePhoneCall({
							phoneNumber: __this.phoneList[0],
							success() {
								console.log('电话拨打成功');
							},
							fail(err) {
								console.error('电话拨打失败', err);
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			onlineKefu(){
				
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
		color: #FFF;
	}

	.cell {
		width: 100%;
		display: flex;
		flex-direction: column;
		color: #333;
		font-size: 32rpx;
		align-items: center;

		.cell-1 {
			width: 94%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-top: 20rpx;
			padding-bottom: 20rpx;

			.cell-1-left {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-left: 15rpx;
			}
		}
	}
</style>