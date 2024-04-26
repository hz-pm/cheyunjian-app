<template>
	<view class="content">
		<cl-header backgroundColor="#00acdd" title="" defaultTextColor="#FFF"></cl-header>
		<web-view :src="url" style="margin-top: 90rpx;"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(op) {
			if(op.type == 1){
				this.url = 'https://doc.fjcyxny.cn/csww/user-agreement.html?v=2024328'
			}else if(op.type == 2){
				this.url = 'https://doc.fjcyxny.cn/csww/privacy-policies.html?v=2024329'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

</style>
