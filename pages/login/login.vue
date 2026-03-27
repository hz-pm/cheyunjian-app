<template>
  <view class="login-page">
    <!-- 顶部 Logo 区域 -->
    <view class="header">
      <view class="logo-wrap">
        <image src="/static/logo-login.png" class="logo-img" mode="aspectFit" />
        <text class="app-desc">专业新能源车辆检测平台</text>
      </view>
    </view>

    <!-- 登录方式 Tab -->
    <view class="tab-bar">
      <text
        class="tab-item"
        :class="{ active: activeTab === 0 }"
        @click="activeTab = 0"
      >手机验证码</text>
      <text
        class="tab-item"
        :class="{ active: activeTab === 1 }"
        @click="activeTab = 1"
      >账号密码</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-wrap">
      <!-- 手机号（两种方式均需要） -->
      <view class="input-item">
        <u-input
          v-model="phone"
          placeholder="请输入手机号"
          type="number"
          border="surround"
          clearable
          prefix-icon="phone"
        />
      </view>

      <!-- 验证码登录 -->
      <template v-if="activeTab === 0">
        <view class="input-item code-row">
          <view class="code-input">
            <u-input
              v-model="smsCode"
              placeholder="请输入验证码"
              type="number"
              border="surround"
              :maxlength="6"
            />
          </view>
          <u-button
            class="code-btn"
            :text="codeText"
            :disabled="!canGetCode"
            size="small"
            type="primary"
            :color="canGetCode ? '#57ca9e' : '#cccccc'"
            @click="getSmsCode"
          />
        </view>
      </template>

      <!-- 密码登录 -->
      <template v-if="activeTab === 1">
        <view class="input-item">
          <u-input
            v-model="password"
            placeholder="请输入密码"
            type="password"
            border="surround"
            clearable
          />
        </view>
        <view class="forget-row">
          <text class="link-text" @click="goPage('/pages/reg/updatePassword')">忘记密码</text>
          <text class="link-text" @click="goPage('/pages/reg/register')">注册账号</text>
        </view>
      </template>

      <!-- 协议勾选 -->
      <view class="agreement-row">
        <u-checkbox v-model:checked="agreed" shape="circle" active-color="#57ca9e" @change="onAgreementChange" />
        <text class="agreement-text">我已阅读并同意</text>
        <text class="link-text" @click="openAgreement(1)">《用户服务协议》</text>
        <text class="link-text" @click="openAgreement(2)">《隐私政策》</text>
      </view>

      <!-- 登录按钮 -->
      <u-button
        class="login-btn"
        text="登录"
        type="primary"
        color="#57ca9e"
        :loading="loading"
        @click="handleLogin"
      />

      <!-- 微信一键登录 -->
      <view class="wx-login-wrap">
        <view class="divider-row">
          <view class="divider-line" />
          <text class="divider-text">微信一键登录</text>
          <view class="divider-line" />
        </view>
        <view class="wx-icon-wrap" @click="handleWxLogin">
          <text class="wx-icon">🟢</text>
          <text class="wx-text">微信登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { login, loginByCode, miniProgramLogin, sendSms, getUserInfo } from '@/utils/api'

const userStore = useUserStore()

const activeTab = ref(0) // 0: 验证码, 1: 密码
const phone = ref('18888888888')
const smsCode = ref('')
const password = ref('123456')
const agreed = ref(false)
const loading = ref(false)

// 验证码倒计时
const codeText = ref('获取验证码')
const canGetCode = ref(true)
let countdownTimer = null

function onAgreementChange(val) {
  agreed.value = val
}

function goPage(url) {
  uni.navigateTo({ url })
}

function openAgreement(type) {
  uni.showToast({ title: type === 1 ? '用户服务协议' : '隐私政策', icon: 'none' })
}

async function getSmsCode() {
  if (!phone.value) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    uni.showToast({ title: '手机号格式不正确', icon: 'none' })
    return
  }
  try {
    await sendSms({ phone: phone.value, type: 'login' })
    uni.showToast({ title: '验证码已发送', icon: 'none' })
    startCountdown()
  } catch (e) {
    // 错误已在 request.js 处理
  }
}

function startCountdown() {
  canGetCode.value = false
  let seconds = 60
  codeText.value = `${seconds}s后重新获取`
  countdownTimer = setInterval(() => {
    seconds--
    if (seconds <= 0) {
      clearInterval(countdownTimer)
      canGetCode.value = true
      codeText.value = '重新获取'
    } else {
      codeText.value = `${seconds}s后重新获取`
    }
  }, 1000)
}

async function handleLogin() {
  if (!phone.value) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }
  if (activeTab.value === 0 && !smsCode.value) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return
  }
  if (activeTab.value === 1 && !password.value) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并同意协议', icon: 'none' })
    return
  }

  loading.value = true
  try {
    let res
    if (activeTab.value === 0) {
      res = await loginByCode({ phone: phone.value, code: smsCode.value })
    } else {
      res = await login({ username: phone.value, password: password.value })
    }

    if (res.code === 200) {
      userStore.setToken(res.token)
      await fetchUserInfo()
    } else {
      uni.showToast({ title: res.msg || '登录失败', icon: 'none' })
    }
  } catch (e) {
    // 错误已在 request.js 处理
  } finally {
    loading.value = false
  }
}

async function handleWxLogin() {
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并同意协议', icon: 'none' })
    return
  }
  uni.showLoading({ title: '登录中...', mask: true })
  try {
    const [err, loginRes] = await uni.login({ provider: 'weixin' })
    if (err || !loginRes) {
      uni.showToast({ title: '微信授权失败', icon: 'none' })
      return
    }
    const res = await miniProgramLogin({ code: loginRes.code })
    if (res.code === 200) {
      userStore.setToken(res.token)
      if (res.data) {
        userStore.setUserInfo(res.data)
      } else {
        await fetchUserInfo()
      }
      uni.showToast({ title: '登录成功', icon: 'none' })
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/main/index' })
      }, 800)
    } else {
      uni.showToast({ title: res.msg || '登录失败', icon: 'none' })
    }
  } catch (e) {
    console.error(e)
  } finally {
    uni.hideLoading()
  }
}

async function fetchUserInfo() {
  try {
    const res = await getUserInfo()
    if (res.code === 200) {
      userStore.setUserInfo(res.data)
      uni.showToast({ title: '登录成功', icon: 'none' })
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/main/index' })
      }, 800)
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #f7fafa;
}

.header {
  background: linear-gradient(160deg, #57ca9e, #30ad55);
  padding: 80rpx 40rpx 60rpx;
  .logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo-img {
      width: 280rpx;
      height: 80rpx;
    }
    .app-desc {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.85);
      margin-top: 16rpx;
    }
  }
}

.tab-bar {
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 0 40rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .tab-item {
    flex: 1;
    text-align: center;
    padding: 30rpx 0;
    font-size: 30rpx;
    color: #888;
    border-bottom: 4rpx solid transparent;
    &.active {
      color: #57ca9e;
      border-bottom-color: #57ca9e;
      font-weight: bold;
    }
  }
}

.form-wrap {
  padding: 40rpx;

  .input-item {
    margin-bottom: 30rpx;
  }

  .code-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20rpx;
    .code-input {
      flex: 1;
    }
    .code-btn {
      width: 220rpx;
      flex-shrink: 0;
      font-size: 24rpx;
    }
  }

  .forget-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30rpx;
  }

  .link-text {
    color: #57ca9e;
    font-size: 26rpx;
  }

  .agreement-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30rpx;
    gap: 4rpx;

    .agreement-text {
      font-size: 26rpx;
      color: #666;
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 10rpx;
  }
}

.wx-login-wrap {
  margin-top: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .divider-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20rpx;
    .divider-line {
      flex: 1;
      height: 1rpx;
      background: #ddd;
    }
    .divider-text {
      font-size: 26rpx;
      color: #999;
      white-space: nowrap;
    }
  }

  .wx-icon-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rpx;
    .wx-icon {
      font-size: 80rpx;
    }
    .wx-text {
      font-size: 26rpx;
      color: #57ca9e;
      margin-top: 10rpx;
    }
  }
}
</style>
