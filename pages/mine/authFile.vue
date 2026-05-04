<template>
	<view class="content">
		<view class=”comView”>
			<view class=”comTitle”>授权书</view>
			<view>致：北京与车行信息技术有限公司（以下简称贵公司）</view>
			<view class=”comItem”>
				本人承诺本人通过（□购买；□受赠；□继承；□其他）方式合法占有本车辆（即本次提供的车辆行驶证所对应的车辆，以下简称”车辆”）为该车辆所有权人，并同意将该车辆进行交易。为开展旧机动车交易，本人有权作出如下授权：
			</view>
			<view class=”comItem”>
				(1) 本人同意贵公司可为进行旧机动车交易目的将所收集的本人信息（包括姓名、车架号、车牌号等相关信息，下同）依次提供给北京与车行信息技术有限公司（以下简称”与车行”）及与车行公司的合作机构。
			</view>
			<view class=”comItem”>
				(2) 本人同意与车行公司的合作机构可基于旧机动车交易目的对上述本人信息，以及本人车辆保险和车辆状态信息（包括投保、承保、理赔、暂扣、查封、抵押、违章、牌证作废等信息）进行必要地使用、分析后形成车况信息并提供给与车行公司，与车行公司可以对该车况信息经必要地加工分析形成处理结果后传递给贵公司，以供贵公司查询、评估本人车辆情况；同时，本人同意与车行及与车行公司的合作机构可以协助贵公司开展与本人旧机动车交易有关的事项。
			</view>
			<view class=”comItem”>
				(3) 根据与车行公司要求，本人同意授权与车行公司将该车辆行驶证及所查询的信息，经匿名化处理后，反馈给其合作机构备查。
			</view>
			<view class=”comItem”>
				本授权书的授权期限为自本人签署之日起至本人书面表示不再同意之日止。本授权书是本人做出的单方承诺，效力具有独立性，不因本人与贵公司签订的相关合同解除、终止、被撤销、无效而丧失法律效力。
			</view>
			<view class=”comItem”>
				本人承诺：在开展旧机动车交易过程中（包括交易前及交易后全过程）所提供的所有信息及承诺均真实、准确、完整、合法、有效，并保证上述全部授权内容均经过所有信息权利人的充分、完全认可。如果由于本人提供的信息或承诺不真实、不准确、不完整、不合法，本人承担由此所导致的后果和全部法律责任。本人已经仔细阅读本授权书全部内容，对本授权书所有条款的含义及相应的法律后果已全部知晓并充分理解。
			</view>
			
			<view style="width: 90%;line-height: 75rpx;background-color: aliceblue;color: #FFF;font-size: 30rpx;
			background: linear-gradient(135deg, #30ad55, #47ad13);border-radius: 65rpx;text-align: center;margin: 0 auto;margin-bottom: 50rpx;
			margin-top: 50rpx;" @click="back()">我知道了</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(op) {

		},
		methods: {
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.comView {
	    font-size: 30rpx;
	    padding: 20rpx;
	    line-height: 45rpx;
	    background: white;
	}
	.comTitle {
	    text-align: center;
	    padding: 32rpx 0;
	}
	.comItem {
	    text-indent: 30rpx;
		margin-top: 15rpx;
	}
</style>