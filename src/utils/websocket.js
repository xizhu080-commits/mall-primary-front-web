import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

const DEFAULT_CONFIG = {
  // 连接配置
  connectionTimeout: 15000,

  // 重连配置（指数退避）
  reconnectBaseDelay: 1000,
  maxReconnectDelay: 30000,
  maxReconnectAttempts: Infinity,

  // STOMP 心跳协商间隔（ms）
  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,

  // 自定义心跳检测（用于检测僵尸连接）
  heartbeatInterval: 30000,
  heartbeatTimeout: 90000, // 增大到 90 秒，避免空闲连接被误杀

  // 消息队列配置
  maxQueueSize: 100,
  messageRetryDelay: 1000,
  maxRetryDelay: 10000,

  // 订阅路径配置
  subscriptionPaths: {
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
  enableDebugLog: true, // 强制开启调试日志
  // 优先级顺序
  priorityOrder: { high: 0, normal: 1, low: 2 },
}

// 全局错误捕获（用于调试）
if (typeof window !== 'undefined') {
  window.onerror = (msg, url, line, col, error) => {
    console.error('❌ 全局错误:', msg, 'line:', line, 'error:', error)
  }
  window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promise未捕获错误:', e.reason)
  })
}

class WebSocketService {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }

    this.client = null
    this.connected = false
    this.userId = null
    this.token = null
    this.shopId = null
    this.orderId = null
    this.userType = null // 新增：用户类型 (USER/MERCHANT)

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

    // 重连
    this.reconnectAttempts = 0
    this._reconnectTimer = null
    this._intentionalDisconnect = false

    // 心跳
    this._heartbeatTimer = null
    this._lastServerActivity = Date.now()

    // 连接 Promise
    this.connectingPromise = null

    // 连接监听器
    this.connectionListeners = []

    // 页面可见性监听（绑定 this，方便移除）
    this._onVisibilityChange = this._handleVisibilityChange.bind(this)
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this._onVisibilityChange)
    }
  }

  /**
   * 更新配置
   */
  updateConfig(config) {
    this.config = { ...this.config, ...config }
  }

  // ==================== 连接状态监听器 ====================

  addConnectionListener(listener) {
    if (typeof listener === 'function') {
      this.connectionListeners.push(listener)
    }
  }

  removeConnectionListener(listener) {
    const index = this.connectionListeners.indexOf(listener)
    if (index > -1) {
      this.connectionListeners.splice(index, 1)
    }
  }

  notifyConnectionStatusChange(status, data = null) {
    this.connectionListeners.forEach((listener) => {
      try {
        listener(status, data)
      } catch (error) {
        console.error('连接监听器执行失败:', error)
      }
    })
  }

  // ==================== 连接管理 ====================

  getWebSocketUrl(userId, shopId) {
    const uid = this._extractPrimitive(userId, 'userId')
    const sid = shopId ? this._extractPrimitive(shopId, 'shopId') : ''

    const baseUrl = this.config.webSocketBaseUrl || ''
    const path = this.config.webSocketPath || '/ws'
    let url = `${baseUrl}${path}?userId=${uid}`
    if (sid) {
      url += `&shopId=${sid}`
    }
    return url
  }

  /**
   * 从可能为对象的值中提取原始类型（字符串/数字）
   * 防止 localStorage 嵌套结构导致 URL 出现 [object Object]
   */
  _extractPrimitive(value, label = 'value') {
    console.log('尝试连接中............................................................:', {
      label,
      value,
      type: typeof value,
    })
    if (value == null) return ''
    if (typeof value !== 'object') return String(value)
    // 对象：尝试常见字段名
    const extracted =
      value.id ?? value.userId ?? value.merchantId ?? value.shopId ?? value.value ?? null
    if (extracted != null && typeof extracted !== 'object') return String(extracted)
    console.error(`❌ WebSocket ${label} 无法从对象提取原始值:`, value)
    return ''
  }

  /**
   * 建立 WebSocket 连接
   * @param {string} userId
   * @param {string} token
   * @param {string|null} shopId - 商家店铺ID（可选）
   * @param {string|null} userType - 用户类型 (USER/MERCHANT，可选)
   */
  connect(userId, token, shopId = null, userType = null) {
    console.log('🔌 WebSocket connect 调用:', {
      userId,
      shopId,
      userType,
      currentUserType: this.userType,
      isConnected: this.isConnected(),
      thisUserId: this.userId,
    })

    this.userId = userId
    this.token = token
    this.shopId = shopId
    this.userType = userType

    console.log('🔌 WebSocket connect 设置后:', {
      userId: this.userId,
      shopId: this.shopId,
      userType: this.userType,
    })

    // 已连接且同一用户和同一类型，跳过
    if (this.isConnected() && this.userId === userId && this.userType === userType) {
      return Promise.resolve()
    }

    // 正在连接中，复用 Promise
    if (this.connectingPromise) {
      return this.connectingPromise
    }

    // 断开旧连接，重新连接
    if (this.isConnected()) {
      this.disconnect(false)
    }

    this.connectingPromise = new Promise((resolve, reject) => {
      const wsUrl = this.getWebSocketUrl(userId, this.shopId)

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

        connectionTimeout: this.config.connectionTimeout,

        reconnectDelay: 0,

        heartbeatIncoming: this.config.heartbeatIncoming,
        heartbeatOutgoing: this.config.heartbeatOutgoing,

        // 添加原始消息监听
        onConnected: (frame) => {
          console.log('📡 STOMP onConnected:', frame)
        },

        onConnect: () => {
          console.log('✅ WebSocket连接成功', {
            userId: this.userId,
            userType: this.userType,
            shopId: this.shopId,
            frame: this.client?.connected,
          })
          this.connected = true
          this.reconnectAttempts = 0
          this._lastServerActivity = Date.now()
          this._clearReconnectTimer()

          this._startHeartbeat()
          console.log('🔔 开始订阅，userType:', this.userType)
          this.subscribeAll()
          this.flushMessageQueue()

          this.notifyConnectionStatusChange('connected', { userId })
          this.connectingPromise = null
          resolve()
        },

        onStompError: (frame) => {
          console.error('❌ STOMP错误:', frame)
          this._handleConnectionDeath('stompError')
          this.connectingPromise = null
          reject(new Error(frame.headers?.message || 'STOMP连接错误'))
        },

        onWebSocketError: (event) => {
          console.error('❌ WebSocket错误:', event)
          this.notifyConnectionStatusChange('error', { type: 'websocket', event })
          if (this.connectingPromise) {
            this._handleConnectionDeath('websocketError')
            this.connectingPromise = null
            reject(new Error('WebSocket连接失败'))
          }
        },

        onWebSocketClose: (event) => {
          console.log('🔌 WebSocket关闭:', event?.code, event?.reason)
          this.connected = false
          this._stopHeartbeat()
          this.notifyConnectionStatusChange('disconnected', { event })

          // 主动断开 → 不重连
          if (this._intentionalDisconnect) return

          // 指数退避自动重连
          if (this.userId && this.token) {
            this._scheduleReconnect()
          }
        },

        onDisconnect: () => {
          console.log('🔌 STOMP断开')
          this.connected = false
          this._stopHeartbeat()
        },
      })

      this.client.activate()
    })

    return this.connectingPromise
  }

  // ==================== 原始 WebSocket 包装 ====================

  /**
   * 拦截原始 WebSocket 的 onmessage，追踪服务端数据到达时间
   */
  _wrapRawWebSocket(ws) {
    // 优先通过 addEventListener 追踪消息（SockJS 兼容）
    const originalAddEventListener = ws.addEventListener.bind(ws)
    ws.addEventListener = (type, listener, ...args) => {
      if (type === 'message') {
        const wrapped = (event) => {
          this._lastServerActivity = Date.now()
          return listener(event)
        }
        return originalAddEventListener(type, wrapped, ...args)
      }
      return originalAddEventListener(type, listener, ...args)
    }

    // 附加：尝试劫持 onmessage setter（部分环境可用）
    // SockJS 对象不保证 onmessage 可配置，失败时静默忽略
    const self = this
    try {
      const desc = Object.getOwnPropertyDescriptor(ws, 'onmessage')
      if (desc && desc.configurable) {
        Object.defineProperty(ws, 'onmessage', {
          get() {
            return this._wrappedOnMessage
          },
          set(fn) {
            this._wrappedOnMessage = (event) => {
              self._lastServerActivity = Date.now()
              return fn.call(this, event)
            }
            if (desc.set) {
              desc.set.call(this, this._wrappedOnMessage)
            }
          },
          configurable: true,
        })
      }
    } catch (e) {
      // SockJS 或其他 transports 不支持 — 降级到 addEventListener
    }
  }

  // ==================== 心跳检测 ====================

  _startHeartbeat() {
    this._stopHeartbeat()
    this._lastServerActivity = Date.now()

    this._heartbeatTimer = setInterval(() => {
      if (!this.isConnected()) return

      // 发送 STOMP 心跳帧（协议级 EOL，通过原始 WebSocket 发送）
      try {
        const rawWs = this.client._stompHandler?.ws
        if (rawWs && rawWs.readyState === WebSocket.OPEN) {
          rawWs.send('\n')
        }
      } catch (e) {
        console.warn('心跳发送失败:', e)
      }

      // 检查服务端是否还在回数据
      const silence = Date.now() - this._lastServerActivity
      if (silence > this.config.heartbeatTimeout) {
        console.warn(`⚠️ 服务端无响应 ${Math.round(silence / 1000)}s，强制重连`)
        this._forceReconnect()
      }
    }, this.config.heartbeatInterval)
  }

  _stopHeartbeat() {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer)
      this._heartbeatTimer = null
    }
  }

  // ==================== 重连逻辑 ====================

  /**
   * 安排指数退避重连
   */
  _scheduleReconnect() {
    if (this._intentionalDisconnect) return
    if (this._reconnectTimer) return
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.error('❌ 达到最大重连次数，停止重连')
      this.notifyConnectionStatusChange('failed', {
        attempts: this.reconnectAttempts,
      })
      return
    }

    this.reconnectAttempts++
    // 指数退避 + 随机抖动，避免惊群效应
    const exponential = this.config.reconnectBaseDelay * Math.pow(2, this.reconnectAttempts - 1)
    const jitter = Math.random() * this.config.reconnectBaseDelay
    const delay = Math.min(exponential + jitter, this.config.maxReconnectDelay)

    console.log(`🔄 第${this.reconnectAttempts}次重连，延迟 ${Math.round(delay)}ms`)

    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null
      if (this._intentionalDisconnect || !this.userId || !this.token) return
      // 重置标记，让新连接的 onWebSocketClose 能正确判断
      this._intentionalDisconnect = false
      this.connect(this.userId, this.token, this.shopId).catch((err) => {
        console.error('重连失败:', err)
        // connect 失败后 onWebSocketClose 会再次触发 _scheduleReconnect
      })
    }, delay)
  }

  _clearReconnectTimer() {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer)
      this._reconnectTimer = null
    }
  }

  /**
   * 强制重连（心跳超时、STOMP 错误时调用）
   */
  _forceReconnect() {
    this._resetClient()
    this._scheduleReconnect()
  }

  /**
   * 处理连接异常死亡（STOMP 错误、WebSocket 错误）
   */
  _handleConnectionDeath(reason) {
    this.connected = false
    this._stopHeartbeat()
    this.notifyConnectionStatusChange('error', { reason })
  }

  /**
   * 清理 client 实例（不清除用户凭据）
   */
  _cleanupClient() {
    this.unsubscribeAll()
    this._stopHeartbeat()

    if (this.client) {
      try {
        this.client.deactivate()
      } catch (e) {
        // ignore
      }
    }

    this.connected = false
    this.client = null
    this.connectingPromise = null
  }

  /**
   * 重置客户端并标记为主动断开（防止触发自动重连）
   * @param {boolean} resetReconnect - 是否同时清空重连计时器和计数
   */
  _resetClient(resetReconnect = true) {
    if (resetReconnect) {
      this._clearReconnectTimer()
      this.reconnectAttempts = 0
    }
    this._intentionalDisconnect = true
    this._cleanupClient()
    this._intentionalDisconnect = false
  }

  async _reconnectInternal() {
    if (!this.userId || !this.token) return
    this._resetClient()
    await this.connect(this.userId, this.token, this.shopId)
  }

  // ==================== 页面可见性 ====================

  _handleVisibilityChange() {
    if (document.hidden) return

    // 页面从后台切回前台
    if (this._intentionalDisconnect && !this.userId) return

    if (!this.isConnected()) {
      console.log('📱 页面回到前台，连接已断开，立即重连')
      this._resetClient()
      this.connect(this.userId, this.token, this.shopId).catch((err) => {
        console.error('前台重连失败:', err)
        this._scheduleReconnect()
      })
    } else {
      // 连接看起来还在，发个心跳验证
      this._lastServerActivity = Date.now()
      try {
        const rawWs = this.client._stompHandler?.ws
        if (rawWs && rawWs.readyState === WebSocket.OPEN) {
          rawWs.send('\n')
        }
      } catch (e) {
        console.warn('前台心跳失败，强制重连')
        this._forceReconnect()
      }
    }
  }

  // ==================== 订阅管理 ====================

  /**
   * 通用订阅方法
   */
  subscribeQueue(destination, eventName, callbackKey) {
    if (!this.client || !this.connected) {
      console.warn('⚠️ 无法订阅：未连接', destination)
      return null
    }

    const alreadySubscribed = this.subscriptions.some((sub) => sub.destination === destination)
    if (alreadySubscribed) {
      console.log('📡 已订阅，跳过:', destination)
      return null
    }

    try {
      const subscription = this.client.subscribe(destination, (message) => {
        console.log('📥 STOMP 收到原始消息:', { destination, body: message.body })
        try {
          const data = JSON.parse(message.body)
          this._lastServerActivity = Date.now()

          console.log('📥 收到消息:', { destination, eventName, data })

          // 1. 发送特定类型事件（如 chat-message）
          console.log('📤 派发事件:', eventName)
          window.dispatchEvent(new CustomEvent(eventName, { detail: data }))

          // 2. 发送通用事件（供只监听 websocket-message 的组件使用）
          window.dispatchEvent(new CustomEvent('websocket-message', { detail: data }))

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
      console.log(
        '✅ 订阅成功:',
        destination,
        '→ 事件:',
        eventName,
        '→ 完整路径: /user/' + this.userId + destination,
      )
      return subscription
    } catch (error) {
      console.error('❌ 订阅失败:', destination, error)
      return null
    }
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
      console.log('⚠️ subscribeAll: 未连接，跳过')
      return
    }

    console.log(
      '🔔 开始订阅，userType:',
      this.userType,
      'config:',
      Object.keys(this.config.subscriptionPaths),
    )

    this.unsubscribeAll()

    Object.keys(this.config.subscriptionPaths).forEach((type) => {
      const paths = this.config.subscriptionPaths[type]

      // 根据用户类型决定主订阅路径，同时订阅另一路径用于调试
      const isMerchant = this.userType === 'MERCHANT'
      console.log('📡 订阅配置:', { type, isMerchant, paths })
      const mainPath = isMerchant ? paths.merchant : paths.user
      const mainEvent = isMerchant ? paths.eventNames?.merchant : paths.eventNames?.user
      const altPath = isMerchant ? paths.user : paths.merchant
      const altEvent = isMerchant ? paths.eventNames?.user : paths.eventNames?.merchant

      console.log('📡 订阅路径:', { mainPath, mainEvent, altPath, altEvent })

      if (mainPath && mainEvent) {
        this.subscribeQueue(mainPath, mainEvent, type)
      }
      if (altPath && altEvent) {
        this.subscribeQueue(altPath, altEvent, type)
      }
    })
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
        // ignore
      }
    })
    this.subscriptions = []
  }

  // ==================== 消息发送 ====================

  generateMessageId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${this.userId}`
  }

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

    if (this.messageQueue.length > this.config.maxQueueSize) {
      this.messageQueue = this.messageQueue.slice(-this.config.maxQueueSize)
    }
  }

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
    return message.messageId
  }

  async sendMessageWithRetry(message, maxRetries) {
    let lastError = null

    for (let i = 0; i < maxRetries; i++) {
      try {
        if (!this.isConnected()) {
          if (this.userId && this.token) {
            await this.connect(this.userId, this.token, this.shopId)
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
        return null
      } else {
        throw new Error('WebSocket未连接且不允许缓存')
      }
    }

    if (retry) {
      return this.sendMessageWithRetry(message, maxRetries)
    } else {
      return this.sendMessageImmediately(message)
    }
  }

  async flushMessageQueue() {
    if (!this.isConnected() || this.messageQueue.length === 0) return

    console.log(`📤 发送 ${this.messageQueue.length} 条缓存消息`)

    const failedMessages = []

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      try {
        await this.sendMessageWithRetry(message, 1)
      } catch (error) {
        failedMessages.push(message)
      }
    }

    if (failedMessages.length > 0) {
      this.messageQueue.unshift(...failedMessages)
    }
  }

  clearMessageQueue() {
    this.messageQueue = []
  }

  // ==================== 初始化 / 断开 ====================

  /**
   * 初始化 WebSocket
   */
  async init(userId, token, callbacks = {}, orderId = null, shopId = null) {
    this.callbacks = {
      payment: callbacks.payment || null,
      refund: callbacks.refund || null,
      logistic: callbacks.logistic || null,
      wechat: callbacks.wechat || null,
    }

    this.orderId = orderId

    try {
      await this.connect(userId, token, shopId)
      return true
    } catch (error) {
      console.error('WebSocket初始化失败:', error)
      return false
    }
  }

  /**
   * 断开连接
   * @param {boolean} clearUserId - 是否清除用户凭据
   */
  disconnect(clearUserId = true) {
    this._intentionalDisconnect = true
    this._clearReconnectTimer()
    this._cleanupClient()

    if (clearUserId) {
      this.userId = null
      this.token = null
      this.shopId = null
      this.orderId = null
      this.callbacks = {
        payment: null,
        refund: null,
        logistic: null,
        wechat: null,
      }
    }

    this.notifyConnectionStatusChange('manualDisconnect')
  }

  /**
   * 检查是否已连接
   */
  isConnected() {
    return this.connected && this.client != null && this.client.connected
  }

  getConnectionStatus() {
    return {
      connected: this.isConnected(),
      userId: this.userId,
      shopId: this.shopId,
      orderId: this.orderId,
      subscriptions: this.subscriptions.length,
      messageQueueSize: this.messageQueue.length,
      reconnectAttempts: this.reconnectAttempts,
    }
  }

  /**
   * 手动重连（保留凭据和 shopId）
   */
  async reconnectManually() {
    if (!this.userId || !this.token) {
      throw new Error('无法重连：userId、token未设置')
    }
    this.reconnectAttempts = 0
    await this._reconnectInternal()
  }

  updateOrderId(orderId) {
    this.orderId = orderId
  }

  updateCallbacks(callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  addSubscriptionPath(type, config) {
    this.config.subscriptionPaths[type] = {
      ...this.config.subscriptionPaths[type],
      ...config,
    }

    if (this.isConnected()) {
      if (config.user && config.eventNames?.user) {
        this.subscribeQueue(config.user, config.eventNames.user, type)
      }
      if (config.merchant && config.eventNames?.merchant) {
        this.subscribeQueue(config.merchant, config.eventNames.merchant, type)
      }
    }
  }

  removeSubscriptionPath(type) {
    delete this.config.subscriptionPaths[type]

    if (this.isConnected()) {
      this.subscribeAll()
    }
  }

  /**
   * 完全销毁（移除全局监听器，用于应用卸载）
   */
  destroy() {
    this.disconnect(true)
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this._onVisibilityChange)
    }
  }
}

// 创建单例
const webSocketService = new WebSocketService()

// 导出单例和配置
export default webSocketService
export { DEFAULT_CONFIG }

// 导出便捷方法
export const initWebSocket = async (
  userId,
  token,
  callbacks = {},
  orderId = null,
  shopId = null,
) => {
  return webSocketService.init(userId, token, callbacks, orderId, shopId)
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
