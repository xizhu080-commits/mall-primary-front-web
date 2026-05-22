<template>
  <div class="orders-page">
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
          <span>JD-Style生态商城</span>
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
          <div class="nav-item active" @click="goToOrders">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 6h18M6 3v3M18 3v3M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
              />
              <path d="M9 13h6M12 10v6" />
            </svg>
            <span>我的订单</span>
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

    <div class="orders-container">
      <!-- 1. 顶部标题栏 -->
      <div class="page-header">
        <h2>我的订单</h2>
        <div class="header-stats">
          <span class="stat-item">累计消费 ¥{{ formatMoney(totalConsumption) }}</span>
          <span class="stat-divider">|</span>
          <span class="stat-item">订单总数 {{ orders.length }}</span>
        </div>
      </div>

      <!-- 2. 订单状态导航 (增加数量徽章) -->
      <div class="order-tabs">
        <div class="tabs-left">
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === 'all' }"
            @click.prevent="setActiveTab('all')"
          >
            全部订单
            <span class="badge" v-if="orders.length > 0">{{ orders.length }}</span>
          </a>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === '1' }"
            @click.prevent="setActiveTab('1')"
          >
            待付款
            <span class="badge" v-if="statusCounts['1'] > 0">{{ statusCounts['1'] }}</span>
          </a>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === '2' }"
            @click.prevent="setActiveTab('2')"
          >
            待发货
            <span class="badge" v-if="statusCounts['2'] > 0">{{ statusCounts['2'] }}</span>
          </a>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === '3' }"
            @click.prevent="setActiveTab('3')"
          >
            待收货
            <span class="badge" v-if="statusCounts['3'] > 0">{{ statusCounts['3'] }}</span>
          </a>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === '4' }"
            @click.prevent="setActiveTab('4')"
          >
            已完成
            <span class="badge" v-if="statusCounts['4'] > 0">{{ statusCounts['4'] }}</span>
          </a>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === '5' }"
            @click.prevent="setActiveTab('5')"
          >
            退款中
            <span class="badge" v-if="statusCounts['5'] > 0">{{ statusCounts['5'] }}</span>
          </a>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === '6' }"
            @click.prevent="setActiveTab('6')"
          >
            退款成功
            <span class="badge" v-if="statusCounts['6'] > 0">{{ statusCounts['6'] }}</span>
          </a>
          <div class="divider"></div>
          <a
            href="#"
            class="tab-item"
            :class="{ active: activeTab === 'recycle' }"
            @click.prevent="setActiveTab('recycle')"
          >
            订单回收站
          </a>
        </div>

        <div class="tabs-right">
          <div class="search-box">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="商品名称 / 订单号" v-model="searchKeyword" />
          </div>
        </div>
      </div>

      <!-- 3. 筛选栏 (增加排序选项) -->
      <div class="filter-bar">
        <div class="filter-group">
          <div
            class="filter-item"
            :class="{ active: timeFilter === 'all' }"
            @click="timeFilter = 'all'"
          >
            全部订单
          </div>
          <div
            class="filter-item"
            :class="{ active: timeFilter === 'month' }"
            @click="timeFilter = 'month'"
          >
            近30天
          </div>
          <div
            class="filter-item"
            :class="{ active: timeFilter === 'quarter' }"
            @click="timeFilter = 'quarter'"
          >
            近3个月
          </div>
        </div>
        <div class="filter-right">
          <!-- 排序下拉框 -->
          <select v-model="sortType" class="sort-select">
            <option value="time-desc">按时间 ⬇️</option>
            <option value="time-asc">按时间 ⬆️</option>
            <option value="amount-desc">按金额 ⬇️</option>
            <option value="amount-asc">按金额 ⬆️</option>
          </select>
          <span class="filter-tip">共 {{ filteredOrders.length }} 个订单</span>
        </div>
      </div>

      <!-- 4. 订单列表 -->
      <div class="order-list">
        <div v-for="order in paginatedOrders" :key="order.suborderId" class="order-card">
          <!-- 订单头部信息 -->
          <div class="order-header">
            <div class="header-left">
              <span class="date">{{ order.createTime }}</span>
              <span class="order-id">订单号：{{ order.orderId }}</span>
              <span class="suborder-id">子订单号：{{ order.suborderId }}</span>
            </div>
            <div class="header-right">
              <!-- 2. 点击店铺名字跳转店铺详情 -->
              <span class="shop-name" @click="goToShop(order.shopId)">{{ order.shopName }}</span>
              <!-- 3. 删除按钮弹出自定义对话框 -->
              <span class="delete-btn" @click="openDeleteConfirm(order.suborderId)">🗑️ 删除</span>
            </div>
          </div>

          <!-- 订单商品内容 -->
          <div class="order-body">
            <div class="product-row">
              <div class="product-info">
                <img :src="order.productUrl" :alt="order.productName" />
                <div class="text">
                  <h4>{{ order.productName }}</h4>
                  <p class="product-sku" v-if="order.specData">规格：{{ order.specData }}</p>
                  <p class="product-sku" v-else>规格：沙漠色钛金属 1TB</p>
                </div>
              </div>
              <div class="product-price">¥{{ formatMoney(order.price) }}</div>
              <div class="quantity">×1</div>
              <div class="receiver">
                <span class="receiver-name">{{ order.receiverName }}</span>
                <span class="receiver-phone">{{ formatPhone(order.userPhone) }}</span>
              </div>
              <div class="total-price">¥{{ formatMoney(order.payAmount) }}</div>
              <div class="status-col">
                <div class="status-text" :class="getStatusClass(order.status)">
                  {{ getStatusText(order.status) }}
                </div>
                <div class="detail-link" @click="viewOrderDetail(order.suborderId)">订单详情</div>
              </div>
              <!-- 1. 调整按钮区域：将联系客服放到查看详情旁边 -->
              <div class="action-col">
                <button
                  v-if="order.status === 1"
                  class="btn-primary"
                  @click="payOrder(order.orderId)"
                >
                  立即付款
                </button>
                <button
                  v-if="order.status === 3 && order.logisticCompanyName"
                  class="btn-outline"
                  @click="trackOrder(order.suborderId)"
                >
                  查看物流
                </button>
                <button
                  v-if="order.status === 4 && !order.isReviewed"
                  class="btn-text"
                  @click="reviewOrder(order.suborderId)"
                >
                  评价晒单
                </button>
                <button class="btn-text" @click="contactService(order.shopId)">联系客服</button>
              </div>
            </div>
          </div>

          <!-- 订单底部汇总 (移除了底部的联系客服按钮，已在顶部调整) -->
          <div class="order-footer">
            <div class="footer-left">
              <span>共 1 件商品</span>
              <span class="divider">|</span>
              <span
                >实付 <span class="total-amount">¥{{ formatMoney(order.payAmount) }}</span></span
              >
              <span class="divider">|</span>
              <span>收货人：{{ order.receiverName }}</span>
              <span class="divider">|</span>
              <span>收货地址：{{ order.address }} {{ order.remark || '' }}</span>
            </div>
            <div class="footer-right">
              <button class="btn-outline-small" @click="viewOrderDetail(order.suborderId)">
                查看详情
              </button>
              <!-- 将原本在顶部的联系客服按钮添加到底部查看详情旁边，确保需求“放在查看详情的旁边” -->
              <button class="btn-outline-small" @click="contactService(order.shopId)">
                联系客服
              </button>
              <button
                v-if="order.status === 1"
                class="btn-primary-small"
                @click="payOrder(order.orderId)"
              >
                去支付
              </button>
              <button
                v-if="order.status === 3"
                class="btn-primary-small"
                @click="confirmReceipt(order.suborderId)"
              >
                确认收货
              </button>
              <button
                v-if="order.status === 4 && !order.isReviewed"
                class="btn-primary-small"
                @click="reviewOrder(order.suborderId)"
              >
                写评价
              </button>
              <button
                v-if="order.status === 5 || order.status === 6"
                class="btn-outline-small"
                @click="viewRefundDetail(order.suborderId)"
              >
                查看退款详情
              </button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredOrders.length === 0" class="empty-state">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M3 6h18M6 3v3M18 3v3M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
            />
            <path d="M9 13h6M12 10v6" />
          </svg>
          <p>暂无订单</p>
          <span>去逛逛吧，发现心仪好物</span>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="pagination">
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
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
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
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

    <!-- 自定义删除确认弹窗 -->
    <div v-if="deleteConfirm.visible" class="modal-overlay" @click.self="closeDeleteConfirm">
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
                d="M3 6h18M6 3v3M18 3v3M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path d="M9 13h6M12 10v6" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>
          <h3>删除订单</h3>
        </div>
        <div class="modal-body">
          <p>确定要删除该订单吗？</p>
          <p class="modal-tip">删除后将移至回收站，您可以在回收站中恢复。</p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-cancel" @click="closeDeleteConfirm">取消</button>
          <button class="modal-btn modal-btn-confirm" @click="confirmDelete">确认删除</button>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getSuborderList } from '@/api/order'

const router = useRouter()

// 筛选状态
const activeTab = ref('all')
const searchKeyword = ref('')
const timeFilter = ref('quarter')
const sortType = ref('time-desc') // 新增排序类型
const currentPage = ref(1)
const pageSize = 5

// 订单数据
const orders = ref([])
const loading = ref(false)

// 统计数据
const totalConsumption = ref(0)
// 各状态订单数量计算
const statusCounts = computed(() => {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  orders.value.forEach((order) => {
    const status = String(order.status)
    if (counts[status] !== undefined) counts[status]++
  })
  return counts
})

// Toast 状态
const toast = ref({
  visible: false,
  message: '',
  isError: false,
  timer: null,
})

// 自定义删除弹窗状态
const deleteConfirm = ref({
  visible: false,
  suborderId: null,
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

// 格式化金额
const formatMoney = (val) => {
  if (val === undefined || val === null) return '0.00'
  return val.toFixed(2)
}

// 格式化手机号
const formatPhone = (phone) => {
  if (!phone) return ''
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 状态映射
const getStatusText = (status) => {
  const map = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '已完成',
    5: '退款中',
    6: '退款成功',
    0: '已关闭',
  }
  return map[status] || '未知状态'
}

const getStatusClass = (status) => {
  const map = {
    1: 'status-pending',
    2: 'status-pending',
    3: 'status-shipping',
    4: 'status-completed',
    5: 'status-refund',
    6: 'status-refund',
  }
  return map[status] || ''
}

// 时间筛选
const isWithinTimeRange = (createTime) => {
  if (timeFilter.value === 'all') return true
  const now = new Date()
  const orderDate = new Date(createTime)
  const days = timeFilter.value === 'month' ? 30 : 90
  const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24)
  return diffDays <= days
}

// 搜索筛选
const isMatchSearch = (order) => {
  if (!searchKeyword.value.trim()) return true
  const keyword = searchKeyword.value.toLowerCase()
  return (
    order.orderId.toLowerCase().includes(keyword) ||
    order.productName.toLowerCase().includes(keyword)
  )
}

// 排序函数
const sortOrders = (ordersToSort) => {
  const sorted = [...ordersToSort]
  switch (sortType.value) {
    case 'time-asc':
      return sorted.sort((a, b) => new Date(a.createTime) - new Date(b.createTime))
    case 'time-desc':
      return sorted.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    case 'amount-asc':
      return sorted.sort((a, b) => a.payAmount - b.payAmount)
    case 'amount-desc':
      return sorted.sort((a, b) => b.payAmount - a.payAmount)
    default:
      return sorted
  }
}

// 筛选后的订单 (增加排序处理)
const filteredOrders = computed(() => {
  let result = [...orders.value]

  // 状态筛选
  if (activeTab.value !== 'all' && activeTab.value !== 'recycle') {
    result = result.filter((order) => order.status === parseInt(activeTab.value))
  }

  // 时间筛选
  result = result.filter((order) => isWithinTimeRange(order.createTime))

  // 搜索筛选
  result = result.filter((order) => isMatchSearch(order))

  // 排序
  result = sortOrders(result)

  return result
})

// 分页
const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize))
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredOrders.value.slice(start, start + pageSize)
})

// 设置标签页
const setActiveTab = (tab) => {
  activeTab.value = tab
  currentPage.value = 1
}

// 监听筛选变化重置页码
watch([activeTab, searchKeyword, timeFilter, sortType], () => {
  currentPage.value = 1
})

// 获取订单数据
const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await getSuborderList()
    if (response.code === 200 && response.data) {
      const suborderList = response.data.suborderList || []

      orders.value = suborderList.map((item) => ({
        suborderId: item.suborderId,
        orderId: item.orderId,
        userId: item.userId,
        userName: item.userName,
        receiverName: item.receiverName,
        userPhone: item.userPhone,
        merchantId: item.merchantId,
        shopName: item.shopName,
        shopId: item.shopId,

        skuId: item.skuId,
        specData: item.specData,
        price: item.price,
        discountAmount: item.discountAmount,
        payAmount: item.payAmount,
        productName: item.productName,
        productUrl: item.productUrl,
        payType: item.payType,
        status: item.status,
        isDeleted: item.isDeleted,
        address: item.address,
        remark: item.remark,
        createTime: item.createTime,
        updateTime: item.updateTime,
        logisticCompanyName: item.logisticCompanyName,
        isReviewed: false,
      }))

      // 计算总消费（已完成订单 status=4）
      totalConsumption.value = orders.value
        .filter((order) => order.status === 4)
        .reduce((sum, order) => sum + order.payAmount, 0)
    } else {
      showMessage(response.msg || '获取订单列表失败', true)
    }
  } catch (error) {
    console.error('获取订单列表失败:', error)
    showMessage('网络错误，无法获取订单信息', true)
  } finally {
    loading.value = false
  }
}

// 自定义删除弹窗
const openDeleteConfirm = (suborderId) => {
  deleteConfirm.value = {
    visible: true,
    suborderId: suborderId,
  }
}

const closeDeleteConfirm = () => {
  deleteConfirm.value.visible = false
  deleteConfirm.value.suborderId = null
}

const confirmDelete = () => {
  const suborderId = deleteConfirm.value.suborderId
  if (suborderId) {
    const index = orders.value.findIndex((order) => order.suborderId === suborderId)
    if (index !== -1) {
      orders.value.splice(index, 1)
      showMessage('订单已移至回收站')
    }
  }
  closeDeleteConfirm()
}

const viewOrderDetail = (suborderId) => {
  router.push(`/order/suborder/detail/${suborderId}`)
}

const payOrder = (orderId) => {
  showMessage('跳转至支付页面')
}

const trackOrder = (suborderId) => {
  showMessage('查看物流轨迹')
}

const confirmReceipt = (suborderId) => {
  const order = orders.value.find((o) => o.suborderId === suborderId)
  if (order && order.status === 3) {
    order.status = 4
    showMessage('确认收货成功')
  }
}

const reviewOrder = (suborderId) => {
  const order = orders.value.find((o) => o.suborderId === suborderId)
  if (order) {
    order.isReviewed = true
    showMessage('写评价')
  }
}

const viewRefundDetail = (suborderId) => {
  showMessage('查看退款详情')
}

const contactService = (shopId) => {
  showMessage('联系客服')
}

// 2. 跳转店铺详情
const goToShop = (shopId) => {
  if (shopId) {
    router.push(`/shop/${shopId}`)
    showMessage('跳转至店铺详情页')
  } else {
    showMessage('店铺信息有误', true)
  }
}

// 导航函数
const goToHome = () => {
  router.push('/')
}

const goToOrders = () => {
  // 当前页面
}

const goToProfile = () => {
  const userMerchantInfo = localStorage.getItem('mall-user_merchant-info')
  if (userMerchantInfo) {
    try {
      const info = JSON.parse(userMerchantInfo)
      if (info.identityType === '用户') {
        router.push(`/user/detail/${info.userId}`)
      } else {
        router.push('/profile')
      }
    } catch {
      router.push('/profile')
    }
  } else {
    router.push('/login')
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
/* 样式与之前相同，增加额外样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.orders-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
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
  background: rgba(15, 23, 42, 0.95);
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
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 18px;
  height: 18px;
  color: white;
}

.logo span {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #e2e8f0;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 40px;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ff6700;
}

.nav-item.active {
  background: rgba(255, 103, 0, 0.2);
  color: #ff6700;
}

/* ========== 主容器 ========== */
.orders-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.header-stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #64748b;
}

.stat-divider {
  color: #e2e8f0;
}

/* 订单标签栏 */
.order-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-radius: 16px;
  padding: 8px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.tabs-left {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.tab-item {
  text-decoration: none;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tab-item.active {
  color: #ff6700;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff6700, #ff8c42);
  border-radius: 2px;
}

.badge {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  color: white;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 6px;
}

.divider {
  width: 1px;
  height: 16px;
  background: #e2e8f0;
}

.tabs-right .search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 40px;
}

.search-box svg {
  color: #94a3b8;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  width: 200px;
}

.search-box input::placeholder {
  color: #94a3b8;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.filter-group {
  display: flex;
  gap: 16px;
}

.filter-item {
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 20px;
  transition: all 0.2s;
}

.filter-item:hover {
  background: #f1f5f9;
  color: #ff6700;
}

.filter-item.active {
  background: #ff6700;
  color: white;
}

.filter-right {
  text-align: right;
  display: flex;
  align-items: center;
  gap: 16px;
}

.sort-select {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  outline: none;
}

.sort-select:hover {
  border-color: #ff6700;
}

.filter-tip {
  font-size: 12px;
  color: #94a3b8;
}

/* 订单列表 */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 订单卡片 */
.order-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.order-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.order-header {
  background: #f8fafc;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.header-left {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: #64748b;
  flex-wrap: wrap;
}

.order-id,
.suborder-id {
  color: #94a3b8;
  font-family: monospace;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.shop-name {
  font-weight: 600;
  color: #1f8827;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
}

.shop-name:hover {
  color: #ff6700;
}

.delete-btn {
  color: #d7352f;
  cursor: pointer;
  font-size: 13px;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #ef4444;
}

/* 订单商品行 */
.order-body {
  padding: 0 24px;
}

.product-row {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 12px;
}

.product-row:last-child {
  border-bottom: none;
}

.product-info {
  flex: 2.5;
  display: flex;
  gap: 16px;
  align-items: center;
  min-width: 280px;
}

.product-info img {
  width: 70px;
  height: 70px;
  border-radius: 12px;
  object-fit: cover;
  background: #f8fafc;
}

.product-info .text h4 {
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 6px;
  line-height: 1.4;
}

.product-sku {
  font-size: 12px;
  color: #94a3b8;
}

.product-price {
  width: 100px;
  text-align: center;
  font-size: 14px;
  color: #475569;
}

.quantity {
  width: 60px;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.receiver {
  width: 140px;
  text-align: center;
  font-size: 13px;
  color: #475569;
}

.receiver-name {
  display: block;
  font-weight: 500;
}

.receiver-phone {
  font-size: 11px;
  color: #94a3b8;
}

.total-price {
  width: 100px;
  text-align: center;
  font-weight: 600;
  color: #1e293b;
  font-size: 14px;
}

.status-col {
  width: 100px;
  text-align: center;
}

.status-text {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
}

.status-completed {
  color: #10b981;
}

.status-pending {
  color: #f59e0b;
}

.status-shipping {
  color: #3b82f6;
}

.status-refund {
  color: #ef4444;
}

.detail-link {
  font-size: 12px;
  color: #ff6700;
  cursor: pointer;
}

.action-col {
  width: 140px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.btn-text {
  background: none;
  border: none;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.2s;
}

.btn-text:hover {
  color: #ff6700;
}

.btn-outline {
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: #ff6700;
  color: #ff6700;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  border: none;
  padding: 6px 16px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(255, 103, 0, 0.3);
}

/* 订单底部 */
.order-footer {
  background: #f8fafc;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-left {
  font-size: 13px;
  color: #64748b;
  display: flex;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
}

.total-amount {
  font-size: 16px;
  font-weight: 700;
  color: #ff6700;
}

.footer-right {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-outline-small {
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline-small:hover {
  border-color: #ff6700;
  color: #ff6700;
}

.btn-primary-small {
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  border: none;
  padding: 6px 18px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary-small:hover {
  transform: translateY(-1px);
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 28px;
}

.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
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

.page-info {
  font-size: 14px;
  color: #475569;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: #ffffff;
  border-radius: 20px;
}

.empty-state svg {
  color: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state p {
  font-size: 16px;
  color: #475569;
  margin-bottom: 8px;
}

.empty-state span {
  font-size: 14px;
  color: #94a3b8;
}

/* Toast */
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

/* 自定义删除弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.modal-container {
  background: white;
  border-radius: 24px;
  width: 400px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.2s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  padding: 20px 24px 8px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-icon {
  width: 40px;
  height: 40px;
  background: #fee2e2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.modal-body {
  padding: 8px 24px 20px 24px;
}

.modal-body p {
  font-size: 15px;
  color: #334155;
  margin: 4px 0;
}

.modal-tip {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 8px;
}

.modal-footer {
  padding: 16px 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.modal-btn-cancel {
  background: #f1f5f9;
  color: #475569;
}

.modal-btn-cancel:hover {
  background: #e2e8f0;
}

.modal-btn-confirm {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.modal-btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* 响应式 */
@media (max-width: 1000px) {
  .product-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-info {
    width: 100%;
  }

  .action-col {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
  }

  .order-footer {
    flex-direction: column;
  }

  .footer-right {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .nav-links .nav-item span {
    display: none;
  }

  .order-tabs {
    flex-direction: column;
    gap: 12px;
  }

  .tabs-left {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-header {
    flex-direction: column;
    gap: 8px;
  }

  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }

  .filter-bar {
    flex-direction: column;
    gap: 12px;
  }

  .filter-group {
    flex-wrap: wrap;
    justify-content: center;
  }

  .filter-right {
    justify-content: center;
  }

  .header-left {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
