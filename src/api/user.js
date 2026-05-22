import request from '@/utils/request'

// 1. 获取用户信息
// 封装请求
export function get_user_info() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

// 更新用户信息
export function update_user_info(data) {
  return request({
    url: '/user/update',
    method: 'patch',
    data,
  })
}
