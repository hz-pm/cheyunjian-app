<template>
  <view class="page">
    <view class="qa-list">
      <view class="qa-item" v-for="(item, index) in qaList" :key="index">
        <view class="question" @click="toggleItem(index)">
          <text class="q-icon">Q</text>
          <text class="q-text">{{ item.question }}</text>
          <text class="q-arrow" :class="{ open: item.open }">›</text>
        </view>
        <view class="answer" v-show="item.open">
          <text class="a-text">{{ item.answer }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const qaList = ref([
  {
    question: '什么是VIN码？在哪里可以找到？',
    answer: 'VIN（Vehicle Identification Number）即车辆识别代码，是车辆的"身份证"，共17位。可以在前挡风玻璃左下角、车门B柱标签、行驶证或发动机舱内找到。',
    open: false
  },
  {
    question: '车云检报告包含哪些内容？',
    answer: '车云检报告涵盖车辆基本信息、电池健康状态、充电记录分析、行驶历程数据、故障码记录等新能源车辆关键数据，帮助您全面了解车辆状况。',
    open: false
  },
  {
    question: '事故查询报告多久可以生成？',
    answer: '事故查询报告通常在支付完成后1-5分钟内生成。如遇网络拥堵或数据查询量大，可能需要更长时间，系统会自动轮询等待，请耐心等待。',
    open: false
  },
  {
    question: '维保查询报告包含哪些信息？',
    answer: '维保查询报告包含车辆的保险记录、维修记录、保养记录、过户记录等信息，帮助您了解车辆的完整使用历史。',
    open: false
  },
  {
    question: 'VIP会员有哪些优惠？',
    answer: 'VIP会员可享受车云检、事故查询、维保查询等服务的折扣优惠，以及专属客服支持。具体优惠详情请查看VIP购买页面。',
    open: false
  },
  {
    question: '支付失败怎么办？',
    answer: '如果支付失败，请检查微信支付余额是否充足、网络连接是否正常。如多次尝试失败，请联系客服处理。已扣款但未出报告的情况，请保存订单号联系客服退款。',
    open: false
  },
  {
    question: '如何联系客服？',
    answer: '您可以通过小程序内的客服功能、微信公众号或拨打客服热线联系我们。我们的工作时间为周一至周日 9:00-18:00。',
    open: false
  }
])

function toggleItem(index) {
  qaList.value[index].open = !qaList.value[index].open
}
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background-color: #f7fafa; padding: 30rpx; }

.qa-list {
  display: flex; flex-direction: column; gap: 16rpx;
  .qa-item {
    background: #fff; border-radius: 16rpx;
    overflow: hidden; box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);

    .question {
      display: flex; flex-direction: row; align-items: center;
      padding: 30rpx; gap: 16rpx;
      .q-icon {
        width: 44rpx; height: 44rpx; border-radius: 50%;
        background: #57ca9e; color: #fff; font-size: 24rpx;
        font-weight: bold; text-align: center; line-height: 44rpx;
        flex-shrink: 0;
      }
      .q-text { flex: 1; font-size: 28rpx; color: #333; font-weight: bold; line-height: 1.5; }
      .q-arrow {
        font-size: 36rpx; color: #ccc; transition: transform 0.2s;
        &.open { transform: rotate(90deg); color: #57ca9e; }
      }
    }

    .answer {
      padding: 0 30rpx 30rpx 74rpx;
      .a-text { font-size: 26rpx; color: #666; line-height: 1.7; }
    }
  }
}
</style>
