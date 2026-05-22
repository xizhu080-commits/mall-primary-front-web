import request from '@/utils/request'

// 获取店铺详情
export function getShopDetail(shopId) {
  return request({
    url: 'shop/getShopInfo',
    method: 'get',
    params: {
      shopId: shopId,
    },
  })
}

// 获取商户下的店铺列表
export function getShopListByMerchantId() {
  return request({
    url: 'shop/getShopListByMerchantId',
    method: 'get',
  })
}
