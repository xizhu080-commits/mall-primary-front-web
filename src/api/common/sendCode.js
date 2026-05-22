import request from '@/utils/request'

/* 

用户: personal
商家: merchant

*/

const sendCodeUrl = {
  personal: '/user/sendCode',
  merchant: '/merchant/sendCode',
}

export function sendCode(data, identityType) {
  return request({
    url: sendCodeUrl[identityType],
    method: 'get',
    params: { phone: data },
  })
}
