<template>
	<view class="content">
		<view class="top-bg">
			<view style="width: 90%;display: flex;flex-direction: row;align-items: center;
					margin-top: 20rpx;justify-content: space-between;">
				<view style="width: 62%; display: flex;flex-direction: column;color: #FFF;">
					<text style="font-size: 38rpx;font-weight: bold;">电易估</text>
					<text
						style="font-size: 26rpx;margin-top: 15rpx;">涵盖全类型新能源车，一键查询电池包详情、剩余容量和车辆行驶里程、提供估价参考助力电池回收！</text>
				</view>
				<image src="../../static/top-icon2.png" style="width: 220rpx;height: 220rpx;"></image>
			</view>

			<view class="card" style="margin-top: 20rpx;">
				<view style="width: 100%;display: flex;flex-direction: row;
						align-items: center;justify-content: space-between;padding-top: 20rpx;padding-bottom: 20rpx;">
					<view style="display: flex;flex-direction: row;align-items: center;margin-left: 4%;">
						<text style="font-size: 30rpx;color: #111;">选择查询类型:</text>
						<picker :range="typeColumns" @change="confirmTypeChange">
							<view style="display: flex;flex-direction: row;align-items: center;">
								<text
									style="font-size: 28rpx;font-weight: bold;color: #ff8d1a;margin-left: 20rpx;">{{companyTypeStr}}</text>
								<view class="triangle"></view>
							</view>
						</picker>
					</view>
					<view style="margin-right: 4%;">
						<text class="iconfont icon-question" @click="open()"
							style="font-size: 28rpx;color: #00acdd;">图例</text>
					</view>
				</view>
				<view style="height: 1rpx;width: 100%;background-color: #DDD;"></view>
				<view style="width: 93%;display: flex;flex-direction: row;
					align-items: center;padding-top: 20rpx;padding-bottom: 20rpx;">
					<image src="../../static/icon-search.png" style="width: 45rpx;height: 45rpx;
							margin-left: 20rpx;margin-right: 20rpx;"></image>
					<input placeholder="请核对查询类型后输入车架号" fontSize="32rpx" color="#111" border="none" v-model="vinCode"
					style="width: 80%;"></input>
				</view>
				<view style="height: 1rpx;width: 100%;background-color: #DDD;"></view>
				<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
						text-align: center; font-size: 28rpx;justify-content: space-around;">
					<text url="/pagesA/mine/fiesRecord" style="width: 49%;color: #ff8d1a;padding-top: 20rpx;padding-bottom: 20rpx;
							font-weight: bold;">{{checkPointsStr}}<span style="font-size: 26rpx;color: #808080;
							font-weight: normal;text-decoration: line-through;" v-if="!vipInfo">40积分</span></text>
					<view style="width: 1rpx;height: 35rpx;background-color: #DDD;"></view>
					<!-- <view style="display: flex;flex-direction: row;align-items: center;">
						<view type="camera" color="#09acc3" size="35rpx" @click="openImagePage()" style="font-weight: bold;"></uni-icons>
						<span style="font-size: 30rpx;color: #09acc3;">车架号图像识别</span>
					</view> -->
					<view class="ocr" @click="openImagePage()"><view class="iconfont icon-camera" style="margin-right: 5rpx;"></view>车架号图像识别</view>
				</view>
			</view>

			<text
				style="width: 90%;font-size: 25rpx;color: #808080;margin-top: 35rpx;">注意：使用整车型号只能查车辆、电池静态数据，vin码和电池包编码可以查看静态数据和电池使用情况，电池包编码查得率较低，建议使用其他查询。</text>

			<button class="btn" @click="clickSubmit">立即检测</button>

			<text class="btn-2" style="width: 90%;" @click="openDemoPop">查看检测范例</text>

			<view style="width: 90%;display: flex;flex-direction: row;justify-content: space-between;color: #383838;
					font-size: 26rpx;margin-top: 30rpx;">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text>积分余额：{{curPoints}}</text>
					<navigator url="/pagesA/mine/skuList" style="margin-left: 35rpx;color: #00acdd;display: flex;
							flex-direction: row;align-items: center;">
						<text class="iconfont icon-money"></text><span
							style="margin-left: 5rpx;font-size: 28rpx;">充值</span>
					</navigator>
				</view>

				<navigator url="/pagesA/mine/question?qType=2" style="color: #383838;display: flex;
						flex-direction: row;align-items: center;">
					<text class="iconfont icon-question" style="margin-left: 5rpx;font-size: 28rpx;">常见问题</text>
				</navigator>
			</view>

			<navigator url="/pagesA/mine/vipCard"
				style="width: 100%;display: flex;flex-direction: row;justify-content: center;margin-top: 35rpx;">
				<image :src="baseImageUrl+'banner-dyg.webp'" style="width: 90%;height: 160rpx;border-radius: 20rpx;">
				</image>
			</navigator>

			<view style="height: 150rpx;"></view>
		</view>

		<uni-popup ref="popup" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close" @open="open"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 80vh;">
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;height: 650rpx;display: flex;flex-direction: column;align-items: center;
					color: #111;">
						<text style="font-size: 28rpx;font-weight: bold;margin-top: 35rpx;">如何获得车架号、整车型号、电池包编码</text>
						<view
							style="width: 92%;margin-top: 35rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
							<text
								style="font-size: 28rpx;width: 100%;margin-top: 35rpx;">检测所需的车架号(VIN码)，以及整车型号(公告号)可以通过您的行驶证及车辆铭牌获得，电池包编码可以从电池包铭牌获得，参考以下图例：</text>
							<image :src="baseImageUrl+'vin-example1.webp'"
								style="width: 100%;height: 450rpx;margin-top: 35rpx;"></image>
							<image :src="baseImageUrl+'vin-example2.webp'"
								style="width: 100%;height: 380rpx;margin-top: 35rpx;"></image>
							<image :src="baseImageUrl+'vin-example3.webp'"
								style="width: 100%;height: 220rpx;margin-top: 35rpx;"></image>
							<view style="height: 80rpx;"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeDemoPop" @open="openDemoPop"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 80vh;">
				<view style="width: 80%;display: flex;flex-direction: row;align-items: center;justify-content: space-around;
				padding-bottom: 10rpx;">
					<view style="display: flex;flex-direction: column;align-items: center;margin-top: 10rpx;"
						:style="curTab === 1?'color: #00acdd':'color: #111'" @click="clickTab(1)">
						<text style="font-size: 28rpx;font-weight: bold;">静态数据报告样例</text>
						<text style="font-size: 26rpx;margin-top: 5rpx;">10积分/会员免费</text>
					</view>
					<view style="height: 30rpx;width: 2rpx;background-color: #DDD;"></view>
					<view style="display: flex;flex-direction: column;align-items: center;margin-top: 10rpx;"
						:style="curTab === 2?'color: #00acdd':'color: #111'" @click="clickTab(2)">
						<text style="font-size: 28rpx;font-weight: bold;">完整数据报告样例</text>
						<text style="font-size: 26rpx;margin-top: 5rpx;">追加20积分</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;display: flex;flex-direction: column;align-items: center;">
						<image :src="baseImageUrl+'example-m-dyg2-2.webp'" style="width: 100%;height: 3600rpx;"
							v-if="curTab===1"></image>
						<image :src="baseImageUrl+'example-m-dyg2-3.webp'" style="width: 100%;height: 3900rpx;"
							v-if="curTab===2"></image>
						<view style="height: 80rpx;"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';

	import {
		eleCheck,
		getPointsInfo,
		getUserVipInfo
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				pic: '',
				typeColumns: ['车架号(VIN)', '电池包编码', '整车型号(公告号)'],
				companyType: 3501,
				companyTypeStr:'车架号(VIN)',
				curTab: 1,
				baseImageUrl:projectConfig.baseImageUrl,
				vinCode:'',
				curPoints:'0',
				vipInfo:'',
				checkPointsStr:'估价需10积分', //检测积分提示
			}
		},
		onShow() {
			this.pointsInfo =  this.vuex_points_info
			if(this.pointsInfo){
				this.curPoints = this.pointsInfo.realityQty
			}
			
			//获取用户积分信息
			getPointsInfo().then((res) => {
				// console.log('=======>', res)
				if (res.code == 200) {
					this.pointsInfo = res.data
					this.curPoints = this.pointsInfo.realityQty
					this.$u.vuex('vuex_points_info',res.data)
				}
			})
			
			//获取用户VIP信息
			getUserVipInfo().then((res) => {
				// console.log(res)
				if(res.code === 200){
					this.vipInfo = res.data
					//会员剩余免费检测次数
					if(this.vipInfo.totalFreeInterestsQty > 0){
						this.checkPointsStr = '会员免费查询 '+this.vipInfo.totalFreeInterestsQty+' 次'
					}
				}
			})
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			closeDemoPop() {
				this.$refs.popup2.close()
			},
			openDemoPop() {
				this.$refs.popup2.open()
			},
			clickTab(index) {
				this.curTab = index
			},
			confirmTypeChange(e) {
				console.log('============>>>'+e.detail.value)
				if(e.detail.value === 0){
					//车架号(VIN)
					this.companyType = 3501
				}else if(e.detail.value === 1){
					//电池包编码
					this.companyType = 3502
				}else{
					//整车型号(公告号)
					this.companyType = 3503
				}
				this.companyTypeStr = this.typeColumns[e.detail.value]
				console.log(this.companyType)
			},
			clickSubmit(){
				//提交检测
				if(this.vinCode === ''){
					uni.showToast({
						title:'请输入车架号',
						icon:'error'})
					return
				}
				//电易估
				eleCheck({
					vinCode:this.vinCode,
					requestIdType:this.companyType,
				},{custom: {catch: true,}
				}).then((res) => {
					if(res.code === 200){
						if(res.data){
							//进入详情页
							uni.navigateTo({
								url:'/pagesB/main/newBattery?vinCode='+this.vinCode
							})
							return
						}
					}
					uni.showModal({
						title: '提示',
						content: res.msg,
						showCancel:false,
						success: function (res) {
						}
					});
				});
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
							// _this.pic = data.data.url
							_this.vinCode = data.data.vin
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
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
		width: 90%;
		background: linear-gradient(135deg, #00acdd, #47ad13);
		margin-top: 45rpx;
		border-radius: 20rpx;
		margin-bottom: 35rpx;
		font-size: 32rpx;
		color: #FFF;
	}

	.btn-2 {
		color: #00acdd;
		border: 1rpx solid #00acdd;
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
		background: linear-gradient(135deg, #00acdd, #47ad13);
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
		color: #00acdd;
		border: 1rpx solid #00acdd;
		background: #FFF;
		text-align: center;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 26rpx;
		border-radius: 10rpx;
	}

	.triangle {
		width: 0;
		height: 0;
		border-left: 8rpx solid transparent;
		border-right: 8rpx solid transparent;
		border-top: 10rpx solid #ff8d1a;
		margin-left: 10rpx;
	}
	.top-bg{
		width: 100%;
		background-image: url('../../static/top-bg.png');
		background-repeat: no-repeat;
		background-size: 100% 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.ocr{
	    height: 38rpx;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    width: 50%;
	    flex-grow: 1;
	    text-align: left;
	    color: #09acc3;
		font-weight: bold;
	}
	.icon-camera:before {
	    content: "\e90d";
	}
</style>