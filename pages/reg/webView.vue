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
		display: flex;
		flex-direction: column;
		align-items: center;
	}

</style>
