<template>
	<view class="page" v-if="detail">
		<view class="batteryBox">
			<view class="vin">车架号：{{detail.vinCode}}</view>
		</view>
		<view class="evaluationBox">
			<view class="battery" style="margin-top: 0px;" v-if="false">
				<view class="adjust undefined">
					<view style="height: 50rpx;"></view>
					<view class="iconfont icon-battery"></view>
					<view style="height: 30rpx;"></view>
					<text class="adjustTxt">查看电池剩余容量、车辆表显里程，以及回收参<br>考估价，能为您买卖电池提供有效的参考信息！</text>
						<button class="btn">+20积分 评估电池使用情况</button>
					<view style="height: 50rpx;"></view>
				</view>
			</view><!---->
			<view class="demand" v-if="false">车数万维提供电池回收服务，您可以立即提交您的需求</view>
			<view class="demandBtn" v-if="false">
				<view class="ask">官方回收</view>
			</view>
			<view class="tit titList">电池包信息</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">标称电量</view>
					<view class="h1">{{detail.resultTxt.nominalEnergy}}<text class="txt">kWh</text></view>
				</view>
				<view class="twoBox">
					<view class="p">电池包重量</view>
					<view class="h1">{{detail.resultTxt.batteryWeight}}<text class="txt">kg</text></view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">电池材料</view>
					<view class="h1">磷酸铁锂电池</view>
				</view>
				<view class="twoBox">
					<view class="p">标称电压</view>
					<view class="h1">{{detail.resultTxt.ratingVolt}}<text class="txt">V</text></view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">标称容量</view>
					<view class="h1">{{detail.resultTxt.rateCapacity}}<text class="txt">Ah</text></view>
				</view>
				<view class="twoBox">
					<view class="p">电池单体数量</view>
					<view class="h1">{{detail.resultTxt.cellTotalNumber}}</view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox" style="width: 100%;">
					<view class="p">电池包结构</view>
					<view class="h1">{{detail.resultTxt.batterySeriesParallel}}</view>
				</view>
			</view>
			<view class="tit titList">电芯信息</view>
			<view class="autoBox">
				<view class="twoBox" style="width: 100%;">
					<view class="p">电池单体品牌</view>
					<view class="h1">{{detail.resultTxt.batteryManufacturer}}</view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">电芯形状</view>
					<view class="h1">{{detail.resultTxt.cellShape}}</view>
				</view>
				<view class="twoBox">
					<view class="p">电芯电压</view>
					<view class="h1">{{detail.resultTxt.batteryVoltUnit}}<text class="txt">V</text></view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">电芯容量</view>
					<view class="h1">{{detail.resultTxt.batteryVolumeUnit}}<text class="txt">Ah</text></view>
				</view>
				<view class="twoBox">
					<view class="p">电芯重量</view>
					<view class="h1">{{detail.resultTxt.batteryWeightUnit}}<text class="txt">kg</text></view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">电芯类型细分</view>
					<view class="h1">{{detail.resultTxt.batteryTypeNumber}}</view>
				</view>
				<view class="twoBox">
					<view class="p">电芯型号</view>
					<view class="h1">{{detail.resultTxt.batteryModelNumber}}</view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox" style="width: 100%;">
					<view class="p">电芯尺寸</view>
					<view class="h1"><text>{{detail.resultTxt.batteryModel}} mm</text></view>
				</view>
			</view>
			<view class="tit titList">整车信息</view>
			<view class="autoBox">
				<view class="twoBox" style="width: 100%;">
					<view class="p">车辆生产企业</view>
					<view class="h1">{{detail.resultTxt.carManufacturer}}</view>
				</view>
			</view>
			<view class="autoBox">
				<view class="twoBox">
					<view class="p">动力类型</view>
					<view class="h1">{{detail.resultTxt.fueltype}}</view>
				</view>
				<view class="twoBox">
					<view class="p">车辆品牌</view>
					<view class="h1">{{detail.resultTxt.brand}}</view>
				</view>
			</view>
			<view class="illustrate">
				<view class="explain">
					<view class="tit"><text class="iconfont icon-info"></text>评估说明</view>
					<view class="e_p pb1">1. 我司基于您提交的鼓包、漏液、泡水、火烧情况进行估值，如未选择则默认电池完好；</view>
					<view class="e_p pb1">2. 本估价报告有效期15天，但因原材料价格波动导致的价格波动不在本报告考虑范围内；</view>
					<view class="e_p pb1">3. 如发生特殊情况导致电池容量低于80%，电池价格需重新评估。</view>
				</view><!---->
				<view class="explain">
					<view class="tit"><text class="iconfont icon-warning"></text>免责申明</view>
					<view class="e_p">
						本报告提供的所有内容及判断仅基于截止到评估日期收集的相关数据信息，所有数据信息均来自第三方。关于此车辆/电池的部分数据可能未被采集或收录。本报告仅是交易参考资料之一，请您结合实际勘测结果，做出更精准的决策。
					</view>
				</view>
			</view><!---->
		</view>
		<view class="customer">
			<view class="iconfont icon-kefu" style="font-size: 32rpx;"></view>
			<view class="tx" >客服</view>
			<button style="display: flex;flex-direction: column;align-items: center;border: none;background-color: #00000000;
			position: absolute;width: 90%;height: 70rpx;"
			type="default" plain="true" open-type="contact" size="default"></button>
		</view><!----><!----><!---->
		<view style="height: 78px;"></view>
		<view class="foot">
			<view class="tiem"><text class="iconfont icon-history"></text>评估时间:{{formatDateOnly(detail.createTime)}}</view>
			<view class="export"><button class="blue-btn" @click="clickExport"><text
						class="iconfont icon-export"></text>导出报告</button></view>
		</view><!---->
		<view style="display: none;">
			<view class="popup_mask"></view>
			<view class="popup_content">
				<view class="iconfont icon-fail"></view>
				<view class="pTitle">积分余额不足</view><image class="integralImg"
					style="position: relative;">
					<div
						style="background-image: url(../../static/icon-no-integral.png); background-size: 100% 100%; background-repeat: no-repeat;">
					</div><uni-resize-sensor>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
					</uni-resize-sensor><img src="../../static/icon-no-integral.png" draggable="false">
				</image>
				<view class="explain_text">此次查询预计需要消费<text
						class="b">()积分</text>,您的积分余额不足。是否充值以完成本次查询？</view>
				<view class="button"><button class="butPay">立即支付<text
							data-v-ab5cdc6c=""></text>元</button><!----><button
						class="butGoPay">
						<view class="iconfont icon-discount"></view>更多优惠充值套餐
					</button></view>
			</view>
		</view>

		<uni-popup ref="popupImg" type="bottom" border-radius="15rpx 15rpx 0 0" @close="closeImg" @open="openImg"
			background-color="#FFF">
			<view class="uPop">
				<view class="attestation"><text class="iconfont icon-info"></text>长按报告可保存至手机相册</view>
				<image :src="imgUrl" mode="widthFix" class="imgUrl" style="width: 100%; overflow-y: auto;"
					@longpress="saveImage"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {
		eleDetails,
		reportImgUrl
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				isEmpty: false,
				vinCode: '',
				detail: '',
				imgUrl: ''
			}
		},
		onLoad(op) {
			if(op){
				this.vinCode = op.vinCode;
				console.log(this.vinCode)
				//获取详情
				eleDetails({
					vinCode:this.vinCode
				}).then((res) => {
					this.detail = res.data
					//格式化json数据
					this.detail.resultTxt = JSON.parse(res.data.resultTxt)
				})
			}
		},
		methods: {
			clickTab(index) {
				this.curIndex = index;
			},
			clickRefreash() {
				this.$u.toast('刷新');
			},
			clickExport() {
				reportImgUrl({
					reportId: this.detail.resultTxt.id,
					vinCode: this.vinCode
				}).then((res) => {
					this.imgUrl = res.msg
					this.$refs.popupImg.open()
				})
			},
			closeImg(){
				this.$refs.popupImg.close()
			},
			openImg(){
				this.$refs.popupImg.open()
			},
			saveImage() {
				let imageUrl = this.imgUrl;
				// 下载图片
				uni.downloadFile({
					url: imageUrl,
					success: downloadResult => {
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
						uni.showToast({
							title: '图片下载失败',
							icon: 'none'
						});
					}
				});
			},
			formatDateOnly(dateTimeString) {
			    var date = new Date(dateTimeString);
			    var year = date.getFullYear();
			    var month = ("0" + (date.getMonth() + 1)).slice(-2);
			    var day = ("0" + date.getDate()).slice(-2);
			    return year + "-" + month + "-" + day;
			}
		}
	}
</script>

<style lang="scss">
	.adjust{
	  background: #f7f7f7;
	  border: 1px solid #dedede;
	  border-radius: 10rpx;
	  // padding: 30rpx 40rpx 40rpx;
	  text-align: center;
	  color: #a6a6a6
	}
	
	.adjust .icon-dashboard,
	.adjust .icon-battery{
	  font-size: 110rpx;
	  margin-bottom: 8rpx
	}
	
	.adjust .adjustTxt{
	  font-size: 28rpx
	}
	
	.false{
	  background: #f0f9eb;
	  border-color: #bde3ab;
	  color: #47ad13
	}
	
	.undefined{
	  background: #f0fafa;
	  border-color: #d1e6e3;
	  color: #00acdd
	}
	
	.undefined .btn{
	  border: 1px solid #00acdd;
	  background: #fff;
	  height: 64rpx;
	  line-height: 64rpx;
	  border-radius: 64rpx;
	  color: #00acdd;
	  font-weight: 600;
	  font-size: 28rpx;
	  width: 342rpx;
	  margin: 20rpx auto 0
	}
	
	.batteryBox{
	  position: relative
	}
	
	.batteryBox .img{
	  width: 100%;
	  height: 400rpx
	}
	
	.batteryBox .vin{
	  position: absolute;
	  top: 10rpx;
	  left: 0;
	  width: calc(100% - 60rpx);
	  margin: 0 30rpx;
	  height: 80rpx;
	  line-height: 80rpx;
	  border-radius: 16rpx;
	  font-size: 26rpx;
	  background: linear-gradient(180deg, hsla(0, 0%, 100%, .3), hsla(0, 0%, 100%, .1));
	  text-align: center;
	  color: #fff
	}
	
	.batteryBox .recovery{
	  position: absolute;
	  left: 0;
	  bottom: 130rpx;
	  text-align: center;
	  width: 100%
	}
	
	.batteryBox .recovery .p{
	  font-weight: 300;
	  color: #fff;
	  font-size: 26rpx;
	  margin-bottom: 14rpx;
	  display: flex;
	  align-items: center;
	  padding: 0 10rpx;
	  justify-content: center
	}
	
	.batteryBox .recovery .p:before,
	.batteryBox .recovery .p:after {
	  content: " ";
	  height: 1rpx;
	  background-color: hsla(0, 0%, 100%, .3);
	  width: 30rpx
	}
	
	.batteryBox .recovery .h1{
	  font-size: 52rpx;
	  font-weight: 600;
	  color: #fff
	}
	
	.batteryBox .recovery .h1 .t{
	  font-size: 32rpx;
	  margin: 0 6rpx;
	  font-weight: 600;
	  color: #fff
	}
	
	.evaluationBox{
	  border-radius: 20rpx;
	  background: #fff;
	  position: relative;
	  padding: 30rpx 30rpx;
	  box-sizing: border-box
	}
	
	.evaluationBox .demand{
	  color: grey;
	  font-size: 26rpx;
	  text-align: center;
	  margin-bottom: 30rpx
	}
	
	.evaluationBox .demandBtn{
	  margin-bottom: 36rpx;
	  display: flex;
	  justify-content: space-between
	}
	
	.evaluationBox .demandBtn .sell,
	.evaluationBox .demandBtn .ask{
	  color: #fff;
	  width: calc(50% - 15rpx);
	  height: 76rpx;
	  border-radius: 50rpx;
	  font-size: 28rpx;
	  text-align: center;
	  line-height: 76rpx;
	  background: linear-gradient(135deg, #00acdd, #47ad13);
	  box-shadow: 0 2px 10px 0 rgba(18, 140, 91, .3)
	}
	
	.evaluationBox .demandBtn .ask{
	  background: linear-gradient(136.25deg, #ffb300, #ff5833);
	  box-shadow: 0 2px 10px 0 rgba(145, 92, 0, .3)
	}
	
	.evaluationBox .tit{
	  height: 90rpx;
	  line-height: 90rpx;
	  font-size: 32rpx;
	  color: #383838;
	  font-weight: 600
	}
	
	.evaluationBox .tit:before {
	  content: "";
	  display: inline-block;
	  height: 36rpx;
	  background: linear-gradient(180deg, #00acdd, #47ad13);
	  width: 12rpx;
	  vertical-align: -6rpx;
	  margin-right: 20rpx;
	  border-radius: 10rpx
	}
	
	.evaluationBox .orangeBox{
	  margin-top: 36rpx;
	  background: #fff8ed;
	  border-radius: 20rpx;
	  border: 1px solid rgba(243, 165, 79, .3);
	  color: #f3a54f;
	  padding: 20rpx 20rpx 20rpx 60rpx;
	  font-size: 22rpx;
	  position: relative;
	  margin-bottom: 10rpx
	}
	
	.evaluationBox .orangeBox .iconfont{
	  position: absolute;
	  top: 25rpx;
	  left: 20rpx;
	  color: #f3a54f
	}
	
	.evaluationBox .speedBox{
	  background: #f2faf9;
	  border-radius: 10rpx;
	  padding: 30rpx
	}
	
	.evaluationBox .speed{
	  display: flex;
	  flex-wrap: wrap;
	  align-items: center
	}
	
	.evaluationBox .speed .left{
	  width: 140rpx;
	  flex-shrink: 0;
	  color: #383838;
	  font-size: 26rpx
	}
	
	.evaluationBox .speed .middle{
	  flex: 1
	}
	
	.evaluationBox .speed .right{
	  width: 140rpx;
	  flex-shrink: 0;
	  font-size: 30rpx;
	  font-weight: 600;
	  text-align: right
	}
	
	.evaluationBox .speed .time{
	  font-size: 24rpx;
	  width: 100%;
	  text-align: center;
	  margin-top: 16rpx
	}
	
	.evaluationBox .illustrate{
	  margin-top: 20rpx;
	  background: #f7f7f7;
	  padding: 20rpx;
	  border-radius: 10rpx;
	  margin-bottom: 34rpx
	}
	
	.evaluationBox .explain{
	  margin-top: 0;
	  margin-bottom: 20rpx;
	  width: 100%
	}
	
	.evaluationBox .explain:last-child {
	  margin-bottom: 4rpx
	}
	
	.evaluationBox .explain .tit{
	  height: 45rpx !important;
	  line-height: 45rpx !important;
	  display: flex;
	  align-items: center;
	  font-size: 28rpx
	}
	
	.evaluationBox .explain .tit:before {
	  display: none !important
	}
	
	.evaluationBox .explain .e_p{
	  color: rgba(0, 0, 0, .5);
	  font-size: 24rpx;
	  line-height: 1.6
	}
	
	.evaluationBox .explain .pb1{
	  margin-top: 10rpx
	}
	
	.battery{
	  margin-top: 20rpx
	}
	
	.battery .view{
	  width: 100%;
	  margin-bottom: 24rpx;
	  border-radius: 10rpx;
	  overflow: hidden
	}
	
	.battery .view .viewTop{
	  height: 100rpx;
	  text-align: left;
	  color: #fff;
	  background: #f56c6c;
	  font-size: 32rpx;
	  font-weight: 600;
	  display: flex;
	  padding: 0 24rpx;
	  align-items: center;
	  justify-content: space-between
	}
	
	.battery .view .viewTop .h1{
	  color: #fff;
	  font-size: 34rpx;
	  text-align: center;
	  display: flex;
	  align-items: center
	}
	
	.battery .view .viewTop .h1 .iconfont{
	  font-weight: 400;
	  margin-right: 24rpx;
	  font-size: 50rpx
	}
	
	.battery .view .viewTop .h1 .iconfont.icon-question{
	  font-size: 40rpx;
	  opacity: .6;
	  padding-left: 10rpx
	}
	
	.battery .view .viewBox{
	  padding-top: 30rpx;
	  box-sizing: border-box;
	  background: #fef0f0;
	  display: flex;
	  flex-wrap: wrap
	}
	
	.battery .view .viewBox .viewB{
	  padding: 24rpx
	}
	
	.battery .view .viewBox .vList{
	  flex: 1;
	  border-right: 1rpx solid rgba(0, 0, 0, .1);
	  text-align: center
	}
	
	.battery .view .viewBox .vList .h1{
	  color: #333;
	  font-size: 36rpx;
	  font-weight: 600;
	  margin-bottom: 0
	}
	
	.battery .view .viewBox .vList .p{
	  color: grey;
	  margin-top: 10rpx;
	  font-size: 24rpx;
	  line-height: 1.6;
	  margin-bottom: 0
	}
	
	.battery .view .viewBox .vList:nth-child(2) {
	  border-right: 0
	}
	
	.battery .view .viewBox .c_explain{
	  border-top: 1rpx solid rgba(0, 0, 0, .1);
	  text-align: center;
	  font-size: 24rpx;
	  color: #f56c6c;
	  width: 100%;
	  padding: 24rpx 0;
	  margin: 24rpx 24rpx 0
	}
	
	.copyright{
	  margin-top: 24rpx;
	  padding-top: 30rpx;
	  box-sizing: border-box;
	  background: #f7f7f7;
	  text-align: center
	}
	
	.copyright .p{
	  font-size: 24rpx;
	  color: grey;
	  margin-bottom: 18rpx
	}
	
	.copyright .p .C{
	  font-size: 28rpx;
	  margin: 0 9rpx;
	  vertical-align: -2rpx
	}
	
	.copyright .hr{
	  height: 4rpx;
	  width: 72rpx;
	  background: #e5e5e5;
	  margin: 0 auto 24rpx
	}
	
	.copyright .url{
	  color: #00acdd;
	  font-size: 28rpx
	}
	
	.copyright .mpCode{
	  margin: 54rpx 66rpx 0;
	  display: flex;
	  padding-bottom: 58rpx
	}
	
	.copyright .mpCode .code{
	  width: 200rpx;
	  height: 255rpx;
	  margin: 0 40rpx;
	  background: #fff;
	  border-radius: 10rpx;
	  padding: 5rpx;
	  box-sizing: border-box
	}
	
	.copyright .mpCode .code .codeImg{
	  width: 190rpx;
	  height: 190rpx
	}
	
	.copyright .mpCode .code .codeTxt{
	  font-size: 22rpx;
	  text-align: center
	}
	
	.autoBox{
	  display: flex;
	  justify-content: space-between;
	  flex-wrap: wrap
	}
	
	.autoBox .mb11{
	  margin-bottom: 22rpx
	}
	
	.autoBox .twoBox,
	.autoBox .threeBox{
	  width: calc(50% - 10rpx);
	  padding: 20rpx;
	  box-sizing: border-box;
	  text-align: center;
	  background: #f2faf9;
	  border-radius: 10rpx;
	  margin: 11rpx 0
	}
	
	.autoBox .twoBox .p,
	.autoBox .threeBox .p{
	  color: grey;
	  font-size: 24rpx;
	  position: relative
	}
	
	.autoBox .twoBox .tx,
	.autoBox .threeBox .tx{
	  height: 36rpx;
	  font-size: 24rpx;
	  color: #383838
	}
	
	.autoBox .twoBox .h1,
	.autoBox .threeBox .h1{
	  color: #383838;
	  font-size: 30rpx;
	  font-weight: 600;
	  padding-top: 6rpx;
	  line-height: 40rpx
	}
	
	.autoBox .twoBox .h1 .txt,
	.autoBox .threeBox .h1 .txt{
	  margin-left: 8rpx
	}
	
	.autoBox .twoBox .h1 .iconfont,
	.autoBox .threeBox .h1 .iconfont{
	  font-weight: 400;
	  color: #999;
	  padding-left: 6rpx
	}
	
	.autoBox .threeBox{
	  width: calc(33.33% - 10rpx)
	}
	
	.autoBox .orangeBg{
	  background: #fff8ed;
	  margin: 0
	}
	
	.autoBox .orangeBg .p{
	  color: #383838
	}
	
	.autoBox .orangeBg .h1{
	  color: #f3a54f;
	  font-size: 36rpx
	}
	
	.autoBox .buleBg{
	  background: #f5faff;
	  margin: 0
	}
	
	.autoBox .buleBg .p{
	  color: #383838
	}
	
	.autoBox .buleBg .h1{
	  color: #00acdd;
	  font-size: 36rpx
	}
	
	.autoBox .circulate{
	  margin: 20rpx 0;
	  width: calc(33.33% - 10rpx);
	  position: relative
	}
	
	.autoBox .circulate .tag{
	  margin: 0;
	  padding: 0 8rpx
	}
	
	.autoBox .circulate .circle{
	  width: 208rpx;
	  height: 208rpx
	}
	
	.autoBox .circulate .tBox{
	  position: absolute;
	  height: 208rpx;
	  width: 208rpx;
	  top: 0;
	  left: 0;
	  text-align: center;
	  padding-top: 60rpx
	}
	
	.autoBox .circulate .p1{
	  width: 100%;
	  text-align: center;
	  font-size: 22rpx;
	  color: grey
	}
	
	.autoBox .circulate .h1{
	  width: 100%;
	  text-align: center;
	  margin: 5rpx 0;
	  font-size: 36rpx;
	  font-weight: 600;
	  color: #383838
	}
	
	.foot{
	  z-index: 100;
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
	  padding-bottom: calc(env(safe-area-inset-bottom) - 20rpx)
	}
	
	.foot .tiem{
	  color: #383838;
	  display: flex;
	  align-items: center;
	  height: 64rpx;
	  font-size: 28rpx
	}
	
	.foot .tiem .icon-history{
	  font-size: 35rpx;
	  margin-right: 15rpx;
	  color: #00acdd
	}
	
	.foot .export{
	  display: flex;
	  align-items: center;
	  padding: 20rpx 0
	}
	
	.foot .export .blue-btn,
	.foot .export .white-btn{
	  width: auto;
	  height: 64rpx;
	  line-height: 64rpx;
	  border-radius: 10rpx;
	  padding: 0 20rpx;
	  margin-left: 20rpx;
	  font-size: 30rpx;
	  color: #fff;
	  background: linear-gradient(135deg, #00acdd, #47ad13);
	}
	
	.foot .export .blue-btn.disable,
	.foot .export .white-btn.disable{
	  -webkit-filter: grayscale(100%);
	  filter: grayscale(100%);
	  opacity: .7
	}
	
	.foot .export .white-btn::after {
	  border: 0
	}
	
	.modelTit{
	  height: 96rpx;
	  line-height: 96rpx;
	  background: #fff;
	  position: relative;
	  padding: 0 30rpx
	}
	
	.modelTit .icon-fail{
	  position: absolute;
	  right: 10rpx;
	  top: -10rpx;
	  z-index: 1;
	  padding: 10rpx;
	  font-size: 36rpx;
	  color: rgba(0, 0, 0, .5)
	}
	
	.modelBottom{
	  background: #f5f5f5;
	  padding: 44rpx 40rpx;
	  height: auto;
	  line-height: normal;
	  display: block
	}
	
	.modelBottom .confirmRefund{
	  height: 96rpx;
	  line-height: 96rpx;
	  color: #fff;
	  background: linear-gradient(135deg, #00acdd, #47ad13);
	  border-radius: 20rpx;
	  font-size: 32rpx
	}
	
	.modelBottom .checkActive{
	  background: linear-gradient(135deg, rgba(0, 172, 221, .5), rgba(71, 173, 19, .5))
	}
	
	.modelBottom .tips{
	  text-align: center;
	  font-size: 26rpx;
	  color: #383838;
	  margin-top: 30rpx
	}
	
	.modelBottom .pt{
	  height: 90rpx;
	  line-height: 90rpx;
	  font-weight: 300;
	  color: #a6a6a6;
	  font-size: 26rpx;
	  margin-bottom: 14rpx;
	  display: flex;
	  align-items: center;
	  padding: 0 10rpx;
	  justify-content: center
	}
	
	.modelBottom .pt:before,
	.modelBottom .pt:after {
	  content: " ";
	  height: 1rpx;
	  margin: 0 20rpx;
	  background-color: #e5e5e5;
	  width: 30rpx
	}
	
	.modelBottom .steps{
	  padding: 34rpx 24rpx;
	  background: #fff;
	  border-radius: 20rpx
	}
	
	.modelBottom .steps .stepsBox{
	  display: flex
	}
	
	.modelBottom .steps .stepsBox .number-item{
	  width: 40rpx;
	  padding: 0 20rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center
	}
	
	.modelBottom .steps .stepsBox .number-item .index{
	  color: #ccc;
	  font-size: 24rpx;
	  border: 1px solid #ccc;
	  width: 40rpx;
	  line-height: 40rpx;
	  height: 40rpx;
	  text-align: center;
	  border-radius: 50%
	}
	
	.modelBottom .steps .stepsBox .number-item .indexLine{
	  flex: 1;
	  width: 4rpx;
	  background: #ccc
	}
	
	.modelBottom .steps .stepsBox .steps-right{
	  margin-bottom: 28rpx
	}
	
	.modelBottom .steps .stepsBox .steps-right .h1{
	  font-size: 28rpx;
	  font-weight: 600;
	  color: #000;
	  margin-bottom: 5rpx
	}
	
	.modelBottom .steps .stepsBox .steps-right .p{
	  font-size: 26rpx;
	  color: #909090
	}
	
	.modelBottom .steps .stepsBox.cur .index{
	  background: #45ad17;
	  color: #fff;
	  border: 0
	}
	
	.modelBottom .steps .stepsBox.cur .indexLine{
	  background: #45ad17
	}
	
	.modelBottom .steps .stepsBox.cur .h1,
	.modelBottom .steps .stepsBox.cur .p{
	  color: #45ad17
	}
	
	.modelBottom .stepsBox:last-child .indexLine{
	  width: 0;
	  display: none
	}
	
	.regBox .input-box{
	  position: relative
	}
	
	.regBox .input-box .pnt{
	  padding-right: 80rpx;
	  line-height: 96rpx;
	  padding: 0 24rpx;
	  font-size: 30rpx
	}
	
	.regBox .input-box .icon-location{
	  position: absolute;
	  top: 0rpx;
	  right: 44rpx;
	  color: #00acdd;
	  font-size: 50rpx
	}
	
	.regBox .input-box .an{
	  position: absolute;
	  top: 30rpx;
	  right: 44rpx;
	  width: 40rpx;
	  height: 40rpx;
	  -webkit-transform: rotate(1turn);
	  animation: rotation-data-v-7e62191c 1 linear infinite;
	  -moz-animation: rotation-data-v-7e62191c 1s linear infinite;
	  -webkit-animation: rotation-data-v-7e62191c 1s linear infinite;
	  -o-animation: rotation-data-v-7e62191c 1s linear infinite
	}
	
	@-webkit-keyframes rotation-data-v-7e62191c {
	  from {
	    -webkit-transform: rotate(0deg)
	  }
	
	  to {
	    -webkit-transform: rotate(1turn)
	  }
	}
	
	.noVi{
	  border-radius: 10rpx;
	  border: 1px solid #fde2e2;
	  font-size: 24rpx;
	  color: #f56c6c;
	  padding: 12rpx 20rpx;
	  display: flex;
	  align-items: center;
	  margin-bottom: 24rpx
	}
	
	.noVi .icon-warning{
	  margin-right: 12rpx
	}
	
	.batteryBox{
	  height: 128rpx;
	  background: linear-gradient(180deg, #00acdd 20%, #47ad13 180%)
	}
	
	uni-button.soButt{
	  line-height: normal
	}
	
	.soButt{
	  background: none
	}
	
	.soButt::after {
	  border: 0
	}
	
	.evaluationBox .demand{
	  margin-top: 30rpx
	}
	
	.evaluationBox .demandBtn .ask{
	  width: 560rpx;
	  margin: 0 auto;
	  height: 96rpx;
	  line-height: 96rpx;
	  font-size: 32rpx;
	  font-weight: 700
	}
	
	.evaluationBox .explain .tit .iconfont{
	  margin-right: 8rpx
	}
	
	.evaluationBox .speed{
	  display: block;
	  background: #f0fafa;
	  border-radius: 10rpx;
	  height: 134rpx;
	  padding: 20rpx;
	  box-sizing: border-box
	}
	
	.evaluationBox .speed .speedB{
	  display: flex;
	  flex-wrap: wrap;
	  align-items: center;
	  height: 36rpx;
	  overflow: hidden;
	  width: 100%
	}
	
	.evaluationBox .speed .time{
	  margin-top: 22rpx;
	  text-align: right;
	  color: grey
	}
	
	.evaluationBox .orangeBox{
	  margin-top: 20rpx
	}
	
	.evaluationBox .trends{
	  height: 98rpx;
	  display: flex;
	  align-items: center;
	  padding: 0 20rpx;
	  box-sizing: border-box;
	  border-bottom: 1rpx solid #e5e5e5
	}
	
	.evaluationBox .trends .lt{
	  width: 238rpx;
	  color: grey;
	  font-size: 28rpx
	}
	
	.evaluationBox .trends .rt{
	  color: #383838;
	  width: calc(100% - 238rpx);
	  font-size: 28rpx;
	  font-weight: 700;
	  text-align: right
	}
	
	.evaluationBox .trends .rt .time{
	  text-align: right;
	  color: grey;
	  font-size: 22rpx;
	  font-weight: 400
	}
	
	.evaluationBox .hasNew{
	  float: right;
	  color: #00acdd;
	  font-size: 26rpx
	}
	
	.evaluationBox .hasNew .icon-reflesh{
	  font-size: 26rpx;
	  margin-right: 8rpx
	}
	
	.customer {
	    position: fixed;
	    right: 20rpx;
	    bottom: 185rpx;
	    z-index: 7;
	    width: 82rpx;
	    height: 82rpx;
	    border-radius: 50%;
	    background: #33bde4;
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