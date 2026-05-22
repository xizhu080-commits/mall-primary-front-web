import request from '@/utils/request'

//新建地址
export function create_address(data) {
  return request({
    url: '/address/create',
    method: 'post',
    data,
  })
}

//更新地址
export function update_address(data) {
  return request({
    url: '/address/update',
    method: 'patch',

    data: {
      addressId: data.addressId,
      address: data.address,
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
    },
  })
}

//删除地址
export function delete_address(data) {
  return request({
    url: '/address/delete',
    method: 'delete',
    params: {
      addressId: data.addressId,
    },
  })
}

//获取地址列表
export function get_address_list() {
  return request({
    url: '/address/list',
    method: 'get',
  })
}
