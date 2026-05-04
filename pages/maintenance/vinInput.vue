<template>
  <view class="content">
    <view class="top-bg">
      <image src="/static/top-bg.png" style="width: 100%;height: 400rpx;position: absolute;"></image>
      <view style="width: 90%;display: flex;flex-direction: row;align-items: center;
          margin-top: 20rpx;justify-content: space-between;">
        <view style="width: 72%; display: flex;flex-direction: column;color: #FFF;z-index: 20;">
          <text style="font-size: 35rpx;margin-top: 15rpx;font-weight: bold;">让小白像专家一样购买二手车</text>
          <text style="font-size: 30rpx;opacity: 0.8;margin-top: 15rpx;">人工解读报告、避坑指南与维权指导，4S数据全网覆盖最全。</text>
        </view>
        <image src="/static/top-icon3.png" style="width: 220rpx;height: 220rpx;"></image>
      </view>

      <!-- 行驶证上传卡片 -->
      <view class="card" @click="openImagePage" style="height: 350rpx;">
        <image src="/static/vin-bg.png" style="width: 100%;height: 80%;"></image>
        <view style="display: flex;flex-direction: column;align-items: center;position: absolute;top: 33%;left: 32%;">
          <uni-icons type="camera" color="#30ad55" size="80rpx"></uni-icons>
          <text style="font-size: 26rpx;font-weight: bold;color: #30ad55;">上传您的行驶证照片</text>
        </view>
        <image style="width: 96%;height: 96%;position: absolute;left: 2%;top: 2%;border-radius: 20rpx;" :src="pic"></image>
      </view>
	  <text v-if="ocrLoading" class="ocr-tip">识别中...</text>

      <!-- VIN 输入卡片（OCR自动填入） -->
      <view class="card" style="margin-top: 30rpx;">
        <view style="width: 93%;display: flex;flex-direction: row;align-items: center;padding-top: 20rpx;padding-bottom: 20rpx;">
          <image src="/static/icon-search.png" style="width: 45rpx;height: 45rpx;margin-left: 20rpx;margin-right: 20rpx;"></image>
          <input placeholder="VIN车架号" fontSize="32rpx" color="#111" border="none" v-model="vinCode" disabled="true"></input>
        </view>
      </view>

      <!-- 价格展示 -->
      <view class="price-bar" v-if="priceInfo">
        <view class="price-bar-left">
          <text class="price-bar-label">本次费用</text>
          <view class="price-bar-amount">
            <text v-if="priceInfo.discountAvailable" class="price-bar-origin">¥{{ formatPrice(priceInfo.normalPrice) }}</text>
            <text class="price-bar-final" :class="{ 'price-vip': priceInfo.discountAvailable }">
              ¥{{ formatPrice(priceInfo.discountAvailable ? priceInfo.discountedPrice : priceInfo.normalPrice) }}
            </text>
          </view>
        </view>
        <view v-if="priceInfo.discountAvailable" class="price-badge badge-deducted">
          <text class="badge-text">已优惠¥{{ formatPrice(priceInfo.savedAmount) }}</text>
        </view>
        <view v-else-if="VIP_ENABLED && priceInfo.bestVipPrice" class="price-badge badge-promo" @click="goVip">
          <text class="badge-text">VIP可低至¥{{ formatPrice(priceInfo.bestVipPrice) }} ›</text>
        </view>
        <view v-else-if="VIP_ENABLED && !userStore.isLoggedIn" class="price-badge badge-login" @click="goLogin">
          <text class="badge-text">登录享VIP优惠 ›</text>
        </view>
      </view>

      <button class="btn" :loading="loading" @click="clickSubmit">立即检测</button>

      <text class="btn-2" style="width: 90%;" @click="openDemoPop">查看检测范例</text>

      <view style="width: 90%;display: flex;flex-direction: row;justify-content: space-between;color: #383838;font-size: 26rpx;margin-top: 30rpx;">
        <view style="color: #383838;display: flex;flex-direction: row;align-items: center;" @click="openGuidePop">
          <text style="margin-left: 5rpx;font-size: 28rpx;">行驶证拍照规范</text>
        </view>
        <view style="color: #383838;display: flex;flex-direction: row;align-items: center;" @click="goQuestion">
          <text style="margin-right: 5rpx;font-size: 28rpx;">常见问题</text>
        </view>
      </view>

      <view style="height: 150rpx;"></view>
    </view>

    <!-- 拍照规范弹窗：遮罩和面板平级，避免父级 catchtouchmove 阻断 scroll-view -->
    <view v-if="showGuidePop" class="popup-overlay" @touchmove.stop.prevent @click="showGuidePop = false"></view>
    <view v-if="showGuidePop" class="popup-sheet">
      <view class="popup-header">
        <text class="popup-title">行驶证拍照示例</text>
        <text class="popup-close" @click="showGuidePop = false">✕</text>
      </view>
      <scroll-view scroll-y class="popup-scroll">
        <view style="display: flex;flex-direction: column;align-items: center;padding: 0 30rpx 50rpx;">
          <image :src="BASE_URL_IMG+'img-xszpzsl.webp'" mode="widthFix" style="width: 95%;margin-top: 30rpx;"></image>
          <text style="font-size: 35rpx;color: #333;margin-top: 50rpx;align-self: flex-start;">拍摄规范</text>
          <text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">1、将行驶证主页取出平整放置，保证光线均匀，避免反光。</text>
          <text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">2、摄像头对准行驶证主页（有车架号），保证证件边缘完整。</text>
          <text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">3、关闭闪光灯，保证摄像头无遮挡，按下拍照键，避免抖动。</text>
          <text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">4、上传前检查照片文字是否清晰，如有偏移或模糊，请重新拍照。</text>
          <text style="font-size: 30rpx;color: #333;margin-top: 30rpx;">5、如因图片过大上传失败，可将图片裁剪后重新上传。</text>
        </view>
      </scroll-view>
    </view>

    <!-- 检测范例弹窗 -->
    <view v-if="showDemoPop" class="popup-overlay" @touchmove.stop.prevent @click="showDemoPop = false"></view>
    <view v-if="showDemoPop" class="popup-sheet">
      <view class="popup-header">
        <text class="popup-title">检测范例</text>
        <text class="popup-close" @click="showDemoPop = false">✕</text>
      </view>
      <scroll-view scroll-y class="popup-scroll">
        <image :src="BASE_URL_IMG+'nimengcha_example_wb.webp'" mode="widthFix" style="width: 100%;"></image>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { createCheckTask, executeCheckTask, queryTaskPrice, VEHICLE_LICENSE_OCR_PATH } from '@/utils/api'
import { requestWechatPay } from '@/composables/useWechatPay'
import { BASE_URL, BASE_URL_IMG } from '@/utils/request'
import { VIP_ENABLED } from '@/utils/config'

const userStore = useUserStore()
const pic = ref('')
const vinCode = ref('')
const loading = ref(false)
const priceInfo = ref(null)
const showGuidePop = ref(false)
const showDemoPop = ref(false)
const ocrLoading = ref(false)

function formatPrice(val) {
  return val != null ? Number(val).toFixed(2) : '0.00'
}

function goLogin() {
  uni.navigateTo({ url: '/pages/login/login' })
}

function goVip() {
  uni.navigateTo({ url: '/pages/vip/vipCard' })
}

function showMaintenanceTip() {
  uni.showModal({
    title: '服务维护中',
    content: '该服务正在维护升级中，暂时无法使用，请稍后再试',
    showCancel: false,
    confirmText: '知道了'
  })
}

onMounted(async () => {
  try {
    const res = await queryTaskPrice({ type: 3 })
    priceInfo.value = res.data
    if (priceInfo.value?.maintenance) showMaintenanceTip()
  } catch (e) {}
})

function openGuidePop() {
  showGuidePop.value = true
}

function goQuestion() {
  uni.navigateTo({ url: '/pages/mine/question?qType=4' })
}

function openDemoPop() {
  showDemoPop.value = true
}

function openImagePage() {
  if (!userStore.checkLogin()) return
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => { uploadImage(res.tempFilePaths[0]) }
  })
}

function uploadImage(filePath) {
  ocrLoading.value = true
  const token = uni.getStorageSync('token') || ''
  uni.uploadFile({
    url: BASE_URL + VEHICLE_LICENSE_OCR_PATH,
    header: { Authorization: 'Bearer ' + token },
    filePath,
    name: 'file',
    success: (res) => {
      try {
        const data = JSON.parse(res.data)
        if (data.code === 200 && data.data) {
          pic.value = data.data.url || filePath
          vinCode.value = (data.data.vin || '').toUpperCase()
          if (!data.data.vin) {
            uni.showToast({ title: '未识别到VIN码，请重拍', icon: 'none' })
          }
        } else {
          pic.value = filePath
          uni.showToast({ title: data.msg || '识别失败，请重拍', icon: 'none' })
        }
      } catch (e) {
        pic.value = filePath
        uni.showToast({ title: '识别失败，请重拍', icon: 'none' })
      }
    },
    fail: () => {
      pic.value = filePath
      uni.showToast({ title: '上传失败，请重试', icon: 'none' })
    },
    complete: () => { ocrLoading.value = false }
  })
}

async function clickSubmit() {
  if (!userStore.checkLogin()) return
  if (priceInfo.value?.maintenance) { showMaintenanceTip(); return }
  if (!pic.value) {
    uni.showToast({ title: '请上传行驶证图片', icon: 'none' }); return
  }
  if (!vinCode.value) {
    uni.showToast({ title: '请确认行驶证信息', icon: 'none' }); return
  }

  loading.value = true
  try {
    const taskRes = await createCheckTask({
      type: 3,
      vinCode: vinCode.value,
      vinImg: pic.value
    })
    const taskId = taskRes.data

    const payRes = await requestWechatPay({ payType: 5, taskId })
    const { timeStamp, nonceStr, paySign, signType } = payRes.data
    const packageVal = payRes.data['package']

    await uni.requestPayment({ provider: 'wxpay', timeStamp, nonceStr, package: packageVal, signType, paySign })

    uni.showLoading({ title: '提交中...', mask: true })
    await executeCheckTask(taskId)
    uni.hideLoading()

    uni.navigateTo({ url: `/pages/maintenance/report?taskId=${taskId}` })
  } catch (e) {
    uni.hideLoading()
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
.content {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-bg {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 90%;
  background-color: #FFF;
  border-radius: 20rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, .1);
  position: relative;
  margin-top: 20rpx;
}

.ocr-tip {
  font-size: 24rpx;
  color: #30ad55;
  display: block;
  margin-bottom: 10rpx;
  margin-top: 10rpx;
}

.btn {
  width: 90%;
  background: linear-gradient(135deg, #30ad55, #47ad13);
  margin-top: 45rpx;
  border-radius: 20rpx;
  margin-bottom: 35rpx;
  font-size: 30rpx;
  color: #FFF;
}

.btn-2 {
  color: #30ad55;
  border: 1rpx solid #30ad55;
  font-size: 30rpx;
  background: #FFF;
  border-radius: 20rpx;
  text-align: center;
  padding-top: 18rpx;
  padding-bottom: 18rpx;
}

.price-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
  width: 90%;
  padding: 24rpx 30rpx;
  background: #FFF;
  border-radius: 16rpx;
  box-shadow: 0 0 40rpx 0 rgba(0, 0, 0, .1);
  box-sizing: border-box;

  .price-bar-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;
  }

  .price-bar-label {
    font-size: 26rpx;
    color: #888;
  }

  .price-bar-amount {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 8rpx;
  }

  .price-bar-origin {
    font-size: 24rpx;
    color: #bbb;
    text-decoration: line-through;
  }

  .price-bar-final {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
  }

  .price-bar-final.price-vip {
    color: #30ad55;
  }
}

.price-badge {
  display: flex;
  align-items: center;
  border-radius: 30rpx;
  padding: 8rpx 20rpx;
  flex-shrink: 0;
  .badge-text { font-size: 24rpx; white-space: nowrap; }
}
.badge-deducted {
  background: linear-gradient(135deg, #ffb74d, #ff8c00);
  .badge-text { color: #fff; }
}
.badge-promo {
  background: #f0fdf8;
  border: 1rpx solid #30ad55;
  .badge-text { color: #30ad55; }
}
.badge-login {
  .badge-text { color: #30ad55; font-size: 26rpx; }
}

.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.popup-sheet {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: #FFF;
  border-radius: 15rpx 15rpx 0 0;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  z-index: 999;
}

.popup-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 30rpx 20rpx;
  flex-shrink: 0;
  border-bottom: 1rpx solid #F0F0F0;
}

.popup-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.popup-close {
  font-size: 36rpx;
  color: #999;
  padding: 10rpx;
}

.popup-scroll {
  flex: 1;
  height: 65vh;
}
</style>
