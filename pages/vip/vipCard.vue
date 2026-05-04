<template>
  <view class="page">
    <!-- 头部 -->
    <view class="vip-header">
      <text class="vip-crown">👑</text>
      <text class="vip-title">{{ userStore.isVip ? (userStore.vipCardName || 'VIP会员') : '普通用户' }}</text>
      <text v-if="userStore.isVip" class="vip-expire">有效期至：{{ formatDate(userStore.vipExpireTime) }}</text>
      <text v-else class="vip-desc">开通会员，享超值优惠</text>
    </view>

    <!-- 套餐列表 -->
    <view class="plans-wrap">
      <view
        class="plan-item"
        v-for="(plan, index) in plans"
        :key="plan.id"
        :class="{ selected: selectedId === plan.id }"
        @click="selectedId = plan.id"
      >
        <view class="plan-left">
          <text class="plan-name">{{ plan.name }}</text>
          <text class="plan-duration">有效期 {{ plan.durationDays }} 天</text>
        </view>
        <view class="plan-price">
          <text class="price-sym">¥</text>
          <text class="price-num">{{ Number(plan.price).toFixed(2) }}</text>
        </view>
        <view v-if="selectedId === plan.id" class="plan-check">✓</view>
      </view>
    </view>

    <!-- VIP 权益说明 -->
    <view class="benefits-card">
      <text class="benefits-title">🎁 会员专属权益</text>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">
          车云检
          <text v-if="selectedPlan && selectedPlan.carCheckDiscount > 0" class="discount-tag">立减¥{{ selectedPlan.carCheckDiscount }}</text>
        </text>
      </view>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">
          出险查询
          <text v-if="selectedPlan && selectedPlan.accidentDiscount > 0" class="discount-tag">立减¥{{ selectedPlan.accidentDiscount }}</text>
        </text>
      </view>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">
          维保记录
          <text v-if="selectedPlan && selectedPlan.maintenanceDiscount > 0" class="discount-tag">立减¥{{ selectedPlan.maintenanceDiscount }}</text>
        </text>
      </view>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">专属客服支持</text>
      </view>
    </view>

    <!-- 购买按钮 -->
    <view class="btn-wrap">
      <u-button
        :text="userStore.isVip ? '升级/续费VIP' : '立即开通'"
        type="primary"
        color="#57ca9e"
        :loading="loading"
        :disabled="!selectedId"
        @click="handleBuy"
      />
    </view>

    <!-- 升级预览弹窗 -->
    <view v-if="showUpgradePreview" class="popup-overlay" @touchmove.stop.prevent @click="showUpgradePreview = false"></view>
    <view v-if="showUpgradePreview && upgradePreviewData" class="upgrade-popup">
      <view class="upgrade-popup-header">
        <text class="upgrade-popup-title">升级确认</text>
        <text class="upgrade-popup-close" @click="showUpgradePreview = false">✕</text>
      </view>
      <view class="upgrade-popup-body">
        <view class="upgrade-row">
          <text class="upgrade-label">当前套餐</text>
          <text class="upgrade-val">{{ upgradePreviewData.currentCardName }}（剩余{{ upgradePreviewData.remainingDays }}天）</text>
        </view>
        <view class="upgrade-row">
          <text class="upgrade-label">剩余天数折算</text>
          <text class="upgrade-val">{{ upgradePreviewData.convertedDays }} 天</text>
        </view>
        <view class="upgrade-row">
          <text class="upgrade-label">本次新增天数</text>
          <text class="upgrade-val">{{ upgradePreviewData.newCardDays }} 天</text>
        </view>
        <view class="upgrade-divider"></view>
        <view class="upgrade-row">
          <text class="upgrade-label">升级后总天数</text>
          <text class="upgrade-val upgrade-val-highlight">{{ upgradePreviewData.totalDays }} 天</text>
        </view>
        <view class="upgrade-row">
          <text class="upgrade-label">新到期时间</text>
          <text class="upgrade-val upgrade-val-highlight">{{ formatPreviewDate(upgradePreviewData.newExpireTime) }}</text>
        </view>
      </view>
      <view class="upgrade-popup-actions">
        <view class="upgrade-btn-cancel" @click="showUpgradePreview = false">
          <text>取消</text>
        </view>
        <view class="upgrade-btn-confirm" :class="{ 'loading': loading }" @click="showUpgradePreview = false; doPay()">
          <text>确认升级</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { getVipCardList, buyVip, processBuyVip, getUserVipInfo, upgradePreview } from '@/utils/api'

const userStore = useUserStore()
const plans = ref([])
const selectedId = ref(null)
const loading = ref(false)
const selectedPlan = computed(() => plans.value.find(p => p.id === selectedId.value) || null)

// 升级预览弹窗
const showUpgradePreview = ref(false)
const upgradePreviewData = ref(null)

onMounted(() => {
  fetchPlans()
})

async function fetchPlans() {
  try {
    const res = await getVipCardList()
    if (res.code === 200) {
      plans.value = res.data || []
      if (plans.value.length > 0) {
        selectedId.value = plans.value[0].id
      }
    }
  } catch (e) {
    console.error(e)
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return dateStr.split('T')[0] || dateStr.substring(0, 10)
}

async function handleBuy() {
  if (!userStore.checkLogin()) return
  if (!selectedId.value) {
    uni.showToast({ title: '请选择套餐', icon: 'none' })
    return
  }

  // 已是VIP时，先展示升级预览弹窗
  if (userStore.isVip) {
    try {
      const previewRes = await upgradePreview({ vipCardId: selectedId.value })
      if (previewRes.code === 200) {
        upgradePreviewData.value = previewRes.data
        showUpgradePreview.value = true
        return
      }
    } catch (e) {
      const msg = e?.msg || ''
      // 后端拒绝（低级套餐/已是最高等级）：直接提示，不进入支付
      if (msg && !msg.includes('无效VIP') && !msg.includes('无需折算')) {
        uni.showModal({ title: '无法购买', content: msg, showCancel: false, confirmText: '知道了' })
        return
      }
      // VIP刚过期等边缘情况：跳过预览直接进入支付
    }
  }

  await doPay()
}

async function doPay() {
  loading.value = true
  try {
    // 先获取支付参数（假设 buyVip 返回微信支付参数）
    const res = await buyVip({ vipCardId: selectedId.value })
    if (res.code !== 200) {
      uni.showToast({ title: res.msg || '下单失败', icon: 'none' })
      return
    }

    const { outTradeNo, timeStamp, nonceStr, paySign, signType } = res.data
    const packageVal = res.data['package']

    await uni.requestPayment({
      provider: 'wxpay', timeStamp, nonceStr,
      package: packageVal, signType, paySign
    })

    // 主动触发权益下发（兜底，防止回调漏发）
    try { await processBuyVip(outTradeNo) } catch (e) { console.warn('processBuyVip:', e) }
    // 刷新VIP状态
    const vipRes = await getUserVipInfo()
    if (vipRes.code === 200) {
      userStore.updateVipStatus(vipRes.data)
    }
    uni.showToast({ title: '开通成功！', icon: 'success' })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/vip/myVip' })
    }, 1000)
  } catch (e) {
    if (e?.errMsg?.includes('cancel')) {
      uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
    } else if (e?.msg) {
      // 后端业务拒绝（如低级套餐拦截），直接展示原因
      uni.showModal({ title: '操作失败', content: e.msg, showCancel: false, confirmText: '知道了' })
    } else {
      uni.navigateTo({ url: '/pages/pay/payResult?status=fail' })
    }
  } finally {
    loading.value = false
  }
}

function formatPreviewDate(dateStr) {
  if (!dateStr) return '--'
  return (dateStr.split('T')[0] || dateStr.substring(0, 10)).replace(/-/g, '/')
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; padding-bottom: 60rpx; }

.vip-header {
  background: linear-gradient(135deg, #2d2d2d, #555);
  padding: 60rpx 40rpx;
  display: flex; flex-direction: column; align-items: center;
  .vip-crown { font-size: 80rpx; }
  .vip-title { font-size: 44rpx; font-weight: bold; color: #ffe082; margin-top: 16rpx; }
  .vip-desc, .vip-expire { font-size: 26rpx; color: rgba(255,255,255,0.7); margin-top: 10rpx; }
}

.plans-wrap {
  margin: 30rpx;
  display: flex; flex-direction: column; gap: 20rpx;

  .plan-item {
    background: #fff; border-radius: 20rpx; padding: 30rpx 30rpx 30rpx 30rpx;
    display: flex; flex-direction: row; align-items: center; justify-content: space-between;
    border: 4rpx solid transparent;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
    transition: all 0.2s;
    position: relative;
    &.selected {
      border-color: #57ca9e;
      background: #f0fdf8;
    }
    .plan-left {
      display: flex; flex-direction: column; gap: 8rpx;
      .plan-name { font-size: 32rpx; font-weight: bold; color: #333; }
      .plan-duration { font-size: 24rpx; color: #999; }
    }
    .plan-price {
      display: flex; flex-direction: row; align-items: flex-end;
      .price-sym { font-size: 28rpx; color: #fa3534; line-height: 1.6; }
      .price-num { font-size: 48rpx; font-weight: bold; color: #fa3534; line-height: 1; }
    }
    .plan-check {
      position: absolute; top: 16rpx; right: 16rpx;
      color: #57ca9e; font-size: 28rpx; font-weight: bold;
    }
  }
}

.benefits-card {
  margin: 0 30rpx 30rpx;
  background: #fff; border-radius: 20rpx; padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
  .benefits-title { font-size: 30rpx; font-weight: bold; color: #333; display: block; margin-bottom: 24rpx; }
  .benefit-item {
    display: flex; flex-direction: row; align-items: center; gap: 16rpx;
    padding: 14rpx 0; border-bottom: 1rpx solid #f5f5f5;
    &:last-child { border-bottom: none; }
    .benefit-icon { font-size: 28rpx; }
    .benefit-text { font-size: 28rpx; color: #333; }
    .discount-tag { font-size: 24rpx; color: #57ca9e; font-weight: bold; margin-left: 10rpx; }
  }
}

.btn-wrap { margin: 0 30rpx; }

.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 998;
}

.upgrade-popup {
  position: fixed;
  left: 40rpx; right: 40rpx;
  top: 50%; transform: translateY(-50%);
  background: #fff;
  border-radius: 24rpx;
  z-index: 999;
  overflow: hidden;

  .upgrade-popup-header {
    display: flex; flex-direction: row; align-items: center; justify-content: space-between;
    padding: 30rpx 30rpx 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
    .upgrade-popup-title { font-size: 34rpx; font-weight: bold; color: #333; }
    .upgrade-popup-close { font-size: 36rpx; color: #999; padding: 10rpx; }
  }

  .upgrade-popup-body {
    padding: 30rpx;
    .upgrade-row {
      display: flex; flex-direction: row; justify-content: space-between; align-items: center;
      padding: 18rpx 0;
      .upgrade-label { font-size: 28rpx; color: #666; }
      .upgrade-val { font-size: 28rpx; color: #333; }
      .upgrade-val-highlight { color: #57ca9e; font-weight: bold; }
    }
    .upgrade-divider { height: 1rpx; background: #f0f0f0; margin: 8rpx 0; }
  }

  .upgrade-popup-actions {
    display: flex; flex-direction: row; border-top: 1rpx solid #f0f0f0;
    .upgrade-btn-cancel {
      flex: 1; padding: 30rpx 0; text-align: center;
      font-size: 30rpx; color: #999;
      border-right: 1rpx solid #f0f0f0;
    }
    .upgrade-btn-confirm {
      flex: 2; padding: 30rpx 0; text-align: center;
      font-size: 30rpx; color: #57ca9e; font-weight: bold;
      &.loading { opacity: 0.6; }
    }
  }
}
</style>
