<template>
  <div class="search-page">
    <!-- 顶部导航栏 - 与商城风格一致 -->
    <header class="header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo" @click="goHome">
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

        <!-- 搜索框 -->
        <div class="search-wrapper">
          <div class="search-box">
            <svg
              class="search-icon"
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
              v-model="searchKeyword"
              placeholder="搜索商品..."
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">搜索</button>
          </div>
          <!-- 热门搜索 -->
          <div class="hot-searches">
            <span class="hot-label">热门：</span>
            <span
              v-for="kw in hotKeywords"
              :key="kw"
              class="hot-tag"
              @click="applyHotKeyword(kw)"
              >{{ kw }}</span
            >
          </div>
        </div>

        <!-- 右侧功能 -->
        <div class="header-actions">
          <div class="action-icon" @click="goToCart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span class="badge" v-if="cartCount > 0">{{ cartCount > 99 ? '99+' : cartCount }}</span>
          </div>
          <div class="user-avatar" @click="goToUserCenter">
            <span>我的</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="container">
        <a @click="goHome">首页</a>
        <span class="separator">/</span>
        <span class="current">搜索：{{ currentKeyword || searchKeyword || '全部商品' }}</span>
        <span v-if="totalResults > 0" class="result-count">共 {{ totalResults }} 件商品</span>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content container">
      <!-- 左侧筛选栏 -->
      <aside class="filter-sidebar">
        <!-- 分类筛选 -->
        <div class="filter-section">
          <h3 class="filter-title">商品分类</h3>
          <div class="category-list">
            <div
              v-for="cat in categories"
              :key="cat.id"
              class="category-item"
              :class="{ active: selectedCategory === cat.id }"
              @click="selectCategory(cat.id)"
            >
              {{ cat.name }}
              <span class="count">({{ cat.count }})</span>
            </div>
          </div>
        </div>

        <!-- 价格区间 -->
        <div class="filter-section">
          <h3 class="filter-title">价格区间</h3>
          <div class="price-range">
            <div
              class="price-item"
              v-for="range in priceRanges"
              :key="range.label"
              :class="{ active: selectedPriceRange === range.value }"
              @click="selectPriceRange(range.value)"
            >
              {{ range.label }}
            </div>
            <div class="custom-price">
              <input type="number" v-model="customMin" placeholder="最低价" />
              <span>-</span>
              <input type="number" v-model="customMax" placeholder="最高价" />
              <button @click="applyCustomPrice">确定</button>
            </div>
          </div>
        </div>

        <!-- 品牌筛选 -->
        <div class="filter-section">
          <h3 class="filter-title">品牌</h3>
          <div class="brand-list">
            <div
              v-for="brand in brands"
              :key="brand.id"
              class="brand-item"
              :class="{ active: selectedBrand === brand.id }"
              @click="selectBrand(brand.id)"
            >
              {{ brand.name }}
            </div>
          </div>
        </div>

        <!-- 商品状态 -->
        <div class="filter-section">
          <h3 class="filter-title">商品状态</h3>
          <div class="status-list">
            <label class="status-item">
              <input type="checkbox" v-model="filterInStock" /> 仅显示有货
            </label>
            <label class="status-item">
              <input type="checkbox" v-model="filterOnSale" /> 仅显示促销商品
            </label>
          </div>
        </div>

        <!-- 重置筛选 -->
        <button class="reset-btn" @click="resetFilters">重置筛选</button>
      </aside>

      <!-- 右侧商品列表 -->
      <div class="product-section">
        <!-- 排序栏 -->
        <div class="sort-bar">
          <div class="sort-left">
            <span class="sort-label">排序：</span>
            <div class="sort-options">
              <span
                class="sort-item"
                :class="{ active: sortType === 'default' }"
                @click="setSort('default')"
                >综合</span
              >
              <span
                class="sort-item"
                :class="{ active: sortType === 'sales' }"
                @click="setSort('sales')"
                >销量</span
              >
              <span
                class="sort-item price-sort"
                :class="{ active: sortType === 'price' }"
                @click="togglePriceSort"
              >
                价格
                <span class="sort-arrow">
                  <svg
                    :class="{ up: priceSortOrder === 'asc', down: priceSortOrder === 'desc' }"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 5v14M7 10l5-5 5 5M7 14l5 5 5-5"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                </span>
              </span>
              <span
                class="sort-item"
                :class="{ active: sortType === 'new' }"
                @click="setSort('new')"
                >新品</span
              >
            </div>
          </div>
          <div class="sort-right">
            <span
              class="view-mode"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </span>
            <span
              class="view-mode"
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </span>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>正在搜索商品...</p>
        </div>

        <!-- 商品展示 - 网格视图 -->
        <div v-else-if="viewMode === 'grid'" class="product-grid">
          <div
            v-for="product in paginatedProducts"
            :key="product.spuId"
            class="product-card"
            @click="goToDetail(product.spuId)"
          >
            <div class="product-image">
              <img :src="product.productUrl" :alt="product.productName" />
              <span v-if="product.isNew" class="badge-new">新品</span>
              <span v-if="product.discount" class="badge-discount">{{ product.discount }}折</span>
              <span v-if="!product.inStock" class="badge-soldout">售罄</span>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.productName }}</h3>
              <p class="product-desc">{{ product.description || product.productName }}</p>
              <div class="product-price">
                <span class="current-price">¥{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice" class="original-price"
                  >¥{{ formatPrice(product.originalPrice) }}</span
                >
              </div>
              <div class="product-meta">
                <span class="sales">月销 {{ formatNumber(product.sales || 0) }}+</span>
                <span class="rating">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                  {{ product.rating || 4.8 }}
                </span>
              </div>
              <button class="add-cart-btn" @click.stop="addToCart(product)">加入购物车</button>
            </div>
          </div>
        </div>

        <!-- 商品展示 - 列表视图 -->
        <div v-else class="product-list">
          <div
            v-for="product in paginatedProducts"
            :key="product.spuId"
            class="product-list-item"
            @click="goToDetail(product.spuId)"
          >
            <div class="list-image">
              <img :src="product.productUrl" :alt="product.productName" />
              <span v-if="!product.inStock" class="badge-soldout">售罄</span>
            </div>
            <div class="list-info">
              <h3 class="list-name">{{ product.productName }}</h3>
              <p class="list-desc">{{ product.description || product.productName }}</p>
              <div class="list-price">
                <span class="current-price">¥{{ formatPrice(product.price) }}</span>
                <span v-if="product.originalPrice" class="original-price"
                  >¥{{ formatPrice(product.originalPrice) }}</span
                >
              </div>
              <div class="list-meta">
                <span>月销 {{ formatNumber(product.sales || 0) }}+</span>
                <span>评分 {{ product.rating || 4.8 }}</span>
                <span :class="{ 'out-of-stock': !product.inStock }">{{
                  product.inStock !== false ? '有货' : '缺货'
                }}</span>
              </div>
            </div>
            <div class="list-action">
              <button
                class="cart-btn"
                @click.stop="addToCart(product)"
                :disabled="product.inStock === false"
              >
                加入购物车
              </button>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="totalPages > 1 && !loading">
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
          <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <!-- 空状态 -->
        <div v-if="!loading && filteredProducts.length === 0" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <p>没有找到相关商品</p>
          <span>试试其他关键词或浏览分类</span>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <div v-show="showBackTop" class="back-to-top" @click="scrollToTop">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15" />
      </svg>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchProducts } from '@/api/home/home'

const router = useRouter()
const route = useRoute()

// ========== 响应式数据 ==========
const searchKeyword = ref('')
const currentKeyword = ref('')
const sortType = ref('default')
const priceSortOrder = ref('asc')
const viewMode = ref('grid')
const currentPage = ref(1)
const pageSize = 12

// 商品数据
const allProducts = ref([])
const loading = ref(false)

// 筛选条件
const selectedCategory = ref(null)
const selectedPriceRange = ref(null)
const selectedBrand = ref(null)
const filterInStock = ref(false)
const filterOnSale = ref(false)
const customMin = ref('')
const customMax = ref('')

// UI 状态
const showBackTop = ref(false)

// Toast
const toast = ref({ visible: false, message: '', isError: false, timer: null })
const showMessage = (message, isError = false) => {
  if (toast.value.timer) clearTimeout(toast.value.timer)
  toast.value.message = message
  toast.value.isError = isError
  toast.value.visible = true
  toast.value.timer = setTimeout(() => {
    toast.value.visible = false
  }, 2000)
}

// 购物车数量
const cartCount = ref(0)

// 分类数据（用于前端筛选）
const categories = ref([
  { id: 1, name: '手机通讯', count: 0 },
  { id: 2, name: '智能穿戴', count: 0 },
  { id: 3, name: '智能家居', count: 0 },
  { id: 4, name: '电脑办公', count: 0 },
  { id: 5, name: '配件周边', count: 0 },
])

// 品牌数据
const brands = ref([
  { id: 1, name: '小米/MI' },
  { id: 2, name: '红米/Redmi' },
  { id: 3, name: '米家' },
])

// 价格区间
const priceRanges = ref([
  { label: '100元以下', value: '0-100' },
  { label: '100-500元', value: '100-500' },
  { label: '500-1000元', value: '500-1000' },
  { label: '1000-2000元', value: '1000-2000' },
  { label: '2000元以上', value: '2000-' },
])

// 热门搜索关键词
const hotKeywords = ref(['手机', '智能手表', '平板', '耳机', '电视', '扫地机器人'])

// ========== 计算属性 ==========

// 更新分类计数（根据当前商品列表）
const updateCategoryCounts = () => {
  categories.value.forEach((cat) => {
    cat.count = allProducts.value.filter((p) => p.category === cat.id).length
  })
}

// 完整筛选逻辑
const filteredProducts = computed(() => {
  let products = [...allProducts.value]

  // 分类筛选
  if (selectedCategory.value) {
    products = products.filter((p) => p.category === selectedCategory.value)
  }

  // 品牌筛选
  if (selectedBrand.value) {
    products = products.filter((p) => p.brand === selectedBrand.value)
  }

  // 价格区间筛选
  if (selectedPriceRange.value) {
    const [min, max] = selectedPriceRange.value.split('-')
    if (max === '') {
      products = products.filter((p) => p.price >= parseInt(min))
    } else {
      products = products.filter((p) => p.price >= parseInt(min) && p.price <= parseInt(max))
    }
  }

  // 自定义价格筛选
  if (customMin.value || customMax.value) {
    const min = parseFloat(customMin.value) || 0
    const max = parseFloat(customMax.value) || Infinity
    products = products.filter((p) => p.price >= min && p.price <= max)
  }

  // 有货筛选
  if (filterInStock.value) {
    products = products.filter((p) => p.inStock !== false)
  }

  // 促销筛选
  if (filterOnSale.value) {
    products = products.filter((p) => p.isOnSale)
  }

  // 排序
  if (sortType.value === 'sales') {
    products.sort((a, b) => (b.sales || 0) - (a.sales || 0))
  } else if (sortType.value === 'price') {
    products.sort((a, b) =>
      priceSortOrder.value === 'asc' ? a.price - b.price : b.price - a.price,
    )
  } else if (sortType.value === 'new') {
    products.sort((a, b) => new Date(b.createTime || 0) - new Date(a.createTime || 0))
  }

  return products
})

// 总结果数
const totalResults = computed(() => filteredProducts.value.length)

// 分页
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

// 可见页码
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  let start = Math.max(1, currentPage.value - 2)
  let end = Math.min(total, start + 4)
  if (end - start < 4) start = Math.max(1, end - 4)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

// ========== 方法 ==========

// 格式化价格
const formatPrice = (price) => {
  if (!price && price !== 0) return '0.00'
  return price.toLocaleString('zh-CN')
}

// 格式化数字
const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

// 更新URL中的搜索关键词
const updateUrlKeyword = (keyword) => {
  router.replace({
    path: route.path,
    query: { q: keyword },
  })
}

// 执行搜索（调用API）
const performSearch = async (keyword) => {
  if (!keyword || !keyword.trim()) {
    allProducts.value = []
    currentKeyword.value = ''
    return
  }

  loading.value = true
  try {
    const res = await searchProducts(keyword.trim())
    if (res.code === 200 && res.data) {
      // 将API返回的数据转换为组件使用的格式
      const productList = res.data.list || []
      allProducts.value = productList.map((item) => ({
        spuId: item.spuId,
        productName: item.productName,
        productUrl: item.productUrl || 'https://picsum.photos/400/400?random=1',
        price: item.price || 0,
        description: item.productName,
        originalPrice: null,
        sales: Math.floor(Math.random() * 10000),
        rating: (Math.random() * 0.5 + 4.5).toFixed(1),
        inStock: true,
        isNew: Math.random() > 0.7,
        discount: null,
        isOnSale: Math.random() > 0.8,
        createTime: new Date().toISOString(),
        category: Math.floor(Math.random() * 5) + 1,
        brand: 1,
      }))
      currentKeyword.value = keyword.trim()
      currentPage.value = 1
      updateCategoryCounts()
    } else {
      showMessage(res.msg || '搜索失败', true)
      allProducts.value = []
    }
  } catch (error) {
    console.error('搜索失败:', error)
    showMessage('网络错误，请稍后重试', true)
    allProducts.value = []
  } finally {
    loading.value = false
  }
}

// 搜索处理（用户主动触发）
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim()
    updateUrlKeyword(keyword)
    performSearch(keyword)
  } else {
    // 如果搜索框为空，清空结果
    allProducts.value = []
    currentKeyword.value = ''
    updateUrlKeyword('')
  }
}

// 应用热门关键词
const applyHotKeyword = (kw) => {
  searchKeyword.value = kw
  handleSearch()
}

// 筛选方法
const selectCategory = (id) => {
  selectedCategory.value = selectedCategory.value === id ? null : id
  currentPage.value = 1
}

const selectBrand = (id) => {
  selectedBrand.value = selectedBrand.value === id ? null : id
  currentPage.value = 1
}

const selectPriceRange = (value) => {
  if (selectedPriceRange.value === value) {
    selectedPriceRange.value = null
  } else {
    selectedPriceRange.value = value
    customMin.value = ''
    customMax.value = ''
  }
  currentPage.value = 1
}

const applyCustomPrice = () => {
  if (customMin.value || customMax.value) {
    selectedPriceRange.value = null
    currentPage.value = 1
  }
}

// 重置筛选
const resetFilters = () => {
  selectedCategory.value = null
  selectedBrand.value = null
  selectedPriceRange.value = null
  filterInStock.value = false
  filterOnSale.value = false
  customMin.value = ''
  customMax.value = ''
  currentPage.value = 1
}

// 排序方法
const setSort = (type) => {
  sortType.value = type
  currentPage.value = 1
}

const togglePriceSort = () => {
  if (sortType.value === 'price') {
    priceSortOrder.value = priceSortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortType.value = 'price'
    priceSortOrder.value = 'asc'
  }
  currentPage.value = 1
}

// 加入购物车
const addToCart = (product) => {
  if (product.inStock === false) {
    showMessage('该商品已售罄', true)
    return
  }
  // 获取现有购物车
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const existing = cart.find((item) => item.spuId === product.spuId)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({
      spuId: product.spuId,
      productName: product.productName,
      productUrl: product.productUrl,
      price: product.price,
      quantity: 1,
    })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  cartCount.value = cart.reduce((sum, item) => sum + item.quantity, 0)
  showMessage('已添加到购物车')
}

// 导航方法
const goHome = () => router.push('/')
const goToDetail = (spuId) => router.push(`/product/detail/${spuId}`)
const goToCart = () => router.push('/cart')
const goToUserCenter = () => {
  const userInfo = localStorage.getItem('mall-user_merchant-info')
  const info = JSON.parse(userInfo)
  if (!info) {
    if (info.identityType == '用户') {
      router.push(`/user/detail/${info.userId}`)
    } else if (info.identityType == '商家') {
      router.push(`/merchant/detail/${info.merchantId}`)
    }
  } else {
    router.push('/login')
  }
}

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听滚动显示回到顶部按钮
const handleScroll = () => {
  showBackTop.value = window.scrollY > 300
}

// 读取购物车数量
const loadCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cartCount.value = cart.reduce((sum, item) => sum + item.quantity, 0)
}

// 监听路由参数变化（当URL中的q参数改变时自动搜索）
watch(
  () => route.query.q,
  (newQ) => {
    if (newQ !== undefined) {
      const keywordFromUrl = newQ || ''
      searchKeyword.value = keywordFromUrl
      if (keywordFromUrl) {
        performSearch(keywordFromUrl)
      } else {
        allProducts.value = []
        currentKeyword.value = ''
      }
    }
  },
  { immediate: true },
)

// 监听页面变化滚动到顶部
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// 生命周期
onMounted(() => {
  loadCartCount()
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

.search-page {
  min-height: 100vh;
  background: #f5f7fa;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}

/* 头部样式 */
.header {
  background: white;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-shrink: 0;
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

/* 搜索框 */
.search-wrapper {
  flex: 1;
  max-width: 500px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 48px;
  padding: 4px 4px 4px 20px;
  border: 1px solid #e8ecf0;
  transition: all 0.2s;
}

.search-box:focus-within {
  background: white;
  border-color: #ff6700;
  box-shadow: 0 0 0 3px rgba(255, 103, 0, 0.1);
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #94a3b8;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 12px;
  font-size: 14px;
  outline: none;
}

.search-btn {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 8px 24px;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn:hover {
  transform: scale(0.98);
}

.hot-searches {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  font-size: 12px;
}

.hot-label {
  color: #94a3b8;
}

.hot-tag {
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
}

.hot-tag:hover {
  color: #ff6700;
}

/* 头部右侧 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.action-icon {
  position: relative;
  cursor: pointer;
  color: #5a6e8a;
  transition: color 0.2s;
}

.action-icon:hover {
  color: #ff6700;
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
  min-width: 18px;
  text-align: center;
}

.user-avatar {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
}

/* 面包屑 */
.breadcrumb {
  background: white;
  border-bottom: 1px solid #f0f2f5;
  padding: 12px 0;
}

.breadcrumb .container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.breadcrumb a {
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #ff6700;
}

.breadcrumb .separator {
  color: #cbd5e1;
}

.breadcrumb .current {
  color: #1e293b;
  font-weight: 500;
}

.result-count {
  margin-left: auto;
  color: #94a3b8;
}

/* 主内容区 */
.main-content {
  max-width: 1400px;
  margin: 24px auto;
  padding: 0 24px;
  display: flex;
  gap: 28px;
}

/* 侧边栏 */
.filter-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #edf2f9;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.filter-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f4fa;
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.filter-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 14px;
}

.category-item,
.brand-item,
.price-item {
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: #475569;
}

.category-item:hover,
.brand-item:hover,
.price-item:hover {
  background: #f8fafc;
  color: #ff6700;
}

.category-item.active,
.brand-item.active,
.price-item.active {
  background: linear-gradient(135deg, rgba(255, 103, 0, 0.1), rgba(255, 133, 51, 0.05));
  color: #ff6700;
  font-weight: 500;
}

.category-item .count {
  color: #94a3b8;
  font-size: 11px;
  margin-left: 4px;
}

.custom-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.custom-price input {
  width: 70px;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 12px;
  outline: none;
}

.custom-price input:focus {
  border-color: #ff6700;
}

.custom-price button {
  padding: 6px 12px;
  background: #f1f5f9;
  border: none;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.custom-price button:hover {
  background: #ff6700;
  color: white;
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
}

.status-item input {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #ff6700;
}

.reset-btn {
  width: 100%;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  font-size: 13px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
}

.reset-btn:hover {
  background: #ff6700;
  border-color: #ff6700;
  color: white;
}

/* 商品区域 */
.product-section {
  flex: 1;
}

/* 排序栏 */
.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  border: 1px solid #edf2f9;
}

.sort-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-label {
  font-size: 13px;
  color: #64748b;
}

.sort-options {
  display: flex;
  gap: 4px;
}

.sort-item {
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  color: #475569;
}

.sort-item:hover {
  background: #f1f5f9;
  color: #ff6700;
}

.sort-item.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
}

.price-sort {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sort-arrow svg {
  width: 14px;
  height: 14px;
}

.sort-arrow svg.up {
  transform: rotate(180deg);
}

.view-mode {
  display: inline-flex;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s;
}

.view-mode svg {
  width: 20px;
  height: 20px;
}

.view-mode.active {
  background: #f1f5f9;
  color: #ff6700;
}

/* 加载状态 */
.loading-state {
  background: white;
  border-radius: 24px;
  padding: 80px 20px;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #e2e8f0;
  border-top-color: #ff6700;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: #64748b;
  font-size: 14px;
}

/* 网格视图 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #edf2f9;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #f8fafc;
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

.badge-new,
.badge-discount,
.badge-soldout {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.badge-new {
  background: #10b981;
  color: white;
}

.badge-discount {
  background: #ef4444;
  color: white;
}

.badge-soldout {
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.current-price {
  font-size: 18px;
  font-weight: 700;
  color: #ff6700;
}

.original-price {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating svg {
  width: 14px;
  height: 14px;
  color: #fbbf24;
}

.add-cart-btn {
  width: 100%;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 500;
  color: #ff6700;
  cursor: pointer;
  transition: all 0.2s;
}

.add-cart-btn:hover {
  background: #ff6700;
  color: white;
  border-color: #ff6700;
}

/* 列表视图 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-list-item {
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #edf2f9;
  padding: 16px;
  gap: 20px;
}

.product-list-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.list-image {
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
}

.list-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.list-desc {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 12px;
}

.list-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.list-meta {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #94a3b8;
}

.list-meta .out-of-stock {
  color: #ef4444;
}

.list-action {
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-left: 1px solid #edf2f9;
}

.cart-btn {
  padding: 10px 28px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(255, 103, 0, 0.3);
}

.cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  padding: 20px 0;
}

.page-btn {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  background: white;
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
  min-width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.page-num:hover {
  border-color: #ff6700;
  color: #ff6700;
}

.page-num.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  border-color: transparent;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 24px;
}

.empty-state svg {
  width: 80px;
  height: 80px;
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

/* 回到顶部 */
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  z-index: 90;
}

.back-to-top:hover {
  background: #ff6700;
  color: white;
  transform: translateY(-3px);
}

.back-to-top svg {
  width: 24px;
  height: 24px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  padding: 12px 28px;
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

/* 响应式 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .filter-sidebar {
    width: 100%;
    position: static;
  }

  .header-container {
    flex-wrap: wrap;
    gap: 16px;
  }

  .search-wrapper {
    order: 3;
    max-width: 100%;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  .product-list-item {
    flex-wrap: wrap;
  }

  .list-image {
    width: 100%;
    height: 200px;
  }

  .list-action {
    width: 100%;
    border-left: none;
    border-top: 1px solid #edf2f9;
    padding-top: 16px;
    justify-content: center;
  }

  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }

  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
}
</style>
