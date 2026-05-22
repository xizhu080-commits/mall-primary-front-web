import request from '@/utils/request'

/* 

用户: personal
商家: merchant

*/

// 1.先封装请求路径
const registerUrl = {
  personal: '/user/register',
  merchant: '/merchant/register',
}
export function user_merchant_register(data, identityType) {
  return request({
    url: registerUrl[identityType],
    method: 'post',
    data,
  })
}
