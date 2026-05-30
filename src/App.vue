<template>
  <div id="app">
    <router-view />
    <WebSocketDebuggerForUser v-if="identityType == 'USER'" />
    <WebSocketDebuggerForMerchant v-if="identityType == 'MERCHANT'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WebSocketDebuggerForUser from '@/components/WebSocketDebuggerForUser.vue'
import WebSocketDebuggerForMerchant from '@/components/WebSocketDebuggerForMerchant.vue'

const identityType = ref('')
const identityInfoStr = localStorage.getItem('mall-user_merchant-info')

if (identityInfoStr) {
  try {
    const identityInfo = JSON.parse(identityInfoStr)
    identityType.value = identityInfo.identityType == '商家' ? 'MERCHANT' : 'USER'
  } catch (e) {
    console.error('解析身份信息失败:', e)
  }
}
</script>
