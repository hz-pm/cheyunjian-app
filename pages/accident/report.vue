<template>
  <view class="page">
    <!-- 轮询等待状态 -->
    <view v-if="status === 'loading'" class="status-wrap">
      <u-loading-icon size="80" color="#57ca9e" />
      <text class="status-text">报告生成中，请稍候...</text>
      <text class="status-hint">{{ hintText }}</text>
    </view>

    <!-- 报告加载完成，用 webview 展示 -->
    <web-view v-else-if="status === 'done' && reportUrl" :src="reportUrl" />

    <!-- 失败 -->
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
import { getAccidentReport } from '@/utils/api'
import { BASE_URL_IMG } from '@/utils/request'

const taskId    = ref('')
const isShare   = ref('0')
const status    = ref('loading')  // loading | done | fail
const reportUrl = ref('')
const pollCount = ref(0)
const errorMsg  = ref('')
let pollTimer   = null

// 后端自动执行最多需要约 10 秒（上传 OSS + 调第三方），再留 10 轮余量
// 每 5 秒轮询一次，最多 40 次 = 3 分 20 秒
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
    status.value  = 'fail'
    errorMsg.value = '缺少任务ID'
  }
})

onUnload(() => {
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null }
})

onShareAppMessage(() => ({
  title: '事故记录报告',
  path: `/pages/accident/report?taskId=${taskId.value}&share=1`,
  imageUrl: BASE_URL_IMG + 'mp-share.png'
}))

async function pollReport() {
  if (pollCount.value >= MAX_POLL) {
    status.value   = 'fail'
    errorMsg.value = '报告生成超时，请稍后在记录中查看'
    return
  }

  try {
    // silent:true 不弹 toast，loading:false 不显示全局 loading
    const res = await getAccidentReport(
      { taskId: taskId.value, isShare: isShare.value },
      { silent: true, loading: false }
    )

    if (res.code === 200 && res.data?.status === 'generated' && res.data.reportUrl) {
      reportUrl.value = res.data.reportUrl
      status.value    = 'done'
      return
    }
    // status === 'generating'，继续轮询
    scheduleNext()

  } catch (e) {
    // 非 200 的情况：
    //   - "检测尚未提交"：后端异步执行还未开始，继续等待
    //   - "报告生成失败，金额已原路退回"：真正失败，停止并提示
    const msg = e?.msg || ''
    if (msg.includes('退款') || msg.includes('退回')) {
      status.value   = 'fail'
      errorMsg.value = msg
      return
    }
    // 其他错误（网络、尚未提交等）视为暂时性，继续重试
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
