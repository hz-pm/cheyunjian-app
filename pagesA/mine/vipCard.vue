<template>
	<view class="content">
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;">
				<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background: linear-gradient(180deg,#00acdd,#47ad13 150%);">
					<view style="width: 92%;display: flex;flex-direction: row;align-items: center;margin-top: 40rpx;
					justify-content: space-between;">
						<view style="display: flex;flex-direction: row;align-items: center;margin-bottom: 50rpx;">
							<image src="../../static/ic-default-avatar.png" style="width: 120rpx;height: 120rpx;">
							</image>
							<view style="display: flex;flex-direction: column;margin-left: 35rpx;color: #FFF;">
								<text style="font-size: 30rpx;font-weight: bold;">{{userinfo.nickName}}</text>
								<text style="font-size: 26rpx;margin-top: 10rpx;">ID：{{userinfo.userId}}</text>
							</view>
						</view>
					</view>
				</view>

				<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;
				margin-top: -25rpx;background-color: #FFF;">
					<view style="width: 55%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
					margin-top: 30rpx;">
						<view style="width: 18%;height: 4rpx;background-color: #f5f5f5;"></view>
						<text style="font-size: 26rpx;color: #888;">请选择会员等级</text>
						<view style="width: 18%;height: 4rpx;background-color: #f5f5f5;"></view>
					</view>
				</view>

				<view class="vip-v">
					<view class="item-v" :class="vipIndex == 1?'item-select':''" @click="clickItem(1)">
						<view class="top">
							<image :src="vipIndex==1?'../../static/f-vip2.png':'../../static/f-vip2-grey.png'"
								style="width: 35rpx;height: 35rpx;"></image>
							<text class="top-t">VIP会员</text>
						</view>
						<view class="money-v">
							<text class="type">￥</text>
							<text class="money">199</text>
						</view>
						<text class="t-1">积分充值每满78减28</text>
						<view class="bottom-v">
							<text>封顶可减560元</text>
						</view>
					</view>

					<view class="item-v" :class="vipIndex == 2?'item-select':''" @click="clickItem(2)">
						<view class="top">
							<image
								:src="vipIndex==2?'../../static/vip-crown-2-fill.png':'../../static/vip-crown-2-fill-grey.png'"
								style="width: 35rpx;height: 35rpx;"></image>
							<text class="top-t">SVIP会员</text>
						</view>
						<view class="money-v">
							<text class="type">￥</text>
							<text class="money">399</text>
						</view>
						<text class="t-1">积分充值每满78减28</text>
						<view class="bottom-v">
							<text>无封顶限制</text>
						</view>
					</view>
				</view>

				<view class="info-v">
					<view style="width: 92%;display: flex;flex-direction: column;margin-top: 25rpx;">
						<text style="font-size: 28rpx;font-weight: bold;color: #00acdd;">会员权益说明</text>
						<view class="t-v">
							<view class="dot"></view>
							<text class="t">会员可享受积分充值每满78元减28元， VIP会员封顶最高可减560元， SVIP无封顶限制。</text>
						</view>
						<view class="t-v">
							<view class="dot"></view>
							<text class="t">会员有效期为购买后的1年， 会员最高可减额度已满或者有效期已过， 会员权益将会自动失效。 请购买后尽快充值积分进行优惠抵扣!</text>
						</view>
						<view class="t-v">
							<view class="dot"></view>
							<text class="t">VIP会员赠送300次电易估静态数据免费查询次数，SVIP赠送800次电易估静态数据免费查询次数，有效期1年。</text>
						</view>
						<view class="t-v">
							<view class="dot"></view>
							<text class="t">添加专属客服管家，参与会员专属活动，享受内部优惠！</text>
						</view>
						<view class="t-v">
							<view class="dot"></view>
							<text class="t">会员权益购买后不支持退款, 请慎重考虑!</text>
						</view>
					</view>
					<view style="height: 60rpx;"></view>
				</view>
				
				<button class="btn" @click="clickPay">立即购买</button>
				<checkbox-group style="display: flex;flex-direction: row;align-items: center;font-size: 26rpx;"
					@change="checkboxChange">
					<checkbox value="cb1" :checked="checked"></checkbox>
					<text @click="checkedCb" style="color: #111;font-size: 30rpx;">我已阅读并同意<span 
					style="color: #00acdd;" @click="argeement(3)">《VIP会员服务协议》</span></text>
				</checkbox-group>
				<view style="height: 80rpx;"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import test from '../../utils/test/test.js'
	import {
		getVip,
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				vipIndex: 1,
				checked:false,
				userinfo: {},
			}
		},
		onLoad() {
			this.userinfo =  this.vuex_userinfo
		},
		methods: {
			goSetting() {
				uni.$u.route({
					url: 'pages/mine/myInfo'
				})
			},
			clickItem(index) {
				this.vipIndex = index;
			},
			checkboxChange(e){
				if (n.detail.value.length > 0) {
					this.checked = true
				} else {
					this.checked = false
				}
			},
			checkedCb() {
				this.checked = !this.checked
			},
			argeement(type) {
				uni.navigateTo({
					url: '/pagesB/reg/webView?type=' + type
				})
			},
			clickPay(){
				if (!this.checked) {
					uni.showToast({
						title: '请先阅读并同意VIP会员协议',
						icon: 'none'
					})
					return
				}
				getVip({
					type:this.vipIndex
				}).then((res) => {
					console.log(res)
					
					uni.showToast({
						title:'购买成功！',
						icon:'success'
					})
				})
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

	.vip-v {
		width: 92%;
		display: flex;
		flex-direction: row;
		margin-top: 35rpx;
		justify-content: space-between;

		.item-v {
			width: 47%;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #808080;
			background: #f5f5f5;
			border-radius: 20rpx;

			.top {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 30rpx;

				.top-t {
					font-size: 30rpx;
					font-weight: bold;
					margin-left: 10rpx;
				}
			}

			.money-v {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 20rpx;

				.type {
					font-size: 40rpx;
					font-weight: bold;
					align-self: flex-end;
					margin-bottom: 5rpx;
				}

				.money {
					font-size: 70rpx;
					font-weight: bold;
					margin-left: 10rpx;
				}
			}

			.t-1 {
				font-size: 26rpx;
				margin-top: 10rpx;
			}

			.bottom-v {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				background: #e5e5e5;
				color: #808080;
				padding-top: 15rpx;
				padding-bottom: 15rpx;
				margin-top: 30rpx;
				border-bottom-left-radius: 20rpx;
				border-bottom-right-radius: 20rpx;

				text {
					width: 100%;
					font-size: 30rpx;
					text-align: center;
					font-weight: bold;
				}
			}
		}

		//激活
		.item-select {
			color: #FFF;
			background: linear-gradient(65deg, #ffc300, #ff5833);

			.bottom-v {
				background: linear-gradient(86deg, #ffeb3b, #ffc300);
				color: #333;
			}
		}
	}

	.info-v {
		width: 92%;
		background-color: #eef9fd;
		display: flex;
		flex-direction: column;
		margin-top: 35rpx;
		border-radius: 20rpx;
		align-items: center;

		.t-v {
			display: flex;
			flex-direction: row;
			font-size: 26rpx;
			color: #383838;
			margin-top: 30rpx;

			.dot {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				border: 4rpx solid #00acdd;
				margin-top: 6rpx;
			}
			.t {
				margin-left: 10rpx;
				width: 100%;
			}
		}
	}
	
	.btn {
		width: 90%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		color: #FFF;
		font-size: 32rpx;
	}
</style>