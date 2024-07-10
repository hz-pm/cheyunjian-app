<template>
	<view class="content">
		<view style="width: 100%;display: flex;flex-direction: row;background-color: #FFF;">
			<uni-search-bar style="width: 100%;" @confirm="search" :focus="false" v-model="searchValue"
			placeholder="搜索车架号" cancelButton="auto">
			</uni-search-bar>
		</view>
		<view style="width: 100%;display: flex;flex-direction: column;background-color: #FFF;margin-top: 30rpx;">
			<text style="font-size: 28rpx;color: #a6a6a6;width: 95%;
					align-self: flex-end;margin-top: 20rpx;margin-bottom: 20rpx;">共有0条检测记录</text>
			<view style="width: 95%;align-self: flex-end;height: 1rpx;background-color: #f5f5f5;"></view>

			<view style="width: 100%;display: flex;flex-direction: column;align-items: center;"
			v-for="(item,index) in list">
				<view style="width: 95%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;"
				@click="clickItem(item)">
					<view style="display: flex;flex-direction: row;align-items: center;margin-top: 20rpx;
					margin-bottom: 20rpx;">
						<image :src="item.resultTxt.brandLogo" style="width: 110rpx;height: 110rpx;border-radius: 10rpx;"></image>
						<view style="display: flex;flex-direction: column;justify-content: flex-end;
						margin-left: 20rpx;">
							<text style="font-size: 32rpx;color: #111;">{{item.resultTxt.brand}}</text>
							<text style="font-size: 30rpx;color: #111;margin-top: 10rpx;">{{maskString(item.vinCode)}}</text>
							<text style="font-size: 26rpx;color: #a6a6a6;margin-top: 10rpx;">{{item.createTime}}</text>
						</view>
					</view>
					
					<uni-icons type="right" color="#a6a6a6" size="35rpx"></uni-icons>
				</view>
				<view style="width: 95%;align-self: flex-end;height: 1rpx;background-color: #f5f5f5;"></view>
			</view>
			
			<view style="width: 100%;height: 50vh;display: flex;flex-direction: column;align-items: center;
			justify-content: center;" v-if="isEmpty">
				<image src="../../static/img-nodata.png" style="width: 120rpx;height: 160rpx;"></image>
				<text style="font-size: 32rpx;color: #888;margin-top: 25rpx;">暂无数据</text>
			</view>
		</view>
	</view>
</template>

<script>
	import projectConfig from '@/common/config.js';
	import {
		eleRecordList
	} from '../../apis/modules/user';
	export default {
		components: {},
		data() {
			return {
				list:[],
				isEmpty:false,
				searchValue:''
			}
		},
		onLoad() {
			eleRecordList().then((res) => {
				console.log(res)
				this.list = res.data
				
				this.list.forEach(info =>{
					info.resultTxt = JSON.parse(info.resultTxt)
				})

				if(this.list.length === 0){
					this.isEmpty = true
				}else{
					this.isEmpty = false
				}
			})
		},
		methods: {
			clickItem(item){
				uni.navigateTo({
					url:'/pagesB/main/newBattery?vinCode='+item.vinCode
				})
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			maskString(value) {
			  if (!value || value.length < 9) {
			    return value;
			  }
			  // 保留前四位、第9至11位以及最后三位字符，其他用星号替换
			  let masked = value.substring(0, 4) + '******' + value.substring(8, 11) + value.substring(value.length - 3);
			  return masked;
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