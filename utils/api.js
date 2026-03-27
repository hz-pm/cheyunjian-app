/**
 * API 接口方法封装
 * 后端地址：https://api.xinnengyuanyunjian.top
 */

import { get, post } from './request'

/* ========== 认证相关 ========== */

/** 微信小程序登录 */
export const miniProgramLogin = (data) => post('/index/user/miniProgramLogin', data, { auth: false })

/** 账号密码登录 */
export const login = (data) => post('/index/user/login', data, { auth: false })

/** 手机验证码登录 */
export const loginByCode = (data) => post('/index/user/loginByCode', data, { auth: false })

/** 手机号注册 */
export const phoneReg = (data) => post('/index/user/phoneReg', data, { auth: false })

/** 发送短信验证码 */
export const sendSms = (data) => post('/sms/send', data, { auth: false })

/** 重置密码 */
export const resetPwd = (data) => post('/sms/resetPwd', data, { auth: false })

/** 获取用户信息 */
export const getUserInfo = () => get('/index/user/getUserInfo')

/** 获取微信 openId */
export const getWxOpenId = (params) => get('/index/user/getWxOpenId', params, { auth: false })

/* ========== 支付相关 ========== */

/**
 * 发起云检支付
 * @param {Object} data - { payType: 3, vinCode }
 * @returns {outTradeNo, timeStamp, nonceStr, package, signType, paySign}
 */
export const payCloudCheck = (data) => post('/Wx/payCloudCheck', data)

/**
 * 查询订单状态
 * @param {Object} params - { outTradeNo }
 */
export const queryOrder = (params) => get('/Wx/payCloudCheck/queryOrder', params)

/* ========== 车云检 ========== */

/**
 * 提交车云检
 * @param {Object} data - { vinCode, outTradeNo }
 */
export const checkCarNew = (data) => post('/index/cloud/checkCarNew', data)

/** 获取检测列表 */
export const getCheckList = (params) => get('/index/cloud/list', params)

/**
 * 获取检测报告详情
 * @param {Object} params - { vinCode }
 */
export const getCheckDetails = (params) => get('/index/cloud/getDetails', params)

/**
 * 获取报告图片 URL
 * @param {Object} params - { reportId, type, vinCode }
 */
export const getReportImgUrl = (params) => get('/index/cloud/reportImgUrl', params)

/* ========== 事故查询 ========== */

/**
 * 提交事故报告查询
 * @param {Object} data - { vinCode, outTradeNo, vinImg, personName }
 */
export const carAccidentsReport = (data) => post('/index/cloud/carAccidentsReport', data)

/**
 * 获取事故报告
 * @param {Object} params - { checkId }
 */
export const getSgReport = (params) => get('/index/cloud/getSgReport', params)

/* ========== 维保查询 ========== */

/**
 * 提交维保报告查询
 * @param {Object} data - { vinCode, outTradeNo, vinImg }
 */
export const carWbCreatedReport = (data) => post('/index/cloud/carWbCreatedReport', data)

/**
 * 获取维保报告
 * @param {Object} params - { checkId, payOrderId, isShare }
 */
export const getWbReport = (params) => get('/index/cloud/getWbReport', params)

/* ========== VIP ========== */

/** 获取 VIP 套餐列表 */
export const getVipCardList = () => get('/index/vip/getVipCardList')

/** 获取用户 VIP 信息 */
export const getUserVipInfo = () => get('/index/vip/getUserVipInfo')

/**
 * 购买 VIP
 * @param {Object} data - { vipCardId, outTradeNo }
 */
export const buyVip = (data) => post('/Wx/buyVip', data)
