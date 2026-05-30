import request from '@/utils/request'

/* 
    商家发货  --->通知用户发货成功
*/
export function notifyUser(logisticId) {
  return request({
    url: '/logistic/notify/user/shipSuccess',
    method: 'post',
    params: {
      logisticId: logisticId,
    },
  })
}

/* 
    用户处理物流  --->通知商家结果

*/
export function notifyMerchant(data) {
  return request({
    url: '/logistic/notify/merchant/handleLogistic',
    method: 'post',
    params: {
      logisticId: data.logisticId,
      isAgree: data.isAgree,
      rejectReason: data.rejectReason,
    },
  })
}

/* 
        物流到达  --->通知用户
*/
export function notifyUserArrive(logisticId) {
  return request({
    url: '/logistic/notify/user/arrive',
    method: 'post',
    params: {
      logisticId: logisticId,
    },
  })
}

//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================
//===============================================================================================================================================

/* 
发货
*/
export function ship(data) {
  return request({
    url: '/logistic/create',
    method: 'post',
    data: {
      //订单
      orderId: data.orderId,
      suborderId: data.suborderId,
      //物流
      logisticCompanyId: data.logisticCompanyId,
      logisticCompanyName: data.logisticCompanyName,
      //发货人
      shipperId: data.shipperId,
      shipper: data.shipper,
      shipperAddress: data.shipperAddress,
      //收货人
      consigneeId: data.consigneeId,
      consignee: data.consignee,
      consigneePhone: data.consigneePhone,
      consigneeAddress: data.consigneeAddress,
    },
  })
}

/* 
    处理物流
 */
export function handleLogistic(data) {
  return request({
    url: `/logistic/handle/${data.logisticId}`,
    method: 'post',
    params: {
      logisticId: data.logisticId,
      isAgree: data.isAgree,
      rejectReason: data.rejectReason,
    },
  })
}

/* 
手动通知签收
*/
export function notifySign(data) {
  return request({
    url: `/logistic/apply-sign/${data.suborderId}`,
    method: 'post',
    params: {
      suborderId: data.suborderId,
      logisticId: data.logisticId,
    },
  })
}
