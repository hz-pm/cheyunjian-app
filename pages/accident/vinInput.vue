<template>
  <view class="page">
    <!-- 顶部英雄区 -->
    <view class="top-bg-wrap">
      <image src="/static/top-bg.png" class="top-bg-img" mode="scaleToFill" />
      <view class="top-content">
        <view class="top-text">
          <text class="top-title">事故查询</text>
          <text class="top-desc">查询车辆历史事故记录，全面了解车辆安全状况。</text>
        </view>
        <image src="/static/top-icon2.png" class="top-icon" mode="aspectFit" />
      </view>
    </view>

    <!-- 表单卡片 -->
    <view class="form-card">
      <!-- VIN 输入 -->
      <view class="section-label">车辆VIN码</view>
      <view class="vin-input-card">
        <image src="/static/icon-search.png" class="search-icon" mode="aspectFit" />
        <input
          class="vin-input"
          v-model="vinCode"
          placeholder="请输入17位VIN车架号"
          :placeholder-style="'color:#aaa;font-size:28rpx;'"
          :maxlength="17"
          @input="onVinInput"
        />
        <text v-if="vinCode" class="clear-btn" @click="vinCode = ''; vinError = ''">✕</text>
      </view>
      <text v-if="vinError" class="error-text">{{ vinError }}</text>

      <!-- 姓名（选填） -->
      <view class="section-label mt">车主姓名（选填）</view>
      <view class="vin-input-card">
        <input
          class="vin-input"
          v-model="personName"
          placeholder="请输入车主姓名（可提高查询准确度）"
          :placeholder-style="'color:#aaa;font-size:28rpx;'"
        />
      </view>

      <!-- VIN 图片（选填） -->
      <view class="section-label mt">VIN码图片（选填）</view>
      <view class="upload-wrap" @click="chooseImage">
        <image v-if="vinImgPath" :src="vinImgPath" class="preview-img" mode="aspectFill" />
        <view v-else class="upload-placeholder">
          <text class="upload-icon">📷</text>
          <text class="upload-text">上传VIN码图片</text>
        </view>
      </view>
    </view>

    <view class="btn-wrap">
      <u-button text="开始查询" type="primary" color="#30ad55" :loading="loading" @click="handleSubmit" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { payCloudCheck, carAccidentsReport } from '@/utils/api'

const userStore = useUserStore()
const vinCode = ref('')
const vinError = ref('')
const personName = ref('')
const vinImgPath = ref('')
const loading = ref(false)

function onVinInput(e) {
  vinCode.value = (e.detail.value || '').toUpperCase()
  vinError.value = ''
}

function chooseImage() {
  uni.chooseImage({
    count: 1,
    success: (res) => { vinImgPath.value = res.tempFilePaths[0] }
  })
}

function validate() {
  if (!vinCode.value) { vinError.value = '请输入VIN码'; return false }
  if (vinCode.value.length !== 17) { vinError.value = 'VIN码必须为17位'; return false }
  return true
}

async function handleSubmit() {
  if (!userStore.checkLogin()) return
  if (!validate()) return

  loading.value = true
  try {
    const payRes = await payCloudCheck({ payType: 4, vinCode: vinCode.value })
    if (payRes.code !== 200) {
      uni.showToast({ title: payRes.msg || '下单失败', icon: 'none' })
      return
    }
    const { outTradeNo, timeStamp, nonceStr, paySign, signType } = payRes.data
    const packageVal = payRes.data['package']

    await uni.requestPayment({ provider: 'wxpay', timeStamp, nonceStr, package: packageVal, signType, paySign })

    uni.showLoading({ title: '查询中...', mask: true })
    const res = await carAccidentsReport({
      vinCode: vinCode.value, outTradeNo,
      vinImg: vinImgPath.value || '', personName: personName.value || ''
    })
    uni.hideLoading()

    if (res.code === 200) {
      uni.navigateTo({ url: `/pages/accident/report?checkId=${res.data.checkId}&payOrderId=${res.data.payOrderId}` })
    } else {
      uni.showToast({ title: res.msg || '查询失败', icon: 'none' })
    }
  } catch (e) {
    if (e?.errMsg?.includes('cancel')) {
      uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
    } else {
      uni.navigateTo({ url: '/pages/pay/payResult?status=fail' })
    }
  } finally {
    loading.value = false
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; padding-bottom: 80rpx; }

.top-bg-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
  .top-bg-img { width: 100%; height: 380rpx; display: block; }
  .top-content {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex; flex-direction: row; align-items: center;
    padding: 0 30rpx 0 40rpx;
    .top-text {
      flex: 1;
      display: flex; flex-direction: column; gap: 16rpx;
      .top-title { font-size: 44rpx; font-weight: bold; color: #fff; }
      .top-desc { font-size: 26rpx; color: rgba(255,255,255,0.85); line-height: 1.5; }
    }
    .top-icon { width: 200rpx; height: 200rpx; flex-shrink: 0; }
  }
}

.form-card {
  width: 90%; margin: -30rpx auto 0;
  background: #fff; border-radius: 20rpx; padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1); position: relative; z-index: 1;
}

.section-label {
  font-size: 28rpx; font-weight: bold; color: #333; margin-bottom: 16rpx; display: block;
  &.mt { margin-top: 30rpx; }
}

.vin-input-card {
  display: flex; flex-direction: row; align-items: center;
  background: #f7fafa; border-radius: 14rpx; padding: 0 20rpx; height: 90rpx;
  .search-icon { width: 40rpx; height: 40rpx; flex-shrink: 0; margin-right: 16rpx; }
  .vin-input { flex: 1; font-size: 30rpx; color: #111; height: 100%; }
  .clear-btn { font-size: 28rpx; color: #ccc; padding: 10rpx; flex-shrink: 0; }
}

.error-text { font-size: 24rpx; color: #fa3534; margin-top: 10rpx; display: block; }

.upload-wrap {
  width: 200rpx; height: 200rpx; border-radius: 16rpx;
  border: 2rpx dashed #ccc; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  .preview-img { width: 100%; height: 100%; }
  .upload-placeholder {
    display: flex; flex-direction: column; align-items: center; gap: 10rpx;
    .upload-icon { font-size: 48rpx; }
    .upload-text { font-size: 24rpx; color: #999; }
  }
}

.btn-wrap { margin: 30rpx 5% 0; }
</style>
