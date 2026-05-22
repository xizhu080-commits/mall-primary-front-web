<template>
  <div class="seller-products-page">
    <!-- 顶部导航栏 - 与之前风格一致 -->
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
          <span>商品中心 | JD生态商城</span>
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
          <!--  <div class="nav-item" @click="goToDashboard">
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
            <span>数据看板</span>
          </div> -->

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
          <div class="nav-item active" @click="goToProducts">
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

    <div class="products-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title">商品管理</h1>
          <span class="page-desc">管理您的商品信息，上下架、编辑、删除商品</span>
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
          发布新商品
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
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ products.length }}</span>
            <span class="stat-label">总商品数</span>
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ activeCount }}</span>
            <span class="stat-label">已上架</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon inactive-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ inactiveCount }}</span>
            <span class="stat-label">已下架</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon lowstock-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              />
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-value">{{ lowStockCount }}</span>
            <span class="stat-label">库存告急</span>
          </div>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-bar">
        <div class="filter-group">
          <div
            class="filter-item"
            :class="{ active: statusFilter === 'all' }"
            @click="statusFilter = 'all'"
          >
            全部
          </div>
          <div
            class="filter-item"
            :class="{ active: statusFilter === 'active' }"
            @click="statusFilter = 'active'"
          >
            已上架
          </div>
          <div
            class="filter-item"
            :class="{ active: statusFilter === 'inactive' }"
            @click="statusFilter = 'inactive'"
          >
            已下架
          </div>
          <div
            class="filter-item"
            :class="{ active: statusFilter === 'lowStock' }"
            @click="statusFilter = 'lowStock'"
          >
            库存告急
          </div>
        </div>
        <div class="filter-group">
          <label>店铺筛选</label>
          <select v-model="shopFilter" class="category-select">
            <option value="all">全部店铺</option>
            <option v-for="shop in shopList" :key="shop.shopId" :value="shop.shopId">
              {{ shop.shopName }}
            </option>
          </select>
        </div>
        <div class="filter-group">
          <select v-model="categoryFilter" class="category-select">
            <option value="all">全部分类</option>
            <option value="手机">手机</option>
            <option value="智能穿戴">智能穿戴</option>
            <option value="家电">家电</option>
            <option value="配件">配件</option>
            <option value="电脑办公">电脑办公</option>
            <option value="小米生态">小米生态</option>
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
          <input type="text" v-model="searchKeyword" placeholder="搜索商品名称 / SKU" />
        </div>
      </div>

      <!-- 商品列表 - 表格形式 -->
      <div class="table-container">
        <table class="product-table">
          <thead>
            <tr>
              <th>商品信息</th>
              <th>分类</th>
              <th>价格</th>
              <th>库存</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in paginatedProducts" :key="product.skuId">
              <td class="product-cell">
                <div class="product-cell-info">
                  <img :src="product.productUrl" :alt="product.productName" class="product-thumb" />
                  <div class="product-cell-detail">
                    <div class="product-name">{{ product.productName }}</div>
                    <div class="product-spec" v-if="product.specData">
                      规格: {{ formatSpecData(product.specData) }}
                    </div>
                    <div class="product-sku">SKU: {{ product.skuId?.slice(-12) }}</div>
                  </div>
                </div>
              </td>
              <td>{{ product.categoryName || '小米生态' }}</td>
              <td class="price-cell">¥{{ formatMoney(product.price) }}</td>
              <td :class="{ 'low-stock-text': product.stock <= 10 }">{{ product.stock }}</td>
              <td>
                <span
                  class="status-badge"
                  :class="product.status === 1 ? 'status-active' : 'status-inactive'"
                >
                  {{ product.status === 1 ? '已上架' : '已下架' }}
                </span>
              </td>
              <td class="date-cell">{{ formatDate(product.createTime) }}</td>
              <td class="action-cell">
                <button class="action-btn edit" @click="openEditModal(product)">编辑</button>
                <button
                  v-if="product.status === 1"
                  class="action-btn off"
                  @click="toggleStatus(product)"
                >
                  下架
                </button>
                <button v-else class="action-btn on" @click="toggleStatus(product)">上架</button>
                <button class="action-btn delete" @click="confirmDelete(product)">删除</button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7" class="empty-row">暂无商品数据</td>
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

    <!-- 商品编辑/创建弹窗 - 完整结构 -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content product-modal">
        <div class="modal-header">
          <h3>{{ isEdit ? '编辑商品' : '发布新商品' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <!-- 店铺选择 -->
          <div class="form-row">
            <label>所属店铺 <span class="required">*</span></label>
            <select v-model="formData.shopId">
              <option v-for="shop in shopList" :key="shop.shopId" :value="shop.shopId">
                {{ shop.shopName }}
              </option>
            </select>
          </div>

          <!-- SPU基本信息 -->
          <div class="form-section-title">基本信息</div>
          <div class="form-row">
            <label>商品名称 <span class="required">*</span></label>
            <input v-model="formData.productName" placeholder="请输入商品SPU名称" />
          </div>
          <div class="form-row-group">
            <div class="form-row half">
              <label>分类ID</label>
              <input v-model.number="formData.categoryId" type="number" placeholder="分类ID" />
            </div>
            <div class="form-row half">
              <label>分类名称</label>
              <input v-model="formData.categoryName" placeholder="分类名称" />
            </div>
          </div>
          <div class="form-row">
            <label>SPU价格 <span class="required">*</span></label>
            <input v-model.number="formData.price" type="number" placeholder="SPU价格" />
          </div>
          <div class="form-row">
            <label>SPU主图URL</label>
            <input v-model="formData.productUrl" placeholder="请输入商品主图地址" />
            <div class="form-hint">建议尺寸：800x800px，支持jpg/png格式</div>
          </div>
          <div class="form-row">
            <label>规格名称说明</label>
            <input
              v-model="formData.specName"
              placeholder="如：套餐类型;适用面积，多个规格用分号分隔"
            />
            <div class="form-hint">定义SKU的规格属性，多个规格用分号分隔</div>
          </div>

          <!-- SKU列表 -->
          <div class="form-section-title">
            SKU列表
            <button type="button" class="add-sku-btn" @click="addSku">+ 添加SKU</button>
          </div>

          <div v-for="(sku, idx) in formData.skuList" :key="idx" class="sku-card">
            <div class="sku-header">
              <span>SKU {{ idx + 1 }}</span>
              <button
                type="button"
                class="remove-sku-btn"
                @click="removeSku(idx)"
                v-if="formData.skuList.length > 1"
              >
                删除
              </button>
            </div>
            <div class="form-row">
              <label>SKU商品名称 <span class="required">*</span></label>
              <input v-model="sku.productName" placeholder="请输入SKU商品名称" />
            </div>
            <div class="form-row">
              <label>SKU图片URL</label>
              <input v-model="sku.productUrl" placeholder="请输入SKU图片地址" />
            </div>
            <div class="form-row-group">
              <div class="form-row half">
                <label>价格 <span class="required">*</span></label>
                <input v-model.number="sku.price" type="number" placeholder="售价" />
              </div>
              <div class="form-row half">
                <label>库存 <span class="required">*</span></label>
                <input v-model.number="sku.stock" type="number" placeholder="库存数量" />
              </div>
            </div>
            <div class="form-row">
              <label>规格属性(JSON格式)</label>
              <textarea
                v-model="sku.specData"
                rows="2"
                placeholder='如：{"packageType":"悦享版","area":"90m²以下"}'
              ></textarea>
              <div class="form-hint">格式：{"规格名1":"规格值1","规格名2":"规格值2"}</div>
            </div>
            <div class="form-row">
              <label>过期时间</label>
              <input type="datetime-local" v-model="sku.expireTime" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeModal">取消</button>
          <button class="btn-primary" @click="saveProduct" :disabled="submitting">
            {{ submitting ? '保存中...' : '保存商品' }}
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
import { createProduct, updateProduct, deleteProduct } from '@/api/product/product'

const router = useRouter()

// 默认图片
const defaultShopLogo = 'https://picsum.photos/80/80?random=shop'

// === 店铺数据 ===
const shopList = ref([])
const currentShop = ref({})
const shopDropdownVisible = ref(false)

// === 商品数据 ===
const products = ref([])
const loading = ref(false)
const submitting = ref(false)

// 筛选条件
const statusFilter = ref('all')
const shopFilter = ref('all')
const categoryFilter = ref('all')
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 10

// 弹窗相关
const modalVisible = ref(false)
const isEdit = ref(false)
const editId = ref(null)

// 获取空SKU对象
const getEmptySku = () => ({
  productName: '',
  productUrl: '',
  status: 1,
  specData: '{}',
  price: 0,
  stock: 0,
  expireTime: '',
})

// 表单数据 - 完整匹配API结构
const formData = reactive({
  shopId: '',
  productName: '',
  categoryId: null,
  categoryName: '',
  price: 0,
  productUrl: '',
  specName: '',
  skuList: [getEmptySku()],
})

// ========== 消息相关 ==========
const messageModalVisible = ref(false)
const activeTabMsg = ref('logistic')
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

// 辅助函数
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.slice(0, 16)
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.replace(' ', ' ').slice(0, 16)
}

const formatSpecData = (specData) => {
  try {
    const obj = JSON.parse(specData)
    return Object.entries(obj)
      .map(([k, v]) => `${k}:${v}`)
      .join(' | ')
  } catch {
    return specData || ''
  }
}

const formatMoney = (val) => {
  if (val === undefined || val === null) return '0.00'
  return val.toFixed(2)
}

// 统计数据
const activeCount = computed(() => products.value.filter((p) => p.status === 1).length)
const inactiveCount = computed(() => products.value.filter((p) => p.status === 0).length)
const lowStockCount = computed(
  () => products.value.filter((p) => p.stock <= 10 && p.status === 1).length,
)

// 筛选商品
const filteredProducts = computed(() => {
  let result = [...products.value]
  if (statusFilter.value === 'active') result = result.filter((p) => p.status === 1)
  else if (statusFilter.value === 'inactive') result = result.filter((p) => p.status === 0)
  else if (statusFilter.value === 'lowStock')
    result = result.filter((p) => p.stock <= 10 && p.status === 1)
  if (shopFilter.value !== 'all') result = result.filter((p) => p.shopId === shopFilter.value)
  if (categoryFilter.value !== 'all')
    result = result.filter((p) => p.categoryName?.includes(categoryFilter.value))
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    result = result.filter(
      (p) => p.productName?.toLowerCase().includes(kw) || p.skuId?.includes(kw),
    )
  }
  return result
})

// 分页
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})

watch([statusFilter, shopFilter, categoryFilter, searchKeyword], () => {
  currentPage.value = 1
})

// SKU操作
const addSku = () => {
  formData.skuList.push(getEmptySku())
}

const removeSku = (index) => {
  formData.skuList.splice(index, 1)
}

// 重置表单
const resetForm = () => {
  formData.shopId = currentShop.value?.shopId || ''
  formData.productName = ''
  formData.categoryId = null
  formData.categoryName = ''
  formData.price = 0
  formData.productUrl = ''
  formData.specName = ''
  formData.skuList = [getEmptySku()]
}

// ========== 获取数据 ==========
const fetchData = async () => {
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
        currentShop.value = shopList.value[0]
        formData.shopId = currentShop.value.shopId
      }

      if (data.mySkuList && data.mySkuList.length > 0) {
        products.value = data.mySkuList.map((sku) => ({
          ...sku,
          shopId: sku.shopId,
          status: sku.status,
          categoryName: sku.categoryName || '小米生态',
        }))
      }

      logisticMessages.value = data.myLogisticMessageList || []
      paymentMessages.value = data.myPayMessageList || []
      refundMessages.value = data.myRefundMessageList || []

      logisticUnreadCount.value = logisticMessages.value.filter((msg) => !msg.isRead).length
      paymentUnreadCount.value = paymentMessages.value.filter((msg) => !msg.isRead).length
      refundUnreadCount.value = refundMessages.value.filter((msg) => !msg.isRead).length
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    showMessage('网络错误，无法获取数据', true)
  } finally {
    loading.value = false
  }
}

// 打开创建弹窗
const openCreateModal = () => {
  isEdit.value = false
  editId.value = null
  resetForm()
  modalVisible.value = true
}

// 打开编辑弹窗
const openEditModal = (product) => {
  isEdit.value = true
  editId.value = product.skuId
  formData.shopId = product.shopId
  formData.productName = product.productName
  formData.categoryId = product.categoryId || 10004
  formData.categoryName = product.categoryName || '小米生态'
  formData.price = product.price
  formData.productUrl = product.productUrl
  formData.specName = product.specName || ''
  formData.skuList = [
    {
      productName: product.productName,
      productUrl: product.productUrl,
      status: product.status,
      specData: product.specData || '{}',
      price: product.price,
      stock: product.stock,
      expireTime: product.expireTime?.slice(0, 16) || '',
    },
  ]
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

// 保存商品
const saveProduct = async () => {
  if (!formData.productName) {
    showMessage('请填写商品名称', true)
    return
  }
  if (!formData.skuList.length) {
    showMessage('请至少添加一个SKU', true)
    return
  }
  for (const sku of formData.skuList) {
    if (!sku.price || sku.price <= 0) {
      showMessage('请填写有效的SKU价格', true)
      return
    }
    if (!sku.stock || sku.stock < 0) {
      showMessage('请填写有效的SKU库存', true)
      return
    }
  }

  submitting.value = true
  try {
    const submitData = {
      productName: formData.productName,
      categoryId: formData.categoryId || 10004,
      categoryName: formData.categoryName || '小米生态',
      price: formData.price || formData.skuList[0]?.price || 0,
      productUrl: formData.productUrl || formData.skuList[0]?.productUrl || '',
      specName: formData.specName,
      skuList: formData.skuList.map((sku) => ({
        productName: sku.productName || formData.productName,
        productUrl: sku.productUrl || formData.productUrl,
        status: sku.status !== undefined ? sku.status : 1,
        specData: sku.specData || '{}',
        price: sku.price,
        stock: sku.stock,
        expireTime: sku.expireTime || null,
      })),
    }

    let res
    if (isEdit.value) {
      res = await updateProduct(editId.value, submitData)
    } else {
      res = await createProduct(submitData)
    }

    if (res.code === 200) {
      showMessage(isEdit.value ? '商品已更新' : '商品已发布')
      closeModal()
      await fetchData()
    } else {
      showMessage(res.msg || '操作失败', true)
    }
  } catch (error) {
    console.error('保存商品失败:', error)
    showMessage('网络错误，请稍后重试', true)
  } finally {
    submitting.value = false
  }
}

// 上下架
const toggleStatus = async (product) => {
  const newStatus = product.status === 1 ? 0 : 1
  try {
    product.status = newStatus
    showMessage(`商品已${newStatus === 1 ? '上架' : '下架'}`)
  } catch (error) {
    showMessage('操作失败', true)
  }
}

// 删除商品
const confirmDelete = async (product) => {
  if (!confirm(`确定删除商品“${product.productName}”吗？`)) return
  try {
    const res = await deleteProduct(product.skuId)
    if (res.code === 200) {
      products.value = products.value.filter((p) => p.skuId !== product.skuId)
      showMessage('商品已删除')
    } else {
      showMessage(res.msg || '删除失败', true)
    }
  } catch (error) {
    showMessage('删除失败', true)
  }
}

// 店铺切换
const toggleShopDropdown = () => {
  shopDropdownVisible.value = !shopDropdownVisible.value
}
const switchShop = async (shop) => {
  if (currentShop.value.shopId === shop.shopId) return
  currentShop.value = shop
  shopFilter.value = shop.shopId
  shopDropdownVisible.value = false
  await fetchData()
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
  const messages = currentMessages.value
  messages.forEach((msg) => (msg.isRead = true))
  if (activeTabMsg.value === 'logistic') logisticUnreadCount.value = 0
  else if (activeTabMsg.value === 'payment') paymentUnreadCount.value = 0
  else refundUnreadCount.value = 0
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
const goToProducts = () => {}
const goToShopManage = () => router.push('/merchant/shopManage')
const goToProfile = () =>
  router.push(
    '/merchant/detail/' +
      (localStorage.getItem('identityId') || sessionStorage.getItem('identityId')),
  )
onMounted(() => {
  fetchData()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 表格样式 */
.table-container {
  background: white;
  border-radius: 24px;
  border: 1px solid #edf2f9;
  overflow-x: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 900px;
}

.product-table th {
  text-align: left;
  padding: 16px 20px;
  background: #fafcff;
  border-bottom: 1px solid #eef3fc;
  color: #384b6d;
  font-weight: 600;
  font-size: 0.85rem;
}

.product-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f4fa;
  color: #1f2a45;
  vertical-align: middle;
}

.product-cell {
  min-width: 280px;
}

.product-cell-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.product-thumb {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  background: #f8fafc;
}

.product-cell-detail {
  flex: 1;
}

.product-name {
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}

.product-spec {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 2px;
}

.product-sku {
  font-size: 11px;
  color: #cbd5e1;
  font-family: monospace;
}

.price-cell {
  font-weight: 600;
  color: #ff6700;
}

.low-stock-text {
  color: #ef4444;
  font-weight: 600;
}

.date-cell {
  font-size: 12px;
  color: #94a3b8;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 40px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
}

.status-active {
  background: #dcfce7;
  color: #10b981;
}

.status-inactive {
  background: #fee2e2;
  color: #ef4444;
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

.action-btn.on {
  color: #10b981;
  background: #dcfce7;
}

.action-btn.on:hover {
  background: #bbf7d0;
}

.action-btn.off {
  color: #ef4444;
  background: #fee2e2;
}

.action-btn.off:hover {
  background: #fecaca;
}

.action-btn.delete {
  color: #d97706;
  background: #fef3c7;
}

.action-btn.delete:hover {
  background: #fde68a;
}

/* SKU卡片样式 */
.sku-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;
}

.sku-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.sku-header span {
  font-weight: 600;
  color: #1e293b;
}

.remove-sku-btn {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  cursor: pointer;
}

.remove-sku-btn:hover {
  background: #fecaca;
}

.add-sku-btn {
  background: #ff6700;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
}

.add-sku-btn:hover {
  background: #e05e00;
}

.form-hint {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}

.empty-row {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
}

/* 所有样式保持不变，与之前完全一致 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.seller-products-page {
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
.products-container {
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
.inactive-icon {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
}
.lowstock-icon {
  background: linear-gradient(135deg, #ffedd5, #fed7aa);
  color: #ea580c;
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

/* 商品网格 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.product-card {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
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

.stock-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.stock-badge.low-stock {
  background: #ef4444;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.status-active {
  background: #10b981;
  color: white;
}

.status-inactive {
  background: #94a3b8;
  color: white;
}

.product-info {
  padding: 16px 20px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.product-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 8px;
}

.product-spec {
  margin-bottom: 8px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #ff6700;
}

.product-time {
  font-size: 11px;
  color: #94a3b8;
}

.product-actions {
  display: flex;
  gap: 8px;
  padding: 12px 20px 20px;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  flex: 1;
  padding: 8px 0;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.action-btn.edit {
  background: #f1f5f9;
  color: #475569;
}

.action-btn.edit:hover {
  background: #e2e8f0;
  color: #ff6700;
}

.action-btn.on {
  background: #dcfce7;
  color: #10b981;
}

.action-btn.on:hover {
  background: #bbf7d0;
}

.action-btn.off {
  background: #fee2e2;
  color: #ef4444;
}

.action-btn.off:hover {
  background: #fecaca;
}

.action-btn.delete {
  background: #fef3c7;
  color: #d97706;
}

.action-btn.delete:hover {
  background: #fde68a;
  color: #b45309;
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
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

.product-modal {
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

/* 消息弹窗 */
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
@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
