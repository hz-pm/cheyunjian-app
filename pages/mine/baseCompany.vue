<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="企业认证" defaultTextColor="#FFF"></cl-header>
		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<view style="height: 105rpx;"></view>
				<view class="input-v" @click="showTypePop=true">
					<u-input placeholder="选择企业类型" border="none" disabled disabledColor='#FFF'
						v-model="companyType"></u-input>
				</view>
				<view class="input-v">
					<u-input placeholder="填写企业全称(与营业执照一致)" border="none" font-size="30rpx"></u-input>
				</view>
				<view class="input-v" @click="selectAddress">
					<u-input placeholder="请选择企业所在地" border="none" font-size="30rpx" disabled
						disabledColor='#FFF' v-model="cityStr"></u-input>
				</view>
				<view class="input-v">
					<u-input placeholder="输入企业详细地址" border="none" font-size="30rpx"></u-input>
				</view>

				<view class="input-v" style="display: flex;position: relative;height: 300rpx;flex-direction: row;align-items: center;
				justify-content: center;" @click="openImagePage()">
					<view
						style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<u-icon name="plus" color="#a6a6a6" size="70rpx"></u-icon>
						<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 20rpx;">上传营业执照图片(5M以内)</text>
					</view>
					<image :src="pic" style="width: 98%;height: 98%;position: absolute;"></image>
				</view>
				<text style="font-size: 26rpx;color: #a6a6a6;margin-top: 20rpx;">本平台收集营业执照仅用于企业资质认证审核</text>

				<u-button text="提交认证" class="btn" color="#FFF"></u-button>
				<view
					style="width: 90%;display: flex;flex-direction: column;font-size: 26rpx;color: #383838;line-height: 1.5;">
					<text style="font-weight: bold;">请仔细阅读如下说明，不符合条件的可能无法通过认证</text>
					<text>① 仅限新能源汽车、动力电池、数据服务相关企业；</text>
					<text>② 请填写与营业执照一致的企业类型与名称；</text>
					<text>③ 我们将在2个工作日内完成审核，请您耐心等候。</text>
				</view>
			</view>
		</scroll-view>
		
		<!-- 企业类型 -->
		<u-picker :show="showTypePop" :columns="typeColumns" @confirm="confirmType" @cancel="showTypePop=false"></u-picker>
		
		<!-- 省市区选择 -->
		<uni-data-picker popup-title="" @change="onchange" @nodeclick="onnodeclick"
					:localdata="citysList" :map="{text:'name',value:'id'}" ref="cityPicker">
							<view></view>
					</uni-data-picker>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	const citysList = require('@/data/citysList.json')
	import {
		getDoOrder,
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				showTypePop: false,
				showAddressPop: true,
				typeColumns: [
					['汽车拆解厂', '汽配贸易商', '电池厂', '汽车维修厂', '售后服务商', '其他']
				],
				companyType: '',
				citysList:citysList,
				cityStr:'',
				pic:''
			}
		},
		methods: {
			closeBindPhonePop() {
				this.showBindPhonePop = false
			},
			closeBindEmailPop() {
				this.showBindEmailPop = false
			},
			confirmType(e) {
				// console.log('confirm', e)
				this.showTypePop = false
				this.companyType = e.value
				console.log('=====>' + this.companyType)
			},
			onchange(e) {
				const value = e.detail.value
				this.cityStr = ''
				for (var i = 0; i < value.length; i++) {
					this.cityStr += value[i].text
				}
				console.log('===>'+this.cityStr)
			},
			onnodeclick(node) {
				
			},
			selectAddress(){
				this.$refs.cityPicker.show()
			},
			openImagePage() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						uni.showLoading({
							title: 'Uploading'
						});
						that.uploadImage(res.tempFilePaths)
					}
				});
			},
			uploadImage(tempFilePaths) {
				let _this = this;
				console.log('===***===>' + projectConfig.baseUrl)
			
				uni.uploadFile({
					url: projectConfig.baseUrl + '/web/upload/index', //接口地址
					header: {
						"Authorization": _this.vuex_token,
					}, //请求token
					filePath: tempFilePaths[0],
					name: 'file',
					success: (res) => {
						uni.hideLoading();
						let data = JSON.parse(res.data);
						_this.pic = data.name
						console.log('===*===>'+data.name)
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
	}
</style>