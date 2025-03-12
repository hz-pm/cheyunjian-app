<template>
	<view class="content">
		<view style="width: 92%;margin-top: 55rpx;display: flex;flex-direction: column; align-items: center;">
			<input placeholder="请输入手机号" font-size="28rpx" v-model="phone"
				style="background-color: #FFF;border-radius: 20rpx;width: 95%;padding: 20rpx;" border="none"
				type="tel" maxlength="11"></input>
			<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
			background-color: #FFF;border-radius: 20rpx;margin-top: 40rpx;
			justify-content: space-between;">
				<input placeholder="请输入验证码" font-size="28rpx" v-model="code" type="number" maxlength="6" style="
					padding: 20rpx;" border="none">
				</input>
				<text @click="getCode" style="font-size: 26rpx;padding-right: 20rpx;color: #30ad55;">{{tips}}</text>
			</view>	
			
			
			<input placeholder="6-16位新密码区分大小写" password font-size="28rpx" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" maxlength="16" v-model="pwd">
			</input>
			
			<input placeholder="重复输入密码" password font-size="28rpx" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" maxlength="16" v-model="pwd2">
			</input>
			
			<input placeholder="填写电子邮箱(选填)" font-size="28rpx" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" v-model="email">
			</input>
			
			<input placeholder="填写公司名称(选填)" font-size="28rpx" style="background-color: #FFF;border-radius: 20rpx;
			margin-top: 40rpx;width: 95%;padding: 20rpx;" border="none" v-model="company">
			</input>
			
			<checkbox-group
				style="display: flex;flex-direction: row;align-items: center;font-size: 26rpx;margin-top: 30rpx;"
				@change="checkboxChange">
				<checkbox value="cb1" :checked="checked"></checkbox>
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text @click="checkedCb">我已阅读并同意</text>
					<text @click="argeement(1)" style="color: #30ad55;">《用户服务协议》</text>
					<text @click="argeement(2)" style="color: #30ad55;">《隐私政策》</text>
				</view>
			</checkbox-group>
			
			<button class="btn" @click="submit">提交注册</button>
		</view>
	</view>
</template>

<script>
	import test from '../../utils/test/test.js'
	import {
		sendSms,
		phoneRegister,
	} from '../../apis/modules/user';
	export default {
		data() {
			return {
				phone:'',
				code: '',
				pwd:'',
				pwd2:'',
				email:'',
				company:'',
				tips: '获取验证码',
				account:'',
				cbValue:'cb1',
				checked:false,
				canGetCode:true,
				timer:''
			}
		},
		onLoad(op) {

		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(test.isEmpty(this.phone)){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				// if(!test.mobile(this.phone)){
				// 	uni.showToast({
				// 		title: '请输入正确手机号',
				// 		icon: 'none'
				// 	})
				// 	return
				// }
				
				if (this.canGetCode) {
					sendSms({
						phoneNumber:this.phone,
						type:'register'
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
			submit(){
				if(!this.checked){
					uni.showToast({
						title: '请先阅读并同意协议',
						icon: 'none'
					})
					return
				}
				if(test.isEmpty(this.phone)){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if(test.isEmpty(this.pwd)){
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return
				}if(test.isEmpty(this.pwd2)){
					uni.showToast({
						title: '请重复输入密码',
						icon: 'none'
					})
					return
				}if(this.pwd !== this.pwd2){
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return
				}if(test.isEmpty(this.code)){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return
				}
				
				phoneRegister({
					phone:this.phone,
					password:this.pwd,
					code:this.code,
					email:this.email,
					enterprise:this.company
				}).then((res) => {
					console.log('phoneRegister', res)
					if(res.code === 200){
						uni.showToast({
							title: '注册成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			checkboxChange(n){
				// console.log('change', n);
				if (n.detail.value.length > 0) {
					this.checked = true
				} else {
					this.checked = false
				}
			},
			checkedCb(){
				this.checked = !this.checked
			},
			argeement(type){
				console.log('argeement',type)
				uni.navigateTo({
					url:'/pagesB/reg/webView?type='+type,
				})
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
		background-color: #f5f5f5;
	}
	
	.btn {
		width: 100%;
		background: linear-gradient(135deg, #30ad55, #30ad55);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		color: #FFF;
		font-size: 32rpx;
	}
</style>