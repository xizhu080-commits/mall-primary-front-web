WebSocket测试
http://localhost:8080/api/test/websocket/batch/all

文件夹 用途 存放内容示例
api API 接口管理 user.js（用户登录、注册接口）
product.js（商品增删改查接口）
order.js（订单接口）

assets 静态资源 logo.png（图片）
global.css（全局样式）
font.ttf（字体文件）

components 公共组件 Header.vue（头部导航）
Sidebar.vue（侧边栏）
Pagination.vue（分页组件）

composables 组合式函数（可复用的逻辑） useCounter.js（计数器逻辑）
useFetch.js（请求封装）
useAuth.js（权限验证）

directives 自定义指令 v-permission.js（权限控制）
v-debounce.js（防抖）
v-focus.js（自动聚焦）

layouts 布局组件 DefaultLayout.vue（默认布局：头+侧边+内容）
BlankLayout.vue（空白布局：登录页用）

pages 页面组件（按路由划分） Home.vue（首页）
UserList.vue（用户列表）
ProductDetail.vue（商品详情）

router 路由配置 index.js（路由表、路由守卫）

stores Pinia 状态管理 user.js（用户信息、token）
cart.js（购物车数据）
app.js（应用全局状态）

styles 全局样式 variables.css（CSS 变量）
mixins.css（混合样式）
reset.css（重置样式）

utils 工具函数 request.js（axios 封装）
format.js（日期、金额格式化）
validate.js（表单验证）

views 视图页面（与 pages 类似，二选一） 通常 pages 和 views 留一个即可，功能相同

🎯 实际开发示例
一个用户列表功能的文件分布：
text
src/
├── api/
│ └── user.js # 定义获取用户列表的接口
├── components/
│ └── UserTable.vue # 用户表格组件
├── composables/
│ └── useUserList.js # 用户列表逻辑（加载、搜索、分页）
├── pages/
│ └── UserList.vue # 用户列表页面（组合上面的组件）
├── router/
│ └── index.js # 配置 /users 路由
├── stores/
│ └── user.js # 管理用户状态
├── styles/
│ └── user.css # 用户页面专属样式
├── utils/
│ └── request.js # axios 请求封装
💡 使用建议
如果你刚开始学习 可以简化为
api + components + pages + router + stores + utils 只保留基础结构
其他文件夹可以先空着，用到时再创建 没必要一次性全用上
🔥 最常用的 5 个文件夹
开发中 90% 的时间都在操作这 5 个：

pages/ - 写页面

components/ - 写可复用的组件

api/ - 调接口

router/ - 配路由

stores/ - 存数据

其他文件夹是项目变大后的优化，初期不用太纠结。

需要我详细讲解某个文件夹的具体用法吗？

// src/utils/websocket.js
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

class WebSocketService {
constructor() {
this.client = null
this.connected = false
this.userId = null
this.userType = null
// 用户/商家 支付通知回调
this.userPaymentCallback = null
this.merchantPaymentCallback = null
// 用户/商家 退款通知回调
this.userRefundCallback = null
this.merchantRefundCallback = null
// 用户/商家 物流通知回调
this.userLogisticCallback = null
this.merchantLogisticCallback = null
// 用户/商家 聊天通知回调
this.userWechatCallback = null
this.merchantWechatCallback = null

    this.orderId = null

}

connect(userId, userType = 'USER') {
this.userId = userId
this.userType = userType

    return new Promise((resolve, reject) => {
      // 【关键修改 1】：在 URL 后面拼接 ?userId=xxx
      // 这样后端的 HandshakeInterceptor 才能拿到 userId 绑定到 Session
      const wsUrl = `/ws?userId=${userId}`

      console.log('WebSocket 连接地址:', wsUrl)

      this.client = new Client({
        webSocketFactory: () => new SockJS(wsUrl),
        debug: (str) => console.log('[STOMP]', str),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        onConnect: () => {
          console.log('✅ WebSocket 连接成功！用户 ID:', userId)
          this.connected = true
          this.subscribeToMessages()
          resolve()
        },
        onStompError: (frame) => {
          console.error('❌ STOMP 错误:', frame)
          reject(frame)
        },
        onWebSocketError: (event) => {
          console.error('❌ WebSocket 错误:', event)
        },
        onDisconnect: () => {
          console.log('🔌 WebSocket 断开连接')
          this.connected = false
        },
      })

      this.client.activate()
    })

}

/_
订阅支付通知队列 退款通知队列 物流通知队列 聊天通知队列
_/
subscribeToMessages() {
if (!this.client || !this.connected) return

    // 【关键修改 2】：订阅路径简化
    // 因为后端使用了 convertAndSendToUser，前端只需订阅公共路径
    // Spring 会自动把消息路由给当前 Session
    // let destination = `/queue/paymentNotify`

    // 1.1 订阅支付通知队列---用户
    let userPaymentDestination = `/user/queue/userPaymentNotify`
    console.log('📡 订阅地址:', userPaymentDestination)

    this.client.subscribe(userPaymentDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('user-payment-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.userPaymentCallback && notification.title === '新的支付通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.userPaymentCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 1.2 订阅支付通知队列---商家
    let merchantPaymentDestination = `/user/queue/merchantPaymentNotify`
    console.log('📡 订阅地址:', merchantPaymentDestination)

    this.client.subscribe(merchantPaymentDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('merchant-payment-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.merchantPaymentCallback && notification.title === '新的支付通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.merchantPaymentCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 2.1 订阅退款通知队列---用户

    let userRefundDestination = `/user/queue/userRefundNotify`
    console.log('📡 订阅地址:', userRefundDestination)

    this.client.subscribe(userRefundDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('user-refund-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.userRefundCallback && notification.title === '新的退款通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.userRefundCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 2.2 订阅退款通知队列---商家
    let merchantRefundDestination = `/user/queue/merchantRefundNotify`
    console.log('📡 订阅地址:', merchantRefundDestination)

    this.client.subscribe(merchantRefundDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('merchant-refund-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.merchantRefundCallback && notification.title === '新的退款通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.merchantRefundCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 3.1 订阅物流通知队列---用户

    let userLogisticDestination = `/user/queue/userLogisticNotify`
    console.log('📡 订阅地址:', userLogisticDestination)

    this.client.subscribe(userLogisticDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('user-logistic-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.userLogisticCallback && notification.title === '新的物流通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.userLogisticCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 3.2 订阅物流通知队列---商家
    let merchantLogisticDestination = `/user/queue/merchantLogisticNotify`
    console.log('📡 订阅地址:', merchantLogisticDestination)

    this.client.subscribe(merchantLogisticDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('merchant-logistic-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.merchantLogisticCallback && notification.title === '新的物流通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.merchantLogisticCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 4.1 订阅聊天通知队列---用户

    let userWechatDestination = `/user/queue/userWeChatMessage`
    console.log('📡 订阅地址:', userWechatDestination)

    this.client.subscribe(userWechatDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('user-wechat-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.userWechatCallback && notification.title === '新的聊天通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.userWechatCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

    // 4.2 订阅聊天通知队列---商家
    let merchantWechatDestination = `/user/queue/merchantWeChatMessage`
    console.log('📡 订阅地址:', merchantWechatDestination)

    this.client.subscribe(merchantWechatDestination, (message) => {
      try {
        const notification = JSON.parse(message.body)
        console.log('📥 收到消息:', notification)

        // 触发全局事件
        window.dispatchEvent(
          new CustomEvent('merchant-wechat-notification', {
            detail: notification,
          }),
        )

        // 处理回调
        if (this.merchantWechatCallback && notification.title === '新的聊天通知') {
          if (!this.orderId || notification.orderId === this.orderId) {
            this.merchantWechatCallback(notification)
          }
        }
      } catch (error) {
        console.error('解析消息失败:', error, '原始内容:', message.body)
      }
    })

}

initPaymentWebSocket(userId, callback, orderId = null) {
// 用户/商家 支付通知回调
this.userPaymentCallback = callback
this.merchantPaymentCallback = callback
// 用户/商家 退款通知回调
this.userRefundCallback = callback
this.merchantRefundCallback = callback
// 用户/商家 物流通知回调
this.userLogisticsCallback = callback
this.merchantLogisticsCallback = callback
// 用户/商家 聊天通知回调
this.userWechatCallback = callback
this.merchantWechatCallback = callback

    this.orderId = orderId
    return this.connect(userId, 'USER')

}

disconnect() {
if (this.client && this.connected) {
this.client.deactivate()
this.connected = false

      // 用户/商家  支付通知回调
      this.userPaymentCallback = null
      this.merchantPaymentCallback = null
      // 用户/商家  退款通知回调
      this.userRefundCallback = null
      this.merchantRefundCallback = null
      // 用户/商家  物流通知回调
      this.userLogisticsCallback = null
      this.merchantLogisticsCallback = null
      // 用户/商家  聊天通知回调
      this.userWechatCallback = null
      this.merchantWechatCallback = null

      this.orderId = null
      console.log('🔌 WebSocket 已断开')
    }

}
}

const webSocketService = new WebSocketService()

export const initPaymentWebSocket = (userId, callback, orderId = null) =>
webSocketService.initPaymentWebSocket(userId, callback, orderId)

export const disconnectWebSocket = () => webSocketService.disconnect()

export default webSocketService

//cd /d/Development/Codes/Mall/mall-primary-front-web

<!-- $env:ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
$env:ANTHROPIC_AUTH_TOKEN="sk-ff4e91ff70e94ce290058915c933fcbe"
$env:ANTHROPIC_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL="deepseek-v4-pro[1m]"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL="deepseek-v4-flash"
$env:CLAUDE_CODE_SUBAGENT_MODEL="deepseek-v4-flash"
$env:CLAUDE_CODE_EFFORT_LEVEL="max" -->
