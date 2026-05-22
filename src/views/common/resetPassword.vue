<template>
  <div class="forgot-password-page">
    <!-- 背景装饰 -->
    <div class="bg-gradient"></div>
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
    <div class="glow-orb glow-orb-3"></div>

    <div class="forgot-container">
      <!-- 左侧品牌区 -->
      <div class="brand-section">
        <div class="brand-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h1>小米生态<span>开放平台</span></h1>
        </div>
        <div class="brand-quote">
          <p>找回密码</p>
          <p>重设您的账户密码</p>
        </div>
        <div class="brand-features">
          <div class="feature-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>验证身份信息</span>
          </div>
          <div class="feature-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>安全重置密码</span>
          </div>
          <div class="feature-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>快速恢复访问</span>
          </div>
        </div>
        <div class="login-link">
          <span>想起密码了？</span>
          <button class="link-btn" @click="goToLogin">返回登录</button>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="form-section">
        <!-- 顶部身份切换 Tabs -->
        <div class="identity-tabs">
          <button
            :class="['tab-btn', { active: identityType === 'personal' }]"
            @click="switchIdentity('personal')"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>个人用户</span>
          </button>
          <button
            :class="['tab-btn', { active: identityType === 'merchant' }]"
            @click="switchIdentity('merchant')"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>个人商家</span>
          </button>
        </div>

        <div class="form-header">
          <h2>找回密码</h2>
          <p>验证您的身份信息，重置登录密码</p>
        </div>

        <form class="reset-form" @submit.prevent="handleResetPassword">
          <!-- 用户ID / 商家ID -->
          <div class="form-group">
            <label>
              <span>{{ identityType === 'personal' ? '用户ID' : '商家ID' }}</span>
              <span class="required">*</span>
            </label>
            <div class="input-field">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                v-model="form.identityId"
                :placeholder="identityType === 'personal' ? '请输入您的用户ID' : '请输入您的商家ID'"
                autocomplete="off"
              />
            </div>
          </div>

          <!-- 手机号 -->
          <div class="form-group">
            <label><span>绑定手机号</span><span class="required">*</span></label>
            <div class="input-field">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              <input
                type="tel"
                v-model="form.phone"
                placeholder="请输入绑定的手机号"
                maxlength="11"
                autocomplete="off"
              />
            </div>
          </div>

          <!-- 验证码 -->
          <div class="form-group">
            <label><span>验证码</span><span class="required">*</span></label>
            <div class="code-field">
              <div class="input-field code-input">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                <input
                  type="text"
                  v-model="form.verifyCode"
                  placeholder="请输入验证码"
                  maxlength="6"
                />
              </div>
              <button
                type="button"
                class="get-code"
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

          <!-- 新密码 -->
          <div class="form-group">
            <label><span>新密码</span><span class="required">*</span></label>
            <div class="input-field">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="form.newPassword"
                placeholder="请设置新密码（6-20位）"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showNewPassword = !showNewPassword"
              >
                {{ showNewPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <!-- 确认新密码 -->
          <div class="form-group">
            <label><span>确认新密码</span><span class="required">*</span></label>
            <div class="input-field">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                placeholder="请再次输入新密码"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '提交中...' : '确认重置密码' }}
          </button>
        </form>

        <!-- 底部导航栏：返回登录 -->
        <div class="bottom-nav">
          <button class="back-login-btn" @click="goToLogin">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>返回登录</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast 提示 -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { sendCode as sendCodeApi } from '@/api/common/sendCode'
import { resetPassword } from '@/api/common/resetPassword'

const router = useRouter()

// 身份类型：personal（个人用户）或 merchant（个人商家）
const identityType = ref('personal')

// 表单数据
const form = reactive({
  identityId: '',
  phone: '',
  verifyCode: '',
  newPassword: '',
  confirmPassword: '',
})

// 密码显示切换
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// 加载状态
const loading = ref(false)

// 验证码倒计时
const codeCountdown = ref(0)
let countdownTimer = null

// Toast 状态
const toast = reactive({
  visible: false,
  message: '',
  isError: false,
  timer: null,
})

const showMessage = (message, isError = false) => {
  if (toast.timer) clearTimeout(toast.timer)
  toast.message = message
  toast.isError = isError
  toast.visible = true
  toast.timer = setTimeout(() => {
    toast.visible = false
  }, 2000)
}

// 手机号验证
const isPhoneValid = computed(() => {
  const phone = form.phone.trim()
  if (!phone) return false
  return /^1[3-9]\d{9}$/.test(phone)
})

// 切换身份
const switchIdentity = (type) => {
  identityType.value = type
  // 切换身份时清空表单
  form.identityId = ''
  form.phone = ''
  form.verifyCode = ''
  form.newPassword = ''
  form.confirmPassword = ''
}

// 发送验证码
const sendVerifyCode = async () => {
  if (!isPhoneValid.value) {
    showMessage('请输入正确的手机号', true)
    return
  }

  if (codeCountdown.value > 0) return

  loading.value = true

  try {
    const res = await sendCodeApi(form.phone.trim(), identityType.value)

    showMessage('验证码已发送')
    startCountdown()
  } catch (error) {
    showMessage(error.message || '验证码发送失败，请稍后重试', true)
  } finally {
    loading.value = false
  }
}

// 启动倒计时
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

// 表单验证
const validateForm = () => {
  if (!form.identityId.trim()) {
    showMessage(`请输入${identityType.value === 'personal' ? '用户ID' : '商家ID'}`, true)
    return false
  }

  if (!form.phone.trim()) {
    showMessage('请输入手机号', true)
    return false
  }

  if (!isPhoneValid.value) {
    showMessage('请输入正确的11位手机号码', true)
    return false
  }

  if (!form.verifyCode.trim()) {
    showMessage('请输入验证码', true)
    return false
  }

  if (form.verifyCode.length !== 6) {
    showMessage('验证码为6位数字', true)
    return false
  }

  if (!form.newPassword.trim()) {
    showMessage('请设置新密码', true)
    return false
  }

  if (form.newPassword.length < 6 || form.newPassword.length > 20) {
    showMessage('密码长度为6-20位', true)
    return false
  }

  if (form.newPassword !== form.confirmPassword) {
    showMessage('两次输入的密码不一致', true)
    return false
  }

  return true
}

// 重置密码
const handleResetPassword = async () => {
  if (!validateForm()) return

  loading.value = true

  const user_merchant_ID = identityType.value === 'personal' ? 'userId' : 'merchantId'

  try {
    const resetData = {
      [user_merchant_ID]: form.identityId.trim(),
      phone: form.phone.trim(),
      code: form.verifyCode.trim(),
      password: form.newPassword.trim(),
      confirmPassword: form.confirmPassword.trim(),
    }

    const res = await resetPassword(resetData, identityType.value)

    if (res.code === 200) {
      showMessage('密码重置成功！即将跳转登录页')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      showMessage(res.msg || '密码重置失败，请稍后重试', true)
    }
  } catch (error) {
    showMessage(error.message || '网络异常，请稍后重试', true)
  } finally {
    loading.value = false
  }
}

// 返回登录页
const goToLogin = () => {
  router.push('/login')
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
  if (toast.timer) clearTimeout(toast.timer)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.forgot-password-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #0f0f23 50%, #0a0a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow-x: hidden;
}

/* 背景光晕 */
.bg-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 103, 0, 0.08), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08), transparent 50%);
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
}

.glow-orb-1 {
  width: 300px;
  height: 300px;
  background: #ff6700;
  top: -100px;
  left: -100px;
}

.glow-orb-2 {
  width: 350px;
  height: 350px;
  background: #8b5cf6;
  bottom: -80px;
  right: -80px;
}

.glow-orb-3 {
  width: 200px;
  height: 200px;
  background: #06b6d4;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.15;
}

/* 主容器 */
.forgot-container {
  max-width: 1400px;
  width: 100%;
  display: flex;
  background: rgba(15, 25, 35, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 48px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* 左侧品牌区 */
.brand-section {
  flex: 1;
  background: linear-gradient(145deg, rgba(255, 103, 0, 0.2), rgba(139, 92, 246, 0.15));
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 26px;
  height: 26px;
  color: white;
}

.brand-logo h1 {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.brand-logo span {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-quote {
  margin-bottom: 48px;
}

.brand-quote p:first-child {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.brand-quote p:last-child {
  font-size: 36px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.feature-item svg {
  color: #ff8c42;
}

.login-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.link-btn {
  background: transparent;
  border: none;
  color: #ff8c42;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
}

.link-btn:hover {
  color: #ff6700;
}

/* 右侧表单区 */
.form-section {
  flex: 1.2;
  padding: 40px 48px 40px 40px;
  display: flex;
  flex-direction: column;
}

/* 顶部身份切换 Tabs */
.identity-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px;
  border-radius: 60px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 12px 0;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 103, 0, 0.3);
}

.tab-btn svg {
  flex-shrink: 0;
}

.tab-btn.active svg {
  stroke: white;
}

.form-header {
  margin-bottom: 28px;
}

.form-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}

.form-header p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* 表单样式 */
.reset-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.required {
  color: #ff6700;
  margin-left: 2px;
}

.input-field {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  transition: all 0.2s;
}

.input-field:focus-within {
  border-color: #ff6700;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 103, 0, 0.15);
}

.input-field svg {
  position: absolute;
  left: 14px;
  color: rgba(255, 255, 255, 0.4);
}

.input-field input {
  width: 100%;
  padding: 14px 16px 14px 42px;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  font-family: inherit;
}

.input-field input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

/* 验证码区域 */
.code-field {
  display: flex;
  gap: 12px;
}

.code-field .input-field {
  flex: 1;
}

.get-code {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  border: none;
  border-radius: 14px;
  padding: 0 20px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.get-code:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.get-code:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.code-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.code-tip svg {
  flex-shrink: 0;
}

/* 密码切换 */
.password-toggle {
  position: absolute;
  right: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  padding: 0;
}

/* 提交按钮 */
.submit-btn {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  border: none;
  border-radius: 40px;
  padding: 15px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(255, 103, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 底部导航栏 - 返回登录 */
.bottom-nav {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: center;
}

.back-login-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s;
}

.back-login-btn svg {
  transition: transform 0.2s;
}

.back-login-btn:hover {
  color: #ff8c42;
  background: rgba(255, 255, 255, 0.05);
}

.back-login-btn:hover svg {
  transform: translateX(-3px);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
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
  transition: all 0.3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* 响应式 */
@media (max-width: 1000px) {
  .forgot-container {
    flex-direction: column;
    max-width: 600px;
  }

  .brand-section {
    padding: 32px 28px;
  }

  .brand-quote p:last-child {
    font-size: 28px;
  }

  .form-section {
    padding: 32px 28px;
  }
}

@media (max-width: 560px) {
  .forgot-password-page {
    padding: 20px 16px;
  }

  .forgot-container {
    border-radius: 32px;
  }

  .brand-section {
    padding: 24px 20px;
  }

  .brand-quote p:last-child {
    font-size: 22px;
  }

  .form-section {
    padding: 24px 20px;
  }

  .brand-logo h1 {
    font-size: 18px;
  }

  .code-field {
    flex-direction: column;
  }

  .get-code {
    padding: 12px;
  }

  .identity-tabs .tab-btn span {
    display: none;
  }

  .identity-tabs .tab-btn {
    padding: 10px 0;
  }

  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
}
</style>
