<template>
  <view class="page">
    <view v-if="status === 'loading'" class="status-wrap">
      <u-loading-icon size="80" color="#57ca9e" />
      <text class="status-text">报告生成中，请稍候...</text>
      <text class="status-hint">{{ hintText }}</text>
    </view>

    <web-view v-else-if="status === 'done' && reportUrl" :src="reportUrl" />

    <view v-else class="status-wrap">
      <text class="status-icon">😞</text>
      <text class="status-text">{{ errorMsg || '报告获取失败' }}</text>
      <u-button text="返回" type="primary" color="#57ca9e" @click="uni.navigateBack()" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onUnload, onShareAppMessage } from '@dcloudio/uni-app'
import { getMaintenanceReport } from '@/utils/api'
import { BASE_URL_IMG } from '@/utils/request'

const taskId    = ref('')
const isShare   = ref('0')
const status    = ref('loading')
const reportUrl = ref('')
const pollCount = ref(0)
const errorMsg  = ref('')
let pollTimer   = null

const POLL_INTERVAL = 5000
const MAX_POLL      = 40

const hintText = computed(() => {
  const elapsed = pollCount.value * (POLL_INTERVAL / 1000)
  return elapsed < 15
    ? '正在提交检测请求...'
    : `已等待 ${elapsed} 秒，报告生成需要约 1-3 分钟`
})

onLoad((options) => {
  taskId.value  = options.taskId || ''
  isShare.value = options.share === '1' ? '1' : '0'
  if (taskId.value) {
    pollReport()
  } else {
    status.value   = 'fail'
    errorMsg.value = '缺少任务ID'
  }
})

onUnload(() => {
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null }
})

onShareAppMessage(() => ({
  title: '车辆维保报告',
  path: `/pages/maintenance/report?taskId=${taskId.value}&share=1`,
  imageUrl: BASE_URL_IMG + 'mp-share.png'
}))

async function pollReport() {
  if (pollCount.value >= MAX_POLL) {
    status.value   = 'fail'
    errorMsg.value = '报告生成超时，请稍后在记录中查看'
    return
  }

  try {
    const res = await getMaintenanceReport(
      { taskId: taskId.value, isShare: isShare.value },
      { silent: true, loading: false }
    )

    if (res.code === 200 && res.data?.data) {
      reportUrl.value = res.data.data
      status.value    = 'done'
      return
    }
    scheduleNext()

  } catch (e) {
    const msg = e?.msg || ''
    if (msg.includes('退款') || msg.includes('退回')) {
      status.value   = 'fail'
      errorMsg.value = msg
      return
    }
    scheduleNext()
  }
}

function scheduleNext() {
  pollCount.value++
  pollTimer = setTimeout(pollReport, POLL_INTERVAL)
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; }
.status-wrap {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding-top: 250rpx; gap: 30rpx;
  .status-icon { font-size: 100rpx; }
  .status-text { font-size: 32rpx; color: #333; font-weight: bold; }
  .status-hint { font-size: 26rpx; color: #999; text-align: center; padding: 0 40rpx; }
}
</style>
