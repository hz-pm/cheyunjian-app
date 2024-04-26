<template>
	<view>
		<cl-header :key="2" :isBack="false" :transparent='true' height='130rpx'>
			<view class="header">
				<u-icon name="arrow-left" size="45rpx" color="#FFF" @click="back"></u-icon>
				<image src="../../static/ic-header-logo.png" class="logo"></image>
				<view class="change-language" @click="changeLanguage">
					<image src="../../static/ic-change-language.png" style="width: 30rpx;height: 30rpx;"></image>
					<text class="t">语言</text>
				</view>
			</view>
		</cl-header>
	</view>
</template>

<script>
	export default {
		name:"custom-header",
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
		padding-top: 20rpx;
		.logo {
			width: 110rpx;
			height: 35rpx;
			margin-left: 90rpx;
		}
		.ic-msg{
			width: 43rpx;
			height: 43rpx;
			margin-left: 65rpx;
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