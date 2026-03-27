<template>
  <view class="page">
    <!-- 头部 -->
    <view class="vip-header">
      <text class="vip-crown">👑</text>
      <text class="vip-title">VIP会员</text>
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
        <text class="benefit-text">车云检优惠折扣</text>
      </view>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">事故查询优惠价格</text>
      </view>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">维保查询优惠价格</text>
      </view>
      <view class="benefit-item">
        <text class="benefit-icon">✅</text>
        <text class="benefit-text">专属客服支持</text>
      </view>
    </view>

    <!-- 购买按钮 -->
    <view class="btn-wrap">
      <u-button
        :text="userStore.isVip ? '续费VIP' : '立即开通'"
        type="primary"
        color="#57ca9e"
        :loading="loading"
        :disabled="!selectedId"
        @click="handleBuy"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { getVipCardList, buyVip, payCloudCheck } from '@/utils/api'

const userStore = useUserStore()
const plans = ref([])
const selectedId = ref(null)
const loading = ref(false)

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

    // 支付成功
    uni.showToast({ title: '开通成功！', icon: 'success' })
    // 刷新VIP状态
    setTimeout(async () => {
      const { getUserVipInfo } = await import('@/utils/api')
      const vipRes = await getUserVipInfo()
      if (vipRes.code === 200) {
        userStore.updateVipStatus(vipRes.data)
      }
      uni.navigateTo({ url: '/pages/vip/myVip' })
    }, 1000)
  } catch (e) {
    if (e?.errMsg?.includes('cancel')) {
      uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
    } else {
      uni.navigateTo({ url: '/pages/pay/payResult?status=fail' })
    }
  } finally {
    loading.value = false
  }
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
  }
}

.btn-wrap { margin: 0 30rpx; }
</style>
