<template>
	<view class="content">
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<navigator url="/pagesA/mine/vipCard" style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #00acdd;">
					<image :src="baseImageUrl+'vip-banner.gif'" style="width: 90%;height: 110rpx;
					margin-top: 20rpx;"></image>
				</navigator>
				<text style="width: 90%; font-size: 30rpx;color: #a6a6a6;
				margin-top: 25rpx;margin-bottom: 25rpx;">选择积分数量充值，积分可用于抵扣车辆评估服务</text>

				<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #FFF;">
					<radio-group style="width: 100%; display: flex;flex-direction: column;align-items: center;"
							v-for="(item,index) in list" @change="radioChange" :key="item.qty">
							<view class="cell" @click="clickCell(item.qty,index)">
								<view class="c-left">
									<text class="c-jifen" v-if="index!=list.length-1">{{item.qty}}积分</text>
									<text class="shouchong" v-if="index==0">首单特惠</text>
									<input placeholder="请输入积分数量" v-if="index==list.length-1"
										type="number" color="#333" maxlength="10" v-model="inputPoints"
										@input="inputChange"></input>
								</view>
								<view class="c-right">
									<text class="c-money">￥{{item.price}}元</text>
									<radio :value="item.qty+''" :checked="index === current"></radio>
								</view>
							</view>
							<view class="line"></view>
					</radio-group>
					
					<view style="width: 90%;background-color: #ecfaff;border: 1px solid #d9f5ff;
					height: 70rpx;border-radius: 10rpx;margin-top: 45rpx;margin-bottom: 30rpx;
					display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
						<uni-icons type="info-filled" size="40rpx" color="#00acdd" style="margin-left: 25rpx;"></uni-icons>
						<text style="font-size: 30rpx;margin-left: 10rpx;color: #00acdd;">了解更多大客户优惠政策，请联系客服</text>
						<uni-icons type="right" size="40rpx" color="#00acdd" style="margin-right: 20rpx;"></uni-icons>
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
				
				<button class="btn" @click="clickPay">立即购买</button>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import test from '../../utils/test/test.js'
	import {
		rechargePoints,
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
					qty: '',
					price: '0.00'
				}],
				current:0,
				baseImageUrl:projectConfig.baseImageUrl,
				inputPoints:''
			}
		},
		methods: {
			clickCell(item,index){
				this.radioValue = item;
				this.current = index;
			},
			radioChange(res){
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].qty+'' === res.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			inputChange(e){
				if(test.isEmpty(e.detail.value)){
					this.list[5].price = "0.00"
				}else{
					this.list[5].price = e.detail.value
				}
				console.log(e)
			},
			clickPay(){
				let qty = this.list[this.current].qty
				if(this.current === 5){
					if(test.isEmpty(this.inputPoints)){
						uni.showToast({
							title: '请输入充值积分数',
							icon: 'none'
						})
						return
					}
					qty = this.inputPoints
				}
				
				
				rechargePoints({
					prodNo:'0001',
					qty:qty,
					payable:this.list[this.current].price,
					discount:'0',
					actuallyPaid:this.list[this.current].price,
				}).then((res) => {
					console.log(res)
					if(res.code === 200){
						uni.showToast({
							title: res.msg,
							icon: 'success'
						})
						
						setTimeout(() =>{
							uni.navigateBack()
						},1000)
					}
				})
				
				console.log('======='+this.current+">>>"+this.list[this.current].price)
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
		color: #FFF;
		font-size: 32rpx;
	}
</style>