<template>
  <view class="page">
    <!-- 加载中 -->
    <view v-if="loading" class="status-wrap">
      <u-loading-icon size="60" color="#57ca9e" />
      <text class="status-text">报告加载中...</text>
    </view>

    <!-- 加载失败 -->
    <view v-else-if="!report" class="status-wrap">
      <text class="status-icon">🔍</text>
      <text class="status-text">报告获取失败，请返回重试</text>
      <u-button text="返回" type="primary" color="#57ca9e" @click="uni.navigateBack()" />
    </view>

    <!-- 报告内容 -->
    <view v-else>
      <!-- 头部：品牌信息 -->
      <view class="report-header">
        <view class="brand-row">
          <image v-if="report.brandLogo" :src="report.brandLogo" class="brand-logo" mode="aspectFit" />
          <view class="brand-info">
            <text class="brand-name">{{ report.brand || '未知品牌' }}</text>
            <text class="vin-text">VIN：{{ vinCode }}</text>
          </view>
        </view>
        <view class="disclaimer">
          <text class="disclaimer-text">⚠️ 本查询结果仅供参考，不做准确性、完整性承诺</text>
        </view>
      </view>

      <!-- Tab切换 -->
      <view class="tabs">
        <text class="tab-item" :class="{ active: tabIndex === 0 }" @click="tabIndex = 0">电池健康</text>
        <text class="tab-item" :class="{ active: tabIndex === 1 }" @click="tabIndex = 1">行驶模块</text>
        <text class="tab-item" :class="{ active: tabIndex === 2 }" @click="tabIndex = 2">静态数据</text>
        <text class="tab-item" :class="{ active: tabIndex === 3 }" @click="tabIndex = 3">充电模块</text>
      </view>

      <!-- 电池健康模块 -->
      <view v-show="tabIndex === 0">
        <view class="card">
          <view class="card-title-row">
            <view class="dot" />
            <text class="card-title">电池健康模块</text>
          </view>

          <!-- 参考续航 -->
          <view class="mileage-center">
            <text class="mileage-label">当前参考续航</text>
            <view class="mileage-num-wrap">
              <text class="mileage-num">{{ report.referRateMileage }}</text>
              <text class="mileage-unit">km</text>
            </view>
            <view class="mileage-assess-tag">{{ report.referRateMileageAssess }}</view>
          </view>
          <view class="tip-box yellow">
            ℹ️ 参考续航：实际满电行驶里程数的参考值，会因温度、行驶环境不同而不同。
          </view>

          <!-- SOH 电池健康度 -->
          <view class="soh-card" :class="batterySohColor">
            <view class="soh-icon-wrap">
              <text class="soh-icon">🔋</text>
            </view>
            <view class="soh-info">
              <text class="soh-label">SOH（电池健康度）</text>
              <view class="soh-val-row">
                <text class="soh-val">{{ report.batterySoh }}<text class="soh-unit">%</text></text>
                <view class="soh-tag">{{ report.batterySohLvStr }}</view>
              </view>
            </view>
          </view>

          <!-- 安全风险 -->
          <view class="soh-card" :class="safetyColor">
            <view class="soh-icon-wrap">
              <text class="soh-icon">🛡️</text>
            </view>
            <view class="soh-info">
              <text class="soh-label">安全风险</text>
              <view class="soh-val-row">
                <text class="soh-val"><text class="soh-unit">衰退倍率 </text>{{ report.volumeScoreRecession }}</text>
                <view class="soh-tag">{{ report.volumeScoreRecessionLvStr }}</view>
              </view>
            </view>
          </view>

          <!-- 解析文字 -->
          <view v-if="safetyNarrateList.length" class="narrate-box">
            <view class="narrate-title">💡 解析</view>
            <view v-for="(item, i) in safetyNarrateList" :key="i" class="narrate-item">
              <rich-text :nodes="item" />
            </view>
          </view>
        </view>
      </view>

      <!-- 行驶模块 -->
      <view v-show="tabIndex === 1">
        <view class="card">
          <view class="card-title-row">
            <view class="dot" />
            <text class="card-title">车辆行驶模块</text>
            <text class="card-time">表显里程更新于 {{ report.lastDrivingDate }}</text>
          </view>

          <view class="stat-row">
            <view class="stat-item">
              <text class="stat-val">{{ report.displayMileage }} km</text>
              <text class="stat-key">表显行驶里程</text>
            </view>
            <view class="stat-item">
              <text class="stat-val">{{ report.manufacturerDate }} 年</text>
              <text class="stat-key">车辆生产年份</text>
            </view>
          </view>

          <!-- 里程核验 -->
          <view class="mileage-check-box" :class="report.suspectedAdjust ? 'danger' : 'safe'">
            <view class="mileage-check-header">
              <view>
                <text class="mileage-check-title">里程核验</text>
                <text class="mileage-check-desc" v-if="!report.suspectedAdjust">
                  根据模型测算，暂未发现里程异常
                </text>
                <view class="mileage-check-desc" v-else>
                  根据模型测算，该车辆存在<text style="color:#fc5b50;font-weight:bold;">里程异常</text>
                </view>
              </view>
              <text class="mileage-check-icon">{{ report.suspectedAdjust ? '⚠️' : '✅' }}</text>
            </view>

            <view v-if="mileageList.length" class="mileage-list">
              <view v-for="(m, i) in mileageList" :key="i" class="mileage-row" :class="{ err: m.hasErr }">
                <text class="ml-month">{{ m.month }}</text>
                <text class="ml-km">{{ m.displayMileage }} km</text>
                <text class="ml-remark" :class="{ 'err-text': m.hasErr }">{{ m.remark }}</text>
              </view>
            </view>

            <text class="mileage-tip">1. 报告仅展示最近一次里程异常情况，请结合实际车况判断！</text>
          </view>
        </view>
      </view>

      <!-- 静态数据 -->
      <view v-show="tabIndex === 2">
        <view class="card">
          <view class="card-title-row">
            <view class="dot" />
            <text class="card-title">车辆电池静态数据</text>
          </view>

          <view class="cell-row stripe">
            <text class="cell-key">电池厂商</text>
            <text class="cell-val">{{ report.batteryManufacturer || '--' }}</text>
          </view>
          <view class="cell-row">
            <text class="cell-key">标称容量</text>
            <text class="cell-val">{{ report.rateCapacity || '--' }} Ah</text>
          </view>
          <view class="cell-row stripe">
            <text class="cell-key">标称能量</text>
            <text class="cell-val">{{ report.nominalEnergy || '--' }} kWh</text>
          </view>
          <view class="cell-row">
            <text class="cell-key">标称续航</text>
            <text class="cell-val">{{ report.rateMileage || '--' }} km</text>
          </view>
          <view class="cell-row stripe">
            <text class="cell-key">电池类型</text>
            <text class="cell-val">{{ report.batteryType || '--' }}</text>
          </view>
        </view>
      </view>

      <!-- 充电模块 -->
      <view v-show="tabIndex === 3">
        <view class="card">
          <view class="card-title-row">
            <view class="dot" />
            <text class="card-title">车辆充放电模块</text>
          </view>

          <view class="charge-layout">
            <view class="charge-habit" :class="habitColor">
              <text class="habit-icon">⚡</text>
              <text class="habit-label">电池使用习惯</text>
              <text class="habit-val">{{ report.batteryHabitAssess }}</text>
            </view>
            <view class="charge-stats">
              <view class="cell-row stripe">
                <text class="cell-key">总充电次数</text>
                <text class="cell-val">{{ report.totalChargeCount }} 次</text>
              </view>
              <view class="cell-row">
                <text class="cell-key">循环次数</text>
                <text class="cell-val">{{ report.totalChargeSoc }} 次</text>
              </view>
              <view class="cell-row stripe">
                <text class="cell-key">快充占比</text>
                <text class="cell-val">{{ report.fastRatio }} %
                  <text class="assess-tag">{{ report.fastRatioAssess }}</text>
                </text>
              </view>
            </view>
          </view>

          <!-- 注意 -->
          <view v-if="attentionList.length" class="narrate-box">
            <view class="narrate-title">⚠️ 注意</view>
            <view v-for="(item, i) in attentionList" :key="i" class="narrate-item">
              <rich-text :nodes="item" />
            </view>
          </view>
          <!-- 建议 -->
          <view v-if="suggestList.length" class="narrate-box">
            <view class="narrate-title">✅ 建议</view>
            <view v-for="(item, i) in suggestList" :key="i" class="narrate-item">
              <rich-text :nodes="item" />
            </view>
          </view>
        </view>
      </view>

      <!-- 免责声明 -->
      <view class="card disclaimer-card">
        <text class="disclaimer-footer">
          评估方：株洲云检新能源科技有限公司{{ '\n' }}本报告提供的评估结果仅基于用户自主填写的车辆信息，结合新能源汽车充电及工况大数据模型进行测算，结果仅供参考。评估方不对任何用户基于本报告内容所做的决策或行动承担任何直接或间接的责任。
        </text>
      </view>

      <!-- 底部操作栏 -->
      <view class="footer-bar">
        <text class="footer-time">评估时间：{{ detail.createTime ? detail.createTime.substring(0, 10) : '--' }}</text>
        <view class="footer-btns">
          <u-button text="导出报告" size="small" type="primary" color="#57ca9e" @click="handleExport" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getCheckDetails, getReportImgUrl } from '@/utils/api'

const vinCode = ref('')
const outTradeNo = ref('')
const loading = ref(true)
const detail = ref({})
const report = ref(null)
const tabIndex = ref(0)
const mileageList = ref([])
const safetyNarrateList = ref([])
const attentionList = ref([])
const suggestList = ref([])

onLoad((options) => {
  vinCode.value = options.vinCode || ''
  outTradeNo.value = options.outTradeNo || ''
  if (vinCode.value) fetchReport()
})

async function fetchReport() {
  loading.value = true
  try {
    const params = { vinCode: vinCode.value }
    if (outTradeNo.value) params.outTradeNo = outTradeNo.value
    const res = await getCheckDetails(params)
    if (res.code === 200 && res.data) {
      detail.value = res.data
      const raw = res.data.resultTxt
      if (raw) {
        try {
          report.value = typeof raw === 'string' ? JSON.parse(raw) : raw
          // 解析里程异常列表
          if (report.value.checkDisplayMileageListJson) {
            try {
              mileageList.value = typeof report.value.checkDisplayMileageListJson === 'string'
                ? JSON.parse(report.value.checkDisplayMileageListJson)
                : report.value.checkDisplayMileageListJson
            } catch (e) { mileageList.value = [] }
          }
          // 解析安全风险说明
          if (report.value.volumeScoreRecessionNarrate) {
            try {
              safetyNarrateList.value = typeof report.value.volumeScoreRecessionNarrate === 'string'
                ? JSON.parse(report.value.volumeScoreRecessionNarrate)
                : report.value.volumeScoreRecessionNarrate
            } catch (e) { safetyNarrateList.value = [] }
          }
          // 解析充放电注意/建议
          if (report.value.dischargingAttention) {
            try {
              attentionList.value = typeof report.value.dischargingAttention === 'string'
                ? JSON.parse(report.value.dischargingAttention)
                : report.value.dischargingAttention
            } catch (e) { attentionList.value = [] }
          }
          if (report.value.dischargingSuggest) {
            try {
              suggestList.value = typeof report.value.dischargingSuggest === 'string'
                ? JSON.parse(report.value.dischargingSuggest)
                : report.value.dischargingSuggest
            } catch (e) { suggestList.value = [] }
          }
        } catch (e) {
          console.error('解析resultTxt失败', e)
        }
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

// 颜色映射
const batterySohColor = computed(() => {
  const v = report.value?.batterySohLvStr || ''
  if (v === '优秀') return 'color-green'
  if (v === '良好') return 'color-blue'
  if (v === '中等') return 'color-yellow'
  if (v === '较差') return 'color-orange'
  if (v === '差') return 'color-red'
  return 'color-green'
})

const safetyColor = computed(() => {
  const v = report.value?.volumeScoreRecessionLvStr || ''
  if (v === '低') return 'color-green'
  if (v === '较低') return 'color-blue'
  if (v === '较高') return 'color-yellow'
  if (v === '高') return 'color-orange'
  return 'color-green'
})

const habitColor = computed(() => {
  const v = report.value?.batteryHabitAssess || ''
  if (v === '优秀') return 'color-green'
  if (v === '良好') return 'color-blue'
  if (v === '中等') return 'color-yellow'
  if (v === '较差') return 'color-orange'
  if (v === '差') return 'color-red'
  return 'color-green'
})

async function handleExport() {
  if (!report.value?.id && !detail.value?.id) {
    uni.showToast({ title: '暂无报告ID', icon: 'none' })
    return
  }
  try {
    uni.showLoading({ title: '生成中...' })
    const res = await getReportImgUrl({
      reportId: report.value?.id || detail.value?.id,
      type: 1,
      vinCode: vinCode.value
    })
    uni.hideLoading()
    if (res.msg || res.data) {
      const imgUrl = res.msg || res.data
      uni.previewImage({ urls: [imgUrl] })
    }
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: '导出失败', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #1b9f90 0%, #27a46c 40%, #3cc6f3 100%);
  padding-bottom: 120rpx;
}

.status-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300rpx;
  gap: 30rpx;
  .status-icon { font-size: 100rpx; }
  .status-text { font-size: 30rpx; color: #fff; }
}

/* 头部 */
.report-header {
  margin: 30rpx 30rpx 0;
  background: rgba(57, 235, 189, 0.2);
  border-radius: 16rpx;
  overflow: hidden;
  .brand-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30rpx;
    gap: 24rpx;
    .brand-logo { width: 80rpx; height: 80rpx; border-radius: 10rpx; background: #fff; }
    .brand-info { display: flex; flex-direction: column; gap: 8rpx;
      .brand-name { font-size: 34rpx; font-weight: bold; color: #fff; }
      .vin-text { font-size: 24rpx; color: rgba(255,255,255,0.85); }
    }
  }
  .disclaimer {
    background: rgba(34, 163, 109, 0.6);
    padding: 18rpx 24rpx;
    .disclaimer-text { font-size: 24rpx; color: #fff; }
  }
}

/* Tabs */
.tabs {
  display: flex;
  flex-direction: row;
  margin: 24rpx 30rpx 0;
  background: #fff;
  border-radius: 16rpx;
  padding: 8rpx;
  gap: 4rpx;
  .tab-item {
    flex: 1;
    text-align: center;
    line-height: 70rpx;
    font-size: 26rpx;
    color: #555;
    border-radius: 12rpx;
    &.active {
      background: linear-gradient(135deg, #57ca9e, #30ad55);
      color: #fff;
      font-weight: bold;
    }
  }
}

/* 卡片 */
.card {
  margin: 24rpx 30rpx 0;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  .card-title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24rpx;
    .dot { width: 10rpx; height: 34rpx; background: linear-gradient(180deg, #57ca9e, #30ad55); border-radius: 5rpx; margin-right: 14rpx; }
    .card-title { font-size: 30rpx; font-weight: bold; color: #111; }
    .card-time { font-size: 22rpx; color: #999; margin-left: 16rpx; }
  }
}

/* 参考续航 */
.mileage-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
  .mileage-label { font-size: 28rpx; color: #333; font-weight: bold; }
  .mileage-num-wrap {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-top: 16rpx;
    .mileage-num { font-size: 96rpx; font-weight: bold; color: #00acdd; line-height: 1; }
    .mileage-unit { font-size: 32rpx; color: #00acdd; margin-bottom: 10rpx; margin-left: 6rpx; }
  }
  .mileage-assess-tag {
    margin-top: 16rpx;
    background: #fff9ed;
    border: 1rpx solid #f3a550;
    color: #f3a550;
    font-size: 26rpx;
    font-weight: bold;
    padding: 6rpx 20rpx;
    border-radius: 10rpx;
  }
}

.tip-box {
  border-radius: 10rpx;
  padding: 16rpx;
  font-size: 24rpx;
  line-height: 1.6;
  margin-top: 20rpx;
  &.yellow {
    background: rgba(255, 251, 230, 0.6);
    border: 1rpx solid #ffe58f;
    color: #faad14;
  }
}

/* SOH卡片 */
.soh-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  color: #fff;
  .soh-icon-wrap {
    width: 100rpx;
    height: 100rpx;
    border-radius: 12rpx;
    background: rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    .soh-icon { font-size: 56rpx; }
  }
  .soh-info {
    flex: 1;
    margin-left: 20rpx;
    .soh-label { font-size: 28rpx; display: block; margin-bottom: 10rpx; }
    .soh-val-row {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      gap: 16rpx;
      .soh-val { font-size: 56rpx; font-weight: bold; line-height: 1;
        .soh-unit { font-size: 26rpx; } }
      .soh-tag {
        background: rgba(255,255,255,0.2);
        padding: 6rpx 16rpx;
        border-radius: 10rpx;
        font-size: 24rpx;
        margin-bottom: 8rpx;
      }
    }
  }
}

/* 颜色 */
.color-green { background: linear-gradient(to bottom, #50dd7c, #3fcc6c); }
.color-blue  { background: linear-gradient(to bottom, #18bbf8, #149eda); }
.color-yellow{ background: linear-gradient(to bottom, #fedb64, #ffc93d); }
.color-orange{ background: linear-gradient(to bottom, #fea72d, #fd7a11); }
.color-red   { background: linear-gradient(to bottom, #fc5b50, #fa2b32); }

/* 解析文字块 */
.narrate-box {
  background: #edfaf9;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  .narrate-title { font-size: 28rpx; font-weight: bold; color: #111; margin-bottom: 14rpx; }
  .narrate-item { font-size: 26rpx; color: #555; line-height: 1.7; margin-bottom: 8rpx; }
}

/* 行驶模块 */
.stat-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24rpx;
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10rpx;
    .stat-val { font-size: 38rpx; font-weight: bold; color: #00acdd; }
    .stat-key { font-size: 26rpx; color: #333; }
  }
}

.mileage-check-box {
  border-radius: 20rpx;
  padding: 24rpx;
  &.safe { background: #ecfaf2; }
  &.danger { background: #ffeaec; }
  .mileage-check-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16rpx;
    .mileage-check-title { font-size: 30rpx; font-weight: bold; color: #333; display: block; margin-bottom: 10rpx; }
    .mileage-check-desc { font-size: 26rpx; color: #555; }
    .mileage-check-icon { font-size: 60rpx; }
  }
  .mileage-list {
    background: #fff;
    border-radius: 14rpx;
    overflow: hidden;
    margin-bottom: 16rpx;
    .mileage-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx 20rpx;
      border-bottom: 1rpx solid #f5f5f5;
      &:last-child { border-bottom: none; }
      &.err { background: #fff3f3; }
      .ml-month, .ml-km, .ml-remark { font-size: 28rpx; color: #555; }
      .ml-remark.err-text { color: #fc4731; font-weight: bold; }
    }
  }
  .mileage-tip { font-size: 24rpx; color: #888; line-height: 1.6; }
}

/* 静态数据和充电模块的表格行 */
.cell-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 80rpx;
  border-radius: 8rpx;
  padding: 0 16rpx;
  font-size: 28rpx;
  &.stripe { background: #edfaf9; }
  .cell-key { color: #666; }
  .cell-val { color: #333; font-weight: bold; }
}

/* 充电模块布局 */
.charge-layout {
  display: flex;
  flex-direction: row;
  gap: 16rpx;
  margin-bottom: 16rpx;
  .charge-habit {
    width: 200rpx;
    border-radius: 20rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10rpx;
    flex-shrink: 0;
    .habit-icon { font-size: 60rpx; }
    .habit-label { font-size: 22rpx; color: #fff; text-align: center; }
    .habit-val { font-size: 44rpx; font-weight: bold; color: #fff; }
  }
  .charge-stats { flex: 1; }
}

.assess-tag {
  font-size: 22rpx;
  background: #fff9ed;
  border: 1rpx solid #f3a550;
  color: #f3a550;
  padding: 2rpx 10rpx;
  border-radius: 6rpx;
  margin-left: 8rpx;
}

/* 免责声明 */
.disclaimer-card {
  .disclaimer-footer {
    font-size: 24rpx;
    color: #666;
    line-height: 1.8;
    display: block;
  }
}

/* 底部操作栏 */
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.08);
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  .footer-time { font-size: 24rpx; color: #888; }
  .footer-btns { display: flex; flex-direction: row; gap: 16rpx; }
}
</style>
