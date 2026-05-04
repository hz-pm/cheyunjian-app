<template>
  <view class="page">
    <!-- 轮询等待状态 -->
    <view v-if="status === 'loading'" class="status-wrap">
      <u-loading-icon size="80" color="#57ca9e" />
      <text class="status-text">报告生成中，请稍候...</text>
      <text class="status-hint">已等待 {{ pollCount * 3 }} 秒（最多 30 秒）</text>
    </view>

    <!-- 报告加载完成，用 webview 展示 -->
    <web-view v-else-if="status === 'done' && reportUrl" :src="reportUrl" />

    <!-- 失败 -->
    <view v-else class="status-wrap">
      <text class="status-icon">😞</text>
      <text class="status-text">{{ errorMsg || '报告获取失败' }}</text>
      <u-button text="返回重试" type="primary" color="#57ca9e" @click="uni.navigateBack()" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { getAccidentReport } from '@/utils/api'

const taskId = ref('')
const status = ref('loading') // loading | done | fail
const reportUrl = ref('')
const pollCount = ref(0)
const errorMsg = ref('')
let pollTimer = null
const MAX_POLL = 10

onLoad((options) => {
  taskId.value = options.taskId || ''
  if (taskId.value) {
    startPolling()
  } else {
    status.value = 'fail'
    errorMsg.value = '缺少任务ID'
  }
})

onUnload(() => {
  stopPolling()
})

function startPolling() {
  pollReport()
}

async function pollReport() {
  if (pollCount.value >= MAX_POLL) {
    status.value = 'fail'
    errorMsg.value = '报告生成超时，请稍后在记录中查看'
    return
  }
  try {
    const res = await getAccidentReport({ taskId: taskId.value })
    if (res.code === 200 && res.data) {
      if (res.data.status === 'generated' && res.data.reportUrl) {
        reportUrl.value = res.data.reportUrl
        status.value = 'done'
        return
      }
      // status === 'generating'，继续轮询
      pollCount.value++
      pollTimer = setTimeout(pollReport, 3000)
      return
    }
    status.value = 'fail'
    errorMsg.value = res.msg || '报告获取失败'
  } catch (e) {
    pollCount.value++
    if (pollCount.value < MAX_POLL) {
      pollTimer = setTimeout(pollReport, 3000)
    } else {
      status.value = 'fail'
    }
  }
}

function stopPolling() {
  if (pollTimer) {
    clearTimeout(pollTimer)
    pollTimer = null
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
