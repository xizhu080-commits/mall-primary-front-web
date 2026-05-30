import request from '@/utils/request'

//获取子订单列表
export function getSuborderList() {
  return request({
    url: '/order/suborder/list',
    method: 'get',
  })
}

//获取订单详情
// 获取订单详情 - 确保参数正确传递
export function getSuborderDetail(suborderId) {
  return request({
    url: '/order/suborder/detail',
    method: 'get',
    params: {
      suborderId: suborderId || '',
    },
  })
}

//创建订单
export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data,
  })
}
