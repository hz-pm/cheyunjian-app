<template>
	<view class="content">
		<view style="width: 92%;margin-top: 55rpx;display: flex;flex-direction: column; align-items: center;">
			<input placeholder="请输入手机号" font-size="28rpx" v-model="phone"
				style="background-color: #FFF;border-radius: 20rpx;width: 95%;padding: 20rpx;" border="none"
				type="number"></input>
				
			<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
			background-color: #FFF;border-radius: 20rpx;margin-top: 40rpx;
			justify-content: space-between;">
				<input placeholder="请输入验证码" font-size="28rpx" v-model="code" type="number" maxlength="6" style="
					padding: 20rpx;" border="none">
				</input>
				<text @click="getCode" style="font-size: 26rpx;padding-right: 20rpx;color: #00acdd;">{{tips}}</text>
			</view>	
			
			<input placeholder="6-16位新密码区分大小写" password font-size="28rpx" v-model="pwd" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" maxlength="16">
			</input>
			
			<input placeholder="重复输入密码" password font-size="28rpx" v-model="pwd2" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" maxlength="16">
			</input>
			
			<button class="btn" @click="submit">确认提交</button>
		</view>
	</view>
</template>

<script>
	import test from '../../utils/test.js'
	import {
		sendSms,
		resetPwd
	} from '../../apis/modules/user';
	export default {
		data() {
			return {
				code: '',
				tips: '获取验证码',
				phone: '',
				pwd: '',
				pwd2: '',
				timer:null,
				canGetCode:true,
			}
		},
		onLoad(op) {

		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			submit(){
				if (test.isEmpty(this.phone)) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (test.isEmpty(this.code)) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				if (test.isEmpty(this.pwd)) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}
				if (test.isEmpty(this.pwd2)) {
					uni.showToast({
						title: '请再次输入密码',
						icon: 'none'
					})
					return
				}
				if(this.pwd !== this.pwd2){
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return
				}
				
				//缺少接口
				resetPwd({
					phoneNumber:this.phone,
					smsCode:this.code,
					newPassword:this.pwd
				}).then((res) => {
					console.log('resetPwd', res)
					if(res.code === 200){
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
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
						type:'resetPwd'
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
		color: #FFF;
		font-size: 32rpx;
	}
</style>