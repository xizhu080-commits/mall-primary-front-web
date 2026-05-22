/* import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let stompClient = null

export function connectPaymentWebSocket(userId, onPaymentSuccess) {
  // 1. 建立连接
  const socket = new SockJS('http://localhost:8080/ws') // 你的后端地址
  stompClient = Stomp.over(socket)

  stompClient.connect({}, () => {
    console.log('WebSocket 连接成功')

    // 2. 订阅个人队列
    stompClient.subscribe(`/user/${userId}/queue/paymentNotify`, (response) => {
      const data = JSON.parse(response.body)
      console.log('收到支付通知:', data)

      if (data.type === 'PAYMENT_SUCCESS') {
        onPaymentSuccess(data.orderId)
      }
    })
  })
}
 */
