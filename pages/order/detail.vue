<template>
  <view class="page">

    <!-- 顶部横幅：品牌图 + 品牌/VIN + 类型 + 状态 -->
    <view class="hero-banner">
      <image
        :src="order.brandLogo || '/static/ic-car.png'"
        class="hero-car"
        :class="{ 'has-logo': !!order.brandLogo }"
        mode="aspectFit"
      />
      <view class="hero-info">
        <text v-if="order.brand" class="hero-brand">{{ order.brand }}</text>
        <text class="hero-vin" :class="{ small: !!order.brand }">{{ order.vinCode || '--' }}</text>
        <view class="hero-sub">
          <text class="hero-type">{{ typeLabel }}</text>
          <view class="hero-status-badge" :class="taskStatusClass">{{ taskStatusLabel }}</view>
        </view>
      </view>
    </view>

    <!-- ① 车辆信息 -->
    <view class="info-card">
      <view class="card-title-bar">
        <text class="card-title">车辆信息</text>
      </view>

      <view class="row-item">
        <text class="row-label">车架号</text>
        <view class="row-copy" @click="copyText(order.vinCode)">
          <text class="row-value mono">{{ order.vinCode }}</text>
          <text class="copy-tag">复制</text>
        </view>
      </view>

      <view class="row-item" v-if="order.personName">
        <text class="row-label">车主姓名</text>
        <text class="row-value">{{ order.personName }}</text>
      </view>

      <view class="row-item">
        <text class="row-label">服务类型</text>
        <text class="row-value">{{ typeLabel }}</text>
      </view>

      <view class="row-item">
        <text class="row-label">创建时间</text>
        <text class="row-value">{{ formatTime(order.createTime) }}</text>
      </view>

      <view class="row-item" v-if="order.updateTime && order.status !== 0 && order.status !== 1">
        <text class="row-label">{{ updateTimeLabel }}</text>
        <text class="row-value">{{ formatTime(order.updateTime) }}</text>
      </view>

      <view class="row-item" v-if="order.remark">
        <text class="row-label">备注</text>
        <text class="row-value hint-text">{{ order.remark }}</text>
      </view>

      <!-- VIN 图片 -->
      <view class="vin-img-wrap" v-if="order.vinImg">
        <text class="row-label img-label">VIN 图片</text>
        <image
          :src="order.vinImg"
          class="vin-img"
          mode="widthFix"
          @click="previewVinImg"
        />
      </view>
    </view>

    <!-- ② VIP 折扣信息（有折扣时展示） -->
    <view class="info-card" v-if="hasDiscount">
      <view class="card-title-bar">
        <text class="card-title">VIP 优惠</text>
        <view class="vip-crown">👑 VIP</view>
      </view>

      <view class="row-item">
        <text class="row-label">原价</text>
        <text class="row-value origin-price">¥{{ formatMoney(order.normalPrice) }}</text>
      </view>
      <view class="row-item">
        <text class="row-label">立减金额</text>
        <text class="row-value saved-text">- ¥{{ formatMoney(order.discountAmount || order.savedAmount) }}</text>
      </view>
      <view class="row-item divider-top">
        <text class="row-label">折后实付</text>
        <text class="row-value money-big">¥{{ formatMoney(order.money) }}</text>
      </view>
    </view>

    <!-- ③ 支付信息（有支付记录时展示） -->
    <view class="info-card" v-if="order.outTradeNo">
      <view class="card-title-bar">
        <text class="card-title">支付信息</text>
        <view class="pay-status-tag" :class="payStatusClass">{{ payStatusLabel }}</view>
      </view>

      <!-- 无VIP折扣时在这里展示金额 -->
      <view class="row-item" v-if="!hasDiscount">
        <text class="row-label">支付金额</text>
        <text class="row-value money-big">¥{{ formatMoney(order.money) }}</text>
      </view>

      <view class="row-item">
        <text class="row-label">商户订单号</text>
        <view class="row-copy" @click="copyText(order.outTradeNo)">
          <text class="row-value mono ellipsis">{{ order.outTradeNo }}</text>
          <text class="copy-tag">复制</text>
        </view>
      </view>

      <view class="row-item" v-if="order.transactionId">
        <text class="row-label">微信交易号</text>
        <view class="row-copy" @click="copyText(order.transactionId)">
          <text class="row-value mono ellipsis">{{ order.transactionId }}</text>
          <text class="copy-tag">复制</text>
        </view>
      </view>

      <view class="row-item" v-if="order.timeEnd">
        <text class="row-label">支付时间</text>
        <text class="row-value">{{ formatTime(order.timeEnd) }}</text>
      </view>

      <view class="row-item" v-if="order.statusMsg">
        <text class="row-label">状态说明</text>
        <text class="row-value hint-text">{{ order.statusMsg }}</text>
      </view>
    </view>

    <!-- ④ 退款信息（已退款时展示） -->
    <view class="info-card refund-card" v-if="order.status === 3">
      <view class="card-title-bar">
        <text class="card-title">退款信息</text>
        <view class="refund-tag">已退款</view>
      </view>

      <view class="refund-amount-row">
        <text class="refund-label">退款金额</text>
        <text class="refund-amount">¥{{ formatMoney(order.money) }}</text>
      </view>

      <view class="row-item" v-if="order.outRefundNo">
        <text class="row-label">退款单号</text>
        <view class="row-copy" @click="copyText(order.outRefundNo)">
          <text class="row-value mono ellipsis">{{ order.outRefundNo }}</text>
          <text class="copy-tag">复制</text>
        </view>
      </view>

      <view class="row-item" v-if="order.statusMsg">
        <text class="row-label">退款原因</text>
        <text class="row-value hint-text">{{ order.statusMsg }}</text>
      </view>

      <view class="refund-tip">
        <text class="refund-tip-text">退款将在 1-5 个工作日内原路退回，请注意查收。</text>
      </view>
    </view>

    <!-- ⑤ 操作按钮 -->
    <view class="action-area">
      <!-- 已完成：查看报告 -->
      <u-button
        v-if="order.status === 2"
        :text="reportBtnText"
        type="primary"
        color="#30ad55"
        @click="goReport"
      />
      <!-- 已支付待检测：直接触发检测（无需再次支付） -->
      <u-button
        v-else-if="order.status === 0 && order.payStatus >= 2"
        text="开始检测"
        type="primary"
        color="#1976d2"
        :loading="retryLoading"
        :disabled="retryLoading"
        @click="goExecute"
      />
      <!-- 待支付：继续支付 -->
      <u-button
        v-else-if="order.status === 0"
        text="继续支付"
        type="primary"
        color="#ff8c00"
        :loading="retryLoading"
        :disabled="retryLoading"
        @click="goRetry"
      />
      <!-- 检测中：提示等待 -->
      <view v-else-if="order.status === 1" class="processing-tip">
        <u-loading-icon size="32" color="#30ad55" />
        <text class="processing-text">报告生成中，请稍后在记录页刷新查看</text>
      </view>
      <!-- 退款失败需客服介入 -->
      <view v-else-if="order.status === 5" class="processing-tip">
        <text class="processing-text" style="color:#e53935;">退款处理异常，请联系客服处理</text>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { executeCheckTask } from '@/utils/api'
import { requestWechatPay } from '@/composables/useWechatPay'

const order = ref({})
const retryLoading = ref(false)

onMounted(() => {
  try {
    const raw = uni.getStorageSync('orderDetail')
    if (raw) order.value = JSON.parse(raw)
  } catch (e) {
    uni.showToast({ title: '订单数据加载失败', icon: 'none' })
  }
})

// ---- 类型 ----
const TYPE_MAP = { 1: '车云检', 2: '事故查询', 3: '维保查询' }
const typeLabel = computed(() => TYPE_MAP[order.value.type] ?? '--')

// ---- 任务状态 ----
const taskStatusLabel = computed(() => {
  const s = order.value.status
  const ps = order.value.payStatus
  if (s === 0 && ps >= 2) return '待检测'
  const map = { 0: '待支付', 1: order.value.type === 1 ? '检测中' : '生成中', 2: '已完成', 3: '已退款', 4: '已取消', 5: '联系客服' }
  return map[s] ?? '--'
})
const taskStatusClass = computed(() => {
  const s = order.value.status
  const ps = order.value.payStatus
  if (s === 0 && ps >= 2) return 'ts-paid'
  if (s === 2) return 'ts-success'
  if (s === 3) return 'ts-refund'
  if (s === 4) return 'ts-cancel'
  if (s === 1) return 'ts-processing'
  if (s === 5) return 'ts-refund'
  return 'ts-pending'
})

// ---- 支付状态 ----
const PAY_STATUS_MAP = { 1: '待支付', 2: '已支付', 3: '已完成', 4: '已退款', 5: '已取消' }
const payStatusLabel = computed(() => PAY_STATUS_MAP[order.value.payStatus] ?? '--')

const updateTimeLabel = computed(() => {
  const map = { 2: '完成时间', 3: '退款时间', 4: '取消时间' }
  return map[order.value.status] ?? '更新时间'
})
const payStatusClass = computed(() => {
  const s = order.value.payStatus
  if (s === 3) return 'ps-done'
  if (s === 4) return 'ps-refund'
  if (s === 5) return 'ps-cancel'
  return 'ps-pending'
})

// ---- VIP 折扣 ----
const hasDiscount = computed(() =>
  order.value.savedAmount && Number(order.value.savedAmount) > 0
)

// ---- 操作 ----
const reportBtnText = computed(() => {
  if (order.value.type === 1) return '查看检测报告'
  if (order.value.type === 2) return '查看事故报告'
  return '查看维保报告'
})

function formatTime(time) {
  if (!time) return '--'
  return String(time).replace('T', ' ').substring(0, 16)
}

function formatMoney(val) {
  return val != null ? Number(val).toFixed(2) : '0.00'
}

function copyText(text) {
  if (!text) return
  uni.setClipboardData({
    data: String(text),
    success: () => uni.showToast({ title: '已复制', icon: 'success' })
  })
}

function previewVinImg() {
  uni.previewImage({ urls: [order.value.vinImg] })
}

function goReport() {
  const t = order.value.type
  if (t === 1) uni.navigateTo({ url: `/pages/check/result?vinCode=${order.value.vinCode}` })
  else if (t === 2) uni.navigateTo({ url: `/pages/accident/report?taskId=${order.value.id}` })
  else uni.navigateTo({ url: `/pages/maintenance/report?taskId=${order.value.id}` })
}

// type → payType：1=车云检→3，2=事故→4，3=维保→5
const PAY_TYPE_MAP = { 1: 3, 2: 4, 3: 5 }

async function goRetry() {
  const taskId  = order.value.id
  const type    = order.value.type
  const payType = PAY_TYPE_MAP[type]

  if (!taskId || !payType) {
    uni.showToast({ title: '任务信息异常', icon: 'none' })
    return
  }

  retryLoading.value = true
  try {
    await doPay(taskId, type, payType)
  } catch (e) {
    uni.hideLoading()
    if (e?.errMsg?.includes('cancel')) {
      uni.showToast({ title: '已取消支付', icon: 'none' })
    } else {
      const msg = e?.msg || e?.message || ''
      uni.showToast({ title: msg || '支付失败', icon: 'none' })
    }
  } finally {
    retryLoading.value = false
  }
}

async function goExecute() {
  const taskId = order.value.id
  const type   = order.value.type
  retryLoading.value = true
  try {
    uni.showLoading({ title: '检测中...', mask: true })
    await executeCheckTask(taskId)
    uni.hideLoading()
    if (type === 2) uni.navigateTo({ url: `/pages/accident/report?taskId=${taskId}` })
    else uni.navigateTo({ url: `/pages/maintenance/report?taskId=${taskId}` })
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: e?.msg || '提交失败', icon: 'none' })
  } finally {
    retryLoading.value = false
  }
}

async function doPay(taskId, type, payType) {
  // 1. 用已有 taskId 创建预支付订单（含自动绑定微信兜底）
  const payRes = await requestWechatPay({ payType, taskId })
  const { timeStamp, nonceStr, paySign, signType } = payRes.data
  const packageVal = payRes.data['package']

  // 2. 拉起微信支付
  await uni.requestPayment({ provider: 'wxpay', timeStamp, nonceStr, package: packageVal, signType, paySign })

  // 3. 执行检测任务
  uni.showLoading({ title: '检测中...', mask: true })
  await executeCheckTask(taskId)
  uni.hideLoading()

  // 4. 跳转结果页
  if (type === 1) {
    uni.navigateTo({ url: `/pages/check/result?vinCode=${order.value.vinCode}` })
  } else if (type === 2) {
    uni.navigateTo({ url: `/pages/accident/report?taskId=${taskId}` })
  } else {
    uni.navigateTo({ url: `/pages/maintenance/report?taskId=${taskId}` })
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f0f5f3;
  padding-bottom: 80rpx;
}

/* ── 顶部横幅 ── */
.hero-banner {
  background: linear-gradient(135deg, #28a04a, #57ca9e);
  padding: 44rpx 36rpx 40rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 28rpx;

  .hero-car {
    width: 160rpx;
    height: 110rpx;
    flex-shrink: 0;
    filter: drop-shadow(0 6rpx 10rpx rgba(0,0,0,0.25));
    &.has-logo {
      width: 100rpx;
      height: 100rpx;
      background: rgba(255,255,255,0.2);
      border-radius: 14rpx;
      padding: 8rpx;
      box-sizing: border-box;
      filter: none;
    }
  }

  .hero-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10rpx;

    .hero-brand {
      font-size: 36rpx;
      font-weight: bold;
      color: #fff;
    }

    .hero-vin {
      font-size: 32rpx;
      font-weight: bold;
      color: #fff;
      letter-spacing: 1rpx;
      &.small {
        font-size: 24rpx;
        font-weight: normal;
        color: rgba(255,255,255,0.8);
        letter-spacing: 0;
      }
    }

    .hero-sub {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16rpx;

      .hero-type { font-size: 24rpx; color: rgba(255,255,255,0.85); }

      .hero-status-badge {
        font-size: 22rpx;
        padding: 5rpx 18rpx;
        border-radius: 20rpx;
        &.ts-success    { background: rgba(255,255,255,0.25); color: #fff; }
        &.ts-paid       { background: rgba(25,118,210,0.3);  color: #e3f2fd; }
        &.ts-processing { background: rgba(255,200,80,0.3);  color: #fffde7; }
        &.ts-pending    { background: rgba(255,160,50,0.3);  color: #ffe0b2; }
        &.ts-refund     { background: rgba(255,80,80,0.3);   color: #ffcdd2; }
        &.ts-cancel     { background: rgba(0,0,0,0.15);      color: rgba(255,255,255,0.7); }
      }
    }
  }
}

/* ── 通用卡片 ── */
.info-card {
  background: #fff;
  border-radius: 20rpx;
  margin: 24rpx 24rpx 0;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);

  .card-title-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 30rpx 18rpx;
    border-bottom: 1rpx solid #f3f3f3;

    .card-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #222;
      padding-left: 14rpx;
      border-left: 6rpx solid #30ad55;
    }

    .vip-crown {
      font-size: 22rpx;
      color: #ff8c00;
      background: #fff3e0;
      padding: 5rpx 16rpx;
      border-radius: 20rpx;
    }

    .pay-status-tag {
      font-size: 22rpx;
      padding: 5rpx 16rpx;
      border-radius: 20rpx;
      &.ps-done   { background: #e8f8ee; color: #30ad55; }
      &.ps-refund { background: #fce4e4; color: #e53935; }
      &.ps-cancel { background: #f5f5f5; color: #999; }
      &.ps-pending{ background: #fff3e0; color: #ff8c00; }
    }
  }

  .row-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 22rpx 30rpx;
    border-bottom: 1rpx solid #f9f9f9;
    &:last-child { border-bottom: none; }
    &.divider-top { border-top: 2rpx dashed #eee; margin-top: 4rpx; }

    .row-label { font-size: 28rpx; color: #888; flex-shrink: 0; }

    .row-value {
      font-size: 28rpx;
      color: #333;
      text-align: right;
      flex: 1;
      margin-left: 20rpx;
      &.mono { font-family: monospace; font-size: 26rpx; }
      &.ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 360rpx; }
    }

    .row-copy {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12rpx;
      flex: 1;
      justify-content: flex-end;
      .copy-tag {
        font-size: 22rpx; color: #30ad55; background: #e8f8ee;
        padding: 4rpx 14rpx; border-radius: 16rpx; flex-shrink: 0;
      }
    }

    .origin-price { color: #bbb; text-decoration: line-through; }
    .saved-text   { color: #30ad55; font-weight: bold; }
    .hint-text    { color: #aaa; font-size: 26rpx; }
    .money-big    { font-size: 36rpx; font-weight: bold; color: #ff6b35; }
  }

  /* VIN 图片 */
  .vin-img-wrap {
    padding: 16rpx 30rpx 24rpx;
    .img-label { font-size: 28rpx; color: #888; display: block; margin-bottom: 14rpx; }
    .vin-img   { width: 100%; border-radius: 12rpx; }
  }
}

/* ── 退款卡片 ── */
.refund-card {
  border: 2rpx solid #ffcdd2;

  .card-title-bar .card-title { border-left-color: #e53935; }

  .refund-tag {
    font-size: 22rpx; color: #e53935; background: #fce4e4;
    padding: 5rpx 16rpx; border-radius: 20rpx;
  }

  .refund-amount-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 30rpx;
    background: #fff5f5;
    border-bottom: 1rpx solid #f9f9f9;

    .refund-label { font-size: 28rpx; color: #888; }
    .refund-amount { font-size: 40rpx; font-weight: bold; color: #e53935; }
  }

  .refund-tip {
    padding: 16rpx 30rpx 20rpx;
    .refund-tip-text { font-size: 24rpx; color: #bbb; line-height: 1.6; }
  }
}

/* ── 操作区 ── */
.action-area {
  margin: 40rpx 24rpx 0;
}

.processing-tip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.06);

  .processing-text { font-size: 26rpx; color: #888; }
}
</style>
