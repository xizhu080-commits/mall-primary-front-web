消息无法实时接收,得等一会儿才接收到消息!并且发不了消息(提示:当前网络未连接,消息发送失败)
<template>
  <div>
    <!-- 店铺选择窗口（点击悬浮按钮或店铺切换按钮时弹出） -->
    <transition name="modal-fade">
      <div v-if="shopSelectorVisible" class="shop-selector-overlay" @click.self="closeShopSelector">
        <div class="shop-selector-modal">
          <div class="modal-header">
            <div class="modal-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9L12 3L21 9L12 15L3 9Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  fill="none"
                />
                <path
                  d="M5 12V18L12 22L19 18V12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  fill="none"
                />
                <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
              </svg>
              <span>选择店铺</span>
            </div>
            <button class="modal-close-btn" @click="closeShopSelector">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <div class="shop-grid">
              <div
                v-for="shop in shops"
                :key="shop.shopId"
                class="shop-card"
                @click="selectShopAndOpenChat(shop)"
              >
                <div class="shop-card-avatar" :style="{ background: shop.avatarColor }">
                  <img
                    v-if="isImageUrl(shop.shopLogo)"
                    :src="shop.shopLogo"
                    :alt="shop.shopName"
                    class="avatar-image"
                    @error="handleShopImageError(shop)"
                  />
                  <span v-else class="shop-default-icon">{{ shop.shopLogo || '🏪' }}</span>
                  <span v-if="shop.totalUnreadCount > 0" class="unread-badge-large">{{
                    shop.totalUnreadCount > 99 ? '99+' : shop.totalUnreadCount
                  }}</span>
                </div>
                <div class="shop-card-info">
                  <div class="shop-card-name">{{ shop.shopName }}</div>
                  <div class="shop-card-status">
                    <span :class="['status-dot', shop.connected ? 'online' : 'offline']"></span>
                    <span>{{ shop.connected ? '在线' : '离线' }}</span>
                  </div>
                  <div class="shop-card-preview" v-if="shop.lastMessage">
                    {{ shop.lastMessage }}
                  </div>
                  <div class="shop-card-preview" v-else>暂无消息</div>
                </div>
              </div>
            </div>

            <div v-if="shops.length === 0" class="empty-shops">
              <div class="empty-icon">🏪</div>
              <p>暂无店铺，请联系管理员</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 主聊天面板 -->
    <transition name="slide-fade">
      <div v-if="visible && currentShop" class="chat-panel">
        <!-- 左上角店铺切换按钮 - 显示真实店铺logo和名称 -->
        <div class="panel-header-bar">
          <button class="switch-shop-btn" @click="openShopSelector">
            <div class="shop-btn-avatar" :style="{ background: currentShop.avatarColor }">
              <img
                v-if="isImageUrl(currentShop.shopLogo)"
                :src="currentShop.shopLogo"
                :alt="currentShop.shopName"
                class="shop-btn-image"
                @error="handleShopImageError(currentShop)"
              />
              <span v-else>{{ currentShop.shopLogo || '🏪' }}</span>
            </div>
            <span class="shop-btn-name">{{ currentShop.shopName }}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <!-- 左侧联系人列表 -->
        <div class="contact-sidebar" :class="{ collapsed: sidebarCollapsed }">
          <div class="sidebar-header">
            <div class="sidebar-title">聊天</div>
            <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="contact-list">
            <transition-group name="contact-fade" tag="div">
              <div
                v-for="contact in currentContacts"
                :key="contact.id"
                :class="[
                  'contact-item',
                  { active: currentContact?.id === contact.id, unread: contact.unreadCount > 0 },
                ]"
                @click="switchContact(contact)"
              >
                <div class="contact-avatar" :style="{ background: contact.avatarColor }">
                  <img
                    v-if="isImageUrl(contact.avatar)"
                    :src="contact.avatar"
                    :alt="contact.name"
                    class="avatar-image"
                    @error="handleImageError(contact)"
                  />
                  <span v-else>{{ contact.avatar || getDefaultAvatar(contact.partnerType) }}</span>
                  <span v-if="contact.unreadCount > 0" class="unread-badge-small">{{
                    contact.unreadCount > 99 ? '99+' : contact.unreadCount
                  }}</span>
                </div>
                <div class="contact-info" v-if="!sidebarCollapsed">
                  <div class="contact-name">{{ contact.name }}</div>
                  <div class="contact-preview">{{ contact.lastMessage || '暂无消息' }}</div>
                  <div class="contact-time" v-if="contact.lastMessageTime">
                    {{ formatShortTime(contact.lastMessageTime) }}
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- 右侧聊天区域 -->
        <div class="chat-area">
          <transition name="shop-switch" mode="out-in">
            <div :key="currentShop?.shopId" class="chat-content-wrapper">
              <!-- 聊天头部 -->
              <div class="chat-header" v-if="currentContact">
                <div class="header-info">
                  <div class="chat-name">{{ currentContact.name }}</div>
                  <div class="chat-status">
                    <span
                      :class="[
                        'status-dot',
                        {
                          online: getShopConnectionStatus(currentShop?.shopId),
                          offline: !getShopConnectionStatus(currentShop?.shopId),
                        },
                      ]"
                    ></span>
                    <span>{{
                      getShopConnectionStatus(currentShop?.shopId) ? '在线' : '离线'
                    }}</span>
                  </div>
                </div>
                <div class="header-actions">
                  <button class="icon-btn minimize-btn" @click="minimizePanel">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 12H4"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <button class="icon-btn delete-btn" @click="showDeleteConfirm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 5H4M7 5V4C7 3.46957 7.21071 2.96086 7.58579 2.58579C7.96086 2.21071 8.46957 2 9 2H15C15.5304 2 16.0391 2.21071 16.4142 2.58579C16.7893 2.96086 17 3.46957 17 4V5M18 5V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H8C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19V5H18Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M10 10V16M14 10V16"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- 消息列表区域 -->
              <div class="chat-messages" ref="messagesContainer">
                <div v-if="!currentContact" class="empty-chat">
                  <div class="empty-icon">💬</div>
                  <p>选择一个联系人开始聊天</p>
                </div>

                <template v-else>
                  <div class="system-message" v-if="!getShopConnectionStatus(currentShop?.shopId)">
                    <span class="system-text">当前店铺网络不可用，消息将无法实时接收</span>
                  </div>

                  <div class="load-more-trigger" ref="loadMoreTrigger"></div>

                  <div v-if="isLoadingMore" class="loading-more-wrapper">
                    <div class="loading-more">
                      <div class="loading-bubble">
                        <span class="loading-dot"></span>
                        <span class="loading-dot"></span>
                        <span class="loading-dot"></span>
                        <span class="loading-text"> 正在加载消息... </span>
                      </div>
                    </div>
                  </div>

                  <div
                    v-else-if="!hasMoreMessages && currentMessages.length > 0"
                    class="no-more-messages"
                  >
                    <span>———— 已经没有更多消息了 ————</span>
                  </div>

                  <div
                    v-for="(msg, idx) in currentMessages"
                    :key="msg.id"
                    class="message-wrapper"
                    :data-msg-id="msg.id"
                  >
                    <div
                      class="message-time-divider"
                      v-if="shouldShowTimeDivider(msg, idx, currentMessages)"
                    >
                      {{ formatDate(msg.time) }}
                    </div>

                    <div v-if="msg.isSystem" class="system-tip">
                      {{ msg.content }}
                    </div>

                    <div
                      v-else
                      :class="['message-item', msg.isSelf ? 'message-self' : 'message-other']"
                    >
                      <div class="message-avatar" v-if="!msg.isSelf">
                        <div class="avatar" :style="{ background: currentContact?.avatarColor }">
                          <img
                            v-if="currentContact && isImageUrl(currentContact.avatar)"
                            :src="currentContact.avatar"
                            :alt="currentContact.name"
                            class="avatar-image"
                            @error="handleImageError(currentContact)"
                          />
                          <span v-else>{{
                            currentContact?.avatar || getDefaultAvatar(currentContact?.partnerType)
                          }}</span>
                        </div>
                      </div>
                      <div class="message-bubble-wrapper">
                        <div class="message-bubble">
                          <div class="message-text">{{ msg.content }}</div>
                        </div>
                        <div class="message-meta">
                          <span class="message-time-small">{{ formatTime(msg.time) }}</span>
                          <span v-if="msg.isSelf" class="message-status">已读</span>
                        </div>
                      </div>
                      <div class="message-avatar" v-if="msg.isSelf">
                        <div class="avatar self-avatar">店</div>
                      </div>
                    </div>
                  </div>

                  <div ref="scrollAnchor"></div>
                </template>
              </div>

              <!-- 底部输入区域 -->
              <div class="chat-footer" v-if="currentContact">
                <div class="input-wrapper">
                  <input
                    type="text"
                    v-model="inputMessage"
                    @keyup.enter="sendMessage"
                    :placeholder="`发送消息给 ${currentContact.name}...`"
                    class="chat-input"
                    :disabled="!getShopConnectionStatus(currentShop?.shopId)"
                  />
                  <button
                    class="send-btn"
                    @click="sendMessage"
                    :disabled="
                      !getShopConnectionStatus(currentShop?.shopId) || !inputMessage.trim()
                    "
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    发送
                  </button>
                </div>
                <div class="footer-tools">
                  <button
                    class="tool-btn"
                    @click="testConnection"
                    :class="{ active: !allShopsConnected }"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M23 4V10H17M1 20V14H7M3.51 9C5.73 5.46 9.66 3 14.17 3C20.25 3 25.08 7.83 25.08 13.92C25.08 20 20.25 24.83 14.17 24.83C8.09 24.83 3.26 20 3.26 13.92"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    {{ allShopsConnected ? '已连接' : '重连' }}
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- 删除确认对话框 -->
    <div
      v-if="deleteConfirmVisible"
      class="confirm-overlay"
      @click.self="deleteConfirmVisible = false"
    >
      <div class="confirm-dialog">
        <div class="confirm-icon">🗑️</div>
        <div class="confirm-title">确定要删除聊天记录吗？</div>
        <div class="confirm-message">删除后将无法恢复，确定清空所有聊天记录吗？</div>
        <div class="confirm-actions">
          <button class="confirm-btn cancel" @click="deleteConfirmVisible = false">取消</button>
          <button class="confirm-btn confirm" @click="confirmDeleteMessages">确定删除</button>
        </div>
      </div>
    </div>

    <!-- 悬浮按钮 -->
    <button
      class="chat-fab"
      @click="handleFabClick"
      :class="{ active: visible, hasNew: totalUnreadCount > 0 }"
    >
      <div class="fab-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
            fill="currentColor"
          />
          <circle cx="8" cy="10" r="1.5" fill="white" />
          <circle cx="12" cy="10" r="1.5" fill="white" />
          <circle cx="16" cy="10" r="1.5" fill="white" />
        </svg>
      </div>
      <span class="unread-badge" v-if="totalUnreadCount > 0">{{
        totalUnreadCount > 99 ? '99+' : totalUnreadCount
      }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import webSocketService, { sendSocketMessage } from '@/utils/websocket'
import { getSpectifyMessageList, getAllSessionList, markAllAsRead } from '@/api/message'
import { getShopListByMerchantId } from '@/api/shop'

// ==================== 响应式数据 ====================
const shops = ref([])
const currentShop = ref(null)
const shopSelectorVisible = ref(false)
const visible = ref(false)
const inputMessage = ref('')
const messagesContainer = ref(null)
const scrollAnchor = ref(null)
const loadMoreTrigger = ref(null)
const sidebarCollapsed = ref(false)
const currentContactId = ref('')
const deleteConfirmVisible = ref(false)
const isLoadingMore = ref(false)
const hasMoreMessages = ref(true)
const hasSelectedShop = ref(false)

// 商家信息
const merchantInfo = localStorage.getItem('mall-user_merchant-info')
const info = JSON.parse(merchantInfo)
const merchantId = ref(info.merchantId)
const merchantType = ref(info.identityType === '商家' ? 'MERCHANT' : 'USER')
const token = ref(info.token)

//选中的店铺信息
const selectedShopInfo = localStorage.getItem('selected_shop_info')
const shopInfo = JSON.parse(selectedShopInfo)
const currentMerchantUsedShopId = ref(shopInfo.shopId)
const currentShopId = ref(shopInfo.shopId)
// WebSocket全局连接状态
const wsGlobalConnected = ref(false)

// 定时器和观察者
let statusInterval = null
let messageRefreshInterval = null
let intersectionObserver = null
let loadMoreLock = false
let shouldAutoScroll = true

// 本地存储key
const STORAGE_KEY = 'selected_shop_info'

// ==================== 计算属性 ====================

const currentContacts = computed(() => {
  if (!currentShop.value) return []
  return currentShop.value.contacts || []
})

const currentContact = computed(() => {
  return currentContacts.value.find((c) => c.id === currentContactId.value)
})

const currentMessages = computed(() => {
  return currentContact.value?.messages || []
})

const totalUnreadCount = computed(() => {
  return shops.value.reduce((sum, shop) => sum + (shop.totalUnreadCount || 0), 0)
})

const allShopsConnected = computed(() => {
  if (shops.value.length === 0) return false
  // 修复：使用 connected 而不是 wsConnected
  return shops.value.every((shop) => shop.connected === true)
})

// ==================== 工具函数 ====================

const log = (type, message, data = null) => {
  const prefix = '[商家聊天组件]'
  switch (type) {
    case 'info':
      console.log(prefix, message, data || '')
      break
    case 'error':
      console.error(prefix, message, data || '')
      break
    case 'warn':
      console.warn(prefix, message, data || '')
      break
    default:
      console.log(prefix, message, data || '')
  }
}

const saveLastSelectedShop = (shop) => {
  if (shop) {
    const shopInfo = {
      shopId: shop.shopId,
      shopName: shop.shopName,
      logo: shop.logo,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shopInfo))
  }
}

const getLastSelectedShop = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    log('error', '读取本地存储失败', error)
  }
  return null
}

const handleFabClick = () => {
  if (!visible.value) {
    if (!hasSelectedShop.value || !currentShop.value) {
      openShopSelector()
    } else {
      visible.value = true
      // 打开时刷新一次消息
      if (currentShop.value && currentContact.value) {
        loadSessionMessagesForShop(currentShop.value, currentContact.value.sessionId)
      }
    }
  } else {
    visible.value = false
  }
}

const isImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  return (
    (url.startsWith('http://') || url.startsWith('https://')) &&
    /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i.test(url)
  )
}

const handleImageError = (contact) => {
  contact.avatar = getDefaultAvatar(contact.partnerType)
}

const handleShopImageError = (shop) => {
  shop.logo = '🏪'
}

const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const formatDate = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return '今天'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '昨天'
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }
}

const formatShortTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date >= today) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  } else if (date >= yesterday) {
    return '昨天'
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`
  }
}

const shouldShowTimeDivider = (msg, idx, messages) => {
  if (idx === 0) return true
  const prevMsg = messages[idx - 1]
  if (!prevMsg) return true

  const currentDate = new Date(msg.time).toDateString()
  const prevDate = new Date(prevMsg.time).toDateString()
  return currentDate !== prevDate
}

const getDefaultAvatar = (partnerType) => {
  const avatarMap = {
    USER: '👤',
    MERCHANT: '🏪',
    REFUND: '💸',
    LOGISTIC: '📦',
    PAYMENT: '💰',
  }
  return avatarMap[partnerType] || '💬'
}

const getShopColor = (index) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  ]
  return colors[index % colors.length]
}

const getShopConnectionStatus = (shopId) => {
  if (!shopId) return false
  const shop = shops.value.find((s) => s.shopId === shopId)
  // 修复：使用全局连接状态或店铺连接状态
  return shop?.connected || wsGlobalConnected.value || false
}

// ==================== 滚动控制 ====================

const isNearBottom = () => {
  const container = messagesContainer.value
  if (!container) return true
  const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight
  return distanceToBottom < 100
}

const scrollToBottomIfNeeded = async () => {
  if (!shouldAutoScroll) return
  if (isLoadingMore.value) return

  await nextTick()
  if (scrollAnchor.value) {
    scrollAnchor.value.scrollIntoView({ behavior: 'auto', block: 'end' })
  }
}

const forceScrollToBottom = async () => {
  await nextTick()
  if (scrollAnchor.value) {
    scrollAnchor.value.scrollIntoView({ behavior: 'auto', block: 'end' })
  }
  shouldAutoScroll = true
}

const handleUserScroll = () => {
  if (!messagesContainer.value) return
  if (isNearBottom()) {
    shouldAutoScroll = true
  } else {
    shouldAutoScroll = false
  }
}

// ==================== WebSocket 连接管理 ====================

// 建立全局WebSocket连接
const establishGlobalWebSocket = async (retryCount = 0) => {
  if (!merchantId.value || !token.value) {
    log('warn', '缺少必要参数，无法连接WebSocket')
    return false
  }

  if (webSocketService.isConnected()) {
    log('info', 'WebSocket已连接')
    wsGlobalConnected.value = true
    // 更新所有店铺的连接状态
    shops.value.forEach((shop) => {
      shop.connected = true
    })
    return true
  }

  try {
    log('info', `尝试连接WebSocket (第 ${retryCount + 1} 次)`)
    console.log(
      '传入的参数(商家ID,token,店铺ID):',
      merchantId.value,
      token.value,
      currentMerchantUsedShopId.value,
    )

    await webSocketService.connect(
      currentMerchantUsedShopId.value,
      token.value,
      currentMerchantUsedShopId.value,
    )
    //  await webSocketService.connect(merchantId.value, token.value, currentMerchantUsedShopId.value)

    webSocketService.subscribeAllChannels()
    wsGlobalConnected.value = true
    shops.value.forEach((shop) => {
      shop.connected = true
    })
    log('info', 'WebSocket连接成功')
    return true
  } catch (error) {
    log('error', 'WebSocket连接失败', error)
    wsGlobalConnected.value = false

    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 2000
      setTimeout(() => establishGlobalWebSocket(retryCount + 1), delay)
    }
    return false
  }
}

// ==================== 店铺管理 ====================

const fetchShops = async () => {
  log('info', '开始获取商家店铺列表')

  try {
    const response = await getShopListByMerchantId()

    if (response.code === 200 && response.data) {
      const shopList = response.data

      shops.value = shopList.map((shop, index) => ({
        merchantId: shop.merchantId,
        shopId: shop.shopId,
        shopName: shop.shopName,
        shopLogo: shop.shopLogo || '🏪',
        avatarColor: getShopColor(index),
        totalUnreadCount: 0,
        lastMessage: '',
        contacts: [],
        connected: wsGlobalConnected.value, // 使用全局连接状态
      }))

      // 为每个店铺加载会话
      for (const shop of shops.value) {
        await fetchSessionListForShop(shop)
      }

      // 恢复上次选择的店铺
      const lastShopInfo = getLastSelectedShop()
      if (lastShopInfo && shops.value.length > 0) {
        const lastShop = shops.value.find((s) => s.shopId === lastShopInfo.shopId)
        if (lastShop) {
          currentShop.value = lastShop
          hasSelectedShop.value = true
          if (lastShop.contacts && lastShop.contacts.length > 0) {
            currentContactId.value = lastShop.contacts[0].id
          }
        } else {
          currentShop.value = shops.value[0]
          hasSelectedShop.value = false
        }
      } else if (shops.value.length > 0) {
        currentShop.value = shops.value[0]
        hasSelectedShop.value = false
      }

      return true
    }
    return false
  } catch (error) {
    log('error', '获取店铺列表异常', error)
    return false
  }
}

const selectShopAndOpenChat = async (shop) => {
  currentShop.value = shop
  hasSelectedShop.value = true
  saveLastSelectedShop(shop)
  shopSelectorVisible.value = false

  if (!visible.value) {
    visible.value = true
  }

  currentContactId.value = ''

  if (!shop.contacts || shop.contacts.length === 0) {
    await fetchSessionListForShop(shop)
  }

  if (shop.contacts && shop.contacts.length > 0 && !currentContactId.value) {
    currentContactId.value = shop.contacts[0].id
    await loadSessionMessagesForShop(shop, shop.contacts[0].sessionId)
  }

  shouldAutoScroll = true
  await forceScrollToBottom()
}

const openShopSelector = () => {
  shopSelectorVisible.value = true
}

const closeShopSelector = () => {
  shopSelectorVisible.value = false
}

const fetchSessionListForShop = async (shop) => {
  if (!shop || !shop.shopId) return
  currentShopId.value = shop.shopId
  console.log('开始获取店铺会话列表:', shop.shopId)
  console.log('开始获取店铺会话列表:', currentShopId.value)
  try {
    const response = await getAllSessionList(shop.shopId)

    if (response.code === 200 && response.data) {
      const sessionList = response.data

      const newContacts = sessionList.map((session) => ({
        id: session.sessionId,
        sessionId: session.sessionId,
        name: session.partnerName || '',
        avatar: session.partnerAvatar || getDefaultAvatar(session.partnerType),
        partnerId: session.partnerId,
        partnerType: session.partnerType,
        unreadCount: session.unreadCount || 0,
        lastMessage: session.lastMessage || '',
        lastMessageTime: session.lastMessageTime,
        messages: [],
      }))

      shop.contacts = newContacts
      shop.totalUnreadCount = newContacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0)

      if (newContacts.length > 0 && newContacts[0].lastMessage) {
        shop.lastMessage = newContacts[0].lastMessage
      }

      // 如果是当前选中的店铺，自动选中第一个联系人
      if (
        currentShop.value?.shopId === shop.shopId &&
        newContacts.length > 0 &&
        !currentContactId.value
      ) {
        currentContactId.value = newContacts[0].id
        await loadSessionMessagesForShop(shop, newContacts[0].sessionId)
      }
    }
  } catch (error) {
    log('error', `获取店铺 ${shop.shopName} 会话列表异常`, error)
  }
}

const loadSessionMessagesForShop = async (shop, sessionId, beforeId = null, isLoadMore = false) => {
  if (!sessionId || !shop) return

  try {
    const params = {
      sessionId: sessionId,
      limit: 20,
      beforeId: beforeId,
      shopId: shop.shopId,
    }

    const response = await getSpectifyMessageList(params)

    if (response.code === 200 && Array.isArray(response.data)) {
      const messageRecords = response.data

      const newMessages = messageRecords.map((record) => {
        let isSelf = false
        // 修复：判断消息是否为自己发送
        if (record.messagePublisherId) {
          isSelf = record.messagePublisherId === shop.shopId
        }
        return {
          id: record.messageRecordId,
          content: record.content,
          time: record.createTime,
          isSelf: isSelf,
          isSystem:
            record.messagePublisherType === 'SYSTEM' ||
            ['PAYMENT', 'REFUND', 'LOGISTIC'].includes(record.messagePublisherType),
          isRead: record.isRead,
          publisherId: record.messagePublisherId,
          publisherType: record.messagePublisherType,
          targetUserId: record.targetUserId,
          targetUserType: record.targetUserType,
          sessionId: record.sessionId,
        }
      })

      newMessages.sort((a, b) => new Date(a.time) - new Date(b.time))

      let contact = shop.contacts.find((c) => c.sessionId === sessionId)

      if (!contact) {
        contact = {
          id: sessionId,
          sessionId: sessionId,
          name: '加载中...',
          avatar: '💬',
          messages: [],
          unreadCount: 0,
          shopId: shop.shopId,
        }
        shop.contacts.push(contact)
      }

      if (isLoadMore) {
        const existingIds = new Set(contact.messages.map((m) => m.id))
        const toPrepend = newMessages.filter((m) => !existingIds.has(m.id))
        contact.messages = toPrepend.concat(contact.messages)
      } else {
        contact.messages = newMessages
      }

      hasMoreMessages.value = messageRecords.length >= (params.limit || 20)

      if (contact.messages.length > 0) {
        const lastMsg = contact.messages[contact.messages.length - 1]
        contact.lastMessage =
          lastMsg.content.length > 50 ? lastMsg.content.substring(0, 50) + '...' : lastMsg.content
        contact.lastMessageTime = lastMsg.time
      }
    }
  } catch (error) {
    log('error', '加载会话消息异常', error)
  }
}

const markSessionAsRead = async (sessionId, shopId) => {
  if (!sessionId) return false

  const shop = shops.value.find((s) => s.shopId === shopId)
  if (!shop) return false

  const contact = shop.contacts.find((c) => c.sessionId === sessionId || c.id === sessionId)
  if (!contact || contact.unreadCount === 0) return false

  try {
    const response = await markAllAsRead(sessionId)

    if (response.code === 200) {
      contact.unreadCount = 0
      shop.totalUnreadCount = shop.contacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0)
      return true
    }
    return false
  } catch (error) {
    log('error', '标记已读异常', error)
    return false
  }
}

// ==================== WebSocket 消息发送 ====================

const sendMessageViaWebSocket = async (contact, content) => {
  if (!currentShop.value) return false

  // 修复：检查全局连接状态
  if (!webSocketService.isConnected()) {
    log('warn', 'WebSocket未连接，尝试重连')
    await establishGlobalWebSocket()
    if (!webSocketService.isConnected()) {
      return false
    }
  }

  try {
    // 修复：使用实际的shopId而不是字符串
    const messageData = {
      messagePublisherId: currentShop.value.shopId, // 修复：使用实际值
      messagePublisherType: 'MERCHANT',
      targetUserId: contact.partnerId,
      targetUserType: contact.partnerType,
      content: content,
      sessionId: contact.sessionId,
      createTime: new Date().toISOString(),
    }

    log('info', '发送消息', messageData)

    await sendSocketMessage('/app/sendPrivateMessage', messageData, {
      retry: true,
      maxRetries: 3,
      priority: 'normal',
    })

    return true
  } catch (error) {
    log('error', 'WebSocket消息发送失败', error)
    return false
  }
}

// ==================== 消息处理 ====================

const addMessageToContact = async (
  sessionId,
  content,
  isSelf = false,
  isSystem = false,
  rawData = null,
) => {
  if (!sessionId) return null

  let targetShop = null
  let targetContact = null

  // 查找消息对应的店铺和联系人
  for (const shop of shops.value) {
    const contact = shop.contacts.find((c) => c.id === sessionId || c.sessionId === sessionId)
    if (contact) {
      targetShop = shop
      targetContact = contact
      break
    }
  }

  if (!targetShop && rawData?.shopId) {
    targetShop = shops.value.find((s) => s.shopId === rawData.shopId)
  }

  if (!targetShop) {
    log('warn', '找不到消息对应的店铺', { sessionId })
    return null
  }

  if (!targetContact && rawData) {
    const partnerId = isSelf ? rawData.targetUserId : rawData.messagePublisherId
    const partnerType = isSelf ? rawData.targetUserType : rawData.messagePublisherType
    const partnerName = isSelf ? rawData.targetUserName : rawData.messagePublisherName

    targetContact = {
      id: sessionId,
      sessionId: sessionId,
      name: partnerName || (partnerType === 'USER' ? '用户' : '联系人'),
      avatar: rawData.partnerAvatar || getDefaultAvatar(partnerType),
      partnerId: partnerId,
      partnerType: partnerType,
      messages: [],
      unreadCount: 0,
      lastMessage: content,
      lastMessageTime: new Date().toISOString(),
      shopId: targetShop.shopId,
    }
    targetShop.contacts.unshift(targetContact)
  }

  if (!targetContact) return null

  const newMsg = {
    id: rawData?.messageRecordId || Date.now() + Math.random(),
    content: content,
    time: rawData?.createTime || new Date().toISOString(),
    isSelf: isSelf,
    isSystem: isSystem,
    isRead: isSelf,
    rawData: rawData,
  }

  const exists = targetContact.messages.some((m) => m.id === newMsg.id)
  if (exists) return null

  targetContact.messages.push(newMsg)
  targetContact.messages.sort((a, b) => new Date(a.time) - new Date(b.time))

  targetContact.lastMessage = content.length > 50 ? content.substring(0, 50) + '...' : content
  targetContact.lastMessageTime = newMsg.time
  targetShop.lastMessage = content

  // 更新未读数
  const isCurrentChat =
    currentShop.value?.shopId === targetShop.shopId &&
    currentContactId.value === targetContact.id &&
    visible.value

  if (!isSelf && !isCurrentChat) {
    targetContact.unreadCount = (targetContact.unreadCount || 0) + 1
    targetShop.totalUnreadCount = targetShop.contacts.reduce(
      (sum, c) => sum + (c.unreadCount || 0),
      0,
    )
  }

  // 如果在当前聊天中且滚动到底部，自动滚动
  if (isCurrentChat && visible.value && isNearBottom()) {
    shouldAutoScroll = true
    await scrollToBottomIfNeeded()
  }

  return newMsg
}

const sendMessage = async () => {
  const text = inputMessage.value.trim()
  if (!text) return

  // 修复：检查WebSocket连接状态
  const isConnected = webSocketService.isConnected()

  if (!isConnected || !currentShop.value || !currentContact.value) {
    log('warn', '无法发送消息：连接未建立', {
      isConnected,
      hasShop: !!currentShop.value,
      hasContact: !!currentContact.value,
    })
    await addMessageToContact(currentContactId.value, '当前网络未连接，消息发送失败', true, true)
    inputMessage.value = ''
    return
  }

  shouldAutoScroll = true

  // 添加临时消息
  const tempMsgId = `temp_${Date.now()}`
  await addMessageToContact(currentContactId.value, text, true, false, {
    messageRecordId: tempMsgId,
    createTime: new Date().toISOString(),
    sessionId: currentContact.value.sessionId,
    shopId: currentShop.value.shopId,
  })

  inputMessage.value = ''
  await forceScrollToBottom()

  // 发送真实消息
  const success = await sendMessageViaWebSocket(currentContact.value, text)

  if (!success) {
    await addMessageToContact(currentContactId.value, '消息发送失败，请重试', true, true)
  }
}

// ==================== WebSocket 消息接收 ====================

const handleWebSocketMessage = async (event) => {
  const notification = event.detail
  if (!notification) return

  log('info', '收到WebSocket消息', notification)

  let content = ''
  let sessionId = ''
  let messagePublisherId = ''
  let messagePublisherType = ''
  let shopId = notification.shopId

  try {
    if (typeof notification === 'object') {
      content = notification.content || notification.message || JSON.stringify(notification)
      sessionId = notification.sessionId
      messagePublisherId = notification.messagePublisherId
      messagePublisherType = notification.messagePublisherType
    } else {
      content = String(notification)
    }
  } catch (e) {
    content = String(notification)
  }

  if (!sessionId) {
    log('warn', '收到消息但无 sessionId', notification)
    return
  }

  // 判断是否为自己发送的消息
  let isSelf = false
  if (messagePublisherId && currentShop.value) {
    isSelf = messagePublisherId === currentShop.value.shopId
  }

  log('info', '处理消息', { sessionId, isSelf, content: content.substring(0, 50) })

  await addMessageToContact(sessionId, content, isSelf, false, notification)
}

const updateConnectionStatus = () => {
  const isConnected = webSocketService.isConnected()
  wsGlobalConnected.value = isConnected

  // 更新所有店铺的连接状态
  shops.value.forEach((shop) => {
    shop.connected = isConnected
  })

  log('info', '连接状态更新', { isConnected })
}

// ==================== 加载更多消息 ====================

const loadMoreMessages = async () => {
  if (!currentContact.value?.sessionId) return
  if (isLoadingMore.value) return
  if (!hasMoreMessages.value) return
  if (loadMoreLock) return
  if (!currentShop.value) return

  loadMoreLock = true
  isLoadingMore.value = true

  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  const container = messagesContainer.value
  if (!container) {
    isLoadingMore.value = false
    setupIntersectionObserver()
    loadMoreLock = false
    return
  }

  const firstVisibleMessage = container.querySelector('.message-wrapper')
  const anchorId = firstVisibleMessage?.dataset?.msgId
  const anchorOffset = firstVisibleMessage?.getBoundingClientRect().top || 0
  const oldestMsg = currentMessages.value[0]

  const beforeId = oldestMsg?.id || ''

  if (!beforeId) {
    isLoadingMore.value = false
    setupIntersectionObserver()
    loadMoreLock = false
    return
  }

  try {
    await loadSessionMessagesForShop(
      currentShop.value,
      currentContact.value.sessionId,
      beforeId,
      true,
    )
    await nextTick()

    const newAnchorEl = container.querySelector(`[data-msg-id="${anchorId}"]`)
    if (newAnchorEl) {
      const newOffset = newAnchorEl.getBoundingClientRect().top
      const diff = newOffset - anchorOffset
      container.scrollTop += diff
    }
  } finally {
    setupIntersectionObserver()
    isLoadingMore.value = false
    loadMoreLock = false
  }
}

const setupIntersectionObserver = () => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMoreMessages.value && !isLoadingMore.value) {
          loadMoreMessages()
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    },
  )

  if (loadMoreTrigger.value) {
    intersectionObserver.observe(loadMoreTrigger.value)
  }
}

// ==================== UI 交互 ====================
const startMessageRefresh = () => {
  if (messageRefreshInterval) {
    clearInterval(messageRefreshInterval)
  }
  messageRefreshInterval = setInterval(async () => {
    if (
      !wsGlobalConnected.value &&
      visible.value &&
      currentContact.value?.sessionId &&
      currentShop.value &&
      !isLoadingMore.value
    ) {
      const wasNearBottom = isNearBottom()
      await loadSessionMessagesForShop(currentShop.value, currentContact.value.sessionId)
      if (wasNearBottom && shouldAutoScroll) {
        await forceScrollToBottom()
      }
    }
  }, 5000)
}
const switchContact = async (contact) => {
  if (currentContactId.value === contact.id) return

  isLoadingMore.value = false
  hasMoreMessages.value = true
  shouldAutoScroll = true

  currentContactId.value = contact.id

  if (contact.sessionId && contact.unreadCount > 0 && currentShop.value) {
    await markSessionAsRead(contact.sessionId, currentShop.value.shopId)
  }

  if (contact.messages.length === 0 && contact.sessionId && currentShop.value) {
    await loadSessionMessagesForShop(currentShop.value, contact.sessionId)
  }
  // 5. 启动消息刷新机制
  startMessageRefresh()
  await forceScrollToBottom()
  await nextTick()
  setupIntersectionObserver()
}

const minimizePanel = () => {
  visible.value = false
}

const showDeleteConfirm = () => {
  deleteConfirmVisible.value = true
}

const confirmDeleteMessages = () => {
  if (currentContact.value && currentShop.value) {
    currentContact.value.messages = []
    currentContact.value.lastMessage = ''
    addMessageToContact(currentContactId.value, '聊天记录已清空', false, true)
  }
  deleteConfirmVisible.value = false
}

const testConnection = async () => {
  log('info', '手动重连')
  await establishGlobalWebSocket()
  if (wsGlobalConnected.value && currentShop.value) {
    // 刷新当前会话的消息
    if (currentContact.value) {
      await loadSessionMessagesForShop(currentShop.value, currentContact.value.sessionId)
      await forceScrollToBottom()
    }
    // 刷新会话列表
    await fetchSessionListForShop(currentShop.value)
  }
}

// ==================== 生命周期 ====================

onMounted(async () => {
  log('info', '组件初始化', { merchantId: merchantId.value })

  if (!webSocketService.isConnected() && merchantId.value && token.value) {
    console.log('主动建立 WebSocket 连接')
    await webSocketService.connect(
      currentMerchantUsedShopId.value,
      token.value,
      currentMerchantUsedShopId.value,
    )
    //   await webSocketService.connect(merchantId.value, token.value, currentMerchantUsedShopId.value)
  }

  // 1. 先建立WebSocket连接
  await establishGlobalWebSocket()

  // 2. 获取店铺列表和会话
  await fetchShops()
  // 3. 添加事件监听
  window.addEventListener('chat-message', handleWebSocketMessage)
  window.addEventListener('websocket-message', handleWebSocketMessage)
  window.addEventListener('user-payment-notification', handleWebSocketMessage)
  window.addEventListener('user-refund-notification', handleWebSocketMessage)
  window.addEventListener('user-logistic-notification', handleWebSocketMessage)
  window.addEventListener('merchant-payment-notification', handleWebSocketMessage)
  window.addEventListener('merchant-refund-notification', handleWebSocketMessage)
  window.addEventListener('merchant-logistic-notification', handleWebSocketMessage)
  window.addEventListener('user-wechat-notification', handleWebSocketMessage)
  window.addEventListener('merchant-wechat-notification', handleWebSocketMessage)
  window.addEventListener('public-wechat-notification', handleWebSocketMessage)
  window.addEventListener('topic-wechat-notification', handleWebSocketMessage)
  window.addEventListener('topic-wechat-alias-notification', handleWebSocketMessage)

  webSocketService.addConnectionListener(updateConnectionStatus)

  // 4. 设置连接状态检查（降低频率到30秒）
  statusInterval = setInterval(() => {
    if (!webSocketService.isConnected() && merchantId.value && token.value) {
      log('info', '检测到连接断开，尝试重连')
      establishGlobalWebSocket()
    }
  }, 30000)
  // 5. 启动消息刷新机制
  startMessageRefresh()
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.addEventListener('scroll', handleUserScroll)
  }
  setupIntersectionObserver()
})

onUnmounted(() => {
  window.removeEventListener('chat-message', handleWebSocketMessage)
  window.removeEventListener('websocket-message', handleWebSocketMessage)
  window.removeEventListener('user-payment-notification', handleWebSocketMessage)
  window.removeEventListener('user-refund-notification', handleWebSocketMessage)
  window.removeEventListener('user-logistic-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-payment-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-refund-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-logistic-notification', handleWebSocketMessage)
  window.removeEventListener('user-wechat-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-wechat-notification', handleWebSocketMessage)
  window.removeEventListener('public-wechat-notification', handleWebSocketMessage)
  window.removeEventListener('topic-wechat-notification', handleWebSocketMessage)
  window.removeEventListener('topic-wechat-alias-notification', handleWebSocketMessage)

  webSocketService.removeConnectionListener(updateConnectionStatus)

  if (statusInterval) {
    clearInterval(statusInterval)
  }

  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  if (messagesContainer.value) {
    messagesContainer.value.removeEventListener('scroll', handleUserScroll)
  }
})

watch([visible, currentContactId], async () => {
  if (visible.value && currentContact.value && currentShop.value) {
    if (currentContact.value.unreadCount > 0) {
      await markSessionAsRead(currentContact.value.sessionId, currentShop.value.shopId)
    }

    if (isNearBottom()) {
      shouldAutoScroll = true
      await forceScrollToBottom()
    }

    await nextTick()
    setupIntersectionObserver()
  }
})
</script>

<style scoped>
/* 模态框动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* 店铺选择器模态框 */
.shop-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  animation: fadeIn 0.2s ease;
}

.shop-selector-modal {
  background: #ffffff;
  border-radius: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: scaleIn 0.3s ease;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #e5e5e5;
  background: #ffffff;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #1f1f1f;
}

.modal-close-btn {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8e8e93;
  transition: all 0.2s;
}

.modal-close-btn:hover {
  background: #f0f0f0;
  color: #1f1f1f;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.shop-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  background: #f8f8f8;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.shop-card:hover {
  background: #e8f5e9;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #34c759;
}

.shop-card-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  position: relative;
  margin-bottom: 12px;
  overflow: hidden;
}

.shop-default-icon {
  font-size: 48px;
}

.shop-card-avatar .avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.unread-badge-large {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff3b30;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 20px;
  min-width: 24px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shop-card-info {
  text-align: center;
  width: 100%;
}

.shop-card-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 6px;
  word-break: break-word;
}

.shop-card-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 11px;
  color: #8e8e93;
  margin-bottom: 8px;
}

.shop-card-preview {
  font-size: 12px;
  color: #8e8e93;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.empty-shops {
  text-align: center;
  padding: 60px 20px;
  color: #8e8e93;
}

.empty-shops .empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* 原有样式保持不变 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.contact-fade-enter-active,
.contact-fade-leave-active {
  transition: all 0.2s ease;
}
.contact-fade-enter-from,
.contact-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.shop-switch-enter-active,
.shop-switch-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.shop-switch-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.shop-switch-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.chat-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.chat-panel {
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 800px;
  height: 620px;
  background: #f5f5f5;
  border-radius: 20px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  display: flex;
  overflow: hidden;
}

/* 店铺切换按钮样式 - 显示真实logo和名称 */
.panel-header-bar {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
}

.switch-shop-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 32px;
  padding: 6px 12px 6px 6px;
  font-size: 13px;
  font-weight: 500;
  color: #1f1f1f;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.switch-shop-btn:hover {
  background: #ffffff;
  border-color: #34c759;
  transform: scale(1.02);
}

.shop-btn-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  overflow: hidden;
  flex-shrink: 0;
}

.shop-btn-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.shop-btn-name {
  font-size: 14px;
  font-weight: 500;
  color: #1f1f1f;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 0.5px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.contact-sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #e5e5e5;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f1f1f;
}

.collapse-btn {
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8e8e93;
  transition: all 0.2s;
}

.collapse-btn:hover {
  background: #f0f0f0;
}

.contact-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.contact-item:hover {
  background: #f5f5f5;
}

.contact-item.active {
  background: #e8f5e9;
}

.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.unread-badge-small {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff3b30;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  min-width: 18px;
  text-align: center;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name {
  font-size: 16px;
  font-weight: 500;
  color: #1f1f1f;
  margin-bottom: 4px;
}

.contact-preview {
  font-size: 12px;
  color: #8e8e93;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-time {
  font-size: 10px;
  color: #c6c6c8;
  margin-top: 2px;
}

.contact-item.unread .contact-name {
  font-weight: 700;
  color: #34c759;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  overflow: hidden;
}

.chat-header {
  background: #ffffff;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid #e5e5e5;
}

.header-info {
  flex: 1;
}

.chat-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  line-height: 1.3;
}

.chat-status {
  font-size: 11px;
  color: #8e8e93;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.online {
  background: #34c759;
  box-shadow: 0 0 0 2px rgba(52, 199, 89, 0.2);
}

.status-dot.offline {
  background: #8e8e93;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: transparent;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8e8e93;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: #f0f0f0;
  color: #1f1f1f;
}

.minimize-btn:hover {
  background: #e8f5e9;
  color: #34c759;
}

.delete-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c6c6c8;
  border-radius: 2px;
}

.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8e8e93;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.system-message {
  text-align: center;
  margin: 8px 0;
}

.system-text {
  font-size: 11px;
  color: #8e8e93;
  background: rgba(142, 142, 147, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;
}

.system-tip {
  text-align: center;
  font-size: 11px;
  color: #8e8e93;
  margin: 8px 0;
}

.load-more-trigger {
  height: 1px;
  margin: -1px 0 0 0;
}

.loading-more-wrapper {
  text-align: center;
  padding: 12px 0;
}

.loading-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  color: #8e8e93;
  font-size: 12px;
}

.no-more-messages {
  text-align: center;
  padding: 16px 0;
  color: #c6c6c8;
  font-size: 11px;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
}

.message-time-divider {
  text-align: center;
  font-size: 11px;
  color: #8e8e93;
  margin: 12px 0 8px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 70%;
}

.message-self {
  flex-direction: row-reverse;
  align-self: flex-end;
  max-width: 70%;
}

.message-other {
  align-self: flex-start;
  max-width: 70%;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: white;
  overflow: hidden;
}

.avatar .avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.self-avatar {
  background: #34c759;
}

.message-bubble-wrapper {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.message-bubble {
  background: #ffffff;
  border-radius: 18px;
  padding: 10px 14px;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

.message-self .message-bubble {
  background: #dcf8c5;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
  color: #1f1f1f;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  word-break: break-all;
}

.message-meta {
  display: flex;
  gap: 6px;
  font-size: 10px;
  color: #8e8e93;
  margin-top: 4px;
  padding: 0 4px;
}

.message-self .message-meta {
  justify-content: flex-end;
}

.chat-footer {
  background: #ffffff;
  border-top: 0.5px solid #e5e5e5;
  padding: 12px 20px;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-input {
  flex: 1;
  border: 0.5px solid #e5e5e5;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 14px;
  background: #f8f8f8;
  outline: none;
  transition: all 0.2s;
}

.chat-input:focus {
  background: #ffffff;
  border-color: #34c759;
}

.send-btn {
  background: #34c759;
  border: none;
  border-radius: 24px;
  padding: 8px 20px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #2db84d;
  transform: scale(0.98);
}

.send-btn:disabled {
  background: #c6c6c8;
  cursor: not-allowed;
  opacity: 0.6;
}

.footer-tools {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.tool-btn {
  background: transparent;
  border: none;
  font-size: 12px;
  color: #8e8e93;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 12px;
  cursor: pointer;
}

.tool-btn.active {
  color: #ff3b30;
}

.tool-btn:hover {
  background: #f0f0f0;
}

.chat-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #34c759;
  border: none;
  box-shadow: 0 4px 12px rgba(52, 199, 89, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10001;
  color: white;
}

.chat-fab:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(52, 199, 89, 0.4);
}

.chat-fab.active {
  background: #ff3b30;
  transform: rotate(45deg);
}

.chat-fab.hasNew {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(8deg);
  }
  75% {
    transform: rotate(-8deg);
  }
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff3b30;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.confirm-dialog {
  background: white;
  border-radius: 24px;
  width: 320px;
  padding: 24px;
  text-align: center;
  animation: scaleIn 0.2s ease;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.confirm-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.confirm-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 8px;
}

.confirm-message {
  font-size: 14px;
  color: #8e8e93;
  margin-bottom: 24px;
  line-height: 1.4;
}

.confirm-actions {
  display: flex;
  gap: 12px;
}

.confirm-btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.confirm-btn.cancel {
  background: #f5f5f5;
  color: #1f1f1f;
}

.confirm-btn.cancel:hover {
  background: #e5e5e5;
}

.confirm-btn.confirm {
  background: #ef4444;
  color: white;
}

.confirm-btn.confirm:hover {
  background: #dc2626;
  transform: scale(0.98);
}

.loading-bubble {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.92);
  padding: 8px 16px;
  border-radius: 999px;
  backdrop-filter: blur(10px);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

.loading-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34c759;
  animation: loadingBounce 1.2s infinite ease-in-out;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.15s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes loadingBounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
