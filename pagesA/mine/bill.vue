<template>
	<view class="content">
		<text style="width: 95%;font-size: 30rpx;color: #a6a6a6;padding-bottom: 20rpx;
		margin-top: 20rpx;">总计获得{{pointsInfo.totalQty}}积分，已使用{{pointsInfo.useQty}}积分</text>
		<view style="height: 1rpx;width: 95%;align-self: flex-end;background-color: #f5f5f5;"></view>
		
		<view style="width: 95%;display: flex;flex-direction: column;"
		v-for="(item,index) in list">
			<view style="width: 100%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
				<view style="display: flex;flex-direction: column;margin-top: 30rpx;margin-bottom: 30rpx;">
					<text style="font-size: 32rpx;color: #111;">{{item.consumptionSubject}}</text>
					<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 10rpx;">{{item.createTime}}</text>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-end;">
					<text style="font-size: 32rpx;color: #dc4144;font-weight: bold;">{{item.consumptionQty}}</text>
					<text style="font-size: 28rpx;color: #a6a6a6;margin-top: 10rpx;">剩余{{item.realityQty}}积分</text>
				</view>
			</view>
			<view style="height: 1rpx;width: 95%;align-self: flex-end;background-color: #f5f5f5;"></view>
		</view>
		<view style="width: 90%;height: 50vh;display: flex;flex-direction: column;align-items: center;
		justify-content: center;" v-if="isEmpty">
			<text style="font-size: 32rpx;color: #888;">暂无数据</text>
		</view>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {
		pointsRecordList
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				isEmpty:true,
				list:[],
				pointsInfo:''
			}
		},
		onLoad(op) {
			if(op){
				pointsRecordList({
					type:op.type
				}).then((res) =>{
					console.log('>>>>',res)
					if(res.code === 200){
						this.list = res.data
						if(this.length === 0){
							this.isEmpty = true
						}
					}
				})
			}
			
			this.pointsInfo =  this.vuex_points_info
		},
		methods: {
			
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
	
</style>