import request from '@/utils/request'

// 首页推荐
export function getHomeRecommend() {
  return request({
    url: '/product/recommend',
    method: 'get',
  })
}

// 首页搜索
export function searchProducts(keyword) {
  return request({
    url: '/product/search',
    method: 'get',
    params: {
      keyword,
    },
  })
}
