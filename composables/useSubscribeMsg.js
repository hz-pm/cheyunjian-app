/**
 * 微信订阅消息授权
 * 在每次支付前调用，每授权一次允许后端推送一条对应模板消息。
 * 用户拒绝或模板ID未配置时静默跳过，不影响支付主流程。
 */
import { SUBSCRIBE_TMPL_IDS } from '@/utils/config'

export async function requestSubscribeMsg() {
  const ids = SUBSCRIBE_TMPL_IDS.filter(id => id && id.trim())
  if (ids.length === 0) return

  return new Promise(resolve => {
    uni.requestSubscribeMessage({
      tmplIds: ids,
      success: resolve,
      fail: resolve  // 用户拒绝或调用失败均不阻断支付流程
    })
  })
}
