<template>
	<view>
		<cl-header :key="2" :isBack="false" height='100rpx' backgroundColor="#38474d">
			<view class="header">
				<view style="display: flex;
				flex-direction: row;
				align-items: center;
				height: 100rpx;">
					<image src="../../static/logo.png" class="logo"></image>
				</view>
				<view style="display: flex;flex-direction: row;margin-right: 15rpx;">
					<!-- <image src="../../static/ic-msg.png" class="ic-msg" @click="msgClick"></image> -->
					<view class="dot" v-if="showDot==1">
					</view>
				</view>
				<view class="user-name" v-if="false">
					<text class="t">{{userName}}</text>
				</view>
			</view>
		</cl-header>
	</view>
</template>

<script>
	export default {
		name:"custom-header",
		props:{
			userName: {
				type: String,
				default: 'Hi~'
			},
			showDot: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			msgClick(){
				this.$emit("msgClick")
			},
			kefuClick(){
				this.$emit("kefuClick")
			}
		}
	}
</script>

<style lang="scss">
	
	.header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.logo {
			width: 240rpx;
			height: 55rpx;
		}
		.ic-msg{
			width: 43rpx;
			height: 43rpx;
		}
		.dot{
			height: 12rpx;
			width: 12rpx;
			border: #F00 solid 2rpx;
			background-color: #F00;
			border-radius: 10rpx;
			margin-left: -15rpx;
			z-index: 10;
			margin-top: 5rpx;
		}
		.user-name {
			display: flex;
			justify-self: right;
			align-items: center;
			font-size: 28rpx;
			.t {
				max-width: 280rpx;
				margin-left: 20rpx;
				color: #FFF;
				overflow: hidden; 
			    text-overflow: ellipsis; 
			    white-space: nowrap;
			}
		}
	}
	
</style>