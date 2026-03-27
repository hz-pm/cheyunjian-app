<template>
  <view class="page">
    <!-- 头像 -->
    <view class="avatar-section">
      <view class="avatar-wrap" @click="changeAvatar">
        <image v-if="userStore.avatar" :src="userStore.avatar" class="avatar-img" mode="aspectFill" />
        <text v-else class="avatar-placeholder">👤</text>
      </view>
      <text class="avatar-hint">点击更换头像</text>
    </view>

    <!-- 信息列表 -->
    <view class="info-list">
      <view class="info-item">
        <text class="info-label">昵称</text>
        <view class="info-right">
          <u-input
            v-model="nickname"
            placeholder="请输入昵称"
            border="none"
            input-align="right"
          />
        </view>
      </view>
      <view class="info-item">
        <text class="info-label">手机号</text>
        <text class="info-value">{{ maskedPhone }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">VIP状态</text>
        <text class="info-value" :class="userStore.isVip ? 'vip-active' : ''">
          {{ userStore.isVip ? 'VIP会员' : '普通用户' }}
        </text>
      </view>
    </view>

    <view class="btn-wrap">
      <u-button text="保存修改" type="primary" color="#57ca9e" :loading="saving" @click="handleSave" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const nickname = ref(userStore.nickname)
const saving = ref(false)

const maskedPhone = computed(() => {
  const p = userStore.phone
  if (!p) return '未绑定'
  return p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

function changeAvatar() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 实际项目中需上传图片到服务器
      uni.showToast({ title: '头像上传功能待接入', icon: 'none' })
    }
  })
}

async function handleSave() {
  if (!nickname.value.trim()) {
    uni.showToast({ title: '昵称不能为空', icon: 'none' })
    return
  }
  saving.value = true
  try {
    // TODO: 调用接口保存昵称
    uni.showToast({ title: '保存成功', icon: 'success' })
    userStore.userInfo.nickname = nickname.value
    uni.setStorageSync('userInfo', JSON.stringify(userStore.userInfo))
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; }

.avatar-section {
  background: #fff; padding: 60rpx 0;
  display: flex; flex-direction: column; align-items: center; gap: 16rpx;
  .avatar-wrap {
    width: 160rpx; height: 160rpx; border-radius: 50%; overflow: hidden;
    background: #e8f8f0; display: flex; align-items: center; justify-content: center;
    .avatar-img { width: 100%; height: 100%; }
    .avatar-placeholder { font-size: 80rpx; }
  }
  .avatar-hint { font-size: 24rpx; color: #57ca9e; }
}

.info-list {
  margin: 30rpx; background: #fff; border-radius: 20rpx;
  overflow: hidden; box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
  .info-item {
    display: flex; flex-direction: row; align-items: center;
    padding: 32rpx 30rpx; border-bottom: 1rpx solid #f5f5f5;
    &:last-child { border-bottom: none; }
    .info-label { font-size: 30rpx; color: #333; width: 140rpx; flex-shrink: 0; }
    .info-right { flex: 1; }
    .info-value { flex: 1; text-align: right; font-size: 28rpx; color: #666;
      &.vip-active { color: #57ca9e; font-weight: bold; } }
  }
}

.btn-wrap { margin: 30rpx; }
</style>
