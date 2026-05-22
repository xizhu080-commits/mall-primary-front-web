<template>
  <div>
    <!--用户 主聊天面板 -->
    <transition name="slide-fade">
      <div v-if="visible" class="chat-panel">
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
            <div
              v-for="contact in contacts"
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
          </div>
        </div>

        <!-- 右侧聊天区域 -->
        <div class="chat-area">
          <!-- 聊天头部 -->
          <div class="chat-header" v-if="currentContact">
            <div class="header-info">
              <div class="chat-name">{{ currentContact.name }}</div>
              <div class="chat-status">
                <span
                  :class="['status-dot', { online: wsConnected, offline: !wsConnected }]"
                ></span>
                <span>{{ wsConnected ? '在线' : '离线' }}</span>
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
              <div class="system-message" v-if="!wsConnected">
                <span class="system-text">当前网络不可用，消息将无法实时接收</span>
              </div>

              <!-- 顶部加载更多触发器 -->
              <div class="load-more-trigger" ref="loadMoreTrigger"></div>

              <!-- 加载更多指示器 -->
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

              <!-- 没有更多消息提示 -->
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
                    <div class="avatar self-avatar">我</div>
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
                :disabled="!wsConnected"
              />
              <button
                class="send-btn"
                @click="sendMessage"
                :disabled="!wsConnected || !inputMessage.trim()"
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
              <button class="tool-btn" @click="testConnection" :class="{ active: !wsConnected }">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23 4V10H17M1 20V14H7M3.51 9C5.73 5.46 9.66 3 14.17 3C20.25 3 25.08 7.83 25.08 13.92C25.08 20 20.25 24.83 14.17 24.83C8.09 24.83 3.26 20 3.26 13.92"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                {{ wsConnected ? '已连接' : '重连' }}
              </button>
            </div>
          </div>
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
      @click="visible = !visible"
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

// 响应式数据
const contacts = ref([])
const visible = ref(false)
const wsConnected = ref(false)
const inputMessage = ref('')
const messagesContainer = ref(null)
const scrollAnchor = ref(null)
const loadMoreTrigger = ref(null)
const sidebarCollapsed = ref(false)
const currentContactId = ref('')
const deleteConfirmVisible = ref(false)
const isLoadingMore = ref(false)
const hasMoreMessages = ref(true)

// 用户信息
const userInfo = localStorage.getItem('mall-user_merchant-info')
const info = JSON.parse(userInfo)
const userId = ref(info.userId)
const userType = ref(info.identityType == '商家' ? 'MERCHANT' : 'USER')
const token = ref(info.token)
console.log('token.value:', token.value)
// 定时器和观察者
let statusInterval = null
let messageRefreshInterval = null
let intersectionObserver = null
let loadMoreLock = false
let shouldAutoScroll = true

// 计算属性
const currentContact = computed(() => {
  return contacts.value.find((c) => c.id === currentContactId.value)
})

const currentMessages = computed(() => {
  return currentContact.value?.messages || []
})

const totalUnreadCount = computed(() => {
  return contacts.value.reduce((sum, contact) => sum + (contact.unreadCount || 0), 0)
})

// ==================== 工具函数 ====================

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

const getContactColorByType = (partnerType) => {
  const colorMap = {
    MERCHANT: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    USER: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    PAYMENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    REFUND: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    LOGISTIC: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  }
  return colorMap[partnerType] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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

// ==================== API 调用 ====================

const fetchSessionList = async () => {
  try {
    const response = await getAllSessionList()

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

      contacts.value = newContacts

      if (newContacts.length > 0 && !currentContactId.value) {
        currentContactId.value = newContacts[0].id
        await loadSessionMessages(newContacts[0].sessionId)
        shouldAutoScroll = true
        await forceScrollToBottom()
      }
    }
  } catch (error) {
    console.error('获取会话列表失败:', error)
  }
}

const loadSessionMessages = async (sessionId, beforeId = null, isLoadMore = false) => {
  if (!sessionId) return

  try {
    const params = {
      sessionId: sessionId,
      limit: 20,
      beforeId: beforeId,
    }

    const response = await getSpectifyMessageList(params)

    if (response.code === 200 && Array.isArray(response.data)) {
      const messageRecords = response.data

      const newMessages = messageRecords.map((record) => {
        // 修复：正确判断消息是否为自己发送的
        let isSelf = false

        // 情况1：messagePublisherId 有值且等于当前用户ID
        if (record.messagePublisherId && userId.value) {
          isSelf = record.messagePublisherId === userId.value
        }
        // 情况2：messagePublisherId 为空，尝试从 sessionId 中提取用户ID
        else if (!record.messagePublisherId && record.sessionId) {
          // sessionId 格式：用户A::用户B
          const userIds = record.sessionId.split('::')
          // 如果当前用户ID在 sessionId 中，且消息发布者为空，可能是系统消息或特殊消息
          // 这种情况下，通常不是用户自己发送的
          isSelf = false
        }

        // 情况3：通过 targetUserId 辅助判断（当 messagePublisherId 为空且 targetUserId 等于当前用户时）
        if (!record.messagePublisherId && record.targetUserId === userId.value) {
          // 消息发布者为空，但接收方是当前用户，说明是对方发送的系统消息
          isSelf = false
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

      let contact = contacts.value.find((c) => c.sessionId === sessionId)

      if (!contact) {
        contact = {
          id: sessionId,
          sessionId: sessionId,
          name: '加载中...',
          avatar: '💬',
          messages: [],
          unreadCount: 0,
        }
        contacts.value.push(contact)
      } else {
        if (isLoadMore) {
          const existingIds = new Set(contact.messages.map((m) => m.id))
          const toPrepend = newMessages.filter((m) => !existingIds.has(m.id))
          contact.messages = toPrepend.concat(contact.messages)
        } else {
          contact.messages = newMessages
        }
        hasMoreMessages.value = messageRecords.length >= (params.limit || 20)
      }

      if (contact.messages.length > 0) {
        const lastMsg = contact.messages[contact.messages.length - 1]
        contact.lastMessage =
          lastMsg.content.length > 50 ? lastMsg.content.substring(0, 50) + '...' : lastMsg.content
      }
    }
  } catch (error) {
    console.error('加载会话消息失败:', error)
  }
}

const markSessionAsRead = async (sessionId) => {
  if (!sessionId) return false

  const contact = contacts.value.find((c) => c.sessionId === sessionId || c.id === sessionId)

  if (!contact || contact.unreadCount === 0) {
    return false
  }

  try {
    const response = await markAllAsRead(sessionId)

    if (response.code === 200) {
      contact.unreadCount = 0
      return true
    }
    return false
  } catch (error) {
    console.error('标记已读失败:', error)
    return false
  }
}

// ==================== WebSocket 消息发送 ====================

const sendMessageViaWebSocket = async (contact, content) => {
  if (!webSocketService.isConnected()) {
    return false
  }

  try {
    const messageData = {
      messagePublisherId: userId.value,
      messagePublisherType: userType.value,
      targetUserId: contact.partnerId,
      targetUserType: contact.partnerType,
      content: content,
      sessionId: contact.sessionId,
      createTime: new Date().toISOString(),
    }
    console.log('发送消息:', messageData)
    await sendSocketMessage('/app/sendPrivateMessage', messageData, {
      retry: true,
      maxRetries: 3,
      priority: 'normal',
    })

    return true
  } catch (error) {
    console.error('WebSocket 消息发送失败:', error)
    return false
  }
}

// ==================== 消息处理 ====================

// 判断消息是否为自己发送的辅助函数
const isSelfMessage = (record) => {
  if (!userId.value) return false

  // 如果有 messagePublisherId 且不为空
  if (record.messagePublisherId) {
    return record.messagePublisherId === userId.value
  }

  // 如果 messagePublisherId 为空，通过其他方式判断
  // 从 sessionId 中提取两个用户ID
  if (record.sessionId) {
    const userIds = record.sessionId.split('::')
    // 如果当前用户ID在会话中，且消息发布者为空，说明是对方发送的消息
    // 因为自己发送的消息一定有 messagePublisherId
    return false
  }

  return false
}

const addMessageToContact = async (
  sessionId,
  content,
  isSelf = false,
  isSystem = false,
  rawData = null,
) => {
  if (!sessionId) {
    console.warn('addMessageToContact: 缺少 sessionId')
    return null
  }

  let contact = contacts.value.find((c) => c.id === sessionId || c.sessionId === sessionId)

  if (!contact && rawData?.sessionId) {
    await fetchSessionList()
    contact = contacts.value.find((c) => c.id === sessionId || c.sessionId === sessionId)

    if (!contact && rawData) {
      const isSelfMessageFlag = isSelf || rawData.messagePublisherId === userId.value
      const partnerName = isSelfMessageFlag
        ? rawData.targetUserName
        : rawData.partnerName || rawData.messagePublisherName
      const partnerId = isSelfMessageFlag ? rawData.targetUserId : rawData.messagePublisherId
      const partnerType = isSelfMessageFlag ? rawData.targetUserType : rawData.messagePublisherType

      const newContact = {
        id: sessionId,
        sessionId: sessionId,
        name: partnerName || (partnerType === 'MERCHANT' ? '商家' : '用户'),
        avatar: rawData.partnerAvatar || getDefaultAvatar(partnerType),
        partnerId: partnerId,
        partnerType: partnerType,
        messages: [],
        unreadCount: 0,
        lastMessage: content,
        lastMessageTime: new Date().toISOString(),
      }
      contacts.value.unshift(newContact)
      contact = newContact
    }
  }

  if (!contact) return null

  const newMsg = {
    id: rawData?.messageRecordId || Date.now() + Math.random(),
    content: content,
    time: rawData?.createTime || new Date().toISOString(),
    isSelf: isSelf,
    isSystem: isSystem,
    isRead: isSelf,
    rawData: rawData,
  }

  const exists = contact.messages.some((m) => m.id === newMsg.id)
  if (exists) return null

  contact.messages.push(newMsg)
  contact.messages.sort((a, b) => new Date(a.time) - new Date(b.time))

  contact.lastMessage = content.length > 50 ? content.substring(0, 50) + '...' : content
  contact.lastMessageTime = newMsg.time

  const isCurrentChat = currentContactId.value === contact.id && visible.value

  if (!isSelf && !isCurrentChat) {
    contact.unreadCount = (contact.unreadCount || 0) + 1
  }

  if (isCurrentChat && visible.value && isNearBottom()) {
    shouldAutoScroll = true
    await scrollToBottomIfNeeded()
  }

  return newMsg
}

const sendMessage = async () => {
  const text = inputMessage.value.trim()
  if (!text) return

  if (!wsConnected.value || !currentContact.value) {
    await addMessageToContact(currentContactId.value, '当前网络未连接，消息发送失败', true, true)
    inputMessage.value = ''
    return
  }

  shouldAutoScroll = true

  const tempMsgId = `temp_${Date.now()}`
  await addMessageToContact(currentContactId.value, text, true, false, {
    messageRecordId: tempMsgId,
    createTime: new Date().toISOString(),
    sessionId: currentContact.value.sessionId,
    messagePublisherId: userId.value, // 添加发布者ID
  })

  inputMessage.value = ''
  await forceScrollToBottom()

  const success = await sendMessageViaWebSocket(currentContact.value, text)

  if (!success) {
    await addMessageToContact(currentContactId.value, '消息发送失败，请重试', true, true)
  }
}

// ==================== WebSocket 消息接收 ====================

const handleWebSocketMessage = async (event) => {
  const notification = event.detail

  if (!notification) return

  let content = ''
  let sessionId = ''
  let messagePublisherId = ''
  let messagePublisherType = ''

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
    console.warn('收到消息但无 sessionId:', notification)
    return
  }

  // 判断是否为自己发送的消息
  const isSelf = messagePublisherId === userId.value

  await addMessageToContact(sessionId, content, isSelf, false, notification)
}

const updateConnectionStatus = () => {
  wsConnected.value = webSocketService.isConnected()
}

// ==================== 加载更多消息 ====================

const loadMoreMessages = async () => {
  if (!currentContact.value?.sessionId) return
  if (isLoadingMore.value) return
  if (!hasMoreMessages.value) return
  if (loadMoreLock) return

  loadMoreLock = true

  const messages = currentMessages.value

  if (messages.length === 0) {
    loadMoreLock = false
    return
  }

  isLoadingMore.value = true

  if (intersectionObserver) {
    try {
      intersectionObserver.disconnect()
    } catch (e) {
      console.warn('disconnect observer failed', e)
    }
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
  const oldestMsg = messages[0]

  const beforeId =
    (oldestMsg.rawData && oldestMsg.rawData.messageRecordId) ||
    oldestMsg.messageRecordId ||
    oldestMsg.id ||
    ''

  if (!beforeId) {
    console.warn('无有效 beforeId，取消加载更多请求')
    isLoadingMore.value = false
    setupIntersectionObserver()
    loadMoreLock = false
    return
  }

  try {
    await loadSessionMessages(currentContact.value.sessionId, beforeId, true)
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

const switchContact = async (contact) => {
  if (currentContactId.value === contact.id) return

  isLoadingMore.value = false
  hasMoreMessages.value = true
  shouldAutoScroll = true

  currentContactId.value = contact.id

  if (contact.sessionId && contact.unreadCount > 0) {
    await markSessionAsRead(contact.sessionId)
  }

  if (contact.messages.length === 0 && contact.sessionId) {
    await loadSessionMessages(contact.sessionId)
  }

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
  if (currentContact.value) {
    currentContact.value.messages = []
    currentContact.value.lastMessage = ''
    addMessageToContact(currentContactId.value, '聊天记录已清空', false, true)
  }
  deleteConfirmVisible.value = false
}
//============================================================================连接websocket====================================================================================
const testConnection = () => {
  wsConnected.value = webSocketService.isConnected()
  console.log(wsConnected.value)
  if (!webSocketService.isConnected()) {
    webSocketService.connect(userId.value, token.value, null)
  } else {
    fetchSessionList()
  }
}
// ==================== 生命周期 ====================

const startMessageRefresh = () => {
  if (messageRefreshInterval) {
    clearInterval(messageRefreshInterval)
  }

  messageRefreshInterval = setInterval(async () => {
    if (
      !wsConnected.value &&
      visible.value &&
      currentContact.value?.sessionId &&
      !isLoadingMore.value
    ) {
      const wasNearBottom = isNearBottom()
      await loadSessionMessages(currentContact.value.sessionId)
      if (wasNearBottom && shouldAutoScroll) {
        await forceScrollToBottom()
      }
    }
  }, 5000)
}

onMounted(async () => {
  console.log('当前登录用户信息:', { 用户端userId: userId.value, 用户端token: token.value })
  // ✅ 添加：主动建立 WebSocket 连接
  if (!webSocketService.isConnected() && userId.value && token.value) {
    console.log('主动建立 WebSocket 连接')
    await webSocketService.connect(userId.value, token.value, null)
  }

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

  await fetchSessionList()

  statusInterval = setInterval(() => {
    wsConnected.value = webSocketService.isConnected()
  }, 1000)

  startMessageRefresh()

  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.addEventListener('scroll', handleUserScroll)
  }
  setupIntersectionObserver()
})

onUnmounted(() => {
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
  if (messageRefreshInterval) {
    clearInterval(messageRefreshInterval)
  }

  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  if (messagesContainer.value) {
    messagesContainer.value.removeEventListener('scroll', handleUserScroll)
  }
})

watch([visible, currentContactId], async () => {
  if (visible.value && currentContact.value) {
    if (currentContact.value.unreadCount > 0) {
      await markSessionAsRead(currentContact.value.sessionId)
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
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
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

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #e5e5e5;
  border-top-color: #34c759;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  max-width: 80%;
}

.message-self {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.message-other {
  align-self: flex-start;
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
}

.message-bubble {
  background: #ffffff;
  border-radius: 18px;
  padding: 10px 14px;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.05);
}

.message-self .message-bubble {
  background: #dcf8c5;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  color: #1f1f1f;
  word-wrap: break-word;
  white-space: pre-wrap;
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

.confirm-dialog {
  background: white;
  border-radius: 24px;
  width: 320px;
  padding: 24px;
  text-align: center;
  animation: scaleIn 0.2s ease;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
