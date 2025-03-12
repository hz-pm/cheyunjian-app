<template>
	<view class="content">
		<view class="comView">
			<view class="comTitle" v-if="false">个人信息授权书</view>
			<view>致：株洲云检新能源科技有限公司（以下简称“贵公司”）</view>
			<view class="comItem">
				本人承诺本人通过(√购买；□受赠；□继承；□其他）方式合法占有本车辆（即本次提供的车辆行驶证所对应的车辆，以下简称“车辆”）为该车辆所有权人，为开展二手车交易，本人有权作出如下授权： </view>
			<view class="comItem">
				（1）本人同意贵公司可为进行二手车交易/金融等目的将所收集的与本人车辆相关的信息（包括车架号、车辆行驶证信息等）提供给与贵公司具有合作关系的机构，以协助贵公司开展与本人的二手车交易/金融等有关事项。
			</view>
			<view class="comItem">
				（2）本人同意上述与贵公司具有合作关系机构可为协助贵公司开展二手车交易/金融等目的使用上述信息并基于此目的收集、提供本人车辆的相关信息（包括车辆的保险及出险信息等），并对上述信息进行加工、分析后形成针对车辆情况的结果数据、分析报告以方便贵公司查询、评估车辆情况，协助贵公司开展与本人的二手车交易/金融等有关事项。
			</view>
			<view class="comItem">
				本授权书的授权期限为自本人签署之日起至本人书面表示不再同意之日止。本授权书是本人做出的单方承诺，效力具有独立性，不因本人与贵公司签订的相关合同解除、终止、被撤销、无效而丧失法律效力。 </view>
			<view class="comItem">
				本人承诺：在开展二手车交易过程中（包括交易前或交易后等全过程）所提供的所有信息及承诺均真实、准确、完整、合法、有效，并保证上述全部授权内容均经过所有信息权利人的充分、完全认可。如果由于本人提供的信息或承诺不真实、不准确、不完整、不合法，本人承担由此所导致的后果和全部法律责任。本人已经仔细阅读本授权书全部内容，对本授权书所有条款的含义及相应的法律后果已全部知晓并充分理解。
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