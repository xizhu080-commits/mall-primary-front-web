<template>
  <div class="search-container">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <div class="nav-content">
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
          <span>小米生态商城</span>
        </div>
        <div class="nav-links">
          <div class="nav-item" @click="goToHome">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>首页</span>
          </div>
          <div class="nav-item" @click="goToProfile">
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
            <span>个人中心</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主搜索区域 -->
    <div class="search-hero">
      <div class="search-hero-content">
        <h1 class="hero-title">探索智慧生活</h1>
        <p class="hero-subtitle">发现您心仪的智能好物</p>
        <div class="search-box-wrapper">
          <div class="search-box">
            <svg
              class="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              v-model="keyword"
              placeholder="请输入商品名称"
              @keyup.enter="handleSearch"
            />
            <button @click="handleSearch">搜索</button>
          </div>
          <!-- 热门搜索 -->
          <div class="hot-search">
            <span class="hot-label">热门搜索：</span>
            <span v-for="tag in hotTags" :key="tag" class="hot-tag" @click="handleHotSearch(tag)">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 结果统计 -->
    <div class="result-info" v-if="keyword">
      <div class="result-info-content">
        <h2>
          关于 “<span class="highlight">{{ keyword }}</span
          >” 的搜索结果
        </h2>
        <span class="result-count">共找到 {{ filteredProducts.length }} 件相关商品</span>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="product-list">
      <!-- 加载骨架屏 -->
      <div v-if="loading" class="skeleton-grid">
        <div v-for="i in 10" :key="i" class="skeleton-card">
          <div class="skeleton-img"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else-if="filteredProducts.length === 0 && keyword" class="empty-state">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p>😔 没有找到相关商品</p>
        <span>试试其他关键词吧〜</span>
      </div>

      <!-- 商品卡片 -->
      <div
        v-else
        v-for="item in filteredProducts"
        :key="item.id"
        class="product-card"
        @click="goToDetail(item.id)"
      >
        <div class="img-wrapper">
          <img :src="item.image" :alt="item.name" />
          <div class="card-badge" v-if="item.hot">热卖</div>
        </div>
        <div class="card-body">
          <h3 class="name">{{ item.name }}</h3>
          <p class="desc">{{ item.desc }}</p>
          <div class="price-row">
            <span class="price">¥{{ item.price.toLocaleString() }}</span>
            <span class="sales">已售 {{ item.sales.toLocaleString() }}+</span>
          </div>
          <div class="rating" v-if="item.rating">
            <span class="stars">★★★★★</span>
            <span class="rating-count">{{ item.rating }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <transition name="fade">
      <div class="back-to-top" v-show="showBackTop" @click="scrollToTop">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const loading = ref(false)
const showBackTop = ref(false)

// 热门搜索标签
const hotTags = ['手机', '智能手表', '平板', '智能门锁', '扫地机器人']

// --- 模拟数据 (实际开发中请替换为 API 请求) ---
const generateMockData = () => {
  const categories = [
    { name: '小米15 Pro', desc: '徕卡光学镜头 / 骁龙8Gen4 / 2K超感屏', price: [5999, 6999, 7999] },
    { name: '小米手环9 Pro', desc: '血氧监测 / 14天续航 / 精准定位', price: [399, 449] },
    { name: '小米平板7 Pro', desc: '12.4英寸 / 120Hz高刷 / 8扬声器', price: [3499, 3999] },
    { name: '小米智能门锁 M30', desc: '3D人脸识别 / 指静脉解锁 / 智能猫眼', price: [2499, 3299] },
    { name: '小米扫地机器人 S4', desc: 'AI避障 / 6000Pa吸力 / 自动集尘', price: [2999, 3699] },
    { name: '小米空气净化器 5', desc: '除甲醛 / 除病菌 / 智能联动', price: [1299, 1699] },
    { name: '小米智能音箱 Pro', desc: 'HiFi音质 / 红外遥控 / 蓝牙Mesh', price: [299, 399] },
    { name: '小米路由器 AX9000', desc: '三频9000M / 电竞加速 / 5G网口', price: [1299, 1499] },
    { name: '小米无线充电宝', desc: '10000mAh / 50W快充 / 无线充', price: [199, 249] },
    { name: '小米智能摄像头 3', desc: '3K超清 / AI人形检测 / 双向通话', price: [299, 399] },
  ]

  const images = [
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/carousel/phone-15-pro.png',
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/product/watch-9.png',
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/product/pad-7.png',
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/product/lock-m30.png',
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/product/robot-s4.png',
  ]

  let data = []
  for (let i = 0; i < 50; i++) {
    const cat = categories[i % categories.length]
    const priceIdx = i % cat.price.length
    data.push({
      id: i + 1,
      name: `${cat.name}${Math.floor(i / categories.length) > 0 ? ` ${Math.floor(i / categories.length) + 1}` : ''}`,
      desc: cat.desc,
      price: cat.price[priceIdx],
      sales: Math.floor(Math.random() * 50000) + 100,
      rating: (4 + Math.random()).toFixed(1),
      hot: i < 5,
      image: images[i % images.length] || `https://picsum.photos/id/${60 + i}/200/200`,
    })
  }
  return data
}

const mockData = ref(generateMockData())

// 简单的本地过滤逻辑
const filteredProducts = computed(() => {
  if (!keyword.value) return mockData.value
  return mockData.value.filter(
    (item) => item.name.includes(keyword.value) || item.desc.includes(keyword.value),
  )
})

// 搜索处理
const handleSearch = () => {
  if (!keyword.value.trim()) return
  loading.value = true
  // 模拟异步搜索效果
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 路由跳转
const goToHome = () => {
  router.push('/')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToDetail = (id) => {
  router.push(`/product/detail/${id}`)
}

// 返回顶部逻辑
const handleScroll = () => {
  showBackTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.search-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

/* ========== 导航栏样式 ========== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-content {
  max-width: 1280px;
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
  color: #ff6700;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.logo span {
  background: linear-gradient(115deg, #ff6700, #ff8c42);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #e2e8f0;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 40px;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ff6700;
}

.nav-item svg {
  transition: transform 0.2s;
}

.nav-item:hover svg {
  transform: translateY(-1px);
}

/* ========== 主搜索区域 ========== */
.search-hero {
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
  padding: 60px 24px;
  margin-bottom: 32px;
}

.search-hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 16px;
  color: #94a3b8;
  margin-bottom: 36px;
}

.search-box-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 60px;
  padding: 4px 4px 4px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s;
}

.search-box:focus-within {
  box-shadow: 0 12px 40px rgba(255, 103, 0, 0.2);
}

.search-icon {
  color: #94a3b8;
  flex-shrink: 0;
}

.search-box input {
  flex: 1;
  padding: 16px 12px;
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
}

.search-box input::placeholder {
  color: #a0aec0;
}

.search-box button {
  background: linear-gradient(115deg, #ff6700, #ff8c42);
  border: none;
  padding: 12px 32px;
  border-radius: 48px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.search-box button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.4);
}

/* 热门搜索 */
.hot-search {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hot-label {
  color: #94a3b8;
  font-size: 13px;
}

.hot-tag {
  color: #cbd5e1;
  font-size: 13px;
  cursor: pointer;
  padding: 5px 12px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.2s;
}

.hot-tag:hover {
  background: rgba(255, 103, 0, 0.2);
  color: #ff8c42;
}

/* ========== 结果统计 ========== */
.result-info {
  max-width: 1280px;
  margin: 0 auto 28px auto;
  padding: 0 24px;
}

.result-info-content {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.result-info h2 {
  font-size: 18px;
  font-weight: 500;
  color: #334155;
}

.highlight {
  color: #ff6700;
  font-weight: 700;
}

.result-count {
  color: #64748b;
  font-size: 14px;
}

/* ========== 商品网格 (5列) ========== */
.product-list {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 48px 24px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
}

/* 商品卡片 */
.product-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 103, 0, 0.2);
}

.img-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  background: linear-gradient(145deg, #f9fafb, #f1f5f9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.img-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.product-card:hover .img-wrapper img {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(115deg, #ff6700, #ff8c42);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  z-index: 1;
}

.card-body {
  padding: 16px;
}

.name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.price {
  color: #ff6700;
  font-size: 18px;
  font-weight: 700;
}

.sales {
  color: #94a3b8;
  font-size: 11px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars {
  color: #fbbf24;
  font-size: 12px;
  letter-spacing: 2px;
}

.rating-count {
  color: #94a3b8;
  font-size: 11px;
}

/* 骨架屏 */
.skeleton-grid {
  display: contents;
}

.skeleton-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
}

.skeleton-img {
  width: 100%;
  height: 220px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: skeleton 1.5s infinite;
}

.skeleton-line {
  height: 14px;
  background: #e2e8f0;
  margin: 12px 16px;
  border-radius: 8px;
  animation: skeleton 1.5s infinite;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes skeleton {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 80px 20px;
  background: #ffffff;
  border-radius: 32px;
  margin-top: 20px;
}

.empty-state svg {
  color: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 18px;
  color: #475569;
  margin-bottom: 8px;
}

.empty-state span {
  font-size: 14px;
  color: #94a3b8;
}

/* 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 48px;
  height: 48px;
  background: linear-gradient(115deg, #ff6700, #ff8c42);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 103, 0, 0.4);
  transition: all 0.2s;
  z-index: 99;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 103, 0, 0.5);
}

.back-to-top svg {
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 1200px) {
  .product-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .nav-content {
    padding: 10px 16px;
  }

  .logo span {
    font-size: 16px;
  }

  .nav-links {
    gap: 16px;
  }

  .nav-item span {
    display: none;
  }

  .hero-title {
    font-size: 28px;
  }

  .search-hero {
    padding: 40px 16px;
  }

  .search-box {
    padding: 4px 4px 4px 16px;
  }

  .search-box button {
    padding: 10px 24px;
  }

  .product-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 0 16px 32px 16px;
  }

  .img-wrapper {
    height: 160px;
  }

  .result-info {
    padding: 0 16px;
  }

  .result-info-content {
    flex-direction: column;
    gap: 6px;
  }

  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .card-body {
    padding: 12px;
  }

  .name {
    font-size: 13px;
  }

  .price {
    font-size: 15px;
  }

  .hot-tag {
    font-size: 12px;
    padding: 4px 10px;
  }
}
</style>
