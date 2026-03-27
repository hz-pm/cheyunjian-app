import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const token = ref('')
  const userInfo = ref({})
  const isVip = ref(false)
  const vipExpireTime = ref('')

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
    isVip.value = info.isVip || false
    vipExpireTime.value = info.vipExpireTime || ''
    uni.setStorageSync('userInfo', JSON.stringify(info))
  }

  function updateVipStatus(vipInfo) {
    isVip.value = vipInfo.isVip || false
    vipExpireTime.value = vipInfo.vipExpireTime || ''
    userInfo.value.isVip = vipInfo.isVip
    userInfo.value.vipExpireTime = vipInfo.vipExpireTime
    uni.setStorageSync('userInfo', JSON.stringify(userInfo.value))
  }

  function initFromStorage() {
    const savedToken = uni.getStorageSync('token')
    const savedUserInfo = uni.getStorageSync('userInfo')

    if (savedToken) {
      token.value = savedToken
    }
    if (savedUserInfo) {
      try {
        const info = typeof savedUserInfo === 'string' ? JSON.parse(savedUserInfo) : savedUserInfo
        userInfo.value = info
        isVip.value = info.isVip || false
        vipExpireTime.value = info.vipExpireTime || ''
      } catch (e) {
        console.error('解析用户信息失败', e)
      }
    }
  }

  function logout() {
    token.value = ''
    userInfo.value = {}
    isVip.value = false
    vipExpireTime.value = ''
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
    uni.reLaunch({ url: '/pages/login/login' })
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
