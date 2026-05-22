// src/utils/websocket.js import SockJS from 'sockjs-client' import { Client } from '@stomp/stompjs'
class WebSocketService { constructor() { this.client = null this.connected = false this.userId =
null this.userType = null this.paymentCallback = null this.orderId = null } connect(userId, userType
= 'USER') { this.userId = userId this.userType = userType return new Promise((resolve, reject) => {
// 【关键修改 1】：在 URL 后面拼接 ?userId=xxx // 这样后端的 HandshakeInterceptor 才能拿到 userId
绑定到 Session const wsUrl = `/ws?userId=${userId}` console.log('WebSocket 连接地址:', wsUrl)
this.client = new Client({ webSocketFactory: () => new SockJS(wsUrl), debug: (str) =>
console.log('[STOMP]', str), reconnectDelay: 5000, heartbeatIncoming: 4000, heartbeatOutgoing: 4000,
onConnect: () => { console.log('✅ WebSocket 连接成功！用户 ID:', userId) this.connected = true
this.subscribeToMessages() resolve() }, onStompError: (frame) => { console.error('❌ STOMP 错误:',
frame) reject(frame) }, onWebSocketError: (event) => { console.error('❌ WebSocket 错误:', event) },
onDisconnect: () => { console.log('🔌 WebSocket 断开连接') this.connected = false }, })
this.client.activate() }) } subscribeToMessages() { if (!this.client || !this.connected) return //
【关键修改 2】：订阅路径简化 // 因为后端使用了 convertAndSendToUser，前端只需订阅公共路径 // Spring
会自动把消息路由给当前 Session // let destination = `/queue/paymentNotify` let destination =
`/user/queue/userPaymentNotify` console.log('📡 订阅地址:', destination)
this.client.subscribe(destination, (message) => { try { const notification =
JSON.parse(message.body) console.log('📥 收到消息:', notification) // 触发全局事件
window.dispatchEvent( new CustomEvent('payment-notification', { detail: notification, }), ) //
处理回调 if (this.paymentCallback && notification.title === '支付成功通知') { if (!this.orderId ||
notification.orderId === this.orderId) { this.paymentCallback(notification) } } } catch (error) {
console.error('解析消息失败:', error, '原始内容:', message.body) } }) } initPaymentWebSocket(userId,
callback, orderId = null) { this.paymentCallback = callback this.orderId = orderId return
this.connect(userId, 'USER') } disconnect() { if (this.client && this.connected) {
this.client.deactivate() this.connected = false this.paymentCallback = null this.orderId = null
console.log('🔌 WebSocket 已断开') } } } const webSocketService = new WebSocketService() export
const initPaymentWebSocket = (userId, callback, orderId = null) =>
webSocketService.initPaymentWebSocket(userId, callback, orderId) export const disconnectWebSocket =
() => webSocketService.disconnect() export default webSocketService
