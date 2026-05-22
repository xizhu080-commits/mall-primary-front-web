<template>
  <div class="register-page">
    <!-- 背景装饰 -->
    <div class="bg-gradient"></div>
    <div class="glow-orb glow-orb-1"></div>
    <div class="glow-orb glow-orb-2"></div>
    <div class="glow-orb glow-orb-3"></div>

    <div class="register-container">
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
          <p>加入小米生态</p>
          <p>{{ identityType === 'personal' ? '开启智能生活' : '共创商业未来' }}</p>
        </div>
        <div class="brand-features">
          <template v-if="identityType === 'personal'">
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
              <span>海量智能产品</span>
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
              <span>专属会员权益</span>
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
              <span>全屋智能体验</span>
            </div>
          </template>
          <template v-else>
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
              <span>亿万级用户流量</span>
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
              <span>智能生态互联</span>
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
              <span>专属技术支持</span>
            </div>
          </template>
        </div>
        <div class="login-link">
          <span>{{ identityType === 'personal' ? '已有个人账号？' : '已有商家账号？' }}</span>
          <button class="link-btn" @click="goToLogin">立即登录</button>
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
            <span>个人用户注册</span>
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
            <span>个人商家注册</span>
          </button>
        </div>

        <div class="form-header">
          <h2>{{ identityType === 'personal' ? '创建个人账户' : '商家入驻申请' }}</h2>
          <p>
            {{
              identityType === 'personal'
                ? '填写信息，开启智能生活之旅'
                : '填写真实信息，开启您的商业之旅'
            }}
          </p>
        </div>

        <form class="register-form" @submit.prevent="handleRegister">
          <!-- ========== 个人用户表单 ========== -->
          <template v-if="identityType === 'personal'">
            <div class="form-group">
              <label><span>用户名</span><span class="required">*</span></label>
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
                <input type="text" v-model="personalForm.username" placeholder="请输入用户名" />
              </div>
            </div>

            <div class="form-group">
              <label><span>手机号</span><span class="required">*</span></label>
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
                  v-model="personalForm.phone"
                  placeholder="请输入手机号"
                  maxlength="11"
                />
              </div>
            </div>

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
                    v-model="personalForm.code"
                    placeholder="请输入验证码"
                    maxlength="6"
                  />
                </div>
                <button
                  type="button"
                  class="get-code"
                  @click="sendCode('personal')"
                  :disabled="personalCodeCountdown > 0"
                >
                  {{ personalCodeCountdown > 0 ? `${personalCodeCountdown}s` : '获取验证码' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label><span>密码</span><span class="required">*</span></label>
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
                  :type="showPersonalPassword ? 'text' : 'password'"
                  v-model="personalForm.password"
                  placeholder="请设置登录密码"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPersonalPassword = !showPersonalPassword"
                >
                  {{ showPersonalPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label><span>确认密码</span><span class="required">*</span></label>
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
                  :type="showPersonalConfirmPassword ? 'text' : 'password'"
                  v-model="personalForm.confirmPassword"
                  placeholder="请再次输入密码"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPersonalConfirmPassword = !showPersonalConfirmPassword"
                >
                  {{ showPersonalConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
          </template>

          <!-- ========== 商家用户表单 ========== -->
          <template v-else>
            <div class="form-group">
              <label><span>商家名称</span><span class="required">*</span></label>
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
                  v-model="merchantForm.merchantName"
                  placeholder="请输入商家全称"
                />
              </div>
            </div>

            <div class="form-group">
              <label><span>品牌领域</span><span class="required">*</span></label>
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
                    d="M20.59 13.41l-2.83 2.83M4.5 9.5l2.83-2.83M9.5 4.5l2.83 2.83M4.5 14.5l2.83-2.83"
                  />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M17.5 9.5l2.83 2.83M14.5 19.5l2.83-2.83" />
                </svg>
                <input
                  type="text"
                  v-model="merchantForm.brand"
                  placeholder="例：小米汽车、小米家电、小米手机..."
                />
              </div>
            </div>

            <div class="form-group">
              <label><span>联系电话</span><span class="required">*</span></label>
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
                  v-model="merchantForm.phone"
                  placeholder="请输入联系电话"
                  maxlength="11"
                />
              </div>
            </div>

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
                    v-model="merchantForm.code"
                    placeholder="请输入验证码"
                    maxlength="6"
                  />
                </div>
                <button
                  type="button"
                  class="get-code"
                  @click="sendCode('merchant')"
                  :disabled="merchantCodeCountdown > 0"
                >
                  {{ merchantCodeCountdown > 0 ? `${merchantCodeCountdown}s` : '获取验证码' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label><span>登录密码</span><span class="required">*</span></label>
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
                  :type="showMerchantPassword ? 'text' : 'password'"
                  v-model="merchantForm.password"
                  placeholder="请设置登录密码"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showMerchantPassword = !showMerchantPassword"
                >
                  {{ showMerchantPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label><span>确认密码</span><span class="required">*</span></label>
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
                  :type="showMerchantConfirmPassword ? 'text' : 'password'"
                  v-model="merchantForm.confirmPassword"
                  placeholder="请再次输入密码"
                />
                <button
                  type="button"
                  class="password-toggle"
                  @click="showMerchantConfirmPassword = !showMerchantConfirmPassword"
                >
                  {{ showMerchantConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="form-group">
              <label><span>真实姓名</span><span class="required">*</span></label>
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
                <input type="text" v-model="merchantForm.realName" placeholder="请输入真实姓名" />
              </div>
            </div>

            <div class="form-group">
              <label><span>身份证号</span><span class="required">*</span></label>
              <div class="input-field">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                  <circle cx="8" cy="14" r="2" />
                  <line x1="12" y1="14" x2="16" y2="14" />
                </svg>
                <input
                  type="text"
                  v-model="merchantForm.idCard"
                  placeholder="请输入18位身份证号码"
                />
              </div>
            </div>

            <div class="form-group">
              <label><span>资质证书</span><span class="required">*</span></label>
              <div class="input-field">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <input
                  type="text"
                  v-model="merchantForm.qualificationCertificate"
                  placeholder="营业执照号 / 统一社会信用代码"
                />
              </div>
            </div>

            <div class="form-group">
              <label>商家简介</label>
              <div class="input-field textarea-field">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M20 12v10H4V12M12 2v8M8 6l4-4 4 4" />
                </svg>
                <textarea
                  v-model="merchantForm.intro"
                  placeholder="请简要介绍您的品牌及主营业务..."
                  rows="3"
                ></textarea>
              </div>
            </div>
          </template>

          <div class="agree-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="agreeTerms" />
              <span class="checkmark"></span>
              <span class="agree-text">
                我已阅读并同意 <a href="#">《小米生态用户协议》</a> 及 <a href="#">《隐私政策》</a>
              </span>
            </label>
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '提交中...' : identityType === 'personal' ? '立即注册' : '提交入驻申请' }}
          </button>

          <p class="form-footer" v-if="identityType === 'merchant'">
            提交申请后，我们将在1-3个工作日内完成审核
          </p>
        </form>
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
import { reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { sendCode as sendCodeApi } from '@/api/common/sendCode'
import { user_merchant_register } from '@/api/common/register'

const router = useRouter()

// 身份类型：personal（个人用户）或 merchant（个人商家）
const identityType = ref('personal')

// 协议同意
const agreeTerms = ref(true)
const loading = ref(false)

// ========== 个人用户表单 ==========
const personalForm = reactive({
  username: '',
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
})

// 商家用户表单
const merchantForm = reactive({
  merchantName: '',
  brand: '',
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
  realName: '',
  idCard: '',
  qualificationCertificate: '',
  intro: '',
})

// 密码显示切换（个人）
const showPersonalPassword = ref(false)
const showPersonalConfirmPassword = ref(false)

// 密码显示切换（商家）
const showMerchantPassword = ref(false)
const showMerchantConfirmPassword = ref(false)

// 验证码倒计时
const personalCodeCountdown = ref(0)
const merchantCodeCountdown = ref(0)
let personalTimer = null
let merchantTimer = null

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

// 切换身份
const switchIdentity = (type) => {
  identityType.value = type
}

// 发送验证码（真实API）
const sendCode = async (type) => {
  const phone = type === 'personal' ? personalForm.phone : merchantForm.phone
  const countdown = type === 'personal' ? personalCodeCountdown : merchantCodeCountdown

  if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
    showMessage('请先填写正确的手机号', true)
    return
  }

  if (countdown.value > 0) return

  try {
    const res = await sendCodeApi(phone, type)

    showMessage('验证码已发送')

    // 启动倒计时
    countdown.value = 60
    const timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        clearInterval(timer)
        if (type === 'personal') {
          personalTimer = null
        } else {
          merchantTimer = null
        }
      }
    }, 1000)

    if (type === 'personal') {
      personalTimer = timer
    } else {
      merchantTimer = timer
    }
  } catch (error) {
    showMessage(error.message || '验证码发送失败，请稍后重试', true)
  }
}

// 个人用户验证
const validatePersonalForm = () => {
  if (!personalForm.username.trim()) {
    showMessage('请输入用户名', true)
    return false
  }
  if (personalForm.username.length < 2 || personalForm.username.length > 20) {
    showMessage('用户名长度为2-20位', true)
    return false
  }
  if (!personalForm.phone || !/^1[3-9]\d{9}$/.test(personalForm.phone)) {
    showMessage('请输入正确的11位手机号码', true)
    return false
  }
  if (!personalForm.code || personalForm.code.length !== 6) {
    showMessage('请输入6位验证码', true)
    return false
  }
  if (!personalForm.password) {
    showMessage('请设置登录密码', true)
    return false
  }
  if (!personalForm.confirmPassword) {
    showMessage('请设置确认密码', true)
  }

  if (personalForm.password.length < 6 || personalForm.password.length > 20) {
    showMessage('密码长度为6-20位', true)
    return false
  }
  if (personalForm.password !== personalForm.confirmPassword) {
    showMessage('两次输入的密码不一致', true)
    return false
  }
  return true
}

// 商家用户验证
const validateMerchantForm = () => {
  if (!merchantForm.merchantName.trim()) {
    showMessage('请输入商家名称', true)
    return false
  }
  if (!merchantForm.brand.trim()) {
    showMessage('请输入品牌领域', true)
    return false
  }
  if (!merchantForm.phone || !/^1[3-9]\d{9}$/.test(merchantForm.phone)) {
    showMessage('请输入正确的11位手机号码', true)
    return false
  }
  if (!merchantForm.code || merchantForm.code.length !== 6) {
    showMessage('请输入6位验证码', true)
    return false
  }
  if (!merchantForm.password) {
    showMessage('请设置登录密码', true)
    return false
  }
  if (!merchantForm.confirmPassword) {
    showMessage('请设置确认密码', true)
    return false
  }
  if (merchantForm.password.length < 6 || merchantForm.password.length > 20) {
    showMessage('密码长度为6-20位', true)
    return false
  }
  if (merchantForm.password !== merchantForm.confirmPassword) {
    showMessage('两次输入的密码不一致', true)
    return false
  }
  if (!merchantForm.realName.trim()) {
    showMessage('请输入真实姓名', true)
    return false
  }
  if (!merchantForm.idCard.trim()) {
    showMessage('请输入身份证号码', true)
    return false
  }
  if (
    !/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(
      merchantForm.idCard,
    )
  ) {
    showMessage('请输入正确的18位身份证号码', true)
    return false
  }
  if (!merchantForm.qualificationCertificate.trim()) {
    showMessage('请输入资质证书/营业执照号', true)
    return false
  }
  return true
}

// 提交注册（调用真实API）
const handleRegister = async () => {
  const isValid =
    identityType.value === 'personal' ? validatePersonalForm() : validateMerchantForm()

  if (!isValid) return

  if (!agreeTerms.value) {
    showMessage('请阅读并同意用户协议', true)
    return
  }

  loading.value = true

  try {
    let res
    if (identityType.value === 'personal') {
      // 个人用户注册
      const personalData = {
        username: personalForm.username.trim(),
        phone: personalForm.phone.trim(),
        code: personalForm.code.trim(),
        password: personalForm.password,
        confirmPassword: personalForm.confirmPassword,
      }
      res = await user_merchant_register(personalData, 'personal')
    } else {
      // 商家用户注册
      const merchantData = {
        merchantName: merchantForm.merchantName.trim(),
        brand: merchantForm.brand.trim(),
        phone: merchantForm.phone.trim(),
        code: merchantForm.code.trim(),
        password: merchantForm.password,
        confirmPassword: merchantForm.confirmPassword,
        realName: merchantForm.realName.trim(),
        idCard: merchantForm.idCard.trim(),
        qualificationCertificate: merchantForm.qualificationCertificate.trim(),
        intro: merchantForm.intro.trim(),
      }
      res = await user_merchant_register(merchantData, 'merchant')
    }

    if (res.code === 200) {
      if (identityType.value === 'personal') {
        showMessage('注册成功！即将跳转登录页')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        showMessage('入驻申请已提交！审核通过后将短信通知您')
        // 商家注册成功后清空表单
        setTimeout(() => {
          Object.keys(merchantForm).forEach((key) => {
            merchantForm[key] = ''
          })
        }, 500)
      }
    } else {
      showMessage(res.msg || '注册失败，请稍后重试', true)
    }
  } catch (error) {
    showMessage(error.message || '网络异常，请稍后重试', true)
  } finally {
    loading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (personalTimer) clearInterval(personalTimer)
  if (merchantTimer) clearInterval(merchantTimer)
  if (toast.timer) clearTimeout(toast.timer)
})
</script>

<style scoped>
/* 样式保持不变 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-page {
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
.register-container {
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
  overflow-y: auto;
  max-height: 90vh;
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
.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
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

.input-field input,
.input-field textarea {
  width: 100%;
  padding: 13px 16px 13px 42px;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  font-family: inherit;
}

.input-field input::placeholder,
.input-field textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.input-field textarea {
  resize: vertical;
  min-height: 70px;
  padding: 13px 16px 13px 42px;
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

/* 协议 */
.agree-group {
  margin: 10px 0 6px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-label input:checked + .checkmark {
  background: #ff6700;
  border-color: #ff6700;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 11px;
}

.agree-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.agree-text a {
  color: #ff8c42;
  text-decoration: none;
}

.agree-text a:hover {
  text-decoration: underline;
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
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(255, 103, 0, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-footer {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 16px;
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

/* 滚动条 */
.form-section::-webkit-scrollbar {
  width: 4px;
}

.form-section::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.form-section::-webkit-scrollbar-thumb {
  background: rgba(255, 103, 0, 0.5);
  border-radius: 4px;
}

/* 响应式 */
@media (max-width: 1000px) {
  .register-container {
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
    max-height: none;
  }
}

@media (max-width: 560px) {
  .register-page {
    padding: 20px 16px;
  }

  .register-container {
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
