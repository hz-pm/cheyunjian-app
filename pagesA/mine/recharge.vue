<template>
	<view class="content">

		<view style="width: 100%;display: flex;flex-direction: row;background-color: #FFF;">
			<uni-search-bar style="width: 100%;" @confirm="search" :focus="true" v-model="searchValue" 
			placeholder="搜索订单号" cancelButton="auto">
			</uni-search-bar>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;background-color: #FFF;margin-top: 30rpx;">
			<text style="font-size: 28rpx;color: #a6a6a6;width: 95%;
					align-self: flex-end;margin-top: 20rpx;margin-bottom: 20rpx;">共有条充值记录，总计充值600元，共16800积分</text>
			<view style="height: 1rpx; width: 95%;align-self: flex-end;background-color: #f5f5f5;"></view>

			<view style="width: 100%;display: flex;flex-direction: column;align-items: center;"
			v-for="(index,item) in list" @click="clickItem(item)">
				<view style="width: 95%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					<view style="display: flex;flex-direction: column;margin-top: 30rpx;margin-bottom: 30rpx;">
						<text style="font-size: 32rpx;color: #111;">B883517127928565760</text>
						<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 10rpx;">2023-12-03 09:36:55</text>
					</view>
					<view style="display: flex;flex-direction: row;align-items: center;">
						<view style="display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-end;
						margin-right: 10rpx;">
							<text style="font-size: 32rpx;color: #dc4144;font-weight: bold;">￥60</text>
							<text style="font-size: 28rpx;color: #0da665;margin-top: 10rpx;">+168积分</text>
						</view>
						<uni-icons type="right" color="#a6a6a6" size="35rpx"></uni-icons>
					</view>
				</view>
				<view style="height: 1rpx; width: 95%;align-self: flex-end;background-color: #f5f5f5;"></view>
			</view>

			<u-empty mode="data" icon="../../static/img-nodata.png" text="暂无数据" width="90rpx"
				style="margin-top: 40rpx;" v-if="isEmpty"></u-empty>
		</view>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				list:['','','','','',''],
				isEmpty:false
			}
		},
		methods: {
			clickItem(item){
				uni.navigateTo({
					url:'pages/mine/rechargeDetails'
				})
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
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
		background-color: #f5f5f5;
	}
</style>