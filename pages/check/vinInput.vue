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

    <!-- 检测范例弹窗 -->
    <view v-if="showDemoPop" class="popup-overlay" @touchmove.stop.prevent @click="showDemoPop = false"></view>
    <view v-if="showDemoPop" class="popup-sheet">
      <view class="popup-header">
        <text class="popup-title">检测范例</text>
        <text class="popup-close" @click="showDemoPop = false">✕</text>
      </view>
      <scroll-view scroll-y class="popup-scroll">
        <image :src="BASE_URL_IMG+'cyj_example_check.webp'" mode="widthFix" style="width: 100%;"></image>
      </scroll-view>
    </view>

    <!-- 表单卡片 -->
    <view class="form-card">
	  <!-- 行驶证上传卡片 -->
	  <view class="card" @click="openImagePage" style="height: 350rpx;">
	    <image src="/static/vin-bg.png" style="width: 100%;height: 80%;"></image>
	    <view style="display: flex;flex-direction: column;align-items: center;position: absolute;top: 33%;left: 32%;">
	      <uni-icons type="camera" color="#30ad55" size="80rpx"></uni-icons>
	      <text style="font-size: 26rpx;font-weight: bold;color: #30ad55;">上传您的行驶证照片</text>
	    </view>
	    <image style="width: 96%;height: 96%;position: absolute;left: 2%;top: 2%;border-radius: 20rpx;" :src="vinImgPath"></image>
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
      <!-- 已开通VIP且有优惠：显示已抵扣金额 -->
      <view v-if="priceInfo.discountAvailable" class="price-badge badge-deducted">
        <text class="badge-text">已优惠¥{{ formatPrice(priceInfo.savedAmount) }}</text>
      </view>
      <!-- 非VIP且有最优VIP价：引导开通 -->
      <view v-else-if="VIP_ENABLED && priceInfo.bestVipPrice" class="price-badge badge-promo" @click="goVip">
        <text class="badge-text">VIP可低至¥{{ formatPrice(priceInfo.bestVipPrice) }} ›</text>
      </view>
      <!-- 未登录 -->
      <view v-else-if="VIP_ENABLED && !userStore.isLoggedIn" class="price-badge badge-login" @click="goLogin">
        <text class="badge-text">登录享VIP优惠 ›</text>
      </view>
    </view>

    <!-- 检测按钮 -->
    <view class="btn-wrap">
      <u-button
        text="立即检测"
        type="primary"
        color="#30ad55"
        :loading="loading"
        @click="() => handleSubmit()"
      />
    </view>

    <!-- 查看检测范例 -->
    <view class="demo-btn-wrap">
      <text class="btn-2" @click="openDemoPop">查看检测范例</text>
    </view>

    <!-- 免责声明 -->
    <view class="disclaimer">
      <text class="disclaimer-text">免责声明：本报告提供的评估结果仅基于用户自主填写的车辆信息，结合新能源汽车充电及工况大数据模型进行测算，结果仅供参考。评估方不对任何用户基于本报告内容所做的决策或行动承担任何直接或间接的责任。</text>
    </view>
	
	<!-- 新增：自定义炫酷 Loading 遮罩层 -->
	<view class="custom-loading-mask" v-if="isGenerating" @touchmove.stop.prevent>
	  <view class="loading-content">
		<!-- 动态光环旋转 -->
		<view class="radar-spinner">
		  <view class="spinner-inner"></view>
		</view>
		<text class="loading-title">正在生成车辆报告</text>
		<text class="loading-desc">{{ dynamicLoadingText }}</text>
	  </view>
	</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { createCheckTask, queryTaskPrice, VEHICLE_VIN_OCR_PATH } from '@/utils/api'
import { requestWechatPay } from '@/composables/useWechatPay'
import { requestSubscribeMsg } from '@/composables/useSubscribeMsg'
import { BASE_URL, BASE_URL_IMG } from '@/utils/request'
import { VIP_ENABLED } from '@/utils/config'

const userStore = useUserStore()
const vinCode = ref('')
const vinError = ref('')
const vinImgPath = ref('')
const loading = ref(false)
const ocrLoading = ref(false)
const priceInfo = ref(null)
const showDemoPop = ref(false)

// 新增响应式变量
const isGenerating = ref(false)
const dynamicLoadingText = ref('正在安全连接云端...')

function formatPrice(val) {
  return val != null ? Number(val).toFixed(2) : '0.00'
}

function goLogin() {
  uni.navigateTo({ url: '/pages/login/login' })
}
1767
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
    const res = await queryTaskPrice({ type: 1 })
    priceInfo.value = res.data
    if (priceInfo.value?.maintenance) showMaintenanceTip()
  } catch (e) {
    // 静默失败，不影响主流程
  }
})

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

function openDemoPop() {
  showDemoPop.value = true
}

function showVinGuide() {
  uni.showModal({
    title: '如何找到车架号',
    content: '• 车辆前挡风玻璃下方（驾驶位一侧）\n• 驾驶室车门B柱标签\n• 行驶证"车辆识别代号"栏\n• 发动机舱内标签',
    showCancel: false
  })
}

function openImagePage() {
  if (!userStore.checkLogin()) return
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
    url: BASE_URL + VEHICLE_VIN_OCR_PATH,
    header: { Authorization: 'Bearer ' + token },
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

async function handleSubmit(forceNew = false) {
  if (!userStore.checkLogin()) return
  if (priceInfo.value?.maintenance) { showMaintenanceTip(); return }
  if (!validateVin()) return

  loading.value = true
  try {
    // 1. 创建检测任务，获取 taskId
    const taskRes = await createCheckTask({
		type: 1,
		vinCode: vinCode.value,
		vinImg: vinImgPath.value,
		personName: '',
		forceNew
	})
    const { taskId, isNew, status, expired, daysAgo } = taskRes.data

    if (!isNew) {
      if (status === 1) {
        uni.showModal({
          title: '提示',
          content: '该车辆查询正在处理中，稍后可查看报告',
          showCancel: false,
          confirmText: '我知道了'
        })
        return
      }
      // 不论是否超30天，都给用户两个选择：查看旧报告 或 继续查询
      const content = expired
        ? `您曾于${daysAgo}天前查询过该车辆报告，建议重新查询获取最新数据`
        : '30天内已查询过该车辆，可直接查看已有报告，或重新查询获取最新数据'
      uni.showModal({
        title: '提示',
        content,
        showCancel: true,
        cancelText: '查看报告',
        confirmText: '继续查询',
        success: (res) => {
          if (res.confirm) {
            handleSubmit(true)
          } else {
            uni.navigateTo({ url: `/pages/check/result?vinCode=${vinCode.value}` })
          }
        }
      })
      return
    }

    // 2. 创建预支付订单（含自动绑定微信兜底）
    const payRes = await requestWechatPay({ payType: 3, taskId })
    const { outTradeNo, timeStamp, nonceStr, paySign, signType } = payRes.data
    const packageVal = payRes.data['package']

    // 3. 支付前请求订阅消息授权（用户拒绝不影响支付）
    await requestSubscribeMsg()

    // 4. 发起微信支付；仅"用户取消"立即返回，其他回调异常静默忽略
    //    （微信偶发回调丢失，后端 getAndValidateOrder 会主动向微信查单）
    try {
      await uni.requestPayment({ provider: 'wxpay', timeStamp, nonceStr, package: packageVal, signType, paySign })
    } catch (payErr) {
      if (payErr?.errMsg?.includes('cancel')) {
        uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
        return
      }
    }

    // 5. 支付回调后端会异步触发检测任务执行（CheckTaskPaySuccessListener）
    // ====== 使用自定义 Loading 并动态切换文案 ======
	isGenerating.value = true
	dynamicLoadingText.value = '正在安全连接车辆云端数据...'
	// 模拟真实的逐步检测过程
	setTimeout(() => { dynamicLoadingText.value = '正在核对多维历史数据...' }, 1500)
	setTimeout(() => { dynamicLoadingText.value = '深度分析三电及车况信息...' }, 3000)
	setTimeout(() => { dynamicLoadingText.value = '即将完成，正在排版专属报告...' }, 4500)
	
    await new Promise(r => setTimeout(r, 5000))
    isGenerating.value = false

    uni.navigateTo({ url: `/pages/check/result?vinCode=${vinCode.value}&outTradeNo=${outTradeNo}` })
  } catch (e) {
    isGenerating.value = false // 发生错误时也要关闭自定义 Loading
    if (e?.errMsg?.includes('cancel')) {
      uni.navigateTo({ url: '/pages/pay/payResult?status=cancel' })
    } else {
      console.error(e)
      uni.navigateTo({ url: '/pages/pay/payResult?status=fail' })
    }
  } finally {
    loading.value = false
    isGenerating.value = false // 发生错误时也要关闭自定义 Loading
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
    height: 320rpx;
    display: block;
  }

  .top-content {
    position: absolute;
    top: 20rpx;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx 0 40rpx;

    .top-text {
      width: 72%;
      display: flex;
      flex-direction: column;
      gap: 15rpx;
      .top-title {
        font-size: 35rpx;
        font-weight: bold;
        color: #fff;
        margin-top: 15rpx;
      }
      .top-desc {
        font-size: 30rpx;
        color: rgba(255, 255, 255, 0.85);
        line-height: 1.5;
      }
    }

    .top-icon {
      width: 220rpx;
      height: 220rpx;
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
  font-size: 22rpx;
  color: #666;
  margin-bottom: 10rpx;
  margin-top: 10rpx;
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

/* 价格栏 */
.price-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16rpx 5% 0;
  padding: 24rpx 30rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.06);

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

/* 价格右侧徽标 */
.price-badge {
  display: flex;
  align-items: center;
  border-radius: 30rpx;
  padding: 8rpx 20rpx;
  flex-shrink: 0;

  .badge-text {
    font-size: 24rpx;
    white-space: nowrap;
  }
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

/* 按钮 */
.btn-wrap { margin: 16rpx 5%; }

/* 查看检测范例 */
.demo-btn-wrap {
  margin: 20rpx 5% 0;
}

.btn-2 {
  display: block;
  color: #30ad55;
  border: 1rpx solid #30ad55;
  font-size: 30rpx;
  background: #fff;
  border-radius: 20rpx;
  text-align: center;
  padding: 18rpx 0;
}

/* 弹窗 */
.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.popup-sheet {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: #fff;
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
  border-bottom: 1rpx solid #f0f0f0;
}

.popup-title {
  font-size: 30rpx;
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

/* ================= 自定义 Loading 动画 ================= */
.custom-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px); /* 增加毛玻璃高级感 */
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100rpx;
  }

  .radar-spinner {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    border: 6rpx solid #e2f4e8;
    border-top-color: #30ad55;
    position: relative;
    animation: spin 1.2s linear infinite;
    margin-bottom: 40rpx;
    box-shadow: 0 0 30rpx rgba(48, 173, 85, 0.2);

    .spinner-inner {
      position: absolute;
      top: 10rpx;
      left: 10rpx;
      right: 10rpx;
      bottom: 10rpx;
      border-radius: 50%;
      border: 6rpx solid transparent;
      border-bottom-color: #30ad55;
      opacity: 0.6;
      animation: spin-reverse 0.8s linear infinite;
    }
  }

  .loading-title {
    font-size: 38rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    letter-spacing: 2rpx;
  }

  .loading-desc {
    font-size: 26rpx;
    color: #30ad55;
    font-weight: 500;
    animation: pulse 1.5s ease-in-out infinite;
  }
}

/* 旋转动画 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

/* 文字呼吸动画 */
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>
