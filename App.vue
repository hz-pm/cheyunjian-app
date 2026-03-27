<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'

onLaunch(() => {
  console.log('App Launch')
  // 初始化用户状态
  const userStore = useUserStore()
  userStore.initFromStorage()
  // 全局加载 uview-plus 图标字体（微信小程序和H5均需要）
  uni.loadFontFace({
    global: true,
    family: 'uicon-iconfont',
    source: 'url("https://at.alicdn.com/t/font_2225171_8kdcwk4po24.ttf")',
    success() { console.log('uicon font loaded') },
    fail(e) { console.warn('uicon font load fail', e) }
  })
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 引入 uview-plus 样式 */
@import 'uview-plus/index.scss';

page {
  background-color: #f7fafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif;
}

/* 全局样式 */
.theme-color {
  color: #57ca9e;
}

.theme-bg {
  background-color: #57ca9e;
}

/* 通用卡片 */
.card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 16rpx rgba(0, 0, 0, 0.06);
}

/* 通用按钮 */
.btn-primary {
  background: linear-gradient(135deg, #57ca9e, #30ad55);
  color: #fff;
  border-radius: 20rpx;
  font-size: 32rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border: none;
}
</style>
