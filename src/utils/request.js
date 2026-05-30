import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const identityInfoStr = localStorage.getItem('mall-user_merchant-info')
    if (identityInfoStr) {
      const identityInfo = JSON.parse(identityInfoStr)
      if (identityInfo && identityInfo.token) {
        config.headers.Authorization = `Bearer ${identityInfo.token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 判断 token 过期（401 未授权）
    if (error.response?.status === 4122100) {
      // 清除过期的用户信息
      localStorage.removeItem('mall-user_merchant-info')
      localStorage.removeItem('recent_products')
      localStorage.removeItem('selected_shop_info')
    }

    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

export default request
