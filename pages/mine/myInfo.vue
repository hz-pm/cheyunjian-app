<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="个人设置" defaultTextColor="#FFF"></cl-header>
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<view style="height: 115rpx;"></view>
				<view class="cell-v" style="padding-top: 20rpx;padding-bottom: 20rpx;">
					<image src="../../static/ic-default-avatar.png"
						style="width: 80rpx;height: 80rpx;margin-left: 45rpx;"></image>
					<view style="display: flex;flex-direction: column;align-items: flex-end;
					margin-right: 45rpx;">
						<text style="font-size: 30rpx;color: #333;">小程序用户</text>
						<text style="font-size: 26rpx;color: #808080;margin-top: 10rpx;">ID:946173477174890496</text>
					</view>
				</view>

				<view class="cell-v" style="margin-top: 25rpx;" @click="showBindPhonePop=true">
					<text class="title">电话号码</text>
					<view class="right">
						<text>176****4564</text>
						<u-icon name="arrow-right" color="#888" size="28rpx" style="margin-left: 10rpx;"></u-icon>
					</view>
				</view>
				<view class="cell-v" style="margin-top: 2rpx;" @click="showBindEmailPop=true">
					<text class="title">电子邮箱</text>
					<view class="right">
						<text></text>
						<u-icon name="arrow-right" color="#888" size="28rpx" style="margin-left: 10rpx;"></u-icon>
					</view>
				</view>
				<view class="cell-v" style="margin-top: 25rpx;">
					<text class="title">企业名称</text>
					<view class="right">
						<text></text>
						<u-icon name="arrow-right" color="#888" size="28rpx" style="margin-left: 10rpx;"
							v-if="false"></u-icon>
					</view>
				</view>
				<navigator url="/pages/mine/baseCompany" class="cell-v" style="margin-top: 2rpx;">
					<text class="title">企业认证</text>
					<view class="right">
						<text style="background-color: #fff8ed;color: #f3a54f;border-color: rgba(243,165,79,.3);
						padding: 4rpx 8rpx;border-radius: 4rpx;font-size: 24rpx;border: 2rpx solid #ddd;">未认证</text>
						<u-icon name="arrow-right" color="#888" size="28rpx" style="margin-left: 10rpx;"></u-icon>
					</view>
				</navigator>

				<navigator url="/pages/reg/updatePassword" class="cell-v" style="margin-top: 25rpx;justify-content: center;">
					<text class="title" style="color: #333;">修改密码</text>
				</navigator>
				<view class="cell-v" style="margin-top: 25rpx;justify-content: center;" @click="show=true">
					<text class="title" style="color: #333;">退出登录</text>
				</view>
			</view>
		</scroll-view>

		<u-popup :show="showBindPhonePop" @close="closeBindPhonePop" mode="bottom">
			<view class="pop-v">
				<view class="title-v">
					<text class="title">绑定新手机</text>
					<u-icon name="close-circle-fill" size="38rpx" color="#AAA" style="margin-right: 30rpx;"
						@click="showBindPhonePop=false"></u-icon>
				</view>
				<view class="pop-content">
					<text class="info">
						<image></image>应国家法律规定账号实名制的要求，请尽快绑定您的手机号码完成验证。
					</text>
					<view class="pop-input-v">
						<u-input placeholder="请填写手机号" border="none" font-size="30rpx" type="number"
							maxlength="11"></u-input>
					</view>
					<view class="pop-input-v" style="display: flex;flex-direction: row;justify-content: space-between;
				padding-right: 20rpx;">
						<u-input placeholder="请输入验证码" border="none" font-size="30rpx" type="number"
							maxlength="6"></u-input>
						<text style="font-size: 30rpx;color: #00acdd;">获取验证码</text>
					</view>
					<u-button text="确认提交" class="btn" color="#FFF"></u-button>
				</view>
			</view>
		</u-popup>
		
		<u-popup :show="showBindEmailPop" @close="closeBindEmailPop" mode="bottom">
			<view class="pop-v">
				<view class="title-v">
					<text class="title">设置邮箱</text>
					<u-icon name="close-circle-fill" size="38rpx" color="#AAA" style="margin-right: 30rpx;"
						@click="showBindEmailPop=false"></u-icon>
				</view>
				<view class="pop-content">
					<view class="pop-input-v" style="margin-top: 0rpx;">
						<u-input placeholder="请输入电子邮箱" border="none" font-size="30rpx"></u-input>
					</view>
					<u-button text="确认提交" class="btn" color="#FFF"></u-button>
				</view>
			</view>
		</u-popup>
		
		
		<u-modal :show="show" :title="title" :content='content' closeOnClickOverlay
		showConfirmButton showCancelButton @cancel="show=false" @confirm="confirmModal" @close="show=false"></u-modal>
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
				showBindPhonePop: false,
				showBindEmailPop:false,
				title:'提示',
				content:'确定要退出登录吗？',
				show:false
			}
		},
		methods: {
			closeBindPhonePop() {
				this.showBindPhonePop = false
			},
			closeBindEmailPop(){
				this.showBindEmailPop = false
			},
			confirmModal(){
				this.show = false
				uni.$u.route({
					url:'pages/login/login'
				})
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

	.cell-v {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #FFF;
		justify-content: space-between;
		padding-top: 25rpx;
		padding-bottom: 25rpx;

		.title {
			margin-left: 45rpx;
			color: #808080;
			font-size: 30rpx;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 45rpx;
			font-size: 30rpx;
			color: #333;
		}
	}

	.pop-v {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5;
		.title-v {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			background-color: #FFF;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			.title {
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 35rpx;
				color: #707070;
			}
		}
		.pop-content {
			width: 90%;
			display: flex;
			flex-direction: column;
			margin-top: 35rpx;
			align-items: center;
			.info {
				font-size: 26rpx;
				color: #999;
				image {
					width: 35rpx;
					height: 35rpx;
					background-image: url('../../static/info-fill.png');
					background-repeat: no-repeat;
					background-size: 100% 100%;
					background-position-y: 5rpx;
					margin-right: 5rpx;
				}
			}
			.pop-input-v {
				width: 95%;
				background-color: #FFF;
				border-radius: 20rpx;
				padding-top: 20rpx;
				padding-bottom: 20rpx;
				padding-left: 20rpx;
				margin-top: 30rpx;
			}
			.btn {
				background: linear-gradient(135deg, #00acdd, #47ad13);
				margin-top: 45rpx;
				border-radius: 20rpx;
				margin-bottom: 35rpx;
			}
		}
	}
</style>