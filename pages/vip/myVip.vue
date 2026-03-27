<template>
  <view class="page">
    <view class="vip-card" :class="userStore.isVip ? 'active' : 'inactive'">
      <view class="card-top">
        <text class="crown">👑</text>
        <view class="card-info">
          <text class="card-title">{{ userStore.isVip ? 'VIP会员' : '普通用户' }}</text>
          <text class="card-sub">{{ userStore.isVip ? '尊享会员专属优惠' : '开通VIP享更多优惠' }}</text>
        </view>
      </view>
      <view v-if="userStore.isVip" class="expire-row">
        <text class="expire-label">有效期至</text>
        <text class="expire-date">{{ formatDate(userStore.vipExpireTime) }}</text>
      </view>
    </view>

    <view v-if="userStore.isVip" class="status-card">
      <text class="status-title">会员状态</text>
      <view class="status-item">
        <text class="status-key">会员类型</text>
        <text class="status-val">VIP会员</text>
      </view>
      <view class="status-item">
        <text class="status-key">到期时间</text>
        <text class="status-val">{{ formatDate(userStore.vipExpireTime) }}</text>
      </view>
      <view class="status-item">
        <text class="status-key">会员状态</text>
        <text class="status-val active">正常</text>
      </view>
    </view>

    <view class="btn-wrap">
      <u-button
        :text="userStore.isVip ? '续费VIP' : '立即开通VIP'"
        type="primary"
        color="#57ca9e"
        @click="uni.navigateTo({ url: '/pages/vip/vipCard' })"
      />
    </view>
  </view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { getUserVipInfo } from '@/utils/api'

const userStore = useUserStore()

onShow(async () => {
  try {
    const res = await getUserVipInfo()
    if (res.code === 200) userStore.updateVipStatus(res.data)
  } catch (e) { console.error(e) }
})

function formatDate(dateStr) {
  if (!dateStr) return '--'
  return dateStr.split('T')[0] || dateStr.substring(0, 10)
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; padding: 30rpx; }

.vip-card {
  border-radius: 24rpx; padding: 40rpx; margin-bottom: 30rpx;
  &.active { background: linear-gradient(135deg, #2d2d2d, #555); }
  &.inactive { background: linear-gradient(135deg, #aaa, #ccc); }
  .card-top { display: flex; flex-direction: row; align-items: center; gap: 24rpx;
    .crown { font-size: 60rpx; }
    .card-info { display: flex; flex-direction: column; gap: 8rpx;
      .card-title { font-size: 36rpx; font-weight: bold; color: #ffe082; }
      .card-sub { font-size: 24rpx; color: rgba(255,255,255,0.7); } }
  }
  .expire-row { display: flex; flex-direction: row; justify-content: space-between;
    margin-top: 30rpx; padding-top: 24rpx; border-top: 1rpx solid rgba(255,255,255,0.15);
    .expire-label { font-size: 26rpx; color: rgba(255,255,255,0.7); }
    .expire-date { font-size: 26rpx; color: #ffe082; font-weight: bold; } }
}

.status-card {
  background: #fff; border-radius: 20rpx; padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05); margin-bottom: 30rpx;
  .status-title { font-size: 30rpx; font-weight: bold; color: #333; display: block; margin-bottom: 20rpx; }
  .status-item { display: flex; flex-direction: row; justify-content: space-between;
    padding: 20rpx 0; border-bottom: 1rpx solid #f5f5f5;
    &:last-child { border-bottom: none; }
    .status-key { font-size: 28rpx; color: #666; }
    .status-val { font-size: 28rpx; color: #333;
      &.active { color: #57ca9e; font-weight: bold; } }
  }
}

.btn-wrap { margin-top: 20rpx; }
</style>
