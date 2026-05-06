<template>
  <view class="page">
    <view v-if="status === 'loading'" class="status-wrap">
      <u-loading-icon size="80" color="#57ca9e" />
      <text class="status-text">报告生成中，请稍候...</text>
      <text class="status-hint">已等待 {{ pollCount * 3 }} 秒（最多 30 秒）</text>
    </view>

    <web-view v-else-if="status === 'done' && reportUrl" :src="reportUrl" />

    <view v-else class="status-wrap">
      <text class="status-icon">😞</text>
      <text class="status-text">{{ errorMsg || '报告获取失败' }}</text>
      <u-button text="返回重试" type="primary" color="#57ca9e" @click="uni.navigateBack()" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onUnload, onShareAppMessage } from '@dcloudio/uni-app'
import { getMaintenanceReport } from '@/utils/api'
import { BASE_URL_IMG } from '@/utils/request'

const taskId = ref('')
const isShare = ref('0')
const status = ref('loading')
const reportUrl = ref('')
const pollCount = ref(0)
const errorMsg = ref('')
let pollTimer = null
const MAX_POLL = 10

onLoad((options) => {
  taskId.value = options.taskId || ''
  isShare.value = options.share === '1' ? '1' : '0'
  if (taskId.value) {
    startPolling()
  } else {
    status.value = 'fail'
    errorMsg.value = '缺少任务ID'
  }
})

onUnload(() => { if (pollTimer) clearTimeout(pollTimer) })

onShareAppMessage(() => ({
  title: '车辆维保报告',
  path: `/pages/maintenance/report?taskId=${taskId.value}&share=1`,
  imageUrl: BASE_URL_IMG + 'mp-share.png'
}))

async function startPolling() {
  if (pollCount.value >= MAX_POLL) {
    status.value = 'fail'
    errorMsg.value = '报告生成超时，请稍后在记录中查看'
    return
  }
  try {
    const res = await getMaintenanceReport({ taskId: taskId.value, isShare: isShare.value })
    if (res.code === 200 && res.data && res.data.data) {
      reportUrl.value = res.data.data
      status.value = 'done'
      return
    }
    pollCount.value++
    pollTimer = setTimeout(startPolling, 3000)
  } catch (e) {
    pollCount.value++
    if (pollCount.value < MAX_POLL) {
      pollTimer = setTimeout(startPolling, 3000)
    } else {
      status.value = 'fail'
    }
  }
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; }
.status-wrap {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding-top: 250rpx; gap: 30rpx;
  .status-icon { font-size: 100rpx; }
  .status-text { font-size: 32rpx; color: #333; font-weight: bold; }
  .status-hint { font-size: 26rpx; color: #999; }
}
</style>
