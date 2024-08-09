<template>
	<view class="content">

		<view style="width: 100%;">
			<view style="width: 100%;height: 90rpx;
					display: flex;flex-direction: row;align-items: center;justify-content: center;"
				:style="'background-color: '+list5[current].color" v-if="false">
				<image src="../../static/logo.png" style="width: 280rpx;height: 60rpx;"></image>
			</view>
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" interval="4000" duration="500"
				style="width: 100%;height: 400rpx;" @change="swiperChange" indicator-color="rgba(0, 0, 0, .3)"
				indicator-active-color="#FFF">
				<swiper-item v-for="(item,index) in list5" :key="index">
					<view style="display: flex;width: 100%;height: 100%;">
						<image :src="item.img" style="width: 100%; height: 100%;"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
				background-color: #f7fafa;
				z-index: 1;border-top-left-radius: 20rpx;border-top-right-radius: 20rpx;margin-top: -15rpx;">
			<view style="width: 92%;display: flex;flex-direction: row;align-items: center;margin-top: 30rpx;
					justify-content: space-between;">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<view style="width: 82rpx;height: 82rpx;border-radius: 50%;
							background: linear-gradient(135deg,#30ad55,#47ad13);box-shadow: 0 4rpx 20rpx 0 rgba(18,140,91,.3);
							text-align: center;line-height: 82rpx;">
						<uni-icons type="person" size="30" color="#FFF"></uni-icons>
					</view>
					<view style="display: flex;flex-direction: column;margin-left: 30rpx;">
						<text style="font-size: 30rpx;color: #111;font-weight: bold;">{{userinfo.userName}}</text>
						<text style="font-size: 28rpx;color: #808080;margin-top: 8rpx;">您好，欢迎使用新能源云检～</text>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text style="font-size: 32rpx;color: #30ad55;font-weight: bold;">{{pointsInfo.realityQty?pointsInfo.realityQty:0}}</text>
					<text style="font-size: 26rpx;color: #808080;margin-top: 8rpx;">账户积分</text>
				</view>
			</view>

			<view style="width: 93%;display: flex;flex-direction: column;align-items: center; margin-top: 35rpx;">
				<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
						justify-content: space-between;height: 230rpx;">
					<image src="../../static/home-menu1.png" style="width: 100%;height: 100%;
							border-radius: 20rpx;" @click="clickGrid(0)"></image>
					<image src="../../static/home-menu2.png" style="width: 50%;height: 100%;
							border-radius: 20rpx;margin-left: 25rpx;" @click="clickGrid(3)" v-if="false"></image>
				</view>
				<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
						justify-content: space-between;margin-top: 25rpx;height: 190rpx;" v-if="false">
					<image src="../../static/home-menu3.png" style="width: 50%;height: 100%;
							border-radius: 20rpx;" @click="clickGrid(2)" v-if="false"></image>
					<image src="../../static/home-menu2.png" style="width: 50%;height: 100%;
							border-radius: 20rpx;" @click="clickGrid(3)"></image>
				</view>
			</view>

			<view style="width: 92%;background-color: #FFF;
					position: relative;box-shadow: 0 0 20rpx 0 rgba(0,0,0,.08);display: flex;
					height: 248rpx;border-radius: 20rpx;justify-content: center;align-items: center;margin-top: 35rpx;
					font-size: 28rpx;">
				<image
					class="vip-bg">
				</image>
				<navigator url="/pagesA/mine/vipCard" style="width: 50%;height: 100%;display: flex;flex-direction: column;align-items: center;
						position: relative;justify-content: center;border-right: 1px solid #e3eeee;">
					<text style="font-size: 35rpx;font-weight: bold;">VIP会员</text>
					<text style="color: #808080;margin-top: 5rpx;">最高享全年<span style="color: #ff8902;">58折优惠</span></text>
					<text style="width: 165rpx;color: #FFF;background: linear-gradient(136.25deg,#ffb300,#ff5833);
							border-radius: 65rpx;line-height: 65rpx;height: 65rpx;text-align: center;margin-top: 15rpx;">升级会员</text>
				</navigator>
				<navigator url="/pagesA/mine/skuList" style="width: 50%;height: 100%;display: flex;flex-direction: column;align-items: center;
						position: relative;justify-content: center;">
					<text style="font-size: 35rpx;font-weight: bold;">积分充值</text>
					<text style="color: #808080;margin-top: 5rpx;">积分可抵用全平台服务</text>
					<text style="width: 165rpx;color: #FFF;background: linear-gradient(135deg,#30ad55,#47ad13);
							border-radius: 65rpx;line-height: 65rpx;height: 65rpx;text-align: center;margin-top: 15rpx;">立即充值</text>
				</navigator>
			</view>

			<!-- <image src="../../static/mp-share.png" style="width: 92%;height: 520rpx;border-radius: 20rpx; -->
			<image :src="baseImageUrl+'img-home-bottom.webp'" style="width: 92%;height: 700rpx;border-radius: 20rpx;
					margin-top: 105rpx;"></image>
			<text
				style="width: 92%;font-size: 28rpx;transform: scale(0.8); color: #808080;text-align: center;margin-top: 35rpx;">Copyright
				© 2024 株洲云检新能源科技有限公司</text>
			<view style="height: 180rpx;"></view>
		</view>
		
		<navigator url="/pagesA/mine/baseCompany" style="width: 100%;height: 74rpx;color: #f3a54f;background: #fff8ed;position: fixed;
				left: 0;right: 0;bottom: 0rpx;text-align: center;font-size: 28rpx;z-index: 99;display: flex;flex-direction: column;
				justify-content: center;align-items: center;border-top: 1rpx solid #ffac52;" @click="goBaseCompany"
				v-if="false">
				<!-- v-if="userinfo.enterpriseCertification != 1"> -->
			<view style="display: flex;flex-direction: row;align-items: center;">
				<image src="../../static/safety_fill.png" style="width: 35rpx;height: 35rpx;"></image>
				<text style="font-size: 28rpx;margin-left: 5rpx;">申请企业认证，即可获得80积分</text>
				<uni-icons type="forward" color="#f3a54f" size="18"></uni-icons>
			</view>
		</navigator>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {
		getPointsInfo,
		getUserInfo
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				current: 0,
				list5: [{
						img: projectConfig.baseImageUrl+'img-banner.webp',
						color: '#57ca9e'
					}
					// ,{
					// 	img: projectConfig.baseImageUrl+'img-banner-2.webp',
					// 	color: '#f8ce95'
					// }
				],
				userinfo: {},
				pointsInfo:{},
				baseImageUrl:projectConfig.baseImageUrl
			}
		},
		onShow() {
			// if(this.userinfo){
			// 	//获取用户信息
			// 	getUserInfo().then((res) => {
			// 		// console.log('getuserInfo', res)
			// 		if(res.code === 200){
			// 			this.$u.vuex('vuex_userinfo',res.data)
			// 			this.userinfo = res.data
						
			// 			if(this.userinfo.vip > 0){
			// 				this.vipImg = 'f-vip2-black.png'
			// 			}
			// 		}else{
			// 			uni.showToast({
			// 				title: res.msg,
			// 				icon: 'none'
			// 			})
			// 		}
			// 	})
				
			// 	//获取用户积分信息
			// 	getPointsInfo().then((res) => {
			// 		console.log('=======>', res)
			// 		if (res.code == 200) {
			// 			this.pointsInfo = res.data
			// 			this.$u.vuex('vuex_points_info',res.data)
			// 		}
			// 	})
			// }
		},
		onLoad(op) {
			this.userinfo =  this.vuex_userinfo
			this.pointsInfo =  this.vuex_points_info
			
			// if(this.userinfo){
			// 	//获取用户积分信息
			// 	getPointsInfo().then((res) => {
			// 		console.log('=======>', res)
			// 		if (res.code == 200) {
			// 			this.pointsInfo = res.data
			// 			this.$u.vuex('vuex_points_info',res.data)
			// 		}
			// 	})
			// }
			console.log('>>',JSON.stringify(this.userinfo))
		},
		methods: {
			clickGrid(index) {
				console.log('========>' + index)
				if (index == 0) {
					uni.navigateTo({
						url: '/pagesB/main/gainReport',
					})
				} else if (index == 1) {
					uni.switchTab({
						url: '/pages/main/queryTramFiles',
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pagesB/main/gainReportD',
					})
				}
			},
			goBaseCompany() {

			},
			swiperChange(res) {
				this.current = res.detail.current
				// console.log('=========>'+JSON.stringify(res))
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.indicator {
		display: flex;
		flex-direction: row;
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
	
	.vip-bg{
		height: 124rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-image: url('../../static/bg-home-vip-bg.png'); 
		background-size: 100% 100%; 
		background-repeat: no-repeat;
	}
</style>