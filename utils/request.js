/**
 * 请求封装
 * 基于 uni.request，支持 token 自动注入、loading、统一错误处理
 */

const BASE_URL_IMG = 'https://xinnengyuanyunjian.top/images/'
// const BASE_URL = 'http://192.168.9.114:8099'
const BASE_URL = 'https://api.xinnengyuanyunjian.top'
const TOKEN_KEY = 'Authorization'

// 请求计数（用于控制 loading 显示/隐藏）
let requestCount = 0

function showLoading() {
  if (requestCount === 0) {
    uni.showLoading({ title: '加载中...', mask: true })
  }
  requestCount++
}

function hideLoading() {
  requestCount--
  if (requestCount <= 0) {
    requestCount = 0
    uni.hideLoading()
  }
}

/**
 * 统一请求方法
 * @param {Object} options
 * @param {string} options.url - 请求路径（不含 base url）
 * @param {string} [options.method='GET'] - 请求方法
 * @param {Object} [options.data] - 请求参数
 * @param {boolean} [options.loading=true] - 是否显示 loading
 * @param {boolean} [options.auth=true] - 是否需要 token
 * @param {boolean} [options.silent=false] - 静默模式：不弹 toast，不自动跳转登录
 * @returns {Promise}
 */
function request({ url, method = 'GET', data = {}, loading = true, auth = true, silent = false } = {}) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')

    const header = {
      'Content-Type': 'application/json'
    }

    if (auth && token) {
      header[TOKEN_KEY] = 'Bearer ' + token
    }

    if (loading) showLoading()

    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header,
      success: (res) => {
        if (loading) hideLoading()
        const { statusCode, data: resData } = res

        if (statusCode === 200) {
          // 业务状态码判断
          if (resData.code === 200 || resData.code === undefined) {
            resolve(resData)
          } else if (resData.code === 401 || resData.code === 403) {
            if (!silent) {
              const savedToken = uni.getStorageSync('token')
              if (savedToken) {
                // 有token但服务端返回401：token已过期，清除并跳转登录
                uni.removeStorageSync('token')
                uni.removeStorageSync('userInfo')
                uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
                setTimeout(() => {
                  uni.reLaunch({ url: '/pages/login/login' })
                }, 1500)
              }
            }
            // 无token时（游客状态）：静默拒绝，由调用方处理
            reject(resData)
          } else {
            if (!silent) uni.showToast({ title: resData.msg || '请求失败', icon: 'none' })
            reject(resData)
          }
        } else if (statusCode === 401) {
          if (!silent) {
            const savedToken = uni.getStorageSync('token')
            if (savedToken) {
              uni.removeStorageSync('token')
              uni.removeStorageSync('userInfo')
              uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
              setTimeout(() => {
                uni.reLaunch({ url: '/pages/login/login' })
              }, 1500)
            }
          }
          reject(res)
        } else {
          if (!silent) uni.showToast({ title: `请求错误(${statusCode})`, icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        if (loading) hideLoading()
        console.error('请求失败:', err)
        uni.showToast({ title: '网络请求失败，请检查网络', icon: 'none' })
        reject(err)
      }
    })
  })
}

// 便捷方法
export const get = (url, data, options = {}) => request({ url, method: 'GET', data, ...options })
export const post = (url, data, options = {}) => request({ url, method: 'POST', data, ...options })

export { BASE_URL, BASE_URL_IMG }
export default request
