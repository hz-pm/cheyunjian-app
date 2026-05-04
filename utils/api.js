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

/**
 * 绑定微信（手机号登录的用户支付前调用）
 * @param {Object} data - { code: uni.login() 返回的 code }
 */
export const bindWechat = (data) => post('/index/user/bindWechat', data)

/**
 * 绑定手机号（微信登录后调用）
 * @param {Object} data - { phone, code }
 */
export const bindPhone = (data) => post('/index/user/bindPhone', data)

/**
 * 上传车架号图片并识别 VIN（uni.uploadFile 直接调用，不走 request.js）
 * 返回：{ vin, url }
 */
export const VEHICLE_VIN_OCR_PATH = '/index/user/vehicleVinOCR'

/**
 * 上传行驶证图片并识别车辆信息（uni.uploadFile 直接调用，不走 request.js）
 * 返回：{ vin, owner, url }
 */
export const VEHICLE_LICENSE_OCR_PATH = '/index/user/vehicleLicenseOCR'

/**
 * 通用图片上传路径（uni.uploadFile 直接调用）
 * 返回：{ url }，用于签名图片等上传场景
 */
export const UPLOAD_IMAGE_PATH = '/index/user/upload'

/* ========== 支付相关 ========== */

/**
 * 创建预支付订单
 * @param {Object} data - { payType: 3=车云检/4=事故/5=维保, taskId }
 * @returns {outTradeNo, timeStamp, nonceStr, package, signType, paySign}
 */
export const payCloudCheck = (data) => post('/Wx/payCloudCheck', data)

/**
 * 查询订单状态
 * @param {Object} params - { outTradeNo }
 */
export const queryOrder = (params) => get('/Wx/payCloudCheck/queryOrder', params)

/* ========== 检测任务 ========== */

/**
 * 查询服务价格及会员折扣信息（创建任务前可调用）
 * @param {Object} params - { type: 1=车云检/2=事故/3=维保 }
 */
export const queryTaskPrice = (params) => get('/index/check/task/price', params)

/**
 * 创建检测任务（支付前调用，返回 taskId）
 * @param {Object} data - { type, vinCode, vinImg?, personName?, useDiscount? }
 */
export const createCheckTask = (data) => post('/index/check/task/create', data)

/**
 * 执行检测任务（支付完成后调用）
 * @param {number} taskId
 */
export const executeCheckTask = (taskId) => post(`/index/check/task/execute?taskId=${taskId}`)

/**
 * 分页查询任务列表
 * @param {Object} params - { type?, pageNum?, pageSize? }
 * @returns TableDataInfo - { code, rows, total }
 */
export const getCheckList = (params) => get('/index/check/task/list', params)

/**
 * 获取检测报告详情（车云检，按 VIN）
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
 * 轮询事故报告（支付并执行任务后调用）
 * @param {Object} params - { taskId }
 * @returns { status: 'generated'|'generating', reportUrl? }
 */
export const getAccidentReport = (params) => get('/index/check/task/report/accident', params)

/* ========== 维保查询 ========== */

/**
 * 轮询维保报告（支付并执行任务后调用）
 * @param {Object} params - { taskId, isShare? }
 * @returns { data: reportData }
 */
export const getMaintenanceReport = (params) => get('/index/check/task/report/maintenance', params)

/* ========== VIP ========== */

/** 获取 VIP 套餐列表 */
export const getVipCardList = () => get('/index/vip/getVipCardList')

/**
 * 升级预览：查看剩余天数折算结果（已是VIP时升级前调用）
 * @param {Object} params - { vipCardId }
 * @returns { currentCardName, remainingDays, convertedDays, newCardDays, totalDays, newExpireTime }
 */
export const upgradePreview = (params) => get('/index/vip/upgradePreview', params)

/** 获取用户 VIP 信息 */
export const getUserVipInfo = () => get('/index/vip/getUserVipInfo')

/**
 * 购买 VIP（创建预支付订单）
 * @param {Object} data - { vipCardId }
 */
export const buyVip = (data) => post('/index/vip/buyVip', data)

/**
 * 支付成功后主动触发VIP权益下发（兜底，防止回调漏发）
 * @param {string} outTradeNo - 商户订单号
 */
export const processBuyVip = (outTradeNo) => post(`/index/vip/processBuyVip?outTradeNo=${outTradeNo}`)
