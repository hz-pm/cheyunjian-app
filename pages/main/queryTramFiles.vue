<template>
	<view class="content" @touchmove.stop.prevent="disabledScroll">

		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<view style="width: 100%;background-image: url('../../static/top-bg.png');background-repeat: no-repeat;
				background-size: 100% 400rpx;display: flex;flex-direction: column;align-items: center;">
					<view style="width: 90%;display: flex;flex-direction: row;align-items: center;
					margin-top: 40rpx;justify-content: space-between;">
						<view style="width: 62%; display: flex;flex-direction: column;color: #FFF;">
							<text style="font-size: 38rpx;font-weight: bold;">车智驾</text>
							<text
								style="font-size: 28rpx;opacity: 0.8;margin-top: 15rpx;">添加您的车辆，查询用车报告，电池健康，用车习惯一目了然，为您提供智能用车、维保建议。</text>
						</view>
						<image src="../../static/top-icon3.png" style="width: 220rpx;height: 220rpx;"></image>
					</view>

					<view style="width: 90%;"
						v-for="(item,index) in list">
						<view style="width: 100%;background-color: #FFF;border-radius: 20rpx;display: flex;flex-direction: column;
						align-items: center;margin-top: 25rpx;box-shadow: 0 0 20px 0 rgba(0,0,0,.1);">
							<view style="width: 93%;display: flex;flex-direction: row;
						align-items: center;justify-content: space-between;margin-top: 35rpx;margin-bottom: 30rpx;">
								<view style="display: flex;flex-direction: row;align-items: center;">
									<image src="../../static/ic-car.png" style="width: 90rpx;height: 90rpx;"></image>
									<view style="display: flex;flex-direction: column;margin-left: 25rpx;">
										<text style="font-size: 30rpx;color: #111;font-weight: bold;">大众汽车</text>
										<text
											style="font-size: 26rpx;color: #a6a6a6;margin-top: 5rpx;">VIN:SSVUD******022558</text>
									</view>
								</view>
								<u-icon name="edit-pen" color="#a6a6a6" size="50rpx" @click="clickEditCar(item)"></u-icon>
							</view>
							<u-line color="#DDD"></u-line>
							<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
							text-align: center; font-size: 28rpx;font-weight: bold;">
								<navigator url="/pages/mine/fiesRecord" style="width: 49%;color: #808080;padding-top: 20rpx;padding-bottom: 20rpx;">历史记录</navigator>
								<view style="width: 1rpx;height: 35rpx;background-color: #DDD;"></view>
								<text style="width: 49%;color: #ff8d1a;padding-top: 20rpx;padding-bottom: 20rpx;" @click="openInquirePop">获取报告</text>
							</view>
						</view>
					</view>

					<view style="width: 90%;display: flex;flex-direction: row;align-items: center;
					box-shadow: 0 0 20px 0 rgba(0,0,0,.1);background-color: #FFF;box-sizing: border-box;border-radius: 20rpx;margin-top: 30rpx;
					padding: 24rpx 0;" @click="clickAddMyCar">
						<u-icon name="plus" color="#FFF" size="20" bold style="height: 95rpx;background-color: #dae8e8;line-height: 90rpx;
						border-radius: 10rpx;text-align: center;padding-left: 28rpx;padding-right: 28rpx;
						margin-left: 25rpx;"></u-icon>
						<view style="display: flex;flex-direction: column;justify-content: center;
							margin-left: 30rpx;">
							<text style="font-size: 30rpx;font-weight: bold;color: #111;">添加我的车辆</text>
							<text style="font-size: 28rpx;color: #808080;margin-top: 5rpx;">立即查询我的用车报告</text>
						</view>
					</view>
					<view style="width: 90%;display: flex;flex-direction: row;justify-content: space-between;color: #383838;
					font-size: 26rpx;margin-top: 30rpx;">
						<view style="display: flex;flex-direction: row;align-items: center;">
							<text>积分余额：0</text>
							<navigator url="/pages/mine/skuList" style="margin-left: 35rpx;">
								<u-text prefix-icon="../../static/money-rmb.png" text="充值" color="#00acdd"
									size="26rpx"></u-text>
							</navigator>
						</view>

						<view style="display: flex;flex-direction: row;align-items: center;">
							<navigator url="/pages/mine/question">
								<u-text prefix-icon="../../static/question-circle.png" text="常见问题" color="#383838"
									size="26rpx" style="margin-left: 35rpx;"></u-text>
							</navigator>
							<view
								style="height: 20rpx;width: 1rpx;background-color: #ccc;margin-left: 20rpx;margin-right: 20rpx;">
							</view>
							<text @click="open">版本区别</text>
						</view>
					</view>
					<view style="height: 150rpx;"></view>
				</view>
			</view>
		</scroll-view>

		<uni-popup ref="popup" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close" @open="open"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 80vh;">
				<text
					style="font-size: 30rpx;color: #111;font-weight: bold;margin-top: 15rpx;margin-bottom: 15rpx;">版本区别</text>
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;height: 1500rpx;display: flex;flex-direction: column;align-items: center;">
						<image src="../../static/img-v-q.png" style="width: 700rpx;height: 1500rpx;"></image>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<u-modal :show="showModal" :content='content' confirmText="我知道了" @confirm="confirmModal"></u-modal>

		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeAddCar" @open="openAddCar"
			background-color="#FFF">
			<view style="height: 90vh;">
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;display: flex;flex-direction: column;align-items: center;">
						<view style="width: 100%;background-color: #FFF;display: flex;flex-direction: row;align-items: center;
						justify-content: space-between;padding-top: 20rpx;padding-bottom: 20rpx;">
							<text style="font-size: 32rpx;color: #383838;margin-left: 3%;">填写您的车辆信息</text>
							<u-icon name="close-circle-fill" size="45rpx" color="#a6a6a6" style="margin-right: 3%;"
								@click="closeAddCar"></u-icon>
						</view>
						<view style="width: 100%;background-color: #f5f5f5;display: flex;flex-direction: column;align-items: center;
						padding: 20px 26px;
						    padding-bottom: 57px;">
							<view style="width: 90%;display: flex;flex-direction: column;align-items: center;">
								<view style="width: 100%;height: 330rpx;background-color: #FFF;border-radius: 20rpx;background-color: #FFF;
								box-shadow: 0 0 40rpx 0 rgba(0,0,0,.1);position: relative;" @click="openImagePage">
									<image src="../../static/vin-bg.png" style="width: 100%;height: 80%;"></image>
									<view style="display: flex;flex-direction: column;align-items: center;position: absolute;
									top: 33%;left: 32%;">
										<u-icon name="camera" color="#00acdd" size="80rpx"></u-icon>
										<text
											style="font-size: 26rpx;font-weight: bold;color: #00acdd;">上传您的行驶证照片</text>
									</view>
									<image style="width: 96%;height: 96%;position: absolute;
									left: 2%;top: 2%;" :src="pic"></image>
								</view>

								<view class="input-v">
									<u-input placeholder="17位VIN车架号" border="none"
										style="height: 100%;margin-left: 20rpx;" fontSize="30rpx"></u-input>
								</view>
								<view class="input-v">
									<u-input placeholder="汽车品牌" border="none" style="height: 100%;margin-left: 20rpx;"
										fontSize="30rpx"></u-input>
								</view>

								<view class="input-v" style="border: none;">
									<u-input border="none" style="height: 100%;margin-left: 20rpx;" fontSize="30rpx"
										value="点击选择省市区" disabled="readonly" disabledColor="#FFF"></u-input>
								</view>

								<view class="input-v">
									<u-input placeholder="填写手机号码" border="none" style="height: 100%;margin-left: 20rpx;"
										fontSize="30rpx" type="number"></u-input>
								</view>
								<u-button text="确认添加" class="btn" color="#FFF" @click="clickAddSubmit"></u-button>

								<u-checkbox-group
									style="display: flex;flex-direction: row;align-items: center;font-size: 26rpx;"
									v-model="cbValue" @change="checkboxChange">
									<u-checkbox shape="circle" name="cb1" :checked="checked"></u-checkbox>
									<text @click="checkedCb">我已阅读并同意<span style="color: #00acdd;"
											@click="argeement(1)">《用户服务协议》</span><span style="color: #00acdd;"
											@click="argeement(2)">《隐私政策》</span></text>
								</u-checkbox-group>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popup3" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeInquirePop" @open="openInquirePop"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<text
					style="font-size: 30rpx;color: #111;font-weight: bold;margin-top: 25rpx;margin-bottom: 25rpx;">选择报告查询模式</text>
				<scroll-view scroll-y="true">
					<view style="width: 100%;display: flex;flex-direction: column;align-items: center;">
						<view style="width: 95%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
						background-color: #fffdf0;border: 2px solid #ff8d1a;border-radius: 20rpx;height: 80rpx;margin-top: 20rpx;
						margin-bottom: 35rpx;">
							<text style="font-size: 30rpx;font-weight: bold;color: #111;margin-left: 30rpx;">专业版单次查询</text>
							<view style="display: flex;flex-direction: row;align-items: center;
							margin-right: 30rpx;">
								<text style="background-color: #fff8ed;color: #f3a54f;
								font-size: 26rpx;padding:5rpx 10rpx;border: 1rpx solid;border-radius: 5rpx;">80积分</text>
								<radio color="#FF8D1A" style="margin-left: 30rpx;" checked></radio>
							</view>
						</view>
						<u-button text="确认提交" class="btn-org" color="#FFF" @click="clickSubmitInquire" shape="circle"></u-button>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<custom-tabbar :tabIndex="index1" @clickTabbar="clickTabbar"></custom-tabbar>
	</view>
</template>

<script>
	import customTabbar from "../../components/custom-tabbar/custom-tabbar.vue"
	import projectConfig from '@/common/config.js';

	import {
		getDoOrder,
	} from '../../apis/modules/user';
	export default {
		components: {
			customTabbar,
		},
		data() {
			return {
				index1: 1,
				showPop: false,
				showModal: false,
				content: '本服务主要针对个人车主，因此每个账号最多仅可检测评估5台车，敬请注意！车智驾数据每月15日凌晨00:00更新，您可在每月15日后查询最新的数据。',
				pic: '',
				checked: false,
				cbValue: 'cb1',
				list: ['']
			}
		},
		methods: {
			clickTabbar(index) {
				let path = 'main'
				if (index == 0) {
					path = 'main';
				} else if (index == 1) {
					path = 'queryTramFiles';
				} else if (index == 2) {
					path = 'mine';
				}
				uni.navigateTo({
					url: 'pages/main/' + path,
					type: 'tab'
				})
			},
			open() {
				this.showPop = true
				this.$refs.popup.open()
			},
			close() {
				this.showPop = false
				this.$refs.popup.close()
			},
			disabledScroll() {
				if (this.showPop) {
					return
				}
			},
			clickAddMyCar() {
				this.showModal = true;
			},
			confirmModal() {
				this.showModal = false;
				this.openAddCar()
			},
			closeAddCar() {
				this.showPop = false
				this.$refs.popup2.close()
			},
			openAddCar() {
				this.showPop = true
				this.$refs.popup2.open()
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
			},
			clickAddSubmit() {
				if (!this.checked) {
					this.$u.toast('请先阅读并同意协议')
					return
				}
			},
			openImagePage() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						uni.showLoading({
							title: 'Uploading Image'
						});
						//上传图片
						that.uploadImage(res.tempFilePaths)
					}
				});
			},
			uploadImage(tempFilePaths) {
				let _this = this;
				console.log('===***===>' + projectConfig.baseUrl)

				uni.uploadFile({
					url: projectConfig.baseUrl + '/api.php/common/upload', //接口地址
					header: {
						"Token": _this.vuex_token,
					}, //请求token
					filePath: tempFilePaths[0],
					name: 'file',
					success: (res) => {
						uni.hideLoading();
						let data = JSON.parse(res.data);
						_this.pic = data.data.fullurl

						console.log('===Upload===>' + JSON.stringify(data))
					}
				});
			},
			clickEditCar(item){
				this.showPop = true
				this.$refs.popup2.open()
			},
			openInquirePop(){
				this.showPop = true
				this.$refs.popup3.open()
			},
			closeInquirePop(){
				this.showPop = false
				this.$refs.popup3.close()
			},
			clickSubmitInquire(){
				this.closeInquirePop()
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
	}

	.input-v {
		width: 100%;
		height: 90rpx;
		background-color: #FFF;
		border-radius: 20rpx;
		margin-top: 30rpx;
		border: 1rpx solid #dcdfe6;
	}

	.btn {
		width: 100%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
	}
	
	.btn-org {
		width: 95%;
		background: linear-gradient(136.25deg,#ffb300,#ff5833);
		margin-top: 45rpx;
		margin-bottom: 65rpx;
		box-shadow: 0 2rpx 10rpx 0 rgba(145,92,0,.3);
	}
</style>