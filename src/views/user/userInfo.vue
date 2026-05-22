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
          <span>小米生态商城</span>
        </div>
        <div class="nav-links">
          <div class="nav-link" @click="goToHome">首页</div>
          <div class="nav-link" @click="goToOrders">我的订单</div>
          <div class="nav-link" @click="goToFavorites">收藏夹</div>
        </div>
        <div class="nav-right">
          <div class="nav-icon" @click="openMessageModal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
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
      <!-- 用户行：用户卡片 + 数据统计 -->
      <div class="user-row">
        <div class="user-card-wide">
          <div class="user-avatar-wrapper">
            <img :src="userInfo.avatar || defaultAvatar" class="user-avatar" alt="头像" />
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
              <h2 class="user-name">{{ userInfo.nickname }}</h2>
              <div class="user-badge">
                <span class="badge" :class="userInfo.vipLevel">
                  {{ getVipLevelText(userInfo.vipLevel) }}
                </span>
                <span class="badge level-badge">Lv.{{ userInfo.level }}</span>
              </div>
            </div>
            <p class="user-id">ID: {{ userInfo.userId }}</p>
            <div class="user-contact">
              <span>📞 {{ userInfo.phone || '未绑定' }}</span>
              <span>✉️ {{ userInfo.email || '未绑定' }}</span>
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
          <div class="stat-card-wide" @click="goToFavorites">
            <div class="stat-value">{{ stats.favoriteCount }}</div>
            <div class="stat-label">收藏商品</div>
          </div>
          <div class="stat-card-wide" @click="goToCoupons">
            <div class="stat-value">{{ stats.couponCount }}</div>
            <div class="stat-label">优惠券</div>
          </div>
          <div class="stat-card-wide" @click="goToPoints">
            <div class="stat-value">{{ stats.points }}</div>
            <div class="stat-label">积分</div>
          </div>
        </div>
      </div>

      <!-- 会员进度条 -->
      <div class="membership-card-wide" v-if="userInfo.growthValue !== undefined">
        <div class="membership-header">
          <span class="membership-title">会员成长值</span>
          <span class="membership-value">{{ userInfo.growthValue }} / {{ nextLevelGrowth }}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: growthProgress + '%' }"></div>
        </div>
        <div class="membership-tip">再消费 ¥{{ needAmount }} 升级下一等级</div>
      </div>

      <!-- 两列内容布局 -->
      <div class="two-columns">
        <div class="left-column">
          <div class="menu-section-wide">
            <div class="section-title">
              <span>我的服务</span>
              <span class="section-more" @click="viewAllServices">查看全部 &gt;</span>
            </div>
            <div class="menu-grid-wide">
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
                <span>我的订单</span>
              </div>
              <div class="menu-item-wide" @click="goToWallet">
                <div class="menu-icon wallet-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                    <line x1="16" y1="10" x2="16" y2="14" />
                  </svg>
                </div>
                <span>我的钱包</span>
              </div>
              <div class="menu-item-wide" @click="goToAddress">
                <div class="menu-icon address-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>收货地址</span>
              </div>
              <div class="menu-item-wide" @click="goToCoupons">
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
                <span>优惠券</span>
              </div>
              <div class="menu-item-wide" @click="goToAfterSale">
                <div class="menu-icon service-icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span>售后服务</span>
              </div>
              <div class="menu-item-wide" @click="goToPointsMall">
                <div class="menu-icon points-icon">
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
                <span>积分商城</span>
              </div>
            </div>
          </div>

          <div class="tools-section-wide">
            <div class="section-title">
              <span>工具与服务</span>
            </div>
            <div class="tools-grid-wide">
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
                <span>我的消息</span>
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
              <div class="tool-item-wide" @click="goToHelpCenter">
                <div class="tool-icon help-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <span>帮助中心</span>
              </div>
            </div>
          </div>
        </div>

        <div class="right-column">
          <div class="recent-section-wide">
            <div class="section-title">
              <span>最近浏览</span>
              <span class="section-more" @click="clearRecent">清空</span>
            </div>
            <div class="recent-grid-wide">
              <div
                v-for="item in recentProducts"
                :key="item.id"
                class="recent-item-wide"
                @click="goToProduct(item.id)"
              >
                <img :src="item.image" :alt="item.name" class="recent-img" />
                <div class="recent-name">{{ item.name }}</div>
                <div class="recent-price">¥{{ formatPrice(item.price) }}</div>
              </div>
              <div v-if="recentProducts.length === 0" class="empty-recent-wide">
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
                <p>暂无浏览记录</p>
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
              物流消息
              <span v-if="logisticUnreadCount > 0" class="msg-badge">{{
                logisticUnreadCount
              }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeMsgTab === 'payment' }"
              @click="activeMsgTab = 'payment'"
            >
              支付消息
              <span v-if="paymentUnreadCount > 0" class="msg-badge">{{ paymentUnreadCount }}</span>
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeMsgTab === 'refund' }"
              @click="activeMsgTab = 'refund'"
            >
              退款消息
              <span v-if="refundUnreadCount > 0" class="msg-badge">{{ refundUnreadCount }}</span>
            </button>
          </div>

          <!-- 物流消息列表 -->
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

          <!-- 支付消息列表 -->
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

          <!-- 退款消息列表 -->
          <div class="message-list" v-if="activeMsgTab === 'refund'">
            <div
              v-for="msg in refundMessages"
              :key="msg.notifyId"
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
      <div v-if="toast.visible" class="toast-message" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { get_user_info } from '@/api/user'

const router = useRouter()

// 默认头像
const defaultAvatar =
  'https://storage.360buyimg.com/default.image/6a645f6465665f696d675f393836323131373632333134353935323236_sma.jpg'

// 用户信息
const userInfo = reactive({
  userId: '',
  nickname: '',
  avatar: '',
  vipLevel: 'normal',
  level: 0,
  growthValue: 0,
  phone: '',
  email: '',
  role: '',
})

// 统计数据
const stats = reactive({
  orderCount: 0,
  unreadCount: 0,
  favoriteCount: 0,
  couponCount: 0,
  points: 0,
})

// 消息相关
const messageModalVisible = ref(false)
const activeMsgTab = ref('logistic')
const logisticMessages = ref([])
const paymentMessages = ref([])
const refundMessages = ref([])
const logisticUnreadCount = ref(0)
const paymentUnreadCount = ref(0)
const refundUnreadCount = ref(0)

// 总未读数
const totalUnreadCount = computed(() => {
  return logisticUnreadCount.value + paymentUnreadCount.value + refundUnreadCount.value
})

// 当前标签页的消息列表
const currentMessages = computed(() => {
  if (activeMsgTab.value === 'logistic') return logisticMessages.value
  if (activeMsgTab.value === 'payment') return paymentMessages.value
  return refundMessages.value
})

// 最近浏览商品
const recentProducts = ref([])

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

// 格式化价格
const formatPrice = (price) => {
  if (price === undefined || price === null) return '0'
  return price.toLocaleString()
}

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.slice(0, 16).replace('T', ' ')
}

// 获取VIP等级文本
const getVipLevelText = (level) => {
  const map = {
    platinum: '铂金会员',
    gold: '黄金会员',
    normal: '普通会员',
  }
  return map[level] || '普通会员'
}

// 会员等级相关计算
const nextLevelGrowth = computed(() => {
  if (userInfo.vipLevel === 'platinum') return 10000
  if (userInfo.vipLevel === 'gold') return 5000
  return 2000
})

const growthProgress = computed(() => {
  if (userInfo.vipLevel === 'platinum') {
    return (userInfo.growthValue / 10000) * 100
  }
  if (userInfo.vipLevel === 'gold') {
    return (userInfo.growthValue / 5000) * 100
  }
  return (userInfo.growthValue / 2000) * 100
})

const needAmount = computed(() => {
  const remain = nextLevelGrowth.value - userInfo.growthValue
  return Math.ceil(remain / 10)
})

// 消息弹窗控制
const openMessageModal = () => {
  messageModalVisible.value = true
}

const closeMessageModal = () => {
  messageModalVisible.value = false
}

// 将当前标签页的所有消息标为已读
const markCurrentTabAsRead = () => {
  const messages = currentMessages.value
  messages.forEach((msg) => {
    msg.isRead = true
  })

  if (activeMsgTab.value === 'logistic') {
    logisticUnreadCount.value = 0
  } else if (activeMsgTab.value === 'payment') {
    paymentUnreadCount.value = 0
  } else {
    refundUnreadCount.value = 0
  }

  showMessage('已全部标为已读')
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await get_user_info()
    if (response.code === 200) {
      const data = response.data
      userInfo.userId = data.userId
      userInfo.nickname = data.userName
      userInfo.avatar = data.userAvatar || defaultAvatar
      userInfo.phone = data.phone || '未绑定'
      userInfo.email = data.email || '未绑定'
      userInfo.role = data.role
      userInfo.level = 3
      userInfo.growthValue = 1250
      userInfo.vipLevel = data.role === 1 ? 'gold' : 'normal'

      stats.orderCount = data.suborderCount || 0
      stats.couponCount = data.couponCount || 0

      stats.points = 1280
      stats.favoriteCount = 12

      // 获取消息数据
      logisticMessages.value = data.myLogisticMessageList || []
      paymentMessages.value = data.myPayMessageList || []
      refundMessages.value = data.myRefundMessageList || []

      // 计算未读数
      logisticUnreadCount.value = logisticMessages.value.filter((msg) => !msg.isRead).length
      paymentUnreadCount.value = paymentMessages.value.filter((msg) => !msg.isRead).length
      refundUnreadCount.value = refundMessages.value.filter((msg) => !msg.isRead).length
    } else {
      showMessage(response.msg || '获取用户信息失败', true)
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    showMessage('网络错误，无法获取用户信息', true)
  }
}

// 加载最近浏览记录
const loadRecentProducts = () => {
  const stored = localStorage.getItem('recent_products')
  if (stored) {
    try {
      recentProducts.value = JSON.parse(stored)
    } catch (e) {
      recentProducts.value = []
    }
  }
}

// 清空最近浏览
const clearRecent = () => {
  recentProducts.value = []
  localStorage.removeItem('recent_products')
  showMessage('已清空浏览记录')
}

// 导航功能
const goToHome = () => router.push('/')
const goToMessages = () => openMessageModal()
const goToCustomerService = () => router.push('/customer-service')
const goToSettings = () => router.push('/user/settings')
const goToHelpCenter = () => router.push('/help-center')
const goToWallet = () => router.push('/user/wallet')
const editAvatar = () => showMessage('头像编辑功能开发中')
const editProfile = () => router.push('/user/update')
const goToOrders = () => router.push('/order/suborder/list')
const goToFavorites = () => router.push('/user/favorites')
const goToAddress = () => router.push('/user/address')
const goToCoupons = () => router.push('/coupon/manage')
const goToAfterSale = () => router.push('/merchant/after-sale')
const goToPointsMall = () => router.push('/points/mall')
const goToPoints = () => router.push('/points/detail')
const goToProduct = (id) => router.push(`/product/detail/${id}`)
const viewAllServices = () => router.push('/user/services')

const handleLogout = () => {
  localStorage.removeItem('mall-user_merchant-info')
  sessionStorage.removeItem('mall-user_merchant-info')
  showMessage('已退出登录，即将跳转至登录页')
  setTimeout(() => {
    router.push('/login')
  }, 1500)
}

onMounted(() => {
  fetchUserInfo()
  loadRecentProducts()
})
</script>

<style scoped>
/* 原有样式保持不变，添加消息弹窗样式 */

/* 消息弹窗样式 */
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
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 28px;
  width: 550px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
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

.empty-message p {
  font-size: 14px;
}

/* 其余原有样式保持不变 */
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

.badge.platinum {
  background: linear-gradient(115deg, #e2e8f0, #cbd5e1);
  color: #1e293b;
}

.badge.gold {
  background: linear-gradient(115deg, #fbbf24, #f59e0b);
  color: #78350f;
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

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6700, #ff8c42);
  border-radius: 10px;
  transition: width 0.3s ease;
}

.membership-tip {
  font-size: 12px;
  color: #5b6e8c;
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
  transition: all 0.2s;
}

.orders-icon {
  background: rgba(79, 70, 229, 0.15);
  color: #818cf8;
}
.wallet-icon {
  background: rgba(236, 72, 153, 0.15);
  color: #f472b6;
}
.address-icon {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
}
.coupons-icon {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}
.service-icon {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
}
.points-icon {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
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
.help-icon {
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
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
}

.recent-grid-wide {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.recent-item-wide {
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
}

.recent-item-wide:hover {
  transform: translateY(-3px);
}

.recent-img {
  width: 100%;
  aspect-ratio: 1;
  max-width: 120px;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 12px;
  background: rgba(0, 0, 0, 0.3);
  display: block;
}

.recent-name {
  font-size: 13px;
  color: #e2e8f0;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.recent-price {
  font-size: 14px;
  font-weight: 700;
  color: #ff8c42;
  text-align: center;
}

.empty-recent-wide {
  grid-column: span 2;
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
  .recent-grid-wide {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .recent-img {
    max-width: 100%;
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
    gap: 20px;
  }
  .menu-grid-wide {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .tools-grid-wide {
    grid-template-columns: 1fr;
  }
  .recent-grid-wide {
    grid-template-columns: repeat(2, 1fr);
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
}
</style>
