<template>
  <view class="mine-page">
    <!-- 用户信息头部 -->
    <view class="user-header">
      <view class="avatar-wrap" @click="goMyInfo">
        <image v-if="userStore.avatar" :src="userStore.avatar" class="avatar-img" mode="aspectFill" />
        <image v-else src="/static/ic-default-avatar.png" class="avatar-img" mode="aspectFit" />
      </view>
      <view class="user-info">
        <text class="username">{{ userStore.nickname }}</text>
        <text class="user-phone">{{ maskedPhone }}</text>
      </view>
      <view class="vip-status-wrap" @click="goMyVip">
        <view v-if="userStore.isVip" class="vip-active">
          <image src="/static/vip-crown-2-fill.png" class="vip-crown-img" mode="aspectFit" />
          <view class="vip-info">
            <text class="vip-label">VIP有效期</text>
            <text class="vip-date">{{ formatDate(userStore.vipExpireTime) }}</text>
          </view>
        </view>
        <view v-else class="vip-inactive" @click="goVipCard">
          <image src="/static/vip-crown-2-fill.png" class="vip-crown-img" mode="aspectFit" />
          <text class="vip-open">开通VIP</text>
        </view>
      </view>
    </view>

    <!-- 我的记录 -->
    <view class="menu-group">
      <text class="group-title">我的记录</text>
      <view class="menu-list">
        <view class="menu-item" @click="goCheckRecord">
          <u-icon name="list" size="30" color="#57ca9e" />
          <text class="menu-label">车云检记录</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
        <view class="menu-item" @click="goAccidentRecord">
          <u-icon name="warning" size="30" color="#57ca9e" />
          <text class="menu-label">事故查询记录</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
        <view class="menu-item" @click="goMaintenanceRecord">
          <u-icon name="clock" size="28" color="#57ca9e" />
          <text class="menu-label">维保查询记录</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
      </view>
    </view>

    <!-- 账户服务 -->
    <view class="menu-group">
      <text class="group-title">账户服务</text>
      <view class="menu-list">
        <view class="menu-item" @click="goVipCard">
		  <u-icon name="integral" size="30" color="#57ca9e" />
          <text class="menu-label">购买VIP会员</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
        <view class="menu-item" @click="goMyInfo">
          <u-icon name="account" size="30" color="#57ca9e" />
          <text class="menu-label">个人信息</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
        <view class="menu-item" @click="goUpdatePwd">
          <u-icon name="lock" size="30" color="#57ca9e" />
          <text class="menu-label">修改密码</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
      </view>
    </view>

    <!-- 帮助与支持 -->
    <view class="menu-group">
      <text class="group-title">帮助与支持</text>
      <view class="menu-list">
        <view class="menu-item" @click="goQuestion">
          <u-icon name="question-circle" size="28" color="#57ca9e" />
          <text class="menu-label">常见问题</text>
          <u-icon name="arrow-right" size="20" color="#ccc" />
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-wrap">
      <u-button text="退出登录" type="error" plain @click="handleLogout" />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/utils/api'

const userStore = useUserStore()

const maskedPhone = computed(() => {
  const p = userStore.phone
  if (!p) return '未绑定手机号'
  return p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

onShow(async () => {
  if (!userStore.isLoggedIn) {
    uni.reLaunch({ url: '/pages/login/login' })
    return
  }
  try {
    const res = await getUserInfo()
    if (res.code === 200) userStore.setUserInfo(res.data)
  } catch (e) {
    console.error(e)
  }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return dateStr.split('T')[0] || dateStr.substring(0, 10)
}

function goMyInfo() { uni.navigateTo({ url: '/pages/mine/myInfo' }) }
function goMyVip() { uni.navigateTo({ url: '/pages/vip/myVip' }) }
function goVipCard() { uni.navigateTo({ url: '/pages/vip/vipCard' }) }
function goCheckRecord() { uni.navigateTo({ url: '/pages/check/record' }) }
function goAccidentRecord() { uni.navigateTo({ url: '/pages/accident/record' }) }
function goMaintenanceRecord() { uni.navigateTo({ url: '/pages/maintenance/record' }) }
function goUpdatePwd() { uni.navigateTo({ url: '/pages/reg/updatePassword' }) }
function goQuestion() { uni.navigateTo({ url: '/pages/mine/question' }) }

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) userStore.logout()
    }
  })
}
</script>

<style lang="scss" scoped>
.mine-page {
  min-height: 100vh;
  background-color: #f7fafa;
  padding-bottom: 60rpx;
}

/* 顶部用户信息 */
.user-header {
  background: linear-gradient(160deg, #57ca9e, #30ad55);
  padding: 60rpx 40rpx 40rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24rpx;

  .avatar-wrap {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    .avatar-img { width: 100%; height: 100%; }
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .username { font-size: 36rpx; font-weight: bold; color: #fff; }
    .user-phone { font-size: 26rpx; color: rgba(255,255,255,0.85); margin-top: 8rpx; }
  }

  .vip-status-wrap {
    flex-shrink: 0;

    .vip-active {
      background: rgba(255, 255, 255, 0.2);
      padding: 14rpx 20rpx;
      border-radius: 16rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10rpx;
      .vip-crown-img { width: 36rpx; height: 36rpx; }
      .vip-info {
        display: flex;
        flex-direction: column;
        .vip-label { font-size: 20rpx; color: #ffe082; font-weight: bold; }
        .vip-date { font-size: 18rpx; color: rgba(255,255,255,0.85); margin-top: 4rpx; }
      }
    }

    .vip-inactive {
      background: linear-gradient(135deg, #ffb300, #ff5833);
      padding: 14rpx 22rpx;
      border-radius: 30rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8rpx;
      .vip-crown-img { width: 30rpx; height: 30rpx; }
      .vip-open { font-size: 26rpx; color: #fff; font-weight: bold; }
    }
  }
}

/* 菜单分组 */
.menu-group {
  margin: 28rpx 30rpx 0;

  .group-title {
    font-size: 26rpx;
    color: #999;
    padding: 0 10rpx 14rpx;
    display: block;
  }

  .menu-list {
    background: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
  }

  .menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 22rpx 28rpx;
    border-bottom: 1rpx solid #f5f5f5;
    gap: 18rpx;
    &:last-child { border-bottom: none; }

    .menu-label {
      flex: 1;
      font-size: 26rpx;
      color: #333;
    }
  }
}


/* VIP 图片图标，与 u-icon 视觉尺寸对齐 */
.plain-icon-img {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

/* 退出按钮 */
.logout-wrap {
  margin: 40rpx 30rpx 0;
}
</style>
