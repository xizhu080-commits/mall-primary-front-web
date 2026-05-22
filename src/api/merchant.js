import request from '@/utils/request'

// 1. 获取用户信息
// 封装请求
export function get_merchant_info() {
  return request({
    url: '/merchant/info',
    method: 'get',
  })
}
