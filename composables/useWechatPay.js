/**
 * 微信支付 + 自动绑定微信 composable
 *
 * 解决手机号登录用户没有 openId 无法支付的问题：
 * 第一次支付失败报"用户未绑定微信"时，自动调用 uni.login() 获取 code，
 * 绑定 openId 后重试支付，整个过程对用户透明。
 */
import { bindWechat, payCloudCheck } from '@/utils/api'

/**
 * 发起微信支付（含自动绑定 openId 兜底）
 *
 * @param {Object} payParams       - { payType, taskId }
 * @returns {Object}               - payRes.data（含 timeStamp / nonceStr / package 等）
 */
export async function requestWechatPay(payParams) {
  try {
    return await payCloudCheck(payParams)
  } catch (e) {
    const msg = e?.msg || e?.message || ''
    if (!msg.includes('未绑定微信')) throw e

    // 自动绑定微信后重试
    await autoBindWechat()
    return await payCloudCheck(payParams)
  }
}

/**
 * 调用 uni.login() 获取 code，提交后端绑定 openId
 */
async function autoBindWechat() {
  let code
  try {
    const loginRes = await uni.login({ provider: 'weixin' })
    code = loginRes.code
  } catch (e) {
    throw new Error('获取微信授权失败，请重试')
  }
  if (!code) throw new Error('获取微信授权失败，请重试')
  await bindWechat({ code })
}
