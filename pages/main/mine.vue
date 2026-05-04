<template>
  <view class="mine-page">
    <!-- 用户信息头部 -->
	<view class="user-header">
	  <!-- 游客态 -->
	  <template v-if="!userStore.isLoggedIn">
		<!-- 增加包裹层 user-top-row -->
		<view class="user-top-row">
		  <view class="avatar-wrap" @click="goLogin">
			<image src="/static/ic-default-avatar.png" class="avatar-img" mode="aspectFit" />
		  </view>
		  <view class="user-info" @click="goLogin">
			<text class="username">点击登录</text>
			<text class="user-phone">登录后享受更多服务</text>
		  </view>
		  <view class="login-entry-btn" @click="goLogin">
			<text class="login-entry-text">立即登录 ›</text>
		  </view>
		</view>
	  </template>

	  <!-- 已登录态 -->
	  <template v-else>
		<!-- 基础用户信息，复用 user-top-row -->
		<view class="user-top-row">
		  <view class="avatar-wrap" @click="goMyInfo">
			<image v-if="userStore.avatar" :src="userStore.avatar" class="avatar-img" mode="aspectFill" />
			<image v-else src="/static/ic-default-avatar.png" class="avatar-img" mode="aspectFit" />
		  </view>
		  <view class="user-info">
			<text class="username">{{ userStore.nickname }}</text>
			<text class="user-phone">{{ maskedPhone }}</text>
		  </view>
		</view>
  
		<!-- VIP 专属横幅卡片：已有VIP的用户始终可见；未开通VIP功能时隐藏购买入口 -->
		<view v-if="VIP_ENABLED || userStore.isVip" class="vip-banner-card" @click="userStore.isVip ? goMyVip() : goVipCard()">
		  <view class="vip-banner-left">
			<image src="/static/vip-crown-2-fill.png" class="vip-crown-img" mode="aspectFit" />
			<view class="vip-text-wrap">
			  <text class="vip-title">{{ userStore.isVip ? (userStore.vipCardName || 'VIP会员') : '开通VIP会员' }}</text>
			  <text class="vip-subtitle">{{ userStore.isVip ? `${formatDate(userStore.vipExpireTime)} 到期` : '尊享多项专属特权与服务' }}</text>
			</view>
		  </view>
		  <view class="vip-banner-right">
			<text class="vip-btn">{{ userStore.isVip ? '去查看' : '立即开通' }}</text>
		  </view>
		</view>
	  </template>
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
        <view v-if="VIP_ENABLED" class="menu-item" @click="goVipCard">
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

    <!-- 退出登录（仅登录后显示） -->
    <view v-if="userStore.isLoggedIn" class="logout-wrap">
      <u-button text="退出登录" type="error" plain @click="handleLogout" />
    </view>
	
	
	
	<view style="width: 92%;display: flex;flex-direction: row;align-items: center;justify-content: space-between;
	margin-top: 25rpx;margin-bottom: 25rpx;color: #111;font-size: 24rpx;">
		<view style="width: 50%;display: flex;flex-direction: column;align-items: center;"
			@click="clickKfPhone">
			<text class="iconfont icon-call" style="color: #30ad55;font-size: 40rpx;"></text>
			<text style="margin-top: 10rpx;">电话咨询</text>
		</view>
		<view style="display: flex;flex-direction: column;align-items: center;color:#111;
		width: 50%;">
			<text class="iconfont icon-msg" style="color: #30ad55;font-size: 40rpx;"></text>
			<text style="margin-top: 5rpx;font-size: 24rpx;">在线客服</text>
			<button style="display: flex;flex-direction: column;align-items: center;border: none;background-color: #33000000;
			position: absolute;width: 50%;height: 85rpx;"
			type="default" plain="true" open-type="contact" size="default"></button>
		</view>
	</view>
	<view style="display: flex;flex-direction: column;align-items: center;margin-top: 15rpx;
	margin-bottom: 15rpx;">
		<text style="font-size: 26rpx;color: #AAA;transform: scale(0.8);">工作日09:00-18:00</text>
	</view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { getUserInfo, getUserVipInfo } from '@/utils/api'
import { VIP_ENABLED } from '@/utils/config'

const userStore = useUserStore()

const maskedPhone = computed(() => {
  const p = userStore.phone
  if (!p) return '未绑定手机号'
  return p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
})

onShow(async () => {
  if (!userStore.isLoggedIn) return
  try {
    const [userRes, vipRes] = await Promise.all([getUserInfo(), getUserVipInfo()])
    if (userRes.code === 200) userStore.setUserInfo(userRes.data)
    if (vipRes.code === 200) userStore.updateVipStatus(vipRes.data)
  } catch (e) {
    console.error(e)
  }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return dateStr.split('T')[0] || dateStr.substring(0, 10)
}

function goLogin() { uni.navigateTo({ url: '/pages/login/login' }) }
function goMyInfo() { if (!userStore.checkLogin()) return; uni.navigateTo({ url: '/pages/mine/myInfo' }) }
function goMyVip() { if (!userStore.checkLogin()) return; uni.navigateTo({ url: '/pages/vip/myVip' }) }
function goVipCard() { uni.navigateTo({ url: '/pages/vip/vipCard' }) }
function goCheckRecord() { if (!userStore.checkLogin()) return; uni.navigateTo({ url: '/pages/check/record' }) }
function goAccidentRecord() { if (!userStore.checkLogin()) return; uni.navigateTo({ url: '/pages/accident/record' }) }
function goMaintenanceRecord() { if (!userStore.checkLogin()) return; uni.navigateTo({ url: '/pages/maintenance/record' }) }
function goUpdatePwd() { if (!userStore.checkLogin()) return; uni.navigateTo({ url: '/pages/reg/updatePassword' }) }
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

/* 游客登录入口按钮 */
.login-entry-btn {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.25);
  padding: 14rpx 24rpx;
  border-radius: 30rpx;
  border: 1rpx solid rgba(255,255,255,0.6);

  .login-entry-text {
    font-size: 26rpx;
    color: #fff;
    font-weight: bold;
  }
}

/* 顶部用户信息 */
.user-header {
  background: linear-gradient(160deg, #57ca9e, #30ad55);
  padding: 20rpx 30rpx 0; /* 底部 padding 为 0，让VIP卡片贴底 */
  display: flex;
  flex-direction: column; 

  /* 统一的基础用户信息行（登录前/登录后复用横向排版） */
  .user-top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24rpx;
    padding: 0 10rpx 40rpx; /* 底部预留 40rpx 呼吸空间 */

    .avatar-wrap {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 4rpx solid rgba(255, 255, 255, 0.4);
      .avatar-img { width: 100%; height: 100%; }
    }

    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      .username { font-size: 30rpx; font-weight: bold; color: #fff; max-width: 400rpx; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
      .user-phone { font-size: 24rpx; color: rgba(255,255,255,0.85); margin-top: 10rpx; }
    }

    /* 游客登录入口按钮 (被包裹进 top-row，保持同行) */
    .login-entry-btn {
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.25);
      padding: 14rpx 24rpx;
      border-radius: 30rpx;
      border: 1rpx solid rgba(255,255,255,0.6);

      .login-entry-text {
        font-size: 26rpx;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  /* 黑金横幅卡片样式 */
  .vip-banner-card {
    background: linear-gradient(135deg, #3e3e3e 0%, #1a1a1a 100%);
    border-radius: 24rpx 24rpx 0 0;
    padding: 24rpx 30rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 -4rpx 12rpx rgba(0,0,0,0.05);

    .vip-banner-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16rpx;

      .vip-crown-img { width: 44rpx; height: 44rpx; }
      .vip-text-wrap {
        display: flex;
        flex-direction: column;
        .vip-title { font-size: 28rpx; color: #f2d593; font-weight: bold; }
        .vip-subtitle { font-size: 22rpx; color: rgba(242, 213, 147, 0.6); margin-top: 6rpx; }
      }
    }

    .vip-banner-right {
      background: linear-gradient(135deg, #fce5ab, #d8b260);
      padding: 10rpx 26rpx;
      border-radius: 30rpx;
      .vip-btn { font-size: 24rpx; color: #4a3600; font-weight: bold; }
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
