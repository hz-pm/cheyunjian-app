<template>
  <view class="content">
    <view class="top-bg">
      <image src="/static/top-bg.png" style="width: 100%;height: 400rpx;position: absolute;"></image>
      <view style="width: 90%;display: flex;flex-direction: row;align-items: center;
          margin-top: 20rpx;justify-content: space-between;">
        <view style="width: 72%; display: flex;flex-direction: column;color: #FFF;z-index: 20;">
          <text style="font-size: 35rpx;margin-top: 15rpx;font-weight: bold;">买二手车，查过出险才放心</text>
          <text style="font-size: 32rpx;opacity: 0.8;margin-top: 15rpx;">出险记录查询专业平台，数据覆盖最全，人工解读报告、维权指导。</text>
        </view>
        <image src="/static/top-icon2.png" style="width: 220rpx;height: 220rpx;"></image>
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


      <!-- VIN + 车主姓名输入卡片（OCR自动填入） -->
      <view class="card" style="margin-top: 30rpx;">
        <view style="width: 93%;display: flex;flex-direction: row;align-items: center;padding-top: 20rpx;padding-bottom: 20rpx;">
          <image src="/static/icon-search.png" style="width: 45rpx;height: 45rpx;margin-left: 20rpx;margin-right: 20rpx;"></image>
          <input placeholder="VIN车架号" fontSize="32rpx" color="#111" border="none" v-model="vinCode" disabled="true"></input>
        </view>
        <view style="height: 1rpx;width: 100%;background-color: #DDD;"></view>
        <view style="width: 93%;display: flex;flex-direction: row;align-items: center;padding-top: 20rpx;padding-bottom: 20rpx;">
          <image src="/static/icon-search.png" style="width: 45rpx;height: 45rpx;margin-left: 20rpx;margin-right: 20rpx;"></image>
          <input placeholder="车辆所有人" fontSize="32rpx" color="#111" border="none" v-model="owner" disabled="true"></input>
        </view>
      </view>

      <!-- 协议勾选 -->
      <checkbox-group style="display: flex;flex-direction: row;font-size: 26rpx;margin-top: 30rpx;width: 90%;" @change="checkboxChange">
        <checkbox value="cb1" :checked="checked" style="margin-top: 10rpx;" color="#30ad55"></checkbox>
        <view style="color: #666;">
          <text @click="checkedCb">我已阅读并同意</text>
          <text style="color: #30ad55;" @click="goAgreement">《个人信息授权书》</text>
          <text>，并且我确认是车主本人或经过车主授权使用该服务</text>
        </view>
      </checkbox-group>

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

    <!-- 拍照规范弹窗 -->
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
        <image :src="BASE_URL_IMG+'nimengcha_example_v3.jpg'" mode="widthFix" style="width: 100%;"></image>
      </scroll-view>
    </view>

    <!-- 手写签名弹窗 -->
    <view v-if="showSignPop" class="popup-overlay" @touchmove.stop.prevent @click.stop></view>
    <view v-if="showSignPop" class="popup-sheet sign-popup">
      <view class="popup-header">
        <text class="popup-title">车主手写签名</text>
        <text class="popup-close" @click="closeSignPop">✕</text>
      </view>
      <view class="sign-popup-body">
        <text class="sign-tip">请在下方区域手写本人签名</text>
        <view class="sign-canvas-wrap">
          <canvas
            canvas-id="sig-canvas"
            class="sign-canvas"
            @touchstart="onSignStart"
            @touchmove.stop.prevent="onSignMove"
            @touchend="onSignEnd"
          />
        </view>
        <view class="sign-actions">
          <view class="sign-btn-clear" @click="clearSign">
            <text class="sign-btn-clear-text">清除重写</text>
          </view>
          <view class="sign-btn-confirm" :class="{ 'sign-btn-loading': signConfirmLoading }" @click="confirmSignAndSubmit">
            <text class="sign-btn-confirm-text">{{ signConfirmLoading ? '提交中...' : '确认并提交' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, nextTick, onMounted, getCurrentInstance } from 'vue'
import { useUserStore } from '@/store/user'
import { createCheckTask, queryTaskPrice, VEHICLE_LICENSE_OCR_PATH, UPLOAD_IMAGE_PATH } from '@/utils/api'
import { requestWechatPay } from '@/composables/useWechatPay'
import { requestSubscribeMsg } from '@/composables/useSubscribeMsg'
import { BASE_URL, BASE_URL_IMG } from '@/utils/request'
import { VIP_ENABLED } from '@/utils/config'

const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const pic = ref('')
const vinCode = ref('')
const owner = ref('')
const checked = ref(false)
const loading = ref(false)
const priceInfo = ref(null)
const showGuidePop = ref(false)
const showDemoPop = ref(false)
const ocrLoading = ref(false)

// ── 签名弹窗 ──────────────────────────────────────────
const showSignPop = ref(false)
const signConfirmLoading = ref(false)
const signatureUrl = ref('')
let sigCtx = null
let sigDrawing = false
let sigLastX = 0
let sigLastY = 0

function openSignPop() {
  showSignPop.value = true
  sigCtx = null
  nextTick(() => {
    sigCtx = uni.createCanvasContext('sig-canvas', proxy)
    sigCtx.setStrokeStyle('#1a1a1a')
    sigCtx.setLineWidth(4)
    sigCtx.setLineCap('round')
    sigCtx.setLineJoin('round')
  })
}

function closeSignPop() {
  showSignPop.value = false
  sigCtx = null
  sigDrawing = false
}

function onSignStart(e) {
  if (!sigCtx) return
  sigDrawing = true
  sigLastX = e.touches[0].x
  sigLastY = e.touches[0].y
}

function onSignMove(e) {
  if (!sigDrawing || !sigCtx) return
  const x = e.touches[0].x
  const y = e.touches[0].y
  // draw(true) 每次会清空指令缓冲区，必须在每段开头重新 beginPath+moveTo
  // 逐段绘制并用保留模式叠加，避免从不确定起点连出射线
  sigCtx.beginPath()
  sigCtx.moveTo(sigLastX, sigLastY)
  sigCtx.lineTo(x, y)
  sigCtx.stroke()
  sigCtx.draw(true)
  sigLastX = x
  sigLastY = y
}

function onSignEnd() {
  sigDrawing = false
}

function clearSign() {
  if (!sigCtx) return
  sigCtx.clearRect(0, 0, 750, 300)
  sigCtx.draw()
}

async function confirmSignAndSubmit() {
  if (signConfirmLoading.value) return
  signConfirmLoading.value = true
  uni.showLoading({ title: '上传中...', mask: true })
  try {
    const url = await new Promise((resolve, reject) => {
      uni.canvasToTempFilePath({
        canvasId: 'sig-canvas',
        fileType: 'png',
        success: (res) => {
          const token = uni.getStorageSync('token') || ''
          uni.uploadFile({
            url: BASE_URL + UPLOAD_IMAGE_PATH,
            header: { Authorization: 'Bearer ' + token },
            filePath: res.tempFilePath,
            name: 'file',
            success: (r) => {
              try {
                const data = JSON.parse(r.data)
                if (data.code === 200 && data.data?.url) {
                  resolve(data.data.url)
                } else {
                  reject(new Error(data.msg || '上传失败'))
                }
              } catch {
                reject(new Error('上传失败，请重试'))
              }
            },
            fail: () => reject(new Error('上传失败，请重试'))
          })
        },
        fail: () => reject(new Error('获取签名失败，请重试'))
      }, proxy)
    })

    signatureUrl.value = url
    uni.hideLoading()
    showSignPop.value = false
    sigCtx = null

    await doSubmit()
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: e.message || '签名上传失败', icon: 'none' })
  } finally {
    signConfirmLoading.value = false
  }
}

// ── 表单校验 → 弹签名框 ───────────────────────────────
async function clickSubmit() {
  if (!userStore.checkLogin()) return
  if (priceInfo.value?.maintenance) { showMaintenanceTip(); return }
  if (!pic.value) {
    uni.showToast({ title: '请上传行驶证图片', icon: 'none' }); return
  }
  if (!vinCode.value) {
    uni.showToast({ title: '请确认行驶证信息', icon: 'none' }); return
  }
  if (!owner.value) {
    uni.showToast({ title: '请确认行驶证信息', icon: 'none' }); return
  }
  if (!checked.value) {
    uni.showToast({ title: '请先阅读并同意协议', icon: 'none' }); return
  }
  openSignPop()
}

// ── 实际提交（签名确认后调用）─────────────────────────
async function doSubmit(forceNew = false) {
  loading.value = true
  try {
    const taskRes = await createCheckTask({
      type: 2,
      vinCode: vinCode.value,
      vinImg: pic.value,
      personName: owner.value,
      spicUrl: signatureUrl.value,
      forceNew
    })
    const { taskId, isNew, status, expired, daysAgo } = taskRes.data

    if (!isNew) {
      if (status === 1) {
        uni.showModal({
          title: '提示',
          content: '该车辆事故记录正在查询中，稍后可查看报告',
          showCancel: false,
          confirmText: '我知道了'
        })
        return
      }
      const content = expired
        ? `您曾于${daysAgo}天前查询过该车辆事故记录，建议重新查询获取最新数据`
        : '30天内已查询过该车辆事故记录，可直接查看已有报告，或重新查询获取最新数据'
      uni.showModal({
        title: '提示',
        content,
        showCancel: true,
        cancelText: '查看报告',
        confirmText: '继续查询',
        success: (res) => {
          if (res.confirm) {
            doSubmit(true)
          } else {
            uni.navigateTo({ url: `/pages/accident/report?taskId=${taskId}` })
          }
        }
      })
      return
    }

    const payRes = await requestWechatPay({ payType: 4, taskId })
    const { timeStamp, nonceStr, paySign, signType } = payRes.data
    const packageVal = payRes.data['package']

    // 支付前请求订阅消息授权（用户拒绝不影响支付）
    await requestSubscribeMsg()

    // 仅"用户取消"立即返回，其他回调异常静默忽略（后端通过支付回调自动执行检测）
    try {
      await uni.requestPayment({ provider: 'wxpay', timeStamp, nonceStr, package: packageVal, signType, paySign })
    } catch (payErr) {
      if (payErr?.errMsg?.includes('cancel')) {
        uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
        return
      }
    }

    // 支付完成后后端自动提交检测，直接跳转报告页等待结果
    uni.navigateTo({ url: `/pages/accident/report?taskId=${taskId}` })
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

// ── 其他 ──────────────────────────────────────────────
function formatPrice(val) {
  return val != null ? Number(val).toFixed(2) : '0.00'
}

function goLogin() {
  uni.navigateTo({ url: '/pages/login/login' })
}

function goVip() {
  uni.navigateTo({ url: '/pages/vip/vipCard' })
}

function goAgreement() {
  uni.navigateTo({ url: '/pages/mine/authFile' })
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
    const res = await queryTaskPrice({ type: 2 })
    priceInfo.value = res.data
    if (priceInfo.value?.maintenance) showMaintenanceTip()
  } catch (e) {}
})

function checkboxChange(n) {
  checked.value = n.detail.value.length > 0
}

function checkedCb() {
  checked.value = !checked.value
}

function openGuidePop() {
  showGuidePop.value = true
}

function goQuestion() {
  uni.navigateTo({ url: '/pages/mine/question?qType=3' })
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
          owner.value = data.data.owner || ''
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

// 签名弹窗专属样式
.sign-popup {
  max-height: 85vh;
}

.sign-popup-body {
  padding: 30rpx 30rpx 50rpx;
  display: flex;
  flex-direction: column;
}

.sign-tip {
  font-size: 26rpx;
  color: #888;
  margin-bottom: 20rpx;
}

.sign-canvas-wrap {
  background: #fafafa;
  border-radius: 16rpx;
  border: 1rpx solid #e0e0e0;
  overflow: hidden;
}

.sign-canvas {
  width: 100%;
  height: 300rpx;
  display: block;
}

.sign-actions {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
  margin-top: 30rpx;
}

.sign-btn-clear {
  flex: 1;
  padding: 26rpx 0;
  border: 1rpx solid #ccc;
  border-radius: 50rpx;
  text-align: center;
  .sign-btn-clear-text { font-size: 28rpx; color: #666; }
}

.sign-btn-confirm {
  flex: 2;
  padding: 26rpx 0;
  background: linear-gradient(135deg, #30ad55, #47ad13);
  border-radius: 50rpx;
  text-align: center;
  &.sign-btn-loading { opacity: 0.7; }
  .sign-btn-confirm-text { font-size: 28rpx; color: #fff; font-weight: bold; }
}
</style>
