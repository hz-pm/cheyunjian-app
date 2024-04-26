<template>
	<view class="content">
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;
			width: 100vw;">
				<view style="background-color: aquamarine; width: 100%;">
					<view style="width: 100%;height: 90rpx;
					display: flex;flex-direction: row;align-items: center;justify-content: center;"
					:style="'background-color: '+list5[current].color">
						<image src="../../static/logo.png" style="width: 280rpx;height: 60rpx;"></image>
					</view>
					<u-swiper :list="list5" @change="e => current = e.current" height="350rpx"
					keyName="img" radius="0" indicator indicatorMode="dot" circular>
					</u-swiper>
				</view>
				
				<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #f7fafa;
				z-index: 1;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;margin-top: -15rpx;">
					<view style="width: 92%;display: flex;flex-direction: row;align-items: center;margin-top: 30rpx;
					justify-content: space-between;">
						<view style="display: flex;flex-direction: row;align-items: center;">
							<view style="width: 82rpx;height: 82rpx;border-radius: 50%;
							background: linear-gradient(135deg,#00acdd,#47ad13);box-shadow: 0 4rpx 20rpx 0 rgba(18,140,91,.3);
							text-align: center;line-height: 82rpx;">
								<uni-icons type="person" size="30" color="#FFF"></uni-icons>
							</view>
							<view style="display: flex;flex-direction: column;margin-left: 30rpx;">
								<text style="font-size: 30rpx;color: #111;font-weight: bold;">176****1654</text>
								<text style="font-size: 28rpx;color: #808080;
								margin-top: 8rpx;">您好，欢迎使用车数万维～</text>
							</view>
						</view>
						<view style="display: flex;flex-direction: column;align-items: center;">
							<text style="font-size: 32rpx;color: #00acdd;font-weight: bold;">13500</text>
							<text style="font-size: 26rpx;color: #808080;margin-top: 8rpx;">账户积分</text>
						</view>
					</view>
					
					<u-grid col="2" :border="false" style="width: 94%;margin-top: 35rpx;">
						<u-grid-item>
							<image src="../../static/home-menu1.png" style="width: 93%;height: 170rpx;
							border-radius: 20rpx;" @click="clickGrid(0)"></image>
						</u-grid-item>
						<u-grid-item>
							<image src="../../static/home-menu4.png" style="width: 93%;height: 170rpx;
							border-radius: 20rpx;" @click="clickGrid(1)"></image>
						</u-grid-item>
						<u-grid-item style="margin-top: 25rpx;" v-if="false">
							<image src="../../static/home-menu3.png" style="width: 93%;height: 170rpx;
							border-radius: 20rpx;" @click="clickGrid(2)"></image>
						</u-grid-item>
						<u-grid-item style="margin-top: 25rpx;">
							<image src="../../static/home-menu2.png" style="width: 93%;height: 170rpx;
							border-radius: 20rpx;" @click="clickGrid(3)"></image>
						</u-grid-item>
					</u-grid>
					
					<view style="width: 92%;background-color: #FFF;
					position: relative;box-shadow: 0 0 20rpx 0 rgba(0,0,0,.08);display: flex;
					height: 248rpx;border-radius: 20rpx;justify-content: center;align-items: center;margin-top: 35rpx;
					font-size: 28rpx;">
						<image style="height: 124rpx;width: 100%;position: absolute;bottom: 0;left: 0;
						background-image: url('../../static/bg-home-vip-bg.png'); background-size: 100% 100%; background-repeat: no-repeat;"></image>
						<navigator url="/pages/mine/vipCard" style="width: 50%;height: 100%;display: flex;flex-direction: column;align-items: center;
						position: relative;justify-content: center;border-right: 1px solid #e3eeee;">
							<text style="font-size: 35rpx;font-weight: bold;">VIP会员</text>
							<text style="color: #808080;margin-top: 5rpx;">最高享全年<span style="color: #ff8d1a;">5折优惠</span></text>
							<text style="width: 165rpx;color: #FFF;background: linear-gradient(136.25deg,#ffb300,#ff5833);
							border-radius: 65rpx;line-height: 65rpx;height: 65rpx;text-align: center;margin-top: 15rpx;">升级会员</text>
						</navigator>
						<navigator url="/pages/mine/skuList" style="width: 50%;height: 100%;display: flex;flex-direction: column;align-items: center;
						position: relative;justify-content: center;">
							<text style="font-size: 35rpx;font-weight: bold;">积分充值</text>
							<text style="color: #808080;margin-top: 5rpx;">积分可抵用全平台服务</text>
							<text style="width: 165rpx;color: #FFF;background: linear-gradient(135deg,#00acdd,#47ad13);
							border-radius: 65rpx;line-height: 65rpx;height: 65rpx;text-align: center;margin-top: 15rpx;">立即充值</text>
						</navigator>
					</view>
					
					<image src="../../static/img-home-bottom.png" style="width: 92%;height: 720rpx;border-radius: 20rpx;
					margin-top: 35rpx;"></image>
					
					<text style="width: 92%;font-size: 28rpx;transform: scale(0.8); color: #808080;text-align: center;margin-top: 40rpx;">Copyright © 2022 福建常岳新能源科技有限公司</text>
					
					<navigator url="/pages/mine/baseCompany" style="width: 100%;height: 74rpx;color: #f3a54f;background: #fff8ed;position: fixed;
					left: 0;right: 0;bottom: 100rpx;text-align: center;font-size: 28rpx;z-index: 99;display: flex;flex-direction: column;
					justify-content: center;align-items: center;" @click="goBaseCompany">
						<view style="display: flex;flex-direction: row;align-items: center;">
							<image src="../../static/safety_fill.png" style="width: 35rpx;height: 35rpx;"></image>
							<text style="font-size: 28rpx;margin-left: 5rpx;">申请企业认证，即可获得80积分</text>
							<uni-icons type="forward" color="#f3a54f" size="18"></uni-icons>
						</view>
					</navigator>
					<view style="height: 180rpx;"></view>
				</view>
			</view>
		</scroll-view>
		
		<custom-tabbar :tabIndex="index1" @clickTabbar="clickTabbar"></custom-tabbar>
	</view>
</template>

<script>
	import customTabbar from "../../components/custom-tabbar/custom-tabbar.vue"
	import {
		// getIndexContent,
	} from '../../apis/modules/user';
	export default {
		components: {
			customTabbar,
		},
		data() {
			return {
				index1: 0,
				current:0,
				list5: [
					{
						img:'../../static/img-banner.png',
						color:'#0298fe'
					},
					{
						img:'../../static/img-banner-2.png',
						color:'#f8ce95'
					}
				],
			}
		},
		onShow() {

		},
		onLoad(op) {
			// console.log('=========*1==========='+op.name)
			//获取首页信息
			// getIndexIndex().then((res) => { //   rules  event  faq   about_us
			// 	this.vipList = res.vip
			// 	this.$u.vuex('vuex_appname', res.appname)
			// 	this.$u.vuex('vuex_vipLevel', res.level + 1)
			// 	this.rates = res.rates;
			// 	// this.userName = res.username
			// 	res.vip.map((item, index) => {
			// 		if (res.level == item.level) {
			// 			this.vipList[index]['currentLevel'] = 1
			// 		} else {
			// 			this.vipList[index]['currentLevel'] = 0
			// 		}
			// 		if (res.level == item.level) {
			// 			// this.vipListDetails = item.details
			// 			this.vipName = item.name
			// 			// this.vipPic = item.pic
			// 		}
			// 	})
			// 	this.$u.vuex('vuex_vipList', res.vip)
			// })

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
				
				console.log(path+'========>' + index)
				uni.navigateTo({
					url: 'pages/main/' + path,
					type: 'tab'
				})
			},
			clickGrid(index){
				console.log('========>'+index)
				if(index == 0){
					uni.$u.route({
						url: 'pages/main/gainReport',
					})
				}else if(index == 1){
					this.clickTabbar(1)
				}else if(index == 3){
					uni.$u.route({
						url: 'pages/main/gainReportD',
					})
				}
			},
			goBaseCompany(){
				
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
	}

	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}
</style>