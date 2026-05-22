import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
// 默认配置
const DEFAULT_CONFIG = {
  // 连接配置
  reconnectDelay: 5000,
  maxReconnectAttempts: 5,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,

  // 心跳配置
  heartbeatInterval: 5000,
  heartbeatTimeout: 10000,

  // 消息队列配置
  maxQueueSize: 100,
  messageRetryDelay: 1000,
  maxRetryDelay: 10000,

  // 订阅路径配置
  subscriptionPaths: {
    // ✅ 添加：聊天消息订阅（关键！）
    chat: {
      user: '/user/queue/chat',
      merchant: '/user/queue/chat',
      eventNames: {
        user: 'chat-message',
        merchant: 'chat-message',
      },
    },
    payment: {
      user: '/user/queue/userPaymentNotify',
      merchant: '/user/queue/merchantPaymentNotify',
      eventNames: {
        user: 'user-payment-notification',
        merchant: 'merchant-payment-notification',
      },
    },
    refund: {
      user: '/user/queue/userRefundNotify',
      merchant: '/user/queue/merchantRefundNotify',
      eventNames: {
        user: 'user-refund-notification',
        merchant: 'merchant-refund-notification',
      },
    },
    logistic: {
      user: '/user/queue/userLogisticNotify',
      merchant: '/user/queue/merchantLogisticNotify',
      eventNames: {
        user: 'user-logistic-notification',
        merchant: 'merchant-logistic-notification',
      },
    },
    wechat: {
      user: '/user/queue/userWeChatMessage',
      merchant: '/user/queue/merchantWeChatMessage',
      eventNames: {
        user: 'user-wechat-notification',
        merchant: 'merchant-wechat-notification',
      },
    },
  },

  // 消息确认路径
  ackDestination: '/app/messageAck',

  // 日志配置
  enableDebugLog: process.env.NODE_ENV === 'development',
  // 优先级顺序
  priorityOrder: { high: 0, normal: 1, low: 2 },
}

class WebSocketService {
  constructor(config = {}) {
    // 合并配置
    this.config = { ...DEFAULT_CONFIG, ...config }

    this.client = null
    this.connected = false
    this.userId = null
    this.token = null
    this.orderId = null

    // 回调函数
    this.callbacks = {
      payment: null,
      refund: null,
      logistic: null,
      wechat: null,
    }

    // 订阅列表
    this.subscriptions = []

    // 消息队列
    this.messageQueue = []

    // 重连计数
    this.reconnectAttempts = 0

    // 心跳
    this.heartbeatInterval = null
    this.lastHeartbeat = Date.now()

    // 连接Promise
    this.connectingPromise = null

    // 连接监听器
    this.connectionListeners = []
  }

  /**
   * 更新配置
   */
  updateConfig(config) {
    this.config = { ...this.config, ...config }
    console.log('⚙️ WebSocket配置已更新:', this.config)
  }

  /**
   * 添加连接状态监听器
   */
  addConnectionListener(listener) {
    if (typeof listener === 'function') {
      this.connectionListeners.push(listener)
    }
  }

  /**
   * 移除连接状态监听器
   */
  removeConnectionListener(listener) {
    const index = this.connectionListeners.indexOf(listener)
    if (index > -1) {
      this.connectionListeners.splice(index, 1)
    }
  }

  /**
   * 通知连接状态变化
   */
  notifyConnectionStatusChange(status, data = null) {
    this.connectionListeners.forEach((listener) => {
      try {
        listener(status, data)
      } catch (error) {
        console.error('连接监听器执行失败:', error)
      }
    })
  }

  /**
   * 获取WebSocket连接URL
   */
  /**
   * 获取WebSocket连接URL
   */
  getWebSocketUrl(userId, shopId) {
    console.log('获取WebSocket连接URL:', userId, shopId)
    const baseUrl = this.config.webSocketBaseUrl || ''
    const path = this.config.webSocketPath || '/ws'

    // 构建基础 URL
    let url = `${baseUrl}${path}?userId=${userId}`

    // ✅ 新增：如果是商家，添加 shopId 参数
    if (shopId) {
      url += `&shopId=${shopId}`
      console.log('商家连接，使用店铺ID:', shopId)
    }

    return url
  }

  /**
   * 建立 WebSocket 连接（💡 删除了第三个参数 customConfig）
   */
  connect(userId, token, shopId) {
    this.userId = userId
    this.token = token

    console.log('🚀 启动WebSocket连接:', userId, token, shopId)
    // 如果已经连接且是同一个用户，直接返回
    if (this.isConnected() && this.userId === userId) {
      console.log('WebSocket已连接，跳过重复连接')
      return Promise.resolve()
    }

    // 如果正在连接中，返回现有的 Promise
    if (this.connectingPromise) {
      return this.connectingPromise
    }

    // 先断开现有连接（避免重复连接）
    if (this.client && this.client.connected) {
      this.disconnect(false)
    }

    this.reconnectAttempts = 0
    this.connectingPromise = new Promise((resolve, reject) => {
      const wsUrl = this.getWebSocketUrl(userId, shopId)

      console.log('🔗 =====WebSocket连接地址:====', wsUrl)

      this.client = new Client({
        webSocketFactory: () => new SockJS(wsUrl),

        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },

        debug: (str) => {
          if (this.config.enableDebugLog) {
            console.log('STOMP', str)
          }
        },
        // 增加连接超时时间
        connectionTimeout: 10000,
        reconnectDelay: this.config.reconnectDelay,

        heartbeatIncoming: this.config.heartbeatIncoming,
        heartbeatOutgoing: this.config.heartbeatOutgoing,

        onConnect: () => {
          console.log('✅ WebSocket连接成功:', userId)

          this.connected = true
          this.reconnectAttempts = 0
          this.lastHeartbeat = Date.now()

          this.startHeartbeat()
          this.subscribeAll()
          this.flushMessageQueue()

          this.notifyConnectionStatusChange('connected', { userId })
          this.connectingPromise = null

          resolve()
        },
        onStompError: (frame) => {
          console.error('❌ STOMP错误:', frame)
          this.notifyConnectionStatusChange('error', { type: 'stomp', frame })
          this.connectingPromise = null
          reject(new Error(frame.headers?.message || 'STOMP连接错误'))
        },

        onWebSocketError: (event) => {
          console.error('❌ WebSocket错误:', event)
          this.notifyConnectionStatusChange('error', { type: 'websocket', event })

          // 如果是连接中的错误，reject Promise
          if (this.connectingPromise) {
            this.connectingPromise = null
            reject(new Error('WebSocket连接失败'))
          }
        },

        onWebSocketClose: (event) => {
          console.log('🔌 WebSocket关闭:', event.code, event.reason)
          this.connected = false
          this.stopHeartbeat()
          this.notifyConnectionStatusChange('disconnected', { event })

          // 自动重连
          if (
            this.reconnectAttempts < this.config.maxReconnectAttempts &&
            this.userId &&
            this.token
          ) {
            this.reconnectAttempts++
            const delay = this.config.reconnectDelay * Math.min(this.reconnectAttempts, 3)
            console.log(`🔄 第 ${this.reconnectAttempts} 次重连，延迟 ${delay}ms`)

            setTimeout(() => {
              if (this.userId && this.token && !this.connected) {
                this.connect(this.userId, this.token).catch((err) => {
                  console.error('重连失败:', err)
                })
              }
            }, delay)
          } else if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
            console.error('❌ 达到最大重连次数，停止重连')
            this.notifyConnectionStatusChange('failed', {
              maxAttempts: this.config.maxReconnectAttempts,
            })
          }
        },

        onDisconnect: () => {
          console.log('🔌 WebSocket断开')

          this.connected = false
          this.stopHeartbeat()
          this.notifyConnectionStatusChange('disconnected', { reason: 'manual' })
        },
      })

      this.client.activate()
    })

    return this.connectingPromise
  }

  /**
   * 启动心跳检测
   */
  startHeartbeat() {
    this.stopHeartbeat()

    this.heartbeatInterval = setInterval(() => {
      const now = Date.now()
      const timeSinceLastHeartbeat = now - this.lastHeartbeat

      if (timeSinceLastHeartbeat > this.config.heartbeatTimeout) {
        console.warn('⚠️ 心跳超时，尝试重连')
        this.reconnect()
      }

      if (this.isConnected()) {
        this.sendHeartbeat()
      }
    }, this.config.heartbeatInterval)
  }

  /**
   * 停止心跳检测
   */
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  /**
   * 发送心跳
   */
  sendHeartbeat() {
    if (this.isConnected()) {
      this.lastHeartbeat = Date.now()
    }
  }

  /**
   * 手动重连
   */
  async reconnect() {
    if (this.userId && this.token) {
      this.disconnect(false)
      await this.connect(this.userId, this.token)
    }
  }

  /**
   * 通用订阅方法
   */
  subscribeQueue(destination, eventName, callbackKey) {
    if (!this.client || !this.connected) {
      console.warn('⚠️ WebSocket未连接，无法订阅:', destination)
      return null
    }

    const alreadySubscribed = this.subscriptions.some((sub) => sub.destination === destination)

    if (alreadySubscribed) {
      if (this.config.enableDebugLog) {
        console.warn('⚠️ 已订阅，跳过重复订阅:', destination)
      }
      return null
    }

    if (this.config.enableDebugLog) {
      console.log('📡 订阅:', destination)
    }

    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const data = JSON.parse(message.body)
        this.lastHeartbeat = Date.now()

        if (this.config.enableDebugLog) {
          console.log('📥 收到消息:', { destination, data })
        }

        // 全局事件
        window.dispatchEvent(new CustomEvent(eventName, { detail: data }))

        // 执行回调
        const callback = this.callbacks[callbackKey]
        if (callback) {
          if (!this.orderId || data.orderId === this.orderId) {
            callback(data)
          }
        }

        // 发送消息确认
        if (data.messageId && this.config.ackDestination) {
          this.sendMessageAck(data.messageId)
        }
      } catch (error) {
        console.error('❌ 消息解析失败:', error)
        console.error('原始消息:', message.body)
      }
    })

    this.subscriptions.push({ subscription, destination })
    return subscription
  }

  /**
   * 发送消息确认
   */
  sendMessageAck(messageId) {
    if (this.isConnected() && this.config.ackDestination) {
      this.client.publish({
        destination: this.config.ackDestination,
        body: JSON.stringify({
          messageId,
          userId: this.userId,
          timestamp: Date.now(),
        }),
      })
    }
  }

  /**
   * 订阅所有消息
   */
  subscribeAll() {
    if (!this.isConnected()) {
      console.warn('⚠️ WebSocket未连接，无法订阅')
      return
    }

    this.unsubscribeAll()

    // 遍历配置中的所有订阅
    Object.keys(this.config.subscriptionPaths).forEach((type) => {
      const paths = this.config.subscriptionPaths[type]

      // 订阅用户端
      if (paths.user && paths.eventNames?.user) {
        this.subscribeQueue(paths.user, paths.eventNames.user, type)
      }

      // 订阅商户端
      if (paths.merchant && paths.eventNames?.merchant) {
        this.subscribeQueue(paths.merchant, paths.eventNames.merchant, type)
      }
    })
  }

  /**
   * 生成消息ID
   */
  generateMessageId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${this.userId}`
  }

  /**
   * 添加消息到队列
   */
  addToMessageQueue(message) {
    const priorityOrder = this.config.priorityOrder || { high: 0, normal: 1, low: 2 }
    const insertIndex = this.messageQueue.findIndex(
      (m) => priorityOrder[m.priority] > priorityOrder[message.priority],
    )

    if (insertIndex === -1) {
      this.messageQueue.push(message)
    } else {
      this.messageQueue.splice(insertIndex, 0, message)
    }

    // 限制队列大小
    if (this.messageQueue.length > this.config.maxQueueSize) {
      this.messageQueue = this.messageQueue.slice(-this.config.maxQueueSize)
    }
  }

  /**
   * 立即发送消息
   */
  sendMessageImmediately(message) {
    if (!this.isConnected()) {
      throw new Error('WebSocket未连接')
    }

    const publishOptions = {
      destination: message.destination,
      body: JSON.stringify(message.data),
    }

    if (message.messageId) {
      publishOptions.receipt = message.messageId
    }

    this.client.publish(publishOptions)

    if (this.config.enableDebugLog) {
      console.log('📤 发送消息:', {
        destination: message.destination,
        messageId: message.messageId,
      })
    }

    return message.messageId
  }

  /**
   * 带重试的消息发送
   */
  async sendMessageWithRetry(message, maxRetries) {
    let lastError = null

    for (let i = 0; i < maxRetries; i++) {
      try {
        if (!this.isConnected()) {
          if (this.userId && this.token) {
            await this.connect(this.userId, this.token)
          } else {
            throw new Error('未设置userId或token，无法重连')
          }
        }

        this.sendMessageImmediately(message)
        return message.messageId
      } catch (error) {
        lastError = error
        console.error(`发送失败 (${i + 1}/${maxRetries}):`, error)

        if (i < maxRetries - 1) {
          const delay = Math.min(
            this.config.messageRetryDelay * Math.pow(2, i),
            this.config.maxRetryDelay,
          )
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    throw lastError
  }

  /**
   * 发送消息
   */
  async sendMessage(destination, data, options = {}) {
    const {
      retry = true,
      maxRetries = 3,
      cache = true,
      needReceipt = false,
      priority = 'normal',
    } = options

    const message = {
      destination,
      data: {
        ...data,
        timestamp: Date.now(),
        userId: this.userId,
      },
      messageId: needReceipt ? this.generateMessageId() : null,
      timestamp: Date.now(),
      priority,
    }

    if (!this.isConnected()) {
      if (cache) {
        this.addToMessageQueue(message)
        console.warn('⚠️ WebSocket未连接，消息已缓存:', destination)
      } else {
        throw new Error('WebSocket未连接且不允许缓存')
      }
      return null
    }

    if (retry) {
      return this.sendMessageWithRetry(message, maxRetries)
    } else {
      return this.sendMessageImmediately(message)
    }
  }

  /**
   * 刷新消息队列
   */
  async flushMessageQueue() {
    if (!this.isConnected()) {
      console.warn('⚠️ WebSocket未连接，无法发送缓存消息')
      return
    }

    console.log(`📤 开始发送 ${this.messageQueue.length} 条缓存消息`)

    const failedMessages = []

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      try {
        await this.sendMessageWithRetry(message, 1)
        if (this.config.enableDebugLog) {
          console.log('✅ 缓存消息发送成功:', message.destination)
        }
      } catch (error) {
        console.error('❌ 缓存消息发送失败:', error)
        failedMessages.push(message)
      }
    }

    if (failedMessages.length > 0) {
      this.messageQueue.unshift(...failedMessages)
      console.warn(`⚠️ ${failedMessages.length} 条缓存消息发送失败，稍后重试`)
    }
  }

  /**
   * 清除消息队列
   */
  clearMessageQueue() {
    this.messageQueue = []
    console.log('🧹 消息队列已清除')
  }

  /**
   * 初始化 WebSocket（💡 内部移除了未定义的 customConfig 逻辑）
   */
  async init(userId, token, callbacks = {}, orderId = null) {
    this.callbacks = {
      payment: callbacks.payment || null,
      refund: callbacks.refund || null,
      logistic: callbacks.logistic || null,
      wechat: callbacks.wechat || null,
    }

    this.orderId = orderId

    try {
      await this.connect(userId, token)
      return true
    } catch (error) {
      console.error('WebSocket初始化失败:', error)
      return false
    }
  }

  /**
   * 取消所有订阅
   */
  unsubscribeAll() {
    this.subscriptions.forEach((sub) => {
      try {
        if (sub.subscription && typeof sub.subscription.unsubscribe === 'function') {
          sub.subscription.unsubscribe()
        }
      } catch (e) {
        console.error('取消订阅失败:', e)
      }
    })

    this.subscriptions = []

    if (this.config.enableDebugLog) {
      console.log('📡 已取消所有订阅')
    }
  }

  /**
   * 断开连接
   */
  disconnect(clearUserId = true) {
    this.unsubscribeAll()
    this.stopHeartbeat()
    this.clearMessageQueue()

    if (this.client) {
      try {
        this.client.deactivate()
      } catch (error) {
        console.error('断开连接失败:', error)
      }
    }

    this.connected = false
    this.client = null
    this.connectingPromise = null

    if (clearUserId) {
      this.userId = null
      this.token = null
      this.orderId = null
      this.callbacks = {
        payment: null,
        refund: null,
        logistic: null,
        wechat: null,
      }
    }

    this.notifyConnectionStatusChange('manualDisconnect')
    console.log('🔌 WebSocket已完全断开')
  }

  /**
   * 检查是否已连接
   */
  isConnected() {
    return this.connected && this.client && this.client.connected
  }

  /**
   * 获取连接状态
   */
  getConnectionStatus() {
    return {
      connected: this.isConnected(),
      userId: this.userId,
      orderId: this.orderId,
      subscriptions: this.subscriptions.length,
      messageQueueSize: this.messageQueue.length,
      reconnectAttempts: this.reconnectAttempts,
      config: {
        reconnectDelay: this.config.reconnectDelay,
        maxReconnectAttempts: this.config.maxReconnectAttempts,
        heartbeatTimeout: this.config.heartbeatTimeout,
      },
    }
  }

  /**
   * 手动重连
   */
  async reconnectManually() {
    if (!this.userId && !this.token) {
      throw new Error('无法重连：userId、token未设置')
    }

    this.disconnect(false)
    await this.connect(this.userId, this.token)
  }

  /**
   * 更新订单ID
   */
  updateOrderId(orderId) {
    this.orderId = orderId
    console.log('🔄 更新订单ID:', orderId)
  }

  /**
   * 更新回调函数
   */
  updateCallbacks(callbacks) {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    }
    console.log('🔄 更新回调函数')
  }

  /**
   * 动态添加订阅路径
   */
  addSubscriptionPath(type, config) {
    this.config.subscriptionPaths[type] = {
      ...this.config.subscriptionPaths[type],
      ...config,
    }
    console.log(`📡 添加订阅路径: ${type}`, config)

    // 如果已连接，立即订阅
    if (this.isConnected()) {
      if (config.user && config.eventNames?.user) {
        this.subscribeQueue(config.user, config.eventNames.user, type)
      }
      if (config.merchant && config.eventNames?.merchant) {
        this.subscribeQueue(config.merchant, config.eventNames.merchant, type)
      }
    }
  }

  /**
   * 移除订阅路径
   */
  removeSubscriptionPath(type) {
    delete this.config.subscriptionPaths[type]
    console.log(`📡 移除订阅路径: ${type}`)

    // 重新订阅
    if (this.isConnected()) {
      this.subscribeAll()
    }
  }
}

// 创建单例
const webSocketService = new WebSocketService()

// 导出单例和配置
export default webSocketService
export { DEFAULT_CONFIG }

// 导出便捷方法
export const initWebSocket = async (userId, token, callbacks = {}, orderId = null) => {
  return webSocketService.init(userId, token, callbacks, orderId)
}

export const disconnectWebSocket = () => {
  webSocketService.disconnect()
}

export const sendSocketMessage = (destination, data, options = {}) => {
  return webSocketService.sendMessage(destination, data, options)
}

export const getWebSocketStatus = () => {
  return webSocketService.getConnectionStatus()
}

export const reconnectWebSocket = () => {
  return webSocketService.reconnectManually()
}

export const addConnectionListener = (listener) => {
  webSocketService.addConnectionListener(listener)
}

export const removeConnectionListener = (listener) => {
  webSocketService.removeConnectionListener(listener)
}

export const updateOrderId = (orderId) => {
  webSocketService.updateOrderId(orderId)
}

export const updateCallbacks = (callbacks) => {
  webSocketService.updateCallbacks(callbacks)
}

export const updateWebSocketConfig = (config) => {
  webSocketService.updateConfig(config)
}

export const addSubscriptionPath = (type, config) => {
  webSocketService.addSubscriptionPath(type, config)
}

export const removeSubscriptionPath = (type) => {
  webSocketService.removeSubscriptionPath(type)
}
