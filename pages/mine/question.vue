<template>
  <view class="page">
    <view class="qa-list">
      <view class="qa-item" v-for="(item, index) in displayList" :key="index">
        <view class="question" @click="toggleItem(index)">
          <text class="q-icon">Q</text>
          <text class="q-text">{{ item.title }}</text>
          <text class="q-arrow" :class="{ open: item.open }">›</text>
        </view>
        <view class="answer" v-show="item.open">
          <text class="a-text" v-for="(line, i) in item.content" :key="i">{{ line }}</text>
        </view>
      </view>
    </view>
    <view class="footer-tip">若您仍有疑问，可通过公众号或小程序联系客服与我们沟通。</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 通用问题
const qListGeneral = [
  {
    title: '什么是VIN码？在哪里可以找到？',
    content: ['VIN（Vehicle Identification Number）即车辆识别代码，是车辆的"身份证"，共17位。可以在前挡风玻璃左下角、车门B柱标签、行驶证或发动机舱内找到。']
  },
  {
    title: '车云检报告包含哪些内容？',
    content: ['车云检报告涵盖车辆基本信息、电池健康状态、充电记录分析、行驶历程数据、故障码记录等新能源车辆关键数据，帮助您全面了解车辆状况。']
  },
  {
    title: 'VIP会员有哪些优惠？',
    content: ['VIP会员可享受车云检、事故查询、维保查询等服务的折扣优惠，以及专属客服支持。具体优惠详情请查看VIP购买页面。']
  },
  {
    title: '支付失败怎么办？',
    content: ['如果支付失败，请检查微信支付余额是否充足、网络连接是否正常。如多次尝试失败，请联系客服处理。已扣款但未出报告的情况，请保存订单号联系客服退款。']
  },
  {
    title: '如何联系客服？',
    content: ['您可以通过小程序内的客服功能、微信公众号或拨打客服热线联系我们。我们的工作时间为周一至周日 9:00-18:00。']
  }
]

// 事故查询常见问题（qType=3）
const qList3 = [
  {
    title: '为什么我这辆车查不到出险记录？',
    content: ['有可能没出险，也可能是投保公司目前还没有与我们合作（小的保险公司基本都没有合作）。']
  },
  {
    title: '这辆车的所有出险记录，都能查出来吗？',
    content: ['不一定，主要取决于投保公司的大小，因为小的保险公司数据基本都是没有对外开放连接的。大的保险公司基本都可查。如果这辆车换过保险公司，就有可能小的保险公司那段时间查不出来。']
  },
  {
    title: '对方全责，并且对方理赔，能查出来吗？',
    content: ['不管是否对方责任，或对方理赔，只要自己这边有向保险公司保案，就会有记录。']
  },
  {
    title: '为什么我的出险记录显示理赔金额为0元？',
    content: ['此情况很大可能为对方车辆全责，对方车辆保险公司负责理赔，己方有向保险公司报案。']
  },
  {
    title: '为什么我的出险记录没有列明维修材料？',
    content: ['此情况很大可能为对方车辆全责，对方车辆保险公司负责理赔，己方有向保险公司报案。']
  }
]

// 维保查询常见问题（qType=4）
const qList4 = [
  {
    title: '为什么有的车查不了？',
    content: ['因为有些品牌的车4S数据没有对外开放，只能依靠人工查。']
  },
  {
    title: '为什么跟别家报告部分数据不同？',
    content: ['因为数据提供方不同。']
  },
  {
    title: '为什么有些车出过事故却查不到？',
    content: ['如果出了事故没到4S店修，通过4S记录是查不到的。']
  },
  {
    title: '为什么中间有几年没有记录？',
    content: ['因为车主这段时间没在4S店修，所以没有记录。']
  },
  {
    title: '查询多长时间出报告，没查到退费吗？',
    content: ['通常2分钟左右会出报告，部分品牌时间会长一些，并没有微信通知。如该品牌没开放查询，或查询的记录为空，请联系人工客服退款。']
  }
]

const listMap = { '3': qList3, '4': qList4 }

const displayList = ref([])

onLoad((options) => {
  const source = listMap[options?.qType] || qListGeneral
  displayList.value = source.map(item => ({ ...item, open: false }))
})

function toggleItem(index) {
  displayList.value[index].open = !displayList.value[index].open
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f7fafa;
  padding: 30rpx 30rpx 60rpx;
}

.qa-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.qa-item {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.question {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30rpx;
  gap: 16rpx;

  .q-icon {
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    background: #57ca9e;
    color: #fff;
    font-size: 24rpx;
    font-weight: bold;
    text-align: center;
    line-height: 44rpx;
    flex-shrink: 0;
  }

  .q-text {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
    line-height: 1.5;
  }

  .q-arrow {
    font-size: 36rpx;
    color: #ccc;
    flex-shrink: 0;

    &.open {
      transform: rotate(90deg);
      color: #57ca9e;
    }
  }
}

.answer {
  padding: 0 30rpx 30rpx 74rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;

  .a-text {
    font-size: 26rpx;
    color: #666;
    line-height: 1.7;
    display: block;
  }
}

.footer-tip {
  font-size: 26rpx;
  color: #999;
  text-align: center;
  margin-top: 40rpx;
  line-height: 1.6;
}
</style>
