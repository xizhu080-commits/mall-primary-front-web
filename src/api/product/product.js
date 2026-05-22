import request from '@/utils/request'

// 1. 获取用户信息
// 封装请求
export function createProduct(data) {
  return request({
    url: '/product/publish',
    method: 'post',
    data,
  })
}

// 删除商品
export function deleteProduct() {
  return request({
    url: '/product/publish',
    method: 'delete',
  })
}

// 更新商品
export function updateProduct(data) {
  return request({
    url: '/product/publish',
    method: 'post',
    data,
  })
}

//订单详情
export function getSuborderDetail(orderId, suborderId) {
  return request({
    url: `order/suborder/detail`,
    method: 'get',
  })
}

//查询订单列表
export function getSuborderList(status) {
  return request({
    url: '/order/suborder/list',
    method: 'get',
  })
}

// 商品详情
export function getProductDetail(spuId) {
  return request({
    url: `/product/detail/${spuId}`,
    method: 'get',
    spuId,
  })
}

//订单预览
export function getOrderPreview(data) {
  return request({
    url: `/order/preview`,
    method: 'post',
    data: data,
  })
}
