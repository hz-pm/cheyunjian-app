<template>
  <view class="page">
    <!-- 顶部英雄区 -->
    <view class="top-bg-wrap">
      <image src="/static/top-bg.png" class="top-bg-img" mode="scaleToFill" />
      <view class="top-content">
        <view class="top-text">
          <text class="top-title">车云检</text>
          <text class="top-desc">快速查询车辆五项核心数据报告，提供专业准确的车辆使用养护建议及风险提示。</text>
        </view>
        <image src="/static/top-icon1.png" class="top-icon" mode="aspectFit" />
      </view>
    </view>

    <!-- 表单卡片 -->
    <view class="form-card">
      <!-- VIN 图片识别 -->
      <view class="section-label">上传行驶证 / VIN码图片（可自动识别）</view>
      <view class="upload-wrap" @click="chooseVinImage">
        <image src="/static/vin-bg.png" class="vin-bg-img" mode="scaleToFill" />
        <view v-if="!vinImgPath" class="upload-overlay">
          <u-icon name="camera" size="60" color="#30ad55" />
          <text class="upload-text">上传您的行驶证照片</text>
        </view>
        <image v-if="vinImgPath" :src="vinImgPath" class="preview-img" mode="aspectFill" />
      </view>
      <text v-if="ocrLoading" class="ocr-tip">识别中...</text>

      <!-- VIN 码输入 -->
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

      <!-- 底部辅助行 -->
      <view class="hint-row">
        <text class="hint-text">共检测 4 个模块</text>
        <view class="divider-v" />
        <text class="hint-link" @click="showVinGuide">如何找到车架号</text>
      </view>
    </view>

    <!-- VIP 说明 -->
    <view class="vip-tip" v-if="!userStore.isVip">
      <text class="vip-tip-text">💡 开通VIP享超值优惠，</text>
      <text class="vip-link" @click="goVip">立即开通 ></text>
    </view>

    <!-- 检测按钮 -->
    <view class="btn-wrap">
      <u-button
        text="立即检测"
        type="primary"
        color="#30ad55"
        :loading="loading"
        @click="handleSubmit"
      />
    </view>

    <!-- 免责声明 -->
    <view class="disclaimer">
      <text class="disclaimer-text">免责声明：本报告提供的评估结果仅基于用户自主填写的车辆信息，结合新能源汽车充电及工况大数据模型进行测算，结果仅供参考。评估方不对任何用户基于本报告内容所做的决策或行动承担任何直接或间接的责任。</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { payCloudCheck, checkCarNew } from '@/utils/api'

const BASE_URL = 'https://api.xinnengyuanyunjian.top'

const userStore = useUserStore()
const vinCode = ref('')
const vinError = ref('')
const vinImgPath = ref('')
const loading = ref(false)
const ocrLoading = ref(false)

function onVinInput(e) {
  vinCode.value = (e.detail.value || '').toUpperCase()
  vinError.value = ''
}

function validateVin() {
  if (!vinCode.value) { vinError.value = '请输入VIN码'; return false }
  if (vinCode.value.length !== 17) { vinError.value = 'VIN码必须为17位'; return false }
  return true
}

function goVip() {
  uni.navigateTo({ url: '/pages/vip/vipCard' })
}

function showVinGuide() {
  uni.showModal({
    title: '如何找到车架号',
    content: '• 车辆前挡风玻璃下方（驾驶位一侧）\n• 驾驶室车门B柱标签\n• 行驶证"车辆识别代号"栏\n• 发动机舱内标签',
    showCancel: false
  })
}

function chooseVinImage() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => { uploadVinImage(res.tempFilePaths[0]) }
  })
}

function uploadVinImage(filePath) {
  vinImgPath.value = filePath
  ocrLoading.value = true
  const token = uni.getStorageSync('token') || ''
  uni.uploadFile({
    url: BASE_URL + '/index/user/vehicleVinOCR',
    header: { Authorization: token },
    filePath,
    name: 'file',
    success: (res) => {
      try {
        const data = JSON.parse(res.data)
        if (data.code === 200 && data.data) {
          if (data.data.url) vinImgPath.value = data.data.url
          if (data.data.vin) {
            vinCode.value = data.data.vin.toUpperCase()
            vinError.value = ''
            uni.showToast({ title: 'VIN码识别成功', icon: 'success' })
          } else {
            uni.showToast({ title: '未识别到VIN码，请手动输入', icon: 'none' })
          }
        } else {
          uni.showToast({ title: data.msg || '识别失败，请手动输入', icon: 'none' })
        }
      } catch (e) {
        uni.showToast({ title: '识别失败，请手动输入', icon: 'none' })
      }
    },
    fail: () => { uni.showToast({ title: '上传失败，请手动输入', icon: 'none' }) },
    complete: () => { ocrLoading.value = false }
  })
}

async function handleSubmit() {
  if (!userStore.checkLogin()) return
  if (!validateVin()) return

  loading.value = true
  try {
    const payRes = await payCloudCheck({ payType: 3, vinCode: vinCode.value })
    if (payRes.code !== 200) {
      uni.showToast({ title: payRes.msg || '下单失败', icon: 'none' })
      return
    }

    const { outTradeNo, timeStamp, nonceStr, paySign, signType } = payRes.data
    const packageVal = payRes.data['package']

    await uni.requestPayment({ provider: 'wxpay', timeStamp, nonceStr, package: packageVal, signType, paySign })

    uni.showLoading({ title: '检测中...', mask: true })
    const checkRes = await checkCarNew({ vinCode: vinCode.value, outTradeNo })
    uni.hideLoading()

    if (checkRes.code === 200) {
      uni.navigateTo({ url: `/pages/check/result?vinCode=${vinCode.value}&outTradeNo=${outTradeNo}` })
    } else {
      uni.showToast({ title: checkRes.msg || '检测失败', icon: 'none' })
    }
  } catch (e) {
    if (e?.errMsg?.includes('cancel')) {
      uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
    } else {
      console.error(e)
      uni.navigateTo({ url: '/pages/pay/payResult?status=fail' })
    }
  } finally {
    loading.value = false
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f7fafa;
  padding-bottom: 80rpx;
}

/* 顶部背景 */
.top-bg-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;

  .top-bg-img {
    width: 100%;
    height: 400rpx;
    display: block;
  }

  .top-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 30rpx 0 40rpx;

    .top-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      .top-title {
        font-size: 44rpx;
        font-weight: bold;
        color: #fff;
      }
      .top-desc {
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.85);
        line-height: 1.5;
      }
    }

    .top-icon {
      width: 200rpx;
      height: 200rpx;
      flex-shrink: 0;
    }
  }
}

/* 表单卡片 */
.form-card {
  width: 90%;
  margin: -30rpx auto 0;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.section-label {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

/* 图片上传区 */
.upload-wrap {
  width: 100%;
  height: 220rpx;
  border-radius: 16rpx;
  overflow: hidden;
  position: relative;
  margin-bottom: 10rpx;

  .vin-bg-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .upload-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14rpx;
    .upload-text {
      font-size: 28rpx;
      font-weight: bold;
      color: #30ad55;
    }
  }

  .preview-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.ocr-tip {
  font-size: 24rpx;
  color: #30ad55;
  display: block;
  margin-bottom: 10rpx;
}

/* VIN 输入框行 */
.vin-input-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f7fafa;
  border-radius: 14rpx;
  padding: 0 20rpx;
  height: 90rpx;
  margin-top: 20rpx;

  .search-icon {
    width: 40rpx;
    height: 40rpx;
    flex-shrink: 0;
    margin-right: 16rpx;
  }

  .vin-input {
    flex: 1;
    font-size: 30rpx;
    color: #111;
    height: 100%;
  }

  .clear-btn {
    font-size: 28rpx;
    color: #ccc;
    padding: 10rpx;
    flex-shrink: 0;
  }
}

.error-text {
  font-size: 24rpx;
  color: #fa3534;
  margin-top: 10rpx;
  display: block;
}

/* 底部辅助行 */
.hint-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid #f0f0f0;

  .hint-text {
    flex: 1;
    font-size: 26rpx;
    color: #ff8d1a;
    font-weight: bold;
    text-align: center;
  }

  .divider-v {
    width: 1rpx;
    height: 36rpx;
    background: #ddd;
  }

  .hint-link {
    flex: 1;
    font-size: 26rpx;
    color: #30ad55;
    text-align: center;
  }
}

/* VIP 提示 */
.vip-tip {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16rpx 40rpx;
  .vip-tip-text { font-size: 26rpx; color: #888; }
  .vip-link { font-size: 26rpx; color: #30ad55; }
}

/* 按钮 */
.btn-wrap { margin: 16rpx 5%; }

/* 免责声明 */
.disclaimer {
  margin: 24rpx 5% 0;
  .disclaimer-text {
    font-size: 24rpx;
    color: #aaa;
    line-height: 1.7;
    display: block;
  }
}
</style>
