<template>
	<view class="content">
		<web-view :src="url"></web-view>
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
				this.url = 'https://xinnengyuanyunjian.top/user-agreement.html'
			}else if(op.type == 2){
				this.url = 'https://xinnengyuanyunjian.top/privacy-policies.html'
			}else if(op.type == 3){
				this.url = 'https://xinnengyuanyunjian.top/vip-policies.html'
			}
		},
		methods: {
			
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

</style>
