import request from '@/utils/request'

/*
 * 获取指定对话框消息列表
 */
export function getSpectifyMessageList(data) {
  return request({
    url: '/messageRecord/getMessageListBySessionId',
    method: 'get',
    params: {
      // 如果前端未传入 beforeId（首次拉取），显式发送 null（后端要求首次为 null）
      beforeId: data.beforeId === undefined ? null : data.beforeId,
      sessionId: data.sessionId ?? '',
      // 支持前端传入的 `limit`，兼容旧参数 `pageNum`
      limit: data.limit ?? data.pageNum ?? 20,
    },
  })
}

/*
 * 获取当前用户所有对话框(会话列表)
 */
export function getAllSessionList(shopId) {
  return request({
    url: '/messageRecord/getSessionIds',
    method: 'get',
    params: {
      shopId: shopId,
    },
  })
}

/*
 * 标记当前对话框所有消息为已读
 */
export function markAllAsRead(sessionId, shopId) {
  return request({
    url: '/messageRecord/markAllAsRead',
    method: 'post',
    params: {
      sessionId: sessionId,
      shopId: shopId,
    },
  })
}

/*
 * 创建会话
 */
//后端返回:当前用户ID,会话ID(后端拼接的),对方ID,对方名称,对方头像,对方类型,Boolean exittrue表示数据库表存在该会话,false表示数据库表不存在该会话)
export function getOrCreateSession(data) {
  return request({
    url: '/userSession/createSession',
    method: 'post',
    data: {
      partnerId: data.partnerId || '',
      partnerName: data.partnerName || '',
      partnerAvatar: data.partnerAvatar || '',
      partnerType: data.partnerType || '未知',
      shopId: data.shopId || null,
    },
  })
}
