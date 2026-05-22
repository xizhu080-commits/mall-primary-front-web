<template>
  <div class="seller-coupon-page">
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
          <span>优惠卷中心 | JD生态商城</span>
        </div>

        <!-- 首页按钮 -->
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
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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
          <div class="nav-item active" @click="goToCoupons">
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

        <!-- 右上角功能区域 -->
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
    <div class="coupon-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title">优惠券管理</h1>
          <span class="page-desc">管理店铺优惠券，支持满减券和折扣券的创建与发放</span>
        </div>
        <button class="btn-primary" @click="openCreateModal">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-linecap="round" />
          </svg>
          新建优惠券
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
                d="M20 12V8h-2.5M4 12V8h2.5M8 4h8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.total }}</span>
            <span class="stat-label">总优惠券数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon active-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.active }}</span>
            <span class="stat-label">进行中</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon expired-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.expired }}</span>
            <span class="stat-label">已失效</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon claimed-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.claimedTotal }}</span>
            <span class="stat-label">已领取</span>
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
            :class="{ active: filters.status === 'active' }"
            @click="filters.status = 'active'"
          >
            进行中
          </div>
          <div
            class="filter-item"
            :class="{ active: filters.status === 'expired' }"
            @click="filters.status = 'expired'"
          >
            已失效
          </div>
          <div
            class="filter-item"
            :class="{ active: filters.status === 'pending' }"
            @click="filters.status = 'pending'"
          >
            未开始
          </div>
        </div>
        <div class="filter-group">
          <label>优惠券类型</label>
          <select v-model="filters.couponType" class="category-select">
            <option :value="null">全部</option>
            <option :value="1">满减券</option>
            <option :value="2">折扣券</option>
          </select>
        </div>
        <div class="filter-group">
          <label>活动类型</label>
          <select v-model="filters.activeType" class="category-select">
            <option :value="null">全部</option>
            <option :value="1">普通优惠券</option>
            <option :value="2">会员优惠券</option>
            <option :value="3">大促优惠券</option>
          </select>
        </div>
        <div class="filter-group">
          <label>是否可叠加</label>
          <select v-model="filters.stackable" class="category-select">
            <option :value="null">全部</option>
            <option :value="0">不可叠加</option>
            <option :value="1">可叠加</option>
          </select>
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
          <input type="text" v-model="filters.keyword" placeholder="搜索优惠券名称" />
        </div>
      </div>

      <!-- 优惠券表格 - 新增活动类型和是否可叠加列 -->
      <div class="table-container">
        <table class="coupon-table">
          <thead>
            <tr>
              <th>优惠券名称</th>
              <th>类型</th>
              <th>活动类型</th>
              <th>是否可叠加</th>
              <th>面额/折扣</th>
              <th>使用门槛</th>
              <th>有效期</th>
              <th>发放量</th>
              <th>剩余量</th>
              <th>已领取</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coupon in paginatedCoupons" :key="coupon.templateId">
              <td>
                <span class="coupon-name">{{ coupon.couponName }}</span>
              </td>
              <td>
                <span
                  class="type-badge"
                  :class="coupon.couponType === 1 ? 'type-full' : 'type-discount'"
                >
                  {{ coupon.couponType === 1 ? '满减券' : '折扣券' }}
                </span>
              </td>
              <td>
                <span class="active-type-badge" :class="getActiveTypeClass(coupon.activeType)">
                  {{ getActiveTypeText(coupon.activeType) }}
                </span>
              </td>
              <td>
                <span
                  class="stackable-badge"
                  :class="coupon.stackable === 1 ? 'stackable-yes' : 'stackable-no'"
                >
                  {{ coupon.stackable === 1 ? '可叠加' : '不可叠加' }}
                </span>
              </td>
              <td class="value-cell">{{ getCouponValue(coupon) }}</td>
              <td>{{ getThresholdText(coupon) }}</td>
              <td class="date-cell">
                {{ formatDate(coupon.startTime) }} ~ {{ formatDate(coupon.endTime) }}
              </td>
              <td>{{ coupon.totalCount || 0 }}</td>
              <td>{{ coupon.remainCount || 0 }}</td>
              <td>{{ (coupon.totalCount || 0) - (coupon.remainCount || 0) }}</td>
              <td>
                <span class="status-badge" :class="getStatusClass(coupon)">
                  {{ getStatusText(coupon) }}
                </span>
              </td>
              <td class="action-cell">
                <button class="action-btn edit" @click="openEditModal(coupon)">编辑</button>
                <button class="action-btn delete" @click="confirmDelete(coupon)">删除</button>
              </td>
            </tr>
            <tr v-if="loading && coupons.length === 0">
              <td colspan="12" class="empty-row">加载中...</td>
            </tr>
            <tr v-else-if="filteredCoupons.length === 0">
              <td colspan="12" class="empty-row">暂无优惠券数据</td>
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

    <!-- 优惠券创建/编辑弹窗 -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content coupon-modal">
        <div class="modal-header">
          <h3>{{ isEdit ? '编辑优惠券' : '新建优惠券' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <!-- 基本信息 -->
          <div class="form-section-title">基本信息</div>
          <div class="form-row">
            <label>优惠券名称 <span class="required">*</span></label>
            <input v-model="formData.couponName" placeholder="请输入优惠券名称" />
          </div>
          <div class="form-row-group">
            <div class="form-row half">
              <label>优惠券类型 <span class="required">*</span></label>
              <select v-model="formData.couponType">
                <option :value="1">满减券</option>
                <option :value="2">折扣券</option>
              </select>
            </div>
            <div class="form-row half">
              <label>活动类型 <span class="required">*</span></label>
              <select v-model="formData.activeType">
                <option :value="1">普通优惠券</option>
                <option :value="2">会员优惠券</option>
                <option :value="3">大促优惠券</option>
              </select>
            </div>
          </div>
          <div class="form-row-group">
            <div class="form-row half">
              <label>是否可叠加</label>
              <select v-model="formData.stackable">
                <option :value="0">不可叠加</option>
                <option :value="1">可叠加</option>
              </select>
            </div>
            <div class="form-row half">
              <label>每人限领</label>
              <input
                v-model.number="formData.getLimit"
                type="number"
                placeholder="每人最多可领数量"
              />
            </div>
          </div>

          <!-- 优惠规则 -->
          <div class="form-section-title">优惠规则</div>
          <div class="form-row-group">
            <div class="form-row half">
              <label>使用门槛(元)</label>
              <div class="input-prefix">
                <span>满</span>
                <input
                  v-model.number="formData.thresholdAmount"
                  type="number"
                  placeholder="0"
                  step="0.01"
                />
                <span>元</span>
              </div>
              <div class="form-hint">0表示无门槛</div>
            </div>
            <div class="form-row half">
              <label v-if="formData.couponType === 1"
                >优惠金额 <span class="required">*</span></label
              >
              <label v-else>折扣率 <span class="required">*</span></label>
              <div class="input-prefix" v-if="formData.couponType === 1">
                <span>¥</span>
                <input
                  v-model.number="formData.discountAmount"
                  type="number"
                  placeholder="优惠金额"
                  step="0.01"
                />
              </div>
              <div class="input-prefix" v-else>
                <input
                  v-model.number="formData.discountRate"
                  type="number"
                  placeholder="如0.8表示八折"
                  step="0.01"
                />
                <span>折</span>
              </div>
            </div>
          </div>

          <!-- 有效期设置 -->
          <div class="form-section-title">有效期设置</div>
          <div class="form-row-group">
            <div class="form-row half">
              <label>开始时间 <span class="required">*</span></label>
              <input type="datetime-local" v-model="formData.startTime" />
            </div>
            <div class="form-row half">
              <label>结束时间 <span class="required">*</span></label>
              <input type="datetime-local" v-model="formData.endTime" />
            </div>
          </div>

          <!-- 库存设置 -->
          <div class="form-section-title">库存设置</div>
          <div class="form-row-group">
            <div class="form-row half">
              <label>发放总量 <span class="required">*</span></label>
              <input v-model.number="formData.totalCount" type="number" placeholder="库存数量" />
            </div>
            <div class="form-row half">
              <label>剩余数量</label>
              <input
                v-model.number="formData.remainCount"
                type="number"
                placeholder="剩余数量"
                :disabled="!isEdit"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeModal">取消</button>
          <button class="btn-primary" @click="saveCoupon" :disabled="submitting">
            {{ submitting ? '保存中...' : '保存优惠券' }}
          </button>
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
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { get_merchant_info } from '@/api/merchant'
import { createCouponTemplate, updateCouponTemplate, deleteCouponTemplate } from '@/api/coupon'

const router = useRouter()

// 默认图片
const defaultShopLogo = 'https://picsum.photos/80/80?random=shop'

// 店铺数据
const shopList = ref([])
const currentShop = ref({})
const shopDropdownVisible = ref(false)

// 优惠券数据
const coupons = ref([])
const loading = ref(false)
const submitting = ref(false)

// 统计数据
const stats = reactive({
  total: 0,
  active: 0,
  expired: 0,
  claimedTotal: 0,
})

// 筛选条件
const filters = reactive({
  status: 'all',
  couponType: null,
  activeType: null,
  stackable: null,
  keyword: '',
})

// 分页
const currentPage = ref(1)
const pageSize = 10

// 弹窗相关
const modalVisible = ref(false)
const isEdit = ref(false)
const editId = ref(null)

// 活动类型映射
const getActiveTypeText = (type) => {
  const map = { 1: '普通优惠券', 2: '会员优惠券', 3: '大促优惠券' }
  return map[type] || '普通优惠券'
}

const getActiveTypeClass = (type) => {
  const map = { 1: 'active-normal', 2: 'active-member', 3: 'active-promo' }
  return map[type] || 'active-normal'
}

// 是否可叠加映射
const getStackableText = (stackable) => {
  return stackable === 1 ? '可叠加' : '不可叠加'
}

// 表单数据 - 匹配API格式
const getEmptyForm = () => ({
  couponName: '',
  couponType: 1, // 1:满减券, 2:折扣券
  thresholdAmount: 0,
  discountAmount: 0,
  discountRate: 0,
  stackable: 0, // 0:不可叠加, 1:可叠加
  startTime: '',
  endTime: '',
  totalCount: 0,
  remainCount: 0,
  activeType: 1, // 1:普通, 2:会员, 3:大促
  getLimit: 1,
})

const formData = ref(getEmptyForm())

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
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.replace(' ', ' ').slice(0, 16)
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

// 获取优惠券面额显示
const getCouponValue = (coupon) => {
  if (coupon.couponType === 2) {
    const rate = coupon.discountRate || 0
    return (rate * 10).toFixed(1) + '折'
  }
  return '¥' + (coupon.discountAmount || 0).toFixed(2)
}

// 获取使用门槛显示
const getThresholdText = (coupon) => {
  if (!coupon.thresholdAmount || coupon.thresholdAmount === 0) {
    return '无门槛'
  }
  return '满 ¥' + coupon.thresholdAmount
}

// 判断优惠券状态（根据时间计算）
const getCouponStatus = (coupon) => {
  const now = new Date()
  const startTime = new Date(coupon.startTime)
  const endTime = new Date(coupon.endTime)

  if (now < startTime) return 0 // 未开始
  if (now > endTime) return 2 // 已失效
  return 1 // 进行中
}

// 状态显示文本
const getStatusText = (coupon) => {
  const status = coupon.status !== undefined ? coupon.status : getCouponStatus(coupon)
  const map = { 0: '未开始', 1: '进行中', 2: '已失效' }
  return map[status] || '未知'
}

// 状态样式
const getStatusClass = (coupon) => {
  const status = coupon.status !== undefined ? coupon.status : getCouponStatus(coupon)
  const map = { 0: 'status-pending', 1: 'status-active', 2: 'status-expired' }
  return map[status] || ''
}

// 计算统计数据
const calculateStats = (list) => {
  stats.total = list.length
  stats.active = 0
  stats.expired = 0
  stats.claimedTotal = 0

  list.forEach((coupon) => {
    const status = coupon.status !== undefined ? coupon.status : getCouponStatus(coupon)
    if (status === 1) stats.active++
    if (status === 2) stats.expired++
    stats.claimedTotal += (coupon.totalCount || 0) - (coupon.remainCount || 0)
  })
}

// 筛选后的优惠券
const filteredCoupons = computed(() => {
  let list = [...coupons.value]

  // 状态筛选
  if (filters.status !== 'all') {
    list = list.filter((coupon) => {
      const status = coupon.status !== undefined ? coupon.status : getCouponStatus(coupon)
      if (filters.status === 'active') return status === 1
      if (filters.status === 'expired') return status === 2
      if (filters.status === 'pending') return status === 0
      return true
    })
  }

  // 优惠券类型筛选
  if (filters.couponType !== null && filters.couponType !== '') {
    list = list.filter((coupon) => coupon.couponType === filters.couponType)
  }

  // 活动类型筛选
  if (filters.activeType !== null && filters.activeType !== '') {
    list = list.filter((coupon) => coupon.activeType === filters.activeType)
  }

  // 是否可叠加筛选
  if (filters.stackable !== null && filters.stackable !== '') {
    list = list.filter((coupon) => coupon.stackable === filters.stackable)
  }

  // 名称搜索
  if (filters.keyword.trim()) {
    const kw = filters.keyword.trim().toLowerCase()
    list = list.filter((coupon) => coupon.couponName.toLowerCase().includes(kw))
  }

  return list
})

// 分页数据
const totalPages = computed(() => Math.ceil(filteredCoupons.value.length / pageSize))
const paginatedCoupons = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCoupons.value.slice(start, start + pageSize)
})

// 监听筛选变化重置页码
watch(
  [
    () => filters.status,
    () => filters.couponType,
    () => filters.activeType,
    () => filters.stackable,
    () => filters.keyword,
  ],
  () => {
    currentPage.value = 1
  },
)

// 获取Shop-Id（从店铺列表或localStorage获取）
const getShopId = () => {
  if (currentShop.value && currentShop.value.shopId) {
    return currentShop.value.shopId
  }
  const shopId = localStorage.getItem('shopId') || sessionStorage.getItem('shopId')
  if (shopId) return shopId
  if (shopList.value.length > 0) {
    return shopList.value[0].shopId
  }
  return null
}

// 获取请求头
const getHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const shopId = getShopId()
  const headers = {}
  if (token) headers['Authorization'] = token
  if (shopId) headers['Shop-Id'] = shopId
  return headers
}

// 从API获取优惠券数据
const fetchCoupons = async () => {
  loading.value = true
  try {
    const res = await get_merchant_info()
    if (res.code === 200) {
      const data = res.data

      if (data.myShopList && data.myShopList.length > 0) {
        shopList.value = data.myShopList.map((shop) => ({
          shopId: shop.shopId,
          shopName: shop.shopName,
          shopLogo: shop.shopLogo || defaultShopLogo,
          workStatus: shop.workStatus,
        }))
        if (!currentShop.value.shopId && shopList.value.length > 0) {
          currentShop.value = shopList.value[0]
        }
      }

      const templateList = (data.myCouponTemplateList || []).filter((item) => item !== null)

      coupons.value = templateList.map((template) => ({
        ...template,
        discountAmount: template.discountAmount || 0,
        discountRate: template.discountRate || 0,
        thresholdAmount: template.thresholdAmount || 0,
        totalCount: template.totalCount || 0,
        remainCount: template.remainCount || 0,
        getLimit: template.getLimit || 1,
        stackable: template.stackable || 0,
        activeType: template.activeType || 1,
        status: template.status !== undefined ? template.status : getCouponStatus(template),
      }))

      logisticMessages.value = data.myLogisticMessageList || []
      paymentMessages.value = data.myPayMessageList || []
      refundMessages.value = data.myRefundMessageList || []

      logisticUnreadCount.value = logisticMessages.value.filter((msg) => !msg.isRead).length
      paymentUnreadCount.value = paymentMessages.value.filter((msg) => !msg.isRead).length
      refundUnreadCount.value = refundMessages.value.filter((msg) => !msg.isRead).length

      calculateStats(coupons.value)
    } else {
      showMessage(res.msg || '获取数据失败', true)
    }
  } catch (error) {
    console.error('获取优惠券列表失败:', error)
    showMessage('网络错误，无法获取数据', true)
  } finally {
    loading.value = false
  }
}

// 打开创建弹窗
const openCreateModal = () => {
  isEdit.value = false
  editId.value = null
  const now = new Date()
  const defaultStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), 23, 59, 59)

  formData.value = {
    ...getEmptyForm(),
    startTime: defaultStart.toISOString().slice(0, 16),
    endTime: defaultEnd.toISOString().slice(0, 16),
    totalCount: 100,
    remainCount: 100,
  }
  modalVisible.value = true
}

// 打开编辑弹窗
const openEditModal = (coupon) => {
  isEdit.value = true
  editId.value = coupon.templateId
  formData.value = {
    couponName: coupon.couponName || '',
    couponType: coupon.couponType || 1,
    thresholdAmount: coupon.thresholdAmount || 0,
    discountAmount: coupon.discountAmount || 0,
    discountRate: coupon.discountRate || 0,
    stackable: coupon.stackable || 0,
    startTime: coupon.startTime?.slice(0, 16) || '',
    endTime: coupon.endTime?.slice(0, 16) || '',
    totalCount: coupon.totalCount || 0,
    remainCount: coupon.remainCount || 0,
    activeType: coupon.activeType || 1,
    getLimit: coupon.getLimit || 1,
  }
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

// 保存优惠券（创建/更新）
const saveCoupon = async () => {
  // 表单验证
  if (!formData.value.couponName) {
    showMessage('请填写优惠券名称', true)
    return
  }

  if (formData.value.couponType === 1) {
    if (!formData.value.discountAmount || formData.value.discountAmount <= 0) {
      showMessage('请填写有效的优惠金额', true)
      return
    }
  } else {
    if (!formData.value.discountRate || formData.value.discountRate <= 0) {
      showMessage('请填写有效的折扣率（如0.8表示八折）', true)
      return
    }
    if (formData.value.discountRate > 1) {
      showMessage('折扣率不能大于1，如0.8表示八折', true)
      return
    }
  }

  if (!formData.value.startTime || !formData.value.endTime) {
    showMessage('请选择有效期', true)
    return
  }

  if (new Date(formData.value.startTime) >= new Date(formData.value.endTime)) {
    showMessage('结束时间必须晚于开始时间', true)
    return
  }

  if (!formData.value.totalCount || formData.value.totalCount <= 0) {
    showMessage('请填写发放总量', true)
    return
  }

  submitting.value = true
  try {
    const submitData = {
      couponName: formData.value.couponName,
      couponType: formData.value.couponType,
      thresholdAmount: formData.value.thresholdAmount || 0,
      stackable: formData.value.stackable || 0,
      startTime: formData.value.startTime + ':00',
      endTime: formData.value.endTime + ':00',
      totalCount: formData.value.totalCount,
      remainCount: formData.value.totalCount,
      activeType: formData.value.activeType || 1,
      getLimit: formData.value.getLimit || 1,
    }

    if (formData.value.couponType === 1) {
      submitData.discountAmount = formData.value.discountAmount
    } else {
      submitData.discountRate = formData.value.discountRate
    }

    const headers = getHeaders()
    let res

    if (isEdit.value) {
      submitData.templateId = editId.value
      submitData.remainCount = formData.value.remainCount
      res = await updateCouponTemplate(submitData, headers)
    } else {
      res = await createCouponTemplate(submitData, headers)
    }

    if (res.code === 200) {
      showMessage(isEdit.value ? '优惠券已更新' : '优惠券已创建')
      closeModal()
      await fetchCoupons()
    } else {
      showMessage(res.msg || '操作失败', true)
    }
  } catch (error) {
    console.error('保存优惠券失败:', error)
    showMessage(error.response?.data?.msg || error.message || '网络错误，请稍后重试', true)
  } finally {
    submitting.value = false
  }
}

// 删除优惠券
const confirmDelete = async (coupon) => {
  if (!confirm(`确定删除优惠券“${coupon.couponName}”吗？此操作不可恢复。`)) return

  try {
    const headers = getHeaders()
    const res = await deleteCouponTemplate(coupon.templateId, headers)
    if (res.code === 200) {
      showMessage('优惠券已删除')
      await fetchCoupons()
    } else {
      showMessage(res.msg || '删除失败', true)
    }
  } catch (error) {
    console.error('删除优惠券失败:', error)
    showMessage(error.response?.data?.msg || error.message || '网络错误，请稍后重试', true)
  }
}

// 店铺切换
const toggleShopDropdown = () => {
  shopDropdownVisible.value = !shopDropdownVisible.value
}

const switchShop = async (shop) => {
  if (currentShop.value.shopId === shop.shopId) return
  currentShop.value = shop
  localStorage.setItem('shopId', shop.shopId)
  shopDropdownVisible.value = false
  await fetchCoupons()
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

// 真实路由导航
const goToHome = () => router.push('/')
const goToDashboard = () => router.push('/seller/dashboard')
const goToOrders = () => router.push('/order/suborder/managerment')
const goToAfterSales = () => router.push('/merchant/after-sale')
const goToCoupons = () => {}
const goToProducts = () => router.push('/merchant/productManage')
const goToShopManage = () => router.push('/merchant/shopManage')
const goToProfile = () =>
  router.push(
    '/merchant/detail/' +
      (localStorage.getItem('identityId') || sessionStorage.getItem('identityId')),
  )
onMounted(() => {
  fetchCoupons()
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

.seller-coupon-page {
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
.coupon-container {
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

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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
.active-icon {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #16a34a;
}
.expired-icon {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
}
.claimed-icon {
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  color: #9333ea;
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

.coupon-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 1200px;
}

.coupon-table th {
  text-align: left;
  padding: 16px 20px;
  background: #fafcff;
  border-bottom: 1px solid #eef3fc;
  color: #384b6d;
  font-weight: 600;
  font-size: 0.85rem;
}

.coupon-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f4fa;
  color: #1f2a45;
  vertical-align: middle;
}

.coupon-name {
  font-weight: 600;
  color: #0f172a;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}
.type-full {
  background: #eef2ff;
  color: #2563eb;
}
.type-discount {
  background: #fff4e6;
  color: #f97316;
}

/* 活动类型徽章样式 */
.active-type-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}
.active-normal {
  background: #e0f2fe;
  color: #0284c7;
}
.active-member {
  background: #f3e8ff;
  color: #9333ea;
}
.active-promo {
  background: #fee2e2;
  color: #dc2626;
}

/* 是否可叠加徽章样式 */
.stackable-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}
.stackable-yes {
  background: #dcfce7;
  color: #10b981;
}
.stackable-no {
  background: #f1f5f9;
  color: #64748b;
}

.value-cell {
  font-weight: 700;
  color: #ff6700;
}

.date-cell {
  font-size: 0.75rem;
  color: #64748b;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 700;
  display: inline-block;
}
.status-active {
  background: #dcfce7;
  color: #10b981;
}
.status-expired {
  background: #fee2e2;
  color: #ef4444;
}
.status-pending {
  background: #fef3c7;
  color: #d97706;
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

.action-btn.edit {
  color: #2563eb;
  background: #eef2ff;
}
.action-btn.edit:hover {
  background: #d9e6ff;
}
.action-btn.delete {
  color: #ef4444;
  background: #fee2e2;
}
.action-btn.delete:hover {
  background: #fecaca;
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
  width: 600px;
  max-width: 90%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.coupon-modal {
  width: 600px;
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

.form-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 20px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}
.form-section-title:first-of-type {
  margin-top: 0;
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
.form-row .required {
  color: #ef4444;
}
.form-row input,
.form-row select,
.form-row textarea {
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
.form-row select:focus,
.form-row textarea:focus {
  border-color: #ff6700;
  box-shadow: 0 0 0 2px rgba(255, 103, 0, 0.1);
}

.form-row-group {
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
}
.form-row.half {
  flex: 1;
  margin-bottom: 0;
}

.input-prefix {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fbfe;
  border-radius: 14px;
  padding: 0 12px;
  border: 1px solid #e2e8f0;
}
.input-prefix input {
  border: none;
  background: transparent;
  flex: 1;
  padding: 10px 0;
}
.input-prefix span {
  color: #64748b;
  font-size: 13px;
}

.form-hint {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 24px;
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
  .form-row-group {
    flex-direction: column;
    gap: 18px;
  }
}
</style>
