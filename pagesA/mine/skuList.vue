<template>
	<view class="content">
		<navigator url="/pagesA/mine/vipCard" style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #57ca9e;">
			<image :src="baseImageUrl+'vip-banner.gif'" style="width: 90%;height: 110rpx;
					margin-top: 20rpx;"></image>
		</navigator>
		<text style="width: 90%; font-size: 28rpx;color: #a6a6a6;
				margin-top: 15rpx;">选择积分数量充值，积分可用于抵扣车辆评估服务</text>
		<text
			style="width: 90%; font-size: 28rpx;color: #a6a6a6;margin-bottom: 15rpx;">*积分原价：1元=1积分，平台以此为基础进行折扣计算</text>

		<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #FFF;">
			<radio-group style="width: 100%; display: flex;flex-direction: column;align-items: center;"
				v-for="(item,index) in list" :key="index">
				<view class="cell" @click="radioChange(item,index)">
					<view class="c-left">
						<text class="c-jifen" v-if="index!=list.length-1">{{item.qty}}积分</text>
						<text class="shouchong" v-if="index==0 && firstRecharge">首单特惠</text>
						<input placeholder="请输入积分数量" v-if="index==list.length-1" type="number" color="#333"
							maxlength="10" v-model="inputPoints" @input="inputChange"></input>
					</view>
					<view class="c-right">
						<text class="c-money">￥{{index !=5 ?item.price:(item.price*inputPoints).toFixed(2)}}元</text>
						<radio :value="item.qty+''" :checked="index === current"></radio>
					</view>
				</view>
				<view class="line"></view>
			</radio-group>

			<view style="width: 90%;background-color: #ecfaff;border: 1px solid #d9f5ff;
					height: 70rpx;border-radius: 10rpx;margin-top: 45rpx;margin-bottom: 30rpx;
					display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
				<uni-icons type="info-filled" size="40rpx" color="#30ad55" style="margin-left: 25rpx;"></uni-icons>
				<text style="font-size: 30rpx;margin-left: 10rpx;color: #30ad55;">了解更多大客户优惠政策，请联系客服</text>
				<uni-icons type="right" size="40rpx" color="#30ad55" style="margin-right: 20rpx;"></uni-icons>
				<button style="display: flex;flex-direction: column;align-items: center;border: none;background-color: #00000000;
				position: absolute;width: 90%;height: 70rpx;"
				type="default" plain="true" open-type="contact" size="default"></button>
			</view>
		</view>

		<view style="width: 100%;display: flex;flex-direction: row;
				align-items: center;justify-content: space-between;background-color: #FFF;
				margin-top: 20rpx;" v-if="vipInfo">
			<view style="display: flex;flex-direction: row;align-items: center;margin-left: 35rpx;
					margin-top: 35rpx;margin-bottom: 35rpx;">
				<image src="../../static/VIP.png" style="width: 90rpx;height: 35rpx;"></image>
				<text style="font-size: 30rpx;color: #a6a6a6;
						margin-left: 15rpx;">积分充值享58折优惠</text>
			</view>
			<view style="display: flex;flex-direction: row;align-items: center;" @click="openPop">
				<text style="font-size: 30rpx;color: #f73939;">{{isUseVip?syYh+' 元':'不使用优惠'}}</text>
				<uni-icons type="right" size="40rpx" color="#f73939"
					style="margin-left: 15rpx;margin-right: 35rpx;"></uni-icons>
			</view>
		</view>
		<view class="line"></view>
		<view style="width: 100%;display: flex;flex-direction: row;
				align-items: center;justify-content: space-between;background-color: #FFF;">
			<text style="font-size: 30rpx;color: #a6a6a6;
					margin-left: 35rpx;">支付方式</text>
			<image src="../../static/wxpay.png" style="width: 210rpx;height: 80rpx;
					margin-right: 35rpx;margin-top: 20rpx;margin-bottom: 20rpx;"></image>
		</view>

		<button class="btn" @click="clickPay">立即购买</button>


		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closePop" @open="openPop"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<view style="width: 90%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
				margin-top: 25rpx;">
					<view style="width: 20rpx;"></view>
					<text style="font-size: 32rpx;color: #333;">会员优惠</text>
					<uni-icons type="closeempty" size="40rpx" @click="closePop" style="padding: 5rpx;"></uni-icons>
				</view>
				<radio-group style="width: 100%;display: flex;flex-direction: column;align-items: center;
				margin-bottom: 45rpx;" @change="">
					<view class="pop-item-bg">
						<view style="width: 95%; display: flex;flex-direction: row;align-items: center;justify-content: space-between;
						margin-top: 35rpx;margin-bottom: 35rpx;">
							<view style="display: flex;flex-direction: row;align-items: center;">
								<view
									style="background: linear-gradient(177.22deg,#ffeb3b,#ffc300);border-radius: 10rpx;">
									<image src="../../static/f-vip2-black.png"
										style="width: 65rpx;height: 65rpx;margin: 20rpx;"></image>
								</view>
								<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
									<text style="font-size: 30rpx;font-weight: bold;color: #000;">积分充值享58折优惠</text>
									<text
										style="font-size: 28rpx;color: #ff8d1a;margin-top: 20rpx;">当前订单共计{{amount}}元，可减{{Math.abs(syYh)}}元</text>
								</view>
							</view>
							<radio value="r1" :checked="radioCur === 0"></radio>
						</view>
					</view>
					<view class="pop-item-bg">
						<view style="width: 95%; display: flex;flex-direction: row;
						margin-top: 35rpx;margin-bottom: 35rpx;justify-content: space-between;">
							<text>不使用会员优惠</text>
							<radio value="r2" :checked="radioCur === 1"></radio>
						</view>
					</view>
				</radio-group>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import test from '../../utils/test/test.js'
	import {
		rechargePoints,
		getPointsSkuList,
		getUserVipInfo
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				list: [],
				current: 0,
				baseImageUrl: projectConfig.baseImageUrl,
				inputPoints: '',
				radioCur: 0,
				syYh: 0, //优惠
				userinfo:null,
				vipInfo:null, //vip折扣信息
				isUseVip:false ,//是否使用优惠
				amount:0, //总金额
				firstRecharge:true, //首充优惠是否显示
			}
		},
		onLoad() {
			getPointsSkuList().then((res) => {
				console.log('>>>' + JSON.stringify(res)) 
				this.list = res.data
				this.userinfo =  this.vuex_userinfo
				if(this.userinfo){
					//首充优惠7.8折
					if(this.userinfo.firstRecharge != 1){
						this.firstRecharge = true;
						this.list[0].price = (this.list[0].price*0.78).toFixed(2)
					}else{
						this.firstRecharge = false;
					}
					
					//VIP用户优惠
					if(this.userinfo.vip > 0){
						//获取用户vip信息
						getUserVipInfo().then((res) => {
							// console.log(res)
							if(res.code === 200){
								this.isUseVip = true;
								//优惠 1元1积分  --- 原价300非会员优惠价234会员58折优惠  300 * 0.58 = 150元
								//优惠金额234 - 150 = 84元
								this.vipInfo = res.data
								this.syYh = this.getYhMoney(this.list[0].qty,this.list[0].price)
							}
						})
					}
				}else{
					this.firstRecharge = true;
					this.list[0].price = (this.list[0].price*0.78).toFixed(2)
				}
			})
		},
		methods: {
			radioChange(item,index) {
				this.current = index;
				if(index < 5){
					this.syYh = this.getYhMoney(item.qty,item.price)
					this.amount = item.price
				}else{
					this.syYh = this.getYhMoney(this.inputPoints,this.inputPoints)
					this.amount = this.inputPoints
				}
			},
			inputChange(e) {
				if (test.isEmpty(e.detail.value)) {
					this.inputPoints = '';
					this.syYh = 0;
					this.amount = 0
				}else{
					this.syYh = this.getYhMoney(this.inputPoints,this.inputPoints)
					this.amount = this.inputPoints
				}
			},
			clickPay() {
				let that = this;
				let id = this.list[this.current].id
				let qty = this.list[this.current].qty
				if (this.current === 5) {
					if (test.isEmpty(this.inputPoints)) {
						uni.showToast({
							title: '请输入充值积分数',
							icon: 'none'
						})
						return
					}
					qty = this.inputPoints
				}

				rechargePoints({
					prodId: id,
					qty: qty,
					useVip:this.isUseVip
				}).then((res) => {
					console.log(res)
					if (res.code === 200) {
						// 调用微信支付
						uni.requestPayment({
							  provider: 'wxpay',
							  timeStamp: res.data.timeStamp,
							  nonceStr: res.data.nonceStr,
							  package: res.data.package,
							  signType: res.data.signType,
							  paySign: res.data.paySign,
						  success(res) {
						    // 支付成功回调
						    console.log('===Success===>'+JSON.stringify(res))
							uni.showToast({
								icon:'success',
								title:'支付成功'
							})
							// setTimeout(() => {
							// 	uni.navigateBack()
							// }, 1000)
							
							//获取用户信息
							getUserInfo().then((res) => {
								// console.log('getuserInfo', res)
								if(res.code === 200){
									that.userinfo = res.data
									that.$u.vuex('vuex_userinfo',res.data)
								}else{
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							})
						  },
						  fail(err) {
						    // 支付失败回调
						    console.log('===Fail===>'+JSON.stringify(err))
							uni.showToast({
								icon:'fail',
								title:'支付失败'
							})
						  }
						})
					}
				})

				console.log('=======' + this.current + ">>>" + this.list[this.current].price)
			},
			closePop() {
				this.showPop = false
				this.$refs.popup2.close()
			},
			openPop() {
				this.showPop = true
				this.$refs.popup2.open()
			},
			yhRadioChange(evt) {
				if (evt.detail.value === 'r1') {
					this.radioCur = 0;
					this.isUseVip = true
					//重新计算优惠
					this.radioChange(this.list[this.current],this.current)
				} else {
					this.radioCur = 1;
					this.isUseVip = false
				}
				this.closePop()
			},
			getYhMoney(qty,price){
				//VIP才有优惠
				if(this.isUseVip){
					if(qty === '' || qty === '1'){
						return 0
					}
					//判断vip剩余可减金额
					let kj = parseFloat((qty * this.vipInfo.discountFactor) - price).toFixed(2);
					if(kj < this.vipInfo.realitylAmount){
						return kj;
					}
					//可减金额不足
					return 0;
				}
				return 0
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
		background: linear-gradient(135deg, #30ad55, #30ad55);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		color: #FFF;
		font-size: 32rpx;
	}

	.pop-item-bg {
		width: 95%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border: #dddddd solid 1rpx;
		border-radius: 15rpx;
		margin-top: 45rpx;
	}
</style>