<template>
	<view class="content" @touchmove.stop.prevent="disabledScroll">
		<cl-header backgroundColor="#00acdd" title="" defaultTextColor="#FFF"></cl-header>


		<scroll-view scroll-y="true" height="100vh">
			<view style="display: flex;
			flex-direction: column;
			align-items: center;
			height: 100vh;">
				<view style="height: 89rpx;background-color: #00acdd;width: 100%;"></view>
				<view style="width: 100%;background-image: url('../../static/top-bg.png');background-repeat: no-repeat;
				background-size: 100% 400rpx;display: flex;flex-direction: column;align-items: center;">
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
							<u-icon name="camera" color="#00acdd" size="80rpx"></u-icon>
							<text style="font-size: 26rpx;font-weight: bold;color: #00acdd;">上传您的行驶证照片</text>
						</view>
						<image style="width: 96%;height: 96%;position: absolute;
						left: 2%;top: 2%;" :src="pic"></image>
					</view>

					<view class="card" style="margin-top: 30rpx;">
						<view style="width: 93%;display: flex;flex-direction: row;
					align-items: center;justify-content: space-between;padding-top: 20rpx;padding-bottom: 20rpx;">
							<image src="../../static/icon-search.png" style="width: 45rpx;height: 45rpx;
							margin-left: 20rpx;margin-right: 20rpx;"></image>
							<u-input placeholder="请输入17位VIN车架号" fontSize="32rpx" color="#111" border="none"></u-input>
						</view>
						<u-line color="#DDD"></u-line>
						<view style="width: 100%;display: flex;flex-direction: row;align-items: center;
						text-align: center; font-size: 26rpx;">
							<text url="/pages/mine/fiesRecord" style="width: 49%;color: #ff8d1a;padding-top: 20rpx;padding-bottom: 20rpx;
							font-weight: bold;" @click="openSelectItemPop">请选择检测模块<span style="font-size: 10px;">▼</span></text>
							<view style="width: 1rpx;height: 35rpx;background-color: #DDD;"></view>
							<u-text align="center" prefix-icon="question-circle"
								:iconStyle="{fontSize:'35rpx',marginRight:'10rpx',color:'#00acdd'}" color="#00acdd"
								size="26rpx" style="width: 49%;padding-top: 20rpx;padding-bottom: 20rpx;" text="如何找到车架号"
								@click="open()"></u-text>
						</view>
					</view>

					<u-button text="立即检测" class="btn" color="#FFF" @click="clickSubmit"></u-button>

					<text class="btn-2" style="width: 90%;" @click="openDemoPop">查看检测范例</text>

					<view style="width: 90%;display: flex;flex-direction: row;justify-content: space-between;color: #383838;
					font-size: 26rpx;margin-top: 30rpx;">
						<view style="display: flex;flex-direction: row;align-items: center;">
							<text>积分余额：0</text>
							<navigator url="/pages/mine/skuList" style="margin-left: 35rpx;">
								<u-text prefix-icon="../../static/money-rmb.png" text="充值" color="#00acdd"
									size="26rpx"></u-text>
							</navigator>
						</view>

						<navigator url="/pages/mine/question">
							<u-text prefix-icon="../../static/question-circle.png" text="常见问题" color="#383838"
								size="26rpx" style="margin-left: 35rpx;"></u-text>
						</navigator>
					</view>

					<view style="height: 150rpx;"></view>
				</view>
			</view>
		</scroll-view>

		<uni-popup ref="popup" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close" @open="open"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 80vh;">
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;height: 650rpx;display: flex;flex-direction: column;align-items: center;">
						<image src="../../static/img-rhhdcj.png" style="width: 700rpx;height: 1500rpx;"></image>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<u-modal :show="showModal" :content='content' confirmText="我知道了" @confirm="confirmModal"></u-modal>

		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeDemoPop" @open="openDemoPop"
			background-color="#FFF">
			<view style="display: flex;flex-direction: column;align-items: center;height: 80vh;">
				<scroll-view scroll-y="true" style="height: 80vh;">
					<view style="width: 100%;height: 6000rpx;display: flex;flex-direction: column;align-items: center;">
						<image src="../../static/img-jc-demo.png" style="width: 100%;height: 6000rpx;"></image>
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
						<u-checkbox-group style="width: 100%;display: flex;flex-direction: column;align-items: center;"
						@change="checkboxChange" v-model="checkboxValue1">
							<view class="item">
								<text class="title">1.电池健康度评估</text>
								<view class="right">
									<text style="color: #ff8d1a;font-weight: bold;">25积分</text>
									<u-checkbox color="#00acdd" style="margin-left: 30rpx;" shape="circle" size="30rpx"
										 :name="checkboxList1[0].name"></u-checkbox>
								</view>
							</view>
							<view class="item">
								<text class="title">2.车辆电池静态数据</text>
								<view class="right">
									<text style="color: #ff8d1a;font-weight: bold;">10积分</text>
									<u-checkbox color="#00acdd" style="margin-left: 30rpx;" shape="circle" size="30rpx"
										:name="checkboxList1[1].name"></u-checkbox>
								</view>
							</view>
							<view class="item">
								<text class="title">3.车辆行驶数据评估（调表识别）</text>
								<view class="right">
									<text style="color: #ff8d1a;font-weight: bold;">30积分</text>
									<u-checkbox color="#00acdd" style="margin-left: 30rpx;" shape="circle" size="30rpx"
										:name="checkboxList1[2].name"></u-checkbox>
								</view>
							</view>
							<view class="item">
								<text class="title">4.车辆充放电数据评估</text>
								<view class="right">
									<text style="color: #ff8d1a;font-weight: bold;">10积分</text>
									<u-checkbox color="#00acdd" style="margin-left: 30rpx;" shape="circle" size="30rpx"
										:name="checkboxList1[3].name"></u-checkbox>
								</view>
							</view>
							<view class="item">
								<text class="title">5.电池异常报警状况评估</text>
								<view class="right">
									<text style="color: #ff8d1a;font-weight: bold;">5积分</text>
									<u-checkbox color="#00acdd" style="margin-left: 30rpx;" shape="circle" size="30rpx"
										:name="checkboxList1[4].name"></u-checkbox>
								</view>
							</view>
						</u-checkbox-group>
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
		getDoOrder,
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				showPop: false,
				showModal: false,
				pic: '',
				checked: false,
				cbValue: 'cb1',
				checkboxList1: [{
					name: 'cb1',
					value:25,
				}, {
					name: 'cb2',
					value:10,
				}, {
					name: 'cb3',
					value:30,
				}, {
					name: 'cb4',
					value:10,
				}, {
					name: 'cb5',
					value:5,
				}],
				checkboxValue1:[],
				amount:0
			}
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
				this.openDemoPop()
			},
			closeDemoPop() {
				this.showPop = false
				this.$refs.popup2.close()
			},
			openDemoPop() {
				this.showPop = true
				this.$refs.popup2.open()
			},
			checkboxChange(n) {
				console.log('change', n);
				this.getAmount(n)
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
			clickEditCar(item) {
				this.showPop = true
				this.$refs.popup2.open()
			},
			openSelectItemPop() {
				this.showPop = true
				this.$refs.popup3.open()
			},
			closeSelectItemPop() {
				this.showPop = false
				this.$refs.popup3.close()
			},
			clickSubmitInquire() {
				this.closeSelectItemPop()
			},
			selectAll(){
				//全选
				if(this.checkboxValue1.length == 5){
					this.checkboxValue1 = []
				}else{
					this.checkboxValue1 = []
					for (var i = 0; i < this.checkboxList1.length; i++) {
						this.checkboxValue1.push(this.checkboxList1[i].name)
					}
				}
				
				this.getAmount(this.checkboxValue1)
			},
			clickSelectOk(){
				console.log(this.checkboxValue1)
				if(this.checkboxValue1.includes('cb1') || this.checkboxValue1.includes('cb3')){
					console.log('========***========')
				}else{
					this.$u.toast('模块1.3中必需选中一项')
				}
			},
			getAmount(list){
				let value = 0;
				for (var i = 0; i < list.length; i++) {
					for (var j = 0; j < this.checkboxList1.length; j++) {
						if(list[i] == this.checkboxList1[j].name){
							value += this.checkboxList1[j].value
						}
					}
				}
				this.amount = value
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
</style>