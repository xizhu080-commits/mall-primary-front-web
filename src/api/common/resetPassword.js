// src/api/resetPassword.js
import request from '@/utils/request'

// 重置密码API
const resetPasswordUrl = {
  personal: '/user/resetPassword',
  merchant: '/merchant/resetPassword',
}

export function resetPassword(data, identityType) {
  return request({
    url: resetPasswordUrl[identityType],
    method: 'post',
    data,
  })
}
