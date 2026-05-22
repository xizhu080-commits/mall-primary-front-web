import request from '@/utils/request'

//支付订单
export function payOrder(data) {
  return request({
    url: '/pay/alipay/create',
    method: 'post',
    data,
  })
}
