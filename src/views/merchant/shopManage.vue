<template>
  <div class="seller-shop-page">
    <!-- 顶部导航栏 - 支持多店铺切换 -->
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
          <div class="nav-item active" @click="goToShopManage">
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

    <div class="shop-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title">店铺管理</h1>
          <span class="page-desc">管理您的店铺信息、营业状态和装修设置</span>
        </div>
        <button class="btn-primary" @click="editShopInfo">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
          </svg>
          编辑店铺信息
        </button>
      </div>

      <!-- 店铺概览卡片 -->
      <div class="shop-overview">
        <div class="overview-card">
          <div class="shop-header">
            <div class="shop-logo">
              <img :src="currentShop.shopLogo || defaultShopLogo" alt="店铺logo" />
            </div>
            <div class="shop-title">
              <h2>{{ currentShop.shopName }}</h2>
              <div class="shop-status">
                <span
                  class="status-badge"
                  :class="currentShop.workStatus === 1 ? 'status-open' : 'status-closed'"
                >
                  <span class="status-dot"></span>
                  {{ currentShop.workStatus === 1 ? '营业中' : '休息中' }}
                </span>
                <span class="shop-level">{{
                  currentShop.rating ? currentShop.rating.toFixed(1) + '分' : '新店铺'
                }}</span>
              </div>
            </div>
            <div class="shop-actions">
              <button class="btn-outline" @click="toggleShopStatus">
                {{ currentShop.workStatus === 1 ? '暂停营业' : '恢复营业' }}
              </button>
            </div>
          </div>
          <div class="shop-stats">
            <div class="stat-item">
              <div class="stat-number">{{ currentShopStats.suborderCount }}</div>
              <div class="stat-label">总订单数</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">{{ currentShopStats.skuCount }}</div>
              <div class="stat-label">商品总数</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">{{ currentShopStats.couponCount }}</div>
              <div class="stat-label">优惠券数</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">{{ currentShopStats.followerCount || 12456 }}</div>
              <div class="stat-label">粉丝数</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 店铺信息网格 -->
      <div class="info-grid">
        <!-- 基础信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h3>基础信息</h3>
            <button class="edit-link" @click="editShopInfo">编辑</button>
          </div>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">店铺名称</span
              ><span class="info-value">{{ currentShop.shopName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">店铺ID</span
              ><span class="info-value">{{ currentShop.shopId }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">店主姓名</span
              ><span class="info-value">{{ merchantInfo.realName || '未设置' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">联系电话</span
              ><span class="info-value">{{ merchantInfo.phone || '未设置' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">联系邮箱</span
              ><span class="info-value">{{
                shopEmailMap[currentShop.shopId] || merchantInfo.merchantId + '@shop.com'
              }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">主营类目</span
              ><span class="info-value">{{
                currentShop.category || merchantInfo.brand || '手机数码'
              }}</span>
            </div>
          </div>
        </div>

        <!-- 店铺展示卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h3>商家简介</h3>
            <button class="edit-link" @click="editShopDisplay">编辑</button>
          </div>
          <div class="shop-description">
            <p>{{ currentShop.intro || merchantInfo.intro || '暂无简介，点击编辑添加商家介绍' }}</p>
          </div>
          <div class="shop-tags">
            <span class="tag">官方旗舰店</span><span class="tag">正品保证</span
            ><span class="tag">极速发货</span>
          </div>
        </div>

        <!-- 营业信息卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h3>营业信息</h3>
            <button class="edit-link" @click="editBusinessInfo">编辑</button>
          </div>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">营业时间</span
              ><span class="info-value">{{ currentShop.businessHours || '09:00 - 21:00' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">联系电话</span
              ><span class="info-value">{{
                currentShop.servicePhone || merchantInfo.phone || '未设置'
              }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">店铺地址</span
              ><span class="info-value">{{ currentShop.address || '北京市朝阳区' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">入驻时间</span
              ><span class="info-value">{{
                formatDate(currentShop.createTime) || formatDate(merchantInfo.createTime)
              }}</span>
            </div>
          </div>
        </div>

        <!-- 资质认证卡片 -->
        <div class="info-card">
          <div class="card-header">
            <h3>资质认证</h3>
            <button class="edit-link" @click="editCertification">管理</button>
          </div>
          <div class="cert-list">
            <div class="cert-item">
              <div class="cert-icon verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div class="cert-info">
                <span class="cert-name">企业营业执照</span
                ><span class="cert-status status-verified">已认证</span>
              </div>
            </div>
            <div class="cert-item">
              <div class="cert-icon verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div class="cert-info">
                <span class="cert-name">品牌授权书</span
                ><span class="cert-status status-verified">已认证</span>
              </div>
            </div>
            <div class="cert-item">
              <div class="cert-icon verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div class="cert-info">
                <span class="cert-name">身份证实名认证</span
                ><span class="cert-status status-verified">已认证</span>
              </div>
            </div>
            <div class="cert-item">
              <div class="cert-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div class="cert-info">
                <span class="cert-name">食品经营许可证</span
                ><span class="cert-status status-pending">待认证</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑店铺弹窗 -->
    <div v-if="editModalVisible" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content shop-edit-modal">
        <div class="modal-header">
          <h3>编辑店铺信息 - {{ currentShop.shopName }}</h3>
          <button class="close-btn" @click="closeEditModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <label>店铺名称</label
            ><input v-model="editForm.shopName" placeholder="请输入店铺名称" />
          </div>
          <div class="form-row">
            <label>联系电话</label><input v-model="editForm.phone" placeholder="联系电话" />
          </div>
          <div class="form-row">
            <label>联系邮箱</label><input v-model="editForm.email" placeholder="邮箱地址" />
          </div>
          <div class="form-row">
            <label>商家简介</label
            ><textarea v-model="editForm.intro" rows="3" placeholder="商家简介"></textarea>
          </div>
          <div class="form-row">
            <label>店铺地址</label><input v-model="editForm.address" placeholder="详细地址" />
          </div>
          <div class="form-row">
            <label>营业时间</label
            ><input v-model="editForm.businessHours" placeholder="如：09:00 - 21:00" />
          </div>
          <div class="form-row">
            <label>主营类目</label><input v-model="editForm.category" placeholder="主营类目" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeEditModal">取消</button
          ><button class="btn-primary" @click="saveShopInfo">保存修改</button>
        </div>
      </div>
    </div>

    <!-- 消息弹窗 - 改为物流信息、支付信息、退款信息 -->
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
              <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg
            >消息通知
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
    <Transition name="toast"
      ><div v-if="toast.visible" class="toast" :class="{ 'toast-error': toast.isError }">
        {{ toast.message }}
      </div></Transition
    >
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { get_merchant_info } from '@/api/merchant'

const router = useRouter()

// 默认图片
const defaultShopLogo = 'https://picsum.photos/80/80?random=shop'

// 商家基本信息
const merchantInfo = reactive({
  realName: '',
  idCard: '',
  brand: '',
  merchantName: '',
  merchantId: '',
  qualificationCertificate: '',
  phone: '',
  intro: '',
  merchantStatus: 1,
  createTime: '',
})

// 店铺列表
const shopList = ref([])
const currentShop = ref({})
const currentShopStats = reactive({
  suborderCount: 0,
  skuCount: 0,
  couponCount: 0,
  followerCount: 0,
})
const shopEmailMap = reactive({})
const shopDropdownVisible = ref(false)

// 弹窗
const editModalVisible = ref(false)
const editForm = reactive({
  shopName: '',
  phone: '',
  email: '',
  intro: '',
  address: '',
  businessHours: '',
  category: '',
})

// 右上角功能
const userMenuVisible = ref(false)
const messageModalVisible = ref(false)
const activeTabMsg = ref('logistic')

// ========== 消息相关（从API获取） ==========
const logisticMessages = ref([])
const paymentMessages = ref([])
const refundMessages = ref([])
const logisticUnreadCount = ref(0)
const paymentUnreadCount = ref(0)
const refundUnreadCount = ref(0)
const totalUnreadCount = computed(
  () => logisticUnreadCount.value + paymentUnreadCount.value + refundUnreadCount.value,
)
const currentMessages = computed(() => {
  if (activeTabMsg.value === 'logistic') return logisticMessages.value
  if (activeTabMsg.value === 'payment') return paymentMessages.value
  return refundMessages.value
})

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

const formatDate = (date) => {
  if (!date) return '未知'
  return date
}
const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.slice(0, 16)
}

// 获取店铺统计数据
const loadShopStats = async (shopId) => {
  const shopStatsMap = {
    '2049429302554521601': {
      suborderCount: 86,
      skuCount: 13,
      couponCount: 9,
      followerCount: 12456,
    },
    '2049429302554521602': { suborderCount: 42, skuCount: 8, couponCount: 5, followerCount: 5678 },
    '2049429302554521603': {
      suborderCount: 128,
      skuCount: 21,
      couponCount: 12,
      followerCount: 23456,
    },
  }
  const stats = shopStatsMap[shopId] || {
    suborderCount: 0,
    skuCount: 0,
    couponCount: 0,
    followerCount: 0,
  }
  Object.assign(currentShopStats, stats)
}

// 获取真实API数据
const fetchMerchantData = async () => {
  try {
    const res = await get_merchant_info()
    if (res.code === 200) {
      const data = res.data
      Object.assign(merchantInfo, {
        realName: data.realName || '',
        idCard: data.idCard || '',
        brand: data.brand || '',
        merchantName: data.merchantName || '',
        merchantId: data.merchantId || '',
        qualificationCertificate: data.qualificationCertificate || '',
        phone: data.phone || '',
        intro: data.intro || '',
        merchantStatus: data.merchantStatus || 1,
        createTime: data.createTime || '',
      })

      // 获取消息数据
      logisticMessages.value = data.myLogisticMessageList || []
      paymentMessages.value = data.myPayMessageList || []
      refundMessages.value = data.myRefundMessageList || []
      logisticUnreadCount.value = logisticMessages.value.filter((msg) => !msg.isRead).length
      paymentUnreadCount.value = paymentMessages.value.filter((msg) => !msg.isRead).length
      refundUnreadCount.value = refundMessages.value.filter((msg) => !msg.isRead).length

      if (data.myShopList && data.myShopList.length > 0) {
        shopList.value = data.myShopList.map((shop) => ({
          shopId: shop.shopId,
          shopName: shop.shopName,
          shopLogo: shop.shopLogo || defaultShopLogo,
          workStatus: shop.workStatus,
          rating: shop.rating || 0,
          createTime: shop.createTime,
          address: shop.address || '北京市朝阳区',
          businessHours: shop.businessHours || '09:00 - 21:00',
          servicePhone: shop.servicePhone || data.phone,
          category: shop.category || data.brand,
          intro: shop.intro || data.intro,
        }))
        shopList.value.forEach((shop) => {
          shopEmailMap[shop.shopId] = `${shop.shopId}@shop.com`
        })
        currentShop.value = shopList.value[0]
        await loadShopStats(currentShop.value.shopId)
      } else {
        const defaultShop = {
          shopId: data.merchantId || 'default',
          shopName: data.merchantName || '我的店铺',
          shopLogo: defaultShopLogo,
          workStatus: 1,
          rating: 4.8,
          createTime: data.createTime,
          address: '北京市朝阳区',
          businessHours: '09:00 - 21:00',
          servicePhone: data.phone,
          category: data.brand,
          intro: data.intro,
        }
        shopList.value = [defaultShop]
        shopEmailMap[defaultShop.shopId] = defaultShop.shopId + '@shop.com'
        currentShop.value = defaultShop
        await loadShopStats(defaultShop.shopId)
      }
    } else {
      showMessage(res.msg || '获取数据失败', true)
    }
  } catch (error) {
    console.error('获取商家信息失败:', error)
    showMessage('网络错误，无法获取店铺信息', true)
  }
}

// 店铺切换
const toggleShopDropdown = () => {
  shopDropdownVisible.value = !shopDropdownVisible.value
}
const switchShop = async (shop) => {
  if (currentShop.value.shopId === shop.shopId) return
  currentShop.value = shop
  shopDropdownVisible.value = false
  await loadShopStats(shop.shopId)
  showMessage(`已切换到店铺：${shop.shopName}`)
}

// 店铺操作
const editShopInfo = () => {
  Object.assign(editForm, {
    shopName: currentShop.value.shopName,
    phone: currentShop.value.servicePhone || merchantInfo.phone,
    email: shopEmailMap[currentShop.value.shopId] || '',
    intro: currentShop.value.intro || merchantInfo.intro,
    address: currentShop.value.address || '',
    businessHours: currentShop.value.businessHours || '09:00 - 21:00',
    category: currentShop.value.category || '',
  })
  editModalVisible.value = true
}
const closeEditModal = () => {
  editModalVisible.value = false
}
const saveShopInfo = () => {
  Object.assign(currentShop.value, {
    shopName: editForm.shopName,
    servicePhone: editForm.phone,
    intro: editForm.intro,
    address: editForm.address,
    businessHours: editForm.businessHours,
    category: editForm.category,
  })
  shopEmailMap[currentShop.value.shopId] = editForm.email
  closeEditModal()
  showMessage('店铺信息已更新（演示模式，实际需调用API）')
}
const toggleShopStatus = () => {
  currentShop.value.workStatus = currentShop.value.workStatus === 1 ? 0 : 1
  showMessage(`店铺已${currentShop.value.workStatus === 1 ? '恢复营业' : '暂停营业'}`)
}
const editShopDisplay = () => {
  showMessage('店铺展示编辑功能开发中...')
}
const editBusinessInfo = () => {
  editShopInfo()
}
const editCertification = () => {
  showMessage('资质认证管理功能开发中...')
}

// 消息相关
const openMessageModal = () => {
  messageModalVisible.value = true
}
const closeMessageModal = () => {
  messageModalVisible.value = false
}
const markCurrentTabAsRead = () => {
  const messages = currentMessages.value
  messages.forEach((msg) => (msg.isRead = true))
  if (activeTabMsg.value === 'logistic') logisticUnreadCount.value = 0
  else if (activeTabMsg.value === 'payment') paymentUnreadCount.value = 0
  else refundUnreadCount.value = 0
  showMessage('已全部标为已读')
}

// 右上角功能
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
  if (shopSelector && !shopSelector.contains(e.target)) shopDropdownVisible.value = false
  const userActions = document.querySelector('.user-actions')
  if (userActions && !userActions.contains(e.target)) userMenuVisible.value = false
}
const logout = () => {
  showMessage('正在退出登录...')
  setTimeout(() => {
    localStorage.clear()
    router.push('/login')
  }, 1500)
}

// 导航
const goToHome = () => router.push('/')
const goToDashboard = () => router.push('/seller/dashboard')
const goToOrders = () => router.push('/order/suborder/managerment')
const goToAfterSales = () => router.push('/merchant/after-sale')
const goToCoupons = () => router.push('/coupon/manage')
const goToProducts = () => router.push('/merchant/productManage')
const goToShopManage = () => router.push('/merchant/shopManage')
const goToProfile = () => router.push('/merchant/detail/' + merchantInfo.merchantId)

onMounted(() => {
  fetchMerchantData()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 所有样式保持不变，新增消息模块样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.seller-shop-page {
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
.shop-container {
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

.btn-primary {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(255, 103, 0, 0.3);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(255, 103, 0, 0.35);
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
}

.btn-outline:hover {
  border-color: #ff6700;
  color: #ff6700;
  background: #fff7ed;
}

/* 店铺概览 */
.shop-overview {
  margin-bottom: 28px;
}

.overview-card {
  background: linear-gradient(135deg, #ffffff, #fef9f5);
  border-radius: 28px;
  padding: 28px 32px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 103, 0, 0.1);
}

.shop-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.shop-logo {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  border: 2px solid #ff6700;
}

.shop-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-title h2 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.shop-status {
  display: flex;
  gap: 12px;
  align-items: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 30px;
  font-weight: 500;
}

.status-open {
  background: #dcfce7;
  color: #10b981;
}

.status-closed {
  background: #fee2e2;
  color: #ef4444;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.shop-level {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #b45309;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}

.shop-actions {
  margin-left: auto;
}

.shop-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fafcff;
  border-radius: 20px;
  padding: 20px 0;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
}

.stat-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #edf2f7;
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}

.info-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 20px 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.edit-link {
  background: none;
  border: none;
  color: #ff6700;
  font-size: 12px;
  cursor: pointer;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-row {
  display: flex;
  font-size: 13px;
}

.info-label {
  width: 90px;
  color: #64748b;
}

.info-value {
  color: #1e293b;
  flex: 1;
  word-break: break-all;
}

.shop-banner {
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
  height: 100px;
}

.shop-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-description p {
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 16px;
}

.shop-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  color: #475569;
}

/* 资质认证 */
.cert-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cert-icon {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cert-icon.verified {
  background: #dcfce7;
  color: #10b981;
}

.cert-icon:not(.verified) {
  background: #fef3c7;
  color: #d97706;
}

.cert-icon svg {
  width: 20px;
  height: 20px;
}

.cert-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cert-name {
  font-size: 13px;
  color: #1e293b;
}

.cert-status {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 20px;
}

.status-verified {
  background: #dcfce7;
  color: #10b981;
}

.status-pending {
  background: #fef3c7;
  color: #d97706;
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
  width: 520px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.shop-edit-modal {
  width: 560px;
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

.form-row {
  margin-bottom: 18px;
}

.form-row label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 6px;
}

.form-row input,
.form-row textarea,
.form-row select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.form-row input:focus,
.form-row textarea:focus {
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

/* 消息弹窗样式 */
.message-modal {
  width: 550px;
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
@media (max-width: 1000px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  .shop-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .shop-actions {
    margin-left: 0;
  }
  .shop-stats {
    flex-wrap: wrap;
    gap: 16px;
  }
  .stat-divider {
    display: none;
  }
  .nav-content {
    flex-direction: column;
  }
  .shop-selector {
    order: 3;
  }
  .user-actions {
    order: 4;
  }
}
@media (max-width: 768px) {
  .nav-links .nav-item span {
    display: none;
  }
  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }
  .info-row {
    flex-direction: column;
    gap: 4px;
  }
  .info-label {
    width: auto;
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
