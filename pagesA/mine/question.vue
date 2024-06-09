<template>
	<view class="content">
		<view style="width: 100%;background-color: #00acdd;">
			<image src="../../static/qa-header2.png" style="width: 100%;height: 320rpx;"></image>
		</view>
		
		<view style="width: 100vw;">
			<uni-collapse style="width: 100vw;display: flex;flex-direction: column;align-items: center;">
				<uni-collapse-item v-for="(item,index) in list" :title="item.title" icon="../../static/ic-q.png"
					class="coll-v" :border="false" title-border="none">
					<view style="height: 1rpx;width: 100%;background-color: #DDD;"></view>
					<view class="coll-item-t" v-for="(item2,index2) in item.content">
						<text style="line-height: 30rpx;">{{item2}}</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		

		<view style="width: 95%;background-color: #f8f8f8;margin-top: 35rpx;
		display: flex;flex-direction: column;align-items: center;border-radius: 15rpx;">
			<view style="font-size: 26rpx;color: #413d3c;width: 95%;
			margin-top: 20rpx;margin-top: 20rpx;">若您对新能源云检提供的“新能源汽车价值评估服务”服务仍有疑问，您可以随时通过公众号或小程序联系相关经纪人或客服等多种方式与我们联系沟通。</view>
		</view>

	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {} from '../../apis/modules/user';

	// const animation = uni.requireNativePlugin('animation')

	export default {
		components: {},
		data() {
			return {
				isShow: true,
				list:[],
				qList: [{
						title: '为什么我的车无法评估？',
						content: [
							'如若车辆出现以下情况，有概率出现无法评估或不完整的情况，您可过段时间后再次进行查询。',
							'1、车辆购买时间较短，一般新能源车购买后3个月左右才会有相关信息；',
							'2、大数据信息上传出现延迟；',
							'3、油电混动车型、增程式车型及个别特殊车型(如纯进口车型）。',
						]
					},
					{
						title: '报告中表显行驶里程和车上实际的里程表数据为什么不一致？',
						content: [
							'1、报告表显行驶里程数据 > 车辆里程表的数据',
							'分析：疑似调表。',
							'2、报告表显行驶里程数据=车辆里程表的数据',
							'看是否有疑似调表提醒：',
							'①有提示--疑似调表；',
							'②无提示--需结合充电数据，行驶时间等综合判断是否有调表可能性；',
							'3、报告表显行驶里程数据 < 车辆里程表的数据',
							'此时，以车辆里程表数据为准。',
							'原因分析：',
							'①报告每月15日00：00更新，本月行驶数据尚未更新。',
							'②车辆可能因信号、流量、平台等原因导致行驶数据未及时上传。',
						]
					},
					{
						title: '为什么电池健康度数据缺失？',
						content: [
							'首先，如出现该情况，针对数据缺失模块不扣除积分。',
							'【原因】可能原因是，车辆长时间未行使或充电。车辆若长时间停放，电池化学性能会发生一定变化，从准确性角度考虑，我司不会对电池健康状况做评估。',
							'【建议】①车辆长时间(超过7天)不使用时，尽量保持电池电量在40%~60%，其它范围有降低动力电池的使用寿命的风险，建议每1-2个月对动力电池进行满充后再进行放电至40%~60%，不然存在引起动力电池过放、降低电池性能的风险。②本月充放电后，可于下月15日后可再次评估。',
						]
					},
					{
						title: '多次查询为何报告数据结果相同？',
						content: [
							'新能源车辆电池耐久度设计具有较大冗余空间，在行驶里程较短、充放电次数较少时车辆短期内电池各项数据不会出现较大波动，建议每次查询时间间隔1个月以上，以便查看数据波动。',
						]
					},
					{
						title: '为什么表显里程数、健康度评估等数据更新时间不是每月15日',
						content: [
							'新能源车是电子产品，可能会因为信号、硬件传感器等问题导致数据无法传输或上传出现延迟，我们采用最后一次数据上传时间作为数据更新时间。',
						]
					},
					{
						title: '为什么检测报告不显示充电次数，电池循环次数？',
						content: [
							'因为数据传输故障、硬件系统故障、信号缺失等原因，充电数据、循环次数上传不完整，从数据的准确性考虑不做评估展示。',
						]
					},
				],
				qList2:[{
					title: '为什么我的车辆/电池无法评估？',
					content: [
						'如若车辆/电池出现以下情况，有概率出现无法评估或不完整的情况，您可过段时间后再次进行查询。',
						'1、2019年12月31日之后生产的车辆；',
						'2、油电混动车型、增程式车型及个别特殊车型(如纯进口车型）。',
					]
				},{
					title: '为什么电池容量数据缺失？',
					content: [
						'可能原因是',
						'1、车辆长时间未行使/充电；',
						'2、电池已从车辆上拆下来很久。',
					]
				} ]
			}
		},
		onLoad(op) {
			console.log('=========*1===========', op)
			if (op.qType == '2') {
				this.list = this.qList2
			}else {
				this.list = this.qList
			}
		},
		methods: {
			showAdd() {
				this.expanded = !this.expanded
				// 设置组件的展开或收起状态
				this.$nextTick(function() {
					this.setContentAnimate()
				})
			},
			updateParentData() {
				// 此方法在mixin中
				this.getParentData('u-collapse')
			},
			async setContentAnimate() {
				// 每次面板打开或者收起时，都查询元素尺寸
				// 好处是，父组件从服务端获取内容后，变更折叠面板后可以获得最新的高度
				const rect = await this.queryRect()
				const height = this.expanded ? rect.height : 0
				this.animating = true
				// #ifdef APP-NVUE
				const ref = this.$refs['animation'].ref
				animation.transition(ref, {
					styles: {
						height: height + 'px'
					},
					duration: this.duration,
					// 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
					needLayout: true,
					timingFunction: 'ease-in-out',
				}, () => {
					this.animating = false
				})
				// #endif

				// #ifndef APP-NVUE
				const animation = uni.createAnimation({
					timingFunction: 'ease-in-out',
				});
				animation
					.height(height)
					.step({
						duration: this.duration,
					})
					.step()
				// 导出动画数据给面板的animationData值
				this.animationData = animation.export()
				// 标识动画结束
				uni.$u.sleep(this.duration).then(() => {
					this.animating = false
				})
				// #endif
			},
			queryRect() {
				return new Promise(resolve => {
					this.$uGetRect(`#${this.elId}`).then(size => {
						resolve(size)
					})
				})
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
		background-color: #FFF;
	}

	.coll-v {
		width: 95vw;
		margin-top: 35rpx;
		border-radius: 15rpx;
		background-color: #f5faff;
		.coll-item-t {
			font-size: 28rpx;
			color: #413d3c;
			margin-top: 15rpx;
			width: 95%;
		}
	}
</style>