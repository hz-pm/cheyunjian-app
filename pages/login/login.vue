<template>
  <view class="login-page">
    <view class="header">
      <image src="/static/logo-login.png" class="logo-img" mode="aspectFit" />
      <text class="app-desc">专业新能源车辆检测平台</text>
    </view>

    <view v-if="loginMode === 'wechat'" class="mode-wechat slide-fade">
      <view class="wx-main-btn" @click="handleWxLogin">
        <image src="/static/wxLogin.png" class="wx-icon" mode="aspectFit"></image>
        <text>微信一键登录</text>
      </view>

      <view class="text-nav-row">
        <text class="nav-text" @click="switchMode('form', 0)">验证码登录</text>
        <view class="divider-v"></view>
        <text class="nav-text" @click="switchMode('form', 1)">账号密码登录</text>
      </view>
    </view>

    <view v-else class="mode-form slide-fade">
      <view class="tab-header">
        <view class="tab-item" :class="{ active: activeTab === 0 }" @click="activeTab = 0">
          <text class="tab-text">验证码登录</text>
          <view class="tab-line"></view>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 1 }" @click="activeTab = 1">
          <text class="tab-text">密码登录</text>
          <view class="tab-line"></view>
        </view>
      </view>

      <view class="form-wrap">
        <view class="input-box">
          <u-input
            v-model="phone"
            placeholder="请输入手机号"
            type="number"
            border="bottom"
            clearable
            fontSize="16"
          />
        </view>

        <template v-if="activeTab === 0">
          <view class="input-box code-row">
            <view class="flex-1">
              <u-input
                v-model="smsCode"
                placeholder="请输入验证码"
                type="number"
                border="bottom"
                :maxlength="6"
                fontSize="16"
              />
            </view>
            <text 
              class="get-code-text" 
              :class="{ disabled: !canGetCode }" 
              @click="getSmsCode"
            >{{ codeText }}</text>
          </view>
        </template>

        <template v-if="activeTab === 1">
          <view class="input-box">
            <u-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              border="bottom"
              clearable
              fontSize="16"
            />
          </view>
          <view class="action-row">
            <text class="link-text" @click="goPage('/pages/reg/updatePassword')">忘记密码？</text>
            <text class="link-text" @click="goPage('/pages/reg/register')">立即注册</text>
          </view>
        </template>

        <u-button
          class="login-btn"
          text="登录"
          type="primary"
          color="#57ca9e"
          shape="circle"
          :loading="loading"
          @click="handleLogin"
        />
      </view>

      <view class="form-bottom-wx">
        <view class="divider">
          <view class="line"></view>
          <text class="divider-text">微信快捷登录</text>
          <view class="line"></view>
        </view>
        <image src="/static/wxLogin.png" class="mini-wx-icon" @click="switchMode('wechat')"></image>
      </view>
    </view>

    <view class="footer-agreement">
      <u-checkbox-group placement="row" @change="onAgreementChange">
        <u-checkbox v-model:checked="agreed" shape="circle" active-color="#57ca9e" size="14" />
      </u-checkbox-group>
      <view class="agreement-text-wrap">
        <text class="gray-text">我已阅读并同意</text>
        <text class="green-text" @click="openAgreement(1)">《用户服务协议》</text>
        <text class="gray-text">与</text>
        <text class="green-text" @click="openAgreement(2)">《隐私政策》</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { login, loginByCode, miniProgramLogin, sendSms, getUserInfo } from '@/utils/api'

const userStore = useUserStore()

// 视图模式: 'wechat' | 'form'
const loginMode = ref('wechat')
const activeTab = ref(0) // 0: 验证码, 1: 密码

const phone = ref('')
const smsCode = ref('')
const password = ref('')
const agreed = ref(false)
const loading = ref(false)

const codeText = ref('获取验证码')
const canGetCode = ref(true)
let countdownTimer = null

// 切换登录模式
function switchMode(mode, tabIndex = 0) {
  loginMode.value = mode
  if (mode === 'form') {
    activeTab.value = tabIndex
  }
}

function onAgreementChange(val) {
  agreed.value = val.length > 0
}

function goPage(url) {
  uni.navigateTo({ url })
}

function openAgreement(type) {
		uni.navigateTo({
			url: '/pages/login/webView?type=' + type,
		})
	
  // uni.showToast({ title: type === 1 ? '用户服务协议' : '隐私政策', icon: 'none' })
}

function checkAgreement() {
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并勾选底部协议', icon: 'none' })
    return false
  }
  return true
}

async function getSmsCode() {
  if (!phone.value) return uni.showToast({ title: '请输入手机号', icon: 'none' })
  if (!/^1[3-9]\d{9}$/.test(phone.value)) return uni.showToast({ title: '手机号格式不正确', icon: 'none' })
  
  try {
    await sendSms({ phone: phone.value, type: 'login' })
    uni.showToast({ title: '验证码已发送', icon: 'none' })
    startCountdown()
  } catch (e) {}
}

function startCountdown() {
  canGetCode.value = false
  let seconds = 60
  codeText.value = `${seconds}s`
  countdownTimer = setInterval(() => {
    seconds--
    if (seconds <= 0) {
      clearInterval(countdownTimer)
      canGetCode.value = true
      codeText.value = '重新获取'
    } else {
      codeText.value = `${seconds}s`
    }
  }, 1000)
}

async function handleLogin() {
  if (!checkAgreement()) return

  if (!phone.value) return uni.showToast({ title: '请输入手机号', icon: 'none' })
  if (activeTab.value === 0 && !smsCode.value) return uni.showToast({ title: '请输入验证码', icon: 'none' })
  if (activeTab.value === 1 && !password.value) return uni.showToast({ title: '请输入密码', icon: 'none' })

  loading.value = true
  try {
    let res
    if (activeTab.value === 0) {
      let wechatCode = ''
      try {
        const wxRes = await uni.login({ provider: 'weixin' })
        if (wxRes && wxRes.code) wechatCode = wxRes.code
      } catch (e) {}
      res = await loginByCode({ phone: phone.value, code: smsCode.value, wechatCode })
    } else {
      res = await login({ username: phone.value, password: password.value })
    }

    if (res.code === 200) {
      userStore.setToken(res.data)
      await fetchUserInfo()
    } else {
      uni.showToast({ title: res.msg || '登录失败', icon: 'none' })
    }
  } catch (e) {
  } finally {
    loading.value = false
  }
}

async function handleWxLogin() {
  if (!checkAgreement()) return

  uni.showLoading({ title: '登录中...', mask: true })
  try {
    const loginRes = await uni.login({ provider: 'weixin' })
    if (!loginRes || !loginRes.code) return uni.showToast({ title: '微信授权失败', icon: 'none' })
    
    const res = await miniProgramLogin({ code: loginRes.code })
    if (res.code === 200) {
      userStore.setToken(res.data)
      await fetchUserInfo()
    } else {
      uni.showToast({ title: res.msg || '登录失败', icon: 'none' })
    }
  } catch (e) {
  } finally {
    uni.hideLoading()
  }
}

async function fetchUserInfo() {
  try {
    const res = await getUserInfo()
    if (res.code === 200) {
      userStore.setUserInfo(res.data)
      uni.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => uni.reLaunch({ url: '/pages/main/index' }), 800)
    }
  } catch (e) {}
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* 简单的淡入动画，让状态切换更丝滑 */
.slide-fade {
  animation: fade-in 0.4s ease;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10rpx); }
  to { opacity: 1; transform: translateY(0); }
}

/* 顶部品牌区 */
.header {
  padding: 160rpx 0 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .logo-img {
    width: 380rpx;
    height: 180rpx;
    margin-bottom: 24rpx;
  }
  .app-desc {
    font-size: 28rpx;
    color: #666;
    letter-spacing: 2rpx;
  }
}

/* ================= 模式一：微信主推 ================= */
.mode-wechat {
  padding: 0 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .wx-main-btn {
    width: 90%;
    height: 90rpx;
    background: #07c160;
    border-radius: 50rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12rpx 24rpx rgba(7, 193, 96, 0.25);
    
    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }

    .wx-icon {
      width: 60rpx;
      height: 60rpx;
      margin-right: 16rpx;
    }
    text {
      color: #fff;
      font-size: 30rpx;
    }
  }

  .text-nav-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 60rpx;
    
    .nav-text {
      font-size: 28rpx;
      color: #555;
      padding: 20rpx;
      
      &:active {
        color: #57ca9e;
      }
    }
    .divider-v {
      width: 2rpx;
      height: 24rpx;
      background: #ddd;
      margin: 0 20rpx;
    }
  }
}

/* ================= 模式二：表单模式 ================= */
.mode-form {
  padding: 0 60rpx;

  /* Tab 切换 */
  .tab-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 50rpx;

    .tab-item {
      margin-right: 60rpx;
      position: relative;
      padding-bottom: 16rpx;

      .tab-text {
        font-size: 32rpx;
        color: #999;
        transition: all 0.3s;
      }
      .tab-line {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 6rpx;
        background: #57ca9e;
        border-radius: 4rpx;
        transition: width 0.3s;
      }

      &.active {
        .tab-text {
          font-size: 38rpx;
          color: #333;
          font-weight: 600;
        }
        .tab-line {
          width: 40rpx;
        }
      }
    }
  }

  /* 表单输入 */
  .input-box {
    margin-bottom: 40rpx;
    :deep(.u-input) {
      background-color: transparent !important;
      padding: 20rpx 0 !important;
    }
  }

  .code-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    .flex-1 { flex: 1; }
    
    .get-code-text {
      font-size: 28rpx;
      color: #57ca9e;
      padding-left: 30rpx;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 2rpx;
        height: 30rpx;
        background: #eee;
      }
      &.disabled { color: #ccc; }
    }
  }

  .action-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: -10rpx;
    margin-bottom: 50rpx;

    .link-text {
      font-size: 26rpx;
      color: #666;
      padding: 10rpx 0;
    }
  }

  .login-btn {
    width: 100%;
    height: 90rpx;
    margin-top: 20rpx;
    font-size: 32rpx;
    box-shadow: 0 10rpx 20rpx rgba(87, 202, 158, 0.2);
  }

  /* 表单底部的微信切换 */
  .form-bottom-wx {
    margin-top: 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .divider {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      .line { flex: 1; height: 1px; background: #f0f0f0; }
      .divider-text { font-size: 24rpx; color: #ccc; margin: 0 30rpx; }
    }
    
    .mini-wx-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      padding: 10rpx;
      background: #f7fafa;
      &:active { opacity: 0.7; }
    }
  }
}

/* ================= 底部协议 ================= */
.footer-agreement {
  padding: 30rpx 40rpx;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  .agreement-text-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 10rpx;
    line-height: 1.6;

    .gray-text {
      font-size: 24rpx;
      color: #999;
    }
    .green-text {
      font-size: 24rpx;
      color: #57ca9e;
    }
  }
}
</style>