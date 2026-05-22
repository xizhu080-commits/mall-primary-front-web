import request from '@/utils/request'

//发布优惠卷
export function createCouponTemplate(data) {
  return request({
    url: 'coupon/publishCoupons',
    method: 'post',
    data,
  })
}

//修改优惠卷
export function updateCouponTemplate(data) {
  return request({
    url: '/coupon/updateCoupons',
    method: 'post',
    data,
  })
}

//删除优惠卷
export function deleteCouponTemplate(data) {
  return request({
    url: '/coupon/deleteCoupons',
    method: 'post',
    data,
  })
}

// 获取我发布的优惠卷
export function getCouponTemplateList(data) {
  return request({
    url: '/coupon/getCoupons',
    method: 'post',
    data,
  })
}

//领取优惠卷
export function receiveCoupon(templateId) {
  return request({
    url: '/coupon/receiveCoupon',
    method: 'post',
    data: {
      couponTemplateId: templateId,
    },
  })
}
