<template>
  <div class="profile-edit-page">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="nav-content">
        <div class="logo" @click="goToHome">
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
          <span>小米生态商城</span>
        </div>
        <div class="nav-links">
          <div class="nav-item" @click="goToHome">首页</div>
          <div class="nav-item" @click="goToOrders">我的订单</div>
          <div class="nav-item" @click="goToProfile">个人中心</div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">编辑资料</h1>
        <p class="page-desc">修改您的个人信息，让账号更安全</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-else class="edit-content">
        <!-- 左侧：头像区域 + 用户信息 -->
        <div class="avatar-section">
          <!-- 头像卡片 -->
          <div class="avatar-card">
            <div class="avatar-wrapper">
              <img
                :src="avatarPreview || displayUserInfo.avatar || defaultAvatar"
                class="avatar-image"
                alt="头像"
              />
              <div class="avatar-overlay" @click="triggerAvatarUpload">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
                </svg>
                <span>更换头像</span>
              </div>
            </div>
            <p class="avatar-tip">支持 JPG、PNG 格式，建议使用正方形图片</p>
            <input
              ref="avatarInput"
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              style="display: none"
              @change="handleAvatarChange"
            />
          </div>

          <!-- 用户信息卡片 -->
          <div class="user-info-card">
            <div class="info-title">
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
              <span>当前信息</span>
            </div>
            <div class="info-list">
              <div class="info-item">
                <span class="info-label">用户ID</span>
                <span class="info-value">{{ displayUserInfo.userId || '--' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">用户名</span>
                <span class="info-value">{{ displayUserInfo.nickname || '--' }}</span>
                <span class="info-tag" v-if="formData.userName"
                  >将改为：{{ formData.userName }}</span
                >
              </div>
              <div class="info-item">
                <span class="info-label">手机号</span>
                <span class="info-value">{{ displayUserInfo.phone || '未绑定' }}</span>
                <span class="info-tag" v-if="formData.phone">将改为：{{ formData.phone }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">电子邮箱</span>
                <span class="info-value">{{ displayUserInfo.email || '未绑定' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">注册时间</span>
                <span class="info-value">{{ displayUserInfo.createTime || '--' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：表单区域 -->
        <div class="form-section">
          <div class="form-card">
            <!-- 用户名 -->
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">👤</span>
                用户名
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  class="form-input"
                  v-model="formData.userName"
                  :placeholder="`当前：${displayUserInfo.nickname}`"
                  :class="{ 'is-error': errors.userName }"
                />
                <button
                  class="input-clear"
                  v-if="formData.userName"
                  @click="formData.userName = ''"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p class="form-hint">建议使用2-20个字符，支持中文、英文、数字</p>
              <p class="form-error" v-if="errors.userName">{{ errors.userName }}</p>
            </div>

            <!-- 手机号 -->
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">📱</span>
                手机号
              </label>
              <div class="input-wrapper">
                <input
                  type="tel"
                  class="form-input"
                  v-model="formData.phone"
                  :placeholder="`当前：${displayUserInfo.phone}`"
                  :class="{ 'is-error': errors.phone }"
                />
                <button class="input-clear" v-if="formData.phone" @click="formData.phone = ''">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p class="form-hint">请输入11位手机号码，用于接收订单通知</p>
              <p class="form-error" v-if="errors.phone">{{ errors.phone }}</p>
            </div>

            <!-- 新密码 -->
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🔒</span>
                新密码
              </label>
              <div class="input-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  v-model="formData.password"
                  placeholder="请输入新密码（留空则不变）"
                  :class="{ 'is-error': errors.password }"
                />
                <button class="input-toggle" @click="showPassword = !showPassword">
                  <svg
                    v-if="!showPassword"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg
                    v-else
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                    />
                    <path
                      d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
                    />
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
                  </svg>
                </button>
                <button
                  class="input-clear"
                  v-if="formData.password"
                  @click="formData.password = ''"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p class="form-hint">密码长度6-20位，建议包含字母和数字，留空则不修改</p>
              <p class="form-error" v-if="errors.password">{{ errors.password }}</p>
            </div>

            <!-- 确认新密码 -->
            <div class="form-group" v-if="formData.password">
              <label class="form-label">
                <span class="label-icon">✓</span>
                确认新密码
              </label>
              <div class="input-wrapper">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-input"
                  v-model="formData.confirmPassword"
                  placeholder="请再次输入新密码"
                  :class="{ 'is-error': errors.confirmPassword }"
                />
                <button class="input-toggle" @click="showConfirmPassword = !showConfirmPassword">
                  <svg
                    v-if="!showConfirmPassword"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg
                    v-else
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
                    />
                    <path
                      d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
                    />
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
                  </svg>
                </button>
                <button
                  class="input-clear"
                  v-if="formData.confirmPassword"
                  @click="formData.confirmPassword = ''"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p class="form-error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
            </div>

            <!-- 提交按钮 -->
            <div class="form-actions">
              <button class="btn-cancel" @click="handleCancel">取消</button>
              <button class="btn-submit" :disabled="isSubmitting" @click="handleSubmit">
                <span v-if="isSubmitting" class="loading-spinner-small"></span>
                <span v-else>保存修改</span>
              </button>
            </div>
          </div>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get_user_info, update_user_info } from '@/api/user'

const router = useRouter()

// 默认头像
const defaultAvatar = 'https://storage.360buyimg.com/default.image/default_avatar.png'

// 显示的用户信息（用于左侧展示）
const displayUserInfo = reactive({
  userId: '',
  nickname: '',
  avatar: '',
  phone: '',
  email: '',
  createTime: '',
  role: 0,
  token: '',
})

// 加载状态
const loading = ref(true)

// 表单数据
const formData = reactive({
  userName: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userAvatar: '',
})

// 头像预览
const avatarPreview = ref('')
const avatarInput = ref(null)

// 密码显示控制
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 提交状态
const isSubmitting = ref(false)

// 错误信息
const errors = reactive({
  userName: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

// Toast 状态
const toast = ref({
  visible: false,
  message: '',
  isError: false,
  timer: null,
})

const showMessage = (message, isError = false) => {
  if (toast.value.timer) clearTimeout(toast.value.timer)
  toast.value.message = message
  toast.value.isError = isError
  toast.value.visible = true
  toast.value.timer = setTimeout(() => {
    toast.value.visible = false
  }, 2000)
}

// 更新本地存储
const updateLocalStorage = (updates) => {
  try {
    // 获取当前存储的用户信息
    const storedUserInfo = localStorage.getItem('mall-user_merchant-info')
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo)

      // 更新字段
      if (updates.newUserName) userInfo.userName = updates.newUserName
      if (updates.newPhone) userInfo.phone = updates.newPhone
      if (updates.newUserAvatar) userInfo.userAvatar = updates.newUserAvatar

      // 保存回 localStorage
      localStorage.setItem('mall-user_merchant-info', JSON.stringify(userInfo))
      console.log('本地存储已更新:', userInfo)
    }

    // 如果有 token 更新，也更新 token
    if (updates.token) {
      localStorage.setItem('token', updates.token)
    }
  } catch (error) {
    console.error('更新本地存储失败:', error)
  }
}

// 更新左侧显示的用户信息
const updateDisplayUserInfo = (data) => {
  if (data.newUserName) displayUserInfo.nickname = data.newUserName
  if (data.newPhone) displayUserInfo.phone = data.newPhone
  if (data.newUserAvatar) displayUserInfo.avatar = data.newUserAvatar
}

// 验证函数
const validateForm = () => {
  let isValid = true

  // 清空之前的错误
  errors.userName = ''
  errors.phone = ''
  errors.password = ''
  errors.confirmPassword = ''

  // 验证用户名
  if (formData.userName && (formData.userName.length < 2 || formData.userName.length > 20)) {
    errors.userName = '用户名长度应在2-20个字符之间'
    isValid = false
  }

  // 验证手机号
  if (formData.phone) {
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = '请输入正确的11位手机号码'
      isValid = false
    }
  }

  // 验证密码
  if (formData.password) {
    if (formData.password.length < 6 || formData.password.length > 20) {
      errors.password = '密码长度应在6-20个字符之间'
      isValid = false
    }

    // 验证确认密码
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = '两次输入的密码不一致'
      isValid = false
    }
  }

  return isValid
}

// 触发头像上传
const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

// 处理头像变更
const handleAvatarChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    showMessage('请选择图片文件', true)
    return
  }

  // 验证文件大小（限制2MB）
  if (file.size > 2 * 1024 * 1024) {
    showMessage('图片大小不能超过2MB', true)
    return
  }

  // 创建预览
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result
    formData.userAvatar = e.target?.result
  }
  reader.readAsDataURL(file)
}

// 获取用户信息
const fetchUserInfo = async () => {
  loading.value = true
  try {
    const response = await get_user_info()
    if (response.code === 200) {
      const data = response.data
      displayUserInfo.userId = data.userId
      displayUserInfo.nickname = data.userName
      displayUserInfo.avatar = data.userAvatar || defaultAvatar
      displayUserInfo.phone = data.phone || '未绑定'
      displayUserInfo.email = data.email || '未绑定'
      displayUserInfo.createTime = data.createTime || '2024-01-01'
      displayUserInfo.role = data.role || 0
    } else {
      showMessage(response.msg || '获取用户信息失败', true)
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    showMessage('网络错误，无法获取用户信息', true)
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) {
    showMessage('请检查表单填写内容', true)
    return
  }

  // 检查是否有任何修改
  if (!formData.userName && !formData.phone && !formData.password && !formData.userAvatar) {
    showMessage('请至少修改一项内容', true)
    return
  }

  isSubmitting.value = true

  try {
    // 构建请求数据
    const requestData = {}
    if (formData.userName) requestData.newUserName = formData.userName
    if (formData.phone) requestData.newPhone = formData.phone
    if (formData.password) requestData.newPassword = formData.password
    if (formData.userAvatar && formData.userAvatar !== displayUserInfo.avatar) {
      requestData.newUserAvatar = formData.userAvatar
    }

    const res = await update_user_info(requestData)

    if (res.code === 200) {
      // 更新本地存储
      updateLocalStorage(requestData)

      // 更新左侧显示信息
      updateDisplayUserInfo(requestData)

      // 清空表单
      formData.userName = ''
      formData.phone = ''
      formData.password = ''
      formData.confirmPassword = ''
      avatarPreview.value = ''

      showMessage('资料修改成功')

      // 延迟跳转
      setTimeout(() => {
        router.push('/profile')
      }, 1500)
    } else {
      showMessage(res.msg || '修改失败，请重试', true)
    }
  } catch (error) {
    console.error('更新失败:', error)
    showMessage('修改失败，请重试', true)
  } finally {
    isSubmitting.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

// 导航函数
const goToHome = () => router.push('/')
const goToOrders = () => router.push('/order/suborder/list')
const goToProfile = () => router.push('/profile')

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
/* 样式与之前相同，保持不变 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.profile-edit-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f6 100%);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}

/* ========== 导航栏 ========== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.logo span {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6700, #ffaa66);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-item {
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-item:hover {
  color: #ff6700;
}

/* ========== 容器 ========== */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px;
}

/* ========== 页面标题 ========== */
.page-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: #64748b;
}

/* ========== 加载状态 ========== */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f0f0f0;
  border-top-color: #ff6700;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ========== 主内容区 ========== */
.edit-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
}

/* ========== 左侧区域 ========== */
.avatar-section {
  position: sticky;
  top: 100px;
  height: fit-content;
}

/* 头像卡片 */
.avatar-card {
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.avatar-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  cursor: pointer;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-overlay svg {
  stroke: white;
}

.avatar-overlay span {
  font-size: 12px;
}

.avatar-tip {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 12px;
}

/* 用户信息卡片 */
.user-info-card {
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.info-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.info-title svg {
  stroke: #ff6700;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  font-size: 13px;
  line-height: 1.5;
}

.info-label {
  width: 70px;
  color: #94a3b8;
  flex-shrink: 0;
}

.info-value {
  color: #1e293b;
  font-weight: 500;
}

.info-tag {
  margin-left: 8px;
  font-size: 11px;
  color: #ff6700;
  background: #fff5eb;
  padding: 2px 8px;
  border-radius: 20px;
}

/* ========== 表单区域 ========== */
.form-section {
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.form-card {
  padding: 32px;
}

.form-group {
  margin-bottom: 28px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8px;
}

.label-icon {
  font-size: 16px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  transition: all 0.2s;
  outline: none;
  background: white;
}

.form-input:focus {
  border-color: #ff6700;
  box-shadow: 0 0 0 3px rgba(255, 103, 0, 0.1);
}

.form-input.is-error {
  border-color: #ef4444;
}

.input-clear {
  position: absolute;
  right: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.input-clear:hover {
  color: #ef4444;
  background: #fef2f2;
}

.input-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.2s;
}

.input-toggle:hover {
  color: #ff6700;
  background: #fff5eb;
}

.form-hint {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 6px;
}

.form-error {
  font-size: 12px;
  color: #ef4444;
  margin-top: 6px;
}

/* ========== 按钮 ========== */
.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
}

.btn-cancel:hover {
  border-color: #ff6700;
  color: #ff6700;
  background: #fff5eb;
}

.btn-submit {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* ========== Toast ========== */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  padding: 12px 24px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  z-index: 1000;
  white-space: nowrap;
}

.toast-error {
  background: rgba(220, 38, 38, 0.95);
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

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .edit-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .avatar-section {
    position: static;
  }

  .avatar-card {
    padding: 24px;
  }

  .form-card {
    padding: 24px;
  }

  .form-actions {
    flex-direction: column;
  }

  .page-title {
    font-size: 24px;
  }

  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }

  .info-item {
    flex-direction: column;
    gap: 4px;
  }

  .info-label {
    width: auto;
  }
}
</style>
