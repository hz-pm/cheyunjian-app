<template>
	<view class="content">
		<view style="width: 100%;background: linear-gradient(180deg,#00acdd,#f7fcff 400%);
		display: flex;flex-direction: column;align-items: center;">
			<view style="width: 92%; display: flex;flex-direction: row;align-items: center;
			margin-top: 20rpx;margin-bottom: 30rpx;">
				<image src="../../static/ic-car.png" style="width: 80rpx;height: 80rpx;background-color: #f1f1f1;
				border-radius: 15rpx;"></image>
				<view style="display: flex;flex-direction: column;color: #FFF;margin-left: 25rpx;">
					<text style="font-size: 30rpx;">大众汽车</text>
					<text style="font-size: 26rpx;margin-top: 15rpx;">VIN：SSVUD******022558</text>
				</view>
			</view>
			<view style="height: 1rpx; opacity: 0.1;width: 92%;background-color: #FFF;"></view>
			<text style="width: 92%; font-size: 28rpx;color: #FFF;margin-top: 20rpx;">生成日期：2021-10-10</text>
			<view style="width: 92%;display: flex;flex-direction: column;align-items: center;margin-top: 30rpx;
			background-color: #FFF;border-top-right-radius: 20rpx;border-top-left-radius: 20rpx;">
				<view style="width: 65%;display: flex;flex-direction: row;align-items: center;
				justify-content: center;margin-top: 30rpx;">
					<view style="height: 1rpx;width: 90rpx;background-color: #DDD;"></view>
					<text style="font-size: 30rpx;color: #111;margin-left: 20rpx;margin-right: 20rpx;">当前参考续航</text>
					<view style="height: 1rpx;width: 90rpx;background-color: #DDD;"></view>
				</view>
				<view class="iconfont icon-question" style="align-self: flex-end;margin-right: 10%;margin-top: -50rpx;color: #666;
				font-size: 40rpx;"></view>

				<view
					style="width: 88%;display: flex;flex-direction: row;align-items: center;justify-content: center; margin-top: 30rpx;">
					<canvas class="progress-canvas" canvas-id="progressCanvas"></canvas>

					<view style="display: flex;flex-direction: column;
					position: absolute;margin-top: 115rpx;align-items: center;">
						<view style="display: flex;flex-direction: row;">
							<text style="font-size: 75rpx;color: #00acdd;
							font-weight: 500;">413</text>
							<text style="font-size: 30rpx;color: #00acdd;margin-top: 5rpx;">km</text>
						</view>
						<view style="display: flex;flex-direction: row;background-color: #fff9ed;border: 1rpx solid #f3a550;
						padding-left: 6rpx;padding-right: 6rpx;border-radius: 5rpx;align-items: center;
						margin-top: 25rpx;justify-content: center;width: 130rpx;">
							<uni-icons type="arrow-down" color="#f3a550" size="30rpx"></uni-icons>
							<text style="font-size: 30rpx;color: #FFF;color: #f3a550;">20.3%</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="i-cell-v">
			<view class="i-cell-1">
				<text style="margin-top: 30rpx;">表显行驶里程</text>
				<view style="display: flex;flex-direction: row;align-items: center;margin-top: 10rpx;">
					<text style="font-size: 38rpx;color: #00acdd;font-weight: bold;">28000 km</text>
					<text class="iconfont icon-question" style="margin-left: 5rpx;color: #666;"></text>
				</view>
				<text style="font-size: 26rpx;margin-top: 5rpx;margin-bottom: 30rpx;">最后更新于2023-10-30</text>
			</view>
			<view class="i-cell-1">
				<text style="margin-top: 30rpx;">已使用天数</text>
				<text style="font-size: 38rpx;color: #00acdd;font-weight: bold;margin-top: 10rpx;">644天</text>
				<text style="font-size: 26rpx;margin-top: 5rpx;margin-bottom: 30rpx;">日均行驶1.01小时</text>
			</view>
		</view>

		<view class="i-cell-v">
			<view class="i-cell-2">
				<view class="top">
					<text class="iconfont icon-health" style="font-size: 65rpx;"></text>
				</view>
				<text style="font-size: 26rpx;margin-top: 30rpx;">电池健康状况</text>
				<text style="font-size: 38rpx;color: #53c41a;font-weight: 500;margin-top: 30rpx;">优秀</text>
				<view
					style="width: 80rpx;height: 10rpx;background-color: #53c41a;border-radius: 10rpx;margin-top: 15rpx;">
				</view>
			</view>
			<view class="i-cell-2" style="background-color: #fef0f0;">
				<view class="top" style="background-color: #f46c6c;">
					<text class="iconfont icon-alarm" style="font-size: 65rpx;"></text>
				</view>
				<text style="font-size: 26rpx;margin-top: 30rpx;">电池异常信息</text>
				<text style="font-size: 38rpx;color: #f46c6c;font-weight: 500;margin-top: 30rpx;
				border: 6rpx solid #f46c6c;border-radius: 70rpx;width: 70rpx;
				height: 70rpx;text-align: center;line-height: 70rpx;font-weight: bold;">2</text>
			</view>
			<view class="i-cell-2" style="background-color: #fef0f0;">
				<view class="top" style="background-color: #f46c6c;">
					<text class="iconfont icon-battery" style="font-size: 65rpx;"></text>
				</view>
				<text style="font-size: 26rpx;margin-top: 30rpx;">电池使用习惯</text>
				<text style="font-size: 38rpx;color: #f46c6c;font-weight: 500;margin-top: 30rpx;">较差</text>
				<view
					style="width: 80rpx;height: 10rpx;background-color: #f46c6c;border-radius: 10rpx;margin-top: 15rpx;">
				</view>
			</view>
		</view>
		<view style="height: 35rpx;"></view>
		
		<view style="width: 95%;height: 1rpx;background-color: #DDD;"></view>
		<view class="tab-v">
			<text class="tab" :class="curIndex==1?'tab-active':''" @click="clickTab(1)">静态数据</text>
			<text class="tab" :class="curIndex==2?'tab-active':''" @click="clickTab(2)">电池健康</text>
			<text class="tab" :class="curIndex==3?'tab-active':''" @click="clickTab(3)">充电数据</text>
			<text class="tab" :class="curIndex==4?'tab-active':''" @click="clickTab(4)">行驶数据</text>
			<text class="tab" :class="curIndex==5?'tab-active':''" @click="clickTab(5)">电池安全</text>
		</view>
		<view style="width: 100%;background-color: #fff9ed;
		border-top: 1rpx solid #f3a550;border-bottom: 1rpx solid #f3a550;display: flex;flex-direction: column;
		align-items: center;justify-content: center;">
			<text class="iconfont icon-warning" style="width: 95%; margin-top: 20rpx;margin-bottom: 20rpx;color: #f3a550;
			font-size: 28rpx;text-align: center;"
			>本评估结果仅供参考，对结果不做准确性、完整性承诺</text>
		</view>

		<view class="cell-title">
			<view class="line"></view>
			<text class="t-1">车辆电池静态数据</text>
			<text class="t-2">数据更新于2023-11-03</text>
		</view>

		<view style="width: 92%;height: 1rpx;background-color: #EEE;"></view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">电池厂商</text>
			<text class="t-2">上汽时代动力电池系统有限公司</text>
		</view>
		<view class="info-cell">
			<text class="t-1">标称电池容量</text>
			<text class="t-2">174.07 Ah</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">电池包编码</text>
			<text class="t-2">***PE********AB9D****025</text>
		</view>
		<view class="info-cell">
			<text class="t-1">电池生产日期</text>
			<text class="t-2">2021-9-13</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">电池类型</text>
			<text class="t-2">三元材料电池</text>
		</view>
		<view class="info-cell">
			<text class="t-1">标称续航里程</text>
			<text class="t-2">518 km</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">车辆生产日期</text>
			<text class="t-2">2021-10-10</text>
		</view>
		<view class="info-cell">
			<text class="t-1">已使用时间</text>
			<text class="t-2">644 天</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">系统标称能量</text>
			<text class="t-2">31.1kWh</text>
		</view>

		<view class="cell-title" style="justify-content: space-between;">
			<view style="display: flex;flex-direction: row;align-items: center;">
				<view class="line"></view>
				<text class="t-1">电池健康度</text>
				<text class="t-2">数据更新于2023-10-03</text>
			</view>
			<text class="iconfont icon-question" style="color: #666;font-size: 26rpx;">指标定义</text>
		</view>

		<!-- 雷达图 -->
		<view style="width: 700rpx;height: 550rpx;">
			<!-- <l-echart ref="chartRef" @finished="init"></l-echart>
			<view style="display: flex;flex-direction: column;align-items: center;color: #FFF;
			background-color: antiquewhite;">
				<text style="font-size: 28rpx;">电池健康度(SOH)</text>
				<text style="font-size: 26rpx;">97.68</text>
				<text style="font-size: 35rpx;">优秀</text>
			</view> -->
			
			<view style="width: 700rpx;height: 550rpx;position: relative;">
			    <l-echart ref="chartRef" @finished="init"></l-echart>
			    <view style="display: flex;flex-direction: column;align-items: center;color: #FFF;
			    position: absolute;top: 55%;left: 50%;transform: translate(-50%, -50%);">
			        <text style="font-size: 30rpx;">电池健康度(SOH)</text>
			        <text style="font-size: 28rpx;">97.68</text>
			        <text style="font-size: 40rpx;margin-top: 10rpx;">优秀</text>
			    </view>
			</view>
		</view>
		
		<text class="iconfont icon-notebook" style="width: 92%;margin-top: 35rpx;color: #111;font-size: 28rpx;">解读</text>
		<text
			style="font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;width: 92%;">您的车辆电池综合状态优秀，容量损耗低，循环寿命厂。</text>

		<view class="cell-title" style="margin-top: 40rpx;">
			<view class="line"></view>
			<text class="t-1">车辆充放电数据</text>
			<text class="t-2">数据更新于2023-11-03</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">总重充电次数</text>
			<text class="t-2">159</text>
		</view>
		<view class="info-cell">
			<text class="t-1">循环次数</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">77.58</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">快充占比</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">9%</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<view class="info-cell">
			<text class="t-1">均冲入电量</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">48.79%</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">充电最高温度平均</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">29.76℃</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<view class="info-cell">
			<text class="t-1">充电起始电量（高频）</text>
			<view class="right" style="flex-direction: column;align-items: flex-end;">
				<text class="t-2" style="margin-right: 0;text-align: right;">20-30%</text>
				<text class="status yellow" style="margin-top: 5rpx;text-align: right;">偏低，高频在低电量时充电，建议优化</text>
			</view>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">充电最低温度平均</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">22.54%</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<text class="iconfont icon-warning" style="color: #111;font-size: 28rpx;width: 95%;margin-top: 35rpx;">注意</text>
		<text
			style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">高频将电量用至30%之下，容易导致电池过放，电池加速衰退。</text>
		<text class="iconfont icon-safe" style="color: #111;font-size: 28rpx;width: 95%;margin-top: 35rpx;">建议</text>
		<text
			style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">日常尽量让电量不低于30%，保持动力电池浅充浅放状态，有助于延长动力电池寿命。</text>

		<view class="cell-title" style="margin-top: 40rpx;">
			<view class="line"></view>
			<text class="t-1">车辆行驶数据</text>
			<text class="t-2">数据更新于2023-11-03</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">年均行驶里程</text>
			<text class="t-2">15500 km</text>
		</view>
		<view class="info-cell">
			<text class="t-1">舒适温度运行占比</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">98%</text>
				<text class="status blue">正常，值越大，电池衰退越慢</text>
			</view>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">行车最高频率下的截止SOC</text>
			<text class="t-2">30-40%</text>
		</view>
		<view class="info-cell">
			<text class="t-1">日均行驶时长</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">1.01小时</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">行驶最高温度平均</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">28.26 ℃</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<view class="info-cell">
			<text class="t-1">行驶最低温度平均</text>
			<view class="right">
				<text class="t-2" style="margin-right: 0;">22.8 ℃</text>
				<text class="status blue">正常</text>
			</view>
		</view>
		<text class="iconfont icon-info" style="width: 95%;margin-top: 35rpx;color: #111;">数据说明</text>
		<text
			style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">数值说明”偏高或偏低“，均会减低电池综合性能；</text>

		<view class="cell-title" style="margin-top: 40rpx;">
			<view class="line"></view>
			<text class="t-1">电池异常信息</text>
			<text class="t-2">数据更新于2023-11-03</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">一级故障水平</text>
			<text class="status yellow">中等，是该车型平均水平的1.83倍</text>
		</view>
		<view class="info-cell">
			<text class="t-1">二级故障水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">三级故障水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell">
			<text class="t-1">热管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">电压管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell">
			<text class="t-1">电量管理水平</text>
			<text class="status red">较差，是该车型平均水平的5.33倍</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">DC-DC管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell">
			<text class="t-1">电压一致性管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">电机热管理管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell">
			<text class="t-1">绝缘管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		<view class="info-cell" style="background-color: #f7f7f7;">
			<text class="t-1">其他管理水平</text>
			<text class="status green">优秀，观测期内无异常</text>
		</view>
		
		<text class="iconfont icon-notebook" style="width: 95%;margin-top: 35rpx;color: #111;font-size: 28rpx;">解读</text>
		<text
			style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">该车辆电量管理水平较差，SOC低/SOC过高/SOC跳变异常是同车型的5.33倍。</text>
		<text class="iconfont icon-info" style="width: 95%;margin-top: 35rpx;color: #111;font-size: 28rpx;">异常情况说明</text>
		<text style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">依据GB/T32960-2016《电动汽车远程服务与管理系统技术规范》，一级故障是指不影响车辆正常行驶的故障；二级故障是指影响车性能需驾驶员限制行驶的故障；三级故障是指驾驶员应停车处理或者请求救援的故障。</text>
		<text
			style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">”正常“表示监测期间内无相关异常。</text>
		<text class="iconfont icon-safe" style="width: 95%;margin-top: 35rpx;color: #111;">评估方:福建常岳新能源科技有限公司</text>
		<text class="iconfont icon-info" style="width: 95%;margin-top: 35rpx;color: #111;">免责申明</text>
		<text
			style="width: 95%; font-size: 26rpx;color: #666;margin-top: 15rpx;line-height: 40rpx;">本评估报告提供的所有内容及判断仅截至到评估日期收集的相关数据信息，所有数据信息均来自第三方。关于此车辆的部分数据如可能被采集或收录。本报告仅是交易参考资料之一，请您结合实车检测结果和乘车试驾体验，做出更精准的决策。</text>

		<view style="height: 35rpx;"></view>

		<view style="width: 100%;display: flex;flex-direction: column;align-items: center;
		background-color: #FFF;">
			<view style="height: 1rpx;width: 100%;background-color: #EEE;"></view>
			<view style="width: 95%; display: flex;flex-direction: row;align-items: center;justify-content: space-between;
			margin-top: 30rpx;margin-bottom: 30rpx;">
				<view style="width: 60%;display: flex;flex-direction: row;align-items: center;">
					<text class="iconfont icon-history" style="font-size: 35rpx;color: #00acdd;"></text>
					<text style="color: #111;margin-left: 5rpx;font-size: 28rpx;">评估时间:2023-12-02</text>
				</view>
				<view style="display: flex;flex-direction: row;align-items: center;">
					<text class="btn-4" @click="clickRefreash">刷新</text>
					<view class="btn-3" style="display: flex;flex-direction: row;align-items: center;">
						<text class="iconfont icon-export" style="font-size: 28rpx;"></text>
						<text @click="clickExport">导出</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 插件内的 二选一
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'

	// import * as echarts from 'echarts/core';
	// import {
	// 	RadarChart
	// } from 'echarts/charts';
	// import {
	// 	TitleComponent,
	// 	TooltipComponent,
	// 	GridComponent,
	// 	DatasetComponent,
	// 	TransformComponent,
	// 	LegendComponent
	// } from 'echarts/components';
	// // 标签自动布局，全局过渡动画等特性
	// import {
	// 	LabelLayout,
	// 	UniversalTransition
	// } from 'echarts/features';
	// // 引入 Canvas 渲染器，注意引入 CanvasRenderer 是必须的一步
	// import {
	// 	CanvasRenderer
	// } from 'echarts/renderers';
	// // 注册必须的组件
	// echarts.use([
	// 	LegendComponent,
	// 	TitleComponent,
	// 	TooltipComponent,
	// 	GridComponent,
	// 	DatasetComponent,
	// 	TransformComponent,
	// 	RadarChart,
	// 	LabelLayout,
	// 	UniversalTransition,
	// 	CanvasRenderer
	// ]);

	import projectConfig from '@/common/config.js';
	import {} from '../../apis/modules/user';
	export default {
		components: {},
		onReady() {
			this.drawHalfCircleProgress();
		},
		data() {
			return {
				isEmpty: false,
				list: ['', '', '', '', ''],
				curIndex: 1,
				percentage: 50, // 进度条的百分比
				lines: 7, // 放射线的数量
				circles: 3, // 半圆数量

				radarOption: {
					radar: {
						indicator: [{
								text: '容量保持率',
								max: 100
							},
							{
								text: '电压一致性',
								max: 100
							},
							{
								text: '温度一致性',
								max: 100
							},
							{
								text: '自放电率',
								max: 100
							},
							{
								text: '内阻一致性',
								max: 100
							}
						],
						center: ['50%', '50%'],
						radius: '70%',
						startAngle: 90,
						splitNumber: 5,
						shape: 'polygon',
						name: {
							formatter: function (value,indicator) {
								
							    return value;
							},
							textStyle: {
								color: '#111',
								fontSize: '13px'
							}
						},
						splitArea: {
							areaStyle: {
								color: ['#EEE']
							}
						},
						axisTick: {
							show: false,
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.8)'
							}
						},
						axisLabel: {
							show: false,
							textStyle: {
								color: 'white'
							}
						},
						axisLine: {
							lineStyle: {
								color: 'rgba(213, 213, 213, 1.0)'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(213, 213, 213, 1.0)'
							}
						}
					},
					series: [{
						type: "radar",
						data: [{
							value: [96.79, 80, 100, 100, 99.3],
							symbolSize: 10,
						}],
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(43, 179, 216, 1.0)' // 0% 处的颜色
								}, {
									offset: 1,
									color: 'rgba(125, 185, 103, 1.0)' // 100% 处的颜色
								}],
								global: false, // 缺省为 false
							}
						},
						itemStyle: {
							normal: {
								color: 'rgba(236, 247, 250, 1.0)',
								borderWidth: 3,
								borderColor: '#19b4e0',
								lineStyle: {
									color: 'rgba(25, 180, 224, 1.0)', //边框颜色
									width: 3, //边框宽度
								},
							},
						},
					}],
				},
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
				this.$u.toast('导出');
			},
			drawHalfCircleProgress() {
				const ctx = uni.createCanvasContext('progressCanvas', this);
				const x = this.getPx('280rpx'); // 圆心x坐标
				const y = this.getPx('290rpx'); // 圆心y坐标
				const radius = this.getPx('250rpx'); // 半圆的半径

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

				ctx.draw();
			},
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chartRef.init(echarts);
				chart.setOption(this.radarOption)

				// 指定尺寸
				// this.$refs.chart.resize({width: '375rpx', height: '375rpx'})
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
		background-color: #FFF;
	}

	.tab-v {
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		margin-top: 15rpx;
		margin-bottom: 15rpx;

		.tab {
			font-size: 28rpx;
			color: #333;
			line-height: 70rpx;
			font-weight: bold;
			border-bottom: 4rpx solid #FFF;
		}

		.tab-active {
			color: #00acdd;
			border-bottom: 4rpx solid #00acdd;
		}
	}

	.i-cell-v {
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-top: 35rpx;

		.i-cell-1 {
			width: 48%;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #f5fafe;
			border-radius: 15rpx;
			font-size: 28rpx;
			color: #111;
		}

		.i-cell-2 {
			width: 31%;
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #f5fafe;
			border-radius: 15rpx;
			font-size: 28rpx;
			color: #111;
			height: 330rpx;

			.top {
				width: 100%;
				height: 130rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: #FFF;
				background-color: #53c41a;
				border-top-right-radius: 15rpx;
				border-top-left-radius: 15rpx;
			}
		}
	}

	.info-cell {
		width: 95%;
		border-bottom: 1rpx solid #EEE;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;

		.t-1 {
			color: #666;
			margin-left: 3%;
		}

		.t-2 {
			color: #111;
			margin-right: 3%;
		}

		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 3%;
		}

		.status {
			line-height: 40rpx;
			text-align: center;
			font-size: 26rpx;
			border-radius: 5rpx;
			margin-left: 10rpx;
			padding-left: 6rpx;
			padding-right: 6rpx;
		}

		.blue {
			border: 1rpx solid #00acdd;
			background-color: #f0fafb;
			color: #00acdd;
		}

		.yellow {
			background-color: #fff9ed;
			color: #f3a550;
			border: 1rpx solid #f3a550;
		}

		.green {
			border: 1rpx solid #49a31a;
			background-color: #f1f9ec;
			color: #49a31a;
		}

		.red {
			border: 1rpx solid #db7070;
			background-color: #fef0f0;
			color: #db7070;
		}
	}

	.cell-title {
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 30rpx;
		margin-bottom: 30rpx;

		.line {
			height: 30rpx;
			width: 12rpx;
			background: linear-gradient(90deg, #00acdd, #47ad13);
		}

		.t-1 {
			font-size: 30rpx;
			color: #111;
			margin-left: 20rpx;
		}

		.t-2 {
			font-size: 28rpx;
			color: #999;
			margin-left: 10rpx;
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

	.progress-canvas {
		width: 95%;
		height: 280rpx;
	}
</style>