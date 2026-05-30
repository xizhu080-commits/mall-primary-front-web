<template>
  <div>
    <!-- 店铺选择窗口 -->
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
                <div class="shop-card-avatar-wrapper">
                  <div class="shop-card-avatar" :style="{ background: shop.avatarColor }">
                    <img
                      v-if="isImageUrl(shop.shopLogo)"
                      :src="shop.shopLogo"
                      :alt="shop.shopName"
                      class="avatar-image"
                      @error="handleShopImageError(shop)"
                    />
                    <span v-else class="shop-default-icon">{{ shop.shopLogo || '🏪' }}</span>
                  </div>
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
        <!--左侧 联系人侧边栏 -->
        <div class="contact-sidebar" :class="{ collapsed: sidebarCollapsed }">
          <div class="sidebar-header">
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
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="contact-list">
            <transition-group name="contact-fade">
              <div
                v-for="contact in currentContacts"
                :key="contact.id"
                :class="[
                  'contact-item',
                  { active: currentContactId === contact.id, unread: contact.unreadCount > 0 },
                ]"
                @click="switchContact(contact)"
              >
                <div class="contact-avatar-wrapper">
                  <div class="contact-avatar" :style="{ background: contact.avatarColor }">
                    <img
                      v-if="isImageUrl(contact.avatar)"
                      :src="contact.avatar"
                      :alt="contact.name"
                      class="avatar-image"
                      @error="handleImageError(contact)"
                    />
                    <span v-else>{{ contact.avatar || '👤' }}</span>
                  </div>
                  <span v-if="contact.unreadCount > 0" class="unread-badge-small">{{
                    contact.unreadCount > 99 ? '99+' : contact.unreadCount
                  }}</span>
                </div>
                <div class="contact-info">
                  <div class="contact-name">{{ contact.name }}</div>
                  <div class="contact-preview">{{ contact.lastMessage || '暂无消息' }}</div>
                  <div class="contact-time">{{ formatShortTime(contact.lastMessageTime) }}</div>
                </div>
              </div>
            </transition-group>
            <div v-if="currentContacts.length === 0" class="empty-contacts">暂无会话</div>
          </div>
          <div class="sidebar-footer">
            <button class="collapse-btn" @click="sidebarCollapsed = !sidebarCollapsed">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  v-if="!sidebarCollapsed"
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  v-else
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- 消息区域 -->
        <div class="chat-area">
          <div class="chat-header" v-if="currentContact">
            <div class="header-info">
              <div class="chat-name">{{ currentContact.name }}</div>
              <div class="chat-status">
                <span :class="['status-dot', currentContact.online ? 'online' : 'offline']"></span>
                <span>{{ currentContact.online ? '在线' : '离线' }}</span>
              </div>
            </div>
            <div class="header-actions">
              <button class="icon-btn minimize-btn" @click="minimizePanel" title="最小化">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </button>
              <button class="icon-btn delete-btn" @click="showDeleteConfirm" title="清空聊天记录">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div ref="messagesContainer" class="chat-messages" v-if="currentContact">
            <!-- 顶部加载更多触发器 -->
            <div class="load-more-trigger" ref="loadMoreTrigger"></div>

            <!-- 加载更多指示器 -->
            <!-- 加载更多指示器 - 固定在顶部 -->
            <div v-if="isLoadingMore" class="loading-more-wrapper">
              <div class="loading-more">
                <div class="loading-card">
                  <div class="loading-spinner"></div>
                  <span class="loading-label">加载中...</span>
                </div>
              </div>
            </div>

            <!-- 没有更多消息提示 -->
            <div
              v-else-if="!hasMoreMessages && currentMessages.length > 0"
              class="no-more-messages"
            >
              已经没有更多消息了
            </div>

            <!-- 消息列表 -->
            <div v-for="(msg, idx) in currentMessages" :key="msg.id || idx" class="message-wrapper">
              <div
                v-if="shouldShowTimeDivider(msg, idx, currentMessages)"
                class="message-time-divider"
              >
                <span>{{ formatDateTime(msg.time) }}</span>
              </div>
              <div
                :class="['message-item', msg.isSelf ? 'message-self' : 'message-other']"
                :data-msg-id="msg.id"
              >
                <div class="message-avatar">
                  <div v-if="msg.isSelf" class="avatar self-avatar">
                    <img
                      v-if="currentShop.shopLogo && isImageUrl(currentShop.shopLogo)"
                      :src="currentShop.shopLogo"
                      class="avatar-image"
                      @error="handleShopImageError(currentShop)"
                    />
                    <span v-else>{{ currentShop.shopLogo || '🏪' }}</span>
                  </div>
                  <div v-else class="avatar" :style="{ background: currentContact.avatarColor }">
                    <img
                      v-if="isImageUrl(currentContact.avatar)"
                      :src="currentContact.avatar"
                      class="avatar-image"
                      @error="handleImageError(currentContact)"
                    />
                    <span v-else>{{ currentContact.avatar || '👤' }}</span>
                  </div>
                </div>
                <div class="message-bubble-wrapper">
                  <div class="message-bubble">
                    <div class="message-text">{{ msg.content }}</div>
                  </div>
                  <div class="message-meta">
                    <span>{{ formatShortTime(msg.time) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref="scrollAnchor" class="scroll-anchor"></div>
          </div>

          <div v-if="!currentContact" class="empty-chat">
            <div class="empty-icon">💬</div>
            <p>选择联系人开始聊天</p>
          </div>

          <!-- 输入区域 -->
          <div class="chat-footer" v-if="currentContact">
            <div class="input-wrapper">
              <input
                v-model="inputMessage"
                @keyup.enter="sendMessage"
                :placeholder="currentContact ? '输入消息...' : '连接中...'"
                class="chat-input"
              />
              <button class="send-btn" @click="sendMessage" :disabled="!inputMessage.trim()">
                发送
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 悬浮按钮 -->
    <button
      class="chat-fab"
      :class="{ active: visible, hasNew: totalUnreadCount > 0 }"
      @click="handleFabClick"
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
      <span v-if="totalUnreadCount > 0" class="unread-badge">{{
        totalUnreadCount > 99 ? '99+' : totalUnreadCount
      }}</span>
    </button>

    <!-- 删除确认弹窗 -->
    <div
      v-if="deleteConfirmVisible"
      class="confirm-overlay"
      @click.self="deleteConfirmVisible = false"
    >
      <div class="confirm-dialog">
        <div class="confirm-icon">⚠️</div>
        <div class="confirm-title">确认清空聊天记录？</div>
        <div class="confirm-message">此操作不可恢复，确定要清空吗？</div>
        <div class="confirm-actions">
          <button class="confirm-btn cancel" @click="deleteConfirmVisible = false">取消</button>
          <button class="confirm-btn confirm" @click="confirmDeleteMessages">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
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
const currentContactId = ref('')
const deleteConfirmVisible = ref(false)
const isLoadingMore = ref(false)
const hasMoreMessages = ref(true)
const sidebarCollapsed = ref(false)
const wsConnected = ref(false)

// 定时器和观察者
let messageRefreshInterval = null
let intersectionObserver = null
let loadMoreLock = false
let shouldAutoScroll = true

// 商家信息
const merchantInfo = localStorage.getItem('mall-user_merchant-info')
const info = merchantInfo ? JSON.parse(merchantInfo) : {}
const extractPrimitive = (val) => {
  if (val == null) return ''
  if (typeof val !== 'object') return val
  return val.id ?? val.merchantId ?? val.userId ?? val.value ?? ''
}
const merchantId = ref(extractPrimitive(info.merchantId))
const token = ref(extractPrimitive(info.token))

// 选中的店铺
const selectedShopInfo = localStorage.getItem('selected_shop_info')
const shopInfo = selectedShopInfo ? JSON.parse(selectedShopInfo) : {}
const currentShopId = ref(shopInfo?.shopId ? extractPrimitive(shopInfo.shopId) : '')

// 定时器

// ==================== 计算属性 ====================
const currentContacts = computed(() => currentShop.value?.contacts || [])
const currentContact = computed(() =>
  currentContacts.value.find((c) => c.id === currentContactId.value),
)
const currentMessages = computed(() => currentContact.value?.messages || [])
const totalUnreadCount = computed(() =>
  shops.value.reduce((sum, shop) => sum + (shop.totalUnreadCount || 0), 0),
)

// ==================== 工具函数 ====================
const isImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  return (
    (url.startsWith('http://') || url.startsWith('https://')) &&
    /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i.test(url)
  )
}

const formatShortTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date >= today)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  if (date >= yesterday) return '昨天'
  return `${date.getMonth() + 1}/${date.getDate()}`
}

const formatDateTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return '今天'
  if (date.toDateString() === yesterday.toDateString()) return '昨天'
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const shouldShowTimeDivider = (msg, idx, messages) => {
  if (idx === 0) return true
  const prevMsg = messages[idx - 1]
  if (!prevMsg) return true
  return new Date(msg.time).toDateString() !== new Date(prevMsg.time).toDateString()
}

const getShopColor = (index) => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
  ]
  return colors[index % colors.length]
}

const getContactColor = (name) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

// ==================== 业务逻辑 ====================
const handleFabClick = () => {
  if (!visible.value) {
    if (!currentShop.value) {
      openShopSelector()
    } else {
      visible.value = true
      // 移除这里的 loadSessionMessages 调用
      // 如果当前联系人有消息，说明已经加载过了，不需要重新加载
      if (currentContact.value && currentContact.value.messages.length === 0) {
        loadSessionMessages(currentContact.value.sessionId)
      }
    }
  } else {
    visible.value = false
  }
}
const openShopSelector = () => {
  shopSelectorVisible.value = true
}
const closeShopSelector = () => {
  shopSelectorVisible.value = false
}
const minimizePanel = () => {
  visible.value = false
}

const handleShopImageError = (shop) => {
  shop.shopLogo = '🏪'
}
const handleImageError = (contact) => {
  contact.avatar = '👤'
}

// 选择店铺
const selectShopAndOpenChat = async (shop) => {
  currentShop.value = shop
  currentShopId.value = shop.shopId
  localStorage.setItem(
    'selected_shop_info',
    JSON.stringify({ shopId: shop.shopId, shopName: shop.shopName }),
  )

  shopSelectorVisible.value = false
  visible.value = true

  await fetchSessionList(shop)
  if (shop.contacts?.length > 0) {
    await switchContact(shop.contacts[0])
  }
}

// 切换联系人
const switchContact = async (contact) => {
  console.log('🔄 switchContact 被调用', contact.id)

  if (currentContactId.value === contact.id) return

  isLoadingMore.value = false
  hasMoreMessages.value = true
  shouldAutoScroll = true

  currentContactId.value = contact.id

  if (contact.sessionId && contact.unreadCount > 0) {
    await markAsRead(contact.sessionId)
  }

  if (contact.messages.length === 0 && contact.sessionId) {
    console.log('📥 首次加载消息')
    await loadSessionMessages(contact.sessionId)
  }

  await scrollToBottom()

  await nextTick()
  console.log('🔧 准备设置 IntersectionObserver')
  setTimeout(() => {
    setupIntersectionObserver()
  }, 300)
}
// 加载店铺列表
const fetchShops = async () => {
  if (!merchantId.value) return
  try {
    const res = await getShopListByMerchantId(merchantId.value)
    if (res?.data) {
      // 使用 reactive 使整个数据响应式
      shops.value = reactive(
        res.data.map((shop, idx) => ({
          ...shop,
          shopId: extractPrimitive(shop.shopId),
          shopName: shop.shopName || '未命名店铺',
          shopLogo: shop.shopLogo || '🏪',
          avatarColor: getShopColor(idx),
          connected: false,
          contacts: [],
          totalUnreadCount: 0,
        })),
      )

      // 恢复上次选择的店铺
      const lastShop = shops.value.find((s) => s.shopId === currentShopId.value)
      if (lastShop) {
        currentShop.value = lastShop
        await fetchSessionList(lastShop)
      }
    }
  } catch (e) {
    console.error('获取店铺列表失败:', e)
  }
}

//============================================= 加载会话列表=============================================
const fetchSessionList = async (shop) => {
  if (!shop?.shopId) return
  try {
    const res = await getAllSessionList(shop.shopId)
    if (res?.data) {
      // 保留之前已加载的消息
      const existingMessagesMap = {}
      if (shop.contacts) {
        shop.contacts.forEach((c) => {
          existingMessagesMap[c.sessionId] = c.messages || []
        })
      }

      shop.contacts = reactive(
        res.data.map((contact, idx) => ({
          ...contact,
          id: contact.id || contact.sessionId,
          sessionId: contact.sessionId,
          name: contact.name || contact.partnerName || '用户',
          avatar: contact.avatar || '👤',
          avatarColor: getContactColor(contact.name || contact.partnerName),
          lastMessage: contact.lastMessage || '',
          lastMessageTime: contact.lastMessageTime || contact.updateTime || '',
          unreadCount: contact.unreadCount || 0,
          online: contact.online || false,
          messages: existingMessagesMap[contact.sessionId] || [],
        })),
      )
      shop.totalUnreadCount = shop.contacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0)
    }
  } catch (e) {
    console.error('获取会话列表失败:', e)
  }
}

// ====================加载消息====================
const loadSessionMessages = async (sessionId, beforeId = null, isLoadMore = false) => {
  if (!currentShop.value?.shopId || !sessionId) return
  try {
    const params = {
      sessionId: sessionId,
      limit: 20,
      beforeId: beforeId,
    }

    const res = await getSpectifyMessageList(params)
    if (res?.data) {
      // 找到对应的联系人 - 直接从 shop.contacts 中找，而不是用计算属性
      const shop = currentShop.value
      const contact = shop.contacts?.find((c) => c.sessionId === sessionId)

      if (contact) {
        const newMessages = res.data.map((msg) => ({
          id: msg.messageRecordId || msg.id,
          content: msg.content || msg.message,
          time: msg.createTime || msg.time,
          isSelf: String(msg.messagePublisherId) === String(currentShop.value.shopId),
        }))

        if (isLoadMore) {
          // 去重后追加到前面
          const existingIds = new Set(contact.messages.map((m) => m.id))
          const toPrepend = newMessages.filter((m) => !existingIds.has(m.id))

          if (toPrepend.length > 0) {
            contact.messages = [...toPrepend, ...contact.messages]
          }
        } else {
          // 首次加载，直接替换
          contact.messages = newMessages
        }

        // 按时间排序
        contact.messages.sort((a, b) => new Date(a.time) - new Date(b.time))
        hasMoreMessages.value = res.data.length >= 20
      }
    }
  } catch (e) {
    console.error('获取消息失败:', e)
  }
}

// ==================== 加载更多消息 ====================

const loadMoreMessages = async () => {
  console.log('📥 loadMoreMessages 被调用')
  console.log('  - currentContact:', currentContact.value)
  console.log('  - sessionId:', currentContact.value?.sessionId)
  console.log('  - isLoadingMore:', isLoadingMore.value)
  console.log('  - hasMoreMessages:', hasMoreMessages.value)
  console.log('  - loadMoreLock:', loadMoreLock)

  if (!currentContact.value?.sessionId) {
    console.log('❌ 退出：没有 sessionId')
    return
  }
  if (isLoadingMore.value) {
    console.log('❌ 退出：正在加载中')
    return
  }
  if (!hasMoreMessages.value) {
    console.log('❌ 退出：没有更多消息')
    return
  }
  if (loadMoreLock) {
    console.log('❌ 退出：已被锁定')
    return
  }

  console.log('✅ 所有检查通过，开始加载')

  loadMoreLock = true
  const messages = currentMessages.value
  if (messages.length === 0) {
    loadMoreLock = false
    return
  }

  isLoadingMore.value = true

  // 先断开 observer
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }

  const container = messagesContainer.value
  if (!container) {
    isLoadingMore.value = false
    loadMoreLock = false
    return
  }

  // 记录加载前的状态
  const scrollHeightBefore = container.scrollHeight
  const scrollTopBefore = container.scrollTop

  const oldestMsg = messages[0]
  const beforeId = oldestMsg.id || ''

  if (!beforeId) {
    isLoadingMore.value = false
    loadMoreLock = false
    setupIntersectionObserver()
    return
  }

  try {
    // ===== 新增：延迟隐藏加载指示器，让用户能看到 =====
    await new Promise((resolve) => setTimeout(resolve, 500)) // 延迟 600ms

    await loadSessionMessages(currentContact.value.sessionId, beforeId, true)
    await nextTick()

    // 恢复滚动位置：新内容在顶部，所以 scrollHeight 增加了
    // 我们需要将 scrollTop 增加 (新的 scrollHeight - 旧的 scrollHeight)
    const scrollHeightAfter = container.scrollHeight
    const heightDiff = scrollHeightAfter - scrollHeightBefore

    // 设置新的滚动位置，保持在原来的消息位置
    container.scrollTop = scrollTopBefore + heightDiff

    // 强制浏览器重新计算
    await nextTick()

    // 微调，确保不在最顶部（防止无限触发）
    if (container.scrollTop < 50) {
      container.scrollTop = 50
    }
  } catch (error) {
    console.error('加载更多消息失败:', error)
  } finally {
    isLoadingMore.value = false
    loadMoreLock = false

    // 延迟重新设置 observer
    setTimeout(() => {
      if (hasMoreMessages.value) {
        setupIntersectionObserver()
      }
    }, 300)
  }
}
let observerDebounceTimer = null

const setupIntersectionObserver = () => {
  console.log('🔧 setupIntersectionObserver 被调用')
  console.log('  - loadMoreTrigger.value:', loadMoreTrigger.value)
  console.log('  - hasMoreMessages.value:', hasMoreMessages.value)

  // 先清理旧的
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }

  // 清除防抖定时器
  if (observerDebounceTimer) {
    clearTimeout(observerDebounceTimer)
  }

  if (!loadMoreTrigger.value) {
    console.warn('❌ loadMoreTrigger 不存在！')
    return
  }
  if (!hasMoreMessages.value) {
    console.warn('❌ hasMoreMessages 为 false')
    return
  }

  observerDebounceTimer = setTimeout(() => {
    console.log('✅ 开始创建 IntersectionObserver')
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        console.log('👁️ Observer 触发！', entries[0]?.isIntersecting)
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            hasMoreMessages.value &&
            !isLoadingMore.value &&
            !loadMoreLock
          ) {
            const container = messagesContainer.value
            console.log('  - container.scrollTop:', container?.scrollTop)
            if (container && container.scrollTop <= 100) {
              console.log('✅ 条件满足，调用 loadMoreMessages')
              loadMoreMessages()
            }
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
      console.log('👀 开始观察 loadMoreTrigger')
    }
  }, 200)
}
// ===================================标记消息已读===================================
const markAsRead = async (sessionId) => {
  console.log(`=====进入标记会话消息区域=======`, sessionId, currentShop.value.shopId)
  if (!sessionId) return
  try {
    const contact = currentContact.value
    if (contact && contact.unreadCount > 0) {
      await markAllAsRead(sessionId, currentShop.value.shopId)
      // 调用成功后立即清除未读数，确保实时更新
      if (contact) {
        contact.unreadCount = 0
        if (currentShop.value) {
          currentShop.value.totalUnreadCount =
            currentShop.value.contacts?.reduce((sum, c) => sum + (c.unreadCount || 0), 0) || 0
        }
      }
    }
  } catch (e) {
    console.error('标记消息已读失败:', e)
  }
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
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
  const container = messagesContainer.value

  if (isNearBottom()) {
    shouldAutoScroll = true
  } else {
    shouldAutoScroll = false
  }

  // 用户上滑到顶部时重新挂载观察器（兜底 finally 未重连的情况）
  if (
    container.scrollTop < 100 &&
    !intersectionObserver &&
    hasMoreMessages.value &&
    !isLoadingMore.value &&
    !loadMoreLock
  ) {
    setupIntersectionObserver()
  }
}

// ===============================发送消息===============================
const sendMessage = async () => {
  const text = inputMessage.value.trim()
  if (!text || !currentShop.value || !currentContact.value) return

  // 断线重连
  if (!wsConnected.value) {
    await connectWebSocket()
  }

  if (!wsConnected.value) return

  const tempId = `temp_${Date.now()}`
  const contact = currentContact.value
  contact.messages = contact.messages || []
  contact.messages.push({ id: tempId, content: text, time: new Date().toISOString(), isSelf: true })
  inputMessage.value = ''
  await scrollToBottom()

  try {
    const messageData = {
      messagePublisherId: currentShop.value.shopId,
      messagePublisherType: 'MERCHANT',
      targetUserId: contact.partnerId,
      targetUserType: contact.partnerType,
      content: text,
      sessionId: contact.sessionId,
      createTime: new Date().toISOString(),
    }

    await sendSocketMessage('/app/sendPrivateMessage', messageData, {
      orderId: tempId,
    })
  } catch (e) {
    console.error('发送失败:', e)
    contact.messages = contact.messages.filter((m) => m.id !== tempId)
    contact.messages.push({
      id: `${tempId}_fail`,
      content: '发送失败',
      time: new Date().toISOString(),
      isSelf: true,
      failed: true,
    })
    await scrollToBottom()
  }
}

// ==================== WebSocket 连接 ====================
const connectWebSocket = async () => {
  console.log(
    '🔌 connectWebSocket 调用前 ',
    'currentShop:',
    currentShop.value.shopId,
    'token:',
    token.value,
  )

  if (!currentShop.value?.shopId || !token.value) {
    console.warn('缺少连接参数', { shopId: currentShop.value?.shopId, hasToken: !!token.value })
    return false
  }

  try {
    // 用 shopId 作为 userId
    const result = await webSocketService.connect(
      currentShop.value.shopId,
      token.value,
      currentShop.value.shopId,
      'MERCHANT',
    )
    console.log('🔌 connectWebSocket 完成')
    return true
  } catch (e) {
    console.error('WebSocket连接失败:', e)
    return false
  }
}

// ========================WebSocket=============== 消息处理===================
const handleWebSocketMessage = async (event) => {
  console.log('=====================这里是消息接收区域=====================')
  console.log('收到消息数据:', event.detail)
  const data = event.detail
  if (!data) return

  const sessionId = data.sessionId || data.chatId || data.conversationId
  if (!sessionId) return

  // 找到对应店铺 - 优先用当前已选店铺（WebSocket推给商家时targetUserId是partnerId）
  let targetShop = currentShop.value
    ? shops.value.find((s) => s.shopId === currentShop.value.shopId)
    : null
  if (!targetShop) {
    targetShop = shops.value.find((s) =>
      s.contacts?.some((c) => c.partnerId === data.messagePublisherId),
    )
  }

  if (!targetShop) return

  const contact = targetShop.contacts?.find((c) => c.sessionId === sessionId)
  if (!contact) return

  const content = data.content || data.message || data.text || JSON.stringify(data)

  // 判断是否为自己发送的消息
  // 检查：messagePublisherId 是商家的 shopId
  const isSelf = String(data.messagePublisherId) === String(targetShop.shopId)

  // 确保消息数组存在
  if (!contact.messages) {
    contact.messages = []
  }

  // 检查消息是否已存在（避免重复）
  const messageId = data.messageRecordId
  if (messageId) {
    const exists = contact.messages.some((m) => m.id === messageId)
    if (exists) {
      console.log('消息已存在，跳过:', messageId)
      return
    }
  }

  // 如果是自己的消息，删除临时消息（以 temp_ 开头的）
  if (isSelf && messageId) {
    contact.messages = contact.messages.filter((m) => !m.id.startsWith('temp_'))
  }

  contact.messages.push({
    id: messageId || `msg_${Date.now()}`,
    content,
    time: data.createTime || new Date().toISOString(),
    isSelf,
  })

  // 只有收到对方消息时才增加未读数
  if (!isSelf) {
    contact.unreadCount = (contact.unreadCount || 0) + 1
    contact.lastMessage = content
    contact.lastMessageTime = data.createTime
    targetShop.totalUnreadCount = targetShop.contacts.reduce(
      (sum, c) => sum + (c.unreadCount || 0),
      0,
    )
  } else {
    console.log('收到自己的消息，不增加未读数')
  }

  // 如果当前正在查看这个联系人，滚动到底部并标记已读
  if (currentContactId.value === contact.id) {
    await scrollToBottom()
    await markAsRead(sessionId)
  }
}

const updateConnectionStatus = () => {
  wsConnected.value = webSocketService.isConnected()
  shops.value.forEach((shop) => {
    shop.connected = wsConnected.value
  })
  console.log('🔌 连接状态:', wsConnected.value)
}

// 定时刷新（只更新会话信息，不更新消息，避免重复）
const startMessageRefresh = () => {
  if (messageRefreshInterval) clearInterval(messageRefreshInterval)
  messageRefreshInterval = setInterval(() => {
    if (currentShop.value) {
      // 只更新会话信息，不重新加载消息
      updateSessionInfo(currentShop.value)
    }
  }, 5000)
}

// 更新会话信息（不重载消息）
const updateSessionInfo = async (shop) => {
  if (!shop?.shopId) return
  try {
    const res = await getAllSessionList(shop.shopId)
    if (res?.data) {
      res.data.forEach((newContact) => {
        const existing = shop.contacts?.find((c) => c.sessionId === newContact.sessionId)
        if (existing) {
          // 只更新时间戳和在线状态，不更新未读数（因为未读数由前端管理）
          existing.lastMessage = newContact.lastMessage || ''
          existing.lastMessageTime = newContact.lastMessageTime || newContact.updateTime || ''
          existing.online = newContact.online || false
          // existing.unreadCount = newContact.unreadCount || 0  // 注释掉，避免覆盖前端未读数
        }
      })
      shop.totalUnreadCount = shop.contacts?.reduce((sum, c) => sum + (c.unreadCount || 0), 0) || 0
    }
  } catch (e) {
    console.error('更新会话信息失败:', e)
  }
}

// 删除确认
const showDeleteConfirm = () => {
  deleteConfirmVisible.value = true
}
const confirmDeleteMessages = async () => {
  if (currentContact.value) {
    currentContact.value.messages = []
    currentContact.value.lastMessage = ''
  }
  deleteConfirmVisible.value = false
}

// ==================== 外部打开聊天面板（从用户端发起） ====================
const handleOpenChatFromUser = async (event) => {
  const data = event.detail
  console.log('[商家端] 收到打开聊天事件:', data)
  if (!data || !data.sessionId) {
    console.error('[商家端] sessionId 不存在')
    return
  }

  // 确保有当前店铺
  if (!currentShop.value) {
    // 如果没有选择店铺，先尝试加载店铺列表
    if (shops.value.length > 0) {
      await selectShopAndOpenChat(shops.value[0])
    } else {
      console.error('[商家端] 没有可用的店铺')
      return
    }
  }

  // 检查是否已存在该联系人
  let contact = currentShop.value.contacts.find((c) => c.sessionId === data.sessionId)

  if (!contact) {
    // 创建新联系人
    contact = {
      id: data.sessionId,
      sessionId: data.sessionId,
      name: data.partnerName || '用户',
      avatar:
        data.partnerAvatar ||
        'https://storage.360buyimg.com/default.image/6a645f6465665f696d675f393836323131373632333134353935323236_sma.jpg',
      partnerId: data.partnerId,
      partnerType: data.partnerType || 'USER',
      unreadCount: 0,
      lastMessage: '',
      lastMessageTime: null,
      messages: [],
      avatarColor: '#1890ff',
    }
    currentShop.value.contacts.push(contact)
    console.log('[商家端] 创建新联系人:', contact)
  }

  // 打开聊天面板并切换到该联系人
  visible.value = true
  await nextTick()
  await switchContact(contact)
}

// ==================== 生命周期 ====================
onMounted(async () => {
  console.log('🟢 商家组件初始化')

  // 先加载店铺
  await fetchShops()
  //外部监听
  window.addEventListener('open-merchantChatToUser-session', handleOpenChatFromUser)

  // 监听事件（只监听特定事件，避免 websocket-message 重复）
  window.addEventListener('chat-message', handleWebSocketMessage)
  window.addEventListener('user-wechat-notification', handleWebSocketMessage)
  window.addEventListener('merchant-wechat-notification', handleWebSocketMessage)
  window.addEventListener('user-payment-notification', handleWebSocketMessage)
  window.addEventListener('user-refund-notification', handleWebSocketMessage)
  window.addEventListener('user-logistic-notification', handleWebSocketMessage)
  window.addEventListener('merchant-payment-notification', handleWebSocketMessage)
  window.addEventListener('merchant-refund-notification', handleWebSocketMessage)
  window.addEventListener('merchant-logistic-notification', handleWebSocketMessage)
  webSocketService.addConnectionListener(updateConnectionStatus)

  // 店铺加载完成后再连接 WebSocket
  if (currentShop.value?.shopId) {
    await connectWebSocket()
  } else {
    console.warn('⚠️ 没有选中店铺，稍后手动连接')
  }

  // 启动定时刷新
  startMessageRefresh()

  await nextTick()

  // 检查 DOM 元素
  console.log('🔍 DOM 检查:')
  console.log('  - messagesContainer:', messagesContainer.value)
  console.log('  - loadMoreTrigger:', loadMoreTrigger.value)
  console.log('  - scrollAnchor:', scrollAnchor.value)

  if (messagesContainer.value) {
    messagesContainer.value.addEventListener('scroll', handleUserScroll)
  }
  setupIntersectionObserver()
})

onUnmounted(() => {
  //外部监听
  window.removeEventListener('open-merchantChatToUser-session', handleOpenChatFromUser)

  window.removeEventListener('chat-message', handleWebSocketMessage)
  window.removeEventListener('user-wechat-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-wechat-notification', handleWebSocketMessage)
  window.removeEventListener('user-payment-notification', handleWebSocketMessage)
  window.removeEventListener('user-refund-notification', handleWebSocketMessage)
  window.removeEventListener('user-logistic-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-payment-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-refund-notification', handleWebSocketMessage)
  window.removeEventListener('merchant-logistic-notification', handleWebSocketMessage)

  window.removeEventListener('chat-message', handleWebSocketMessage)

  window.removeEventListener('chat-message', handleWebSocketMessage)

  window.removeEventListener('chat-message', handleWebSocketMessage)
  webSocketService.removeConnectionListener(updateConnectionStatus)

  if (messageRefreshInterval) clearInterval(messageRefreshInterval)
  if (intersectionObserver) intersectionObserver.disconnect()
})

watch([visible, currentContactId], async () => {
  if (visible.value && currentContact.value) {
    if (currentContact.value.unreadCount > 0) {
      await markAsRead(currentContact.value.sessionId)
    }
  }
  if (observerDebounceTimer) {
    clearTimeout(observerDebounceTimer)
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
.shop-card-avatar-wrapper {
  position: relative;
  margin-bottom: 12px;
}

.shop-card:hover .shop-card-avatar-wrapper {
  transform: scale(1.1);
}

.shop-card-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;

  overflow: hidden;
  transition: transform 0.3s ease;
}

.shop-card:hover .shop-default-icon {
  transform: scale(1.1);
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
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 20px;
  min-width: 24px;
  text-align: center;
  box-shadow:
    0 3px 8px rgba(255, 59, 48, 0.4),
    0 1px 2px rgba(0, 0, 0, 0.1);
  animation: badgePulse 2s ease-in-out infinite;
  transform: scale(1);
  transition: transform 0.2s ease;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #ff3b30 0%, #ff6b6b 100%);
}
.shop-card:hover .unread-badge-large {
  transform: scale(1.2);
}

@keyframes badgePulse {
  0%,
  100% {
    box-shadow:
      0 3px 8px rgba(255, 59, 48, 0.4),
      0 1px 2px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow:
      0 4px 12px rgba(255, 59, 48, 0.6),
      0 2px 4px rgba(0, 0, 0, 0.15);
  }
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

/* 动画 */
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

/* 店铺切换按钮 */
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
.contact-sidebar.collapsed .switch-shop-btn .shop-btn-name,
.contact-sidebar.collapsed .switch-shop-btn svg {
  display: none;
}

.contact-sidebar.collapsed .switch-shop-btn {
  padding: 6px;
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
  width: 100px;
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
.sidebar-footer {
  padding: 12px 16px;
  border-top: 0.5px solid #e5e5e5;
  display: flex;
  justify-content: center;
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
  top: -6px;
  right: -8px;
  background: linear-gradient(135deg, #ff3b30 0%, #ff6b6b 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 20px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(255, 59, 48, 0.4);
  z-index: 10;
}

.contact-info {
  flex: 1;
  min-width: 0;
}
.contact-sidebar.collapsed .contact-info {
  display: none;
}

.contact-sidebar.collapsed .sidebar-title {
  display: none;
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
.contact-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
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

.empty-contacts {
  padding: 20px;
  text-align: center;
  color: #8e8e93;
  font-size: 12px;
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
  visibility: visible;
}

/* ==================== 加载指示器样式 ==================== */

/* ==================== 加载指示器样式 ==================== */

.loading-more-wrapper {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  background: linear-gradient(to bottom, #f5f5f5 60%, transparent); /* 和消息背景同色，渐变透明 */
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-more {
  display: inline-flex;
}

.loading-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2.5px solid #e5e5e5;
  border-top-color: #34c759;
  border-right-color: #34c759;
  border-radius: 50%;
  animation: spinnerRotate 0.7s linear infinite;
}

@keyframes spinnerRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-label {
  font-size: 13px;
  color: #8e8e93;
  font-weight: 500;
}

.no-more-messages {
  position: sticky;
  top: 0;
  z-index: 5;
  text-align: center;
  padding: 12px 0;
  background: #f5f5f5;
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

.scroll-anchor {
  height: 1px;
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
.fab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
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
