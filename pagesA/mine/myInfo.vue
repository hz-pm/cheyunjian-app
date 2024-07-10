<template>
	<view class="content">
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<view style="height: 30rpx;"></view>
				<view class="cell-v" style="padding-top: 20rpx;padding-bottom: 20rpx;">
					<image src="../../static/ic-default-avatar.png"
						style="width: 80rpx;height: 80rpx;margin-left: 45rpx;"></image>
					<view style="display: flex;flex-direction: column;align-items: flex-end;
					margin-right: 45rpx;">
						<text style="font-size: 30rpx;color: #333;">{{userinfo.nickName}}</text>
						<text style="font-size: 26rpx;color: #808080;margin-top: 10rpx;">ID:{{userinfo.userId}}</text>
					</view>
				</view>

				<view class="cell-v" style="margin-top: 25rpx;" @click="$refs.showBindPhonePop.open()">
					<text class="title">电话号码</text>
					<view class="right">
						<text>{{userinfo.phonenumber}}</text>
						<uni-icons type="right" color="#888" size="28rpx" style="margin-left: 10rpx;"></uni-icons>
					</view>
				</view>
				<view class="cell-v" style="margin-top: 2rpx;" @click="$refs.showBindEmailPop.open()">
					<text class="title">电子邮箱</text>
					<view class="right">
						<text>{{userinfo.email}}</text>
						<uni-icons type="right" color="#888" size="28rpx" style="margin-left: 10rpx;"></uni-icons>
					</view>
				</view>
				<view class="cell-v" style="margin-top: 25rpx;">
					<text class="title">企业名称</text>
					<view class="right">
						<text>{{userinfo.enterprise}}</text>
						<uni-icons type="right" color="#888" size="28rpx" style="margin-left: 10rpx;"
							v-if="false"></uni-icons>
					</view>
				</view>
				<navigator url="/pagesA/mine/baseCompany" class="cell-v" style="margin-top: 2rpx;">
					<text class="title">企业认证</text>
					<view class="right">
						<text style="background-color: #fff8ed;color: #f3a54f;border-color: rgba(243,165,79,.3);
						padding: 4rpx 8rpx;border-radius: 4rpx;font-size: 24rpx;border: 2rpx solid #ddd;"
						>{{userinfo.enterpriseCertification===1?'已认证':'未认证'}}</text>
						<uni-icons type="right" color="#888" size="28rpx" style="margin-left: 10rpx;"></uni-icons>
					</view>
				</navigator>

				<navigator url="/pagesB/reg/updatePassword" class="cell-v" style="margin-top: 25rpx;justify-content: center;">
					<text class="title" style="color: #333;">修改密码</text>
				</navigator>
				<view class="cell-v" style="margin-top: 25rpx;justify-content: center;" @click="clickLoginOut">
					<text class="title" style="color: #333;">退出登录</text>
				</view>
			</view>
		</scroll-view>
		
		<uni-popup ref="showBindPhonePop" @close="closeBindPhonePop" type="bottom">
			<view class="pop-v">
				<view class="title-v">
					<text class="title">绑定新手机</text>
					<uni-icons type="closeempty" size="38rpx" color="#AAA" style="margin-right: 30rpx;"
						@click="showBindEmailPop"></uni-icons>
				</view>
				<view class="pop-content">
					<text class="info">
						<image></image>应国家法律规定账号实名制的要求，请尽快绑定您的手机号码完成验证。
					</text>
					<view class="pop-input-v">
						<input placeholder="请填写手机号" border="none" font-size="30rpx" type="number"
							maxlength="11" v-model="phone"></input>
					</view>
					<view class="pop-input-v" style="display: flex;flex-direction: row;justify-content: space-between;
				padding-right: 20rpx;">
						<input placeholder="请输入验证码" border="none" font-size="30rpx" type="number"
							maxlength="6" v-model="code"></input>
						<text @click="getCode" style="font-size: 30rpx;color: #00acdd;">{{tips}}</text>
					</view>
					<button text="确认提交" class="btn" @click="bindPhone"></button>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="showBindEmailPop" @close="closeBindEmailPop" type="bottom">
			<view class="pop-v">
				<view class="title-v">
					<text class="title">设置邮箱</text>
					<uni-icons type="closeempty" size="38rpx" color="#AAA" style="margin-right: 30rpx;"
						@click="showBindEmailPop"></uni-icons>
				</view>
				<view class="pop-content">
					<view class="pop-input-v" style="margin-top: 0rpx;">
						<input placeholder="请输入电子邮箱" border="none" font-size="30rpx" v-model="email"></input>
					</view>
					<button class="btn">确认提交</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- <uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" confirmText="确定" :content='content' @confirm="confirmModal"></uni-popup-dialog>
		</uni-popup> -->
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import test from '../../utils/test/test.js'
	import {
		sendSms,
		bindPhoneNumber,
		bindEmail,
		getUserInfo
	} from '../../apis/modules/user';
	export default {
		components: {
			
		},
		data() {
			return {
				showBindPhonePop: '',
				showBindEmailPop:'',
				title:'提示',
				show:false,
				userinfo: {
				},
				tips: '获取验证码',
				phone:'',
				timer:null,
				canGetCode:true,
				code:'',
				email:''
			}
		},
		onLoad() {
			this.userinfo =  this.vuex_userinfo
			if(this.userinfo){
				this.phone = this.userinfo.phonenumber
				this.email = this.userinfo.email
			}
			
			// this.getUserInfo()
		},
		onunload() {
			if(this.timer){
				clearInterval(this.timer)
				this.timer = null
			}
		},
		methods: {
			closeBindPhonePop() {
				this.$refs.showBindPhonePop.close()
			},
			closeBindEmailPop(){
				this.$refs.showBindEmailPop.close()
			},
			clickLoginOut(){
				let that = this
				uni.showModal({
					title:'提示',
					content:'您确定要退出登录吗？',
					success(res) {
						if(res.confirm){
							console.log('=confirm=')
							
							uni.setStorageSync('TOKEN', '')
							that.$u.vuex('vuex_userinfo', '')
							that.$u.vuex('vuex_points_info','')
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}else if(res.cancel){
							console.log('=cancel=')
						}
					}
				})
			},
			getCode() {
				if(test.isEmpty(this.phone)){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if(!test.mobile(this.phone)){
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					})
					return
				}
				
				if (this.canGetCode) {
					sendSms({
						phoneNumber:this.phone,
						type:'bindPhone'
					}).then((res) => {
						console.log('sendSms', res)
						if(res.code === 200){
							uni.showToast({
								title: '验证码已发送',
								icon: 'none'
							})
							this.canGetCode = false
							let time = 60000
							//开始倒计时
							this.timer = setInterval(() => {
								//倒计时
								if(time <= 0){
									this.canGetCode = true
									this.tips = '重新获取'
									clearInterval(this.timer)
									this.timer = null;
									return
								}
								time-=1000
								this.tips = time / 1000 + 's后重新获取'
							}, 1000)
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '倒计时结束后再发送',
						icon: 'none'
					})
				}
			},
			bindPhone(){
				if (test.isEmpty(this.code)) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				this.$refs.showBindPhonePop.close()
				bindPhoneNumber({
					phoneNumber:this.phone,
					smsCode:this.code
				}).then((res) => {
					console.log('bindPhoneNumber', res)
					if(res.code == 200){
						uni.showToast({
							title: '绑定成功',
							icon: 'none'
						})
						
						this.getUserInfo()
					}
				})
			},
			bindEmail(){
				if (test.isEmpty(this.email)) {
					uni.showToast({
						title: '请输入邮箱',
						icon: 'none'
					})
					return
				}
				if (!test.email(this.email)) {
					uni.showToast({
						title: '请输入正确的邮箱格式',
						icon: 'none'
					})
					return
				}
				this.$refs.showBindEmailPop.close()
				bindEmail({
					email:this.email,
				}).then((res) => {
					console.log('bindEmail', res)
					if(res.code == 200){
						uni.showToast({
							title: '绑定成功',
							icon: 'none'
						})
						
						this.getUserInfo()
					}
				})
			},
			getUserInfo(){
				getUserInfo().then((res) => {
					console.log('getuserInfo', res)
					if(res.code === 200){
						this.$u.vuex('vuex_userinfo',res.data)
						this.userinfo = res.data
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
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
				color: #FFF;
				font-size: 30rpx;
			}
		}
	}
</style>