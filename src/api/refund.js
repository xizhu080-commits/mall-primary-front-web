import request from '@/utils/request'

/* 
      申请退款  --->通知商家退款
*/
export function applyRefund(data) {
  return request({
    url: '/refund/apply',
    method: 'post',
    data: {
      suborderId: data.suborderId,
      orderId: data.orderId,
      refundReason: data.refundReason,
    },
  })
}

/* 
      商家处理退款 --->通知用户结果
 */
export function handleRefund(data) {
  return request({
    url: `/refund/handle/${data.refundId}`,
    method: 'post',
    data: {
      refundId: data.refundId,
      isAgree: data.isAgree,
      suborderId: data.suborderId,
      orderId: data.orderId,
      rejectReason: data.rejectReason,
    },
  })
}

/* 
查看退款详情
*/
export function getRefundDetail(data) {
  return request({
    url: '/refund/detail',
    method: 'post',
    data: {
      userId: data.userId,
      suborderId: data.suborderId,
      orderId: data.orderId,
    },
  })
}
