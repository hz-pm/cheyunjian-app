<template>
  <view class="page">
    <view class="header">
      <text class="header-title">绑定手机号</text>
      <text class="header-desc">绑定后可用手机号登录和接收通知</text>
    </view>

    <view class="form-card">
      <view class="form-item">
        <text class="label">手机号</text>
        <u-input v-model="phone" placeholder="请输入手机号" type="number" border="surround" clearable />
      </view>

      <view class="form-item">
        <text class="label">验证码</text>
        <view class="code-row">
          <view class="code-input">
            <u-input v-model="smsCode" placeholder="请输入验证码" type="number" border="surround" :maxlength="6" />
          </view>
          <view class="code-btn-wrap">
            <u-button
              :text="codeText"
              :disabled="!canGetCode"
              size="small"
              type="primary"
              :color="canGetCode ? '#57ca9e' : '#ccc'"
              @click="getSmsCode"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="btn-wrap">
      <u-button text="立即绑定" type="primary" color="#57ca9e" :loading="loading" @click="handleBind" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { sendSms, bindPhone } from '@/utils/api'
import { useUserStore } from '@/store/user'
import { getUserInfo } from '@/utils/api'

const userStore = useUserStore()
const phone = ref('')
const smsCode = ref('')
const loading = ref(false)
const codeText = ref('获取验证码')
const canGetCode = ref(true)
let countdownTimer = null

async function getSmsCode() {
  if (!phone.value || !/^1[3-9]\d{9}$/.test(phone.value)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  try {
    await sendSms({ phone: phone.value, type: 'bindPhone' })
    uni.showToast({ title: '验证码已发送', icon: 'none' })
    canGetCode.value = false
    let s = 60
    codeText.value = `${s}s后重新获取`
    countdownTimer = setInterval(() => {
      s--
      if (s <= 0) { clearInterval(countdownTimer); canGetCode.value = true; codeText.value = '重新获取' }
      else codeText.value = `${s}s后重新获取`
    }, 1000)
  } catch (e) { console.error(e) }
}

async function handleBind() {
  if (!phone.value || !/^1[3-9]\d{9}$/.test(phone.value)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' }); return
  }
  if (!smsCode.value) { uni.showToast({ title: '请输入验证码', icon: 'none' }); return }

  loading.value = true
  try {
    const res = await bindPhone({ phone: phone.value, code: smsCode.value })
    if (res.code === 200) {
      uni.showToast({ title: '手机号绑定成功', icon: 'success' })
      // 刷新本地用户信息
      const infoRes = await getUserInfo()
      if (infoRes.code === 200) {
        userStore.setUserInfo(infoRes.data)
      }
      setTimeout(() => uni.navigateBack(), 1000)
    } else {
      uni.showToast({ title: res.msg || '绑定失败', icon: 'none' })
    }
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; }

.header {
  background: linear-gradient(160deg, #57ca9e, #30ad55);
  padding: 60rpx 40rpx;
  display: flex; flex-direction: column; align-items: center;
  .header-title { font-size: 44rpx; font-weight: bold; color: #fff; }
  .header-desc { font-size: 26rpx; color: rgba(255,255,255,0.85); margin-top: 10rpx; }
}

.form-card {
  background: #fff; border-radius: 20rpx; margin: 30rpx;
  padding: 30rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.06);
  .form-item { margin-bottom: 30rpx;
    &:last-child { margin-bottom: 0; }
    .label { font-size: 28rpx; font-weight: bold; color: #333; display: block; margin-bottom: 14rpx; }
  }
  .code-row { display: flex; flex-direction: row; gap: 16rpx;
    .code-input { flex: 1; }
    .code-btn-wrap { width: 220rpx; flex-shrink: 0; } }
}

.btn-wrap { margin: 0 30rpx; }
</style>
