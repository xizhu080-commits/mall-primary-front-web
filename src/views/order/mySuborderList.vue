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
              <circle cx="12" cy="12" r="4" />
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

      <!-- 2. 订单状态导航 -->
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

      <!-- 3. 筛选栏 -->
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
              <div class="shop-info" @click="goToShop(order.shopId)">
                <img
                  class="shop-logo"
                  :src="order.shopLogo || '/default-shop-logo.png'"
                  :alt="order.shopName"
                  @error="handleImageError"
                />
                <span class="shop-name">{{ order.shopName }}</span>
              </div>
              <span class="delete-btn" @click="openDeleteConfirm(order.suborderId)">🗑️ 删除</span>
            </div>
          </div>

          <!-- 订单商品内容 -->
          <div class="order-body">
            <div class="product-row">
              <div class="product-info">
                <img
                  @click="goToProduct(order.spuId)"
                  :src="order.productUrl"
                  :alt="order.productName"
                />
                <div class="text">
                  <h4 @click="goToProduct(order.spuId)">{{ order.productName }}</h4>
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
              </div>
              <div class="action-col">
                <button
                  v-if="order.status === 4 && !order.isReviewed"
                  class="btn-text"
                  @click="reviewOrder(order.suborderId)"
                >
                  评价晒单
                </button>
              </div>
            </div>
          </div>

          <!-- 订单底部汇总 -->
          <div class="order-footer">
            <!-- 底部左侧 -->
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
            <!-- 底部右侧 -->
            <div class="footer-right">
              <button class="btn-outline-small" @click="viewOrderDetail(order.suborderId)">
                查看详情
              </button>
              <button class="btn-outline-small" @click="handleTalkToCustomer(order)">
                联系客服
              </button>
              <!-- 待付款状态：显示立即支付和取消订单 -->
              <template v-if="order.status === 1">
                <button class="btn-primary-small" @click="openPaymentDialog(order)">
                  立即支付
                </button>
                <button class="btn-cancel-order" @click="openCancelConfirm(order)">取消订单</button>
              </template>
              <!-- 待收货状态 -->
              <button
                v-if="order.status === 3"
                class="btn-primary-small"
                @click="confirmReceipt(order.suborderId)"
              >
                确认收货
              </button>
              <!-- 申请退款按钮 - 待发货、待收货、已完成状态 -->
              <button
                v-if="order.status === 2 || order.status === 3 || order.status === 4"
                class="btn-refund-small"
                @click="openRefundModal(order)"
              >
                申请退款
              </button>
              <!-- 退款中/退款成功状态 -->
              <button
                v-if="order.status === 5 || order.status === 6"
                class="btn-outline-small"
                @click="viewRefundDetail(order.suborderId)"
              >
                查看退款详情
              </button>
              <!-- 已完成状态：写评价 -->
              <button
                v-if="order.status === 4 && !order.isReviewed"
                class="btn-primary-small"
                @click="reviewOrder(order.suborderId)"
              >
                写评价
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
    <!-- 取消订单确认弹窗 -->
    <div v-if="cancelConfirm.visible" class="modal-overlay" @click.self="closeCancelConfirm">
      <div class="modal-container cancel-modal">
        <div class="modal-header">
          <div class="modal-icon warning-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3>取消订单</h3>
        </div>
        <div class="modal-body">
          <p>确定要取消该订单吗？</p>
          <p class="modal-tip">取消订单后，订单将关闭且无法恢复，请谨慎操作。</p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn modal-btn-cancel" @click="closeCancelConfirm">再想想</button>
          <button class="modal-btn modal-btn-confirm-cancel" @click="confirmCancelOrder">
            确认取消
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

    <!-- ========== 支付弹窗 ========== -->
    <div v-if="paymentModalVisible" class="modal-overlay">
      <div class="modal-container order-modal-new">
        <div class="modal-header">
          <h3>确认支付</h3>
          <button class="close-btn" @click="closePaymentModal">×</button>
        </div>
        <div class="modal-body">
          <div class="order-product-section">
            <div class="order-product-img">
              <img :src="currentPayOrder?.productUrl" :alt="currentPayOrder?.productName" />
            </div>
            <div class="order-product-detail">
              <div class="order-product-name">{{ currentPayOrder?.productName }}</div>
              <div class="order-product-specs">
                <span>规格：{{ currentPayOrder?.specData || '标准版' }}</span>
              </div>
              <div class="order-product-price">
                <span class="price-label">单价：</span>
                <span class="price-value">¥{{ formatMoney(currentPayOrder?.price) }}</span>
                <span class="quantity-label">x1</span>
              </div>
              <div class="order-product-total">
                <span>实付：</span>
                <span class="total-price">¥{{ formatMoney(currentPayOrder?.payAmount) }}</span>
              </div>
            </div>
          </div>
          <div class="order-address-section">
            <div class="section-title">收货信息</div>
            <div class="address-content">
              <div class="address-line">
                <span class="address-label">收货人：</span>
                <span>{{ currentPayOrder?.receiverName }}</span>
              </div>
              <div class="address-line">
                <span class="address-label">手机号码：</span>
                <span>{{ currentPayOrder?.userPhone }}</span>
              </div>
              <div class="address-line">
                <span class="address-label">收货地址：</span>
                <span>{{ currentPayOrder?.address }} {{ currentPayOrder?.remark || '' }}</span>
              </div>
            </div>
          </div>
          <div class="order-payment-section">
            <div class="section-title">支付方式</div>
            <div class="payment-options">
              <div
                class="payment-option"
                :class="{ active: selectedPayment === 'balance' }"
                @click="selectedPayment = 'balance'"
              >
                <div class="payment-radio">
                  <div class="radio-inner" v-if="selectedPayment === 'balance'"></div>
                </div>
                <div class="payment-info">
                  <div class="payment-name">余额支付</div>
                  <div class="payment-desc">使用账户余额支付，安全快捷</div>
                </div>
                <div class="payment-icon">💰</div>
              </div>
              <div
                class="payment-option"
                :class="{ active: selectedPayment === 'alipay' }"
                @click="selectedPayment = 'alipay'"
              >
                <div class="payment-radio">
                  <div class="radio-inner" v-if="selectedPayment === 'alipay'"></div>
                </div>
                <div class="payment-info">
                  <div class="payment-name">支付宝支付</div>
                  <div class="payment-desc">推荐有支付宝账号的用户使用</div>
                </div>
                <div class="payment-icon">📱</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closePaymentModal">取消</button>
          <button class="btn-confirm" @click="submitPayment" :disabled="submitting">
            {{ submitting ? '处理中...' : '确认支付' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 支付宝支付二维码弹窗 -->
    <div v-if="qrModalVisible" class="modal-overlay">
      <div class="modal-container qr-modal-new">
        <div class="modal-header">
          <h3>支付宝扫码支付</h3>
          <button class="close-btn" @click="closeQrModal">×</button>
        </div>
        <div class="modal-body qr-body-new">
          <div class="qr-layout">
            <div class="qr-left">
              <div class="qr-code" v-if="expireSeconds > 0">
                <img :src="qrCodeBase64" alt="支付宝支付二维码" />
              </div>
              <div class="qr-code-expired" v-else>
                <div class="expired-icon">⏰</div>
                <p class="expired-text">二维码已过期</p>
                <button class="btn-refresh" @click="refreshQrCode" :disabled="refreshing">
                  {{ refreshing ? '重新获取中...' : '重新获取二维码' }}
                </button>
              </div>
              <div class="qr-tips">
                <p class="qr-expire">
                  ⏱️ 二维码剩余时间：<span class="expire-time">{{ expireSeconds }}</span> 秒
                </p>
                <p class="qr-note">请使用支付宝扫描二维码支付</p>
                <p
                  class="qr-refresh-link"
                  @click="refreshQrCode"
                  v-if="expireSeconds > 0 && !refreshing"
                >
                  <span class="refresh-text">二维码无效？</span>
                  <span class="refresh-link">重新获取！</span>
                </p>
              </div>
            </div>
            <div class="qr-right">
              <div class="order-info-title">订单信息</div>
              <div class="order-info-list">
                <div class="order-info-item">
                  <span class="info-label">订单编号：</span>
                  <span class="info-value order-id">{{ currentPayOrder?.orderId }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品名称：</span>
                  <span class="info-value">{{ currentPayOrder?.productName }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品规格：</span>
                  <span class="info-value">{{ currentPayOrder?.specData || '标准版' }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">购买数量：</span>
                  <span class="info-value">1 件</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品单价：</span>
                  <span class="info-value">¥{{ formatMoney(currentPayOrder?.price) }}</span>
                </div>
                <div class="order-info-item total">
                  <span class="info-label">支付金额：</span>
                  <span class="info-value total-price"
                    >¥{{ formatMoney(currentPayOrder?.payAmount) }}</span
                  >
                </div>
              </div>
              <div class="delivery-info-title">收货信息</div>
              <div class="delivery-info-list">
                <div class="delivery-info-item">
                  <span class="info-label">收货人：</span>
                  <span class="info-value">{{ currentPayOrder?.receiverName }}</span>
                </div>
                <div class="delivery-info-item">
                  <span class="info-label">手机号码：</span>
                  <span class="info-value">{{ currentPayOrder?.userPhone }}</span>
                </div>
                <div class="delivery-info-item">
                  <span class="info-label">收货地址：</span>
                  <span class="info-value address-text"
                    >{{ currentPayOrder?.address }} {{ currentPayOrder?.remark || '' }}</span
                  >
                </div>
                <div class="qr-footer-center">
                  <button class="btn-secondary" @click="closeQrModal">关闭</button>
                  <button class="btn-primary" @click="checkPaymentStatus">我已支付</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付成功动画弹窗 -->
    <div v-if="paymentSuccessVisible" class="payment-success-overlay">
      <div class="success-animation">
        <div class="success-checkmark">
          <div class="check-icon">
            <span class="icon-line line-tip"></span>
            <span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <h3 class="success-title">支付成功！</h3>
        <p class="success-desc">正在刷新订单列表...</p>
      </div>
    </div>

    <!-- 退款申请弹窗 - 优化版 -->
    <div v-if="refundModalVisible" class="modal-overlay" @click.self="closeRefundModal">
      <div class="modal-container refund-modal-optimized">
        <div class="modal-header">
          <h3>
            <svg
              class="modal-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 12a9 9 0 1 1-9-9" />
              <polyline points="12 7 12 12 15 15" />
              <path d="M21 3v6h-6" />
            </svg>
            申请退款
          </h3>
          <button class="close-btn" @click="closeRefundModal">×</button>
        </div>

        <div class="modal-body refund-modal-body">
          <!-- 商品信息 -->
          <!-- 商品信息 -->
          <div class="refund-product-card">
            <img
              :src="currentRefundOrder?.productUrl"
              :alt="currentRefundOrder?.productName"
              class="product-img"
            />
            <div class="product-info">
              <div class="product-name">{{ currentRefundOrder?.productName }}</div>
              <div class="product-spec">规格：{{ currentRefundOrder?.specData || '标准版' }}</div>
              <div class="product-price">
                <span class="price">¥{{ formatMoney(currentRefundOrder?.price) }}</span>
                <span class="quantity">x1</span>
              </div>
            </div>
          </div>

          <!-- 退款金额 -->
          <!-- 退款金额 -->
          <div class="form-section">
            <div class="section-title">退款金额</div>
            <div class="amount-display-group">
              <span class="currency-symbol">¥</span>
              <span class="amount-display">{{ formatMoney(currentRefundOrder?.payAmount) }}</span>
            </div>
            <div class="amount-hint">
              可退金额：¥{{ formatMoney(currentRefundOrder?.payAmount) }}
            </div>
          </div>

          <!-- 退款原因 -->
          <div class="form-section">
            <div class="section-title">退款原因 <span class="required">*</span></div>
            <select v-model="refundForm.reason" class="reason-select-optimized">
              <option value="" disabled>请选择退款原因</option>
              <option value="不喜欢/不想要">不喜欢/不想要</option>
              <option value="商品与描述不符">商品与描述不符</option>
              <option value="质量问题">质量问题</option>
              <option value="发错商品">发错商品</option>
              <option value="少发漏发">少发漏发</option>
              <option value="快递物流问题">快递物流问题</option>
              <option value="七天无理由退货">七天无理由退货</option>
              <option value="其他原因">其他原因</option>
            </select>
          </div>

          <!-- 退款说明 -->
          <div class="form-section">
            <div class="section-title">退款说明</div>
            <textarea
              v-model="refundForm.description"
              rows="3"
              placeholder="请详细描述退款原因，方便商家快速处理（选填）"
              class="desc-textarea-optimized"
            ></textarea>
          </div>

          <!-- 上传凭证 -->
          <div class="form-section">
            <div class="section-title">上传凭证</div>
            <div class="upload-area-optimized">
              <div v-for="(img, idx) in refundForm.evidence" :key="idx" class="upload-item">
                <img :src="img" class="upload-preview" />
                <button class="remove-btn" @click="removeEvidence(idx)">×</button>
              </div>
              <div
                class="upload-btn-optimized"
                @click="triggerFileUpload"
                v-if="refundForm.evidence.length < 5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>上传图片</span>
                <small>（最多5张）</small>
              </div>
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                multiple
                style="display: none"
                @change="handleFileUpload"
              />
            </div>
          </div>

          <!-- 退款提示 -->
          <div class="refund-tip-optimized">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>退款申请提交后，商家将在1-3个工作日内处理，请耐心等待</span>
          </div>
        </div>

        <div class="modal-footer-optimized">
          <button class="btn-cancel-optimized" @click="closeRefundModal">取消</button>
          <button class="btn-submit-optimized" @click="submitRefund" :disabled="refundSubmitting">
            {{ refundSubmitting ? '提交中...' : '提交申请' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 退款成功/确认弹窗 -->
    <div v-if="refundConfirmModalVisible" class="modal-overlay">
      <div class="modal-container refund-confirm-modal">
        <div class="modal-header">
          <h3>退款申请已提交</h3>
          <button class="close-btn" @click="closeRefundConfirmModal">×</button>
        </div>
        <div class="modal-body refund-confirm-body">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p class="confirm-title">退款申请已提交成功！</p>
          <p class="confirm-desc">请耐心等待商家处理，处理结果将通过消息通知您</p>
          <div class="refund-info-box">
            <div class="refund-info-item">
              <span>退款金额：</span>
              <strong>¥{{ formatMoney(refundForm.amount) }}</strong>
            </div>
            <div class="refund-info-item">
              <span>退款原因：</span>
              <span>{{ refundForm.reason }}</span>
            </div>
          </div>
          <button class="btn-view-refund" @click="viewRefundRecord">查看退款记录</button>
        </div>
        <div class="modal-footer">
          <button class="btn-confirm" @click="closeRefundConfirmModal">我知道了</button>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getSuborderList } from '@/api/order'
import { payOrder } from '@/api/payment'
import { applyRefund } from '@/api/refund'
import { getOrCreateSession } from '@/api/message'

const router = useRouter()

// 筛选状态
const activeTab = ref('all')
const searchKeyword = ref('')
const timeFilter = ref('all')
const sortType = ref('time-desc')
const currentPage = ref(1)
const pageSize = 5

// 订单数据
const orders = ref([])
const loading = ref(false)

// 统计数据
const totalConsumption = ref(0)

// 支付相关状态
const paymentModalVisible = ref(false)
const qrModalVisible = ref(false)
const selectedPayment = ref('alipay')
const submitting = ref(false)
const refreshing = ref(false)
const qrCodeBase64 = ref('')
const expireSeconds = ref(120)
const paymentSuccessVisible = ref(false)
const currentPayOrder = ref(null)
let expireTimer = null
let successTimer = null

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

  let orderDate
  try {
    if (typeof createTime === 'string') {
      const normalizedTime = createTime.replace(/-/g, '/')
      orderDate = new Date(normalizedTime)
    } else if (createTime instanceof Date) {
      orderDate = createTime
    } else {
      orderDate = new Date(createTime)
    }
  } catch (error) {
    console.error('[时间筛选] 日期解析失败:', createTime, error)
    return true
  }
  if (isNaN(orderDate.getTime())) {
    console.warn('[时间筛选] 日期格式无效:', createTime)
    return true
  }

  const now = new Date()
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

// 筛选后的订单
const filteredOrders = computed(() => {
  let result = [...orders.value]

  if (activeTab.value !== 'all' && activeTab.value !== 'recycle') {
    result = result.filter((order) => order.status === parseInt(activeTab.value))
  }
  result = result.filter((order) => isWithinTimeRange(order.createTime))
  result = result.filter((order) => isMatchSearch(order))
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
        merchantId: item.merchantId,
        shopName: item.shopName,
        shopId: item.shopId,
        shopLogo: item.shopLogo,
        skuId: item.skuId,
        spuId: item.spuId,
        specData: item.specData,
        productName: item.productName,
        productUrl: item.productUrl,
        price: item.price,
        discountAmount: item.discountAmount,
        payAmount: item.payAmount,
        paymentId: item.paymentId,
        payType: item.payType,
        payTime: item.payTime,
        receiverName: item.receiverName,
        userPhone: item.userPhone,
        address: item.address,
        remark: item.remark,
        logisticCompanyName: item.logisticCompanyName,
        isDeleted: item.isDeleted,
        signTime: item.signTime,
        status: item.status,
        createTime: item.createTime,
        updateTime: item.updateTime,
      }))

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

// 图片加载失败处理
const handleImageError = (event) => {
  event.target.src = '/default-shop-logo.png'
}

// ========== 支付相关函数 ==========

// 打开支付弹窗
const openPaymentDialog = (order) => {
  if (!order) {
    showMessage('订单信息不存在', true)
    return
  }
  currentPayOrder.value = order
  selectedPayment.value = 'alipay'
  paymentModalVisible.value = true
}

// 关闭支付弹窗
const closePaymentModal = () => {
  paymentModalVisible.value = false
  currentPayOrder.value = null
}

// 提交支付
const submitPayment = async () => {
  if (!currentPayOrder.value) {
    showMessage('订单信息不存在', true)
    return
  }

  submitting.value = true
  try {
    const payType = selectedPayment.value === 'alipay' ? 'Alipay' : 'Balance'
    const requestData = { orderId: currentPayOrder.value.orderId, payType }
    const res = await payOrder(requestData)

    if (res.code === 200 && res.data) {
      if (selectedPayment.value === 'alipay') {
        let qrData = res.data.qrCode || res.data.qrcode || ''
        if (qrData) {
          if (qrData.includes('data:image/png;base64,data:image/png;base64,')) {
            qrData = qrData.replace(
              'data:image/png;base64,data:image/png;base64,',
              'data:image/png;base64,',
            )
          } else if (!qrData.startsWith('data:image')) {
            qrData = `data:image/png;base64,${qrData}`
          }
          qrCodeBase64.value = qrData
          qrModalVisible.value = true
          startExpireTimer()
          closePaymentModal()
        } else {
          showMessage('获取二维码失败，请重试', true)
        }
      } else if (selectedPayment.value === 'balance') {
        showPaymentSuccess()
      }
    } else {
      showMessage(res.msg || '支付失败，请重试', true)
    }
  } catch (error) {
    console.error('支付异常:', error)
    showMessage('支付失败，请重试', true)
  } finally {
    submitting.value = false
  }
}

// 开始二维码倒计时
const startExpireTimer = () => {
  expireSeconds.value = 120
  if (expireTimer) clearInterval(expireTimer)
  expireTimer = setInterval(() => {
    if (expireSeconds.value > 0) {
      expireSeconds.value--
    } else {
      console.log('二维码已过期，停止倒计时')
      clearInterval(expireTimer)
      expireTimer = null
    }
  }, 1000)
}

// 刷新二维码
const refreshQrCode = async () => {
  if (!currentPayOrder.value) {
    showMessage('订单信息错误，请重新支付', true)
    closeQrModal()
    return
  }

  refreshing.value = true
  try {
    const payType = selectedPayment.value === 'alipay' ? 'Alipay' : 'Balance'
    const requestData = { orderId: currentPayOrder.value.orderId, payType }
    const res = await payOrder(requestData)

    if (res.code === 200 && res.data) {
      let qrData = res.data.qrCode || res.data.qrcode || ''
      if (qrData) {
        if (qrData.includes('data:image/png;base64,data:image/png;base64,')) {
          qrData = qrData.replace(
            'data:image/png;base64,data:image/png;base64,',
            'data:image/png;base64,',
          )
        } else if (qrData && !qrData.startsWith('data:image')) {
          qrData = `data:image/png;base64,${qrData}`
        }
        qrCodeBase64.value = qrData
        startExpireTimer()
        showMessage('二维码已更新，请尽快扫码支付')
      } else {
        showMessage('获取二维码失败，请重试', true)
      }
    } else {
      showMessage(res.msg || '获取二维码失败，请重试', true)
    }
  } catch (error) {
    console.error('刷新二维码异常:', error)
    showMessage('网络错误，请重试', true)
  } finally {
    refreshing.value = false
  }
}

// 关闭二维码弹窗
const closeQrModal = () => {
  if (expireTimer) {
    clearInterval(expireTimer)
    expireTimer = null
  }
  qrModalVisible.value = false
  qrCodeBase64.value = ''
  expireSeconds.value = 120
  refreshing.value = false
}

// 检查支付状态（手动确认）
const checkPaymentStatus = () => {
  showMessage('支付成功！')
  closeQrModal()
  showPaymentSuccess()
}

// 显示支付成功动画
const showPaymentSuccess = () => {
  paymentSuccessVisible.value = true
  if (successTimer) clearTimeout(successTimer)
  successTimer = setTimeout(() => {
    paymentSuccessVisible.value = false
    // 刷新订单列表
    fetchOrders()
    showMessage('支付成功！')
  }, 2000)
}

// 支付成功后的刷新（监听全局事件）
const handlePaymentNotification = (event) => {
  const notification = event.detail
  console.log('收到支付成功信号:', notification)
  const orderId = notification.orderId || notification

  if (currentPayOrder.value && String(orderId) === String(currentPayOrder.value.orderId)) {
    if (qrModalVisible.value) {
      closeQrModal()
    }
    showPaymentSuccess()
    currentPayOrder.value = null
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

const trackOrder = (suborderId) => {
  showMessage('查看物流轨迹')
}

const confirmReceipt = (suborderId) => {
  const order = orders.value.find((o) => o.suborderId === suborderId)
  if (order && order.status === 3) {
    order.status = 4
    showMessage('确认收货成功')
    fetchOrders()
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

/**
 * 联系客服
 */
const handleTalkToCustomer = async (order) => {
  if (!order) {
    showMessage('订单信息不存在', true)
    return
  }

  const data = {
    partnerId: order.shopId,
    partnerName: order.shopName,
    partnerAvatar: order.shopLogo,
    partnerType: 'MERCHANT',
  }

  console.log('[订单列表] 联系客服参数:', data)
  showMessage('正在联系客服...')

  try {
    const response = await getOrCreateSession(data)
    console.log('[订单列表] 获取会话信息响应:', response)

    if (response.code === 200 && response.data) {
      const event = new CustomEvent('open-userChatToMerchant-session', { detail: response.data })
      window.dispatchEvent(event)
      showMessage('正在打开聊天窗口...')
    } else {
      showMessage(response.msg || '获取会话信息失败', true)
    }
  } catch (error) {
    console.error('[订单列表] 联系客服异常:', error)
    showMessage('网络错误，请稍后重试', true)
  }
}

// 跳转店铺详情
const goToShop = (shopId) => {
  if (shopId) {
    router.push(`/shop/${shopId}`)
  } else {
    showMessage('店铺信息有误', true)
  }
}

// 跳转商品详情页
const goToProduct = (spuId) => {
  if (spuId) {
    router.push(`/product/detail/${spuId}`)
  } else {
    showMessage('商品信息有误', true)
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
// ========== 退款相关状态 ==========
const refundModalVisible = ref(false)
const refundConfirmModalVisible = ref(false)
const refundSubmitting = ref(false)
const currentRefundOrder = ref(null)
const fileInput = ref(null)

const refundForm = ref({
  reason: '',
  description: '',
  evidence: [],
})

// 打开退款弹窗
const openRefundModal = (order) => {
  if (!order) {
    showMessage('订单信息不存在', true)
    return
  }
  currentRefundOrder.value = order
  refundForm.value = {
    reason: '',
    description: '',
    evidence: [],
  }
  refundModalVisible.value = true
}

// 关闭退款弹窗
const closeRefundModal = () => {
  refundModalVisible.value = false
  currentRefundOrder.value = null
}

// 关闭退款确认弹窗
const closeRefundConfirmModal = () => {
  refundConfirmModalVisible.value = false
  // 刷新订单列表
  fetchOrders()
}

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value?.click()
}

// 处理文件上传
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  const remainingSlots = 5 - refundForm.value.evidence.length

  files.slice(0, remainingSlots).forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        refundForm.value.evidence.push(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  })

  event.target.value = ''
}

// 删除凭证图片
const removeEvidence = (index) => {
  refundForm.value.evidence.splice(index, 1)
}

// 提交退款申请
const submitRefund = async () => {
  if (!refundForm.value.reason) {
    showMessage('请选择退款原因', true)
    return
  }

  refundSubmitting.value = true

  console.log('准备提交退款申请...')
  console.log('订单ID:', currentRefundOrder.value.orderId)
  console.log('子订单ID:', currentRefundOrder.value.suborderId)
  console.log('退款原因:', refundForm.value.reason)

  try {
    // 使用真实API调用
    console.log('正在调用 applyRefund API...')
    const response = await applyRefund({
      orderId: currentRefundOrder.value.orderId,
      suborderId: currentRefundOrder.value.suborderId,
      refundReason: refundForm.value.reason,
    })
    console.log('API响应:', response)

    if (response.code === 200) {
      // 更新本地订单状态为退款中
      const orderIndex = orders.value.findIndex(
        (o) => o.suborderId === currentRefundOrder.value.suborderId,
      )
      if (orderIndex !== -1) {
        orders.value[orderIndex].status = 5
      }

      closeRefundModal()
      refundConfirmModalVisible.value = true
      showMessage('退款申请已提交')
    } else {
      showMessage(response.message || '提交失败，请重试', true)
    }
  } catch (error) {
    console.error('提交退款失败:', error)
    showMessage('网络错误，请重试', true)
  } finally {
    refundSubmitting.value = false
  }
}
// ========== 取消订单相关状态 ==========
const cancelConfirm = ref({
  visible: false,
  order: null,
})

// 打开取消订单确认弹窗
const openCancelConfirm = (order) => {
  cancelConfirm.value = {
    visible: true,
    order: order,
  }
}

// 关闭取消订单确认弹窗
const closeCancelConfirm = () => {
  cancelConfirm.value.visible = false
  cancelConfirm.value.order = null
}

// 确认取消订单
const confirmCancelOrder = async () => {
  const order = cancelConfirm.value.order
  if (!order) {
    closeCancelConfirm()
    return
  }

  try {
    // 模拟API调用 - 实际使用时替换为真实取消订单接口
    // const response = await cancelOrder({ suborderId: order.suborderId })
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 更新本地订单状态为已关闭
    const orderIndex = orders.value.findIndex((o) => o.suborderId === order.suborderId)
    if (orderIndex !== -1) {
      orders.value[orderIndex].status = 0 // 0 表示已关闭
    }

    showMessage('订单已取消')
    closeCancelConfirm()
  } catch (error) {
    console.error('取消订单失败:', error)
    showMessage('取消订单失败，请重试', true)
  }
}

onMounted(() => {
  fetchOrders()
  window.addEventListener('user-payment-notification', handlePaymentNotification)
  window.addEventListener('merchant-payment-notification', handlePaymentNotification)
})

onUnmounted(() => {
  if (expireTimer) {
    clearInterval(expireTimer)
    expireTimer = null
  }
  if (successTimer) {
    clearTimeout(successTimer)
    successTimer = null
  }
  window.removeEventListener('user-payment-notification', handlePaymentNotification)
  window.removeEventListener('merchant-payment-notification', handlePaymentNotification)
})
</script>

<style scoped>
/* ... 保留原有样式 ... */

/* 新增支付弹窗相关样式 */
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
  z-index: 200;
}

.modal-container {
  background: white;
  border-radius: 28px;
  width: 600px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #94a3b8;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #ff6700;
}

.modal-body {
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
}

.order-modal-new {
  width: 520px;
  max-width: 90%;
}

.order-product-section {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 16px;
  margin-bottom: 20px;
}

.order-product-img {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.order-product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.order-product-detail {
  flex: 1;
}

.order-product-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.order-product-specs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.order-product-specs span {
  font-size: 12px;
  color: #64748b;
  background: #eef2ff;
  padding: 2px 8px;
  border-radius: 20px;
}

.order-product-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}

.order-product-price .price-label,
.order-product-price .quantity-label {
  font-size: 12px;
  color: #64748b;
}

.order-product-price .price-value {
  font-size: 15px;
  font-weight: 600;
  color: #ff6700;
}

.order-product-total {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e2e8f0;
}

.order-product-total span {
  font-size: 13px;
  color: #64748b;
}

.order-product-total .total-price {
  font-size: 18px;
  font-weight: 700;
  color: #ff6700;
}

.order-address-section {
  margin-bottom: 20px;
  padding: 0 4px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 3px solid #ff6700;
}

.address-content {
  background: #f8fafc;
  border-radius: 12px;
  padding: 12px 16px;
}

.address-line {
  display: flex;
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.address-line:last-child {
  margin-bottom: 0;
}

.address-label {
  width: 70px;
  color: #64748b;
  flex-shrink: 0;
}

.address-line span:last-child {
  color: #1e293b;
  word-break: break-all;
}

.order-payment-section {
  margin-bottom: 8px;
  padding: 0 4px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-option:hover {
  border-color: #ff6700;
  background: #fff7ed;
}

.payment-option.active {
  border-color: #ff6700;
  background: #fff7ed;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.1);
}

.payment-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.payment-option.active .payment-radio {
  border-color: #ff6700;
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff6700;
}

.payment-info {
  flex: 1;
}

.payment-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.payment-desc {
  font-size: 11px;
  color: #94a3b8;
}

.payment-icon {
  font-size: 24px;
  opacity: 0.7;
}

.payment-option.active .payment-icon {
  opacity: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
}

.btn-cancel {
  background: #f1f5f9;
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
  color: #475569;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-confirm {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 10px 28px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.3);
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.35);
}

.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 二维码弹窗样式 */
.qr-modal-new {
  width: 820px;
  max-width: 95%;
  max-height: 90vh;
  overflow: visible;
}

.qr-body-new {
  padding: 28px 32px;
  overflow: visible;
}

.qr-layout {
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
}

.qr-left {
  flex-shrink: 0;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.qr-code {
  margin-bottom: 20px;
}

.qr-code img {
  width: 220px;
  height: 220px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.qr-tips {
  text-align: center;
}

.qr-expire {
  font-size: 14px;
  color: #ff6700;
  font-weight: 500;
  margin-bottom: 10px;
}

.expire-time {
  font-size: 20px;
  font-weight: bold;
  color: #ff6700;
  background: #fff0e6;
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
}

.qr-note {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 8px;
}

.qr-refresh-link {
  margin-top: 12px;
  cursor: pointer;
  font-size: 13px;
}

.refresh-text {
  color: #94a3b8;
}

.refresh-link {
  color: #ff6700;
  font-weight: 500;
  text-decoration: underline;
  margin-left: 4px;
}

.refresh-link:hover {
  color: #ff8533;
}

.qr-right {
  flex: 1;
  min-width: 280px;
}

.order-info-title,
.delivery-info-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ff6700;
  display: inline-block;
}

.order-info-list,
.delivery-info-list {
  border-radius: 20px;
  padding: 18px 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.order-info-item,
.delivery-info-item {
  display: flex;
  margin-bottom: 14px;
  font-size: 14px;
  line-height: 1.5;
}

.order-info-item:last-child,
.delivery-info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  width: 85px;
  color: #64748b;
  flex-shrink: 0;
  font-weight: 500;
}

.info-value {
  flex: 1;
  color: #1e293b;
  word-break: break-all;
}

.order-id {
  font-family: monospace;
  font-size: 13px;
  color: #ff6700;
  letter-spacing: 0.5px;
}

.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e2e8f0;
}

.total-price {
  font-size: 20px;
  font-weight: 700;
  color: #ff6700;
}

.address-text {
  line-height: 1.5;
  word-break: break-word;
}

.qr-footer-center {
  display: flex;
  justify-content: center;
  gap: 50px;
  padding-top: 16px;
  margin-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.qr-footer-center .btn-secondary {
  background: #f1f5f9;
  border: none;
  padding: 12px 32px;
  border-radius: 48px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
  color: #475569;
  font-weight: 500;
}

.qr-footer-center .btn-secondary:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.qr-footer-center .btn-primary {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 12px 36px;
  border-radius: 48px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.qr-footer-center .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 103, 0, 0.4);
}

.qr-code-expired {
  width: 220px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 16px;
  margin-bottom: 20px;
  border: 2px dashed #e2e8f0;
}

.expired-icon {
  font-size: 56px;
  margin-bottom: 12px;
  opacity: 0.6;
}

.expired-text {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.btn-refresh {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 8px 20px;
  border-radius: 40px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.3);
}

.btn-refresh:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.35);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 支付成功动画样式 */
.payment-success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.success-animation {
  background: white;
  border-radius: 32px;
  padding: 48px 56px;
  text-align: center;
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
}

.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4caf50;
}

.icon-line {
  height: 5px;
  background-color: #4caf50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

.icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: iconLineTip 0.75s;
}

.icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: iconLineLong 0.75s;
}

.icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, 0.5);
}

.icon-fix {
  top: 8px;
  left: 26px;
  width: 5px;
  height: 80px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #ffffff;
}

.success-title {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.success-desc {
  font-size: 14px;
  color: #64748b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes iconLineTip {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 25px;
    opacity: 1;
  }
}

@keyframes iconLineLong {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 47px;
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .qr-layout {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .qr-code img {
    width: 180px;
    height: 180px;
  }

  .qr-code-expired {
    width: 180px;
    height: 180px;
  }
}

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

/* 修改订单头部右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 新增：店铺信息容器 */
.shop-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.shop-info:hover {
  opacity: 0.8;
}

/* 新增：店铺logo样式 */
.shop-logo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #f0f0f0;
  background: #f8fafc;
}

/* 修改原有店铺名称样式 */
.shop-name {
  font-weight: 600;
  color: #1f8827;
  font-size: 14px;
  transition: color 0.2s;
}

.shop-info:hover .shop-name,
.delete-btn:hover {
  color: #ff6700;
}

.delete-btn {
  color: #d7352f;
  cursor: pointer;
  font-size: 15px;
  transition: color 0.2s;
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
/* 申请退款按钮（小号） */
.btn-refund-small {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: none;
  padding: 6px 18px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
}

.btn-refund-small:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
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
/* 取消订单按钮 */
.btn-cancel-order {
  background: transparent;
  border: 1px solid #ef4444;
  padding: 6px 18px;
  border-radius: 20px;
  color: #ef4444;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel-order:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
}

/* 取消订单弹窗样式 */
.cancel-modal {
  width: 400px;
  max-width: 90%;
}

.warning-icon {
  background: #fee2e2;
  color: #ef4444;
}

.modal-btn-confirm-cancel {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-btn-confirm-cancel:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
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

/* ========== 优化版退款弹窗样式 ========== */
.refund-modal-optimized {
  width: 560px;
  max-width: 90%;
  border-radius: 24px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.2);
}

.modal-icon {
  width: 22px;
  height: 22px;
  stroke: #ff6700;
  margin-right: 6px;
}

.refund-modal-body {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

/* 商品信息卡片 */
.refund-product-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f8f9fc;
  border-radius: 16px;
  margin-bottom: 24px;
}

.refund-product-card .product-img {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  background: #f0f0f0;
}

.refund-product-card .product-info {
  flex: 1;
}

.refund-product-card .product-name {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  line-height: 1.3;
}

.refund-product-card .product-spec {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.refund-product-card .product-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.refund-product-card .product-price .price {
  font-size: 16px;
  font-weight: 700;
  color: #ff6700;
}

.refund-product-card .product-price .quantity {
  font-size: 13px;
  color: #64748b;
}

/* 表单区块 */
.form-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.required {
  color: #ef4444;
  margin-left: 2px;
}

/* 退款金额显示区域 - 不可编辑 */
.amount-display-group {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 16px;
  background: #f8f9fc;
}

.currency-symbol {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-right: 8px;
}

.amount-display {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #ff6700;
  padding: 14px 0;
  background: transparent;
}

.amount-hint {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
}

/* 退款原因下拉框 */
.reason-select-optimized {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  color: #1e293b;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

.reason-select-optimized:focus {
  border-color: #ff6700;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 103, 0, 0.1);
}

/* 退款说明文本框 */
.desc-textarea-optimized {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  background: #ffffff;
}

.desc-textarea-optimized:focus {
  border-color: #ff6700;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 103, 0, 0.1);
}

.desc-textarea-optimized::placeholder {
  color: #cbd5e1;
}

/* 上传凭证区域 */
.upload-area-optimized {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.upload-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #f8f9fc;
}

.upload-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #ef4444;
}

.upload-btn-optimized {
  width: 80px;
  height: 80px;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: #f8f9fc;
}

.upload-btn-optimized:hover {
  border-color: #ff6700;
  background: #fff7ed;
}

.upload-btn-optimized svg {
  width: 24px;
  height: 24px;
  stroke: #94a3b8;
}

.upload-btn-optimized:hover svg {
  stroke: #ff6700;
}

.upload-btn-optimized span {
  font-size: 11px;
  color: #94a3b8;
}

.upload-btn-optimized small {
  font-size: 9px;
  color: #cbd5e1;
}

/* 退款提示 */
.refund-tip-optimized {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  background: #fef3c7;
  border-radius: 12px;
  margin-top: 8px;
}

.refund-tip-optimized svg {
  width: 18px;
  height: 18px;
  stroke: #d97706;
  flex-shrink: 0;
  margin-top: 1px;
}

.refund-tip-optimized span {
  font-size: 12px;
  color: #92400e;
  line-height: 1.4;
}

/* 底部按钮 */
.modal-footer-optimized {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
  background: #ffffff;
}

.btn-cancel-optimized {
  background: #f1f5f9;
  border: none;
  padding: 10px 28px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #475569;
}

.btn-cancel-optimized:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.btn-submit-optimized {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: none;
  padding: 10px 32px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.btn-submit-optimized:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-submit-optimized:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
