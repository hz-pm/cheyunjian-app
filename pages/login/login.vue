<template>
	<view class="content">
		
		
		<view class="top-v">
			<view style="height: 180rpx;"></view>
			<image src="../../static/logo-login.png" style="width: 200rpx;height: 220rpx;"></image>

			<view class="tab-v">
				<text class="tab-text" :class="selectTab == 0?'active-tab':''" @click="selectTab=0">手机快速登录</text>
				<text class="tab-text" :class="selectTab == 1?'active-tab':''" @click="selectTab=1">用户密码登录</text>
			</view>
		</view>


		<view class="form-v">
			<input placeholder="请输入手机号" font-size="28rpx" v-model="phone"
				style="background-color: #FFF;border-radius: 20rpx;width: 95%;padding: 20rpx;" border="none"
				type="tel"></input>

			<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
			background-color: #FFF;border-radius: 20rpx;margin-top: 40rpx;
			justify-content: space-between;" v-if="selectTab == 0">
				<input placeholder="请输入验证码" font-size="28rpx" v-model="code" type="number" maxlength="6" style="
					padding: 20rpx;" border="none">
				</input>
				<text @click="getCode" style="font-size: 26rpx;padding-right: 20rpx;color: #00acdd;">{{tips}}</text>
			</view>	

			<input placeholder="请输入密码" font-size="28rpx" v-model="pwd" password style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" v-if="selectTab == 1">
			</input>

			<view style="width: 90%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
			color: #00acdd;font-size: 26rpx;margin-top: 35rpx;align-self: center;" v-if="selectTab == 1">
				<navigator url="/pagesB/reg/updatePassword">忘记密码</navigator>
				<navigator url="/pagesB/reg/register">注册新账号</navigator>
			</view>

			<button class="btn"@click="login">登录</button>

			<checkbox-group
				style="display: flex;flex-direction: row;align-items: center;font-size: 26rpx;margin-top: 20rpx;"
				@change="checkboxChange">
				<checkbox value="cb1" :checked="checked"></checkbox>
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text @click="checkedCb">我已阅读并同意</text>
					<text @click="argeement(1)" style="color: #00acdd;">《用户服务协议》</text>
					<text @click="argeement(2)" style="color: #00acdd;">《隐私政策》</text>
				</view>
			</checkbox-group>

		</view>
	</view>
</template>

<script>
	import test from '../../utils/test/test.js'
	import {
		userLogin,
		loginByCode,
		getUserInfo,
		sendSms
	} from '../../apis/modules/user';
	export default {
		components: {
			
		},
		data() {
			return {
				phone: '17673040529',
				pwd: '123456',
				code: '',
				selectTab: 1,
				tips: '获取验证码',
				cbValue: 'cb1',
				checked: true,
				timer:null,
				canGetCode:true,
			}
		},
		options: {
		      styleIsolation: 'shared',
		},
		onunload() {
			if(this.timer){
				clearInterval(this.timer)
				this.timer = null
			}
		},
		methods: {
			login() {
				
				if (test.isEmpty(this.phone)) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (this.selectTab == 0) {
					if (test.isEmpty(this.code)) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none'
						})
						return
					}
				} else {
					if (test.isEmpty(this.pwd)) {
						uni.showToast({
							title: '请输入密码',
							icon: 'none'
						})
						return
					}
				}
				if (!this.checked) {
					uni.showToast({
						title: '请先阅读并同意协议',
						icon: 'none'
					})
					return
				}
				
				
				let that = this
				if (this.selectTab == 0) {
					loginByCode({
						phoneNumber:this.phone,
						smsCode:this.code,
					}).then((res) => {
						console.log('userLoginByCode', res)
						if(res.code === 200){
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
							//保存token
							// that.$u.vuex('vuex_token',res.token)
							uni.setStorageSync('TOKEN',res.token)
							//获取用户信息
							that.getUserInfo2()
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}else{
					userLogin({
						username:this.phone,
						password:this.pwd,
					}).then((res) => {
						console.log('userLogin', res)
						if(res.code === 200){
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
							//保存token
							// that.$u.vuex('vuex_token',res.token)
							uni.setStorageSync('TOKEN',res.token)
							//获取用户信息
							that.getUserInfo2()
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}
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
						type:'login'
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
			getUserInfo2(){
				getUserInfo().then((res) => {
					console.log('getuserInfo', res)
					if(res.code === 200){
						this.$u.vuex('vuex_userinfo',res.data)
						setTimeout(() => {
							uni.reLaunch({
								url:'/pages/main/main',
							})
						}, 500)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			checkboxChange(n) {
				// console.log('change', n);
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
					url:'/pagesB/reg/webView?type='+type,
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-v {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFF;
	}

	.form-v {
		width: 85%;
		margin-top: 55rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tab-v {
		width: 60%;
		display: flex;
		flex-direction: row;
		margin-top: 100rpx;
		align-items: center;
		height: 60rpx;
		justify-content: space-between;
		font-size: 30rpx;
		color: #111;

		.tab-text {
			height: 100%;
			border-bottom: 4rpx solid #FFF;
			color: #111;
		}

		.active-tab {
			border-bottom: 4rpx solid #00acdd;
			color: #00acdd;
		}
	}

	.btn {
		width: 100%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		color: #FFF;
		font-size: 32rpx;
	}
</style>