<template>
  <view class="page">
    <view class="result-wrap">
      <!-- 成功 -->
      <template v-if="status === 'success'">
        <text class="result-icon">✅</text>
        <text class="result-title">支付成功</text>
        <text class="result-desc">您的检测报告正在生成，请稍候</text>
      </template>

      <!-- 取消 -->
      <template v-else-if="status === 'cancel'">
        <text class="result-icon">⚠️</text>
        <text class="result-title">支付已取消</text>
        <text class="result-desc">您已取消本次支付，可重新发起</text>
      </template>

      <!-- 失败 -->
      <template v-else>
        <text class="result-icon">❌</text>
        <text class="result-title">支付失败</text>
        <text class="result-desc">{{ errorMsg || '支付过程中遇到问题，请重试' }}</text>
      </template>
    </view>

    <view class="btn-group">
      <u-button
        v-if="status === 'success'"
        text="查看报告"
        type="primary"
        color="#57ca9e"
        @click="goRecord"
      />
      <u-button
        v-else
        text="重新查询"
        type="primary"
        color="#57ca9e"
        @click="goBack"
      />
      <view class="spacer" />
      <u-button
        text="返回首页"
        type="default"
        plain
        @click="goHome"
      />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const status = ref('fail') // success | cancel | fail
const errorMsg = ref('')
const recordType = ref('check') // check | accident | maintenance

onLoad((options) => {
  status.value = options.status || 'fail'
  errorMsg.value = options.msg || ''
  recordType.value = options.type || 'check'
})

function goRecord() {
  const urls = {
    check: '/pages/check/record',
    accident: '/pages/accident/record',
    maintenance: '/pages/maintenance/record'
  }
  uni.navigateTo({ url: urls[recordType.value] || urls.check })
}

function goBack() {
  uni.navigateBack({ delta: 2 })
}

function goHome() {
  uni.switchTab({ url: '/pages/main/index' })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f7fafa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 180rpx;
  padding-bottom: 60rpx;
  gap: 24rpx;

  .result-icon { font-size: 120rpx; }
  .result-title { font-size: 44rpx; font-weight: bold; color: #333; }
  .result-desc { font-size: 28rpx; color: #888; text-align: center; padding: 0 40rpx; line-height: 1.6; }
}

.btn-group {
  width: 100%;
  padding: 0 40rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  .spacer { height: 10rpx; }
}
</style>
