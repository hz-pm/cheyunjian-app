<template>
	<view>
		<u-tabbar
			:value="tabIndex"
			@change="clickTabbar"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
			activeColor="#30ad55"
			inactiveColor="#a2a2a2">
			<u-tabbar-item text="首页">
				<image
					class="slot-icon"
					slot="active-icon"
					src="/static/tab-1-s.png"></image>
				<image
					class="slot-icon"
					slot="inactive-icon"
					src="/static/tab-1-n.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="车智驾">
				<image
					class="slot-icon"
					slot="active-icon"
					src="/static/tab-2-s.png"></image>
				<image
					class="slot-icon"
					slot="inactive-icon"
					src="/static/tab-2-n.png"></image>
			</u-tabbar-item>
			<u-tabbar-item text="我的">
				<image
					class="slot-icon"
					slot="active-icon"
					src="/static/tab-3-s.png"></image>
				<image
					class="slot-icon"
					slot="inactive-icon"
					src="/static/tab-3-n.png"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"custom-tabbar",
		props:{
			tabIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				value4: 0,
			};
		},
		methods: {
			clickTabbar(name){
				// this.value4 = name;
				this.$emit("clickTabbar",name)
			}
		}
	}
</script>

<style>
	.slot-icon{
		width: 55rpx;
		height: 55rpx;
	}
</style>