import request from '@/utils/request'

/* 

用户: personal
商家: merchant

*/

// 1.先封装请求路径
const loginUrl = {
  personal: '/user/login',
  merchant: '/merchant/login',
}

// 2. 封装请求
export function user_merchant_login(data, identityType) {
  return request({
    url: loginUrl[identityType],
    method: 'post',
    data,
  })
}
