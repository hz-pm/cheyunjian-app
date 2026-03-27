<template>
  <view class="page">
    <view v-if="loading" class="loading-wrap">
      <u-loading-icon size="60" color="#57ca9e" />
    </view>

    <view v-else-if="list.length === 0" class="empty-wrap">
      <image src="/static/img-nodata.png" class="empty-img" mode="aspectFit" />
      <text class="empty-text">暂无车云检记录</text>
      <u-button text="去检测" type="primary" color="#57ca9e" @click="goCheck" />
    </view>

    <scroll-view v-else scroll-y class="list-wrap">
      <view
        class="record-item"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item)"
      >
        <view class="item-left">
          <text class="vin-text">{{ item.vinCode || item.vin }}</text>
          <text class="time-text">{{ formatTime(item.createTime || item.checkTime) }}</text>
        </view>
        <view class="item-right">
          <view class="status-badge" :class="item.status === 1 ? 'success' : 'pending'">
            {{ item.status === 1 ? '已完成' : '处理中' }}
          </view>
          <text class="arrow">›</text>
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

onShow(() => {
  fetchList()
})

async function fetchList() {
  loading.value = true
  try {
    const res = await getCheckList({ type: 1 })
    if (res.code === 200) {
      list.value = res.data || res.rows || []
    }
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

function goDetail(item) {
  uni.navigateTo({ url: `/pages/check/result?vinCode=${item.vinCode || item.vin}` })
}

function goCheck() {
  uni.navigateTo({ url: '/pages/check/vinInput' })
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; }

.loading-wrap {
  display: flex; justify-content: center; padding-top: 200rpx;
}

.list-wrap { height: 100vh; }

.empty-wrap {
  display: flex; flex-direction: column; align-items: center;
  padding: 150rpx 40rpx 0; gap: 30rpx;
  .empty-img { width: 160rpx; height: 200rpx; }
  .empty-text { font-size: 30rpx; color: #888; }
}

.list-wrap {
  padding: 20rpx 30rpx;
  .record-item {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
    .item-left {
      display: flex; flex-direction: column; gap: 10rpx;
      .vin-text { font-size: 30rpx; font-weight: bold; color: #333; }
      .time-text { font-size: 24rpx; color: #999; }
    }
    .item-right {
      display: flex; flex-direction: row; align-items: center; gap: 16rpx;
      .status-badge {
        font-size: 22rpx; padding: 6rpx 16rpx; border-radius: 20rpx;
        &.success { background: #e8f8f0; color: #57ca9e; }
        &.pending { background: #fff3e0; color: #ff8c00; }
      }
      .arrow { font-size: 36rpx; color: #ccc; }
    }
  }
}
</style>
