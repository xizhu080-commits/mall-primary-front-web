<template>
  <div class="shop-detail-page">
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
        <div class="nav-search">
          <input
            type="text"
            placeholder="搜索店内商品..."
            v-model="searchKeyword"
            @keyup.enter="searchProduct"
          />
          <button @click="searchProduct">
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
          </button>
        </div>
        <div class="nav-links">
          <div class="nav-item" @click="goToHome">首页</div>
          <div class="nav-item" @click="goToCart">购物车</div>
          <div class="nav-item" @click="goToProfile">我的</div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p>{{ error }}</p>
      <button class="retry-btn" @click="fetchShopData">重试</button>
    </div>

    <div v-else>
      <!-- 店铺头部（Hero） -->
      <div
        class="shop-hero"
        :style="{ backgroundImage: `url(${shopInfo.coverImage || defaultCover})` }"
      >
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <div class="shop-avatar">
            <img :src="shopInfo.logo || defaultLogo" :alt="shopInfo.shopName" />
            <div class="avatar-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div class="shop-info">
            <h1 class="shop-name">{{ shopInfo.shopName }}</h1>
            <div class="shop-badges">
              <span class="badge official">官方旗舰店</span>
              <span class="badge high-quality">品质认证</span>
              <span class="badge fast-delivery">极速发货</span>
            </div>
            <div class="shop-stats">
              <div class="stat">
                <span class="stat-value">{{ shopInfo.productCount }}</span>
                <span class="stat-label">全部商品</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">{{ shopInfo.followerCount }}</span>
                <span class="stat-label">店铺粉丝</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">≥{{ shopInfo.goodRate }}%</span>
                <span class="stat-label">好评率</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-value">{{ shopInfo.onTimeRate }}%</span>
                <span class="stat-label">准时发货</span>
              </div>
            </div>
            <div class="shop-actions">
              <button class="btn-follow" :class="{ followed: isFollowed }" @click="toggleFollow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {{ isFollowed ? '已关注' : '关注店铺' }}
              </button>
              <button class="btn-contact" @click="contactShop">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                联系客服
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="container main-content">
        <!-- 左侧边栏 -->
        <div class="sidebar">
          <!-- 优惠券卡片 -->
          <div class="card">
            <div class="card-title">
              <span class="title-icon">🎫</span>
              <span>店铺优惠券</span>
              <span class="more" @click="viewAllCoupons">查看全部 &gt;</span>
            </div>
            <div class="coupon-list">
              <div
                v-for="coupon in coupons.slice(0, 3)"
                :key="coupon.templateId"
                class="coupon-card"
                :class="{ disabled: !coupon.available }"
              >
                <div class="coupon-left">
                  <div class="coupon-price">
                    <template v-if="coupon.couponType === 0">
                      <span class="value">{{ coupon.discountRate * 10 }}</span>
                      <span class="currency">折</span>
                    </template>
                    <template v-else>
                      <span class="currency">¥</span>
                      <span class="value">{{ coupon.discountAmount }}</span>
                    </template>
                  </div>
                  <div class="coupon-divider"></div>
                </div>
                <div class="coupon-middle">
                  <div class="coupon-name">{{ coupon.couponName }}</div>
                  <div class="coupon-condition">
                    <template v-if="coupon.couponType === 0">
                      无门槛{{ coupon.discountRate * 10 }}折
                    </template>
                    <template v-else> 满{{ coupon.thresholdAmount }}元可用 </template>
                  </div>
                  <div class="coupon-date">有效期至 {{ formatDate(coupon.endTime) }}</div>
                  <div
                    v-if="coupon.getLimit > 0 && coupon.remainingTimes !== undefined"
                    class="coupon-limit"
                  >
                    限领{{ coupon.getLimit }}次 · 剩余{{ coupon.remainingTimes }}次
                  </div>
                </div>
                <div class="coupon-right">
                  <button
                    class="btn-get"
                    :class="{
                      'btn-disabled': !coupon.available,
                      'btn-received': coupon.buttonText === '已领取',
                    }"
                    :disabled="!coupon.available"
                    @click.stop="getCoupon(coupon)"
                  >
                    {{ coupon.buttonText }}
                  </button>
                </div>
              </div>
              <div v-if="coupons.length === 0" class="empty-coupon">
                <p>暂无优惠券</p>
              </div>
            </div>
          </div>

          <!-- 店铺信息卡片 -->
          <div class="card">
            <div class="card-title">
              <span class="title-icon">🏪</span>
              <span>店铺信息</span>
            </div>
            <div class="info-list">
              <div class="info-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>店铺编号：{{ shopInfo.shopId }}</span>
              </div>
              <div class="info-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>入驻时间：{{ formatDate(shopInfo.createTime) }}</span>
              </div>
              <div class="info-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>营业时间：09:00 - 22:00</span>
              </div>
            </div>
          </div>

          <!-- 服务保障卡片 -->
          <div class="card">
            <div class="card-title">
              <span class="title-icon">✅</span>
              <span>服务保障</span>
            </div>
            <div class="service-grid">
              <div class="service-item">
                <div class="service-icon">✓</div>
                <span>正品保证</span>
              </div>
              <div class="service-item">
                <div class="service-icon">↩️</div>
                <span>七天无理由</span>
              </div>
              <div class="service-item">
                <div class="service-icon">⚡</div>
                <span>极速退款</span>
              </div>
              <div class="service-item">
                <div class="service-icon">🚚</div>
                <span>24小时发货</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧商品区 -->
        <div class="product-section">
          <!-- 分类和排序 -->
          <div class="filter-bar">
            <div class="category-tabs">
              <button
                v-for="cat in categories"
                :key="cat.id"
                class="category-btn"
                :class="{ active: activeCategory === cat.id }"
                @click="switchCategory(cat.id)"
              >
                {{ cat.name }}
              </button>
            </div>
            <div class="sort-bar">
              <button
                class="sort-btn"
                :class="{ active: sortType === 'default' }"
                @click="sortType = 'default'"
              >
                综合
              </button>
              <button
                class="sort-btn"
                :class="{ active: sortType === 'sales' }"
                @click="sortType = 'sales'"
              >
                销量
              </button>
              <button
                class="sort-btn price-btn"
                :class="{ active: sortType === 'priceAsc' }"
                @click="sortType = 'priceAsc'"
              >
                价格
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>

          <!-- 商品网格 -->
          <div class="product-grid">
            <div
              v-for="product in paginatedProducts"
              :key="product.skuId"
              class="product-card"
              @click="goToProduct(product.spuId, product.skuId)"
            >
              <div class="product-image">
                <img :src="product.productUrl" :alt="product.productName" loading="lazy" />
                <div class="product-tags">
                  <span v-if="product.stock > 0 && product.stock < 50" class="tag hot"
                    >库存紧张</span
                  >
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ product.productName }}</h3>
                <p class="product-desc">{{ formatSpecData(product.specData) }}</p>
                <div class="product-price">
                  <span class="current">¥{{ formatPrice(product.price) }}</span>
                </div>
                <div class="product-footer">
                  <span class="sales">库存 {{ product.stock }}件</span>
                  <button class="cart-btn" @click.stop="addToCart(product)">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div v-if="filteredProducts.length === 0" class="empty-state">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <p>暂无商品</p>
            </div>
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="pagination">
            <button class="page-btn prev" :disabled="currentPage === 1" @click="currentPage--">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div class="page-numbers">
              <button
                v-for="page in visiblePages"
                :key="page"
                class="page-num"
                :class="{ active: currentPage === page }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>
            <button
              class="page-btn next"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <transition name="fade">
      <div class="back-to-top" @click="scrollToTop" v-show="showBackTop">
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

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getShopDetail } from '@/api/shop'
import { receiveCoupon } from '@/api/coupon'

const router = useRouter()
const route = useRoute()

const shopId = ref(route.params.shopId || route.query.shopId || '1')
const loading = ref(true)
const error = ref('')
const searchKeyword = ref('')
const activeCategory = ref('all')
const sortType = ref('default')
const currentPage = ref(1)
const pageSize = ref(12)
const isFollowed = ref(false)
const showBackTop = ref(false)

const defaultCover = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200'
const defaultLogo =
  'https://img30.360buyimg.com/popshop/jfs/t1/337076/7/7305/3729/68baa1d4Fdbccfdf8/af03259a2290be2e.png'

// 店铺信息
const shopInfo = ref({
  shopId: '',
  merchantId: '',
  shopName: '',
  logo: '',
  coverImage: '',
  productCount: 0,
  followerCount: '0',
  goodRate: 99,
  onTimeRate: 98,
  createTime: '',
  workStatus: 1,
})

// 优惠券列表
const coupons = ref([])

// 商品列表
const products = ref([])

// 分类列表（从商品数据中动态生成）
const categories = ref([{ id: 'all', name: '全部' }])

// 获取分类列表
const updateCategories = () => {
  const categoryMap = new Map()
  products.value.forEach((product) => {
    if (product.categoryId && product.categoryName && !categoryMap.has(product.categoryId)) {
      categoryMap.set(product.categoryId, {
        id: product.categoryId,
        name: product.categoryName,
      })
    }
  })
  categories.value = [{ id: 'all', name: '全部' }, ...Array.from(categoryMap.values())]
}

// 筛选与排序
const filteredProducts = computed(() => {
  let result = [...products.value]

  // 分类筛选
  if (activeCategory.value !== 'all') {
    result = result.filter((p) => p.categoryId === activeCategory.value)
  }

  // 搜索筛选
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.toLowerCase()
    result = result.filter((p) => p.productName.toLowerCase().includes(kw))
  }

  // 排序
  if (sortType.value === 'sales') {
    result.sort((a, b) => b.stock - a.stock)
  } else if (sortType.value === 'priceAsc') {
    result.sort((a, b) => a.price - b.price)
  }

  return result
})

// 分页
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize.value))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredProducts.value.slice(start, start + pageSize.value)
})

// 分页显示
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

// 筛选重置页码
watch([activeCategory, searchKeyword, sortType], () => {
  currentPage.value = 1
})

// 滚动监听
const handleScroll = () => {
  showBackTop.value = window.scrollY > 300
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 工具函数
const formatPrice = (price) => {
  if (price >= 10000) {
    return (price / 10000).toFixed(2) + '万'
  }
  return price.toFixed(2)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.split(' ')[0]
}

const formatSpecData = (specData) => {
  try {
    const spec = JSON.parse(specData)
    return Object.values(spec).join(' | ')
  } catch {
    return ''
  }
}

// 店铺操作
const toggleFollow = () => {
  isFollowed.value = !isFollowed.value
  showMessage(isFollowed.value ? '关注成功' : '已取消关注')
}

const contactShop = () => {
  showMessage('客服功能开发中')
}

// 领取优惠券
const getCoupon = async (coupon) => {
  // 检查是否可领取
  if (!coupon.available) {
    if (coupon.buttonText === '已领取') {
      showMessage('您已领取过该优惠券', true)
    } else if (coupon.remainCount <= 0) {
      showMessage('优惠券已被领完', true)
    }
    return
  }

  // 保存原始按钮文字
  const originalText = coupon.buttonText
  coupon.buttonText = '领取中...'

  try {
    const res = await receiveCoupon(coupon.templateId)

    if (res.code === 200) {
      // 根据后端返回的 data 判断
      const data = res.data

      if (data === '用户已领取过优惠券') {
        // 用户已经领取过
        coupon.available = false
        coupon.buttonText = '已领取'
        coupon.isReceived = true
        showMessage('您已领取过该优惠券', true)
      } else if (typeof data === 'string' && data.includes('剩余领取次数')) {
        // 领取成功，还有剩余次数
        const match = data.match(/\d+/)
        const remaining = match ? parseInt(match[0]) : 0

        coupon.remainingTimes = remaining
        coupon.userReceiveCount = coupon.getLimit - remaining
        coupon.available = remaining > 0 && coupon.remainCount > 0
        coupon.buttonText = '立即领取'

        showMessage(`领取成功！${data}`)

        // 减少库存
        if (coupon.remainCount > 0) {
          coupon.remainCount--
        }
      } else if (data === '已领取！' || (typeof data === 'string' && data.includes('已领取'))) {
        // 已达到领取上限
        coupon.available = false
        coupon.buttonText = '已领取'
        coupon.isReceived = true
        showMessage('您已达到领取上限', true)
      } else {
        // 领取成功
        coupon.remainingTimes = Math.max(0, (coupon.remainingTimes || coupon.getLimit) - 1)
        coupon.userReceiveCount = coupon.getLimit - coupon.remainingTimes
        coupon.available = coupon.remainingTimes > 0 && coupon.remainCount > 0

        if (coupon.remainingTimes === 0) {
          coupon.buttonText = '已领取'
        } else {
          coupon.buttonText = '立即领取'
        }

        showMessage(data || `成功领取 ${coupon.couponName}`)

        // 减少库存
        if (coupon.remainCount > 0) {
          coupon.remainCount--
        }
      }
    } else {
      // 领取失败
      coupon.buttonText = originalText
      showMessage(res.msg || '领取失败，请重试', true)
    }
  } catch (err) {
    console.error('getCoupon error:', err)
    coupon.buttonText = originalText
    showMessage('领取失败，请稍后重试', true)
  }
}

const viewAllCoupons = () => {
  showMessage(`共有 ${coupons.value.length} 张优惠券可用`)
}

// 商品操作
const goToProduct = (spuId, skuId) => {
  router.push(`/product/detail/${spuId}?skuId=${skuId}`)
}

const addToCart = (product) => {
  showMessage(`已加入购物车：${product.productName}`)
}

const searchProduct = () => {
  currentPage.value = 1
}

// 路由跳转
const goToHome = () => router.push('/')
const goToCart = () => router.push('/cart')
const goToProfile = () => {
  const userInfo = localStorage.getItem('mall-user_merchant-info')
  if (userInfo) {
    try {
      const info = JSON.parse(userInfo)
      router.push(`/user/detail/${info.userId}`)
    } catch {
      router.push('/profile')
    }
  } else {
    router.push('/login')
  }
}

const switchCategory = (id) => {
  activeCategory.value = id
  currentPage.value = 1
}

// 消息提示
const toast = ref({ visible: false, message: '', isError: false, timer: null })
const showMessage = (message, isError = false) => {
  if (toast.value.timer) clearTimeout(toast.value.timer)
  toast.value.message = message
  toast.value.isError = isError
  toast.value.visible = true
  toast.value.timer = setTimeout(() => {
    toast.value.visible = false
  }, 2200)
}

// 初始化优惠券按钮文字
const initCouponButtonText = (coupon) => {
  // 如果已经领取过
  if (coupon.isReceived) {
    return '已领取'
  }
  // 如果库存不足
  if (!coupon.available && coupon.remainCount <= 0) {
    return '已领完'
  }
  return '立即领取'
}

// 获取数据
const fetchShopData = async () => {
  loading.value = true
  error.value = ''

  try {
    const res = await getShopDetail(shopId.value)

    if (res.code === 200 && res.data) {
      const data = res.data

      // 设置店铺信息
      shopInfo.value = {
        shopId: data.shopId,
        merchantId: data.merchantId,
        shopName: data.shopName,
        logo: data.shopLogo,
        coverImage: data.shopLogo,
        productCount: data.shopProductList?.length || 0,
        followerCount: '125.8w',
        goodRate: 98,
        onTimeRate: 99,
        createTime: data.createTime,
        workStatus: data.workStatus,
      }

      // 设置优惠券
      coupons.value = (data.shopCouponList || []).map((coupon) => {
        // 从后端获取用户已领取次数，如果没有则默认为0
        const userReceiveCount = coupon.userReceiveCount || 0
        const remainingCount = coupon.getLimit - userReceiveCount
        const isReceived = remainingCount === 0
        const available = coupon.remainCount > 0 && coupon.status === 0 && remainingCount > 0

        return {
          ...coupon,
          userReceiveCount: userReceiveCount,
          remainingTimes: remainingCount,
          available: available,
          isReceived: isReceived,
          buttonText: initCouponButtonText({
            available,
            isReceived,
            remainCount: coupon.remainCount,
          }),
        }
      })

      // 设置商品列表
      products.value = data.shopProductList || []

      // 更新分类
      updateCategories()
    } else {
      error.value = res.msg || '获取店铺信息失败'
    }
  } catch (err) {
    console.error('fetchShopData error:', err)
    error.value = '网络错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchShopData()
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

.shop-detail-page {
  min-height: 100vh;
  background: #f7f8fa;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #1d2129;
}

/* ========== 导航栏 ========== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}
.logo:hover {
  transform: translateY(-1px);
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
  background: linear-gradient(135deg, #ff6700, #ff9500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-search {
  display: flex;
  align-items: center;
  background: #f2f3f5;
  border-radius: 40px;
  padding: 9px 18px;
  width: 320px;
  transition: all 0.25s ease;
}
.nav-search:focus-within {
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(255, 103, 0, 0.2);
}
.nav-search input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #4e5969;
}
.nav-search input::placeholder {
  color: #c9cdd4;
}
.nav-search button {
  background: none;
  border: none;
  cursor: pointer;
  color: #86909c;
  transition: color 0.2s;
}
.nav-search button:hover {
  color: #ff6700;
}

.nav-links {
  display: flex;
  gap: 28px;
}
.nav-item {
  cursor: pointer;
  color: #4e5969;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
}
.nav-item::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #ff6700;
  transition: width 0.2s;
}
.nav-item:hover {
  color: #ff6700;
}
.nav-item:hover::after {
  width: 80%;
}

/* ========== 加载状态 ========== */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  color: #86909c;
}
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f2f3f5;
  border-top-color: #ff6700;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.loading-container p {
  font-size: 14px;
}

/* ========== 错误状态 ========== */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  text-align: center;
}

.error-container svg {
  stroke: #ff6700;
  margin-bottom: 20px;
}

.error-container p {
  color: #86909c;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 10px 30px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

/* ========== 店铺头部 ========== */
.shop-hero {
  position: relative;
  height: 380px;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.3) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  gap: 36px;
  padding-top: 200px;
}

.shop-avatar {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 24px;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  background: white;
}
.shop-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  background: #ff6700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}
.avatar-badge svg {
  stroke: white;
  width: 14px;
  height: 14px;
}

.shop-info {
  flex: 1;
}
.shop-name {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 14px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
}

.shop-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
}
.badge {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(10px);
}
.badge.official {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}
.badge.high-quality {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}
.badge.fast-delivery {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.shop-stats {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 24px;
}
.stat {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
}
.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}
.stat-divider {
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
}

.shop-actions {
  display: flex;
  gap: 14px;
}
.btn-follow,
.btn-contact {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  backdrop-filter: blur(10px);
}
.btn-follow {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}
.btn-follow.followed {
  background: #ff6700;
  color: white;
}
.btn-contact {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}
.btn-follow:hover,
.btn-contact:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* ========== 主内容区 ========== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.main-content {
  margin-top: -60px;
  display: grid;
  grid-template-columns: 330px 1fr;
  gap: 24px;
  position: relative;
  z-index: 3;
}

/* ========== 侧边栏卡片 ========== */
.card {
  background: white;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.25s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
}
.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
.card-title {
  padding: 20px;
  border-bottom: 1px solid #f2f3f5;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1d2129;
  font-size: 16px;
}
.title-icon {
  font-size: 18px;
}
.more {
  margin-left: auto;
  font-size: 13px;
  color: #ff6700;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s;
}
.more:hover {
  color: #ff8533;
}

/* 优惠券 */
.coupon-list {
  padding: 0 16px 16px;
}
.coupon-card {
  display: flex;
  background: linear-gradient(135deg, #fff8ef, #fff3e6);
  border-radius: 16px;
  margin-top: 12px;
  overflow: hidden;
  transition: transform 0.25s ease;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.06);
}
.coupon-card:hover {
  transform: translateY(-3px);
}
.coupon-card.disabled {
  opacity: 0.6;
}
.coupon-left {
  background: #ff6700;
  padding: 18px 12px;
  text-align: center;
  color: white;
  min-width: 95px;
}
.coupon-price .currency {
  font-size: 14px;
}
.coupon-price .value {
  font-size: 30px;
  font-weight: 700;
}
.coupon-divider {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  margin: 8px 0;
}
.coupon-middle {
  flex: 1;
  padding: 16px;
}
.coupon-name {
  font-size: 14px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 4px;
}
.coupon-condition {
  font-size: 12px;
  color: #86909c;
  margin-bottom: 4px;
}
.coupon-date {
  font-size: 11px;
  color: #c9cdd4;
}
.coupon-limit {
  font-size: 10px;
  color: #ff6700;
  margin-top: 4px;
  background: rgba(255, 103, 0, 0.1);
  display: inline-block;
  padding: 2px 6px;
  border-radius: 10px;
}
.coupon-right {
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.btn-get {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 7px 18px;
  border-radius: 30px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-get.btn-received {
  background: #c9cdd4;
  cursor: not-allowed;
}
.btn-get.btn-disabled {
  background: #c9cdd4;
  cursor: not-allowed;
  opacity: 0.6;
}
.btn-get:disabled {
  background: #c9cdd4;
  cursor: not-allowed;
  opacity: 0.6;
}
.empty-coupon {
  padding: 30px 0;
  text-align: center;
  color: #c9cdd4;
  font-size: 13px;
}

/* 店铺信息 */
.info-list {
  padding: 16px 20px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px dashed #f2f3f5;
  font-size: 14px;
  color: #4e5969;
}
.info-item:last-child {
  border-bottom: none;
}
.info-item svg {
  stroke: #ff6700;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

/* 服务保障 */
.service-grid {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}
.service-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #4e5969;
}
.service-icon {
  width: 32px;
  height: 32px;
  background: #fff2e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ff6700;
}

/* ========== 筛选栏 ========== */
.filter-bar {
  background: white;
  border-radius: 20px;
  padding: 16px 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.category-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.category-btn {
  padding: 8px 18px;
  background: #f7f8fa;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: #4e5969;
  font-weight: 500;
}
.category-btn:hover {
  color: #ff6700;
  background: #fff2e8;
}
.category-btn.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.2);
}

.sort-bar {
  display: flex;
  gap: 20px;
}
.sort-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #86909c;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
  font-weight: 500;
}
.sort-btn:hover,
.sort-btn.active {
  color: #ff6700;
}

/* ========== 商品网格 ========== */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #fafbfc;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .product-image img {
  transform: scale(1.06);
}
.product-tags {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  gap: 6px;
}
.tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.tag.hot {
  background: #f53f3f;
  color: white;
}
.tag.new {
  background: #00b42a;
  color: white;
}

.product-info {
  padding: 18px;
}
.product-title {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-desc {
  font-size: 13px;
  color: #86909c;
  margin-bottom: 12px;
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}
.product-price .current {
  font-size: 20px;
  font-weight: 700;
  color: #ff6700;
}
.product-price .original {
  font-size: 13px;
  color: #c9cdd4;
  text-decoration: line-through;
}
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sales {
  font-size: 12px;
  color: #86909c;
}
.cart-btn {
  width: 34px;
  height: 34px;
  background: #fff2e8;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}
.cart-btn svg {
  stroke: #ff6700;
  width: 16px;
  height: 16px;
  transition: stroke 0.2s;
}
.cart-btn:hover {
  background: #ff6700;
}
.cart-btn:hover svg {
  stroke: white;
}

.empty-state {
  grid-column: span 3;
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  color: #c9cdd4;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}
.empty-state svg {
  margin-bottom: 16px;
  stroke: #e5e6eb;
  width: 80px;
  height: 80px;
}
.empty-state p {
  font-size: 14px;
}

/* ========== 分页 ========== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  padding-bottom: 40px;
}
.page-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e6eb;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.page-btn:hover:not(:disabled) {
  border-color: #ff6700;
  color: #ff6700;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.page-numbers {
  display: flex;
  gap: 8px;
}
.page-num {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e6eb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
.page-num:hover {
  border-color: #ff6700;
  color: #ff6700;
}
.page-num.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-color: #ff6700;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.2);
}

/* ========== 返回顶部 ========== */
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(255, 103, 0, 0.4);
  transition: all 0.25s ease;
  z-index: 99;
  color: white;
}
.back-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(255, 103, 0, 0.5);
}

/* ========== Toast ========== */
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(15px);
  padding: 14px 28px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
.toast-error {
  background: rgba(245, 38, 38, 0.9);
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .sidebar {
    grid-template-columns: 1fr;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 120px;
  }
  .shop-stats {
    justify-content: center;
  }
  .shop-actions {
    justify-content: center;
  }
  .shop-name {
    font-size: 26px;
  }
  .nav-search {
    display: none;
  }
  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
  .shop-hero {
    height: 420px;
  }
}
@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .shop-stats {
    gap: 16px;
  }
  .stat-value {
    font-size: 20px;
  }
}
</style>
