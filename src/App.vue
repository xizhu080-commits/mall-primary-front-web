<template>
  <div id="app">
    <router-view />
    <WebSocketDebuggerForUser v-if="identityType == 'USER'" />
    <WebSocketDebuggerForMerchant v-if="identityType == 'MERCHANT'" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WebSocketDebuggerForUser from '@/components/WebSocketDebuggerForUser.vue'
import WebSocketDebuggerForMerchant from '@/components/WebSocketDebuggerForMerchant.vue'
import webSocketService from '@/utils/websocket'
const identityType = ref('')
const identityId = ref('')
const fetchIdentityInfo = {}
const identityInfoStr = localStorage.getItem('mall-user_merchant-info')
console.log('本地存储信息identityInfoStr:', identityInfoStr)

if (identityInfoStr) {
  try {
    const identityInfo = JSON.parse(identityInfoStr)
    console.log('当前登录的身份信息:', identityInfo)
    identityType.value = identityInfo.identityType == '商家' ? 'MERCHANT' : 'USER'
    if (identityType.value == 'USER') {
      identityId.value = identityInfo.userId
    } else if (identityType.value == 'MERCHANT') {
      identityId.value = identityInfo.merchantId
    } else {
      console.error('未知的身份类型:', identityType.value)
    }
  } catch (e) {
    console.error('解析身份信息失败:', e)
  }
}

// App.vue
onMounted(() => {
  // 修正：从正确的存储位置获取用户信息
  if (identityId) {
    webSocketService.connect(identityId, identityType).catch((err) => {
      console.error('WebSocket 连接失败:', err)
    })
  } else {
    console.log('用户未登录，跳过 WebSocket 连接')
  }
})
</script>
