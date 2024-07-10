<template>
	<view class="content">
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
		<view class="vipTopBox">
			<view class="topBoxBg"></view>
			<view class="vipcardBox " style="filter: grayscale(0%);">
				<view class="vipH1">
					<text class="iconfont icon-VIP"></text>VIP会员
				</view>
				<view class="vipP">积分充值享5折优惠</view>
				<view class="iconRight iconfont  icon-VIP"></view>
				<view class="vipBottom">
					<view class="vipBottomBox">
						<view class="view">封顶可减额度：<text class="b">{{vipInfo.plantAmount}}元</text></view>
						<view class="view" style="text-align: right;">有效期至 {{vipInfo.vipEndTime}}</view>
						<view class="vipBottomBg"></view>
					</view>
				</view>
			</view>
			<view class="tit">积分充值优惠权益</view>
			<view class="statisticsList">
				<view class="list">
					<view class="h1">{{vipInfo.plantAmount - vipInfo.realitylAmount}}</view>
					<view class="p">当前已减金额</view>
				</view>
				<view class="list">
					<view class="h1" style="">{{vipInfo.realitylAmount}}</view>
					<view class="p">剩余可减额度</view>
				</view>
			</view>
			<view class="tit">电易估免费查询权益</view>
			<view class="statisticsList">
				<view class="list">
					<view class="h1">{{vipInfo.totalUseInterestsQty}}</view>
					<view class="p">已免费查询</view>
				</view>
				<view class="list">
					<view class="h1">{{vipInfo.totalFreeInterestsQty}}</view>
					<view class="p">剩余查询次数</view>
				</view>
			</view>
			<view class="bigService" style="margin-top: 0px;">
				<text class="iconfont icon-kefu" style="margin-left: 30rpx;"><text style="margin-left: 20rpx;font-size: 28rpx;">点击添加VIP客服，参与会员专属活动</text></text>
				<text class="iconfont icon-arrow" style="margin-right: 35rpx;"></text>
				<button style="display: flex;flex-direction: column;align-items: center;border: none;background-color: #00000000;
				position: absolute;width: 90%;height: 70rpx;"
				type="default" plain="true" open-type="contact" size="default"></button>
			</view>
		</view>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import test from '../../utils/test/test.js'
	import {
		getUserVipInfo
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				vipIndex: 0,
				checked: false,
				userinfo: {},
				vipInfo:''
			}
		},
		onLoad() {
			this.userinfo = this.vuex_userinfo
			
			getUserVipInfo().then((res) => {
				if(res.code === 200){
					this.vipInfo = res.data
				}
			})
		},
		methods: {

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

	.vipTopBox {
		width: 100%;
		position: relative;
		padding: 0 30rpx 30rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #111;

		.topBoxBg {
			background: linear-gradient(180deg, #3cad51, #fff);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 165rpx;
		}

		.vipcardBox {
			width: 93%;
			background: linear-gradient(87deg, #ffeb3b, #ffc400);
			box-shadow: 0 4rpx 20rpx 0 rgba(255, 207, 16, .5);
			position: relative;
			overflow: hidden;
			height: 335rpx;
			border-radius: 20rpx;
			padding: 36rpx;
			box-sizing: border-box;
			margin-bottom: 30rpx;
			.vipH1{
				font-size: 48rpx;
				font-weight: bold;
				margin-bottom: 4rpx;
				.iconfont{
					font-size: 48rpx;
					margin-right: 12rpx;
				}
			}
			.vipP{
				font-size: 26rpx;
			}
			.iconRight{
			    position: absolute;
			    right: -40rpx;
			    top: 75rpx;
			    font-size: 230rpx;
			    color: #fff;
			    opacity: 0.26;
			}
			.vipBottom{
				position: absolute;
				left: 0;
				bottom: 0;
				height: 98rpx;
				width: 100%;
				.vipBottomBox{
				    position: relative;
				    display: flex;
				    align-items: center;
				    padding: 0 36rpx;
				    box-sizing: border-box;
				    height: 98rpx;
				    justify-content: space-between;
					.view{
					    width: 49.5%;
					    font-size: 26rpx;
						.b{
							font-weight: bold;
						}
					}
					.vipBottomBg{
					    top: 0;
					    left: 0;
					    width: 100%;
					    height: 98rpx;
					    position: absolute;
					    background: hsla(0, 0%, 100%, 0.16);
					}
				}
			}
		}
		
		.tit{
			width: 92%;
		    height: 62rpx;
		    line-height: 62rpx;
		    font-size: 32rpx;
		    color: #383838;
		    font-weight: bold;
		}
		.tit::before{
			content: "";
			display: inline-block;
			height: 36rpx;
			background: linear-gradient(180deg, #00acdd, #47ad13);
			width: 12rpx;
			vertical-align: -6rpx;
			margin-right: 10px;
			border-radius: 10rpx;
		}
		.statisticsList {
		    display: flex;
		    margin-bottom: 24rpx;
		    padding: 10rpx 0;
		    background-color: #fff;
		    width: 93%;
		    box-sizing: border-box;
			.list{
			    border: none;
			    border-radius: 10rpx;
			    margin-right: 20rpx;
			    background: #f0fafa;
			    padding: 20rpx 0;
				flex: 1;
				text-align: center;
				.h1{
				    color: #ff8d1a;
				    margin-bottom: 10rpx;
					font-size: 36rpx;
					font-weight: bold;
				}
				 .p {
				    color: #808080;
				    font-size: 24rpx;
				    line-height: 1.6;
				}
			}
		}
		.bigService {
		    margin-top: 20rpx;
		    width: 92%;
		    font-size: 26rpx;
		    height: 66rpx;
		    line-height: 66rpx;
		    border-radius: 10rpx;
		    background: #ecfaff;
		    color: #00acdd;
		    border: 1rpx solid #d9f5ff;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>