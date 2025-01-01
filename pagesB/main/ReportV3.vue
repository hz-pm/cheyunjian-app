<template>
	<view class="page" v-if="detail.resultTxt">
		<view style="width: 95%; display: flex;flex-direction: column;background-color: rgba(57, 235, 189, 0.2);
		margin-top: 30rpx;border-radius: 10rpx;">
			<view style="display: flex;flex-direction: row;margin-top: 35rpx;margin-left: 20rpx;margin-bottom: 35rpx;">
				<image style="width: 80rpx;height: 80rpx;background-color: #fff;border-radius: 10rpx;
				padding: 6rpx;" :src="detail.resultTxt.brandLogo"></image>
				<view style="display: flex;flex-direction: column;color: #fff;font-size: 30rpx;margin-left: 25rpx;">
					<text style="font-size: 32rpx;font-weight: bold;">{{detail.resultTxt.brand}}</text>
					<text style="margin-top: 5rpx;">VIN:{{detail.vinCode}}</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;align-items: center;background-color: rgba(34, 163, 109, 0.6);
			line-height: 70rpx;justify-content: center;border-bottom-left-radius: 10rpx;border-bottom-right-radius: 10rpx;">
				<!-- <image src="../../static/info-fill.png" style=""></image> -->
				<text class="iconfont icon-warning" style="color: #FFF; width: 40rpx;"></text>
				<text style="font-size: 26rpx;color: #fff;">本查询结果仅供参考，对结果不做准确性、完整性承若</text>
			</view>
		</view>

		<view class="tabs">
			<text class="t" :class="tabIndex==0?'t-selected':''" @click="clickTab(0)">电池健康</text>
			<text class="t" :class="tabIndex==1?'t-selected':''" @click="clickTab(1)">行驶模块</text>
			<text class="t" :class="tabIndex==2?'t-selected':''" @click="clickTab(2)">静态数据</text>
			<text class="t" :class="tabIndex==3?'t-selected':''" @click="clickTab(3)">充电模块</text>
		</view>

		<view class="card">
			<view class="title-v">
				<view class="dot"></view>
				<text class="title">电池健康模块</text>
				<text class="time" v-if="false">数据更新于2024-11-08</text>
			</view>
			<view>
				<view class="ehr">
					<view class="power">当前参考续航</view>
				</view>
				<view
					style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: center; margin-top: 10rpx;">

					<canvas class="progress-canvas" canvas-id="progressCanvas" v-if="!canvasSrc"></canvas>
					<image class="progress-canvas" :src="canvasSrc" v-if="canvasSrc"></image>

					<view style="display: flex;flex-direction: column;
						position: absolute;margin-top: 85rpx;align-items: center;">
						<view style="display: flex;flex-direction: row;font-weight: bold;">
							<text style="font-size: 82rpx;color: #00acdd;">{{detail.resultTxt.referRateMileage}}</text>
							<text style="font-size: 30rpx;color: #00acdd;margin-top: 0rpx;">km</text>
						</view>
						<view style="display: flex;flex-direction: row;background-color: #fff9ed;border: 1rpx solid #f3a550;
							padding-left: 6rpx;padding-right: 6rpx;border-radius: 8rpx;align-items: center;
							margin-top: 30rpx;justify-content: center;width: 130rpx;font-weight: bold;">
							<uni-icons type="arrow-down" color="#f3a550" size="30rpx" v-if="false"></uni-icons>
							<text
								style="font-size: 28rpx;color: #FFF;color: #f3a550;">{{detail.resultTxt.referRateMileageAssess}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="referV2"><text
					class="iconfont icon-info"></text>参考续航：实际满电行驶里程数的参考值，会因为温度、行驶环境的不同而不同，北方春秋季节一般会比冬季高。
			</view>

			<view class="sohBattery" :class="batterySohLvColor">
				<view class="iconBox"><text class="iconfont icon-battery"></text>
				</view>
				<view class="battertTxt">
					<view class="txT">SOH(电池健康度)</view>
					<view class="txBox">
						<view class="txB">{{detail.resultTxt.batterySoh}}<text class="text">%</text></view>
						<view class="txBr">{{detail.resultTxt.batterySohLvStr}}</view>
					</view>
				</view>
			</view>
			<view class="sohBattery" :class="volumeScoreRecessionLvColor">
				<view class="iconBox"><text class="iconfont anquan" style="font-size: 90rpx;"></text>
				</view>
				<view class="battertTxt">
					<view class="txT">安全风险</view>
					<view class="txBox">
						<view class="txB"><text class="text">衰退倍率</text>{{detail.resultTxt.volumeScoreRecession}}</view>
						<view class="txBr">{{detail.resultTxt.volumeScoreRecessionLvStr}}</view>
					</view>
				</view>
			</view>

			<view
				style="width: 100%;display: flex;flex-direction: column;background-color: #edfaf9;margin-top: 20rpx;border-radius: 20rpx;margin-bottom: 20rpx;">
				<view class="tips-title">
					<image src="../../static/ic-jiedu.png"></image>
					<text>解析</text>
				</view>
				<view v-for="(item,index) in JSON.parse(detail.resultTxt.volumeScoreRecessionNarrate)"
				 class="tips-info">
					<rich-text style="white-space: pre-wrap;" :nodes="item"></rich-text>
				</view>
			</view>
		</view>

		<view class="card">
			<view class="title-v">
				<view class="dot"></view>
				<text class="title">车辆行驶模块</text>
				<text class="time">表显里程更新于{{detail.resultTxt.lastDrivingDate}}</text>
			</view>

			<view style="width: 80%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
			align-self: center;margin-top: 35rpx;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text style="font-size: 40rpx;font-weight: bold;color: #00acdd;">{{detail.resultTxt.displayMileage}}Km</text>
					<text style="font-size: 30rpx;color: #333;margin-top: 10rpx;">表显行驶里程</text>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text
						style="font-size: 40rpx;font-weight: bold;color: #00acdd;">{{detail.resultTxt.manufacturerDate}}年</text>
					<text style="font-size: 30rpx;color: #333;margin-top: 10rpx;">车辆生产年份</text>
				</view>
			</view>
			<view style="width: 100%;display: flex;flex-direction: column;background-color: #ecfaf2;
			margin-top: 30rpx;border-radius: 20rpx;padding-top: 25rpx;margin-bottom: 20rpx;" :style="detail.resultTxt.suspectedAdjust?{backgroundColor: '#ffeaec'}:''">
				<view style="width: 95%;display: flex;flex-direction: row;justify-content: space-between;
				margin-left: 20rpx;">
					<view style="display: flex;flex-direction: column;color: #333;margin-bottom: 20rpx;">
						<text style="font-weight: bold;font-size: 32rpx;">里程核验</text>
						<text style="margin-top: 40rpx;font-size: 28rpx;" v-if="xsmkTipIndex==0">{{xsmkTipList[0].text1}}</text>
						<view style="margin-top: 40rpx;font-size: 28rpx;" v-else>{{xsmkTipList[1].text1}}<text style="color: #fc5b50;font-weight: bold;">里程异常</text></view>
					</view>
					<image :src="detail.resultTxt.suspectedAdjust?'../../static/ic-ybdd-red.png':'../../static/ic-ybdd-green.png'" style="width: 180rpx;height: 130rpx;"></image>
				</view>
				
				<view style="width: 93%;background-color: #FFF;border: #f0555a solid 1rpx;border-radius: 20rpx;align-self: center;
				padding-top: 10rpx;padding-bottom: 10rpx;margin-top: 15rpx;" v-if="checkDisplayMileageListJson">
					<view style="display: flex;flex-direction: column;align-items: center;" v-for="(item) in checkDisplayMileageListJson">
						<view style="width: 90%; display: flex;flex-direction: row;align-items: center;justify-content: space-between;
						margin-top: 10rpx;margin-bottom: 10rpx;font-weight: bold;color: #555;font-size: 30rpx;">
							<text>{{item.month}}</text>
							<text>{{item.displayMileage}}km</text>
							<text :style="item.hasErr?{color:'#fc4731'}:''">{{item.remark}}</text>
						</view>
					</view>
				</view>
				
				<view class="tips-title">
					<image class="iconfont icon-safe"></image>
					<text>注意</text>
				</view>
				<text class="tips-info">{{xsmkTipList[0].text2}}</text>
			</view>
		</view>

		<view class="card">
			<view class="title-v">
				<view class="dot"></view>
				<text class="title">车辆电池静态数据</text>
			</view>

			<view class="cell-v" style="margin-top: 35rpx;">
				<text class="t1">电池厂商</text>
				<text class="t2">{{detail.resultTxt.batteryManufacturer}}</text>
			</view>
			<view class="cell-v" style="background-color: #FFF;">
				<text class="t1">标称容量</text>
				<text class="t2">{{detail.resultTxt.rateCapacity}} Ah</text>
			</view>
			<view class="cell-v">
				<text class="t1">标称能量</text>
				<text class="t2">{{detail.resultTxt.nominalEnergy}} kWh</text>
			</view>
			<view class="cell-v" style="background-color: #FFF;">
				<text class="t1">标称续航</text>
				<text class="t2">{{detail.resultTxt.rateMileage}} km</text>
			</view>
			<view class="cell-v">
				<text class="t1">电池类型</text>
				<text class="t2">{{detail.resultTxt.batteryType}}</text>
			</view>
		</view>

		<view class="card">
			<view class="title-v">
				<view class="dot"></view>
				<text class="title">车辆充放电模块</text>
				<text class="time" v-if="false">数据更新于2024-11-08</text>
			</view>
			<view
				style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-top: 30rpx;">
				<view style="width: 30%;display: flex;flex-direction: column;align-items: center;background-color: #edfaf9;
				border-radius: 20rpx;">
					<text class="iconfont dianchi" style="font-size: 64rpx;color: #FFF;
					border-radius: 50%;
					line-height: 130rpx;
					width: 130rpx;
					text-align: center;
					background-color: #00acdd;
					margin-top: 20rpx;" :class="batteryHabitAssessBGColor"></text>
					<text style="font-size: 28rpx;margin-top: 20rpx;color: #333;">电池使用习惯</text>
					<text style="font-size: 50rpx;font-weight: bold;margin-top: 20rpx;margin-bottom: 30rpx;
					color: #00acdd;" :style="{color:batteryHabitAssessColor}">{{detail.resultTxt.batteryHabitAssess}}</text>
				</view>
				<view style="width: 70%;display: flex;flex-direction: column;align-items: center;
				margin-left: 20rpx;">
					<view class="cell-v">
						<text class="t1">总充电次数</text>
						<text class="t2">{{detail.resultTxt.totalChargeCount}}次</text>
					</view>
					<view class="cell-v" style="background-color: #FFF;">
						<text class="t1">循环次数</text>
						<text class="t2">{{detail.resultTxt.totalChargeSoc}}次</text>
					</view>
					<view class="cell-v">
						<text class="t1">快充占比</text>
						<view><text class="t2">{{detail.resultTxt.fastRatio}} %</text><text
								style="background-color: #fff9ed;border: 1rpx solid #f3a550;
						font-size: 26rpx;padding: 5rpx 10rpx;color: #f3a550;border-radius: 5rpx;margin-right: 10rpx;">{{detail.resultTxt.fastRatioAssess}}</text></view>
					</view>
				</view>
			</view>

			<view style="width: 100%;display: flex;flex-direction: column;background-color: #edfaf9;margin-top: 20rpx;
			border-radius: 20rpx;margin-bottom: 20rpx;">
				<view class="tips-title" v-if="detail.resultTxt.dischargingAttention">
					<image class="iconfont icon-warning"></image>
					<text>注意</text>
				</view>
				<view v-for="(item,index) in JSON.parse(detail.resultTxt.dischargingAttention)"
				 class="tips-info" style="margin-bottom: 0;">
					<rich-text style="white-space: pre-wrap;" :nodes="item"></rich-text>
				</view>
				<view class="tips-title" v-if="detail.resultTxt.dischargingSuggest">
					<image class="iconfont icon-safe"></image>
					<text>建议</text>
				</view>
				<view v-for="(item,index) in JSON.parse(detail.resultTxt.dischargingSuggest)"
				 class="tips-info">
					<rich-text style="white-space: pre-wrap;" :nodes="item"></rich-text>
				</view>
			</view>
		</view>

		<view class="card" style="margin-bottom: 120rpx;">
			<view class="tips-title" style="margin-top: 0;">
				<image class="iconfont icon-safe"></image>
				<text>评估方：株洲云检新能源科技有限公司</text>
			</view>
			<view class="tips-title">
				<image class="iconfont icon-info"></image>
				<text>免责申明</text>
			</view>
			<text
				class="tips-info">本报告提供的评估结果仅基于用户自主填写的车辆信息，结合新能源汽车充电及工况大数据模型进行测算，结果仅供参考。评估方不对任何用户基于本报告内容所做的决策或行动承担任何直接或间接的责任。</text>
		</view>
		
		<view class="customer">
			<view class="iconfont icon-kefu"></view>
			<view class="tx">客服</view>
			<button style="display: flex;flex-direction: column;align-items: center;border: none;background-color: #00000000;
			position: absolute;width: 90%;height: 70rpx;"
			type="default" plain="true" open-type="contact" size="default"></button>
		</view>

		<view class="foot">
			<view class="tiem"><text class="iconfont icon-history"></text>评估时间:{{formatDateOnly(detail.createTime)}}
			</view>
			<view class="export"><button class="white-btn">刷新</button>
				<button class="blue-btn" @click="clickExport()"><text class="iconfont icon-export"></text>导出</button>
			</view>
		</view>

		<uni-popup ref="popupImg" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeImg" @open="openImg"
			background-color="#FFF" >
			<view class="uPop">
				<view class="attestation"><text class="iconfont icon-info"></text>长按报告可保存至手机相册</view>
				<image :src="imgUrl" mode="widthFix" class="imgUrl" style="width: 100%; overflow-y: auto;"
					@longpress="saveImage"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		cloudDetails,
		reportImgUrl
	} from '../../apis/modules/user';
	export default {
		data() {
			return {
				detail: {},
				tabIndex: 0,
				percentage: 0, // 进度条的百分比
				lines: 7, // 放射线的数量
				circles: 3, // 半圆数量
				canvasSrc: '',
				reportImg: '',
				imgUrl: '',
				xsmkTipList:[{text1:"根据模型测算，暂未发现里程异常",text2:"1.报告仅展示最近一次里程异常情况，不表示只出现过一次异常，请结合实际车况判断！"},
				{text1:"根据模型测算，该车辆存在",text2:"可能存在以下情况导致系统识别为里程异常:"}],
				xsmkTipIndex:0,
				batterySohLvColor:'',
				volumeScoreRecessionLvColor:'',
				batteryHabitAssessColor:'',
				batteryHabitAssessBGColor:'',
				checkDisplayMileageListJson:[]
			}
		},
		computed: {
			computedSohBatteryClass() {
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.batterySohLvStr) {
					return this.sohColor(this.detail.resultTxt.batterySohLvStr);
				}
				return '';
			}
		},
		onLoad(op) {
			// op.vinCode = 'LUZEJAJC6PA007400'
			if (op) {
				this.vinCode = op.vinCode;
				// this.isShare = op.share;
				console.log(this.vinCode)
				
				this.getCloudDetails()
				
			}
		},
		methods: {
			getCloudDetails(){
				//获取详情
				cloudDetails({
					vinCode: this.vinCode
				}).then((res) => {
				
					this.detail = res.data
					//格式化json数据
					this.detail.resultTxt = JSON.parse(res.data.resultTxt)
				
					//进度条
					this.percentage = 100 - this.extractedPercentage(this.detail.resultTxt.referRateMileageAssess);
					// console.log('====percentage====>'+this.percentage)
					this.drawHalfCircleProgress();
					
					//电池数据背景颜色
					// 优秀、良好、中等、较差、差
					this.batterySohLvColor = 'bt-green'
					if(this.detail.resultTxt.batterySohLvStr == '优秀'){
						this.batterySohLvColor = 'bt-green'
					}else if(this.detail.resultTxt.batterySohLvStr == '良好'){
						this.batterySohLvColor = 'bt-blue'
					}else if(this.detail.resultTxt.batterySohLvStr == '中等'){
						this.batterySohLvColor = 'bt-yellow'
					}else if(this.detail.resultTxt.batterySohLvStr == '较差'){
						this.batterySohLvColor = 'bt-orange'
					}else if(this.detail.resultTxt.batterySohLvStr == '差'){
						this.batterySohLvColor = 'bt-red'
					}
					
					//安全风险
					// 低，较低，较高，高				
					this.volumeScoreRecessionLvColor = 'bt-green'
					if(this.detail.resultTxt.volumeScoreRecessionLvStr == '低'){
						this.volumeScoreRecessionLvColor = 'bt-green'
					}else if(this.detail.resultTxt.volumeScoreRecessionLvStr == '较低'){
						this.volumeScoreRecessionLvColor = 'bt-blue'
					}else if(this.detail.resultTxt.volumeScoreRecessionLvStr == '较高'){
						this.volumeScoreRecessionLvColor = 'bt-yellow'
					}else if(this.detail.resultTxt.volumeScoreRecessionLvStr == '高'){
						this.volumeScoreRecessionLvColor = 'bt-orange'
					}
					
					//充放电模块
					this.batteryHabitAssessColor = '#50dd7c'
					this.batteryHabitAssessBGColor = 'bt-green'
					if(this.detail.resultTxt.batteryHabitAssess == '优秀'){
						this.batteryHabitAssessBGColor = 'bt-green'
						this.batteryHabitAssessColor = '#50dd7c'
					}else if(this.detail.resultTxt.batteryHabitAssess == '良好'){
						this.batteryHabitAssessBGColor = 'bt-blue'
						this.batteryHabitAssessColor = '#18bbf8'
					}else if(this.detail.resultTxt.batteryHabitAssess == '中等'){
						this.batteryHabitAssessBGColor = 'bt-yellow'
						this.batteryHabitAssessColor = '#fedb64'
					}else if(this.detail.resultTxt.batteryHabitAssess == '较差'){
						this.batteryHabitAssessBGColor = 'bt-orange'
						this.batteryHabitAssessColor = '#fea72d'
					}else if(this.detail.resultTxt.batteryHabitAssess == '差'){
						this.batteryHabitAssessBGColor = 'bt-red'
						this.batteryHabitAssessColor = '#fc5b50'
					}
					
					//判断是否存在里程异常
					this.checkDisplayMileageListJson = JSON.parse(this.detail.resultTxt.checkDisplayMileageListJson)
					if(this.checkDisplayMileageListJson && this.checkDisplayMileageListJson.length>0){
						//存在异常数据
						let yc = false;
						this.checkDisplayMileageListJson.map((item) =>{
							if(item.hasErr){
								this.xsmkTipIndex = 1
							}
						})
					}else{
						this.xsmkTipIndex = 0
					}
				})
			},
			clickTab(index) {
				this.tabIndex = index;
			},
			clickExport() {
				reportImgUrl({
					reportId: this.detail.resultTxt.id,
					type: 1,
					vinCode: this.vinCode
				}).then((res) => {
					this.imgUrl = res.msg
					this.$refs.popupImg.open()
				})
			},
			drawHalfCircleProgress() {
				const ctx = uni.createCanvasContext('progressCanvas', this);
				const x = this.getPx('280rpx'); // 圆心x坐标
				const y = this.getPx('270rpx'); // 圆心y坐标
				const radius = this.getPx('240rpx'); // 半圆的半径

				// 绘制底色半圆
				ctx.beginPath();
				ctx.arc(x, y, radius, Math.PI, 0, false);
				ctx.setLineWidth(this.getPx('40rpx')); // 进度条宽度
				ctx.setStrokeStyle('#e5e5e5'); // 进度条底色
				ctx.stroke();

				// 绘制颜色半圆
				ctx.beginPath();
				ctx.arc(x, y, radius, Math.PI, Math.PI * (1 + (this.percentage / 100)), false);
				ctx.setLineWidth(this.getPx('40rpx')); // 进度条宽度
				ctx.setStrokeStyle('#00acdd'); // 进度条颜色
				ctx.stroke();

				// 绘制网状线条
				for (let i = 0; i < this.lines; i++) {
					ctx.beginPath();
					ctx.moveTo(x, y);
					// 设置角度为从 0 到 π，让射线朝上
					const angle = Math.PI + (-Math.PI / (this.lines - 1)) * i;
					const extendedRadius = radius - this.getPx('20rpx');
					ctx.lineTo(x + extendedRadius * Math.cos(angle), y - extendedRadius * Math.sin(angle));
					ctx.setLineWidth(this.getPx('1rpx'));
					ctx.setStrokeStyle('#e8f2fb'); // 线条颜色
					ctx.stroke();
				}

				// 绘制多个半圆形成网状
				for (let j = 1; j <= this.circles; j++) {
					ctx.beginPath();
					ctx.arc(x, y, ((radius / this.circles) - this.getPx('24rpx')) * j, Math.PI, 0, false);
					ctx.setLineWidth(this.getPx('1rpx'));
					ctx.setStrokeStyle('#e8f2fb'); // 线条颜色
					ctx.stroke();
				}

				// ctx.draw();
				ctx.draw(false, () => {
					let self = this;
					uni.canvasToTempFilePath({
						canvasId: 'progressCanvas',
						success: function(res) {
							self.canvasSrc = res.tempFilePath;
						},
					})
				})
			},
			getPx(value, unit = false) {
				if (this.number(value)) {
					return unit ? `${value}px` : Number(value)
				}
				// 如果带有rpx，先取出其数值部分，再转为px值
				if (/(rpx|upx)$/.test(value)) {
					return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)))
				}
				return unit ? `${parseInt(value)}px` : parseInt(value)
			},
			number(value) {
				return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
			},
			saveImage() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否保存图片到相册？',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								title: 'Loading...'
							});
							let imageUrl = that.imgUrl;
							// 下载图片
							uni.downloadFile({
								url: imageUrl,
								success: downloadResult => {
									uni.hideLoading();
									if (downloadResult.statusCode === 200) {
										// 下载成功，保存图片到系统相册
										uni.saveImageToPhotosAlbum({
											filePath: downloadResult.tempFilePath,
											success: () => {
												uni.showToast({
													title: '图片保存成功'
												});
											},
											fail: () => {
												uni.showToast({
													title: '图片保存失败',
													icon: 'none'
												});
											}
										});
									} else {
										uni.showToast({
											title: '图片下载失败',
											icon: 'none'
										});
									}
								},
								fail: () => {
									uni.hideLoading();
									uni.showToast({
										title: '图片下载失败',
										icon: 'none'
									});
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			extractedPercentage(str) {
				const regex = /[-+]?\d*\.\d+|\d+/; // 正则表达式匹配数字，包括负数、整数和浮点数
				const match = str.match(regex); // 使用match方法找到匹配的数字部分
				return match ? parseFloat(match[0]) : null; // 将匹配到的字符串转换为浮点数，如果没有匹配到则返回null
			},
			closeImg() {
				this.$refs.popupImg.close()
			},
			openImg() {
				this.$refs.popupImg.open()
			},
			formatDateOnly(dateTimeString) {
				var date = new Date(dateTimeString);
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var day = ("0" + date.getDate()).slice(-2);
				return year + "-" + month + "-" + day;
			},
			sohColor(str) {
				// 优秀 sohGREEN
				// 良好 sohBLUE
				// 中等 sohORANGE
				// 较差 sohORANGE2
				// 差 sohRED
				let color = ''
				if (str.includes('优秀')) {
					color = 'sohGREEN'
				} else if (str.includes('良好')) {
					color = 'sohBLUE'
				} else if (str.includes('中等')) {
					color = 'sohORANGE'
				} else if (str.includes('较差')) {
					color = 'sohORANGE2'
				} else if (str.includes('差')) {
					color = 'sohRED'
				}
				return color;
			},
			cliackYanbao(){
				uni.navigateTo({
					url:'/pagesA/warranty/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background: linear-gradient(180deg, #1b9f90, 17%, #27a46c 46%, #3cc6f3);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		font-size: 30rpx;
	}

	.page::after {
		content: " ";
		display: block;
		height: 84rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom)
	}

	.tabs {
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #FFF;
		border-radius: 15rpx;
		padding-top: 5rpx;
		padding-bottom: 10rpx;
		margin-top: 25rpx;

		.t {
			line-height: 70rpx;
			width: 25%;
			border-radius: 15rpx;
			margin-left: 5rpx;
			margin-right: 5rpx;
			text-align: center;
			color: #333;
			font-size: 30rpx;
			font-weight: normal;
		}

		.t-selected {
			background: linear-gradient(144.27deg, #00aede, #47ad13);
			color: #FFF;
			font-weight: bold;
		}
	}

	.card {
		width: 90%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;
		margin-top: 20rpx;

		.title-v {
			display: flex;
			flex-direction: row;
			align-items: center;

			.dot {
				width: 12rpx;
				height: 35rpx;
				background: linear-gradient(180deg, #00acdd, #47ad13);
				border-radius: 5rpx;
			}

			.title {
				font-weight: bold;
				color: #111;
				margin-left: 15rpx;
			}

			.time {
				font-size: 26rpx;
				color: #666;
				margin-left: 15rpx;
			}
		}
	}

	.ehr {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3rpx;
		width: 314rpx;
		margin: 40rpx auto 0;

		.power {
			font-size: 30rpx;
			font-weight: 600;
			margin: 0 10rpx;
			color: #333
		}
	}

	.ehr:before,
	.ehr:after {
		content: " ";
		height: 1px;
		background-color: #e5e5e5;
		font-size: 0;
		flex-grow: 1
	}

	.progress-canvas {
		width: 85%;
		height: 280rpx;
	}

	.foot {
		z-index: 99;
		position: fixed;
		bottom: 0;
		left: var(--window-left);
		right: var(--window-right);
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		box-sizing: border-box;
		box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
		border-top: 1px solid #e8e8e8;
		padding-bottom: calc(constant(safe-area-inset-bottom) - 20rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) - 20rpx);

		.tiem {
			color: #383838;
			display: flex;
			align-items: center;
			line-height: 1;
			font-size: 28rpx;

			.icon-history {
				font-size: 35rpx;
				margin-right: 15rpx;
				color: #30ad55;
			}
		}

		.export {
			display: flex;
			align-items: center;
			padding: 20rpx 0;

			.white-btn {
				width: auto;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 10rpx;
				padding: 0 20rpx;
				margin-left: 20rpx;
				background: #fff;
				font-size: 30rpx;
				color: #30ad55;
				border: 1rpx solid #30ad55;
				transform: rotate(1turn);
			}

			.blue-btn {
				width: auto;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 10rpx;
				padding: 0 20rpx;
				margin-left: 20rpx;
				background: linear-gradient(135deg, #30ad55, #47ad13);
				color: #fff;
				font-size: 30rpx;
			}

			.white-btn::after {
				border: 0;
			}

			.blue-btn.disable,
			.white-btn.disable {
				-webkit-filter: grayscale(100%);
				filter: grayscale(100%);
				opacity: 0.7;
			}
		}
	}

	.referV2 {
		border-radius: 10rpx;
		background: rgba(255, 251, 230, 0.49);
		border: 1rpx solid #ffe58f;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 10rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #faad14;
		line-height: 30rpx;
		margin-top: 20rpx;

		.icon-info {
			margin-right: 8rpx;
			font-size: 32rpx;
		}
	}

	.sohBattery {
		width: 100%;
		border-radius: 12rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		background: linear-gradient(to bottom, #18bbf8, #149eda 100%);
		margin-top: 20rpx;

		.iconBox {
			width: 124rpx;
			height: 124rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			background: linear-gradient(135.41deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .36));
			margin-left: 20rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;

			.icon-battery {
				font-size: 80rpx;
			}
		}

		.battertTxt {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: end;
			align-items: flex-end;
			margin-right: 20rpx;

			.txT {
				font-size: 32rpx;
				font-weight: bold;
				width: 100%;
				text-align: right;
			}

			.txBox {
				margin-top: 8rpx;
				width: 100%;
				display: flex;
				justify-content: flex-end;
				margin-top: 10rpx;

				.txB {
					font-size: 60rpx;
					font-weight: 900;
					margin-right: 20rpx;
					align-self: flex-end;

					.text {
						font-size: 28rpx;
					}
				}

				.txBr {
					height: 68rpx;
					width: 120rpx;
					border-radius: 10rpx;
					background: hsla(0, 0%, 100%, .2);
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	
	.bt-green{
		background: linear-gradient(to bottom, #50dd7c, #3fcc6c 100%);
	}
	.sbt-blue{
		background: linear-gradient(to bottom, #18bbf8, #149eda 100%);
	}
	.bt-yellow{
		background: linear-gradient(to bottom, #fedb64, #ffc93d 100%)
	}
	.bt-orange{
		background: linear-gradient(to bottom, #fea72d, #fd7a11 100%)
	}
	.bt-red{
		background: linear-gradient(to bottom, #fc5b50, #fa2b32 100%);
	}

	.cell-v {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #edfaf9;
		line-height: 85rpx;
		border-radius: 10rpx;
		font-size: 30rpx;

		.t1 {
			color: #666;
			margin-left: 20rpx;
		}

		.t2 {
			color: #333;
			margin-right: 20rpx;
		}
	}

	.tips-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 35rpx;
		margin-left: 20rpx;

		image {
			width: 40rpx;
			height: 40rpx;
		}

		text {
			font-weight: bold;
			color: #000;
		}
	}

	.tips-info {
		width: 93%;
		font-size: 28rpx;
		color: #666;
		margin-top: 20rpx;
		align-self: center;
		margin-bottom: 45rpx;
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
	
	.customer {
		position: fixed;
		right: 20rpx;
		bottom: 185rpx;
		z-index: 7;
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		background: #30ad55;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 8rpx rgba(0, 0, 0, .15);
		color: #fff;
	
		.tx {
			font-size: 24rpx;
		}
	}
</style>