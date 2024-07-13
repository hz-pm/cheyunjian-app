<template>
	<view class="page">
		<view class="recordBox recordV2" style="background: none;" v-if="detail">
			<view id="resUploadBox">
				<view class="recordTop" style="background: none;">
					<view class="company">
						<view class="imgBox">
							<image class="companyImg" :src="detail.resultTxt.brandLogo"></image>
						</view>
						<view class="companyTxt">
							<view class="h1">{{detail.resultTxt.brand}}</view>
							<view class="span">VIN：{{detail.vinCode}}</view>
						</view>
					</view>
					<view class="prompt"><text class="iconfont icon-warning"></text>本查询结果仅供参考，对结果不做准确性、完整性承诺</view>
				</view>

				<view>
					<view class="fixed">
						<scroll-view class="tabs">
							<view class="uni-scroll-view">
								<view class="uni-scroll-view" style="overflow: hidden;">
									<view class="uni-scroll-view-content">
										<view class="tabs_li" @click="clickTabs(0)" :class="curTab === 0?'cur':''">电池健康
										</view>
										<view class="tabs_li" @click="clickTabs(1)" :class="curTab === 1?'cur':''">静态数据
										</view>
										<view class="tabs_li" @click="clickTabs(2)" :class="curTab === 2?'cur':''">行驶模块
										</view>
										<view class="tabs_li" @click="clickTabs(3)" :class="curTab === 3?'cur':''">充电模块
										</view>
										<view class="tabs_li" @click="clickTabs(4)" :class="curTab === 4?'cur':''">电池安全
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="endurance">
						<view id="model1" class="tit titList">电池健康模块<text
								class="tionDate">数据更新于{{detail.resultTxt.latestChargeDate}}</text>
							<view class="signify" @click="open"><text class="iconfont icon-info"></text>指标说明</view>
						</view>
						<view class="notModel" v-if="false">
							<image src="../../static/img-nodata.png" style="width: 90rpx; height: 108rpx;"></image>
							<view class="text">您当前未选择评估该模块</view>
							<button class="mBtn" @click="addCheckItem(25)">+25积分 追加评估</button>
						</view>

						<view>
							<view class="ehr">
								<view class="power">当前参考续航</view>
							</view>
							<view
								style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: center; margin-top: 10rpx;">
								
								<canvas class="progress-canvas" canvas-id="progressCanvas" v-if="!canvasSrc"></canvas>
								<image class="progress-canvas" :src="canvasSrc" v-if="canvasSrc" :style="{ width: width + 'px', height: height + 'px' }"></image>

								<view style="display: flex;flex-direction: column;
								position: absolute;margin-top: 85rpx;align-items: center;">
									<view style="display: flex;flex-direction: row;font-weight: bold;">
										<text style="font-size: 82rpx;color: #00acdd;">{{detail.resultTxt.referRateMileage}}</text>
										<text style="font-size: 30rpx;color: #00acdd;margin-top: 0rpx;">km</text>
									</view>
									<view style="display: flex;flex-direction: row;background-color: #fff9ed;border: 1rpx solid #f3a550;
									padding-left: 6rpx;padding-right: 6rpx;border-radius: 5rpx;align-items: center;
									margin-top: 15rpx;justify-content: center;width: 130rpx;">
										<uni-icons type="arrow-down" color="#f3a550" size="30rpx"
											v-if="false"></uni-icons>
										<text style="font-size: 28rpx;color: #FFF;color: #f3a550;">{{detail.resultTxt.referRateMileageAssess}}</text>
									</view>
								</view>
							</view>

							<view class="referV2"><text
									class="iconfont icon-info"></text>参考续航：实际满电行驶里程数的参考值，会因为温度、行驶环境的不同而不同，北方春秋季节一般会比冬季高。
							</view>
							
							
							<view class="sohBattery" :class="computedSohBatteryClass">
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

							<view class="speed" style="margin-top: 20rpx;">
								<view class="left">容量保持率</view>
								<view class="middle">
									<view>
										<view class="flex a-center">
											<view id="container" class="progress-container"
												style="background: rgba(0, 0, 0, 0.1);">
												<view class="progress-content flex j-end" :style="{ width: detail.resultTxt.volumeScore + '%',
												background: progressBG(detail.resultTxt.volumeScoreAssess)}"
													style="height: 20rpx;">
												</view>
											</view>
											<view></view>
										</view>
									</view>
								</view>
								<view class="right" :class="computedVolumeScoreClass">
									<view class="per">{{detail.resultTxt.volumeScore}}<text class="txt">%</text></view>
									<view class="size">{{detail.resultTxt.volumeScoreAssess.split(/，\s*/)[0]}}</view>
								</view>
							</view>
							<view class="speed" style="margin-top: 20rpx;">
								<view class="left">电压一致性</view>
								<view class="middle">
									<view>
										<view class="flex a-center">
											<view id="container" class="progress-container"
												style="background: rgba(0, 0, 0, 0.1);">
												<view class="progress-content flex j-end" :style="{ width: detail.resultTxt.voltConsistenceScore + '%',
												background: progressBG(detail.resultTxt.voltConsistenceScoreAssess) }"
													style="height: 20rpx;">
												</view>
											</view>
											<view></view>
										</view>
									</view>
								</view>
								<view class="right" :class="computedVoltConsistenceScoreClass">
									<view class="per">{{detail.resultTxt.voltConsistenceScore}}<text class="txt">%</text></view>
									<view class="size">{{detail.resultTxt.voltConsistenceScoreAssess.split(/，\s*/)[0]}}</view>
								</view>
							</view>
							<view class="speed" style="margin-top: 20rpx;">
								<view class="left">内阻一致性</view>
								<view class="middle">
									<view><!---->
										<view class="flex a-center">
											<view id="container" class="progress-container"
												style="background: rgba(0, 0, 0, 0.1);"><!---->
												<view class="progress-content flex j-end" :style="{ width: detail.resultTxt.internalResistanceScore + '%',
												background: progressBG(detail.resultTxt.internalResistanceScoreAssess) }"
													style="height: 20rpx;">
												</view>
											</view>
											<view></view>
										</view>
									</view>
								</view>
								<view class="right" :class="computedInternalResistanceScoreClass">
									<view class="per">{{detail.resultTxt.internalResistanceScore}}<text class="txt">%</text></view>
									<view class="size">{{detail.resultTxt.internalResistanceScoreAssess.split(/，\s*/)[0]}}</view>
								</view>
							</view>
							<view class="speed" style="margin-top: 20rpx;">
								<view class="left">温度一致性</view>
								<view class="middle">
									<view><!---->
										<view class="flex a-center">
											<view id="container" class="progress-container"
												style="background: rgba(0, 0, 0, 0.1);"><!---->
												<view class="progress-content flex j-end" :style="{ width: detail.resultTxt.temperatureConsistenceScore + '%',
												background: progressBG(detail.resultTxt.temperatureConsistenceScoreAssess) }"
													style="height: 20rpx;">
												</view>
											</view>
											<view></view>
										</view>
									</view>
								</view>
								<view class="right" :class="computedTemperatureConsistenceScoreClass">
									<view class="per">{{detail.resultTxt.temperatureConsistenceScore}}<text class="txt">%</text></view>
									<view class="size">{{detail.resultTxt.temperatureConsistenceScoreAssess.split(/，\s*/)[0]}}</view>
								</view>
							</view>
							<view class="speed" style="margin-top: 10px;">
								<view class="left">自放电率</view>
								<view class="middle">
									<view>
										<view class="flex a-center">
											<view id="container" class="progress-container"
												style="background: rgba(0, 0, 0, 0.1);">
												<view class="progress-content flex j-end" :style="{ width: detail.resultTxt.selfDischargeRateScore + '%',
												background: progressBG(detail.resultTxt.selfDischargeRateScoreAssess)}"
													style="width: 100%; height: 10px;">
												</view>
											</view>
											<view></view>
										</view>
									</view>
								</view>
								<view class="right" :class="computedSelfDischargeRateScoreClass">
									<view class="per">{{detail.resultTxt.selfDischargeRateScore}}<text class="txt">%</text></view>
									<view class="size">{{detail.resultTxt.selfDischargeRateScoreAssess.split(/，\s*/)[0]}}</view>
								</view>
							</view>
							<view class="illustrate">
								<view class="explain" v-if="detail.resultTxt.dynamicNarrate && (JSON.parse(detail.resultTxt.dynamicNarrate).length > 0)">
									<view class="tit"><text class="iconfont icon-notebook"></text>电池健康度解读
									</view>
									<view v-for="(item,index) in JSON.parse(detail.resultTxt.dynamicNarrate)">
										<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
									</view>
								</view>
								<view class="explain" v-if="detail.resultTxt.dynamicAttention && (JSON.parse(detail.resultTxt.dynamicAttention).length > 0)">
									<view class="tit"><text class="iconfont icon-warning"></text>注意
									</view>
									<view v-for="(item,index) in JSON.parse(detail.resultTxt.dynamicAttention)">
										<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
									</view>
								</view>
								<view class="explain" v-if="detail.resultTxt.dynamicSuggest && (JSON.parse(detail.resultTxt.dynamicSuggest).length > 0)">
									<view class="tit"><text class="iconfont icon-safe"></text>建议</view>
									<view v-for="(item,index) in JSON.parse(detail.resultTxt.dynamicSuggest)">
										<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="dataBox">
						<view id="model2" class="tit titList">车辆电池静态数据</view>
						<view class="notModel" v-if="false">
							<image src="../../static/img-nodata.png" style="width: 90rpx; height: 108rpx;"></image>
							<view class="text">您当前未选择评估该模块</view>
							<button class="mBtn" @click="addCheckItem(10)">+10积分 追加评估</button>
						</view>

						<view class="boxLine">
							<view class="line">
								<view class="left">电池厂商</view>
								<view class="right">{{detail.resultTxt.batteryManufacturer}}</view>
							</view>
							<view class="line">
								<view class="left">标称容量</view>
								<view class="right">{{detail.resultTxt.rateCapacity}}<text class="txt">Ah</text></view>
							</view>
							<view class="line">
								<view class="left">标称能量</view>
								<view class="right" style="word-break: break-all;">{{detail.resultTxt.nominalEnergy}}<text
										class="txt">kWh</text></view>
							</view>
							<view class="line">
								<view class="left">标称续航</view>
								<view class="right">{{detail.resultTxt.rateMileage}}<text class="txt">km</text></view>
							</view>
							<view class="line">
								<view class="left">电池类型</view>
								<view class="right">{{detail.resultTxt.batteryType}}</view>
							</view>
						</view>
					</view>
					<view class="dataBox">
						<view id="model3" class="tit titList">车辆行驶模块<text
								class="tionDate">表显里程更新于{{detail.resultTxt.lastDrivingDate}}</text></view>
						<view class="travel">
							<view class="tBox" style="width: 49%;">
								<view class="h1">{{detail.resultTxt.displayMileage}}<text class="tex">Km</text></view>
								<view class="p">表显行驶里程<text class="iconfont icon-question"></text>
								</view>
							</view>
							<view class="tBox" style="width: 49%;">
								<view class="h1">{{detail.resultTxt.averageDailyDriveHour}}<text>小时</text></view>
								<view class="p">日均行驶时长</view>
							</view>
						</view>
						<view class="tableBox" v-if="detail.resultTxt.suspectedAdjust">
							<view class="triangle"></view>
							<view class="h1"><text class="iconfont icon-warning"
									style="font-weight: normal; vertical-align: -1px; margin-right: 5px;">
									</text>该车辆疑似于{{detail.resultTxt.suspectedAdjustDate}}日调表
							</view>
							<!-- 该字段2024-3.15后不再输出 -->
							<view class="allot" v-if="false">
								<view class="h">
									<view class="l">调表前里程</view>
									<view class="r">256500 km</view>
								</view>
								<view class="h">
									<view class="l">调表后里程</view>
									<view class="r">60000 km</view>
								</view>
							</view>
							<view class="tip"><text>说明：本报告仅展示最近一次里程异常情况<br>不表示只出现过一次异常，请结合实际车况判断!</text>
							</view>
						</view>
					</view>
					<view class="dataBox">
						<view id="model4" class="tit titList">车辆充放电模块<text
								class="tionDate">数据更新于{{detail.resultTxt.valuationDate}}</text></view>
						<view class="notModel" v-if="false">
							<image src="../../static/img-nodata.png" style="width: 90rpx; height: 108rpx;"></image>
							<view class="text">您当前未选择评估该模块</view>
							<button class="mBtn" @click="addCheckItem(10)">+10积分 追加评估</button>
						</view>
						
						<view class="electricity">
							<view class="le" :class="computedBatteryHabitBtBgClass">
								<view class="iconBox" :class="computedBatteryHabitSohClass"><text class="iconfont icon-charge"></text>
								</view>
								<view class="p">电池使用习惯</view>
								<view class="assess" :class="computedBatteryHabitCrColorClass">{{detail.resultTxt.batteryHabitAssess}}</view>
							</view>
							<view class="ri">
								<view class="boxLine">
									<view class="line">
										<view class="left">总充电次数</view>
										<view class="right">{{detail.resultTxt.totalChargeCount}}<text class="txt">次</text></view>
									</view>
									<view class="line">
										<view class="left">循环次数</view>
										<view class="right">{{detail.resultTxt.totalChargeSoc}}<text class="txt">次</text></view>
									</view>
									<view class="line">
										<view class="left">快充占比</view>
										<view class="right">{{detail.resultTxt.fastRatio}}<text class="txt">%</text>
											<view class="tag" :class="computedFastRatioAssessClass">{{detail.resultTxt.fastRatioAssess}}</view>
										</view>
									</view>
									<view class="line">
										<view class="left">次均充入电量</view>
										<view class="right">{{detail.resultTxt.chaSocAvg}}<text class="txt">%</text>
											<view class="tag" :class="computedChaSocAvgAssessClass">{{detail.resultTxt.chaSocAvgAssess}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="illustrate">
							<view class="explain" v-if="detail.resultTxt.dischargingAttention 
							&& (JSON.parse(detail.resultTxt.dischargingAttention).length > 0)">
								<view class="tit"><text class="iconfont icon-warning"></text>注意</view>
								<view v-for="(item,index) in JSON.parse(detail.resultTxt.dischargingAttention)">
									<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
								</view>
							</view>
							<view class="explain" v-if="detail.resultTxt.dischargingSuggest 
							&& (JSON.parse(detail.resultTxt.dischargingSuggest).length > 0)">
								<view class="tit"><text class="iconfont icon-safe"></text>建议</view>
								<view v-for="(item,index) in JSON.parse(detail.resultTxt.dischargingSuggest)">
									<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="dataBox">
						<view id="model5" class="tit titList" style="position: relative;">电池预警信息<text
								class="tionDate">数据更新于{{detail.resultTxt.valuationDate}}</text>
							<view class="signify" style="top: 2px; right: 0px;" @click="open2"><text
									class="iconfont icon-info"></text>指标说明</view>
						</view>
						<view class="notModel" v-if="false">
							<image src="../../static/img-nodata.png" style="width: 90rpx; height: 108rpx;"></image>
							<view class="text">您当前未选择评估该模块</view>
							<button class="mBtn" @click="addCheckItem(5)">+5积分 追加评估</button>
						</view>

						<view class="boxLine">
							<view class="line">
								<view class="left">一级故障水平</view>
								<view class="right">
									<view class="tag" :class="computedAbnormalAAssessClass">{{detail.resultTxt.abnormalAAssess}}</view>
								</view>
							</view>
							<view class="line">
								<view class="left">二级故障水平</view>
								<view class="right">
									<view class="tag" :class="computedAbnormalBAssessClass">{{detail.resultTxt.abnormalBAssess}}</view>
								</view>
							</view>
							<view class="line">
								<view class="left">三级故障水平</view>
								<view class="right" style="word-break: break-all;">
									<view class="tag" :class="computedAbnormalCAssessClass">{{detail.resultTxt.abnormalCAssess}}</view>
								</view>
							</view>
						</view>

						<view class="illustrate">
							<view class="explain" style="width: 100%;" v-if="detail.resultTxt.exectionNarrate
							&& (JSON.parse(detail.resultTxt.exectionNarrate).length > 0)">
								<view class="tit" style="position: relative;"><text
										class="iconfont icon-notebook"></text>预警信息解读<view
										class="abnormal REDBga"><text class="iconfont icon-flash"></text>1项异常</view>
								</view>
								<view v-for="(item,index) in JSON.parse(detail.resultTxt.exectionNarrate)">
									<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
								</view>
							</view>
							<view class="explain" style="width: 100%;" v-if="detail.resultTxt.exectionAttention
							&& (JSON.parse(detail.resultTxt.exectionAttention).length > 0)">
								<view class="tit"><text class="iconfont icon-warning"></text>注意</view>
								<view v-for="(item,index) in JSON.parse(detail.resultTxt.exectionAttention)">
									<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
								</view>
							</view>
							<view class="explain" style="width: 100%;" v-if="detail.resultTxt.exectionSuggest
							&& (JSON.parse(detail.resultTxt.exectionSuggest).length > 0)">
								<view class="tit"><text class="iconfont icon-safe"></text>建议</view>
								<view v-for="(item,index) in JSON.parse(detail.resultTxt.exectionSuggest)">
									<view class="e_p" style="white-space: pre-wrap;">{{item}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="dataBox">
						<view class="explain" style="margin-top: 0px;">
							<view class="tit" style="margin-bottom: 5px;"><text class="iconfont icon-safe"></text>评估方:
								株洲云检新能源科技有限公司</view>
						</view>
						<view class="explain">
							<view class="tit" style="margin-bottom: 5px;"><text class="iconfont icon-info"></text>免责申明
							</view>
							<view class="e_p">
								本评估报告提供的所有内容及判断仅基于截止到评估日期收集的相关数据信息，所有数据信息均来自第三方。关于此车辆的部分数据可能未被采集或收录。本报告仅是交易参考资料之一，请您结合实车勘验结果和乘车试驾体验，做出更精准的决策。
							</view>
						</view>
					</view>
					<view style="height: 41px;"></view>

					<view class="dataBox" style="display: none;">
						<view class="copyright">
							<view class="p">Copyright<text class="C" style="font-size: 14px;">©</text>2022
								株洲云检新能源科技有限公司</view>
							<view class="hr"></view>
							<view class="url">http://m.fjcyxny.cn</view>
							<view class="mpCode">
								<view class="code">
									<image class="codeImg" style="position: relative;">
										<div
											style="background-size: 100% 100%; background-repeat: no-repeat;">
										</div><uni-resize-sensor>
											<div>
												<div></div>
											</div>
											<div>
												<div></div>
											</div>
										</uni-resize-sensor><img draggable="false">
									</image>
									<view class="codeTxt">关注公众号</view>
								</view>
								<view class="code">
									<image class="codeImg" style="position: relative;">
										<div
											style=" background-size: 100% 100%; background-repeat: no-repeat;">
										</div><uni-resize-sensor>
											<div>
												<div></div>
											</div>
											<div>
												<div></div>
											</div>
										</uni-resize-sensor><img  draggable="false">
									</image>
									<view class="codeTxt">关注视频号</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="customer">
			<view class="iconfont icon-kefu"></view>
			<view class="tx">客服</view>
			<button style="display: flex;flex-direction: column;align-items: center;border: none;background-color: #00000000;
			position: absolute;width: 90%;height: 70rpx;"
			type="default" plain="true" open-type="contact" size="default"></button>
		</view>
		<view class="foot" v-if="isShare != 1">
			<view class="tiem"><text class="iconfont icon-history"></text>评估时间:{{formatDateOnly(detail.createTime)}}</view>
			<view class="export"><button class="white-btn">刷新</button>
				<button class="blue-btn" @click="clickExport"><text class="iconfont icon-export"></text>导出</button>
			</view>
		</view>

		<uni-popup ref="popup3" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close3" @open="open3"
			background-color="#FFF">
			<view class="popup_content">
				<view class="iconfont icon-fail"></view>
				<view class="pTitle">积分余额不足</view>
				<image class="integralImg" style="position: relative;">
					<div
						style="background-image: url(../../static/icon-no-integral.png); background-size: 100% 100%; background-repeat: no-repeat;">
					</div>
					<img src="../../static/icon-no-integral.png" draggable="false">
				</image>
				<view class="explain_text">此次查询预计需要消费<text class="b">()积分,您的积分余额不足。是否充值以完成本次查询？</text></view>
				<view class="button"><button class="butPay">立即支付<text></text>元</button><!----><button class="butGoPay">
						<view class="iconfont icon-discount"></view>更多优惠充值套餐
					</button></view>
			</view>
		</uni-popup>

		<uni-popup ref="popup" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close" @open="open"
			background-color="#FFF">
			<view class="popup-help">
				<view class="popup-help-title faq">SOH及其指标定义</view>
				<view class="popup-help-content">
					<text>【容量指标】容量是电池健康状态表征的最基本参数，可直接反映车辆充满电后最大续航里程。</text><text>【电压一致性指标】电池单体电压之间的差异，类似于木桶效应，短板电池将导致整包可用能量变差，从而导致续航下降。</text><text>【内阻指标】内阻是指电流流过电池内部受到的阻力，内阻变差会导致容量下降，从而导致续航下降。</text><text>【温度一致性指标】电池包内温度场(不同位置温度检测点)分布的一致性，一致性较差会导致电池老化不一致，加速整包电池的衰退。</text><text>【自放电率指标】电池安全性方面的重要指标，自放电过高会导致电池衰退，并存在一定风险。</text>
				</view>
				<view class="popup-help-btn">
					<button class="white-btn" @click="clickMoreQuerstion">更多常见问题</button>
					<button class="blue-btn blue-shadow" @click="close">我知道了</button>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popup2" type="bottom" border-radius="15rpx 15rpx 0 0" @close="close2" @open="open2"
			background-color="#FFF">
			<view class="popup-help">
				<view class="popup-help-content">
					<text>依据GB/T
							32960-2016《电动汽车远程服务与管理系统技术规范》，一级故障是指不影响车辆正常行驶的故障；二级故障是指影响车性能需驾驶员限制行驶的故障；三级故障是指驾驶员应立即停车处理或者请求数援的故障。</text>
				</view>
				<view class="popup-help-btn">
					<button class="white-btn" @click="clickMoreQuerstion">更多常见问题</button>
					<button class="blue-btn blue-shadow" @click="close2">我知道了</button>
				</view>
			</view>
		</uni-popup>

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
		cloudDetails,
		reportImgUrl
	} from '../../apis/modules/user';
	export default {
		components: {},
		onReady() {
			
		},
		data() {
			return {
				isEmpty: false,
				curIndex: 1,
				percentage: 0, // 进度条的百分比
				lines: 7, // 放射线的数量
				circles: 3, // 半圆数量
				// vinCode: 'LNAD2AB38M5000711',
				vinCode: '',
				detail: '',
				reportImg: '',
				curTab: 0,
				imgUrl: '',
				canvasSrc:'',
				isShare:2, //是否为分享页面，隐藏底部按钮
			}
		},
		computed:{
			computedSohBatteryClass() {
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.batterySohLvStr) {
					return this.sohColor(this.detail.resultTxt.batterySohLvStr);
				}
				return '';
			},
			computedVolumeScoreClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.volumeScoreAssess) {
					return this.crTextColor(this.detail.resultTxt.volumeScoreAssess);
				}
				return '';
			},
			computedVoltConsistenceScoreClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.voltConsistenceScoreAssess) {
					return this.crTextColor(this.detail.resultTxt.voltConsistenceScoreAssess);
				}
				return '';
			},
			computedInternalResistanceScoreClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.internalResistanceScoreAssess) {
					return this.crTextColor(this.detail.resultTxt.internalResistanceScoreAssess);
				}
				return '';
			},
			computedTemperatureConsistenceScoreClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.temperatureConsistenceScoreAssess) {
					return this.crTextColor(this.detail.resultTxt.temperatureConsistenceScoreAssess);
				}
				return '';
			},
			computedSelfDischargeRateScoreClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.selfDischargeRateScoreAssess) {
					return this.crTextColor(this.detail.resultTxt.selfDischargeRateScoreAssess);
				}
				return '';
			},
			computedBatteryHabitBtBgClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.batteryHabitAssess) {
					return this.btBg(this.detail.resultTxt.batteryHabitAssess);
				}
				return '';
			},
			computedBatteryHabitSohClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.batteryHabitAssess) {
					return this.sohColor(this.detail.resultTxt.batteryHabitAssess);
				}
				return '';
			},
			computedBatteryHabitCrColorClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.batteryHabitAssess) {
					return this.crTextColor(this.detail.resultTxt.batteryHabitAssess);
				}
				return '';
			},
			computedFastRatioAssessClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.fastRatioAssess) {
					return this.tagTextColor(this.detail.resultTxt.fastRatioAssess);
				}
				return '';
			},
			computedChaSocAvgAssessClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.chaSocAvgAssess) {
					return this.tagTextColor(this.detail.resultTxt.chaSocAvgAssess);
				}
				return '';
			},
			computedAbnormalAAssessClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.abnormalAAssess) {
					return this.gzTagTextColor(this.detail.resultTxt.abnormalAAssess);
				}
				return '';
			},
			computedAbnormalBAssessClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.abnormalBAssess) {
					return this.gzTagTextColor(this.detail.resultTxt.abnormalBAssess);
				}
				return '';
			},
			computedAbnormalCAssessClass(){
				if (this.detail && this.detail.resultTxt && this.detail.resultTxt.abnormalCAssess) {
					return this.gzTagTextColor(this.detail.resultTxt.abnormalCAssess);
				}
				return '';
			}
		},
		onLoad(op) {
			if(op){
				this.vinCode = op.vinCode;
				this.isShare = op.share;
				console.log(this.vinCode)
				//获取详情
				cloudDetails({
					vinCode:this.vinCode
				}).then((res) => {
					this.detail = res.data
					//格式化json数据
					this.detail.resultTxt = JSON.parse(res.data.resultTxt)
					
					//进度条
					this.percentage = 100 - this.extractedPercentage(this.detail.resultTxt.referRateMileageAssess);
					// this.percentage = 100
					console.log('====percentage====>'+this.percentage)
					this.drawHalfCircleProgress();
				})
			}


			// cloudDetails({
			// 	vinCode: this.vinCode
			// }).then((res) => {
			// 	this.detail = res.data
			// 	//格式化json数据
			// 	this.detail.resultTxt = JSON.parse(res.data.resultTxt)
				
			// 	//进度条
			// 	// this.percentage = 100 - this.extractedPercentage(this.detail.resultTxt.referRateMileageAssess);
			// 	this.percentage = 100
			// 	console.log('====percentage====>'+this.percentage)
			// 	this.drawHalfCircleProgress();
			// })
		},
		// 分享到微信好友
		onShareAppMessage() {
		  return {
			title: '一码速查电动汽车评估报告',
			path: '/pagesB/main/detectionReportV2?vinCode='+this.vinCode+'&share=1',
			imageUrl: '../../static/mp-share.png',
		  }
		},
		// 分享到朋友圈
		onShareTimeline() {
		  return {
			title: '一码速查电动汽车评估报告',
			path: '/pagesB/main/detectionReportV2?vinCode='+this.vinCode+'&share=1',
			imageUrl: '../../static/mp-share.png',
		  }
		},
		methods: {
			clickTabs(index) {
				this.curTab = index;
				let id = 'model1'
				if (index === 0) {
					id = 'model1'
				} else if (index === 1) {
					id = 'model2'
				} else if (index === 2) {
					id = 'model3'
				} else if (index === 3) {
					id = 'model4'
				} else if (index === 4) {
					id = 'model5'
				}
				//滑动
				this.$nextTick(() => {
					const element = document.getElementById(id);
					if (element) {
						// element.scrollIntoView({top: element.offsetTop, behavior: 'smooth', });
						window.scrollTo({
							top: element.offsetTop - 50,
							behavior: 'smooth'
						});
					}
				});
			},
			clickRefreash() {
				this.$u.toast('刷新');
			},
			clickExport() {
				reportImgUrl({
					reportId: this.detail.resultTxt.id,
					type: 1,
					vinCode:this.vinCode
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
			closeImgPop() {
				this.$refs.imgPopup.close()
			},
			openImgPop() {
				this.$refs.imgPopup.open()
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			open2() {
				this.$refs.popup2.open()
			},
			close2() {
				this.$refs.popup2.close()
			},
			clickMoreQuerstion() {
				uni.navigateTo({
					url: '/pagesA/mine/question'
				})
			},
			addCheckItem(p) {
				uni.showModal({
					title: '提示',
					content: '追加评估需要消耗 ' + p + ' 积分，是否确认追加评估？',
					success: function(res) {
						if (res.confirm) {
							console.log('确定');
							//开始

						} else if (res.cancel) {
							console.log('取消');
						}
					}
				});
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
			extractedPercentage(str) {
			    const regex = /[-+]?\d*\.\d+|\d+/; // 正则表达式匹配数字，包括负数、整数和浮点数
			    const match = str.match(regex); // 使用match方法找到匹配的数字部分
			    return match ? parseFloat(match[0]) : null; // 将匹配到的字符串转换为浮点数，如果没有匹配到则返回null
			},
			closeImg(){
				this.$refs.popupImg.close()
			},
			openImg(){
				this.$refs.popupImg.open()
			},
			progressBG(str){
				let bg = ''
				if(str.includes('优秀')){
					bg = 'linear-gradient(to right, rgb(42, 212, 183), rgb(71, 173, 19))'
				}else if(str.includes('良好')){
					bg = 'linear-gradient(to right, rgb(0, 200, 255), rgb(0, 172, 221))'
				}else if(str.includes('中等')){
					bg = 'linear-gradient(to right, rgb(255, 213, 0), rgb(255, 174, 74))'
				}else if(str.includes('较差')){
					bg = 'linear-gradient(to right, rgb(255, 195, 0), rgb(255, 128, 0))'
				}else if(str.includes('差')){
					bg = 'linear-gradient(to right, rgb(255, 81, 60), rgb(240, 0, 48))'
				}
				return bg;
			},crTextColor(str){
				// GREENCr 优秀  linear-gradient(to right, rgb(42, 212, 183), rgb(71, 173, 19))
				// BLUECr 良好  linear-gradient(to right, rgb(0, 200, 255), rgb(0, 172, 221))
				// ORANGECr 中等  linear-gradient(to right, rgb(255, 213, 0), rgb(255, 174, 74))
				// ORANGE2Cr 较差  linear-gradient(to right, rgb(255, 195, 0), rgb(255, 128, 0))
				// REDCr 差  linear-gradient(to right, rgb(255, 81, 60), rgb(240, 0, 48))
				let color = ''
				if(str.includes('优秀')){
					color = 'GREENCr'
				}else if(str.includes('良好')){
					color = 'BLUECr'
				}else if(str.includes('中等')){
					color = 'ORANGECr'
				}else if(str.includes('较差')){
					color = 'ORANGE2Cr'
				}else if(str.includes('差')){
					color = 'REDCr'
				}
				return color;
			},
			sohColor(str){
				// 优秀 sohGREEN
				// 良好 sohBLUE
				// 中等 sohORANGE
				// 较差 sohORANGE2
				// 差 sohRED
				let color = ''
				if(str.includes('优秀')){
					color = 'sohGREEN'
				}else if(str.includes('良好')){
					color = 'sohBLUE'
				}else if(str.includes('中等')){
					color = 'sohORANGE'
				}else if(str.includes('较差')){
					color = 'sohORANGE2'
				}else if(str.includes('差')){
					color = 'sohRED'
				}
				return color;
			},
			btBg(str){
				// <!-- GREENBg 优秀 sohGREEN GREENCr -->
				// <!-- BLUEBg 良好 sohBLUE BLUECr -->
				// <!-- ORANGEBg 中等 sohGREEN GREENCr -->
				// <!-- ORANGEBg 较差 sohGREEN GREENCr -->
				// <!-- REDBg 差 sohGREEN GREENCr -->
				
				let color = ''
				if(str.includes('优秀')){
					color = 'GREENBg'
				}else if(str.includes('良好')){
					color = 'BLUEBg'
				}else if(str.includes('中等')){
					color = 'ORANGEBg'
				}else if(str.includes('较差')){
					color = 'ORANGEBg'
				}else if(str.includes('差')){
					color = 'REDBg'
				}
				return color;
			},
			tagTextColor(str){
				// <!-- tagBLUE 正常 -->
				// <!-- tagORANGE 偏高 -->
				if(str.includes('偏高')){
					return 'tagORANGE'
				}else{
					return 'tagBLUE'
				}
			},gzTagTextColor(str){
				if(str.includes('优秀')){
					return 'tagGREEN'
				}else if(str.includes('良好')){
					return 'tagBLUE'
				}else{
					return 'tagORANGE'
				}
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
	.page {
		background: linear-gradient(180deg, #00acdd, #28ad6f 7%, #47cff5 16%, #47cff5)
	}

	.page::after {
		content: " ";
		display: block;
		height: 84rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom)
	}

	.recordBox {
		background: #fff;
		position: relative
	}

	.recordTop {
		background: linear-gradient(180deg, #00acdd 30%, #fff);
		padding: 0 30rpx;

		.company {
			height: 140rpx;
			border-bottom: 1rpx solid hsla(0, 0%, 100%, .1);
			display: flex;
			align-items: center;

			.imgBox {
				margin-right: 24rpx;
				width: 80rpx;
				height: 80rpx;
				background-color: #fff;
				border-radius: 10rpx;
				flex-shrink: 0;

				.companyImg {
					margin-top: 5%;
					margin-left: 5%;
					width: 90%;
					height: 90%;
				}
			}

			.companyTxt {
				flex: 1;
				width: calc(100% - 104rpx);

				.h1 {
					font-size: 26rpx;
					color: #fff;
					font-weight: 600;
					margin-bottom: 10rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.span {
					font-size: 26rpx;
					color: #fff
				}
			}
		}

		.crumns {
			display: flex;
			font-size: 26rpx;
			align-items: center;
			height: 78rpx;

			.produce {
				color: #fff;
				width: 50%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				-o-text-overflow: ellipsis;
			}

			.market {
				width: 50%;
				text-align: right;
				color: #fff;
			}
		}
	}

	.blockOut {
		width: 460rpx;
		height: 230rpx;
		position: relative;
		overflow: hidden;
		margin: 0 auto;

		.boxTxt {
			font-size: 80rpx;
			font-weight: bold;
			color: #00acdd;
			text-align: center;
			position: absolute;
			background: url('../../static/endurance-bg.png') bottom;
			background-size: cover;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;

			.position {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				flex-direction: column;
				height: 100%;

				.bigTxt {
					position: relative;
					height: 85rpx;
				}

				.km {
					position: absolute;
					font-size: 28rpx;
					top: 10rpx;
				}

				.percent {
					padding: 6rpx 12rpx;
					font-weight: 700;
					margin: 0;
				}

				.tag {
					font-size: 24rpx;
					padding: 2rpx 4rpx;
					border-radius: 4rpx;
					border: 1rpx solid #ddd;
					display: inline-block;
					margin-left: 20rpx;
					background: #fff8ed;
					color: #f3a54f;
					border-color: rgba(243, 165, 79, .3);
					font-weight: bold;
				}
			}
		}

		.block {
			width: 460rpx;
			height: 460rpx;
			border-left: 35rpx solid #00acdd;
			border-top: 35rpx solid #00acdd;
			border-right: 35rpx solid #d6ebff;
			border-bottom: 35rpx solid #d6ebff;
			border-radius: 50%;
			box-sizing: border-box;
			position: absolute;
			top: 1%;
			z-index: 5;
		}

		.rotate1 {
			-webkit-transform: rotate(-10deg);
			transform: rotate(-10deg)
		}
	}

	.endurance {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		padding-bottom: 30rpx;
		padding-top: 36rpx;
		background: #fff;
		position: relative;

		.signify {
			position: absolute;
			top: 39rpx;
			right: 60rpx;
			color: #9a9a9d;
		}

		.ehr {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			width: 314rpx;
			margin-bottom: 40rpx;
			margin: 0 auto 36rpx;

			.power {
				font-size: 26rpx;
				font-weight: 600;
				margin: 0 10rpx;
				color: #383838
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
	}

	.recordBottom {
		padding: 0 30rpx 30rpx;
		background: #fff;
		border-bottom: 1px solid #e5e5e5;

		.carData {
			display: flex;
			margin-bottom: 30rpx;

			.carBox {
				width: 50%;
				background: #f5faff;
				border-radius: 10rpx;
				text-align: center;
				padding: 28rpx 0;
				position: relative;

				.h1 {
					margin-bottom: 5rpx;
					font-size: 24rpx;
					color: #383838;
					width: 100%
				}

				.tx {
					font-size: 24rpx;
					color: #383838;
					height: 36rpx;
				}

				.data {
					width: 100%;
					color: #00acdd;
					font-size: 36rpx;
					font-weight: 600;

					.iconfont {
						font-size: 32rpx;
						color: #999;
						margin-left: 6rpx;
						font-weight: 400
					}
				}

				.ml15 {
					margin-left: 30rpx;
				}
			}
		}

		.battery {
			display: flex;

			.view {
				width: 33.33%;
				margin-right: 30rpx;
				border-radius: 10rpx;

				.viewTop {
					height: 112rpx;
					line-height: 112rpx;
					text-align: center;
					color: #fff;
					background: #a6a6a6;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;

					.iconfont {
						font-size: 60rpx;
					}
				}

				.viewBox {
					height: 174rpx;
					border-bottom-left-radius: 10rpx;
					border-bottom-right-radius: 10rpx;
					padding: 24rpx 0 30rpx;
					box-sizing: border-box;
					background: #f7f7f7;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.h1 {
						width: 100%;
						margin-bottom: 24rpx;
						font-size: 24rpx;
						color: #383838;
						text-align: center;

						.iconfont {
							font-size: 24rpx;
							margin-left: 4rpx;
							color: #999;
						}
					}

					.btn {
						display: inline-block;
						border: 1rpx solid #00acdd;
						border-radius: 10rpx;
						background: #fff;
						height: 64rpx;
						line-height: 64rpx;
						text-align: center;
						color: #00acdd;
						font-weight: 600;
						font-size: 28rpx;
						padding: 0 20rpx;
						-webkit-transform: rotate(1turn);
						transform: rotate(1turn);
					}

					.btn::after {
						display: none;
					}

					.txt {
						font-size: 36rpx;
						font-weight: 600;
						display: inline-block;
						text-align: center;
						min-width: 72rpx;

						.hr {
							height: 10rpx;
							margin-top: 10rpx;
							border-radius: 10rpx;
							background: #a6a6a6;
						}
					}
				}
			}

			.viewRed {
				width: 100%;
				margin-bottom: 24rpx;

				.viewBox {
					height: auto;
					background: #fef0f0;

					.viewTop {
						padding: 0 24rpx;
						height: 100rpx;
						text-align: left;
						line-height: 100rpx;
						font-size: 30rpx;
					}

					.iconfont {
						margin-right: 15rpx;
						vertical-align: -5rpx
					}

					.vList {
						flex: 1;
						border-right: 1rpx solid rgba(0, 0, 0, .1);
						text-align: center;

						.h1 {
							color: #333;
							font-size: 36rpx;
							font-weight: 600;
							margin-bottom: 0;
						}

						.p {
							color: grey;
							margin-top: 10rpx;
							font-size: 24rpx;
							line-height: 1.6;
							margin-bottom: 0;
						}
					}

					.vList:nth-child(2) {
						border-right: 0;
					}

					.circle {
						color: #f56c6c;
						border: 6rpx solid #f56c6c;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 60rpx;
					}

					.txt {
						color: #f56c6c;

						.hr {
							background: #f56c6c;
						}
					}
				}

				.c_explain {
					border-top: 1rpx solid rgba(0, 0, 0, .1);
					text-align: center;
					font-size: 24rpx;
					color: #f56c6c;
					width: 100%;
					padding-top: 24rpx;
					margin: 24rpx 24rpx 0
				}

				.viewTop {
					background: #f56c6c;
				}
			}

			.BLUEbg {
				.viewTop {
					background: #00acdd;
				}

				.viewBox {
					background: #f1fafa;

					.txt {
						color: #00acdd;

						.hr {
							background: #00acdd;
						}
					}
				}
			}

			.GREENbg {
				.viewTop {
					background: #52c41a;
				}

				.viewBox {
					background: #f6ffed;

					.txt {
						color: #52c41a;

						.hr {
							background: #52c41a;
						}
					}
				}
			}

			.REDbg {
				.viewTop {
					background: #f56c6c;
				}

				.viewBox {
					background: #fef0f0;

					.circle {
						color: #f56c6c;
						border: 6rpx solid #f56c6c;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 60rpx;
					}

					.txt {
						color: #f56c6c;

						.hr {
							background: #f56c6c;
						}
					}
				}
			}

			.RED2bg {
				.viewTop {
					background: #f56c6c;
				}

				.viewBox {
					background: #fef0f0;

					.circle {
						color: #f56c6c;
						border: 6rpx solid #f56c6c;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						border-radius: 60rpx;
					}

					.txt {
						color: #f56c6c;

						.hr {
							background: #f56c6c;
						}
					}
				}
			}

			.ORANGEbg {
				.viewTop {
					background: #f3a54f;
				}

				.viewBox {
					background: #fff8ed;

					.txt {
						color: #f3a54f;

						.hr {
							background: #f3a54f;
						}
					}
				}
			}

			.ORANGE2bg {
				.viewTop {
					background: #f3a54f;
				}

				.viewBox {
					background: #fff8ed;

					.txt {
						color: #f3a54f;

						.hr {
							background: #f3a54f;
						}
					}
				}
			}

			.view:last-child {
				margin-right: 0
			}
		}
	}


	.tabs {
		padding: 0 15rpx;
		box-sizing: border-box;
		background-color: #FFF;

		.uni-scroll-view-content {
			display: flex;
		}

		.hr {
			display: none;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2rpx;
			background-color: #00acdd;
		}

		.tabs_li {
			margin: 0;
			font-size: 28rpx;
			font-weight: 600;
			text-align: center;
			width: 20%;
			display: inline-block;
			position: relative;

			.hr {
				display: none;
			}
		}

		.cur {
			border: 0;

			.hr {
				display: block;
			}
		}
	}

	.fixed {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		right: 0;
		left: 0;
		z-index: 6;
	}

	.top {
		top: 0;
	}

	.prompt {
		height: 60rpx;
		background: #fff8ed;
		line-height: 60rpx;
		text-align: center;
		color: #f3a54f;
		font-size: 26rpx;
		border-top: 1px solid rgba(243, 165, 79, .3);
		border-bottom: 1px solid rgba(243, 165, 79, .3);

		.icon-warning {
			vertical-align: -2rpx;
			margin-right: 5rpx;
		}
	}

	.recordBox {

		.tit {
			height: 90rpx;
			display: flex;
			font-size: 28rpx;
			color: #383838;
			font-weight: 600;
			align-items: center;

			.tionDate {
				flex-grow: 1;
				margin-left: 15rpx;
				font-size: 24rpx;
				color: #999;
				font-weight: 400;
			}

			.addition {
				flex-shrink: 0;
				color: #999;
				font-size: 24rpx;
				padding: 10rpx 0;
			}

			.addition::before {
				margin-right: 4rpx;
			}
		}

		.tit:before {
			flex-shrink: 0;
			content: "";
			height: 32rpx;
			background: linear-gradient(180deg, #00acdd, #47ad13);
			width: 12rpx;
			margin-right: 20rpx;
		}

		.dataBox {
			padding: 20rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;
			background: #fff;
			box-sizing: border-box;

			.tit {
				display: flex;
				height: 60rpx;
				font-weight: 700;
				margin-bottom: 30rpx;
				color: #383838;
				align-items: center;
			}

			.boxLine {
				.line {
					display: flex;
					align-items: center;
					padding: 24rpx 20rpx;
					border-top: 1px solid #e8e8e8;

					.left {
						flex-shrink: 0;
						text-align: left;
						color: grey;
						font-size: 28rpx;

						.iconfont {
							font-size: 28rpx;
							margin-left: 4rpx;
						}
					}

					.right {
						flex: 1;
						text-align: right;
						font-size: 28rpx;
						line-height: 44rpx;
						color: #333;

						.txt {
							margin-left: 10rpx;
						}

						.tag {
							line-height: 1.3;
							font-size: 24rpx;
							padding: 4rpx 8rpx;
							border-radius: 4rpx;
							border: 2rpx solid #ddd;
							display: inline-block;
							margin-left: 20rpx;
							font-weight: 500;
						}

						.tagBLUE {
							background: #f1fafa;
							color: #00acdd;
							border-color: rgba(0, 172, 221, .3);
						}

						.tagGREEN {
							background: #f0f9eb;
							color: #47ad13;
							border-color: rgba(71, 173, 19, .3);
						}

						.tagORANGE {
							background: #fff8ed;
							color: #f3a54f;
							border-color: rgba(243, 165, 79, .3);
						}
					}
				}

				.line:last-child {
					border-bottom: 1px solid #e8e8e8;
				}

				.line:nth-of-type(odd) {
					background: #f7f7f7;
				}
			}

			.notModel {
				height: 320rpx;
				text-align: center;

				.text {
					text-align: center;
					font-size: 28rpx;
					color: #a6a6a6;
					margin-bottom: 20rpx;
				}

				.mBtn {
					display: inline-block;
					height: 72rpx;
					line-height: 70rpx;
					border: 1rpx solid #00acdd;
					color: #00acdd;
					text-align: center;
					border-radius: 10rpx;
					font-size: 28rpx;
					font-weight: bold;
					background: #fff;
					-webkit-transform: rotate(1turn);
					transform: rotate(1turn);
				}
			}

		}
	}

	.absoluteDow {
		height: 529rpx;
		background: #fff;
		position: absolute;
		bottom: 20rpx;
		width: 100%;
		left: 0;
	}

	.mask {
		position: fixed;
		top: 0;
		left: var(--window-left);
		right: var(--window-right);
		background-color: rgba(0, 0, 0, .4);
		transition-property: opacity;
		transition-duration: .3s;
		height: 100vh;
		z-index: 98;
	}

	.browser {
		position: fixed;
		top: 0;
		left: var(--window-left);
		right: var(--window-right);
		z-index: 99;
	}

	.icon-fail {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		z-index: 1;
		padding: 20rpx;
		font-size: 40rpx;
		color: rgba(0, 0, 0, .5);
	}

	.bubble {
		position: absolute;
		top: 24rpx;
		right: -13rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 5rpx;
		background-color: #fef0f0;
		color: #fefefe;
		border: 1px solid #fde2e2;
	}

	.bubble {
		text {
			position: absolute;
			border-width: 0;
			border-style: solid;
			border-color: transparent;

			.i {
				width: 0;
				height: 0;
				color: #fef0f0;
				border-width: 10rpx 10rpx 0 0;
				border-style: solid;
				border-color: #fde2e2 transparent transparent;
				bottom: -10rpx;
				left: -1px
			}
		}

		.talk {
			color: #f56c6c;
			font-size: 24rpx;
			font-family: none;
			-webkit-transform: scale(.8);
			transform: scale(.8);
		}
	}

	.recordV2 {
		padding: 0 20rpx;

		.recordTop {
			padding: 0;
		}

		.tit:before {
			border-radius: 4rpx;
		}

		.company {
			border-bottom: 0;
			background: hsla(0, 0%, 100%, .1);
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 10rpx 10rpx 0 0;
		}

		.prompt {
			background: rgba(0, 102, 130, .2);
			color: #fff;
			border-radius: 0 0 10rpx 10rpx;
			font-size: 24rpx;
			margin-bottom: 20rpx;
			border: 0;
		}

		.tabs {
			border-radius: 10rpx;
			height: 72rpx;
			padding: 4rpx;
			margin-bottom: 20rpx;

			.tabs_li {
				width: 136rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 26rpx;
				font-weight: 400;
			}

			.cur {
				color: #fff;
				background: linear-gradient(144.27deg, #00aede, #47ad13);
				border-radius: 10rpx;
				font-weight: 700;
				border-bottom: 0;
			}
		}

		.endurance {
			padding: 20rpx;
			border-radius: 10rpx;

			.signify {
				position: absolute;
				top: 28rpx;
				right: 20rpx;
				display: flex;
				align-items: center;
				height: 32rpx;
				padding: 4rpx;
				padding-right: 10rpx;
				font-size: 20rpx;
				color: #fff;
				border-radius: 32rpx;
				font-weight: 400;
				background: linear-gradient(135deg, #00aede, #47ad13);

				.icon-info {
					color: #fff;
					font-size: 33rpx;
					margin-right: 5rpx
				}
			}

			.ehr {
				margin-bottom: 12rpx;

				.power {
					font-weight: 700;
				}
			}
		}

		.tit {
			height: 56rpx;
			font-weight: 700;
			margin-bottom: 30rpx;
		}

		.dataBox {
			.signify {
				position: absolute;
				top: 28rpx;
				right: 20rpx;
				display: flex;
				align-items: center;
				height: 32rpx;
				padding: 4rpx;
				padding-right: 10rpx;
				font-size: 20rpx;
				color: #fff;
				border-radius: 32rpx;
				font-weight: 400;
				background: linear-gradient(135deg, #00aede, #47ad13);

				.icon-info {
					color: #fff;
					font-size: 33rpx;
					margin-right: 5rpx;
				}
			}

			.ehr {
				margin-bottom: 12rpx;

				.power {
					font-weight: 700;
				}
			}
		}

		.blockOut {
			margin-bottom: 20rpx;
		}

		.boxTxt {
			font-weight: 900;

			.position {
				.bigTxt {}

				.km {}
			}
		}

		.referV2 {
			margin-bottom: 20rpx;
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

			.icon-info {
				margin-right: 8rpx;
				font-size: 32rpx;
			}
		}

		.sohBattery {
			border-radius: 12rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			color: #fff;

			.iconBox {
				width: 124rpx;
				height: 124rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				background: linear-gradient(135.41deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .36));

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

		.sohGREEN {
			background: linear-gradient(135deg, #5cff9a, #6aeb9b 0, #43cf7c);
		}

		.sohBLUE {
			background: linear-gradient(135deg, #00c8ff, #00aede);
		}

		.sohORANGE {
			background: linear-gradient(135deg, #ffe78f, #ffc72e);
		}

		.sohORANGE2 {
			background: linear-gradient(135deg, #ffe261, #ff850a);
		}

		.sohRED,
		.sohRED2 {
			background: linear-gradient(135deg, #ff9980, #ff3030);
		}

		.speed {
			display: flex;
			align-items: center;

			.left {
				width: 168rpx;
				flex-shrink: 0;
				color: #383838;
				font-size: 26rpx;
			}

			.middle {
				flex: 1;

				.a-center {
					align-items: center;
				}

				.flex {
					display: flex;

					.progress-container {
						width: 100%;
						border-radius: 200rpx;

						.progress-content {
							border-radius: 200rpx;
							width: 0;
						}
					}
				}
			}

			.right {
				display: flex;
				width: 180rpx;
				font-size: 24rpx;
				font-weight: 700;
				justify-content: center;
				align-items: center;
				margin-left: 20rpx;

				.per {
					width: 100rpx;
					text-align: center;
					height: 40rpx;
					line-height: 40rpx;
				}

				.size {
					margin-left: 20rpx;
					text-align: center;
					line-height: 40rpx;
					height: 40rpx;
				}
			}
		}

		.GREENCr {
			color: #52c41a;
		}

		.BLUECr {
			color: #00acdd;
		}

		.ORANGECr {
			color: #ffb200;
		}

		.ORANGE2Cr {
			color: #ff8d1a;
		}

		.REDCr,
		.RED2Cr {
			color: #ee2f54;
		}

		.illustrate {
			margin-top: 20rpx;
			border-radius: 10rpx;
			background: #f1fafa;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			padding: 20rpx;

			.explain {
				margin-top: 0;

				.tit {
					font-size: 28rpx;
					font-weight: 700;
					margin-bottom: 10rpx;
				}
			}
		}

		.dataBox {
			padding: 20rpx;
			border-radius: 10rpx;
			margin-top: 20rpx;

			.boxLine {
				.line {
					border-top: 0;
					padding: 0 20rpx;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 10rpx;

					.right {
						color: #383838;
					}
				}

				.line:nth-of-type(odd) {
					background: #f1fafa;
				}

				.line:last-child {
					border-bottom: 0;
				}
			}

			.travel {
				display: flex;
				justify-content: space-between;

				.tBox {
					width: 33.33%;
					text-align: center;
					margin-bottom: 36rpx;

					.h1 {
						color: #00acdd;
						font-size: 32rpx;
						font-weight: 700;
						margin-bottom: 12rpx;

						.tex {
							margin-left: 8rpx;
						}
					}

					.p {
						color: #383838;
						font-size: 24rpx;

						.icon-question {
							color: #a6a6a6;
							font-size: 20rpx;
						}
					}
				}
			}

			.tableBox {
				opacity: 1;
				border-radius: 10rpx;
				background: #fef0f0;
				padding: 22rpx;
				position: relative;

				.h1 {
					font-size: 28rpx;
					font-weight: 700;
					color: #f56c6c;
					margin-bottom: 28rpx;
					text-align: center;
				}

				.allot {
					border-radius: 10rpx;
					background: snow;
					border: 1rpx solid #f7bcbc;
					padding: 20rpx;
					padding-bottom: 0;

					.h {
						height: 40rpx;
						line-height: 40rpx;
						display: flex;
						align-items: center;
						color: #383838;
						justify-content: space-between;
						margin-bottom: 20rpx;

						.l {
							font-size: 28rpx;
							font-weight: 400;
						}

						.r {
							font-size: 32rpx;
							font-weight: 700;
						}
					}
				}

				.triangle {
					position: absolute;
					top: -16rpx;
					left: 90rpx;
					border-left: 20rpx solid transparent;
					border-right: 20rpx solid transparent;
					border-bottom: 17rpx solid #fef0f0;
				}

				.tip {
					margin-top: 20rpx;
					text-align: center;
					font-size: 22rpx;
					color: #989090;
				}
			}

			.electricity {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.le {
					border-radius: 10rpx;
					width: 210rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-right: 20rpx;
					padding-bottom: 25rpx;

					.iconBox {
						width: 140rpx;
						height: 140rpx;
						margin: 20rpx auto;
						text-align: center;
						line-height: 140rpx;
						border-radius: 50%;

						.icon-charge {
							font-size: 72rpx;
							color: #fff;
						}
					}

					.p {
						text-align: center;
						font-weight: 400;
						font-size: 26rpx;
						margin-bottom: 20rpx;
					}

					.assess {
						font-weight: 700;
						font-size: 48rpx;
					}
				}

				.ri {
					width: calc(100% - 210rpx);
				}

				.ORANGE2Bg,
				.ORANGEBg {
					background: #fffbe6;
				}

				.BLUEBg {
					background: #f1fafa;
				}

				.GREENBg,
				.GREEN2Bg {
					background: #edfff7;
				}

				.REDBg,
				.RED2Bg {
					background: #fef0f0;
				}
			}
		}

		.abnormal {
			position: absolute;
			top: 10rpx;
			right: 0;
			height: 40rpx;
			border-radius: 40rpx;
			background: #faad14;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 6rpx;
			font-size: 24rpx;
			font-weight: 700;
			color: #fff;

			.icon-flash {
				color: #fff;
				font-size: 28rpx;
				font-weight: 400
			}

			.ORANGEBga,
			.ORANGE2Bga {
				background: #faad14
			}

			.BLUEBga {
				background: #38caf2
			}
		}
	}

	.copyright {
		margin-top: 24rpx;
		padding-top: 30rpx;
		box-sizing: border-box;
		background: #f7f7f7;
		text-align: center;

		.p {
			font-size: 24rpx;
			color: grey;
			margin-bottom: 18rpx;

			.C {
				font-size: 28rpx;
				margin: 0 9rpx;
				vertical-align: -2rpx;
			}
		}

		.hr {
			height: 4rpx;
			width: 72rpx;
			background: #e5e5e5;
			margin: 0 auto 24rpx
		}

		.url {
			color: #00acdd;
			font-size: 28rpx
		}

		.mpCode {
			margin: 54rpx 66rpx 0;
			display: flex;
			padding-bottom: 58rpx;

			.code {
				width: 200rpx;
				height: 255rpx;
				margin: 0 40rpx;
				background: #fff;
				border-radius: 10rpx;
				padding: 5rpx;
				box-sizing: border-box;

				.codeImg {
					width: 190rpx;
					height: 190rpx;
				}

				.codeTxt {
					font-size: 22rpx;
					text-align: center;
				}
			}
		}
	}

	.explain {
		margin: 20rpx 0;

		.tit {
			height: 60rpx;
			display: flex;
			align-items: center;

			.iconfont {
				width: 36rpx;
				font-size: 32rpx;
				font-weight: 400;
			}
		}

		.tit:before {
			display: none;
		}

		.e_p {
			color: grey;
			font-size: 24rpx;
			line-height: 45rpx;

			.RED {
				color: #f56c6c !important;
			}
		}
	}

	.viewBox {
		position: relative;

		.uPop {
			overflow-y: auto;
			height: 71vh;

			.imgUrl {
				width: 100%;
				-webkit-user-select: auto;
				user-select: auto;
				-webkit-touch-callout: default;
			}
		}

		.default {
			position: absolute;
			bottom: 110rpx;
			width: 90%;
			left: 5%;
			background: #00acdd;
			color: #fff;
		}

		.attestation {
			position: absolute;
			top: -70rpx;
			left: 0;
			width: 100%;
		}
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
				color: #00acdd;
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
				color: #00acdd;
				border: 1rpx solid #00acdd;
				transform: rotate(1turn);
			}

			.blue-btn {
				width: auto;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 10rpx;
				padding: 0 20rpx;
				margin-left: 20rpx;
				background: linear-gradient(135deg, #00acdd, #47ad13);
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

	.progress-canvas {
		width: 85%;
		height: 280rpx;
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

	.popup-help {
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 30rpx;

		.popup-help-title {
			padding-bottom: 30rpx;
			display: flex;
			font-size: 30rpx;
			font-weight: 700;
			margin-bottom: 30rpx;
			border-bottom: 1rpx solid rgba(0, 0, 0, .1);
		}

		.faq::before {
			content: "Q";
			flex-shrink: 0;
			width: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			border-radius: 10rpx;
			background-color: #f3a54f;
			color: #fff;
			margin-right: 12rpx;
		}

		.popup-help-content {
			font-size: 26rpx;
			line-height: 1.4;
			color: grey;

			text {
				display: block;
				margin: 20rpx 0;
			}
		}

		.popup-help-btn {
			display: flex;
			justify-content: space-between;
			margin: 0 -20rpx;
			padding-top: 20rpx;

			.white-btn {
				background: #fff;
				border-radius: 20rpx;
				font-size: 30rpx;
				color: #00acdd;
				border: 1rpx solid #00acdd;
				transform: rotate(1turn);
			}

			.blue-btn {
				background: linear-gradient(135deg, #00acdd, #47ad13);
				border-radius: 10px;
				font-size: 15px;
				color: #fff;
			}

			.blue-shadow {
				box-shadow: 0 4rpx 20rpx 0 rgba(18, 140, 91, .3);
			}
		}

		button {
			width: 10%;
			margin: 0 16rpx;
			flex-shrink: 0;
			flex-grow: 1;
			height: 78rpx;
			line-height: 78rpx;
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