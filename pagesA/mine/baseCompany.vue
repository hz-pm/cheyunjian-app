<template>
	<view class="content">
		<!-- 企业类型 -->
		<picker :range="typeColumns" @change="confirmTypeChange" class="input-v" :disabled="isAuth">
			<text>{{companyType===''?'选择企业类型':companyType}}</text>
		</picker>

		<view class="input-v">
			<input placeholder="填写企业全称(与营业执照一致)" border="none" font-size="30rpx" v-model="companyName" :disabled="isAuth"></input>
		</view>
		<view class="input-v" @click="selectAddress">
			<text>{{cityStr===''?'请选择企业所在地':cityStr}}</text>
		</view>
		<view class="input-v">
			<input placeholder="输入企业详细地址" border="none" font-size="30rpx" v-model="address" :disabled="isAuth"></input>
		</view>

		<view class="input-v" style="display: flex;position: relative;height: 300rpx;flex-direction: row;align-items: center;
				justify-content: center;" @click="openImagePage()">
			<view
				style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<uni-icons type="plusempty" color="#a6a6a6" size="70rpx"></uni-icons>
				<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 20rpx;">上传营业执照图片(5M以内)</text>
			</view>
			<image :src="pic" style="width: 98%;height: 98%;position: absolute;"></image>
		</view>
		<text style="font-size: 26rpx;color: #a6a6a6;margin-top: 20rpx;">本平台收集营业执照仅用于企业资质认证审核</text>

		<button class="btn" @click="submit" v-if="showBtn">提交认证</button>
		<view style="height: 50rpx;" v-if="!showBtn"></view>
		<view style="width: 90%;display: flex;flex-direction: column;font-size: 26rpx;color: #383838;line-height: 1.5;">
			<text style="font-weight: bold;">请仔细阅读如下说明，不符合条件的可能无法通过认证</text>
			<text>① 仅限新能源汽车、动力电池、数据服务相关企业；</text>
			<text>② 请填写与营业执照一致的企业类型与名称；</text>
			<text>③ 我们将在2个工作日内完成审核，请您耐心等候。</text>
		</view>

		<!-- 省市区选择 -->
		<uni-data-picker popup-title="" @change="onchange" @nodeclick="onnodeclick" :localdata="citysList"
			:map="{text:'name',value:'id'}" ref="cityPicker">
			<view></view>
		</uni-data-picker>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	const citysList = require('@/data/citysList.json')
	import test from '../../utils/test/test.js'
	import {
		certifiedEnterprise,
		getUserEnterprise
	} from '../../apis/modules/user';
	export default {
		components: {
			
		},
		data() {
			return {
				showAddressPop: true,
				typeColumns: ['汽车拆解厂', '汽配贸易商', '电池厂', '汽车维修厂', '售后服务商', '其他'],
				companyType: '',
				citysList: citysList,
				cityStr: '',
				pic: '',
				companyName: '',
				address: '',
				showBtn:true,
				isAuth:true
			}
		},
		onLoad() {
			getUserEnterprise().then((res) =>{
				console.log(res)
				if(res.code === 200 && res.data){
					this.companyType = res.data.enterpriseType;
					this.cityStr = res.data.location;
					this.address = res.data.address;
					this.companyName = res.data.enterpriseName;
					this.pic = res.data.businessLicense;
					
					this.showBtn = false
					this.isAuth = true;
				}else{
					this.isAuth = false;
				}
			})
		},
		methods: {
			closeBindPhonePop() {
				this.showBindPhonePop = false
			},
			closeBindEmailPop() {
				this.showBindEmailPop = false
			},
			confirmTypeChange(e) {
				this.companyType = this.typeColumns[e.detail.value]
				console.log(this.companyType)
			},
			onchange(e) {
				const value = e.detail.value
				this.cityStr = ''
				for (var i = 0; i < value.length; i++) {
					this.cityStr += value[i].text
				}
				console.log('===>' + this.cityStr)
			},
			onnodeclick(node) {

			},
			selectAddress() {
				if(this.isAuth){
					return
				}
				this.$refs.cityPicker.show()
			},
			submit(){
				if(test.isEmpty(this.companyType)){
					uni.showToast({
						title: '请选择企业类型',
						icon: 'none'
					})
					return
				}
				if(test.isEmpty(this.companyName)){
					uni.showToast({
						title: '请输入企业全称',
						icon: 'none'
					})
					return
				}
				if(test.isEmpty(this.cityStr)){
					uni.showToast({
						title: '请选择企业所在地',
						icon: 'none'
					})
					return
				}
				if(test.isEmpty(this.address)){
					uni.showToast({
						title: '请输入企业详细地址',
						icon: 'none'
					})
					return
				}
				if(test.isEmpty(this.pic)){
					uni.showToast({
						title: '请上传营业执照图片',
						icon: 'none'
					})
					return
				}
				
				certifiedEnterprise({
					enterpriseType: this.companyType,
					enterpriseName: this.companyName,
					location: this.cityStr,
					address: this.address,
					businessLicense: this.pic
				}).then((res) => {
					if(res.code == 200){
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 500)
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
				
			},
			openImagePage() {
				if(this.isAuth){
					return
				}
				
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						uni.showLoading({
							title: 'Loading...'
						});
						that.uploadImage(res.tempFilePaths)
					}
				});
			},
			uploadImage(tempFilePaths) {
				let _this = this;
				uni.uploadFile({
					url: projectConfig.baseUrl + '/index/user/uploadImg', //接口地址
					header: {
						"Authorization": _this.vuex_token,
					}, //请求token
					filePath: tempFilePaths[0],
					name: 'file',
					success: (res) => {
						uni.hideLoading();
						let data = JSON.parse(res.data);
						if(data.code == 200){
							_this.pic = data.data
						}
						console.log('===Upload===>' + JSON.stringify(res))
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {}

	.content {
		width: 100vw;
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

	.input-v {
		width: 90%;
		background-color: #FFF;
		border-radius: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 20rpx;
		margin-top: 30rpx;
	}

	.btn {
		width: 90%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		color: #FFF;
		font-size: 32rpx;
	}
</style>