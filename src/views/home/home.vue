<template>
  <div class="home-page">
    <!-- 顶部通知栏 -->
    <div class="top-bar">
      <div class="container">
        <div class="top-left">
          <span>欢迎来到京东商城！</span>
          <span class="separator">|</span>
          <span>正品保证</span>
          <span class="separator">|</span>
          <span>七天无理由退货</span>
        </div>
        <div class="top-right">
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="top-link">请登录</router-link>
            <router-link to="/register" class="top-link">免费注册</router-link>
          </template>
          <template v-else>
            <span class="user-name" @click="goToCenter">{{ identity_type_name }}</span>
            <span class="separator">|</span>
            <span class="top-link" @click="goToSuborderList">我的订单</span>
            <span class="separator">|</span>
            <span class="top-link">客户服务</span>
            <span class="separator">|</span>
            <span class="top-link logout-btn" @click="showLogoutModal = true">退出登录</span>
          </template>
        </div>
      </div>
    </div>

    <!-- 主头部：Logo + 搜索框 -->
    <div class="main-header">
      <div class="container">
        <div class="logo" @click="goToHome">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          <span class="logo-text">京东<span class="highlight">商城</span></span>
        </div>
        <div class="search-box">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索商品"
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            搜索
          </button>
        </div>
        <div class="cart-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span class="cart-badge">0</span>
        </div>
      </div>
    </div>

    <!-- 导航栏 + 分类菜单 -->
    <div class="nav-section">
      <div class="container">
        <div class="category-menu">
          <button class="category-btn">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            全部分类
          </button>
          <div class="category-dropdown">
            <div v-for="item in categories" :key="item" class="category-item">{{ item }}</div>
          </div>
        </div>
        <div class="nav-links">
          <a href="#" class="nav-link active">首页</a>
          <a href="#" class="nav-link">限时秒杀</a>
          <a href="#" class="nav-link">品牌闪购</a>
          <a href="#" class="nav-link">京东超市</a>
          <a href="#" class="nav-link">家电城</a>
          <a href="#" class="nav-link">手机城</a>
        </div>
      </div>
    </div>

    <!-- Banner 轮播区 -->
    <div class="banner-section">
      <div class="container">
        <div class="banner-slider">
          <img src="https://picsum.photos/1200/400?random=1" alt="banner" />
          <div class="banner-dots">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐商品区 -->
    <div class="recommend-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门推荐</h2>
          <a href="#" class="more-link">查看更多 &gt;</a>
        </div>
        <div class="product-grid" v-if="!loading">
          <div
            v-for="product in recommendData"
            :key="product.spuId"
            class="product-card"
            @click="goToProductDetail(product.spuId)"
          >
            <div class="product-image">
              <img :src="product.productUrl" :alt="product.productName" />
              <span class="product-tag" v-if="product.tag">{{ product.tag }}</span>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.productName }}</h3>
              <p class="product-desc">{{ product.description || '高品质商品，限时优惠' }}</p>
              <div class="product-price">
                <span class="current-price">¥{{ formatPrice(product.price) }}</span>
                <span class="original-price" v-if="product.originalPrice"
                  >¥{{ formatPrice(product.originalPrice) }}</span
                >
              </div>
              <button class="buy-btn" @click.stop="goToBuy(product.spuId)">立即购买</button>
            </div>
          </div>
        </div>
        <div v-else class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
        <div v-if="error" class="error-state">
          <p>加载失败，请刷新重试</p>
        </div>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="footer">
      <div class="container">
        <div class="footer-links">
          <a href="#">关于我们</a>
          <a href="#">联系我们</a>
          <a href="#">人才招聘</a>
          <a href="#">商家入驻</a>
          <a href="#">广告服务</a>
          <a href="#">手机京东</a>
        </div>
        <div class="copyright">
          <p>© 2024 京东商城 版权所有 | 京ICP备12345678号</p>
        </div>
      </div>
    </div>

    <!-- 自定义退出登录确认弹窗 -->
    <div v-if="showLogoutModal" class="modal-overlay" @click.self="showLogoutModal = false">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12M12 16H12.01M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h3>确认退出</h3>
        </div>
        <div class="modal-body">
          <p>您确定要退出登录吗？</p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn cancel-btn" @click="showLogoutModal = false">取消</button>
          <button class="modal-btn confirm-btn" @click="confirmLogout">确认退出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHomeRecommend } from '@/api/home/home'

const router = useRouter()

// ========== 搜索功能 ==========
const searchKeyword = ref('')

// 处理搜索
const handleSearch = () => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) {
    return
  }
  sessionStorage.setItem('searchKeyword', keyword)
  router.push({
    path: '/search',
    query: { keyword: keyword },
  })
}

// ========== 商品跳转功能 ==========
// 跳转商品详情页
const goToProductDetail = (spuId) => {
  if (spuId) {
    router.push(`/product/detail/${spuId}`)
  }
}

// 立即购买（阻止事件冒泡，避免触发父级卡片点击）
const goToBuy = (spuId) => {
  // 可跳转到商品详情页或直接购买页面
  router.push(`/product/detail/${spuId}`)
}

// 登录状态
const isLoggedIn = ref(false)
const identity_type_name = ref('')
const identityId = ref('')
const role = ref('')
const currentRole = ref('')
const currentType = ref('')

// 推荐数据
const recommendData = ref([])
const loading = ref(false)
const error = ref(null)

// 分类数据
const categories = ref(['家用电器', '手机数码', '电脑办公', '服装', '美妆', '食品', '生鲜'])

// 弹窗显示状态
const showLogoutModal = ref(false)

// 格式化价格
const formatPrice = (price) => {
  if (price === undefined || price === null) return '0.00'
  return price.toFixed(2)
}

// 获取推荐数据
const fetchHomeRecommendData = async () => {
  loading.value = true
  try {
    const response = await getHomeRecommend()
    recommendData.value = response.data || []
  } catch (err) {
    error.value = err.message || '获取数据失败'
  } finally {
    loading.value = false
  }
}
let identityType = ''
// 检查登录状态
const checkLoginStatus = () => {
  const userInfoStr =
    localStorage.getItem('mall-user_merchant-info') ||
    sessionStorage.getItem('mall-user_merchant-info')
  if (userInfoStr) {
    try {
      const userInfo = JSON.parse(userInfoStr)
      if (userInfo.token) {
        isLoggedIn.value = true
        const userName = userInfo.userName || userInfo.merchantName
        identityType = userInfo.identityType
        currentRole.value = userInfo.role
        currentType.value = userInfo.identityType
        if (identityType && userName) {
          identity_type_name.value = `${identityType}:${userName}`
        } else if (userName) {
          identity_type_name.value = userName
        } else {
          identity_type_name.value = '游客'
        }
        identityId.value = userInfo.userId || userInfo.merchantId
        role.value = userInfo.role
      } else {
        clearLoginStatus()
      }
    } catch (error) {
      console.error('解析用户信息失败:', error)
      clearLoginStatus()
    }
  } else {
    clearLoginStatus()
  }
}

const clearLoginStatus = () => {
  isLoggedIn.value = false
  identity_type_name.value = ''
  identityId.value = ''
  role.value = ''
}

const goToHome = () => {
  router.push('/')
}

const goToSuborderList = () => {
  if (identityType == '用户') {
    router.push('/order/suborder/list')
  } else if (identityType == '商家') {
    router.push('/order/suborder/managerment')
  }
}

const goToCenter = () => {
  if (currentRole.value == '0') router.push(`/user/detail/${identityId.value}`)
  else if (currentRole.value == '1') router.push(`/merchant/detail/${identityId.value}`)
  else if (currentRole.value == '2') router.push(`/admin/detail/${identityId.value}`)
  else router.push('/login')
}

// 确认退出登录
const confirmLogout = () => {
  localStorage.removeItem('mall-user_merchant-info')
  isLoggedIn.value = false
  identity_type_name.value = ''
  identityId.value = ''
  role.value = ''
  showLogoutModal.value = false
  router.push('/home')
}

onMounted(() => {
  checkLoginStatus()
  fetchHomeRecommendData()
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  min-height: 100vh;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 顶部通知栏 */
.top-bar {
  background: #e8e8e8;
  font-size: 12px;
  padding: 8px 0;
  color: #666;
}

.top-bar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-left {
  display: flex;
  gap: 12px;
}

.top-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.top-link {
  color: #666;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.top-link:hover {
  color: #f23030;
}

.user-name {
  color: #f23030;
  cursor: pointer;
  font-weight: 500;
}

.separator {
  color: #ccc;
}

/* 退出登录按钮样式，避免误触但保持美观 */
.logout-btn {
  color: #999;
  transition: all 0.2s;
}

.logout-btn:hover {
  color: #f23030;
}

/* 主头部 */
.main-header {
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.main-header .container {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logo svg {
  color: #f23030;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.logo-text .highlight {
  color: #f23030;
}

.search-box {
  flex: 1;
  display: flex;
  max-width: 500px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #f23030;
  border-right: none;
  border-radius: 30px 0 0 30px;
  outline: none;
  font-size: 14px;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgba(242, 48, 48, 0.2);
}

.search-btn {
  background: #f23030;
  border: none;
  padding: 0 24px;
  border-radius: 0 30px 30px 0;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #d42020;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  padding: 8px;
}

.cart-icon svg {
  stroke: #333;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #f23030;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 50%;
  min-width: 18px;
  text-align: center;
}

/* 导航栏 */
.nav-section {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-section .container {
  display: flex;
  align-items: center;
  height: 50px;
}

.category-menu {
  position: relative;
  margin-right: 30px;
}

.category-btn {
  background: #f23030;
  border: none;
  padding: 8px 24px;
  border-radius: 30px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.category-btn:hover {
  background: #d42020;
}

.category-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  width: 240px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 12px 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  z-index: 200;
}

.category-menu:hover .category-dropdown {
  opacity: 1;
  visibility: visible;
}

.category-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
}

.category-item:hover {
  background: #f5f5f5;
  color: #f23030;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #f23030;
}

/* Banner 区 */
.banner-section {
  margin-top: 20px;
}

.banner-slider {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.banner-slider img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.banner-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s;
}

.dot.active {
  width: 24px;
  border-radius: 10px;
  background: #f23030;
}

/* 推荐商品区 */
.recommend-section {
  padding: 40px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  position: relative;
  padding-left: 12px;
  border-left: 4px solid #f23030;
}

.more-link {
  color: #999;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.more-link:hover {
  color: #f23030;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

@media (max-width: 1000px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.product-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f8f8f8;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #f23030;
  color: white;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 12px;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: #f23030;
}

.original-price {
  font-size: 12px;
  color: #bbb;
  text-decoration: line-through;
}

.buy-btn {
  width: 100%;
  background: linear-gradient(135deg, #f23030, #d42020);
  border: none;
  padding: 10px;
  border-radius: 30px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.buy-btn:hover {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(242, 48, 48, 0.3);
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #eee;
  border-top-color: #f23030;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  text-align: center;
  padding: 60px;
  color: #999;
}

/* 底部 */
.footer {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 40px 0 20px;
  margin-top: 40px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #f23030;
}

.copyright {
  text-align: center;
  color: #999;
  font-size: 12px;
}

/* 自定义弹窗样式 - 美观现代 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-container {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.modal-header {
  padding: 24px 24px 12px;
  text-align: center;
}

.modal-icon {
  width: 56px;
  height: 56px;
  background: #fff2f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.modal-icon svg {
  color: #f23030;
  width: 28px;
  height: 28px;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-body {
  padding: 8px 24px 24px;
  text-align: center;
}

.modal-body p {
  color: #6b7280;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
}

.modal-footer {
  display: flex;
  border-top: 1px solid #f0f0f0;
}

.modal-btn {
  flex: 1;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.cancel-btn {
  color: #6b7280;
  border-right: 1px solid #f0f0f0;
  border-radius: 0 0 0 20px;
}

.cancel-btn:hover {
  background: #f9fafb;
  color: #374151;
}

.confirm-btn {
  color: #f23030;
  border-radius: 0 0 20px 0;
}

.confirm-btn:hover {
  background: #fff2f0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
