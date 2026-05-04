import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { post } from '@/utils/request'

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref('')
  const userInfo = ref({})
  const isVip = ref(false)
  const vipExpireTime = ref('')
  const vipCardName = ref('')

  // getters
  const isLoggedIn = computed(() => !!token.value)
  const nickname = computed(() => userInfo.value.nickname || userInfo.value.userName || '用户')
  const avatar = computed(() => userInfo.value.avatar || '')
  const phone = computed(() => userInfo.value.phone || '')

  // actions
  function setToken(newToken) {
    token.value = newToken
    uni.setStorageSync('token', newToken)
  }

  function setUserInfo(info) {
    userInfo.value = info
    // AppUser 实体无 isVip 字段，从 vipExpireTime 计算
    isVip.value = typeof info.isVip === 'boolean'
      ? info.isVip
      : !!(info.vipExpireTime && new Date(info.vipExpireTime) > new Date())
    vipExpireTime.value = info.vipExpireTime || ''
    uni.setStorageSync('userInfo', JSON.stringify(info))
  }

  function updateVipStatus(vipInfo) {
    isVip.value = vipInfo.isVip || false
    vipExpireTime.value = vipInfo.vipExpireTime || ''
    vipCardName.value = vipInfo.cardName || ''
    userInfo.value.isVip = vipInfo.isVip
    userInfo.value.vipExpireTime = vipInfo.vipExpireTime
    uni.setStorageSync('userInfo', JSON.stringify(userInfo.value))
    uni.setStorageSync('vipCardName', vipInfo.cardName || '')
  }

  function initFromStorage() {
    const savedToken = uni.getStorageSync('token')
    const savedUserInfo = uni.getStorageSync('userInfo')
    const savedVipCardName = uni.getStorageSync('vipCardName')

    if (savedToken) {
      token.value = savedToken
    }
    if (savedVipCardName) {
      vipCardName.value = savedVipCardName
    }
    if (savedUserInfo) {
      try {
        const info = typeof savedUserInfo === 'string' ? JSON.parse(savedUserInfo) : savedUserInfo
        userInfo.value = info
        isVip.value = typeof info.isVip === 'boolean'
          ? info.isVip
          : !!(info.vipExpireTime && new Date(info.vipExpireTime) > new Date())
        vipExpireTime.value = info.vipExpireTime || ''
      } catch (e) {
        console.error('解析用户信息失败', e)
      }
    }
  }

  function logout() {
    post('/index/user/logout', null, { silent: true, loading: false }).catch(() => {})
    token.value = ''
    userInfo.value = {}
    isVip.value = false
    vipExpireTime.value = ''
    vipCardName.value = ''
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('vipCardName')
    // 回到个人中心展示游客态，不强制跳登录页
    uni.reLaunch({ url: '/pages/main/mine' })
  }

  /**
   * 检查登录状态，未登录则跳转登录页
   */
  function checkLogin() {
    if (!token.value) {
      uni.navigateTo({ url: '/pages/login/login' })
      return false
    }
    return true
  }

  return {
    token,
    userInfo,
    isVip,
    vipExpireTime,
    vipCardName,
    isLoggedIn,
    nickname,
    avatar,
    phone,
    setToken,
    setUserInfo,
    updateVipStatus,
    initFromStorage,
    logout,
    checkLogin
  }
})
