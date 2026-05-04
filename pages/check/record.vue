<template>
  <view class="page">
    <view v-if="loading" class="loading-wrap">
      <u-loading-icon size="60" color="#30ad55" />
    </view>

    <view v-else-if="list.length === 0" class="empty-wrap">
      <image src="/static/img-nodata.png" class="empty-img" mode="aspectFit" />
      <text class="empty-text">暂无车云检记录</text>
      <u-button text="去检测" type="primary" color="#30ad55" size="small" @click="goCheck" />
    </view>

    <scroll-view v-else scroll-y class="list-wrap">
      <view
        class="record-card"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item)"
      >
        <!-- 卡片头部：品牌图 + 品牌/VIN + 状态 -->
        <view class="card-header">
          <image
            :src="item.brandLogo || '/static/ic-car.png'"
            class="car-img"
            :class="{ 'brand-logo': !!item.brandLogo }"
            mode="aspectFit"
          />
          <view class="header-info">
            <text v-if="item.brand" class="brand-text">{{ item.brand }}</text>
            <text class="vin-text" :class="{ small: !!item.brand }">{{ item.vinCode || item.vin }}</text>
            <view class="header-sub">
              <view class="type-tag">{{ typeLabel(item.type) }}</view>
              <text class="money-text" v-if="item.money">¥{{ Number(item.money).toFixed(2) }}</text>
            </view>
          </view>
          <view class="status-badge" :class="statusClass(item.status)">
            {{ statusLabel(item.status) }}
          </view>
        </view>

        <!-- 卡片底部：时间 + 箭头 -->
        <view class="card-footer">
          <text class="time-text">{{ formatTime(item.createTime) }}</text>
          <text class="arrow-text">查看详情 ›</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getCheckList } from '@/utils/api'

const loading = ref(true)
const list = ref([])

onShow(() => { fetchList() })

async function fetchList() {
  loading.value = true
  try {
    const res = await getCheckList({ type: 1, pageNum: 1, pageSize: 100 })
    if (res.code === 200) list.value = res.rows || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function formatTime(time) {
  if (!time) return '--'
  return time.replace('T', ' ').substring(0, 16)
}

function statusLabel(status) {
  const map = { 0: '待支付', 1: '检测中', 2: '已完成', 3: '已退款', 4: '已取消', 5: '联系客服' }
  return map[status] ?? '未知'
}

function typeLabel(type) {
  const map = { 1: '车云检', 2: '事故查询', 3: '维保查询' }
  return map[type] ?? '检测'
}

function statusClass(status) {
  if (status === 2) return 'status-success'
  if (status === 3) return 'status-refund'
  if (status === 4) return 'status-cancel'
  if (status === 5) return 'status-refund'
  return 'status-pending'
}

function goDetail(item) {
  uni.setStorageSync('orderDetail', JSON.stringify(item))
  uni.navigateTo({ url: '/pages/order/detail' })
}

function goCheck() {
  uni.navigateTo({ url: '/pages/check/vinInput' })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f0f5f3;
}

.loading-wrap {
  display: flex;
  justify-content: center;
  padding-top: 200rpx;
}

.empty-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150rpx 40rpx 0;
  gap: 30rpx;
  .empty-img { width: 200rpx; height: 200rpx; }
  .empty-text { font-size: 30rpx; color: #888; }
}

.list-wrap {
  height: 100vh;
  padding: 24rpx 28rpx;
  box-sizing: border-box;
}

.record-card {
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.07);

  .card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 28rpx 28rpx 20rpx;
    gap: 20rpx;

    .car-img {
      width: 100rpx;
      height: 68rpx;
      flex-shrink: 0;
      border-radius: 10rpx;
      background: #f0f5f3;
      &.brand-logo {
        width: 80rpx;
        height: 80rpx;
        background: #fff;
        border: 1rpx solid #eee;
        padding: 6rpx;
        box-sizing: border-box;
      }
    }

    .header-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6rpx;

      .brand-text {
        font-size: 32rpx;
        font-weight: bold;
        color: #1a1a1a;
      }

      .vin-text {
        font-size: 30rpx;
        font-weight: bold;
        color: #1a1a1a;
        letter-spacing: 1rpx;
        &.small {
          font-size: 24rpx;
          font-weight: normal;
          color: #888;
          letter-spacing: 0;
        }
      }

      .header-sub {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14rpx;

        .type-tag {
          font-size: 22rpx;
          color: #30ad55;
          background: #e8f8ee;
          padding: 4rpx 14rpx;
          border-radius: 20rpx;
        }

        .money-text {
          font-size: 26rpx;
          color: #ff6b35;
          font-weight: bold;
        }
      }
    }

    .status-badge {
      font-size: 22rpx;
      padding: 8rpx 18rpx;
      border-radius: 20rpx;
      flex-shrink: 0;

      &.status-success { background: #e8f8ee; color: #30ad55; }
      &.status-pending { background: #fff3e0; color: #ff8c00; }
      &.status-refund  { background: #fce4e4; color: #e53935; }
      &.status-cancel  { background: #f5f5f5; color: #999; }
    }
  }

  .card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 28rpx;
    border-top: 1rpx solid #f5f5f5;
    background: #fafafa;

    .time-text {
      font-size: 24rpx;
      color: #aaa;
    }

    .arrow-text {
      font-size: 24rpx;
      color: #30ad55;
    }
  }
}
</style>
