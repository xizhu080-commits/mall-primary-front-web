<template>
  <div class="seller-orders-page">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <!-- 第一行：导航菜单 -->
      <div class="nav-top">
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
            <span>商家中心 | 小米生态商城</span>
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
            <div class="nav-item" @click="goToShopManage">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>店铺管理</span>
            </div>
            <div class="nav-item" @click="goToProductManage">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span>商品管理</span>
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
              <span>订单管理</span>
            </div>
            <div class="nav-item" @click="goToCoupons">
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
                <circle cx="9" cy="12" r="1" />
                <circle cx="15" cy="12" r="1" />
              </svg>
              <span>优惠券管理</span>
            </div>
            <div class="nav-item" @click="goToAfterSales">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 12v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4" />
                <path d="M12 2v12m-4-4 4 4 4-4" />
              </svg>
              <span>售后管理</span>
            </div>
            <div class="nav-item" @click="goToMerchantInfo">
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
              <span>商户信息</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二行：物流、支付、退款、商户头像 -->
      <div class="nav-bottom">
        <div class="nav-bottom-content">
          <div class="user-actions">
            <div class="action-item" @click="openLogisticsModal">
              <svg
                class="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span class="badge" v-if="logisticsCount > 0">{{
                logisticsCount > 99 ? '99+' : logisticsCount
              }}</span>
              <span class="action-label">物流</span>
            </div>
            <div class="action-item" @click="openPaymentModal">
              <svg
                class="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20M22 12H2" />
              </svg>
              <span class="badge" v-if="paymentCount > 0">{{
                paymentCount > 99 ? '99+' : paymentCount
              }}</span>
              <span class="action-label">支付</span>
            </div>
            <div class="action-item" @click="openRefundModal">
              <svg
                class="action-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M21 12a9 9 0 1 1-9-9" />
                <polyline points="12 7 12 12 15 15" />
                <path d="M21 3v6h-6" />
              </svg>
              <span class="badge" v-if="refundCount > 0">{{
                refundCount > 99 ? '99+' : refundCount
              }}</span>
              <span class="action-label">退款</span>
            </div>
            <div class="user-avatar" @click="toggleUserMenu">
              <span class="avatar">商</span>
              <div class="user-dropdown-menu" v-if="userMenuVisible" @click.stop>
                <a href="#" class="dropdown-item" @click.prevent="goToMerchantInfo">商户信息</a>
                <a href="#" class="dropdown-item" @click.prevent="openSettings">账户设置</a>
                <a href="#" class="dropdown-item" @click.prevent="logout">退出登录</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="orders-container">
      <!-- 数据概览卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon order-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 6h18M6 3v3M18 3v3M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
              />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalOrders }}</span>
            <span class="stat-label">总订单数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon revenue-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M22 12H2" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">¥{{ formatMoney(stats.totalRevenue) }}</span>
            <span class="stat-label">总销售额</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon pending-income-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">¥{{ formatMoney(stats.pendingIncome) }}</span>
            <span class="stat-label">待入账销售额</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon shipping-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.shippingCount }}</span>
            <span class="stat-label">待发货</span>
          </div>
        </div>
      </div>

      <!-- 筛选栏 - 店铺筛选 -->
      <div class="filter-bar">
        <div class="filter-group">
          <div
            class="filter-item"
            :class="{ active: shopFilter === 'all' }"
            @click="shopFilter = 'all'"
          >
            全部店铺
          </div>
          <div
            v-for="shop in shopList"
            :key="shop.id"
            class="filter-item"
            :class="{ active: shopFilter === shop.id }"
            @click="shopFilter = shop.id"
          >
            {{ shop.name }}
          </div>
        </div>
        <div class="filter-right">
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
            <input type="text" placeholder="订单号 / 买家昵称 / 手机号" v-model="searchKeyword" />
          </div>
        </div>
      </div>

      <!-- 订单状态导航 -->
      <div class="order-tabs">
        <div class="tabs-left">
          <button
            v-for="tab in orderTabs"
            :key="tab.key"
            class="tab-item"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
            <span v-if="tab.badge && tab.badge > 0" class="badge">{{ tab.badge }}</span>
          </button>
        </div>
        <div class="tabs-right">
          <div class="time-filter">
            <span class="time-label">下单时间：</span>
            <div class="time-btns">
              <button
                class="time-btn"
                :class="{ active: timeFilter === 'today' }"
                @click="timeFilter = 'today'"
              >
                今日
              </button>
              <button
                class="time-btn"
                :class="{ active: timeFilter === 'week' }"
                @click="timeFilter = 'week'"
              >
                近7天
              </button>
              <button
                class="time-btn"
                :class="{ active: timeFilter === 'month' }"
                @click="timeFilter = 'month'"
              >
                近30天
              </button>
              <button
                class="time-btn"
                :class="{ active: timeFilter === 'all' }"
                @click="timeFilter = 'all'"
              >
                全部
              </button>
            </div>
          </div>
          <button class="btn-export" @click="exportOrders">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            导出订单
          </button>
        </div>
      </div>

      <!-- 排序栏 -->
      <div class="sort-bar">
        <div class="sort-group">
          <span class="sort-label">排序：</span>
          <div
            class="sort-item"
            :class="{ active: sortBy === 'createTime' }"
            @click="sortBy = 'createTime'"
          >
            下单时间
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
          </div>
          <div
            class="sort-item"
            :class="{ active: sortBy === 'amount' }"
            @click="sortBy = 'amount'"
          >
            订单金额
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
          </div>
        </div>
        <span class="total-count">共 {{ filteredOrders.length }} 个订单</span>
      </div>

      <!-- 订单列表 -->
      <div class="order-list">
        <div v-for="order in paginatedOrders" :key="order.id" class="order-card">
          <div class="order-header">
            <div class="header-left">
              <span class="order-date">{{ order.createTime }}</span>
              <span class="order-id">订单号：{{ order.suborderId }}</span>
              <span class="shop-tag">{{ order.shopName }}</span>
            </div>
            <div class="header-right">
              <span class="buyer-info">买家：{{ order.userName }} {{ order.receiverPhone }}</span>
              <span class="order-status" :class="getStatusClass(order.status)">
                {{ getStatusText(order.status) }}
              </span>
            </div>
          </div>

          <div class="order-body">
            <div v-for="(product, idx) in order.products" :key="idx" class="product-row">
              <div class="product-info">
                <img :src="product.image" :alt="product.name" />
                <div class="text">
                  <h4>{{ product.name }}</h4>
                  <p class="product-sku">{{ product.sku }}</p>
                </div>
              </div>
              <div class="product-price">¥{{ formatMoney(product.price) }}</div>
              <div class="quantity">x{{ product.quantity }}</div>
              <div class="subtotal">¥{{ formatMoney(product.price * product.quantity) }}</div>
            </div>
          </div>

          <div class="order-footer">
            <div class="footer-info">
              <span>共 {{ order.products.length }} 件商品</span>
              <span class="divider">|</span>
              <span
                >实付 <span class="total-amount">¥{{ formatMoney(order.payAmount) }}</span></span
              >
              <span class="divider">|</span>
              <span>付款方式：{{ order.payType || '在线支付' }}</span>
              <span class="divider">|</span>
              <span>物流：{{ order.logistics?.company || '暂无' }}</span>
              <span class="divider">|</span>
              <span>收货人：{{ order.receiverName }}</span>
              <span class="divider">|</span>
              <span>联系电话：{{ order.receiverPhone || '暂无' }}</span>
              <span class="divider">|</span>
              <span>收货地址：{{ order.address || '暂无' }}</span>
            </div>
            <div class="footer-actions">
              <button
                class="btn-outline-small"
                @click="viewSuborderDetail(order.id, order.suborderId)"
              >
                查看详情
              </button>
              <button class="btn-outline-small" @click="handleTalkToUser(order)">联系客户</button>
              <button
                v-if="order.status === 'pending'"
                class="btn-primary-small"
                @click="confirmOrder(order.id)"
              >
                确认订单
              </button>
              <button
                v-if="order.status === 'paid'"
                class="btn-primary-small"
                @click="shipOrder(order.id)"
              >
                发货
              </button>
              <button
                v-if="order.status === 'shipping'"
                class="btn-outline-small"
                @click="trackOrder(order.id)"
              >
                查看物流
              </button>
              <button
                v-if="order.status === 'completed'"
                class="btn-text"
                @click="viewReview(order.id)"
              >
                查看评价
              </button>
              <button
                v-if="order.status === 'cancelled'"
                class="btn-text"
                @click="viewSuborderDetail(order.id, order.suborderId)"
              >
                查看详情
              </button>
              <button
                v-if="order.status === 'refund'"
                class="btn-refund-handle"
                @click="openRefundDetailModal(order)"
              >
                处理退款
              </button>
            </div>
          </div>
        </div>

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
          <span>等待买家下单吧~</span>
        </div>

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

    <!-- 发货弹窗 -->
    <!-- 发货弹窗 -->
    <!-- 发货弹窗 - 横向长方形布局 -->
    <!-- 发货弹窗 - 卡片式设计 -->
    <div v-if="shipModal.visible" class="modal-overlay" @click.self="closeShipModal">
      <div class="modal-content ship-modal-design">
        <div class="modal-header">
          <div class="header-left">
            <svg
              class="header-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>发货管理</span>
          </div>
          <button class="close-btn" @click="closeShipModal">×</button>
        </div>

        <div class="modal-body-design">
          <!-- 第一行：订单信息 + 收货人信息 -->
          <div class="info-row-group">
            <!-- 订单信息卡片 -->
            <div class="info-card">
              <div class="card-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 6h18M6 3v3M18 3v3M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
                  />
                </svg>
                <span>订单信息</span>
              </div>
              <div class="card-body">
                <div class="info-line">
                  <span class="label">主订单号</span>
                  <span class="value">{{ shipModal.orderInfo?.orderId || '-' }}</span>
                </div>
                <div class="info-line">
                  <span class="label">子订单号</span>
                  <span class="value">{{ shipModal.orderInfo?.suborderId || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- 收货人信息卡片 -->
            <div class="info-card">
              <div class="card-title">
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
                <span>收货人信息</span>
              </div>
              <div class="card-body">
                <div class="info-line">
                  <span class="label">收货人</span>
                  <span class="value">{{ shipModal.consigneeInfo?.name || '-' }}</span>
                </div>
                <div class="info-line">
                  <span class="label">手机号</span>
                  <span class="value">{{ shipModal.consigneeInfo?.phone || '-' }}</span>
                </div>
                <div class="info-line">
                  <span class="label">收货地址</span>
                  <span class="value address">{{ shipModal.consigneeInfo?.address || '-' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 第二行：发货人信息 + 物流信息 -->
          <div class="info-row-group">
            <!-- 发货人信息卡片（可编辑） -->
            <div class="info-card editable-card">
              <div class="card-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
                <span>发货人信息</span>
                <span class="tip">（请填写）</span>
              </div>
              <div class="card-body">
                <div class="form-line">
                  <label>发货人姓名</label>
                  <input
                    type="text"
                    v-model="shipModal.shipperInfo.name"
                    placeholder="请输入发货人姓名"
                  />
                </div>

                <div class="form-line">
                  <label>发货地址</label>
                  <textarea
                    v-model="shipModal.shipperInfo.address"
                    rows="2"
                    placeholder="请输入详细发货地址"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- 物流信息卡片（可编辑） -->
            <div class="info-card editable-card">
              <div class="card-title">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>物流信息</span>
                <span class="tip">（请填写）</span>
              </div>
              <div class="card-body">
                <div class="form-line">
                  <label>物流公司 <span class="required">*</span></label>
                  <select v-model="shipModal.logisticCompanyName">
                    <option value="">请选择物流公司</option>
                    <option value="顺丰速运">顺丰速运</option>
                    <option value="京东快递">京东快递</option>
                    <option value="中通快递">中通快递</option>
                    <option value="圆通速递">圆通速递</option>
                    <option value="韵达快递">韵达快递</option>
                    <option value="邮政EMS">邮政EMS</option>
                    <option value="极兔速递">极兔速递</option>
                  </select>
                </div>
                <div class="form-line">
                  <label>物流公司编号 <span class="required">*</span></label>
                  <input
                    type="text"
                    v-model="shipModal.logisticCompanyId"
                    placeholder="请输入物流公司编号"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer-design">
          <button class="btn-cancel" @click="closeShipModal">取消</button>
          <button class="btn-confirm" @click="submitShipment">确认发货</button>
        </div>
      </div>
    </div>

    <!-- 物流信息弹窗 -->
    <div v-if="logisticsModalVisible" class="modal-overlay" @click.self="closeLogisticsModal">
      <div class="modal-content logistics-modal">
        <div class="modal-header">
          <h3>
            <svg
              class="modal-title-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            物流信息
          </h3>
          <button class="close-btn" @click="closeLogisticsModal">×</button>
        </div>
        <div class="message-body">
          <div class="message-tabs">
            <button
              class="tab-btn"
              :class="{ active: activeLogisticsTab === 'shipping' }"
              @click="activeLogisticsTab = 'shipping'"
            >
              待发货
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeLogisticsTab === 'shipped' }"
              @click="activeLogisticsTab = 'shipped'"
            >
              已发货
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeLogisticsTab === 'all' }"
              @click="activeLogisticsTab = 'all'"
            >
              全部
            </button>
          </div>
          <div class="message-list">
            <div v-for="item in filteredLogisticsList" :key="item.id" class="message-item">
              <div class="message-icon logistics-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                </svg>
              </div>
              <div class="message-content">
                <div class="message-title">订单号：{{ item.orderNo }}</div>
                <div class="message-desc">
                  收货人：{{ item.receiverName }} {{ item.receiverPhone }}
                </div>
                <div class="message-desc">收货地址：{{ item.address }}</div>
                <div class="message-desc" v-if="item.logisticsCompany">
                  物流公司：{{ item.logisticsCompany }}
                </div>
                <div class="message-desc" v-if="item.trackingNo">运单号：{{ item.trackingNo }}</div>
                <div class="message-time" v-if="item.shipTime">发货时间：{{ item.shipTime }}</div>
              </div>
              <div class="message-badge" v-if="item.status === 'pending'">待发货</div>
            </div>
            <div v-if="filteredLogisticsList.length === 0" class="empty-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              </svg>
              <p>暂无物流信息</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付信息弹窗 -->
    <div v-if="paymentModalVisible" class="modal-overlay" @click.self="closePaymentModal">
      <div class="modal-content payment-modal">
        <div class="modal-header">
          <h3>
            <svg
              class="modal-title-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M22 12H2" />
            </svg>
            支付信息
          </h3>
          <button class="close-btn" @click="closePaymentModal">×</button>
        </div>
        <div class="message-body">
          <div class="message-tabs">
            <button
              class="tab-btn"
              :class="{ active: activePaymentTab === 'pending' }"
              @click="activePaymentTab = 'pending'"
            >
              待付款
            </button>
            <button
              class="tab-btn"
              :class="{ active: activePaymentTab === 'completed' }"
              @click="activePaymentTab = 'completed'"
            >
              已付款
            </button>
            <button
              class="tab-btn"
              :class="{ active: activePaymentTab === 'all' }"
              @click="activePaymentTab = 'all'"
            >
              全部
            </button>
          </div>
          <div class="message-list">
            <div v-for="item in filteredPaymentList" :key="item.id" class="message-item">
              <div class="message-icon payment-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M22 12H2" />
                </svg>
              </div>
              <div class="message-content">
                <div class="message-title">订单号：{{ item.orderNo }}</div>
                <div class="message-desc">支付金额：¥{{ formatMoney(item.amount) }}</div>
                <div class="message-desc" v-if="item.paymentMethod">
                  支付方式：{{ item.paymentMethod }}
                </div>
                <div class="message-desc" v-if="item.payTime">支付时间：{{ item.payTime }}</div>
                <div class="message-desc" v-if="item.transactionId">
                  交易流水号：{{ item.transactionId }}
                </div>
              </div>
              <div
                class="message-badge"
                :class="item.status === 'pending' ? 'badge-warning' : 'badge-success'"
              >
                {{ item.status === 'pending' ? '待付款' : '已付款' }}
              </div>
            </div>
            <div v-if="filteredPaymentList.length === 0" class="empty-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20M22 12H2" />
              </svg>
              <p>暂无支付信息</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 退款详情弹窗 - 横向设计（适配API数据） -->
    <div
      v-if="refundDetailModalVisible"
      class="modal-overlay-new"
      @click.self="closeRefundDetailModal"
    >
      <div class="refund-dialog-horizontal">
        <!-- 左侧装饰区 -->
        <div class="dialog-sidebar" :class="getRefundStatusClass(currentRefundOrder?.status)">
          <div class="sidebar-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M21 12a9 9 0 1 1-9-9" />
              <polyline points="12 7 12 12 15 15" />
              <path d="M21 3v6h-6" />
            </svg>
          </div>
          <div class="sidebar-text">
            <span>退款</span>
            <span>详情</span>
          </div>
          <div class="sidebar-status">{{ getRefundStatusText(currentRefundOrder?.status) }}</div>
        </div>

        <!-- 右侧内容区 -->
        <div class="dialog-main">
          <div class="dialog-header-horizontal">
            <div class="header-left">
              <h2>退款申请</h2>
              <p>退款ID：{{ currentRefundOrder?.refundId || '暂无' }}</p>
            </div>
            <button class="close-btn-horizontal" @click="closeRefundDetailModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="dialog-body-horizontal" v-if="currentRefundOrder">
            <!-- 商品区域 -->
            <div class="product-section-horizontal">
              <div class="product-image-large">
                <img
                  v-if="currentRefundOrder.productUrl"
                  :src="currentRefundOrder.productUrl"
                  class="product-img-large"
                  @error="handleImageError"
                />
                <div v-else class="product-img-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>
              <div class="product-detail-large">
                <div class="product-name-large">
                  {{ currentRefundOrder.productName || '商品名称' }}
                </div>
                <div class="product-spec-large" v-if="currentRefundOrder.spec">
                  <span
                    v-for="(value, key) in parseSpecObject(currentRefundOrder.spec)"
                    :key="key"
                    class="spec-tag"
                  >
                    {{ key }}：{{ value }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 退款金额区域 -->
            <div class="amount-section-horizontal">
              <div class="amount-label-horizontal">
                <span>退款金额</span>
                <span class="amount-note-horizontal">（原路返回）</span>
              </div>
              <div class="amount-value-horizontal">
                <span class="currency">¥</span>
                <span class="value">{{
                  formatMoney(parseFloat(currentRefundOrder.refundAmount || 0))
                }}</span>
              </div>
            </div>

            <!-- 退款原因区域 -->
            <div class="refund-reason-section-horizontal">
              <div class="reason-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none" />
                </svg>
                <span>退款原因</span>
              </div>
              <div class="reason-content">{{ currentRefundOrder.refundReason || '暂无' }}</div>
            </div>

            <!-- 信息网格 -->
            <div class="info-grid-horizontal">
              <div class="info-item-horizontal">
                <span class="item-label">订单编号</span>
                <span class="item-value">{{ currentRefundOrder.orderId || '暂无' }}</span>
              </div>
              <div class="info-item-horizontal">
                <span class="item-label">子订单号</span>
                <span class="item-value">{{ currentRefundOrder.suborderId || '暂无' }}</span>
              </div>
              <div class="info-item-horizontal">
                <span class="item-label">收货人</span>
                <span class="item-value">{{ currentRefundOrder.receiverName || '暂无' }}</span>
              </div>
              <div class="info-item-horizontal">
                <span class="item-label">联系电话</span>
                <span class="item-value">{{ currentRefundOrder.receiverPhone || '暂无' }}</span>
              </div>
              <div class="info-item-horizontal">
                <span class="item-label">收货地址</span>
                <span class="item-value">{{ currentRefundOrder.address || '暂无' }}</span>
              </div>
              <div class="info-item-horizontal">
                <span class="item-label">支付方式</span>
                <span class="item-value">支付宝</span>
              </div>
            </div>
          </div>

          <div class="dialog-footer-horizontal">
            <button
              class="btn-reject-horizontal"
              @click="openRejectReason"
              :disabled="refundProcessing"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              拒绝退款
            </button>
            <button
              class="btn-agree-horizontal"
              @click="handleRefundAction(true)"
              :disabled="refundProcessing"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {{ refundProcessing ? '处理中...' : '同意退款' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 拒绝退款弹窗 -->
    <div v-if="rejectModalVisible" class="modal-overlay-new" @click.self="closeRejectModal">
      <div class="reject-dialog-horizontal">
        <div class="dialog-sidebar reject-sidebar">
          <div class="sidebar-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div class="sidebar-text">
            <span>拒绝</span>
            <span>退款</span>
          </div>
        </div>

        <div class="dialog-main">
          <div class="dialog-header-horizontal">
            <div class="header-left">
              <h2>拒绝退款</h2>
              <p>请填写拒绝原因，以便买家了解情况</p>
            </div>
            <button class="close-btn-horizontal" @click="closeRejectModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="dialog-body-horizontal">
            <div class="textarea-wrapper-horizontal">
              <textarea
                v-model="rejectReason"
                rows="4"
                placeholder="请详细说明拒绝退款的原因..."
                class="reject-textarea-horizontal"
                maxlength="200"
              ></textarea>
              <div class="char-count-horizontal">{{ rejectReason.length }}/200</div>
            </div>
          </div>

          <div class="dialog-footer-horizontal reject-footer-horizontal">
            <button class="btn-cancel-horizontal" @click="closeRejectModal">取消</button>
            <button
              class="btn-confirm-reject-horizontal"
              @click="handleRefundAction(false)"
              :disabled="refundProcessing"
            >
              {{ refundProcessing ? '处理中...' : '确认拒绝' }}
            </button>
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
    <!-- Toast 提示 -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { get_merchant_info } from '@/api/merchant'
import { ship } from '@/api/logistic'
import { getOrCreateSession } from '@/api/message'
import { handleRefund, getRefundDetail } from '@/api/refund'
const router = useRouter()

// === 状态管理 ===
const activeTab = ref('all')
const searchKeyword = ref('')
const timeFilter = ref('month')
const sortBy = ref('createTime')
const currentPage = ref(1)
const loading = ref(false)
const shopFilter = ref('all')

// 统计数据
const stats = reactive({
  totalOrders: 0,
  totalRevenue: 0,
  pendingIncome: 0,
  shippingCount: 0,
  pendingCount: 0,
})

// 订单数据
const orders = ref([])

// 店铺列表 - 从后端获取
const shopList = ref([])

// 物流/支付/退款信息
const userMenuVisible = ref(false)
const logisticsModalVisible = ref(false)
const activeLogisticsTab = ref('all')
const logisticsList = ref([])
const paymentModalVisible = ref(false)
const activePaymentTab = ref('all')
const paymentList = ref([])
const refundModalVisible = ref(false)
const activeRefundTab = ref('all')
const refundList = ref([])

// 退款详情弹窗状态
const refundDetailModalVisible = ref(false)
const currentRefundOrder = ref(null)
const rejectModalVisible = ref(false)
const rejectReason = ref('')
const refundProcessing = ref(false)

// 计算数量
const logisticsCount = computed(
  () => logisticsList.value.filter((l) => l.status === 'pending').length,
)
const paymentCount = computed(() => paymentList.value.filter((p) => p.status === 'pending').length)
const refundCount = computed(() => refundList.value.filter((r) => r.status === 'pending').length)

// 筛选后的列表
const filteredLogisticsList = computed(() => {
  let result = [...logisticsList.value]
  if (activeLogisticsTab.value === 'shipping') {
    result = result.filter((l) => l.status === 'pending')
  } else if (activeLogisticsTab.value === 'shipped') {
    result = result.filter((l) => l.status === 'shipped')
  }
  return result
})

const filteredPaymentList = computed(() => {
  let result = [...paymentList.value]
  if (activePaymentTab.value === 'pending') {
    result = result.filter((p) => p.status === 'pending')
  } else if (activePaymentTab.value === 'completed') {
    result = result.filter((p) => p.status === 'paid')
  }
  return result
})

const filteredRefundList = computed(() => {
  let result = [...refundList.value]
  if (activeRefundTab.value === 'pending') {
    result = result.filter((r) => r.status === 'pending')
  } else if (activeRefundTab.value === 'processing') {
    result = result.filter((r) => r.status === 'processing')
  } else if (activeRefundTab.value === 'completed') {
    result = result.filter((r) => r.status === 'completed')
  }
  return result
})

const getRefundStatusText = (status) => {
  // 支持字符串状态（退款列表）和数字状态（退款详情API）
  const map = {
    // 字符串状态
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    rejected: '已拒绝',
    // 数字状态（退款详情API返回）
    0: '退款中',
    1: '退款成功',
    2: '退款失败',
  }
  return map[status] || map[String(status)] || status
}

const getRefundBadgeClass = (status) => {
  const map = {
    pending: 'badge-warning',
    processing: 'badge-info',
    completed: 'badge-success',
    rejected: 'badge-danger',
  }
  return map[status] || ''
}

// 弹窗控制
const openLogisticsModal = () => {
  logisticsModalVisible.value = true
  activeLogisticsTab.value = 'all'
}
const closeLogisticsModal = () => {
  logisticsModalVisible.value = false
}
const openPaymentModal = () => {
  paymentModalVisible.value = true
  activePaymentTab.value = 'all'
}
const closePaymentModal = () => {
  paymentModalVisible.value = false
}
const openRefundModal = () => {
  refundModalVisible.value = true
  activeRefundTab.value = 'pending'
}
const closeRefundModal = () => {
  refundModalVisible.value = false
}
const openSettings = () => {
  showMessage('设置功能开发中...')
}

const toggleUserMenu = () => {
  userMenuVisible.value = !userMenuVisible.value
}

const handleClickOutside = (e) => {
  const userAvatar = document.querySelector('.user-avatar')
  if (userAvatar && !userAvatar.contains(e.target)) {
    userMenuVisible.value = false
  }
}

const logout = () => {
  showMessage('正在退出登录...')
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}

// Toast 状态
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

// 获取后端数据
const fetchMerchantData = async () => {
  loading.value = true
  try {
    const response = await get_merchant_info()
    if (response.code === 200) {
      const data = response.data

      // 获取店铺列表
      if (data.shopList && data.shopList.length > 0) {
        shopList.value = data.shopList
      } else if (data.allSuborderList) {
        const uniqueShops = new Set()
        data.allSuborderList.forEach((item) => {
          if (item.shopName) uniqueShops.add(item.shopName)
        })
        shopList.value = Array.from(uniqueShops).map((name, index) => ({
          id: `shop_${index}`,
          name: name,
        }))
      }

      stats.totalOrders = data.totalCount || data.allSuborderList?.length || 0
      stats.totalRevenue = data.totalRevenue || 0
      stats.pendingIncome = data.pendingIncome || 0
      stats.shippingCount = data.shippingCount || 0
      stats.pendingCount = data.pendingCount || 0

      const suborderList = data.allSuborderList || []
      const statusMap = {
        1: 'pending',
        2: 'paid',
        3: 'shipping',
        4: 'completed',
        5: 'refund',
        6: 'refund',
      }

      const orderList = suborderList.map((item) => ({
        id: item.suborderId,
        suborderId: item.suborderId,
        orderId: item.orderId,
        userId: item.userId,
        shopId: item.shopId,
        createTime: item.createTime || '',
        shopName: item.shopName || '小米官方旗舰店',
        userName: item.userName || '',
        receiverPhone: item.receiverPhone || '',
        status: statusMap[item.status] || 'pending',
        totalAmount: item.payAmount || item.price || 0,
        paymentMethod: item.payType || '在线支付',
        shippingAddress: item.address || '',
        receiverName: item.receiverName || item.userName || '',
        receiverAddress: item.address || '',
        address: item.address || '',
        remark: item.remark || '',
        // 商品信息（用于退款弹窗显示）
        productName: item.productName || '',
        price: item.price || 0,
        payAmount: item.payAmount || item.price || 0,
        // 退款相关字段
        refundReason: item.refundReason || '',
        refundDesc: item.refundDesc || '',
        refundAmount: item.refundAmount || item.payAmount || item.price || 0,
        products: [
          {
            name: item.productName || '',
            sku: item.specData || '',
            price: item.price || 0,
            quantity: 1,
            image:
              item.productUrl ||
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/carousel/phone-15-pro.png',
          },
        ],
        logistics: item.logisticCompanyName
          ? {
              company: item.logisticCompanyName,
              logisticCompanyId: item.logisticId || '',
              shipTime: item.updateTime,
            }
          : null,
      }))

      orders.value = orderList

      logisticsList.value = orderList
        .filter((o) => o.status === 'paid' || o.status === 'shipping')
        .map((o) => ({
          suborderId: o.suborderId,
          receiverName: o.receiverName,
          receiverPhone: o.receiverPhone,
          address: o.shippingAddress,
          status: o.status === 'shipping' ? 'shipped' : 'pending',
          logisticCompanyName: o.logistic?.companyName,
          logisticCompanyId: o.logistic?.logisticId,
          shipTime: o.logistic?.shipTime,
        }))

      paymentList.value = orderList.map((o) => ({
        orderId: o.orderId,
        amount: o.totalAmount,
        status:
          o.status === 'pending' ? 'pending' : o.status !== 'cancelled' ? 'paid' : 'cancelled',
        paymentMethod: o.paymentMethod,
        payTime: o.payTime || '',
        transactionId: o.transactionId,
        expireTime: o.expireTime,
      }))

      refundList.value = orderList
        .filter((o) => o.status === 'refund')
        .map((o) => ({
          id: o.id,
          orderNo: o.orderNo,
          refundAmount: o.totalAmount,
          refundReason: o.refundReason || '买家申请退款',
          refundDesc: o.refundDesc || '',
          applyTime: o.refundApplyTime || o.createTime,
          status: o.refundStatus || 'pending',
        }))

      updateStats()
    } else {
      showMessage(response.message || '获取数据失败', true)
    }
  } catch (error) {
    console.error('获取商家信息失败:', error)
    showMessage('网络错误，无法获取订单信息', true)
  } finally {
    loading.value = false
  }
}

const updateStats = () => {
  const all = orders.value
  stats.totalOrders = all.length
  stats.totalRevenue = all.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  stats.pendingIncome = all
    .filter((o) => o.status === 'paid' || o.status === 'shipping')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  stats.pendingCount = all.filter((o) => o.status === 'pending').length
  stats.shippingCount = all.filter((o) => o.status === 'paid').length
}

// 订单Tab配置
const orderTabs = computed(() => [
  { key: 'all', label: '全部订单', badge: null },
  { key: 'pending', label: '待确认', badge: stats.pendingCount },
  { key: 'paid', label: '待发货', badge: stats.shippingCount },
  { key: 'shipping', label: '已发货', badge: null },
  { key: 'completed', label: '已完成', badge: null },
  { key: 'refund', label: '退款/售后', badge: refundList.value.length },
])

// 筛选后的订单
const filteredOrders = computed(() => {
  let result = [...orders.value]

  if (shopFilter.value !== 'all') {
    const selectedShop = shopList.value.find((s) => s.id === shopFilter.value)
    if (selectedShop) {
      result = result.filter((o) => o.shopName === selectedShop.name)
    }
  }

  if (activeTab.value !== 'all') {
    result = result.filter((o) => o.status === activeTab.value)
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(
      (o) =>
        (o.orderNo && o.orderNo.toLowerCase().includes(keyword)) ||
        (o.buyerName && o.buyerName.toLowerCase().includes(keyword)) ||
        (o.buyerPhone && o.buyerPhone.includes(keyword)),
    )
  }

  const now = new Date()
  if (timeFilter.value === 'today') {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    result = result.filter((o) => new Date(o.createTime) >= today)
  } else if (timeFilter.value === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    result = result.filter((o) => new Date(o.createTime) >= weekAgo)
  } else if (timeFilter.value === 'month') {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    result = result.filter((o) => new Date(o.createTime) >= monthAgo)
  }

  if (sortBy.value === 'createTime') {
    result.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
  } else if (sortBy.value === 'amount') {
    result.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0))
  }

  return result
})

// 分页
const pageSize = 5
const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize))
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredOrders.value.slice(start, start + pageSize)
})

watch([activeTab, searchKeyword, timeFilter, sortBy, shopFilter], () => {
  currentPage.value = 1
})

const getStatusText = (status) => {
  const map = {
    pending: '待确认',
    paid: '待发货',
    shipping: '已发货',
    completed: '已完成',
    cancelled: '已取消',
    refund: '退款中',
  }
  return map[status] || status
}

const getStatusClass = (status) => {
  const map = {
    pending: 'status-pending',
    paid: 'status-paid',
    shipping: 'status-shipping',
    completed: 'status-completed',
    refund: 'status-refund',
  }
  return map[status] || ''
}

const formatMoney = (val) => (val === undefined || val === null ? '0.00' : val.toFixed(2))

// 处理图片加载错误
const handleImageError = (e) => {
  e.target.style.display = 'none'
  const placeholder = e.target.parentElement.querySelector('.product-image-placeholder')
  if (placeholder) {
    placeholder.style.display = 'flex'
  }
}

// 解析规格JSON
const parseSpec = (spec) => {
  try {
    const obj = typeof spec === 'string' ? JSON.parse(spec) : spec
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('，')
  } catch {
    return spec
  }
}

// 退款详情状态样式
const getRefundStatusClass = (status) => {
  const map = {
    0: 'status-pending',
    1: 'status-success',
    2: 'status-failed',
  }
  return map[status] || ''
}

// 操作函数
const viewSuborderDetail = (orderId, suborderId) => {
  router.push(`/order/suborder/detail/${suborderId}`)
}
const confirmOrder = (id) => {
  const order = orders.value.find((o) => o.id === id)
  if (order && order.status === 'pending') {
    order.status = 'paid'
    updateStats()
    showMessage('订单已确认，请及时发货')
  }
}
//=====================================================================发货==========================================================================
// 发货弹窗
const shipModal = reactive({
  visible: false,
  orderId: null,
  suborderId: null,
  logisticCompanyName: '',
  logisticCompanyId: '',
  // 订单信息（自动填入）
  orderInfo: {
    orderNo: '',
    suborderId: '',
  },
  // 收货人信息（自动填入）
  consigneeInfo: {
    name: '',
    phone: '',
    address: '',
  },
  // 发货人信息（商家填写，支持记忆上一次填写的内容）
  shipperInfo: {
    name: '',
    phone: '',
    address: '',
  },
})
// 修改 shipOrder 函数，填入订单信息和收货人信息
const shipOrder = (id) => {
  const order = orders.value.find((o) => o.id === id)
  if (order) {
    console.log('点击发货，订单数据:', JSON.stringify(order, null, 2))
    // 填入订单信息
    shipModal.orderId = id
    shipModal.suborderId = order.suborderId || id
    shipModal.orderInfo = {
      orderId: order.orderId || '',
      suborderId: order.suborderId || id,
    }
    // 填入收货人信息
    shipModal.consigneeInfo = {
      name: order.receiverName || order.userName || '',
      phone: order.receiverPhone || '',
      address: order.address || '',
    }
    // 重置物流信息
    shipModal.logisticCompanyName = ''
    shipModal.logisticCompanyId = ''
    shipModal.visible = true
  }
}

// 修改 submitShipment 函数，调用 ship API
// 修改 submitShipment 函数
const submitShipment = async () => {
  // 验证必填项
  if (!shipModal.logisticCompanyName) {
    showMessage('请选择物流公司', true)
    return
  }
  if (!shipModal.logisticCompanyId) {
    showMessage('请填写运单号', true)
    return
  }
  if (!shipModal.shipperInfo.name) {
    showMessage('请填写发货人姓名', true)
    return
  }
  if (!shipModal.shipperInfo.address) {
    showMessage('请填写发货地址', true)
    return
  }

  const order = orders.value.find((o) => o.id === shipModal.orderId)
  if (!order) {
    showMessage('订单不存在', true)
    return
  }

  if (order.status !== 'paid') {
    showMessage('订单状态已变更，无法发货', true)
    closeShipModal()
    return
  }

  try {
    // 保存发货人信息供下次使用
    saveShipperInfo()
    console.log('请求发货中')
    // 调用发货接口
    const shipData = {
      orderId: shipModal.orderInfo.orderId,
      suborderId: shipModal.suborderId,
      logisticCompanyId: shipModal.logisticCompanyId,
      logisticCompanyName: shipModal.logisticCompanyName,
      shipperId: order.shopId,
      shipper: shipModal.shipperInfo.name,
      shipperAddress: shipModal.shipperInfo.address,
      consigneeId: order.userId || '',
      consignee: shipModal.consigneeInfo.name,
      consigneePhone: shipModal.consigneeInfo.phone,
      consigneeAddress: shipModal.consigneeInfo.address,
    }
    console.log('发货数据:', JSON.stringify(shipData, null, 2))
    console.log('订单详情:', {
      orderId: order.orderId,
      suborderId: order.suborderId,
      userId: order.userId,
      shopId: order.shopId,
      orderStatus: order.status,
    })

    const response = await ship(shipData)

    if (response.code === 200) {
      // 更新本地订单状态
      order.status = 'shipping'
      order.logistics = {
        company: shipModal.logisticCompanyName,
        logisticCompanyId: shipModal.logisticCompanyId,
        shipTime: new Date().toLocaleString(),
      }
      updateStats()
      showMessage('发货成功，已通知买家')
      closeShipModal()
    } else {
      showMessage(response.message || '发货失败，请重试', true)
    }
  } catch (error) {
    console.error('发货失败:', error)
    showMessage('网络错误，发货失败', true)
  }
}

// 加载上次保存的发货人信息
const loadShipperInfo = () => {
  const saved = localStorage.getItem('merchant_shipper_info')
  if (saved) {
    try {
      const info = JSON.parse(saved)
      shipModal.shipperInfo.name = info.name || ''
      shipModal.shipperInfo.address = info.address || ''
    } catch (e) {}
  }
}

// 保存发货人信息
const saveShipperInfo = () => {
  if (shipModal.shipperInfo.name || shipModal.shipperInfo.address) {
    localStorage.setItem(
      'merchant_shipper_info',
      JSON.stringify({
        name: shipModal.shipperInfo.name,
        address: shipModal.shipperInfo.address,
      }),
    )
  }
}
// 关闭弹窗
const closeShipModal = () => {
  shipModal.visible = false
  shipModal.orderId = null
  // 不清空发货人信息，保留用于下次
}

const trackOrder = (id) => {
  const order = orders.value.find((o) => o.id === id)
  order?.logistics
    ? showMessage(`物流信息：${order.logistics.company}，运单号：${order.logistics.trackingNo}`)
    : showMessage('暂无物流信息')
}
const viewReview = (id) => {
  showMessage('查看买家评价')
}
const exportOrders = () => {
  showMessage('订单导出中...')
}

// 导航函数
const goToHome = () => {
  router.push('/')
}
const goToOrders = () => {}
const goToProductManage = () => {
  router.push('/merchant/productManage')
}
const goToShopManage = () => {
  router.push('/merchant/shopManage')
}
const goToAfterSales = () => {
  router.push('/merchant/after-sale')
}
const goToCoupons = () => {
  router.push('/coupon/manage')
}
const goToMerchantInfo = () => {
  router.push(
    '/merchant/detail/' +
      (localStorage.getItem('identityId') || sessionStorage.getItem('identityId')),
  )
}
const handleTalkToUser = async (order) => {
  if (!order) {
    showMessage('订单信息不存在', true)
    return
  }

  const data = {
    partnerId: order.userId,
    partnerName: order.userName || order.receiverName || '客户',
    partnerAvatar:
      order.userAvatar ||
      'https://storage.360buyimg.com/default.image/6a645f6465665f696d675f393836323131373632333134353935323236_sma.jpg',
    partnerType: 'USER',
    shopId: order.shopId,
  }

  console.log('[订单列表] 联系客户参数:', data)
  showMessage('正在联系客户...')

  try {
    const response = await getOrCreateSession(data)
    console.log('[订单列表] 获取会话信息响应:', response)
    console.log('[订单列表] 响应code:', response?.code)
    console.log('[订单列表] 响应data:', response?.data)

    if (response?.code === 200 && response?.data) {
      const sessionData = response.data
      console.log('[订单列表] 会话数据:', sessionData)

      // 确保sessionId存在
      if (!sessionData.sessionId) {
        console.error('[订单列表] sessionId不存在，响应数据:', sessionData)
        showMessage('获取会话信息失败，sessionId不存在', true)
        return
      }

      // 使用与商家组件监听的事件名一致
      const event = new CustomEvent('open-merchantChatToUser-session', { detail: sessionData })
      window.dispatchEvent(event)
      showMessage('正在打开聊天窗口...')
    } else {
      console.error('[订单列表] 获取会话信息失败，响应:', response)
      showMessage(response?.msg || response?.message || '获取会话信息失败', true)
    }
  } catch (error) {
    console.error('[订单列表] 联系客户异常:', error)
    showMessage('网络错误，请稍后重试', true)
  }
}

// 打开退款详情弹窗
// 打开退款详情弹窗
const openRefundDetailModal = async (order) => {
  showMessage('正在获取退款信息...')
  refundDetailModalVisible.value = true
  try {
    // 调用API获取详细退款信息
    const response = await getRefundDetail({
      suborderId: order.suborderId,
      orderId: order.orderId,
      userId: order.userId,
    })

    console.log('==========================[退款详情] API响应:', response)

    if (response?.code === 200 && response?.data) {
      // 合并API返回的数据
      currentRefundOrder.value = {
        refundId: response.data.refundId,
        suborderId: response.data.suborderId,
        orderId: response.data.orderId,
        refundAmount: response.data.refundAmount,
        refundReason: response.data.refundReason,
        status: response.data.status, // ✅
        receiverName: response.data.receiverName,
        receiverPhone: response.data.receiverPhone,
        address: response.data.address, // ✅
        productName: response.data.productName,
        spec: response.data.spec, // ✅
        productUrl: response.data.productUrl,
      }
      console.log('[退款详情] 更新后的数据:', currentRefundOrder.value)
    }
  } catch (error) {
    console.error('[退款详情] 获取退款详情失败:', error)
    // 即使API失败，弹窗仍然显示已有的订单信息
  }
}

// 关闭退款详情弹窗
const closeRefundDetailModal = () => {
  refundDetailModalVisible.value = false
  currentRefundOrder.value = null
}

// 打开拒绝原因弹窗
const openRejectReason = () => {
  rejectModalVisible.value = true
}

// 关闭拒绝原因弹窗
const closeRejectModal = () => {
  rejectModalVisible.value = false
  rejectReason.value = ''
}

// 处理退款（同意或拒绝）
const handleRefundAction = async (isAgree) => {
  if (!currentRefundOrder.value) {
    showMessage('订单信息不存在', true)
    return
  }

  if (!isAgree && !rejectReason.value.trim()) {
    showMessage('请输入拒绝原因', true)
    return
  }

  try {
    console.log(
      '退款申请ID:',
      currentRefundOrder.value.refundId,
      '子订单:',
      currentRefundOrder.value.suborderId,
      '主订单:',
      currentRefundOrder.value.orderId,
      '是否同意:',
      isAgree,
      '拒绝原因:',
      rejectReason.value,
    )
    const response = await handleRefund({
      refundId: currentRefundOrder.value.refundId,
      isAgree: isAgree,
      suborderId: currentRefundOrder.value.suborderId,
      orderId: currentRefundOrder.value.orderId,
      rejectReason: isAgree ? '' : rejectReason.value,
    })

    console.log('[退款处理]==================== API响应:', response)

    if (response.code === 200) {
      refundProcessing.value = true
      // 更新本地订单状态
      const orderIndex = orders.value.findIndex(
        (o) => o.suborderId === currentRefundOrder.value.suborderId,
      )
      if (orderIndex !== -1) {
        if (isAgree) {
          orders.value[orderIndex].status = 'refund'
          showMessage('已同意退款')
        } else {
          orders.value[orderIndex].status = 'completed'
          showMessage('已拒绝退款')
        }
      }

      closeRefundDetailModal()
      closeRejectModal()
    } else {
      showMessage(response.message || '处理失败，请重试', true)
    }
  } catch (error) {
    console.error('[退款处理] 异常:', error)
    showMessage('网络错误，请重试', true)
  } finally {
    refundProcessing.value = false
  }
}
// 解析规格JSON对象（返回对象格式）
const parseSpecObject = (spec) => {
  try {
    if (typeof spec === 'string') {
      return JSON.parse(spec)
    }
    return spec || {}
  } catch (e) {
    return {}
  }
}
onMounted(() => {
  fetchMerchantData()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.seller-orders-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f2f5 0%, #e8ecf1 100%);
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 第一行 */
.nav-top {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.nav-content {
  max-width: 1400px;
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
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(255, 103, 0, 0.3);
}

.logo-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.logo span {
  background: linear-gradient(135deg, #ff6700, #ffaa66);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-links {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a0aec0;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 40px;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ff8533;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(255, 103, 0, 0.2), rgba(255, 133, 51, 0.1));
  color: #ff8533;
}

/* 第二行 */
.nav-bottom {
  padding: 8px 0;
}

.nav-bottom-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-item {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 40px;
  transition: all 0.2s;
  color: #a0aec0;
}

.action-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ff8533;
}

.action-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
}

.action-label {
  font-size: 12px;
}

.user-avatar {
  position: relative;
  cursor: pointer;
  margin-left: 8px;
}

.avatar {
  display: inline-flex;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
  font-size: 14px;
}

.user-dropdown-menu {
  position: absolute;
  top: 45px;
  right: 0;
  background: #1a1a2e;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 140px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  text-decoration: none;
  color: #a0aec0;
  font-size: 0.85rem;
  transition: 0.1s;
  cursor: pointer;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ff8533;
}

/* 徽章 */
.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: white;
  font-size: 0.55rem;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 20px;
  min-width: 16px;
  text-align: center;
  line-height: 1;
}

/* 主容器 */
.orders-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 24px;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-icon {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  color: #0284c7;
}
.revenue-icon {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #16a34a;
}
.pending-income-icon {
  background: linear-gradient(135deg, #ffedd5, #fed7aa);
  color: #ea580c;
}
.shipping-icon {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #4f46e5;
}

.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
}
.stat-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}

/* 筛选栏 */
.filter-bar {
  background: #ffffff;
  border-radius: 16px;
  padding: 12px 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.filter-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-item {
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 30px;
  transition: all 0.2s;
  background: #f1f5f9;
}

.filter-item:hover {
  background: #e2e8f0;
  color: #ff6700;
}
.filter-item.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
}

.filter-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f1f5f9;
  padding: 8px 18px;
  border-radius: 40px;
  transition: all 0.2s;
}
.search-box:focus-within {
  background: #ffffff;
  box-shadow: 0 0 0 2px #ff6700;
}
.search-box svg {
  color: #94a3b8;
}
.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  width: 220px;
}

/* 订单状态标签栏 */
.order-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  padding: 6px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
  gap: 12px;
}

.tabs-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-item {
  background: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  border-radius: 40px;
  transition: all 0.2s;
}

.tab-item:hover {
  background: #f1f5f9;
  color: #ff6700;
}
.tab-item.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.3);
}

.tab-item .badge {
  position: static;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 8px;
  display: inline-block;
}

.tabs-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* 时间筛选 */
.time-filter {
  display: flex;
  align-items: center;
  gap: 12px;
}
.time-label {
  font-size: 13px;
  color: #64748b;
}
.time-btns {
  display: flex;
  gap: 8px;
}
.time-btn {
  background: #f1f5f9;
  border: none;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
  color: #475569;
}
.time-btn:hover {
  background: #e2e8f0;
}
.time-btn.active {
  background: #ff6700;
  color: white;
}

.btn-export {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
}
.btn-export:hover {
  border-color: #ff6700;
  color: #ff6700;
  background: #fff7ed;
}

/* 排序栏 */
.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0 16px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 16px;
}
.sort-label {
  font-size: 13px;
  color: #64748b;
}
.sort-item {
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.sort-item:hover {
  color: #ff6700;
}
.sort-item.active {
  color: #ff6700;
  font-weight: 500;
}
.total-count {
  font-size: 13px;
  color: #94a3b8;
}

/* 订单列表 */
.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.order-card {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.order-card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.order-header {
  background: #fafbfc;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 12px;
}
.header-left {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #64748b;
  flex-wrap: wrap;
  align-items: center;
}
.order-date {
  font-weight: 500;
}
.order-id {
  color: #94a3b8;
  font-family: monospace;
}
.shop-tag {
  background: #f1f5f9;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: #475569;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.buyer-info {
  color: #475569;
  font-size: 13px;
}
.order-status {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 30px;
}
.status-pending {
  background: #fef3c7;
  color: #d97706;
}
.status-paid {
  background: #fee2e2;
  color: #dc2626;
}
.status-shipping {
  background: #dbeafe;
  color: #2563eb;
}
.status-completed {
  background: #dcfce7;
  color: #16a34a;
}
.status-refund {
  background: #f3e8ff;
  color: #9333ea;
}

.order-body {
  padding: 0 24px;
}
.product-row {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}
.product-row:last-child {
  border-bottom: none;
}
.product-info {
  flex: 3;
  display: flex;
  gap: 16px;
  align-items: center;
}
.product-info img {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  background: #f8fafc;
}
.product-info .text h4 {
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 4px;
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
  width: 70px;
  text-align: center;
  font-size: 14px;
  color: #64748b;
}
.subtotal {
  width: 110px;
  text-align: right;
  font-weight: 600;
  color: #1e293b;
}

.order-footer {
  background: #fafbfc;
  padding: 14px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}
.footer-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.footer-info {
  font-size: 13px;
  color: #64748b;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.total-amount {
  font-size: 16px;
  font-weight: 700;
  color: #ff6700;
}
.divider {
  color: #e2e8f0;
}

.btn-outline-small {
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 6px 18px;
  border-radius: 30px;
  font-size: 12px;
  cursor: pointer;
}
.btn-outline-small:hover {
  border-color: #ff6700;
  color: #ff6700;
}

.btn-primary-small {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 6px 20px;
  border-radius: 30px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.btn-primary-small:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.btn-text {
  background: none;
  border: none;
  color: #64748b;
  font-size: 12px;
  cursor: pointer;
  padding: 6px 12px;
}
.btn-text:hover {
  color: #ff6700;
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
  border-radius: 24px;
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

/* 弹窗 */
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
.modal-content {
  background: white;
  border-radius: 28px;
  width: 420px;
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
  display: flex;
  align-items: center;
  gap: 8px;
}
.modal-title-icon {
  width: 22px;
  height: 22px;
  stroke: #ff6700;
}
.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #94a3b8;
}
.modal-body {
  padding: 24px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 8px;
}
.form-group select,
.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 14px;
  outline: none;
}
.form-group select:focus,
.form-group input:focus {
  border-color: #ff6700;
  box-shadow: 0 0 0 2px rgba(255, 103, 0, 0.1);
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
}
.btn-secondary {
  background: #f1f5f9;
  border: none;
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 13px;
  cursor: pointer;
}
.btn-primary {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 8px 24px;
  border-radius: 40px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

/* 物流/支付/退款弹窗 */
.logistics-modal,
.payment-modal,
.refund-modal {
  width: 560px;
  max-width: 90%;
}
.message-body {
  padding: 0;
}
.message-tabs {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 20px;
  background: #fafbfc;
}
.tab-btn {
  padding: 14px 20px;
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.tab-btn.active {
  color: #ff6700;
  border-bottom-color: #ff6700;
}
.message-list {
  max-height: 460px;
  overflow-y: auto;
  padding: 8px 0;
}
.message-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f4fa;
  position: relative;
}
.message-item:hover {
  background: #fafcff;
}
.message-icon {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.message-icon svg {
  width: 20px;
  height: 20px;
  stroke: #ff6700;
}
.message-content {
  flex: 1;
}
.message-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1e293b;
  margin-bottom: 4px;
}
.message-desc {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 6px;
}
.message-time {
  font-size: 0.7rem;
  color: #94a3b8;
}
.message-badge {
  position: absolute;
  right: 16px;
  top: 16px;
  background: #ef4444;
  color: white;
  font-size: 0.6rem;
  padding: 2px 8px;
  border-radius: 20px;
}
.empty-message {
  text-align: center;
  padding: 48px 20px;
  color: #94a3b8;
}
.empty-message svg {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  stroke: #cbd5e1;
}

/* 状态徽章 */
.badge-warning {
  background: #fef3c7;
  color: #d97706;
}
.badge-success {
  background: #dcfce7;
  color: #16a34a;
}
.badge-info {
  background: #dbeafe;
  color: #2563eb;
}
.badge-danger {
  background: #fee2e2;
  color: #dc2626;
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
@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .product-row {
    flex-wrap: wrap;
    gap: 12px;
  }
  .product-info {
    flex: 1 1 100%;
  }
  .subtotal {
    text-align: left;
    padding-left: 80px;
  }
}
@media (max-width: 768px) {
  .nav-links .nav-item span {
    display: none;
  }
  .order-tabs {
    flex-direction: column;
    align-items: stretch;
  }
  .tabs-left {
    justify-content: center;
  }
  .tabs-right {
    justify-content: center;
    flex-direction: column;
  }
  .filter-bar {
    flex-direction: column;
  }
  .filter-group {
    justify-content: center;
  }
  .header-left {
    gap: 12px;
  }
  .footer-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .divider {
    display: none;
  }
  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
  .time-filter {
    flex-wrap: wrap;
    justify-content: center;
  }
  .user-actions {
    gap: 8px;
  }
  .action-item {
    padding: 4px 8px;
  }
  .action-label {
    display: none;
  }
}

/* 发货弹窗样式 */
/* 横向发货弹窗样式 */

/* 发货弹窗 - 卡片式设计 */
.ship-modal-design {
  width: 900px;
  max-width: 90vw;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.2);
}

/* 弹窗头部 */
.ship-modal-design .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
}

.ship-modal-design .header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
}

.ship-modal-design .header-icon {
  width: 22px;
  height: 22px;
  stroke: #ff6700;
  stroke-width: 1.8;
}

.ship-modal-design .close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.ship-modal-design .close-btn:hover {
  background: #ff6700;
  color: white;
}

/* 弹窗主体 */
.modal-body-design {
  padding: 24px;
  background: #f8f9fc;
}

/* 行分组 */
.info-row-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.info-row-group:last-child {
  margin-bottom: 0;
}

/* 信息卡片 */
.info-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 卡片标题 */
.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  background: #fafbfd;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.card-title svg {
  stroke: #ff6700;
  stroke-width: 1.8;
}

.card-title .tip {
  font-size: 11px;
  font-weight: normal;
  color: #999;
  margin-left: 4px;
}

/* 卡片内容 */
.card-body {
  padding: 16px 18px;
}

/* 信息行（只读） */
.info-line {
  display: flex;
  margin-bottom: 12px;
  font-size: 13px;
}

.info-line:last-child {
  margin-bottom: 0;
}

.info-line .label {
  width: 70px;
  flex-shrink: 0;
  color: #888;
  font-size: 12px;
}

.info-line .value {
  flex: 1;
  color: #333;
  font-weight: 500;
}

.info-line .value.address {
  font-weight: normal;
  color: #666;
  line-height: 1.4;
}

/* 表单行（可编辑） */
.form-line {
  margin-bottom: 16px;
}

.form-line:last-child {
  margin-bottom: 0;
}

.form-line label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.form-line .required {
  color: #ff4d4f;
  margin-left: 2px;
}

.form-line input,
.form-line select,
.form-line textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
  background: #ffffff;
  font-family: inherit;
}

.form-line textarea {
  resize: vertical;
  min-height: 60px;
}

.form-line input:focus,
.form-line select:focus,
.form-line textarea:focus {
  border-color: #ff6700;
  box-shadow: 0 0 0 2px rgba(255, 103, 0, 0.1);
}

.form-line input::placeholder,
.form-line textarea::placeholder {
  color: #bbb;
}

/* 可编辑卡片样式 */
.editable-card .card-title {
  background: linear-gradient(135deg, #fff9f5 0%, #fafbfd 100%);
}

/* 底部按钮 */
.modal-footer-design {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
  border-top: 1px solid #f0f0f0;
  background: #ffffff;
}

.btn-cancel {
  padding: 10px 28px;
  background: #f5f5f5;
  border: none;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e8e8e8;
  color: #333;
}

.btn-confirm {
  padding: 10px 32px;
  background: linear-gradient(135deg, #ff6700, #ff5500);
  border: none;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(255, 103, 0, 0.3);
}

.btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.4);
}

.btn-confirm:active {
  transform: translateY(0);
}

/* 响应式 */
@media (max-width: 780px) {
  .info-row-group {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .ship-modal-design {
    width: 95vw;
  }

  .modal-body-design {
    padding: 16px;
  }

  .info-line .label {
    width: 65px;
  }
}

/* 规格标签样式 */
.product-spec-large {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.spec-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f1f5f9;
  border-radius: 20px;
  font-size: 12px;
  color: #475569;
}

/* 商品区域增强 */
.product-section-horizontal {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border-radius: 20px;
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;
}

.product-image-large {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  overflow: hidden;
  background: #f1f5f9;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.product-img-large {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-detail-large {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-name-large {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  line-height: 1.3;
}

/* 退款原因区域增强 */
.refund-reason-section-horizontal {
  background: #fff9f0;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  border-left: 4px solid #f97316;
}

.reason-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.reason-header svg {
  width: 18px;
  height: 18px;
  stroke: #f97316;
}

.reason-header span {
  font-size: 13px;
  font-weight: 600;
  color: #d97706;
}

.reason-content {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  padding-left: 26px;
}
/* ========== 退款详情弹窗 - 横向设计 ========== */
.modal-overlay-new {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.refund-dialog-horizontal {
  display: flex;
  width: 880px;
  max-width: 90vw;
  background: #ffffff;
  border-radius: 28px;
  overflow: hidden;
  animation: fadeInScale 0.3s ease-out;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 左侧边栏 */
.dialog-sidebar {
  width: 130px;
  background: linear-gradient(180deg, #ff6b35, #f97316);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: white;
}

.dialog-sidebar.status-pending {
  background: linear-gradient(180deg, #f59e0b, #d97706);
}

.dialog-sidebar.status-success {
  background: linear-gradient(180deg, #10b981, #059669);
}

.dialog-sidebar.status-failed {
  background: linear-gradient(180deg, #64748b, #475569);
}

.sidebar-icon svg {
  width: 48px;
  height: 48px;
  stroke: white;
}

.sidebar-text {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 4px;
  line-height: 1.3;
}

.sidebar-text span {
  display: block;
}

.sidebar-status {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  margin-top: 8px;
}

/* 右侧主内容 */
.dialog-main {
  flex: 1;
  background: #ffffff;
}

.dialog-header-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 28px 16px 28px;
  border-bottom: 1px solid #f0f0f0;
}

.header-left h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.header-left p {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

.close-btn-horizontal {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f8fafc;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn-horizontal svg {
  width: 16px;
  height: 16px;
  stroke: #94a3b8;
  stroke-width: 2;
}

.close-btn-horizontal:hover {
  background: #fee2e2;
}

.close-btn-horizontal:hover svg {
  stroke: #ef4444;
}

/* 弹窗主体 */
.dialog-body-horizontal {
  padding: 20px 28px;
  max-height: 70vh;
  overflow-y: auto;
}

/* 退款金额区域 */
.amount-section-horizontal {
  background: linear-gradient(135deg, #fff9f0, #fff5e8);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border: 1px solid #ffe4cc;
}

.amount-label-horizontal {
  font-size: 14px;
  font-weight: 600;
  color: #d97706;
}

.amount-note-horizontal {
  font-size: 11px;
  font-weight: normal;
  color: #fbbf24;
  margin-left: 8px;
}

.amount-value-horizontal {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.amount-value-horizontal .currency {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b35;
}

.amount-value-horizontal .value {
  font-size: 28px;
  font-weight: 800;
  color: #ff6b35;
  letter-spacing: -1px;
}

/* 信息网格 */
.info-grid-horizontal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.info-item-horizontal {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item-horizontal.full-width {
  grid-column: span 2;
}

.item-label {
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-value {
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  word-break: break-all;
}

.status-badge-new {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
}

.status-badge-new.status-pending {
  background: #fef3c7;
  color: #d97706;
}

.status-badge-new.status-success {
  background: #dcfce7;
  color: #16a34a;
}

.status-badge-new.status-failed {
  background: #fee2e2;
  color: #dc2626;
}

/* 底部按钮 */
.dialog-footer-horizontal {
  display: flex;
  gap: 12px;
  padding: 16px 28px 24px 28px;
  border-top: 1px solid #f0f0f0;
}

.btn-reject-horizontal,
.btn-agree-horizontal {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-reject-horizontal svg,
.btn-agree-horizontal svg {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.btn-reject-horizontal {
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.btn-reject-horizontal:hover:not(:disabled) {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fecaca;
}

.btn-reject-horizontal:hover svg {
  stroke: #ef4444;
}

.btn-agree-horizontal {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.btn-agree-horizontal:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.btn-agree-horizontal svg {
  stroke: white;
}

.btn-reject-horizontal:disabled,
.btn-agree-horizontal:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* ========== 拒绝退款弹窗 - 横向 ========== */
.reject-dialog-horizontal {
  display: flex;
  width: 680px;
  max-width: 90vw;
  background: #ffffff;
  border-radius: 28px;
  overflow: hidden;
  animation: fadeInScale 0.3s ease-out;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
}

.reject-sidebar {
  background: linear-gradient(180deg, #ef4444, #dc2626);
}

.textarea-wrapper-horizontal {
  margin: 8px 0 4px 0;
}

.reject-textarea-horizontal {
  width: 100%;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: all 0.2s;
  background: #fafbfc;
}

.reject-textarea-horizontal:focus {
  border-color: #ef4444;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.reject-textarea-horizontal::placeholder {
  color: #cbd5e1;
}

.char-count-horizontal {
  text-align: right;
  font-size: 11px;
  color: #94a3b8;
  margin-top: 8px;
}

.reject-footer-horizontal {
  border-top: 1px solid #f0f0f0;
}

.btn-cancel-horizontal {
  flex: 1;
  padding: 12px 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel-horizontal:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.btn-confirm-reject-horizontal {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: none;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.btn-confirm-reject-horizontal:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
}

.btn-confirm-reject-horizontal:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
