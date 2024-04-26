<template>
	<view class="content">
		<cl-header backgroundColor="#FFF" title="登录车数万维" defaultTextColor="#111"></cl-header>

		<view class="top-v">
			<view style="height: 180rpx;"></view>
			<image src="../../static/logo-login.png" style="width: 200rpx;height: 220rpx;"></image>

			<view class="tab-v">
				<text class="tab-text" :class="selectTab == 0?'active-tab':''" @click="selectTab=0">手机快速登录</text>
				<text class="tab-text" :class="selectTab == 1?'active-tab':''" @click="selectTab=1">用户密码登录</text>
			</view>
		</view>


		<view class="form-v">
			<u-input placeholder="请输入手机号" font-size="28rpx" v-model="account" prefix-icon="account"
				style="background-color: #FFF;border-radius: 20rpx;width: 95%;padding: 20rpx;" border="none"
				type="number"></u-input>

			<u-input placeholder="请输入验证码" font-size="28rpx" v-model="code" type="number" prefix-icon="lock" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" v-if="selectTab == 0">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
					<text @click="getCode" style="font-size: 26rpx;padding-right: 20rpx;color: #00acdd;">{{tips}}</text>
				</template>
			</u-input>

			<u-input placeholder="请输入密码" font-size="28rpx" v-model="password" password prefix-icon="lock" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;height: 100rpx;" border="none" v-if="selectTab == 1">
			</u-input>

			<view style="width: 90%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
			color: #00acdd;font-size: 26rpx;margin-top: 35rpx;align-self: center;" v-if="selectTab == 1">
				<navigator url="/pages/reg/updatePassword">忘记密码</navigator>
				<navigator url="/pages/reg/register">注册新账号</navigator>
			</view>

			<u-button text="登录" class="btn" color="#FFF" @click="login"></u-button>

			<u-checkbox-group style="display: flex;flex-direction: row;align-items: center;font-size: 26rpx;"
				v-model="cbValue" @change="checkboxChange">
				<u-checkbox shape="circle" name="cb1" :checked="checked"></u-checkbox>
				<text @click="checkedCb">我已阅读并同意<span style="color: #00acdd;" @click="argeement(1)">《用户服务协议》</span><span
						style="color: #00acdd;" @click="argeement(2)">《隐私政策》</span></text>
			</u-checkbox-group>

		</view>
	</view>
</template>

<script>
	// import dotlottiePlayer from '../../node_modules/dotlottie/dotlottie-player.js'
	import {
		userLogin,
	} from '../../apis/modules/user';
	export default {
		data() {
			return {
				account: '',
				password: '',
				code: '',
				selectTab: 0,
				tips: '',
				cbValue: 'cb1',
				checked: false
			}
		},
		options: {
		      styleIsolation: 'shared',
		},
		methods: {
			changeLanguage() {
				let __this = this
				uni.showActionSheet({
					itemList: __this.langList,
					success: function(res) {
						//切换语言
						let oldLang = uni.getLocale(langs)
						let langs = "en"
						if (res.tapIndex == 0) {
							langs = "en"
						} else if (res.tapIndex == 1) {
							langs = "ms"
						} else if (res.tapIndex == 2) {
							langs = "ja"
						} else if (res.tapIndex == 3) {
							langs = "th"
						} else if (res.tapIndex == 4) {
							langs = "zh-Hant"
						}
						if (oldLang == langs)
							return false
						localStorage.setItem('locale', langs);
						uni.setLocale(langs)
						__this.$i18n.locale = langs
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			login() {
				// if (uni.$u.test.isEmpty(this.account)) {
				// 	this.$u.toast('请输入手机号')
				// 	return
				// }
				// if (!uni.$u.test.mobile(this.account)) {
				// 	this.$u.toast('请输入正确的手机号')
				// 	return
				// }
				// if (this.selectTab == 0) {
				// 	if (uni.$u.test.isEmpty(this.code)) {
				// 		this.$u.toast('请输入验证码')
				// 		return
				// 	}
				// } else {
				// 	if (uni.$u.test.isEmpty(this.password)) {
				// 		this.$u.toast('请输入密码')
				// 		return
				// 	}
				// }

				// if (!this.checked) {
				// 	this.$u.toast('请先阅读并同意协议')
				// 	return
				// }


uni.$u.route({
							type: 'reLaunch',
							url: 'pages/main/main'
						})
				// 登录逻辑
				// userLogin({
				// 	tel: this.account,
				// 	pwd: this.password,
				// }).then((res) => {
				// 	this.$u.vuex('vuex_token', res.token)
				// 	if (this.cbCheck == true) {
				// 		uni.setStorageSync('tel', this.account);
				// 		uni.setStorageSync('userPwd', this.password);
				// 	}
				// 	uni.showToast({
				// 		title: this.$tc('login.success'),
				// 		icon: 'success'
				// 	});
				// 	setTimeout(function() {
				// 		uni.$u.route({
				// 			type: 'reLaunch',
				// 			url: 'pages/main/main'
				// 		})

				// 	}, 1000)
				// })
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			checkboxChange(n) {
				console.log('change', n);
				if (n.length > 0) {
					this.checked = true
				} else {
					this.checked = false
				}
			},
			checkedCb() {
				this.checked = !this.checked
			},
			argeement(type) {
				uni.$u.route({
					url: 'pages/reg/webview',
					params: {
						type: type
					}
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
	}
</style>