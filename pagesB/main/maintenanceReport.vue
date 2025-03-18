<template>
	<view class="content">
		<view class="top-bg">
			<image src="../../static/top-bg.png" style="width: 100%;height: 400rpx;position: absolute;"></image>
			<view style="width: 90%;display: flex;flex-direction: row;align-items: center;
					margin-top: 20rpx;justify-content: space-between;">
				<view style="width: 72%; display: flex;flex-direction: column;color: #FFF;z-index: 20;">
					<text style="font-size: 35rpx;margin-top: 15rpx;font-weight: bold;">让小白像专家一样购买二手车</text>
					<text
						style="font-size: 30rpx;opacity: 0.8;margin-top: 15rpx;">人工解读报告、避坑指南与维权指导，4S数据全网覆盖最全。</text>
				</view>
				<image src="../../static/top-icon1.png" style="width: 220rpx;height: 220rpx;"></image>
			</view>

			<view class="card" @click="openImagePage" style="height: 350rpx;">
				<image src="../../static/vin-bg.png" style="width: 100%;height: 80%;"></image>
				<view style="display: flex;flex-direction: column;align-items: center;position: absolute;
						top: 33%;left: 32%;">
					<uni-icons type="camera" color="#30ad55" size="80rpx"></uni-icons>
					<text style="font-size: 26rpx;font-weight: bold;color: #30ad55;">上传您的行驶证照片</text>
				</view>
				<image style="width: 96%;height: 96%;position: absolute;
						left: 2%;top: 2%;" :src="pic"></image>
			</view>

			<view class="card" style="margin-top: 30rpx;">
				<view style="width: 93%;display: flex;flex-direction: row;
					align-items: center;padding-top: 20rpx;padding-bottom: 20rpx;">
					<image src="../../static/icon-search.png" style="width: 45rpx;height: 45rpx;
							margin-left: 20rpx;margin-right: 20rpx;"></image>
					<input placeholder="VIN车架号" fontSize="32rpx" color="#111" border="none" v-model="vinCode" disabled="true"></input>
				</view>
			</view>

			<button class="btn" @click="clickSubmit">立即检测</button>

			<text class="btn-2" style="width: 90%;" @click="openDemoPop">查看检测范例</text>

			<view style="width: 90%;display: flex;flex-direction: row;justify-content: space-between;color: #383838;
					font-size: 26rpx;margin-top: 30rpx;">
				<view style="color: #383838;display: flex;
						flex-direction: row;align-items: center;" @click="open()">
						<text class="iconfont icon-question" style="margin-left: 5rpx;font-size: 28rpx;">行驶证拍照规范</text>
				</view>
				<navigator url="/pagesA/mine/question?qType=4" style="color: #383838;display: flex;
						flex-direction: row;align-items: center;">
					<text class="iconfont icon-question" style="margin-right: 5rpx;font-size: 28rpx;">常见问题</text>
				</navigator>
			</view>

			<view style="height: 150rpx;"></view>
		</view>

		<uni-popup ref="popup" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close" @open="open"
			background-color="#FFF">
			<view class="uPop" style="height: 50vh;margin-top: 35rpx;display: flex;flex-direction: column;align-items: center;">
				<text style="font-size: 35rpx;color: #333;">行驶证拍照示例</text>
				<view style="width: 95%;">
					<image :src="baseImageUrl+'img-xszpzsl.webp'" mode="widthFix" class="imgUrl"  style="width: 95%;margin-top: 40rpx;"></image>
				</view>
				<text style="font-size: 35rpx;color: #333;margin-top: 60rpx;">拍摄规范</text>
				<view style="width: 92%;display: flex;flex-direction: column;align-items: center;margin-bottom: 50rpx;">
					<text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">1、将行驶证主页/登记证1、2页(有车架号)取出平整放置，保证光线均匀，避免反光。</text>
					<text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">2、打开手机拍照功能，摄像头对准行驶证主页/登记证1、2页(有车架号)，保证证件边缘完整。</text>
					<text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">3、关闭闪光灯，保证摄像头无遮挡，按下拍照键，避免抖动。</text>
					<text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">4、上传前检查照片文字是否清晰，如有偏移或模糊，请重新拍照上传。</text>
					<text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">5、如果因为图片过大造成上传失败，可以将图片进行裁剪后重新上传。</text>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeDemoPop" @open="openDemoPop"
			background-color="#FFF">
			<view class="uPop">
				<image :src="baseImageUrl+'nimengcha_example_wb.webp'" mode="widthFix" class="imgUrl"  style="width: 100%; overflow-y: auto;"></image>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';

	import {
		payOrder,
		carWbCreatedReport
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				showPop: false,
				showModal: false,
				pic: '',
				amount: 0,
				baseImageUrl: projectConfig.baseImageUrl,
				vinCode:'' ,
				curPoints:'0',
			}
		},
		onShow() {
			this.pointsInfo =  this.vuex_points_info
			if(this.pointsInfo){
				this.curPoints = this.pointsInfo.realityQty
			}
			
			// this.vinCode = 'SSVUDDTT2J2022558'
			// this.pic = 'https://api.xinnengyuanyunjian.top/profile/upload/2025/03/03/xsz_111_20250303161224A106.jpg'
		},
		methods: {
			open() {
				this.showPop = true
				this.$refs.popup.open()
			},
			close() {
				this.showPop = false
				this.$refs.popup.close()
			},
			closeDemoPop() {
				this.showPop = false
				this.$refs.popup2.close()
			},
			openDemoPop() {
				this.showPop = true
				this.$refs.popup2.open()
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
					url: projectConfig.baseUrl + '/index/user/vehicleLicenseOCR', //接口地址
					header: {
						"Authorization": _this.vuex_token,
					}, //请求token
					filePath: tempFilePaths[0],
					name: 'file',
					success: (res) => {
						uni.hideLoading();
						console.log('===Upload===>' + JSON.stringify(res))
						let data = JSON.parse(res.data);
						//识别成功
						if(data.code == 200){
							_this.pic = data.data.url
							_this.vinCode = data.data.vin
							_this.owner = data.data.owner
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			clickSubmit(){
				if(this.pic === ''){
					uni.showToast({
						title:'上传行驶证图片',
						icon:'error'})
					return
				}if(this.vinCode === ''){
					uni.showToast({
						title:'请确认行驶证信息',
						icon:'error'})
					return
				}
				
				
				let that = this;
				//车维保检测下单
				// carWbCreatedReport({
				// 	vinCode:that.vinCode,
				// 	outTradeNo:'202503020200310205' ,//202503020200310205
				// 	vinImg:that.pic,
				// },{custom: {catch: true,}
				// }).then((res) => {
				// 	if(res.code != 200){
				// 		console.log('=========检测失败========'+res.msg)
				// 		uni.showModal({
				// 			title: '提示',
				// 			content: res.msg,
				// 			showCancel:false,
				// 			success: function (res) {
				// 			}
				// 		});
				// 	}else{
				// 		// this.htmlContent = res.data.data.replace(/\n/g, '')
				// 		console.log('=========检测成功========'+res)
				// 		//进入详情页
				// 			uni.navigateTo({
				// 				url:'/pagesB/main/reportContent?type=3&checkId='+res.data
				// 			})
				// 	}
				// });
				
				
				////////////////////
					// if(1){
					// 	return;
					// }
				////////////////////

				//支付后自动调用检测
				payOrder({
					vinCode:that.vinCode,
					product_id:9
				}).then((res) => {
					console.log(res)
					if (res.code === 200) {
						let outTradeNo = res.data.outTradeNo
						// 调用微信支付
						uni.requestPayment({
							  provider: 'wxpay',
							  timeStamp: res.data.timeStamp,
							  nonceStr: res.data.nonceStr,
							  package: res.data.package,
							  signType: res.data.signType,
							  paySign: res.data.paySign,
						  success(res) {
						    // 支付成功回调
						    console.log('===Success===>'+JSON.stringify(res))
							// uni.showToast({
							// 	icon:'success',
							// 	title:'支付成功'
							// })
							
							//车维保检测下单
							carWbCreatedReport({
								vinCode:that.vinCode,
								outTradeNo:outTradeNo,
								vinImg:that.pic,
							},{custom: {catch: true,}
							}).then((res) => {
								if(res.code != 200){
									console.log('=========检测失败========'+res.msg)
									uni.showModal({
										title: '提示',
										content: res.msg,
										showCancel:false,
										success: function (res) {
										}
									});
								}else{
									console.log('=========检测成功========'+res)
									//进入详情页
									uni.navigateTo({
										url:'/pagesB/main/reportContent?type=3&checkId='+res.data
									})
								}
							});
						  },
						  fail(err) {
						    // 支付失败回调
						    console.log('===Fail===>'+JSON.stringify(err))
							uni.showModal({
								title: '提示',
								content: '支付失败',
								showCancel:false,
								success: function (res) {
								}
							});
						  }
						})
					}
				})
			},
			argeement(type){
				if(type == 1){
					
				}else{
					uni.navigateTo({
						url:'/pagesB/main/authFile'
					})
				}
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
			}
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
		width: 90%;
		background: linear-gradient(135deg, #30ad55, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		fons-size: 30rpx;
		color: #FFF;
	}

	.btn-2 {
		color: #30ad55;
		border: 1rpx solid #30ad55;
		font-size: 30rpx;
		background: #FFF;
		border-radius: 20rpx;
		text-align: center;
		padding-top: 18rpx;
		padding-bottom: 18rpx;
	}

	.btn-org {
		width: 95%;
		background: linear-gradient(136.25deg, #ffb300, #ff5833);
		margin-top: 45rpx;
		margin-bottom: 65rpx;
		box-shadow: 0 2rpx 10rpx 0 rgba(145, 92, 0, .3);
	}

	.card {
		width: 90%;
		background-color: #FFF;
		border-radius: 20rpx;
		background-color: #FFF;
		box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, .1);
		position: relative;
		margin-top: 20rpx;
	}

	.item {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFF;
		border: 1rpx solid #e5e5e5;
		border-radius: 20rpx;
		margin-top: 30rpx;
		font-size: 26rpx;

		.title {
			font-weight: bold;
			color: #383838;
			margin-left: 30rpx;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 30rpx;
		}
	}

	.btn-3 {
		background: linear-gradient(135deg, #30ad55, #47ad13);
		text-align: center;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 26rpx;
		border-radius: 10rpx;
		color: #FFF;
		margin-left: 20rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.btn-4 {
		color: #30ad55;
		border: 1rpx solid #30ad55;
		background: #FFF;
		text-align: center;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 26rpx;
		border-radius: 10rpx;
	}

	.top-bg {
		width: 100%;
		// background-image: url('../../static/top-bg.png');
		// background-repeat: no-repeat;
		// background-size: 100% 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 10px 0;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.title {
		flex: 1;
	}
	
	.uPop {
		overflow-y: auto;
		height: 71vh;
	
		.attestation {
			background: #fff8ed;
			color: #f3a54f;
			border-color: #f3a54f;
			right: var(--window-right);
			bottom: var(--window-bottom);
			height: 37px;
			text-align: center;
			font-size: 14px;
			border-bottom: 1px solid rgba(243, 165, 79, .5);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	
		.imgUrl {
			user-select: auto;
			-webkit-touch-callout: default;
			overflow-clip-margin: content-box;
			overflow: clip;
		}
	}
</style>