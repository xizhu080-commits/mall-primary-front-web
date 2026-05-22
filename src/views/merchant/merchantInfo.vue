<template>
  <div class="profile-container">
    <!-- 顶部背景装饰 -->
    <div class="profile-header-bg"></div>

    <!-- 顶部导航栏 -->
    <div class="top-navbar">
      <div class="nav-content-wide">
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
          <span>京东生态商城 · 商家中心</span>
        </div>
        <div class="nav-links">
          <div class="nav-link" @click="goToHome">首页</div>
          <div class="nav-link" @click="goToMyShop">店铺管理</div>
          <div class="nav-link" @click="goToProducts">商品管理</div>
          <div class="nav-link" @click="goToOrders">订单管理</div>
          <div class="nav-link" @click="goToCouponsManage">优惠券管理</div>
          <div class="nav-link" @click="goToAfterSaleManage">售后管理</div>
        </div>
        <div class="nav-right">
          <!-- 消息按钮 - 显示总未读数 -->
          <div class="nav-icon" @click="openMessageModal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span class="nav-badge" v-if="totalUnreadCount > 0">{{
              totalUnreadCount > 99 ? '99+' : totalUnreadCount
            }}</span>
          </div>
          <div class="nav-icon" @click="goToCustomerService">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
          </div>
          <div class="nav-icon" @click="goToSettings">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-content-wide">
      <!-- 商家信息行 -->
      <div class="user-row">
        <div class="user-card-wide">
          <div class="user-avatar-wrapper">
            <img :src="merchantInfo.merchantAvatar" class="user-avatar" alt="商家头像" />
            <div class="avatar-edit-btn" @click="editAvatar">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
              </svg>
            </div>
          </div>
          <div class="user-info-wide">
            <div class="user-name-row">
              <h2 class="user-name">{{ merchantInfo.merchantName }}</h2>
              <div class="user-badge">
                <span
                  class="badge"
                  :class="merchantInfo.merchantStatus === 1 ? 'active' : 'inactive'"
                >
                  {{ merchantInfo.merchantStatus === 1 ? '营业中' : '已注销' }}
                </span>
                <span class="badge level-badge">品牌: {{ merchantInfo.brand || '未设置' }}</span>
              </div>
            </div>
            <p class="user-id">商家ID: {{ merchantInfo.merchantId }}</p>
            <div class="user-contact">
              <span>📞 {{ merchantInfo.phone }}</span>
              <span>✉️ {{ merchantInfo.email || '未绑定邮箱' }}</span>
              <span>📅 入驻时间: {{ formatDate(merchantInfo.createTime) }}</span>
            </div>
          </div>
          <div class="edit-profile-btn" @click="editProfile">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
            </svg>
            <span>编辑资料</span>
          </div>
        </div>

        <div class="stats-grid-wide">
          <div class="stat-card-wide" @click="goToOrders">
            <div class="stat-value">{{ stats.orderCount }}</div>
            <div class="stat-label">累计订单</div>
          </div>
          <div class="stat-card-wide" @click="goToProducts">
            <div class="stat-value">{{ stats.productCount }}</div>
            <div class="stat-label">商品总数</div>
          </div>
          <div class="stat-card-wide" @click="goToShopList">
            <div class="stat-value">{{ stats.shopCount }}</div>
            <div class="stat-label">店铺数量</div>
          </div>
          <div class="stat-card-wide" @click="openMessageModal">
            <div class="stat-value">{{ totalUnreadCount }}</div>
            <div class="stat-label">未读消息</div>
          </div>
        </div>
      </div>

      <!-- 商家简介卡片 -->
      <div class="membership-card-wide">
        <div class="membership-header">
          <span class="membership-title">商家简介</span>
          <span class="membership-value" @click="editIntro" style="cursor: pointer">编辑</span>
        </div>
        <div class="intro-content">
          {{ merchantInfo.intro || '暂无简介，点击编辑添加商家介绍' }}
        </div>
      </div>

      <!-- 两列内容布局 -->
      <div class="two-columns">
        <!-- 左侧：商家功能菜单 -->
        <div class="left-column">
          <div class="menu-section-wide">
            <div class="section-title">
              <span>商家服务</span>
              <span class="section-more" @click="viewAllServices">查看全部 &gt;</span>
            </div>
            <div class="menu-grid-wide">
              <!-- 商品管理按钮 -->
              <div class="menu-item-wide" @click="goToProducts">
                <div class="menu-icon product-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <span>商品管理</span>
              </div>

              <!-- 订单管理按钮 -->
              <div class="menu-item-wide" @click="goToOrders">
                <div class="menu-icon orders-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      d="M3 6h18M6 3v3M18 3v3M5 21h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"
                    />
                    <path d="M9 13h6M12 10v6" />
                  </svg>
                </div>
                <span>订单管理</span>
              </div>

              <!-- 优惠券管理按钮 -->
              <div class="menu-item-wide" @click="goToCouponsManage">
                <div class="menu-icon coupons-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      d="M20 12V8h-2.5c-.8 0-1.5-.7-1.5-1.5V4h-4v2.5c0 .8-.7 1.5-1.5 1.5H8v4h2.5c.8 0 1.5.7 1.5 1.5V20h4v-2.5c0-.8.7-1.5 1.5-1.5H20v-4h-2.5c-.8 0-1.5-.7-1.5-1.5V12h4z"
                    />
                  </svg>
                </div>
                <span>优惠券管理</span>
              </div>

              <!-- 售后管理按钮 -->
              <div class="menu-item-wide" @click="goToAfterSaleManage">
                <div class="menu-icon after-sale-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <span>售后管理</span>
              </div>
              <div class="menu-item-wide" @click="goToPromotion">
                <div class="menu-icon promotion-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span>营销推广</span>
              </div>
              <div class="menu-item-wide" @click="goToDataAnalysis">
                <div class="menu-icon data-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M21 12v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3" />
                    <path d="M12 2v8M8 6l4-4 4 4" />
                  </svg>
                </div>
                <span>数据分析</span>
              </div>
            </div>
          </div>

          <div class="tools-section-wide">
            <div class="section-title"><span>快捷工具</span></div>
            <div class="tools-grid-wide">
              <div class="tool-item-wide" @click="goToMyShop">
                <div class="tool-icon shop-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <rect x="3" y="9" width="18" height="12" rx="2" />
                    <path d="M5 9V5h14v4" />
                  </svg>
                </div>
                <span>店铺首页</span>
              </div>
              <div class="tool-item-wide" @click="openMessageModal">
                <div class="tool-icon message-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </div>
                <span>消息中心</span>
                <span class="tool-badge" v-if="totalUnreadCount > 0">{{ totalUnreadCount }}</span>
              </div>
              <div class="tool-item-wide" @click="goToCustomerService">
                <div class="tool-icon cs-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="11" r="1" />
                  </svg>
                </div>
                <span>在线客服</span>
              </div>
              <div class="tool-item-wide" @click="goToSettings">
                <div class="tool-icon settings-icon">
                  <svg
                    width="20"
                    height="20"
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
                <span>账号设置</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：最新订单 - 超过3条时变为可滚动 -->
        <div class="right-column">
          <div class="recent-section-wide">
            <div class="section-title">
              <span>最新订单</span>
              <span class="section-more" @click="goToOrders">查看全部 &gt;</span>
            </div>
            <div
              class="orders-list-compact"
              :class="{ 'orders-scrollable': recentOrders.length > 3 }"
            >
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="order-item-compact"
                @click="goToOrderDetail(order.id)"
              >
                <div class="order-product-img">
                  <img :src="order.productImage" :alt="order.productName" />
                </div>
                <div class="order-info-compact">
                  <div class="order-header">
                    <div class="order-no">订单号: {{ order.id }}</div>
                    <div class="order-user">用户ID: {{ order.user_id }}</div>
                  </div>
                  <div class="order-shop">{{ order.shopName }}</div>
                  <div class="order-product">{{ order.productName }}</div>
                  <div class="order-time">
                    <span>创建: {{ order.createTime }}</span>
                    <span>更新: {{ order.updateTime }}</span>
                  </div>
                </div>
                <div class="order-right">
                  <div class="order-amount">¥{{ order.amount }}</div>
                  <div class="order-status-compact" :class="getOrderStatusClass(order.status)">
                    {{ order.statusText }}
                  </div>
                </div>
              </div>
              <div v-if="recentOrders.length === 0" class="empty-recent-wide">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>暂无最新订单</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 退出登录 -->
      <div class="logout-btn-wide" @click="handleLogout">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>退出登录</span>
      </div>
    </div>

    <!-- ========= 消息弹窗 - 物流信息、支付信息、退款信息 ========= -->
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
              :class="{ active: activeTabMsg === 'logistic' }"
              @click="activeTabMsg = 'logistic'"
            >
              物流信息
              <span v-if="logisticUnreadCount > 0" class="msg-badge">{{
                logisticUnreadCount
              }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTabMsg === 'payment' }"
              @click="activeTabMsg = 'payment'"
            >
              支付信息
              <span v-if="paymentUnreadCount > 0" class="msg-badge">{{ paymentUnreadCount }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTabMsg === 'refund' }"
              @click="activeTabMsg = 'refund'"
            >
              退款信息
              <span v-if="refundUnreadCount > 0" class="msg-badge">{{ refundUnreadCount }}</span>
            </button>
          </div>

          <!-- 物流信息列表 -->
          <div class="message-list" v-if="activeTabMsg === 'logistic'">
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

          <!-- 支付信息列表 -->
          <div class="message-list" v-if="activeTabMsg === 'payment'">
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

          <!-- 退款信息列表 -->
          <div class="message-list" v-if="activeTabMsg === 'refund'">
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

          <div class="message-footer" v-if="currentMessages.length > 0">
            <button class="btn-text" @click="markCurrentTabAsRead">全部标为已读</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast 提示 -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast-message" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { get_merchant_info } from '@/api/merchant'

const router = useRouter()

// 商家信息
const merchantInfo = reactive({
  merchantId: '',
  merchantName: '',
  merchantAvatar: '',
  brand: '',
  phone: '',
  email: '',
  intro: '',
  merchantStatus: 1,
  createTime: '',

  realName: '',
  idCard: '',
  qualificationCertificate: '',
})

// 统计数据
const stats = reactive({
  orderCount: 0,
  productCount: 0,
  shopCount: 0,
  unreadCount: 0,
})

// 最新订单
const recentOrders = ref([])

// ========== 消息相关（从API获取真实数据） ==========
const messageModalVisible = ref(false)
const activeTabMsg = ref('logistic')

// 消息列表
const logisticMessages = ref([]) // 物流信息
const paymentMessages = ref([]) // 支付信息
const refundMessages = ref([]) // 退款信息

// 各类型未读数
const logisticUnreadCount = ref(0)
const paymentUnreadCount = ref(0)
const refundUnreadCount = ref(0)
const totalUnreadCount = computed(
  () => logisticUnreadCount.value + paymentUnreadCount.value + refundUnreadCount.value,
)

// 当前tab的消息列表
const currentMessages = computed(() => {
  if (activeTabMsg.value === 'logistic') return logisticMessages.value
  if (activeTabMsg.value === 'payment') return paymentMessages.value
  return refundMessages.value
})

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

// 格式化日期
const formatDate = (date) => {
  if (!date) return '未知'
  return date
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.slice(0, 16)
}

// 状态样式映射
const getOrderStatusClass = (status) => {
  const map = {
    2: 'status-pending',
    3: 'status-shipped',
    4: 'status-completed',
    5: 'status-refunding',
    6: 'status-refunded',
  }
  return map[status] || ''
}

// 获取商家信息和消息数据
const fetchMerchantInfo = async () => {
  try {
    const response = await get_merchant_info()
    if (response.code === 200) {
      const data = response.data

      // 商家基本信息
      merchantInfo.merchantId = data.merchantId
      merchantInfo.merchantName = data.merchantName
      merchantInfo.merchantAvatar = data.merchantAvatar || ''
      merchantInfo.brand = data.brand
      merchantInfo.phone = data.phone
      merchantInfo.intro = data.intro
      merchantInfo.merchantStatus = data.merchantStatus
      merchantInfo.createTime = data.createTime
      merchantInfo.realName = data.realName
      merchantInfo.idCard = data.idCard
      merchantInfo.qualificationCertificate = data.qualificationCertificate

      stats.orderCount = data.suborderCount || 0
      stats.shopCount = data.shopCount || 0
      stats.productCount = data.skuCount || 0

      // ========== 获取三类消息数据 ==========
      // 物流消息
      logisticMessages.value = data.myLogisticMessageList || []
      logisticUnreadCount.value = logisticMessages.value.filter((msg) => !msg.isRead).length

      // 支付消息
      paymentMessages.value = data.myPayMessageList || []
      paymentUnreadCount.value = paymentMessages.value.filter((msg) => !msg.isRead).length

      // 退款消息
      refundMessages.value = data.myRefundMessageList || []
      refundUnreadCount.value = refundMessages.value.filter((msg) => !msg.isRead).length
    }
  } catch (error) {
    showMessage('网络错误，无法获取商家信息', true)
  }
}

// 获取最新订单
const fetchRecentOrders = async () => {
  try {
    const response = await get_merchant_info()
    if (response.code === 200) {
      const suborderStatusMap = {
        2: '待发货',
        3: '已发货',
        4: '已完成',
        5: '退款中',
        6: '退款成功',
      }
      const latestSuborderList = response.data.latestSuborderList || []

      recentOrders.value = latestSuborderList.map((suborder) => ({
        id: suborder.suborderId,
        user_id: suborder.userId,
        shopName: suborder.shopName,
        productName: suborder.productName,
        productImage: suborder.productUrl,
        amount: suborder.payAmount,
        status: suborder.status,
        createTime: suborder.createTime,
        updateTime: suborder.updateTime,
        statusText: suborderStatusMap[suborder.status] || '未知状态',
      }))
    }
  } catch (error) {
    console.error('获取最新订单失败', error)
  }
}

// ========== 消息相关方法 ==========
const openMessageModal = () => {
  messageModalVisible.value = true
}
const closeMessageModal = () => {
  messageModalVisible.value = false
}

const markCurrentTabAsRead = () => {
  const messages = currentMessages.value
  messages.forEach((msg) => (msg.isRead = true))
  if (activeTabMsg.value === 'logistic') {
    logisticUnreadCount.value = 0
  } else if (activeTabMsg.value === 'payment') {
    paymentUnreadCount.value = 0
  } else {
    refundUnreadCount.value = 0
  }
  showMessage('已全部标为已读')
}

// 导航功能（带真实路由）
const goToHome = () => {
  router.push('/')
}
const goToMyShop = () => {
  router.push('/merchant/shopManage')
}
const goToOrders = () => {
  router.push('/order/suborder/managerment')
}
const goToProducts = () => {
  router.push('/merchant/productManage')
}
const goToCouponsManage = () => {
  router.push('/coupon/manage')
}
const goToAfterSaleManage = () => {
  router.push('/merchant/after-sale')
}
const goToPromotion = () => {
  router.push('/merchant/promotion')
}
const goToDataAnalysis = () => {
  router.push('/merchant/data-analysis')
}
const goToCustomerService = () => {
  showMessage('联系在线客服')
}
const goToSettings = () => {
  router.push('/merchant/settings')
}
const goToShopList = () => {
  router.push('/merchant/shops')
}
const goToOrderDetail = (orderId) => {
  router.push(`/order/suborder/detail/${orderId}`)
}

const editAvatar = () => {
  showMessage('更换头像功能')
}
const editProfile = () => {
  router.push('/merchant/profile/edit')
}
const editIntro = () => {
  router.push('/merchant/profile/edit')
}
const viewAllServices = () => {
  showMessage('全部服务')
}

const handleLogout = () => {
  showMessage('已退出登录，即将跳转至登录页')
  setTimeout(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/home')
  }, 1500)
}

onMounted(() => {
  fetchMerchantInfo()
  fetchRecentOrders()
})
</script>

<style scoped>
/* ========== 消息弹窗样式 ========== */
.modal-overlay {
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
}

.modal-content {
  background: #1e1b2e;
  border-radius: 28px;
  width: 550px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
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

.close-btn:hover {
  color: #ff6700;
}

.message-body {
  padding: 0;
}

.message-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.2);
  gap: 8px;
}

.tab-btn {
  padding: 14px 20px;
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  color: #94a3b8;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.1s;
  position: relative;
}

.message-item:hover {
  background: rgba(255, 103, 0, 0.1);
}

.message-item.unread {
  background: rgba(255, 103, 0, 0.15);
}

.message-icon {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-icon svg {
  width: 20px;
  height: 20px;
}

.message-icon.logistic-icon svg {
  stroke: #3b82f6;
}
.message-icon.payment-icon svg {
  stroke: #10b981;
}
.message-icon.refund-icon svg {
  stroke: #ef4444;
}

.message-content {
  flex: 1;
}

.message-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #ffffff;
  margin-bottom: 4px;
}

.message-desc {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.4;
  margin-bottom: 6px;
}

.message-time {
  font-size: 0.7rem;
  color: #5b6e8c;
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
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 16px;
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
  color: #5b6e8c;
}

.empty-message svg {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  stroke: #3b4a6b;
}

.empty-message p {
  color: #5b6e8c;
}

/* 订单列表滚动样式 */
.orders-list-compact {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.orders-list-compact.orders-scrollable {
  max-height: 480px;
  overflow-y: auto;
  padding-right: 8px;
}

.orders-list-compact.orders-scrollable::-webkit-scrollbar {
  width: 6px;
}

.orders-list-compact.orders-scrollable::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.orders-list-compact.orders-scrollable::-webkit-scrollbar-thumb {
  background: rgba(255, 103, 0, 0.5);
  border-radius: 10px;
}

.orders-list-compact.orders-scrollable::-webkit-scrollbar-thumb:hover {
  background: #ff6700;
}

.order-item-compact {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.order-item-compact:hover {
  background: rgba(255, 103, 0, 0.1);
  transform: translateX(4px);
}

.order-product-img {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.order-product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.order-info-compact {
  flex: 1;
  min-width: 0;
}

.order-header {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.order-no {
  font-size: 13px;
  font-weight: 600;
  color: #ff8c42;
}

.order-user {
  font-size: 12px;
  color: #94a3b8;
}

.order-shop {
  font-size: 13px;
  color: #e2e8f0;
  margin-bottom: 4px;
}

.order-product {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-time {
  display: flex;
  gap: 16px;
  font-size: 11px;
  color: #5b6e8c;
}

.order-time span {
  display: inline-block;
}

.order-right {
  flex-shrink: 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.order-amount {
  font-size: 16px;
  font-weight: 700;
  color: #ff8c42;
}

.order-status-compact {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.status-pending {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.status-shipped {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.status-completed {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}

.status-refunding {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
}

.status-refunded {
  background: rgba(100, 116, 139, 0.15);
  color: #94a3b8;
}

/* 其余原有样式保持不变 */
.coupons-icon {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}
.after-sale-icon {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}
.intro-content {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
  padding: 8px 0;
}
.product-icon {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}
.promotion-icon {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}
.data-icon {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
}
.shop-icon {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
}
.badge.active {
  background: linear-gradient(115deg, #10b981, #059669);
  color: white;
}
.badge.inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b2e 50%, #0b1120 100%);
  position: relative;
  padding-bottom: 60px;
}
.profile-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: radial-gradient(ellipse at 50% 0%, rgba(79, 70, 229, 0.25), transparent 70%);
  pointer-events: none;
}
.top-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.nav-content-wide {
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
}
.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6700, #ff8c42);
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
  background: linear-gradient(135deg, #ff6700, #ff8c42);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nav-links {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}
.nav-link {
  color: #e2e8f0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
  padding: 6px 0;
}
.nav-link:hover {
  color: #ff6700;
}
.nav-right {
  display: flex;
  gap: 16px;
}
.nav-icon {
  position: relative;
  cursor: pointer;
  color: #cbd5e1;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}
.nav-icon:hover {
  background: rgba(255, 103, 0, 0.2);
  color: #ff6700;
}
.nav-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ff6700;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 20px;
  min-width: 18px;
  text-align: center;
}
.profile-content-wide {
  max-width: 1400px;
  margin: 0 auto;
  padding: 28px 24px;
  position: relative;
  z-index: 2;
}
.user-row {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 24px;
  margin-bottom: 24px;
}
.user-card-wide {
  background: rgba(18, 25, 45, 0.65);
  backdrop-filter: blur(16px);
  border-radius: 28px;
  padding: 28px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}
.user-avatar-wrapper {
  position: relative;
}
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(139, 92, 246, 0.6);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
.avatar-edit-btn {
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: linear-gradient(115deg, #4f46e5, #7c3aed);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #1e1b2e;
  transition: transform 0.2s;
}
.avatar-edit-btn:hover {
  transform: scale(1.1);
}
.user-info-wide {
  flex: 1;
}
.user-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.user-name {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
}
.user-badge {
  display: flex;
  gap: 8px;
}
.badge {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 50px;
  font-weight: 500;
}
.level-badge {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  border: 1px solid rgba(139, 92, 246, 0.3);
}
.user-id {
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.user-contact {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: #94a3b8;
  flex-wrap: wrap;
}
.edit-profile-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px 14px;
  border-radius: 40px;
  font-size: 12px;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.2s;
}
.edit-profile-btn:hover {
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
}
.stats-grid-wide {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background: rgba(18, 25, 45, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.stat-card-wide {
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 12px;
  border-radius: 20px;
}
.stat-card-wide:hover {
  background: rgba(255, 103, 0, 0.1);
  transform: translateY(-2px);
}
.stat-card-wide .stat-value {
  font-size: 32px;
  font-weight: 800;
  color: #ff8c42;
  margin-bottom: 6px;
}
.stat-card-wide .stat-label {
  font-size: 13px;
  color: #94a3b8;
}
.membership-card-wide {
  background: rgba(18, 25, 45, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 20px 28px;
  margin-bottom: 28px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.membership-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.membership-title {
  font-size: 14px;
  color: #cbd5e1;
  font-weight: 500;
}
.membership-value {
  font-size: 14px;
  color: #ff8c42;
  font-weight: 600;
}
.two-columns {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 24px;
  margin-bottom: 28px;
}
.menu-section-wide {
  background: rgba(18, 25, 45, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}
.section-more {
  font-size: 12px;
  color: #94a3b8;
  cursor: pointer;
  font-weight: 400;
}
.section-more:hover {
  color: #ff8c42;
}
.menu-grid-wide {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.menu-item-wide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}
.menu-item-wide:hover {
  transform: translateY(-3px);
}
.menu-icon {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.orders-icon {
  background: rgba(79, 70, 229, 0.15);
  color: #818cf8;
}
.menu-item-wide span {
  font-size: 13px;
  color: #cbd5e1;
}
.tools-section-wide {
  background: rgba(18, 25, 45, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.tools-grid-wide {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.tool-item-wide {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.tool-item-wide:hover {
  background: rgba(255, 103, 0, 0.1);
  transform: translateX(4px);
}
.tool-icon {
  width: 44px;
  height: 44px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message-icon {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}
.cs-icon {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
}
.settings-icon {
  background: rgba(139, 92, 246, 0.15);
  color: #a78bfa;
}
.tool-item-wide span {
  font-size: 14px;
  color: #e2e8f0;
  font-weight: 500;
}
.tool-badge {
  position: absolute;
  top: 8px;
  right: 12px;
  background: #ff6700;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 20px;
}
.right-column {
  display: flex;
  flex-direction: column;
}
.recent-section-wide {
  background: rgba(18, 25, 45, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.empty-recent-wide {
  text-align: center;
  padding: 32px;
  color: #5b6e8c;
}
.empty-recent-wide svg {
  margin-bottom: 12px;
  opacity: 0.5;
}
.logout-btn-wide {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 40px;
  padding: 14px;
  color: #ef4444;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  max-width: 300px;
  margin: 0 auto;
}
.logout-btn-wide:hover {
  background: rgba(220, 38, 38, 0.25);
  border-color: #ef4444;
}
.toast-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
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
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (max-width: 1000px) {
  .two-columns {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .user-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .stats-grid-wide {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 768px) {
  .nav-content-wide {
    flex-wrap: wrap;
    gap: 12px;
  }
  .nav-links {
    order: 3;
    width: 100%;
    justify-content: center;
    gap: 16px;
  }
  .menu-grid-wide {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .tools-grid-wide {
    grid-template-columns: 1fr;
  }
  .user-card-wide {
    flex-direction: column;
    text-align: center;
  }
  .user-contact {
    justify-content: center;
  }
  .user-name-row {
    justify-content: center;
  }
  .stats-grid-wide {
    grid-template-columns: repeat(2, 1fr);
  }
  .toast-message {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
  .order-item-compact {
    flex-wrap: wrap;
  }
  .order-product-img {
    width: 60px;
    height: 60px;
  }
  .order-right {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 8px;
  }
  .order-time {
    flex-wrap: wrap;
    gap: 8px;
  }
  .order-header {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
