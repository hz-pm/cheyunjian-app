<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="修改密码" defaultTextColor="#FFF"></cl-header>
		
		<view style="height: 80rpx;"></view>
		
		<view style="width: 85%;margin-top: 55rpx;display: flex;flex-direction: column; align-items: center;">
			<u-input placeholder="请输入手机号" font-size="28rpx" v-model="account"
				style="background-color: #FFF;border-radius: 20rpx;width: 95%;padding: 20rpx;" border="none"
				type="number"></u-input>
				
			<u-input placeholder="请输入验证码" font-size="28rpx" v-model="code" type="number" style="background-color: #FFF;border-radius: 20rpx;
				margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
					<text @click="getCode" style="font-size: 26rpx;padding-right: 20rpx;color: #00acdd;">{{tips}}</text>
				</template>
			</u-input>
			
			<u-input placeholder="6-16位新密码区分大小写" password font-size="28rpx" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" maxlength="16">
			</u-input>
			
			<u-input placeholder="重复输入密码" password font-size="28rpx" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" maxlength="16">
			</u-input>
			
			<u-button text="确认提交" class="btn" color="#FFF" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				tips: '',
				account:''
			}
		},
		onLoad(op) {

		},
		methods: {
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
			submit(){
				
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
		background-color: #f5f5f5;
	}
	
	.btn {
		width: 100%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
	}
</style>