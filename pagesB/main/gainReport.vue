<template>
	<view class="content">
		<view class="top-bg">
			<view style="width: 90%;display: flex;flex-direction: row;align-items: center;
					margin-top: 20rpx;justify-content: space-between;">
				<view style="width: 62%; display: flex;flex-direction: column;color: #FFF;">
					<text style="font-size: 38rpx;font-weight: bold;">车云检</text>
					<text
						style="font-size: 28rpx;opacity: 0.8;margin-top: 15rpx;">快速查询车辆五项核心数据报告提供专业准确的车辆使用养护建议及风险提示。</text>
				</view>
				<image src="../../static/top-icon1.png" style="width: 220rpx;height: 220rpx;"></image>
			</view>

			<view class="card" @click="openImagePage" style="height: 300rpx;">
				<image src="../../static/vin-bg.png" style="width: 100%;height: 80%;"></image>
				<view style="display: flex;flex-direction: column;align-items: center;position: absolute;
						top: 33%;left: 32%;">
					<uni-icons type="camera" color="#00acdd" size="80rpx"></uni-icons>
					<text style="font-size: 26rpx;font-weight: bold;color: #00acdd;">上传您的行驶证照片</text>
				</view>
				<image style="width: 96%;height: 96%;position: absolute;
						left: 2%;top: 2%;" :src="pic"></image>
			</view>

			<view class="card" style="margin-top: 30rpx;">
				<view style="width: 93%;display: flex;flex-direction: row;
					align-items: center;padding-top: 20rpx;padding-bottom: 20rpx;">
					<image src="../../static/icon-search.png" style="width: 45rpx;height: 45rpx;
							margin-left: 20rpx;margin-right: 20rpx;"></image>
					<input placeholder="请输入17位VIN车架号" fontSize="32rpx" color="#111" border="none" v-model="vinCode"></input>
				</view>
				<view style="height: 1rpx;width: 100%;background-color: #DDD;"></view>
				<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
						text-align: center; font-size: 26rpx;justify-content: space-between;">
					<text url="/pagesA/mine/fiesRecord" style="width: 49%;color: #ff8d1a;padding-top: 20rpx;padding-bottom: 20rpx;
							font-weight: bold;" @click="openSelectItemPop" >共5个模块 80积分<span style="font-size: 10px;"></span></text>
					<view style="width: 1rpx;height: 35rpx;background-color: #DDD;"></view>
					<text class="iconfont icon-question" style="width: 49%;font-size: 26rpx;color: #00acdd;padding-top: 20rpx;padding-bottom: 20rpx;"
						@click="open()">如何找到车架号</text>
				</view>
			</view>

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

				<navigator url="/pagesA/mine/question" style="color: #383838;display: flex;
						flex-direction: row;align-items: center;">
					<text class="iconfont icon-question" style="margin-left: 5rpx;font-size: 28rpx;">常见问题</text>
				</navigator>
			</view>

			<view style="height: 150rpx;"></view>
		</view>

		<uni-popup ref="popup" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close" @open="open"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 50vh;">
				<scroll-view scroll-y="true" style="height: 50vh;">
					<view style="width: 100%;height: 650rpx;display: flex;flex-direction: column;align-items: center;">
						<image :src="baseImageUrl+'img-rhhdcj.webp'" style="width: 700rpx;height: 650rpx;"></image>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeDemoPop" @open="openDemoPop"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 80vh;">
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;height: 6000rpx;display: flex;flex-direction: column;align-items: center;">
						<image :src="baseImageUrl+'img-jc-demo.webp'" style="width: 100%;height: 6000rpx;"></image>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="popup3" type="bottom" @close="closeSelectItemPop" @open="openSelectItemPop"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<text style="font-size: 30rpx;color: #383838;margin-top: 25rpx;margin-bottom: 5rpx;">选择你需要的报告数据模块</text>
				<text style="font-size: 26rpx;color: #808080;margin-bottom: 30rpx;">模块1.3中必需选中一项</text>
				<scroll-view scroll-y="true">
					<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
					background-color: #f5f5f5;">
						<checkbox-group class="checkbox-group" @change="checkboxChange">
						    <view class="item" v-for="(item, index) in checkboxList1" :key="item.name">
						      <text class="title">{{ index + 1 }}.{{ item.title }}</text>
						      <view class="right">
						        <text style="color: #ff8d1a;font-weight: bold;">{{ item.value }}积分</text>
						        <checkbox color="#00acdd" style="margin-left: 30rpx;" shape="circle" size="30rpx"
						                  :value="item.name" :checked="checkboxValue1.includes(item.name)"></checkbox>
						      </view>
						    </view>
						  </checkbox-group>
						<view style="width: 100%;background-color: #FFF;display: flex;flex-direction: row;align-items: center;
						justify-content: space-between;margin-top: 35rpx;">
							<text style="color: #ff8d1a;font-size: 26rpx;font-weight: bold;
							margin-left: 3%;">当前总计需要 {{amount}}积分</text>
							<view style="display: flex;flex-direction: row;align-items: center;margin-right: 3%;">
								<text class="btn-4" @click="selectAll">全选</text>
								<text class="btn-3" @click="clickSelectOk">确认选择</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';

	import {
		checkCar,
		getPointsInfo
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				showPop: false,
				showModal: false,
				pic: '',
				checked: false,
				checkboxValue1: [],
				checkboxList1: [{
						name: 'cb1',
						title: '电池健康度评估',
						value: 25
					},
					{
						name: 'cb2',
						title: '车辆电池静态数据',
						value: 10
					},
					{
						name: 'cb3',
						title: '车辆行驶数据评估（调表识别）',
						value: 30
					},
					{
						name: 'cb4',
						title: '车辆充放电数据评估',
						value: 10
					},
					{
						name: 'cb5',
						title: '电池异常报警状况评估',
						value: 5
					}
				],
				amount: 0,
				baseImageUrl: projectConfig.baseImageUrl,
				vinCode:'' ,//车架号
				curPoints:'0'
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
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			openSelectItemPop() {
				// this.showPop = true
				// this.$refs.popup3.open()
			},
			closeSelectItemPop() {
				this.showPop = false
				this.$refs.popup3.close()
			},
			 checkboxChange(event) {
				// console.log('change', event);
				const values = event.detail.value;
				this.checkboxValue1 = values; // 更新 checkboxValue1
				this.checked = values.length > 0;
				this.getAmount(values);
			},
			selectAll() {
				// 全选
				if (this.checkboxValue1.length == 5) {
					this.checkboxValue1 = [];
				} else {
					this.checkboxValue1 = this.checkboxList1.map(item => item.name);
				}
				this.getAmount(this.checkboxValue1);
			},
			clickSelectOk() {
				if (this.checkboxValue1.includes('cb1') || this.checkboxValue1.includes('cb3')) {
					console.log('========***========');

				} else {
					uni.showToast({
						title: '模块1.3中必需选中一项',
						icon: 'none'
					});
				}
			},
			getAmount(list) {
				let value = 0;
				for (let i = 0; i < list.length; i++) {
					for (let j = 0; j < this.checkboxList1.length; j++) {
						if (list[i] == this.checkboxList1[j].name) {
							value += this.checkboxList1[j].value;
						}
					}
				}
				this.amount = value;
			},
			clickSubmit(){
				if(this.vinCode === ''){
					uni.showToast({
						title:'请输入车架号',
						icon:'error'})
					return
				}
				//车云检
				checkCar({
					vinCode:this.vinCode,
					points:80,
				},{custom: {catch: true,}
				}).then((res) => {
					if(!res.data){
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel:false,
							success: function (res) {
							}
						});
					}else{
						//进入详情页
						uni.navigateTo({
							url:'/pagesB/main/detectionReportV2?vinCode='+this.vinCode
						})
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
		fons-size: 30rpx;
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

	.top-bg {
		width: 100%;
		background-image: url('../../static/top-bg.png');
		background-repeat: no-repeat;
		background-size: 100% 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.checkbox-group {
		width: 100%;
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
</style>