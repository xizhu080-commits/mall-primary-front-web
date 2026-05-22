<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-area">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1>智慧互联 · JD-Style生态</h1>
        <p>每一次登录 - 都是一次新的开始</p>
      </div>

      <!-- 登录身份切换 -->
      <div class="identity-tabs">
        <button
          :class="['tab-btn', { active: identityType === 'personal' }]"
          @click="switchIdentity('personal')"
        >
          个人用户登录
        </button>
        <button
          :class="['tab-btn', { active: identityType === 'merchant' }]"
          @click="switchIdentity('merchant')"
        >
          个人商家登录
        </button>
      </div>

      <!-- 登录方式切换 -->
      <div class="login-tabs">
        <button
          :class="['mode-btn', { active: loginMode === 'password' }]"
          @click="loginMode = 'password'"
        >
          密码登录
        </button>
      </div>

      <form @submit.prevent="handleLogin">
        <!-- ID 输入框 -->
        <div class="input-group">
          <label class="input-label">
            {{ identityType === 'personal' ? '用户ID' : '商家ID' }}
            <span class="label-tip">（必填）</span>
          </label>
          <input
            type="text"
            class="input-field"
            v-model="form.identityId"
            :placeholder="identityType === 'personal' ? '请输入用户ID' : '请输入商家ID'"
            autocomplete="off"
          />
        </div>

        <!-- 手机号输入（移除区号选择） -->
        <div class="input-group">
          <label class="input-label">手机号</label>
          <input
            type="tel"
            class="input-field"
            v-model="form.phone"
            placeholder="请输入手机号"
            autocomplete="off"
          />
        </div>

        <!-- 密码输入 -->
        <div class="input-group">
          <label class="input-label">密码</label>
          <input
            type="password"
            class="input-field"
            v-model="form.password"
            placeholder="请输入密码"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- 验证码获取区域 -->
        <div class="input-group">
          <label class="input-label">验证码</label>
          <div class="code-input-wrapper">
            <input
              type="text"
              class="input-field code-input"
              v-model="form.verifyCode"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button
              type="button"
              class="get-code-btn"
              @click="sendVerifyCode"
              :disabled="codeCountdown > 0 || !isPhoneValid"
            >
              {{ codeCountdown > 0 ? `${codeCountdown}秒后重试` : '获取验证码' }}
            </button>
          </div>
          <div class="code-tip">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>验证码将发送至您的绑定手机，用于身份验证</span>
          </div>
        </div>

        <div class="options-row">
          <a href="/resetPassword" class="forgot-link" @click="handleForgotPassword">忘记密码？</a>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录账号' }}
        </button>
      </form>

      <div class="divider">
        <span>其他登录方式</span>
      </div>

      <div class="social-login">
        <div class="social-icon" @click="socialLogin('wechat')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.5 10.5C16.5 10.5 17 9 16 8C15 7 13.5 7.5 13 8.5"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <path
              d="M8.5 13.5C8.5 13.5 7 14 7.5 15.5C8 17 9.5 17 10 16"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" />
            <path d="M15 9L17 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
          </svg>
        </div>
        <div class="social-icon" @click="socialLogin('apple')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 8C17 8 16 7 14 7C12 7 11 8 10 9C9 10 9 12 10.5 13.5C12 15 13 15 14 15C15 15 17 13 17 11"
              stroke="currentColor"
              stroke-width="1.2"
            />
            <path
              d="M10 5C10 5 9.5 3.5 8 4C7 4.5 6.5 6 7 7"
              stroke="currentColor"
              stroke-width="1.2"
            />
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2" />
          </svg>
        </div>
        <div class="social-icon" @click="socialLogin('mi')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8H9L12 2Z" fill="currentColor" />
            <path d="M12 22L9 16H15L12 22Z" fill="currentColor" />
            <rect
              x="4"
              y="8"
              width="16"
              height="8"
              rx="1"
              stroke="currentColor"
              stroke-width="1.2"
            />
          </svg>
        </div>
      </div>

      <div class="register-link">
        还没有JD-Style生态账号?
        <a href="/register" @click="handleRegister">立即注册</a>
      </div>
    </div>

    <!-- Toast 提示 -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast-message" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { user_merchant_login } from '@/api/common/login'
import { sendCode } from '@/api/common/sendCode'

const router = useRouter()

// ==========================================
// 1. 状态定义
// ==========================================

const identityType = ref('personal')
const loginMode = ref('password')
const loading = ref(false)
let countdownTimer = null
const codeCountdown = ref(0)

const form = reactive({
  identityId: '',
  phone: '', // 直接存储手机号，不需要区号
  password: '',
  verifyCode: '',
  remember: false,
})

const toast = reactive({
  visible: false,
  message: '',
  isError: false,
  timer: null,
})

// ==========================================
// 2. 辅助函数
// ==========================================

const showMessage = (message, isError = false) => {
  if (toast.timer) clearTimeout(toast.timer)
  toast.message = message
  toast.isError = isError
  toast.visible = true
  toast.timer = setTimeout(() => {
    toast.visible = false
  }, 2000)
}

// 手机号验证（中国大陆手机号格式）
const isPhoneValid = computed(() => {
  const phone = form.phone.trim()
  if (!phone) return false
  // 中国大陆手机号：1开头的11位数字
  return /^1[3-9]\d{9}$/.test(phone)
})

const startCountdown = () => {
  codeCountdown.value = 60
  if (countdownTimer) clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (codeCountdown.value > 0) {
      codeCountdown.value--
    } else {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
  }, 1000)
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
  if (toast.timer) clearTimeout(toast.timer)
})

// ==========================================
// 3. 发送验证码
// ==========================================
const sendVerifyCode = async () => {
  if (!isPhoneValid.value) {
    showMessage('请输入正确的手机号', true)
    return
  }

  if (codeCountdown.value > 0) return

  loading.value = true

  try {
    // 直接发送手机号，不需要拼接区号
    await sendCode(form.phone.trim(), identityType.value)
    showMessage('验证码已发送')
    startCountdown()
  } catch (error) {
    showMessage(error.message || '发送失败', true)
  } finally {
    loading.value = false
  }
}

// ==========================================

// ==========================================
// 5. 登录逻辑
// ==========================================
const handleLogin = async () => {
  const { identityId, password, verifyCode, phone } = form

  if (!identityId.trim()) {
    showMessage(`请输入${identityType.value === 'personal' ? '用户ID' : '商家ID'}`, true)
    return
  }
  if (!password.trim()) {
    showMessage('请输入密码', true)
    return
  }
  if (!verifyCode.trim()) {
    showMessage('请输入验证码', true)
    return
  }
  if (!phone.trim()) {
    showMessage('请输入手机号', true)
    return
  }

  loading.value = true
  const user_merchant_ID = identityType.value === 'personal' ? 'userId' : 'merchantId'
  try {
    const loginPayload = {
      [user_merchant_ID]: identityId.trim(),
      password: password.trim(),
      code: verifyCode.trim(),
      phone: phone.trim(), // 直接使用手机号
    }

    const response = await user_merchant_login(loginPayload, identityType.value)

    //将登录成功后的信息存储到本地存储
    if (response.code === 200 || response.success) {
      const identityName = identityType.value === 'personal' ? 'userName' : 'merchantName'
      showMessage(`${identityName}登录成功！欢迎回来 ✨`)

      localStorage.setItem(
        'mall-user_merchant-info',
        JSON.stringify({
          identityType: identityName === 'userName' ? '用户' : '商家',
          [user_merchant_ID]: response.data[user_merchant_ID],
          [identityName]: response.data[identityName],
          phone: response.data.phone,
          token: response.data.token,
          role: response.data.role,
        }),
      )

      setTimeout(() => {
        router.push('/')
      }, 500)
    } else {
      showMessage(response.msg || '登录失败', true)
    }
  } catch (error) {
    showMessage(error.message || '网络异常，请稍后重试', true)
  } finally {
    loading.value = false
  }
}

// ==========================================
// 6. 其他函数
// ==========================================
const switchIdentity = (type) => {
  identityType.value = type
  form.userId = ''
  form.password = ''
  form.verifyCode = ''
  form.phone = ''
}

const socialLogin = (type) => showMessage('第三方登录开发中...')
</script>

<style scoped>
/* 样式保持不变，只移除 .phone-input-wrapper 和 .area-code-select 相关样式 */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b2e 50%, #0b1120 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 40%, rgba(99, 102, 241, 0.15), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.12), transparent 50%);
  pointer-events: none;
}

.login-card {
  width: 100%;
  max-width: 520px;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
  background: rgba(18, 25, 45, 0.65);
  backdrop-filter: blur(16px);
  border-radius: 48px;
  padding: 40px 32px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 30px 60px -15px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-area {
  text-align: center;
  margin-bottom: 28px;
}

.logo-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(145deg, #4f46e5, #7c3aed);
  border-radius: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 12px 24px -8px rgba(79, 70, 229, 0.4);
}

.logo-icon svg {
  width: 32px;
  height: 32px;
  color: white;
}

.logo-area h1 {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.3px;
  margin-bottom: 8px;
}

.logo-area p {
  color: #94a3b8;
  font-size: 14px;
  font-weight: 400;
}

/* 身份切换 Tabs */
.identity-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 60px;
  padding: 6px;
}

.tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: #94a3b8;
  cursor: pointer;
  padding: 10px 0;
  transition: all 0.2s;
  border-radius: 40px;
}

.tab-btn.active {
  background: linear-gradient(115deg, #4f46e5, #7c3aed);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.tab-btn:hover:not(.active) {
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.08);
}

/* 登录方式切换 */
.login-tabs {
  margin-bottom: 24px;
}

.mode-btn {
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: #a78bfa;
  cursor: pointer;
  padding: 6px 0;
  border-bottom: 2px solid #a78bfa;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.label-tip {
  color: #5b6e8c;
  font-size: 12px;
  font-weight: 400;
  margin-left: 6px;
}

.input-field {
  width: 100%;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  font-size: 15px;
  color: #f1f5f9;
  transition: all 0.2s ease;
  outline: none;
}

.input-field:focus {
  border-color: #8b5cf6;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
}

.input-field::placeholder {
  color: #5a6b8c;
}

.code-input-wrapper {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.get-code-btn {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 28px;
  padding: 0 18px;
  color: #a78bfa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.get-code-btn:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.35);
  border-color: #8b5cf6;
}

.get-code-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.code-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 11px;
  color: #5b6e8c;
}

.code-tip svg {
  flex-shrink: 0;
}

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 28px 0;
  font-size: 14px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  cursor: pointer;
}

.checkbox input {
  width: 18px;
  height: 18px;
  accent-color: #8b5cf6;
  cursor: pointer;
}

.forgot-link {
  color: #a78bfa;
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.forgot-link:hover {
  color: #c4b5fd;
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(115deg, #4f46e5, #7c3aed);
  border: none;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.5);
}

.login-btn:hover:not(:disabled) {
  transform: scale(1.01);
  background: linear-gradient(115deg, #6366f1, #8b5cf6);
  box-shadow: 0 12px 28px -8px rgba(79, 70, 229, 0.7);
}

.login-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #5b6e8c;
  font-size: 13px;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.divider span {
  margin: 0 12px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 8px;
}

.social-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-3px);
}

.social-icon svg {
  width: 22px;
  height: 22px;
  color: #cbd5e1;
}

.register-link {
  text-align: center;
  margin-top: 28px;
  color: #94a3b8;
  font-size: 14px;
}

.register-link a {
  color: #a78bfa;
  text-decoration: none;
  font-weight: 600;
  margin-left: 6px;
}

.register-link a:hover {
  text-decoration: underline;
  color: #c4b5fd;
}

.toast-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  padding: 12px 24px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  z-index: 100;
  pointer-events: none;
  white-space: nowrap;
}

.toast-error {
  background: rgba(220, 38, 38, 0.9);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 560px) {
  .login-card {
    padding: 28px 20px;
    border-radius: 36px;
  }
  .logo-area h1 {
    font-size: 22px;
  }
  .input-field {
    padding: 12px 16px;
  }
  .get-code-btn {
    padding: 0 12px;
    font-size: 13px;
  }
  .toast-message {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
  .code-tip {
    flex-wrap: wrap;
  }
}
</style>
