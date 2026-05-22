<template>
  <div class="seller-after-sales-page">
    <!-- 顶部导航栏 - 与商品管理页面风格一致 -->
    <div class="navbar">
      <div class="nav-content">
        <div class="logo" @click="goToDashboard">
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
          <span>售后中心 | JD生态商城</span>
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

          <!-- 店铺管理按钮 -->
          <div class="nav-item" @click="goToShopManage">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M19 12h2M3 12h2M12 5V3M12 21v-2" />
            </svg>
            <span>店铺管理</span>
          </div>

          <!-- 商品管理按钮 -->
          <div class="nav-item" @click="goToProducts">
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
            <span>商品管理</span>
          </div>

          <!-- 订单管理按钮 -->
          <div class="nav-item" @click="goToOrders">
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

          <!-- 优惠券管理按钮 -->
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
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
            <span>优惠券管理</span>
          </div>
          <!-- 售后管理按钮 -->
          <div class="nav-item active" @click="goToAfterSales">
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

          <!-- 商家信息按钮 -->
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
            <span>商家信息</span>
          </div>
        </div>
      </div>
      <!-- 右上角功能区域  第二行-->
      <div class="nav-bottom-content">
        <!-- 我的店铺下拉选择器 -->
        <div class="shop-selector">
          <div class="selector-label">
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
            <span>我的店铺</span>
          </div>
          <div class="selector-dropdown" @click="toggleShopDropdown">
            <span class="current-shop">{{ currentShop.shopName }}</span>
            <svg
              class="dropdown-icon"
              :class="{ rotate: shopDropdownVisible }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div v-if="shopDropdownVisible" class="shop-dropdown-menu" @click.stop>
            <div
              v-for="shop in shopList"
              :key="shop.shopId"
              class="shop-dropdown-item"
              :class="{ active: currentShop.shopId === shop.shopId }"
              @click="switchShop(shop)"
            >
              <div class="shop-item-logo">
                <img :src="shop.shopLogo || defaultShopLogo" alt="" />
              </div>
              <div class="shop-item-info">
                <span class="shop-item-name">{{ shop.shopName }}</span>
                <span
                  class="shop-item-status"
                  :class="shop.workStatus === 1 ? 'status-open' : 'status-closed'"
                >
                  {{ shop.workStatus === 1 ? '营业中' : '休息中' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="user-actions">
          <div class="action-item" @click="openMessageModal">
            <svg
              class="action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span class="badge" v-if="totalUnreadCount > 0">{{
              totalUnreadCount > 99 ? '99+' : totalUnreadCount
            }}</span>
          </div>
          <div class="action-item" @click="openSettings">
            <svg
              class="action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
          </div>
          <div class="action-item" @click="openChat">
            <svg
              class="action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" stroke-width="2" />
            </svg>
          </div>
          <div class="user-info" @click="toggleUserMenu">
            <span class="avatar">商</span>
            <svg
              class="dropdown-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div v-if="userMenuVisible" class="user-dropdown-menu" @click.stop>
            <a href="#" class="dropdown-item" @click.prevent="goToProfile">个人中心</a>
            <a href="#" class="dropdown-item" @click.prevent="openSettings">账户设置</a>
            <a href="#" class="dropdown-item" @click.prevent="logout">退出登录</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="after-sales-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title">售后管理</h1>
          <span class="page-desc">管理售后工单，处理退款/退货请求</span>
        </div>
        <button class="btn-outline" @click="exportData">
          <svg
            class="btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M12 3v12m0 0l-3-3m3 3l3-3M5 21h14"
              stroke="currentColor"
              stroke-linecap="round"
            />
          </svg>
          导出数据
        </button>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
              />
              <path d="M8 16v.01M12 16v.01M16 16v.01M8 12h8" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ afterSaleStats.total }}</span>
            <span class="stat-label">售后总单量</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon pending-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ afterSaleStats.pending }}</span>
            <span class="stat-label">待处理</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon completed-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ afterSaleStats.completed }}</span>
            <span class="stat-label">已完成</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon refund-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">¥{{ formatMoney(afterSaleStats.refundAmount) }}</span>
            <span class="stat-label">退款金额</span>
          </div>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <div class="filter-group">
          <div
            class="filter-item"
            :class="{ active: filters.status === 'all' }"
            @click="filters.status = 'all'"
          >
            全部
          </div>
          <div
            class="filter-item"
            :class="{ active: filters.status === 'pending' }"
            @click="filters.status = 'pending'"
          >
            待处理
          </div>
          <div
            class="filter-item"
            :class="{ active: filters.status === 'processing' }"
            @click="filters.status = 'processing'"
          >
            处理中
          </div>
          <div
            class="filter-item"
            :class="{ active: filters.status === 'completed' }"
            @click="filters.status = 'completed'"
          >
            已完成
          </div>
          <div
            class="filter-item"
            :class="{ active: filters.status === 'rejected' }"
            @click="filters.status = 'rejected'"
          >
            已拒绝
          </div>
        </div>
        <div class="filter-group">
          <label>售后类型</label>
          <select v-model="filters.type" class="category-select">
            <option value="all">全部</option>
            <option value="refund">仅退款</option>
            <option value="return">退货退款</option>
            <option value="exchange">换货</option>
          </select>
        </div>
        <div class="filter-group">
          <label>申请时间</label>
          <input type="date" v-model="filters.dateFrom" class="date-input" />
          <span>至</span>
          <input type="date" v-model="filters.dateTo" class="date-input" />
        </div>
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
          <input type="text" v-model="filters.keyword" placeholder="搜索订单号/买家昵称" />
        </div>
      </div>

      <!-- 售后工单表格 -->
      <div class="table-container">
        <table class="after-sale-table">
          <thead>
            <tr>
              <th>售后单号</th>
              <th>订单号</th>
              <th>商品信息</th>
              <th>买家</th>
              <th>售后类型</th>
              <th>申请金额</th>
              <th>申请时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedList" :key="item.id">
              <td class="sn-cell">{{ item.afterSaleNo }}</td>
              <td class="order-sn">{{ item.orderNo }}</td>
              <td>
                <div class="product-info">
                  <div
                    class="product-thumb"
                    :style="{ backgroundImage: `url(${item.productImage || defaultProductImage})` }"
                  ></div>
                  <div class="product-detail">
                    <div class="product-name">{{ item.productName }}</div>
                    <div class="product-sku">规格：{{ item.sku }}</div>
                  </div>
                </div>
              </td>
              <td>
                {{ item.buyerName }}<br /><span class="buyer-phone">{{ item.buyerPhone }}</span>
              </td>
              <td>
                <span class="type-badge" :class="getTypeClass(item.type)">
                  {{ getTypeText(item.type) }}
                </span>
              </td>
              <td class="amount-cell">¥{{ formatMoney(item.applyAmount) }}</td>
              <td class="date-cell">{{ formatDate(item.applyTime) }}</td>
              <td>
                <span class="status-badge" :class="getStatusClass(item.status)">
                  {{ getStatusText(item.status) }}
                </span>
              </td>
              <td class="action-cell">
                <button class="action-btn view" @click="viewDetail(item)">详情</button>
                <button
                  v-if="item.status === 'pending'"
                  class="action-btn process"
                  @click="processOrder(item)"
                >
                  处理
                </button>
              </td>
            </tr>
            <tr v-if="paginatedList.length === 0">
              <td colspan="9" class="empty-row">暂无售后工单数据</td>
            </tr>
          </tbody>
        </table>
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

    <!-- 售后详情弹窗 -->
    <div v-if="detailVisible" class="modal-overlay" @click.self="closeDetail">
      <div class="modal-content detail-modal">
        <div class="modal-header">
          <h3>售后详情</h3>
          <button class="close-btn" @click="closeDetail">×</button>
        </div>
        <div class="modal-body" v-if="currentDetail">
          <div class="detail-section">
            <div class="detail-row">
              <span class="detail-label">售后单号：</span>
              <span class="detail-value">{{ currentDetail.afterSaleNo }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">订单号：</span>
              <span class="detail-value">{{ currentDetail.orderNo }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">商品名称：</span>
              <span class="detail-value">{{ currentDetail.productName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">规格：</span>
              <span class="detail-value">{{ currentDetail.sku }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">购买数量：</span>
              <span class="detail-value">{{ currentDetail.quantity || 1 }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">申请金额：</span>
              <span class="detail-value highlight"
                >¥{{ formatMoney(currentDetail.applyAmount) }}</span
              >
            </div>
            <div class="detail-row">
              <span class="detail-label">售后类型：</span>
              <span class="detail-value">{{ getTypeText(currentDetail.type) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">申请原因：</span>
              <span class="detail-value">{{ currentDetail.reason }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">问题描述：</span>
              <span class="detail-value">{{ currentDetail.description || '无' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">申请时间：</span>
              <span class="detail-value">{{ formatDateTime(currentDetail.applyTime) }}</span>
            </div>
            <div class="detail-row" v-if="currentDetail.images && currentDetail.images.length">
              <span class="detail-label">凭证图片：</span>
              <div class="img-list">
                <div
                  v-for="(img, idx) in currentDetail.images"
                  :key="idx"
                  class="proof-img"
                  :style="{ backgroundImage: `url(${img})` }"
                ></div>
              </div>
            </div>
          </div>
          <div class="action-section" v-if="currentDetail.status === 'pending'">
            <div class="form-row">
              <label>处理意见</label>
              <textarea
                v-model="processRemark"
                class="remark-input"
                placeholder="请输入处理意见..."
                rows="3"
              ></textarea>
            </div>
            <div class="action-buttons">
              <button class="btn-secondary" @click="rejectOrder">拒绝退款</button>
              <button class="btn-primary" @click="approveOrder">同意退款</button>
            </div>
          </div>
          <div class="process-log" v-if="currentDetail.processLog">
            <div class="log-title">处理记录</div>
            <div class="log-content">{{ currentDetail.processLog }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 消息弹窗 -->
    <div v-if="messageModalVisible" class="modal-overlay" @click.self="closeMessageModal">
      <div class="modal-content message-modal">
        <div class="modal-header">
          <h3>
            <svg
              class="modal-title-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            消息通知
          </h3>
          <button class="close-btn" @click="closeMessageModal">×</button>
        </div>
        <div class="message-body">
          <div class="message-tabs">
            <button
              class="tab-btn"
              :class="{ active: activeMsgTab === 'logistic' }"
              @click="activeMsgTab = 'logistic'"
            >
              物流信息
              <span v-if="logisticUnreadCount > 0" class="msg-badge">{{
                logisticUnreadCount
              }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeMsgTab === 'payment' }"
              @click="activeMsgTab = 'payment'"
            >
              支付信息
              <span v-if="paymentUnreadCount > 0" class="msg-badge">{{ paymentUnreadCount }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeMsgTab === 'refund' }"
              @click="activeMsgTab = 'refund'"
            >
              退款信息
              <span v-if="refundUnreadCount > 0" class="msg-badge">{{ refundUnreadCount }}</span>
            </button>
          </div>

          <div class="message-list" v-if="activeMsgTab === 'logistic'">
            <div
              v-for="msg in logisticMessages"
              :key="msg.notifyId"
              class="message-item"
              :class="{ unread: !msg.isRead }"
            >
              <div class="message-icon logistic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div class="message-content">
                <div class="message-title">{{ msg.title }}</div>
                <div class="message-desc">{{ msg.content }}</div>
                <div class="message-time">{{ formatDateTime(msg.createTime) }}</div>
              </div>
              <div class="message-badge" v-if="!msg.isRead">新</div>
            </div>
            <div v-if="logisticMessages.length === 0" class="empty-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 12v8H4v-8M12 2v10m0 0-3-3m3 3 3-3" />
              </svg>
              <p>暂无物流消息</p>
            </div>
          </div>

          <div class="message-list" v-if="activeMsgTab === 'payment'">
            <div
              v-for="msg in paymentMessages"
              :key="msg.id"
              class="message-item"
              :class="{ unread: !msg.isRead }"
            >
              <div class="message-icon payment-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M22 12H2" />
                </svg>
              </div>
              <div class="message-content">
                <div class="message-title">{{ msg.title }}</div>
                <div class="message-desc">{{ msg.content }}</div>
                <div class="message-time">{{ formatDateTime(msg.createTime) }}</div>
              </div>
              <div class="message-badge" v-if="!msg.isRead">新</div>
            </div>
            <div v-if="paymentMessages.length === 0" class="empty-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 12v8H4v-8M12 2v10m0 0-3-3m3 3 3-3" />
              </svg>
              <p>暂无支付消息</p>
            </div>
          </div>

          <div class="message-list" v-if="activeMsgTab === 'refund'">
            <div
              v-for="msg in refundMessages"
              :key="msg.id"
              class="message-item"
              :class="{ unread: !msg.isRead }"
            >
              <div class="message-icon refund-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9h-4m-7 9A9 9 0 0 1 3 12m9 9v-4M3 12a9 9 0 0 1 9-9m-9 9h4m7-9a9 9 0 0 1 9 9"
                  />
                </svg>
              </div>
              <div class="message-content">
                <div class="message-title">{{ msg.title }}</div>
                <div class="message-desc">{{ msg.content }}</div>
                <div class="message-time">{{ formatDateTime(msg.createTime) }}</div>
              </div>
              <div class="message-badge" v-if="!msg.isRead">新</div>
            </div>
            <div v-if="refundMessages.length === 0" class="empty-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 12v8H4v-8M12 2v10m0 0-3-3m3 3 3-3" />
              </svg>
              <p>暂无退款消息</p>
            </div>
          </div>

          <div class="message-footer">
            <button class="btn-text" @click="markCurrentTabAsRead">全部标为已读</button>
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
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { get_merchant_info } from '@/api/merchant'

const router = useRouter()

// 默认图片
const defaultShopLogo = 'https://picsum.photos/80/80?random=shop'
const defaultProductImage = 'https://picsum.photos/80/80?random=product'

// 店铺数据
const shopList = ref([])
const currentShop = ref({})
const shopDropdownVisible = ref(false)

// 售后数据
const afterSaleList = ref([])
const loading = ref(false)

// 筛选条件
const filters = reactive({
  status: 'all',
  type: 'all',
  dateFrom: '',
  dateTo: '',
  keyword: '',
})

// 分页
const currentPage = ref(1)
const pageSize = 10

// 售后统计数据
const afterSaleStats = reactive({
  total: 0,
  pending: 0,
  completed: 0,
  refundAmount: 0,
})

// 详情弹窗
const detailVisible = ref(false)
const currentDetail = ref(null)
const processRemark = ref('')

// 消息相关
const messageModalVisible = ref(false)
const activeMsgTab = ref('logistic')
const logisticMessages = ref([])
const paymentMessages = ref([])
const refundMessages = ref([])
const logisticUnreadCount = ref(0)
const paymentUnreadCount = ref(0)
const refundUnreadCount = ref(0)
const totalUnreadCount = computed(
  () => logisticUnreadCount.value + paymentUnreadCount.value + refundUnreadCount.value,
)

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

// 辅助函数
const formatMoney = (val) => {
  if (val === undefined || val === null) return '0.00'
  return val.toFixed(2)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

// 类型映射
const getTypeText = (type) => {
  const map = { refund: '仅退款', return: '退货退款', exchange: '换货' }
  return map[type] || type
}

const getTypeClass = (type) => {
  const map = { refund: 'type-refund', return: 'type-return', exchange: 'type-exchange' }
  return map[type] || ''
}

// 状态映射
const getStatusText = (status) => {
  const map = { pending: '待处理', processing: '处理中', completed: '已完成', rejected: '已拒绝' }
  return map[status] || status
}

const getStatusClass = (status) => {
  const map = {
    pending: 'status-pending',
    processing: 'status-processing',
    completed: 'status-completed',
    rejected: 'status-rejected',
  }
  return map[status] || ''
}

// 更新统计数据
const updateStats = (list) => {
  afterSaleStats.total = list.length
  afterSaleStats.pending = list.filter(
    (item) => item.status === 'pending' || item.status === 'processing',
  ).length
  afterSaleStats.completed = list.filter((item) => item.status === 'completed').length
  afterSaleStats.refundAmount = list
    .filter((item) => item.status === 'completed')
    .reduce((sum, item) => sum + (item.applyAmount || 0), 0)
}

// 筛选列表
const filteredList = computed(() => {
  let list = [...afterSaleList.value]

  if (filters.status !== 'all') {
    list = list.filter((item) => item.status === filters.status)
  }
  if (filters.type !== 'all') {
    list = list.filter((item) => item.type === filters.type)
  }
  if (filters.dateFrom) {
    list = list.filter((item) => new Date(item.applyTime) >= new Date(filters.dateFrom))
  }
  if (filters.dateTo) {
    const endDate = new Date(filters.dateTo)
    endDate.setHours(23, 59, 59)
    list = list.filter((item) => new Date(item.applyTime) <= endDate)
  }
  if (filters.keyword.trim()) {
    const kw = filters.keyword.trim().toLowerCase()
    list = list.filter(
      (item) =>
        (item.orderNo && item.orderNo.toLowerCase().includes(kw)) ||
        (item.buyerName && item.buyerName.toLowerCase().includes(kw)) ||
        (item.afterSaleNo && item.afterSaleNo.toLowerCase().includes(kw)),
    )
  }

  updateStats(list)
  return list
})

// 分页
const totalPages = computed(() => Math.ceil(filteredList.value.length / pageSize))
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredList.value.slice(start, start + pageSize)
})

// 监听筛选条件变化重置页码
watch(
  [
    () => filters.status,
    () => filters.type,
    () => filters.dateFrom,
    () => filters.dateTo,
    () => filters.keyword,
  ],
  () => {
    currentPage.value = 1
  },
)

// 获取售后数据
const fetchAfterSaleData = async () => {
  loading.value = true
  try {
    const response = await get_merchant_info()
    if (response.code === 200) {
      const data = response.data

      // 设置店铺列表
      if (data.myShopList && data.myShopList.length > 0) {
        shopList.value = data.myShopList.map((shop) => ({
          shopId: shop.shopId,
          shopName: shop.shopName,
          shopLogo: shop.shopLogo || defaultShopLogo,
          workStatus: shop.workStatus,
        }))
        currentShop.value = shopList.value[0]
      }

      // 获取消息数据
      logisticMessages.value = data.myLogisticMessageList || []
      paymentMessages.value = data.myPayMessageList || []
      refundMessages.value = data.myRefundMessageList || []

      logisticUnreadCount.value = logisticMessages.value.filter((msg) => !msg.isRead).length
      paymentUnreadCount.value = paymentMessages.value.filter((msg) => !msg.isRead).length
      refundUnreadCount.value = refundMessages.value.filter((msg) => !msg.isRead).length

      // 从子订单中筛选售后相关订单 (status: 5=退款中, 6=退款成功)
      const suborderList = data.allSuborderList || []
      const afterSaleOrders = suborderList
        .filter((item) => item.status === 5 || item.status === 6)
        .map((item) => {
          const isCompleted = item.status === 6
          const applyTime = new Date(item.updateTime || item.createTime)

          return {
            id: item.suborderId,
            afterSaleNo: `AS${item.suborderId?.slice(-10) || Date.now()}`,
            orderNo: item.orderId || item.suborderId,
            productName: item.productName || '未知商品',
            sku: item.specData || '默认规格',
            productImage: item.productUrl || '',
            buyerName: item.userName || item.receiverName || '买家',
            buyerPhone: item.userPhone || '',
            type: 'refund',
            applyAmount: item.payAmount || item.price || 0,
            quantity: 1,
            applyTime: applyTime.toISOString(),
            status: isCompleted ? 'completed' : 'pending',
            reason: item.remark || '用户申请退款',
            description: item.remark || '',
            images: [],
          }
        })

      afterSaleList.value = afterSaleOrders
      updateStats(afterSaleList.value)
    }
  } catch (error) {
    console.error('获取售后信息失败:', error)
    showMessage('网络错误，无法获取数据', true)
  } finally {
    loading.value = false
    await nextTick() // 👈 添加这一行
  }
}

// 查看详情
const viewDetail = (item) => {
  currentDetail.value = { ...item }
  processRemark.value = ''
  detailVisible.value = true
}

const closeDetail = () => {
  detailVisible.value = false
  currentDetail.value = null
}

const processOrder = (item) => {
  viewDetail(item)
}

const approveOrder = () => {
  if (currentDetail.value) {
    const index = afterSaleList.value.findIndex((item) => item.id === currentDetail.value.id)
    if (index !== -1) {
      afterSaleList.value[index].status = 'completed'
      afterSaleList.value[index].processLog = `同意退款，处理意见：${processRemark.value || '无'}`
      showMessage('已同意退款申请')
    }
    closeDetail()
  }
}

const rejectOrder = () => {
  if (currentDetail.value) {
    const index = afterSaleList.value.findIndex((item) => item.id === currentDetail.value.id)
    if (index !== -1) {
      afterSaleList.value[index].status = 'rejected'
      afterSaleList.value[index].processLog = `拒绝退款，处理意见：${processRemark.value || '无'}`
      showMessage('已拒绝退款申请')
    }
    closeDetail()
  }
}

const exportData = () => {
  showMessage('导出功能开发中...')
}

// 店铺切换
const toggleShopDropdown = () => {
  shopDropdownVisible.value = !shopDropdownVisible.value
}

const switchShop = async (shop) => {
  if (currentShop.value.shopId === shop.shopId) return
  currentShop.value = shop
  shopDropdownVisible.value = false
  await fetchAfterSaleData()
  showMessage(`已切换到店铺：${shop.shopName}`)
}

// 消息相关
const openMessageModal = () => {
  messageModalVisible.value = true
}

const closeMessageModal = () => {
  messageModalVisible.value = false
}

const markCurrentTabAsRead = () => {
  let messages = []
  let unreadCountRef = null

  if (activeMsgTab.value === 'logistic') {
    messages = logisticMessages.value
    unreadCountRef = logisticUnreadCount
  } else if (activeMsgTab.value === 'payment') {
    messages = paymentMessages.value
    unreadCountRef = paymentUnreadCount
  } else {
    messages = refundMessages.value
    unreadCountRef = refundUnreadCount
  }

  messages.forEach((msg) => (msg.isRead = true))
  if (unreadCountRef) unreadCountRef.value = 0
  showMessage('已全部标为已读')
}

// 右上角功能
const userMenuVisible = ref(false)

const openSettings = () => {
  showMessage('设置功能开发中...')
}

const openChat = () => {
  showMessage('聊天功能开发中...')
}

const toggleUserMenu = () => {
  userMenuVisible.value = !userMenuVisible.value
}

const handleClickOutside = (e) => {
  const shopSelector = document.querySelector('.shop-selector')
  if (shopSelector && !shopSelector.contains(e.target)) {
    shopDropdownVisible.value = false
  }
  const userActions = document.querySelector('.user-actions')
  if (userActions && !userActions.contains(e.target)) {
    userMenuVisible.value = false
  }
}

const logout = () => {
  showMessage('正在退出登录...')
  setTimeout(() => {
    localStorage.clear()
    sessionStorage.clear()
    router.push('/login')
  }, 1500)
}
const identityInfo = localStorage.getItem('mall-user-merchant-info') || ''

// 真实路由导航
const goToHome = () => router.push('/')
const goToDashboard = () => router.push('/seller/dashboard')
const goToOrders = () => router.push('/order/suborder/managerment')
const goToAfterSales = () => {} // 当前页面
const goToCoupons = () => router.push('/coupon/manage')
const goToProducts = () => router.push('/merchant/productManage')
const goToShopManage = () => router.push('/merchant/shopManage')
const goToProfile = () =>
  router.push(
    '/merchant/detail/' +
      (localStorage.getItem('identityId') || sessionStorage.getItem('identityId')),
  )
onMounted(() => {
  fetchAfterSaleData()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ========= 与商品管理页面完全一致的样式 ========= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.seller-after-sales-page {
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

/* 导航栏 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
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
  gap: 8px;
  flex-wrap: wrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a0aec0;
  cursor: pointer;
  padding: 8px 18px;
  border-radius: 40px;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ff8533;
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(255, 103, 0, 0.2), rgba(255, 133, 51, 0.1));
  color: #ff8533;
}

/* 我的店铺选择器 */
.shop-selector {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 12px 4px 16px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.selector-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #a0aec0;
  font-size: 13px;
}

.selector-label svg {
  stroke: #ff6700;
}

.selector-dropdown {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 0;
}

.current-shop {
  color: white;
  font-weight: 500;
  font-size: 14px;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  stroke: #a0aec0;
  transition: transform 0.2s;
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.shop-dropdown-menu {
  position: absolute;
  top: 52px;
  left: 0;
  background: #1a1a2e;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 260px;
  z-index: 100;
  overflow: hidden;
}

.shop-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.shop-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.shop-dropdown-item.active {
  background: rgba(255, 103, 0, 0.2);
  border-left: 3px solid #ff6700;
}

.shop-item-logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  overflow: hidden;
  background: #2d3748;
}

.shop-item-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.shop-item-name {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.shop-item-status {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  width: fit-content;
}

.shop-item-status.status-open {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.shop-item-status.status-closed {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

/* 右上角功能区域 */
.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.action-item {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s;
  color: #a0aec0;
}

.action-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ff8533;
}

.action-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 20px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 40px;
  transition: all 0.2s;
  color: #a0aec0;
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ff8533;
}

.avatar {
  display: inline-flex;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}

.dropdown-arrow {
  width: 14px;
  height: 14px;
  stroke: currentColor;
}

.user-dropdown-menu {
  position: absolute;
  top: 52px;
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

/* 主容器 */
.after-sales-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 24px;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b, #334155);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-desc {
  font-size: 13px;
  color: #64748b;
  margin-left: 12px;
}

.btn-outline {
  background: transparent;
  border: 1.5px solid #e2e8f0;
  padding: 6px 16px;
  border-radius: 40px;
  color: #475569;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-outline:hover {
  border-color: #ff6700;
  color: #ff6700;
  background: #fff7ed;
}

.btn-icon {
  width: 16px;
  height: 16px;
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

.total-icon {
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
  color: #0284c7;
}
.pending-icon {
  background: linear-gradient(135deg, #ffedd5, #fed7aa);
  color: #ea580c;
}
.completed-icon {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #16a34a;
}
.refund-icon {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  padding: 12px 20px;
  margin-bottom: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  flex-wrap: wrap;
  gap: 16px;
}

.filter-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-group label {
  font-size: 13px;
  color: #475569;
  font-weight: 500;
}

.filter-item {
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 30px;
  transition: all 0.2s;
}

.filter-item:hover {
  background: #f1f5f9;
  color: #ff6700;
}

.filter-item.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
}

.category-select {
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 13px;
  color: #475569;
  cursor: pointer;
  outline: none;
}

.category-select:focus {
  border-color: #ff6700;
}

.date-input {
  padding: 8px 12px;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 13px;
  color: #475569;
  outline: none;
}

.date-input:focus {
  border-color: #ff6700;
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

/* 表格样式 */
.table-container {
  background: white;
  border-radius: 24px;
  border: 1px solid #edf2f9;
  overflow-x: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
}

.after-sale-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 1100px;
}

.after-sale-table th {
  text-align: left;
  padding: 16px 20px;
  background: #fafcff;
  border-bottom: 1px solid #eef3fc;
  color: #384b6d;
  font-weight: 600;
  font-size: 0.85rem;
}

.after-sale-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f4fa;
  color: #1f2a45;
  vertical-align: middle;
}

.sn-cell {
  font-weight: 600;
  color: #2563eb;
  font-family: monospace;
}

.order-sn {
  font-family: monospace;
  color: #5a6e8a;
}

.product-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.product-thumb {
  width: 48px;
  height: 48px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  background-color: #f1f5f9;
}

.product-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.product-sku {
  font-size: 0.7rem;
  color: #94a3b8;
}

.buyer-phone {
  font-size: 0.7rem;
  color: #94a3b8;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}

.type-refund {
  background: #eef2ff;
  color: #2563eb;
}
.type-return {
  background: #fef9e6;
  color: #d97706;
}
.type-exchange {
  background: #e6f7ec;
  color: #10b981;
}

.amount-cell {
  font-weight: 700;
  color: #ff6700;
}

.date-cell {
  font-size: 0.8rem;
  color: #64748b;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-block;
}

.status-pending {
  background: #fff4e6;
  color: #f97316;
}
.status-processing {
  background: #eef2ff;
  color: #2563eb;
}
.status-completed {
  background: #e0f2e9;
  color: #0a6e44;
}
.status-rejected {
  background: #ffe8e8;
  color: #c2412c;
}

.action-cell {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  border: none;
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 30px;
  transition: 0.1s;
  font-weight: 500;
}

.action-btn.view {
  color: #2563eb;
  background: #eef2ff;
}
.action-btn.view:hover {
  background: #d9e6ff;
}
.action-btn.process {
  color: #10b981;
  background: #dcfce7;
}
.action-btn.process:hover {
  background: #bbf7d0;
}

.empty-row {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 32px;
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
  width: 560px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.detail-modal {
  width: 560px;
}

.message-modal {
  width: 550px;
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
  max-height: 60vh;
  overflow-y: auto;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px dashed #f0f4fa;
}

.detail-label {
  width: 100px;
  font-weight: 600;
  color: #475569;
  flex-shrink: 0;
  font-size: 13px;
}

.detail-value {
  color: #1e293b;
  font-size: 13px;
}

.detail-value.highlight {
  color: #ff6700;
  font-weight: 700;
  font-size: 16px;
}

.img-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.proof-img {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.action-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.form-row {
  margin-bottom: 16px;
}

.form-row label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 6px;
}

.remark-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
  resize: vertical;
}

.remark-input:focus {
  border-color: #ff6700;
  box-shadow: 0 0 0 2px rgba(255, 103, 0, 0.1);
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 8px 20px;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(255, 103, 0, 0.3);
}

.btn-secondary {
  background: #f1f5f9;
  border: none;
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 13px;
  cursor: pointer;
  color: #475569;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.process-log {
  margin-top: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 20px;
}

.log-title {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: #475569;
}

.log-content {
  font-size: 0.8rem;
  color: #5a6e8a;
  white-space: pre-wrap;
}

/* 消息弹窗 */
.message-body {
  padding: 0;
}

.message-tabs {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 20px;
  background: #fafbfc;
  gap: 8px;
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
  transition: 0.2s;
  position: relative;
}

.tab-btn.active {
  color: #ff6700;
  border-bottom-color: #ff6700;
}

.msg-badge {
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 20px;
  margin-left: 6px;
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
  transition: 0.1s;
  position: relative;
}

.message-item:hover {
  background: #fafcff;
}

.message-item.unread {
  background: #fef9e6;
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

.logistic-icon svg {
  stroke: #3b82f6;
}
.payment-icon svg {
  stroke: #10b981;
}
.refund-icon svg {
  stroke: #ef4444;
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

.message-footer {
  padding: 14px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}

.btn-text {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn-text:hover {
  color: #ff6700;
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
}
@media (max-width: 768px) {
  .nav-links .nav-item span {
    display: none;
  }
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-group {
    justify-content: center;
    flex-wrap: wrap;
  }
  .search-box {
    width: 100%;
  }
  .search-box input {
    flex: 1;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
}

.nav-bottom-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between; /* 左右分布 */
  align-items: center;
}
</style>
