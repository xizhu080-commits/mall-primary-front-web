import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加 token
    const identityInfoStr = localStorage.getItem('mall-user_merchant-info')

    // ✅ 修改点：先判断是否登录了，如果没有登录就不添加 Authorization 头，避免发送无效的 token 导致请求失败
    if (identityInfoStr) {
      const identityInfo = JSON.parse(identityInfoStr)
      // ✅ 修改点：再判断解析后的对象是否存在 token
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
    console.error('请求错误:', error)
    return Promise.reject(error)
  },
)

export default request
