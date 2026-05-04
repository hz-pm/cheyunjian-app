<template>
  <view class="page">
    <!-- 加载中 -->
    <view v-if="loading" class="status-wrap">
      <u-loading-icon size="60" color="#57ca9e" />
      <text class="status-text">报告加载中...</text>
    </view>

    <!-- 加载失败 -->
    <view v-else-if="!report" class="status-wrap">
      <text class="status-text">报告获取失败，请返回重试</text>
      <u-button text="返回" type="primary" color="#57ca9e" @click="uni.navigateBack()" />
    </view>

    <!-- 报告内容 -->
    <view v-else style="width:100%;display:flex;flex-direction:column;align-items:center;">
      <!-- 头部：品牌 + VIN -->
      <view class="header-card">
        <view class="brand-row">
          <image v-if="report.brandLogo" :src="report.brandLogo"
            style="width:80rpx;height:80rpx;background-color:#fff;border-radius:10rpx;padding:6rpx;" mode="aspectFit" />
          <view style="display:flex;flex-direction:column;color:#fff;font-size:30rpx;margin-left:25rpx;">
            <text style="font-size:32rpx;font-weight:bold;">{{ report.brand }}</text>
            <text style="margin-top:5rpx;">VIN:{{ vinCode }}</text>
          </view>
        </view>
        <view class="disclaimer-bar">
          <text class="iconfont icon-warning" style="color:#fff;width:40rpx;font-size:32rpx;"></text>
          <text style="font-size:26rpx;color:#fff;">本查询结果仅供参考，对结果不做准确性、完整性承若</text>
        </view>
      </view>

      <!-- Tabs（全部模块同时展示，tab 仅做视觉标记） -->
      <view class="tabs">
        <text class="t" :class="tabIndex===0?'t-selected':''" @click="tabIndex=0">电池健康</text>
        <text class="t" :class="tabIndex===1?'t-selected':''" @click="tabIndex=1">行驶模块</text>
        <text class="t" :class="tabIndex===2?'t-selected':''" @click="tabIndex=2">静态数据</text>
        <text class="t" :class="tabIndex===3?'t-selected':''" @click="tabIndex=3">充电模块</text>
      </view>

      <!-- ===== 电池健康模块 ===== -->
      <view class="card">
        <view class="title-v">
          <view class="dot"></view>
          <text class="title">电池健康模块</text>
        </view>

        <!-- 参考续航 + canvas 进度条 -->
        <view class="ehr">
          <view class="power">当前参考续航</view>
        </view>
        <view style="width:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:10rpx;">
          <canvas class="progress-canvas" canvas-id="progressCanvas" v-if="!canvasSrc"></canvas>
          <image class="progress-canvas" :src="canvasSrc" v-if="canvasSrc"></image>
          <view style="display:flex;flex-direction:column;position:absolute;margin-top:85rpx;align-items:center;">
            <view style="display:flex;flex-direction:row;font-weight:bold;">
              <text style="font-size:82rpx;color:#00acdd;">{{ report.referRateMileage }}</text>
              <text style="font-size:30rpx;color:#00acdd;margin-top:0rpx;">km</text>
            </view>
            <view style="display:flex;flex-direction:row;background-color:#fff9ed;border:1rpx solid #f3a550;
              padding-left:6rpx;padding-right:6rpx;border-radius:8rpx;align-items:center;
              margin-top:30rpx;justify-content:center;width:130rpx;font-weight:bold;">
              <text style="font-size:28rpx;color:#f3a550;">{{ report.referRateMileageAssess }}</text>
            </view>
          </view>
        </view>

        <!-- 参考续航说明 -->
        <view class="referV2">
          <text class="iconfont icon-info" style="margin-right:8rpx;font-size:32rpx;"></text>参考续航：实际满电行驶里程数的参考值，会因为温度、行驶环境的不同而不同，北方春秋季节一般会比冬季高。
        </view>

        <!-- SOH 电池健康度 -->
        <view class="sohBattery" :class="batterySohBgClass">
          <view class="iconBox">
            <text class="iconfont icon-battery" style="font-size:80rpx;"></text>
          </view>
          <view class="battertTxt">
            <view class="txT">SOH(电池健康度)</view>
            <view class="txBox">
              <view class="txB">{{ report.batterySoh }}<text class="text">%</text></view>
              <view class="txBr">{{ report.batterySohLvStr }}</view>
            </view>
          </view>
        </view>

        <!-- 安全风险 -->
        <view class="sohBattery" :class="safetyBgClass">
          <view class="iconBox">
            <text class="iconfont anquan" style="font-size:90rpx;"></text>
          </view>
          <view class="battertTxt">
            <view class="txT">安全风险</view>
            <view class="txBox">
              <view class="txB"><text class="text">衰退倍率</text>{{ report.volumeScoreRecession }}</view>
              <view class="txBr">{{ report.volumeScoreRecessionLvStr }}</view>
            </view>
          </view>
        </view>

        <!-- 解析 -->
        <view v-if="safetyNarrateList.length" style="width:100%;display:flex;flex-direction:column;background-color:#edfaf9;margin-top:20rpx;border-radius:20rpx;margin-bottom:20rpx;">
          <view class="tips-title">
            <image src="/static/ic-jiedu.png" style="width:40rpx;height:40rpx;"></image>
            <text style="font-weight:bold;color:#000;">解析</text>
          </view>
          <view v-for="(item, i) in safetyNarrateList" :key="i" class="tips-info">
            <rich-text style="white-space:pre-wrap;" :nodes="item"></rich-text>
          </view>
        </view>
      </view>

      <!-- ===== 行驶模块 ===== -->
      <view class="card">
        <view class="title-v">
          <view class="dot"></view>
          <text class="title">车辆行驶模块</text>
          <text class="time">表显里程更新于{{ report.lastDrivingDate }}</text>
        </view>

        <view style="width:80%;display:flex;flex-direction:row;align-items:center;justify-content:space-between;
          align-self:center;margin-top:35rpx;">
          <view style="display:flex;flex-direction:column;align-items:center;">
            <text style="font-size:40rpx;font-weight:bold;color:#00acdd;">{{ report.displayMileage }}Km</text>
            <text style="font-size:30rpx;color:#333;margin-top:10rpx;">表显行驶里程</text>
          </view>
          <view style="display:flex;flex-direction:column;align-items:center;">
            <text style="font-size:40rpx;font-weight:bold;color:#00acdd;">{{ report.manufacturerDate }}年</text>
            <text style="font-size:30rpx;color:#333;margin-top:10rpx;">车辆生产年份</text>
          </view>
        </view>

        <!-- 里程核验 -->
        <view class="mileage-check-box" :style="report.suspectedAdjust?{backgroundColor:'#ffeaec'}:{}">
          <view style="width:95%;display:flex;flex-direction:row;justify-content:space-between;margin-left:20rpx;">
            <view style="display:flex;flex-direction:column;color:#333;margin-bottom:20rpx;">
              <text style="font-weight:bold;font-size:32rpx;">里程核验</text>
              <text style="margin-top:40rpx;font-size:28rpx;" v-if="!report.suspectedAdjust">根据模型测算，暂未发现里程异常</text>
              <view style="margin-top:40rpx;font-size:28rpx;" v-else>
                根据模型测算，该车辆存在<text style="color:#fc5b50;font-weight:bold;">里程异常</text>
              </view>
            </view>
            <image :src="report.suspectedAdjust?'/static/ic-ybdd-red.png':'/static/ic-ybdd-green.png'"
              style="width:180rpx;height:130rpx;"></image>
          </view>

          <view v-if="mileageList.length" style="width:93%;background-color:#FFF;border:#f0555a solid 1rpx;
            border-radius:20rpx;align-self:center;padding-top:10rpx;padding-bottom:10rpx;margin-top:15rpx;">
            <view style="display:flex;flex-direction:column;align-items:center;" v-for="(item, i) in mileageList" :key="i">
              <view style="width:90%;display:flex;flex-direction:row;align-items:center;justify-content:space-between;
                margin-top:10rpx;margin-bottom:10rpx;font-weight:bold;color:#555;font-size:30rpx;">
                <text>{{ item.month }}</text>
                <text>{{ item.displayMileage }}km</text>
                <text :style="item.hasErr?{color:'#fc4731'}:{}">{{ item.remark }}</text>
              </view>
            </view>
          </view>

          <view class="tips-title">
            <image src="/static/ic-safe.png" style="width:40rpx;height:40rpx;"></image>
            <text style="font-weight:bold;color:#000;">注意</text>
          </view>
          <text class="tips-info">1.报告仅展示最近一次里程异常情况，不表示只出现过一次异常，请结合实际车况判断！</text>
        </view>
      </view>

      <!-- ===== 静态数据 ===== -->
      <view class="card">
        <view class="title-v">
          <view class="dot"></view>
          <text class="title">车辆电池静态数据</text>
        </view>

        <view class="cell-v" style="margin-top:35rpx;">
          <text class="t1">电池厂商</text>
          <text class="t2">{{ report.batteryManufacturer || '--' }}</text>
        </view>
        <view class="cell-v" style="background-color:#FFF;">
          <text class="t1">标称容量</text>
          <text class="t2">{{ report.rateCapacity || '--' }} Ah</text>
        </view>
        <view class="cell-v">
          <text class="t1">标称能量</text>
          <text class="t2">{{ report.nominalEnergy || '--' }} kWh</text>
        </view>
        <view class="cell-v" style="background-color:#FFF;">
          <text class="t1">标称续航</text>
          <text class="t2">{{ report.rateMileage || '--' }} km</text>
        </view>
        <view class="cell-v">
          <text class="t1">电池类型</text>
          <text class="t2">{{ report.batteryType || '--' }}</text>
        </view>
      </view>

      <!-- ===== 充放电模块 ===== -->
      <view class="card">
        <view class="title-v">
          <view class="dot"></view>
          <text class="title">车辆充放电模块</text>
        </view>

        <view style="width:100%;display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-top:30rpx;">
          <view style="width:30%;display:flex;flex-direction:column;align-items:center;background-color:#edfaf9;border-radius:20rpx;">
            <text class="iconfont dianchi" :class="habitBgClass"
              style="font-size:64rpx;color:#FFF;border-radius:50%;line-height:130rpx;width:130rpx;
              text-align:center;margin-top:20rpx;"></text>
            <text style="font-size:28rpx;margin-top:20rpx;color:#333;">电池使用习惯</text>
            <text style="font-size:50rpx;font-weight:bold;margin-top:20rpx;margin-bottom:30rpx;"
              :style="{color: habitTextColor}">{{ report.batteryHabitAssess }}</text>
          </view>
          <view style="width:70%;display:flex;flex-direction:column;align-items:center;margin-left:20rpx;">
            <view class="cell-v">
              <text class="t1">总充电次数</text>
              <text class="t2">{{ report.totalChargeCount }}次</text>
            </view>
            <view class="cell-v" style="background-color:#FFF;">
              <text class="t1">循环次数</text>
              <text class="t2">{{ report.totalChargeSoc }}次</text>
            </view>
            <view class="cell-v">
              <text class="t1">快充占比</text>
              <view>
                <text class="t2">{{ report.fastRatio }} %</text>
                <text style="background-color:#fff9ed;border:1rpx solid #f3a550;font-size:26rpx;
                  padding:5rpx 10rpx;color:#f3a550;border-radius:5rpx;margin-right:10rpx;">{{ report.fastRatioAssess }}</text>
              </view>
            </view>
          </view>
        </view>

        <view style="width:100%;display:flex;flex-direction:column;background-color:#edfaf9;margin-top:20rpx;
          border-radius:20rpx;margin-bottom:20rpx;">
          <view v-if="attentionList.length" class="tips-title">
            <image src="/static/info-fill.png" style="width:40rpx;height:40rpx;"></image>
            <text style="font-weight:bold;color:#000;">注意</text>
          </view>
          <view v-for="(item, i) in attentionList" :key="'att'+i" class="tips-info" style="margin-bottom:0;">
            <rich-text style="white-space:pre-wrap;" :nodes="item"></rich-text>
          </view>
          <view v-if="suggestList.length" class="tips-title">
            <image src="/static/ic-safe.png" style="width:40rpx;height:40rpx;"></image>
            <text style="font-weight:bold;color:#000;">建议</text>
          </view>
          <view v-for="(item, i) in suggestList" :key="'sug'+i" class="tips-info">
            <rich-text style="white-space:pre-wrap;" :nodes="item"></rich-text>
          </view>
        </view>
      </view>

      <!-- ===== 免责声明 ===== -->
      <view class="card" style="margin-bottom:120rpx;">
        <view class="tips-title" style="margin-top:0;">
          <image src="/static/ic-safe.png" style="width:40rpx;height:40rpx;"></image>
          <text style="font-weight:bold;color:#000;">评估方：株洲云检新能源科技有限公司</text>
        </view>
        <view class="tips-title">
          <image src="/static/info-fill.png" style="width:40rpx;height:40rpx;"></image>
          <text style="font-weight:bold;color:#000;">免责申明</text>
        </view>
        <text class="tips-info">本报告提供的评估结果仅基于用户自主填写的车辆信息，结合新能源汽车充电及工况大数据模型进行测算，结果仅供参考。评估方不对任何用户基于本报告内容所做的决策或行动承担任何直接或间接的责任。</text>
      </view>
    </view>

    <!-- 客服浮动按钮 -->
    <view class="customer" v-if="report">
      <view class="iconfont icon-kefu" style="font-size:36rpx;color:#fff;"></view>
      <view style="font-size:24rpx;color:#fff;">客服</view>
      <button style="display:flex;flex-direction:column;align-items:center;border:none;background-color:#00000000;
        position:absolute;width:90%;height:70rpx;" type="default" plain="true" open-type="contact" size="default"></button>
    </view>

    <!-- 底部操作栏（分享预览模式不显示） -->
    <view class="foot" v-if="report && outTradeNo">
      <view class="tiem">
        <text class="iconfont icon-history" style="font-size:35rpx;margin-right:15rpx;color:#30ad55;"></text>
        评估时间:{{ detail.createTime ? detail.createTime.substring(0,10) : '--' }}
      </view>
      <view class="export">
        <button class="white-btn" @click="fetchReport">刷新</button>
        <button class="blue-btn" @click="handleExport">
          <text class="iconfont icon-export" style="font-size:30rpx;"></text>导出
        </button>
      </view>
    </view>

    <!-- 导出图片弹窗 -->
    <view v-if="showPopup" class="popup-mask" @click.self="showPopup=false">
      <view class="popup-sheet">
        <view class="attestation">
          <text class="iconfont icon-info" style="font-size:28rpx;margin-right:6rpx;"></text>长按报告可保存至手机相册
        </view>
        <scroll-view scroll-y style="flex:1;">
          <image :src="imgUrl" mode="widthFix" style="width:100%;" @longpress="saveImage"></image>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { getCheckDetails, getReportImgUrl } from '@/utils/api'
import { BASE_URL_IMG } from '@/utils/request'

const instance = getCurrentInstance()

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
const canvasSrc = ref('')
const imgUrl = ref('')
const showPopup = ref(false)

onLoad((options) => {
  vinCode.value = options.vinCode || ''
  outTradeNo.value = options.outTradeNo || ''
  if (vinCode.value) fetchReport()
})

onShareAppMessage(() => ({
  title: `新能源云检报告 - ${vinCode.value || 'VIN'}`,
  path: `/pages/check/result?vinCode=${vinCode.value}`,
  imageUrl: BASE_URL_IMG + 'mp-share.png'
}))

async function fetchReport() {
  loading.value = true
  canvasSrc.value = ''
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
          const r = report.value
          if (r.checkDisplayMileageListJson) {
            try { mileageList.value = typeof r.checkDisplayMileageListJson === 'string' ? JSON.parse(r.checkDisplayMileageListJson) : r.checkDisplayMileageListJson } catch (e) { mileageList.value = [] }
          }
          if (r.volumeScoreRecessionNarrate) {
            try { safetyNarrateList.value = typeof r.volumeScoreRecessionNarrate === 'string' ? JSON.parse(r.volumeScoreRecessionNarrate) : r.volumeScoreRecessionNarrate } catch (e) { safetyNarrateList.value = [] }
          }
          if (r.dischargingAttention) {
            try { attentionList.value = typeof r.dischargingAttention === 'string' ? JSON.parse(r.dischargingAttention) : r.dischargingAttention } catch (e) { attentionList.value = [] }
          }
          if (r.dischargingSuggest) {
            try { suggestList.value = typeof r.dischargingSuggest === 'string' ? JSON.parse(r.dischargingSuggest) : r.dischargingSuggest } catch (e) { suggestList.value = [] }
          }
          // 延迟绘制，等 canvas 元素渲染完成
          setTimeout(() => drawHalfCircleProgress(), 300)
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

function extractedPercentage(str) {
  if (!str) return null
  const match = str.match(/[-+]?\d*\.\d+|\d+/)
  return match ? parseFloat(match[0]) : null
}

function getPx(value) {
  if (/^\d+(\.\d+)?$/.test(String(value))) return Number(value)
  if (/(rpx|upx)$/.test(value)) return uni.upx2px(parseInt(value))
  return parseInt(value)
}

function drawHalfCircleProgress() {
  const assess = report.value?.referRateMileageAssess || ''
  const extracted = extractedPercentage(assess)
  const percentage = extracted != null ? Math.max(0, Math.min(100, 100 - extracted)) : 80

  const ctx = uni.createCanvasContext('progressCanvas', instance.proxy)
  const x = getPx('280rpx')
  const y = getPx('270rpx')
  const radius = getPx('240rpx')

  ctx.beginPath()
  ctx.arc(x, y, radius, Math.PI, 0, false)
  ctx.setLineWidth(getPx('40rpx'))
  ctx.setStrokeStyle('#e5e5e5')
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x, y, radius, Math.PI, Math.PI * (1 + percentage / 100), false)
  ctx.setLineWidth(getPx('40rpx'))
  ctx.setStrokeStyle('#00acdd')
  ctx.stroke()

  for (let i = 0; i < 7; i++) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    const angle = Math.PI + (-Math.PI / 6) * i
    const ext = radius - getPx('20rpx')
    ctx.lineTo(x + ext * Math.cos(angle), y - ext * Math.sin(angle))
    ctx.setLineWidth(getPx('1rpx'))
    ctx.setStrokeStyle('#e8f2fb')
    ctx.stroke()
  }

  for (let j = 1; j <= 3; j++) {
    ctx.beginPath()
    ctx.arc(x, y, ((radius / 3) - getPx('24rpx')) * j, Math.PI, 0, false)
    ctx.setLineWidth(getPx('1rpx'))
    ctx.setStrokeStyle('#e8f2fb')
    ctx.stroke()
  }

  ctx.draw(false, () => {
    uni.canvasToTempFilePath({
      canvasId: 'progressCanvas',
      success: (res) => { canvasSrc.value = res.tempFilePath }
    }, instance.proxy)
  })
}

// SOH 颜色
const batterySohBgClass = computed(() => {
  const v = report.value?.batterySohLvStr || ''
  if (v === '优秀') return 'bt-green'
  if (v === '良好') return 'bt-blue'
  if (v === '中等') return 'bt-yellow'
  if (v === '较差') return 'bt-orange'
  if (v === '差') return 'bt-red'
  return 'bt-green'
})

const safetyBgClass = computed(() => {
  const v = report.value?.volumeScoreRecessionLvStr || ''
  if (v === '低') return 'bt-green'
  if (v === '较低') return 'bt-blue'
  if (v === '较高') return 'bt-yellow'
  if (v === '高') return 'bt-orange'
  return 'bt-green'
})

const habitBgClass = computed(() => {
  const v = report.value?.batteryHabitAssess || ''
  if (v === '优秀') return 'bt-green'
  if (v === '良好') return 'bt-blue'
  if (v === '中等') return 'bt-yellow'
  if (v === '较差') return 'bt-orange'
  if (v === '差') return 'bt-red'
  return 'bt-green'
})

const habitTextColor = computed(() => {
  const v = report.value?.batteryHabitAssess || ''
  if (v === '优秀') return '#50dd7c'
  if (v === '良好') return '#18bbf8'
  if (v === '中等') return '#fedb64'
  if (v === '较差') return '#fea72d'
  if (v === '差') return '#fc5b50'
  return '#50dd7c'
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
    const url = res.msg || res.data
    if (url) {
      imgUrl.value = url
      showPopup.value = true
    }
  } catch (e) {
    uni.hideLoading()
    uni.showToast({ title: '导出失败', icon: 'none' })
  }
}

function saveImage() {
  uni.showModal({
    title: '提示',
    content: '是否保存图片到相册？',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: 'Loading...' })
        uni.downloadFile({
          url: imgUrl.value,
          success: (downloadResult) => {
            uni.hideLoading()
            if (downloadResult.statusCode === 200) {
              uni.saveImageToPhotosAlbum({
                filePath: downloadResult.tempFilePath,
                success: () => uni.showToast({ title: '图片保存成功' }),
                fail: () => uni.showToast({ title: '图片保存失败', icon: 'none' })
              })
            }
          },
          fail: () => { uni.hideLoading(); uni.showToast({ title: '图片下载失败', icon: 'none' }) }
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.page {
  background: linear-gradient(180deg, #1b9f90, 17%, #27a46c 46%, #3cc6f3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  font-size: 30rpx;
}

.page::after {
  content: " ";
  display: block;
  height: 84rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.status-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300rpx;
  gap: 30rpx;
  .status-text { font-size: 30rpx; color: #fff; }
}

/* 头部 */
.header-card {
  width: 95%;
  display: flex;
  flex-direction: column;
  background-color: rgba(57, 235, 189, 0.2);
  margin-top: 30rpx;
  border-radius: 10rpx;
  align-self: center;
  align-content: center;

  .brand-row {
    display: flex;
    flex-direction: row;
    margin-top: 35rpx;
    margin-left: 20rpx;
    margin-bottom: 35rpx;
    align-items: center;
  }

  .disclaimer-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgba(34, 163, 109, 0.6);
    line-height: 70rpx;
    justify-content: center;
    border-bottom-left-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
  }
}

/* Tabs */
.tabs {
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF;
  border-radius: 15rpx;
  padding-top: 5rpx;
  padding-bottom: 10rpx;
  margin-top: 25rpx;
  align-self: center;

  .t {
    line-height: 70rpx;
    width: 25%;
    border-radius: 15rpx;
    margin-left: 5rpx;
    margin-right: 5rpx;
    text-align: center;
    color: #333;
    font-size: 30rpx;
    font-weight: normal;
  }

  .t-selected {
    background: linear-gradient(144.27deg, #00aede, #47ad13);
    color: #FFF;
    font-weight: bold;
  }
}

/* 卡片 */
.card {
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx 20rpx 20rpx 20rpx;
  margin-top: 20rpx;
  align-self: center;

  .title-v {
    display: flex;
    flex-direction: row;
    align-items: center;

    .dot {
      width: 12rpx;
      height: 35rpx;
      background: linear-gradient(180deg, #00acdd, #47ad13);
      border-radius: 5rpx;
    }

    .title {
      font-weight: bold;
      color: #111;
      margin-left: 15rpx;
    }

    .time {
      font-size: 26rpx;
      color: #666;
      margin-left: 15rpx;
    }
  }
}

/* 参考续航 */
.ehr {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rpx;
  width: 314rpx;
  margin: 40rpx auto 0;

  .power {
    font-size: 30rpx;
    font-weight: 600;
    margin: 0 10rpx;
    color: #333;
  }
}

.ehr:before, .ehr:after {
  content: " ";
  height: 1px;
  background-color: #e5e5e5;
  font-size: 0;
  flex-grow: 1;
}

.progress-canvas {
  width: 85%;
  height: 280rpx;
}

/* 参考续航说明框 */
.referV2 {
  border-radius: 10rpx;
  background: rgba(255, 251, 230, 0.49);
  border: 1rpx solid #ffe58f;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #faad14;
  line-height: 30rpx;
  margin-top: 20rpx;
}

/* SOH 电池卡片 */
.sohBattery {
  width: 100%;
  border-radius: 12rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background: linear-gradient(to bottom, #18bbf8, #149eda 100%);
  margin-top: 20rpx;

  .iconBox {
    width: 124rpx;
    height: 124rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
    background: linear-gradient(135.41deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.36));
    margin-left: 20rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .battertTxt {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    margin-right: 20rpx;

    .txT {
      font-size: 32rpx;
      font-weight: bold;
      width: 100%;
      text-align: right;
    }

    .txBox {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10rpx;

      .txB {
        font-size: 60rpx;
        font-weight: 900;
        margin-right: 20rpx;
        align-self: flex-end;
        .text { font-size: 28rpx; }
      }

      .txBr {
        height: 68rpx;
        width: 120rpx;
        border-radius: 10rpx;
        background: hsla(0, 0%, 100%, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

/* 颜色 */
.bt-green  { background: linear-gradient(to bottom, #50dd7c, #3fcc6c 100%); }
.bt-blue   { background: linear-gradient(to bottom, #18bbf8, #149eda 100%); }
.bt-yellow { background: linear-gradient(to bottom, #fedb64, #ffc93d 100%); }
.bt-orange { background: linear-gradient(to bottom, #fea72d, #fd7a11 100%); }
.bt-red    { background: linear-gradient(to bottom, #fc5b50, #fa2b32 100%); }

/* 里程核验 */
.mileage-check-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ecfaf2;
  margin-top: 30rpx;
  border-radius: 20rpx;
  padding-top: 25rpx;
  margin-bottom: 20rpx;
}

/* 静态数据行 */
.cell-v {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #edfaf9;
  line-height: 85rpx;
  border-radius: 10rpx;
  font-size: 30rpx;

  .t1 { color: #666; margin-left: 20rpx; }
  .t2 { color: #333; margin-right: 20rpx; }
}

/* tips 标题行 */
.tips-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 35rpx;
  margin-left: 20rpx;
  gap: 10rpx;
}

.tips-info {
  width: 93%;
  font-size: 28rpx;
  color: #666;
  margin-top: 20rpx;
  align-self: center;
  margin-bottom: 45rpx;
}

/* 客服悬浮按钮 */
.customer {
  position: fixed;
  right: 20rpx;
  bottom: 185rpx;
  z-index: 7;
  width: 82rpx;
  height: 82rpx;
  border-radius: 50%;
  background: #30ad55;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.15);
}

/* 底部操作栏 */
.foot {
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: var(--window-left);
  right: var(--window-right);
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e8e8e8;
  padding-bottom: calc(constant(safe-area-inset-bottom) - 20rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) - 20rpx);

  .tiem {
    color: #383838;
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: 28rpx;
  }

  .export {
    display: flex;
    align-items: center;
    padding: 20rpx 0;

    .white-btn {
      width: auto;
      height: 66rpx;
      line-height: 66rpx;
      border-radius: 10rpx;
      padding: 0 20rpx;
      margin-left: 20rpx;
      background: #fff;
      font-size: 30rpx;
      color: #30ad55;
      border: 1rpx solid #30ad55;
    }

    .blue-btn {
      width: auto;
      height: 66rpx;
      line-height: 66rpx;
      border-radius: 10rpx;
      padding: 0 20rpx;
      margin-left: 20rpx;
      background: linear-gradient(135deg, #30ad55, #47ad13);
      color: #fff;
      font-size: 30rpx;
    }

    .white-btn::after { border: 0; }
  }
}

/* 导出图片弹窗 */
.popup-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.popup-sheet {
  background: #fff;
  border-radius: 15rpx 15rpx 0 0;
  height: 71vh;
  display: flex;
  flex-direction: column;

  .attestation {
    background: #fff8ed;
    color: #f3a54f;
    height: 74rpx;
    text-align: center;
    font-size: 28rpx;
    border-bottom: 1px solid rgba(243, 165, 79, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
}
</style>
