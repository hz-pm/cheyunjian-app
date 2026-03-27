<template>
  <view class="page">
    <!-- 顶部 Banner 轮播 -->
    <swiper
      class="banner-swiper"
      circular
      :indicator-dots="true"
      :autoplay="true"
      :interval="4000"
      :duration="500"
      indicator-color="rgba(255,255,255,0.4)"
      indicator-active-color="#fff"
    >
      <swiper-item>
        <image
          src="https://api.xinnengyuanyunjian.top/profile/images/img-banner.webp"
          class="banner-img"
          mode="aspectFill"
        />
      </swiper-item>
    </swiper>

    <!-- 用户信息浮层 -->
    <view class="user-card">
      <view class="user-left">
        <view class="avatar-wrap">
          <image
            v-if="userStore.avatar"
            :src="userStore.avatar"
            class="avatar-img"
            mode="aspectFill"
          />
          <image
            v-else
            src="/static/ic-default-avatar.png"
            class="avatar-img"
            mode="aspectFit"
          />
        </view>
        <view class="user-info">
          <text class="username">{{ userStore.nickname }}</text>
          <text class="welcome">您好，欢迎使用新能源云检～</text>
        </view>
      </view>
      <view v-if="userStore.isVip" class="vip-badge">
        <image src="/static/vip-crown-2-fill.png" class="vip-icon" mode="aspectFit" />
        <text class="vip-text">VIP</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <!-- 车云检（大卡片） -->
      <image
        src="/static/home-menu1.png"
        class="menu-card-full"
        mode="widthFix"
        @click="goCheck"
      />

      <!-- 事故查询 & 维保查询（并排小卡片） -->
      <view class="menu-row">
        <image
          src="/static/home-menu4.png"
          class="menu-card-half"
          mode="widthFix"
          @click="goAccident"
        />
        <image
          src="/static/home-menu3.png"
          class="menu-card-half"
          mode="widthFix"
          @click="goMaintenance"
        />
      </view>
    </view>

    <!-- VIP 推广 -->
    <view class="vip-section" @click="goVip" v-if="!userStore.isVip">
      <view class="vip-content">
        <view class="vip-left">
          <!-- <image src="/static/vip-crown-2-fill.png" class="vip-crown-img" mode="aspectFit" /> -->
          <view class="vip-texts">
            <text class="vip-title">开通VIP会员</text>
            <text class="vip-desc">享受全年超值优惠，省钱更省心</text>
          </view>
        </view>
        <view class="vip-btn">立即开通</view>
      </view>
    </view>

    <!-- 版权 -->
    <view class="footer">
      <text class="footer-text">Copyright © 2026 株洲云检新能源科技有限公司</text>
    </view>
  </view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/utils/api'

const userStore = useUserStore()

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

function goCheck() {
  uni.navigateTo({ url: '/pages/check/vinInput' })
}

function goAccident() {
  uni.navigateTo({ url: '/pages/accident/vinInput' })
}

function goMaintenance() {
  uni.navigateTo({ url: '/pages/maintenance/vinInput' })
}

function goVip() {
  uni.navigateTo({ url: '/pages/vip/vipCard' })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f7fafa;
  padding-bottom: 60rpx;
}

/* 轮播 */
.banner-swiper {
  width: 100%;
  height: 400rpx;
  .banner-img {
    width: 100%;
    height: 100%;
  }
}

/* 用户卡片，浮在轮播底部 */
.user-card {
  width: 90%;
  margin: -40rpx auto 0;
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;

  .user-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20rpx;
    flex: 1;
  }

  .avatar-wrap {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    overflow: hidden;
    background: #c3d1cb;
    flex-shrink: 0;
    .avatar-img { width: 100%; height: 100%; }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    .username { font-size: 30rpx; font-weight: bold; color: #111; }
    .welcome { font-size: 24rpx; color: #888; margin-top: 6rpx; }
  }

  .vip-badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: linear-gradient(135deg, #ffb300, #ff5833);
    padding: 8rpx 18rpx;
    border-radius: 30rpx;
    gap: 8rpx;
    .vip-icon { width: 30rpx; height: 30rpx; }
    .vip-text { font-size: 24rpx; color: #fff; font-weight: bold; }
  }
}

/* 菜单区域 */
.menu-section {
  width: 93%;
  margin: 35rpx auto 0;
  display: flex;
  flex-direction: column;
  gap: 25rpx;
}

.menu-card-full {
  width: 100%;
  border-radius: 20rpx;
  display: block;
}

.menu-row {
  display: flex;
  flex-direction: row;
  gap: 25rpx;
}

.menu-card-half {
  flex: 1;
  width: 0;  /* flex child, width controlled by flex */
  border-radius: 20rpx;
  display: block;
}

/* VIP 推广条 */
.vip-section {
  width: 90%;
  margin: 30rpx auto 0;
  background: linear-gradient(135deg, #fff8e1, #ffe082);
  border-radius: 20rpx;
  padding: 28rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(255, 180, 0, 0.2);

  .vip-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .vip-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16rpx;
      .vip-crown-img { width: 52rpx; height: 52rpx; }
      .vip-texts {
        display: flex;
        flex-direction: column;
        gap: 6rpx;
        .vip-title { font-size: 32rpx; font-weight: bold; color: #8b5e00; }
        .vip-desc { font-size: 24rpx; color: #a87800; }
      }
    }

    .vip-btn {
      background: linear-gradient(135deg, #ffb300, #ff5833);
      color: #fff;
      font-size: 26rpx;
      padding: 14rpx 28rpx;
      border-radius: 40rpx;
      font-weight: bold;
    }
  }
}

/* 版权 */
.footer {
  text-align: center;
  padding: 40rpx 40rpx 0;
  .footer-text { font-size: 22rpx; color: #bbb; }
}
</style>
