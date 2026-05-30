import request from '@/utils/request'

//支付订单
export function payOrder(data) {
  return request({
    url: '/pay/alipay/create',
    method: 'post',
    data,
  })
}

/* 
      支付成功  --->通知商家发货
*/
export function notifyMerchant(data) {
  return request({
    url: '/payment/notify/merchant/ship',
    method: 'post',
    data: {
      paymentId: data.paymentId,
      suborderId: data.suborderId,
    },
  })
}

/* 
      支付成功  --->通知用户支付成功
*/
export function notifyUser(data) {
  return request({
    url: '/payment/notify/user/paymentSuccess',
    method: 'post',
    data: {
      paymentId: data.paymentId,
      orderId: data.orderId,
    },
  })
}
