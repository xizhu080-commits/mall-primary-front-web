<template>
  <div class="product-detail-page">
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
          <span>小米生态商城</span>
        </div>
        <div class="nav-search">
          <input
            type="text"
            placeholder="搜索商品..."
            v-model="searchKeyword"
            @keyup.enter="searchProduct"
          />
          <button @click="searchProduct">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <div class="nav-links">
          <div class="nav-item" @click="goToHome">首页</div>
          <div class="nav-item" @click="goToProducts">全部商品</div>
          <div class="nav-item" @click="goToCategories">分类</div>
          <div class="nav-item" @click="goToCart">
            购物车<span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
          </div>
          <div class="nav-item" @click="goToProfile">
            {{ isLoggedIn ? '我的' : '您好，请登录！' }}
          </div>
        </div>
      </div>
    </div>

    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="breadcrumb-content">
        <a @click="goToHome">首页</a><span>/</span> <a @click="goToProducts">手机</a><span>/</span>
        <span class="current">{{ product.productName }}</span>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="detail-container" v-if="!loading">
      <div class="product-gallery">
        <div class="main-image">
          <img :src="currentImage" :alt="product.productName" @click="previewImage(currentImage)" />
        </div>
        <div class="thumbnail-list">
          <div
            v-for="(img, idx) in imageList"
            :key="idx"
            class="thumbnail"
            :class="{ active: currentImage === img }"
            @click="currentImage = img"
          >
            <img :src="img" :alt="product.productName" />
          </div>
        </div>

        <!-- 商品推荐区域 -->
        <div class="product-recommend-section">
          <div class="recommend-header">
            <span class="recommend-title">🔥 猜你喜欢</span>
            <span class="recommend-more" @click="activeTab = 'recommend'">查看更多 &gt;</span>
          </div>
          <div class="recommend-grid-horizontal">
            <div
              v-for="item in recommendList.slice(0, 8)"
              :key="item.spuId"
              class="recommend-card"
              @click="handleRecommendClick(item.spuId, item.skuId)"
            >
              <div class="recommend-image">
                <img :src="item.productUrl" :alt="item.productName" />
                <div class="recommend-tag" v-if="item.isHot">🔥</div>
              </div>
              <div class="recommend-info">
                <h4 class="recommend-name">{{ item.productName }}</h4>
                <p class="recommend-price">¥{{ formatPrice(item.price) }}</p>
              </div>
            </div>
            <div v-if="recommendLoading" class="recommend-loading">
              <div class="loading-spinner-small"></div>
            </div>
            <div v-if="recommendList.length === 0 && !recommendLoading" class="recommend-empty">
              <span>暂无推荐商品</span>
            </div>
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="product-tag" v-if="product.isNew">新品</div>
        <h1 class="product-title">{{ product.productName }}</h1>
        <p class="product-subtitle">小米旗舰新品，性能巅峰</p>

        <!-- 价格区域 -->
        <div class="price-section">
          <div class="price-main">
            <div class="current-price">
              <span class="price-symbol">¥</span
              ><span class="price-value">{{ formatPrice(displayPrice) }}</span>
            </div>
            <div
              class="original-price"
              v-if="orderPreviewData && orderPreviewData.totalAmount > displayPrice"
            >
              原价 ¥{{ formatPrice(orderPreviewData.totalAmount) }}
            </div>
          </div>
          <div
            class="price-discount"
            v-if="orderPreviewData && orderPreviewData.discountAmount > 0"
          >
            已优惠
            <span class="discount-amount">¥{{ formatPrice(orderPreviewData.discountAmount) }}</span>
          </div>
          <div class="sales-info">
            <span>月销 {{ product.sales || 342 }}+</span
            ><span>好评率 {{ product.praiseRate || 98 }}%</span>
          </div>
        </div>

        <!-- 收货人信息展示区域 -->
        <div class="delivery-info-section">
          <div class="delivery-label">配送至</div>
          <div class="delivery-details" @click="openAddressManager">
            <div v-if="currentAddress" class="info-content">
              <div class="contact-info">
                <span class="receiver">{{ currentAddress.receiver }}</span
                ><span class="phone">{{ currentAddress.phone }}</span
                ><span v-if="currentAddress.isDefault" class="default-badge">默认</span>
              </div>
              <div class="address">{{ currentAddress.address }}</div>
              <div class="address-tip">点击切换或管理地址</div>
            </div>
            <div v-else class="empty-info">
              <span>请填写收货信息</span
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <!-- 优惠券区域 -->
        <div class="coupon-section" v-if="!isLoggedIn">
          <div class="coupon-label">优惠券</div>
          <div class="coupon-list">
            <div class="coupon-item login-tip">
              <span>🔒 请登录查看优惠券</span
              ><button class="coupon-login-btn" @click="goToLogin">去登录</button>
            </div>
          </div>
        </div>
        <div class="coupon-section" v-else>
          <div class="coupon-label">优惠券</div>
          <div class="coupon-list-wrapper">
            <div v-if="orderPreviewLoading" class="coupon-loading">
              <div class="loading-spinner-small"></div>
              <span>加载优惠券中...</span>
            </div>
            <div
              v-else-if="availableCoupons.length === 0 && unavailableCoupons.length === 0"
              class="coupon-list"
            >
              <div class="coupon-item empty-tip"><span>📦 暂无可用优惠券</span></div>
            </div>
            <div
              v-else
              class="coupon-list"
              :class="{ 'has-scroll': availableCoupons.length + unavailableCoupons.length > 2 }"
            >
              <div
                v-for="coupon in availableCoupons"
                :key="coupon.couponId"
                class="coupon-item available"
                :class="{
                  selected: selectedCouponIds.includes(coupon.couponId),
                  optimal: coupon.isOptimal && !selectedCouponIds.includes(coupon.couponId),
                  disabled: !isCouponSelectable(coupon),
                }"
                @click="isCouponSelectable(coupon) && toggleSelectCoupon(coupon)"
              >
                <div class="coupon-icon">🎫</div>
                <div class="coupon-info">
                  <div class="coupon-amount">
                    <div v-if="coupon.couponType === 0" class="amount-discount">
                      {{ (coupon.discountRate * 10).toFixed(1) }}折
                    </div>
                    <div v-else class="amount-wrapper">
                      <span class="amount-symbol">¥</span
                      ><span class="amount-value">{{ coupon.discountAmount }}</span>
                    </div>
                  </div>
                  <div class="coupon-detail">
                    <div class="coupon-name">{{ coupon.couponName }}</div>
                    <div class="coupon-meta">
                      <span class="coupon-condition" v-if="coupon.thresholdAmount > 0"
                        >满{{ formatPrice(coupon.thresholdAmount) }}可用</span
                      ><span class="coupon-condition" v-else>无门槛</span
                      ><span
                        class="coupon-stackable"
                        :class="{ stackable: coupon.stackable === 1 }"
                        >{{ coupon.stackable === 1 ? '可叠加' : '不可叠加' }}</span
                      >
                    </div>
                    <div class="coupon-date">{{ formatCouponDate(coupon.endTime) }}</div>
                  </div>
                </div>
                <div class="coupon-status">
                  <span
                    class="coupon-select-icon"
                    v-if="selectedCouponIds.includes(coupon.couponId)"
                    >✓ 已选</span
                  ><span class="coupon-optimal-icon" v-else-if="coupon.isOptimal">🌟 最优推荐</span
                  ><span class="coupon-disabled-icon" v-else-if="!isCouponSelectable(coupon)"
                    >🔒 不可选</span
                  >
                </div>
              </div>
              <div
                v-for="coupon in unavailableCoupons"
                :key="coupon.couponId"
                class="coupon-item unavailable"
              >
                <div class="coupon-icon">🎫</div>
                <div class="coupon-info">
                  <div class="coupon-amount">
                    <div v-if="coupon.couponType === 0" class="amount-discount">
                      {{ (coupon.discountRate * 10).toFixed(1) }}折
                    </div>
                    <div v-else class="amount-wrapper">
                      <span class="amount-symbol">¥</span
                      ><span class="amount-value">{{ coupon.discountAmount || '-' }}</span>
                    </div>
                  </div>
                  <div class="coupon-detail">
                    <div class="coupon-name">{{ coupon.couponName }}</div>
                    <div class="coupon-meta">
                      <span class="coupon-condition" v-if="coupon.thresholdAmount > 0"
                        >满{{ formatPrice(coupon.thresholdAmount) }}可用</span
                      ><span class="coupon-condition" v-else>无门槛</span>
                    </div>
                    <div class="coupon-date">{{ formatCouponDate(coupon.endTime) }}</div>
                  </div>
                </div>
                <div class="coupon-status">
                  <span class="coupon-unusable-reason">{{
                    coupon.unusableReason || '不可用'
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 规格选择 - 动态渲染 -->
        <div v-for="spec in specList" :key="spec.name" class="spec-section">
          <div class="spec-label">{{ spec.name }}</div>
          <div class="spec-options">
            <div
              v-for="option in spec.options"
              :key="option.value"
              class="spec-option"
              :class="{
                active: selectedSpecs[spec.name] === option.value,
                disabled: !isSpecOptionAvailable(spec.name, option.value),
              }"
              @click="
                isSpecOptionAvailable(spec.name, option.value) &&
                selectSpecOption(spec.name, option.value)
              "
            >
              {{ option.label }}
              <span
                v-if="option.stock !== undefined && option.stock < 10 && option.stock > 0"
                class="stock-low"
                >库存紧张</span
              >
              <span v-if="!isSpecOptionAvailable(spec.name, option.value)" class="disabled-tag"
                >无此规格</span
              >
            </div>
          </div>
        </div>

        <!-- 数量选择 -->
        <div class="quantity-section">
          <div class="quantity-label">数量</div>
          <div class="quantity-selector">
            <button class="qty-btn" @click="decreaseQty" :disabled="quantity <= 1">-</button>
            <input
              type="number"
              v-model.number="quantity"
              min="1"
              :max="currentSku.stock"
              @change="onQuantityChange"
            />
            <button class="qty-btn" @click="increaseQty" :disabled="quantity >= currentSku.stock">
              +
            </button>
          </div>
          <span class="stock-info">库存 {{ currentSku.stock }} 件</span>
        </div>

        <!-- 服务保障 -->
        <div class="service-section">
          <div class="service-label">服务保障</div>
          <div class="service-list">
            <div class="service-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" /></svg
              ><span>正品保证</span>
            </div>
            <div class="service-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /></svg
              ><span>7天无理由退货</span>
            </div>
            <div class="service-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" /></svg
              ><span>24小时发货</span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="btn-cart" @click="addToCart">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg
            >加入购物车
          </button>
          <button class="btn-buy" @click="buyNow">立即购买</button>
        </div>

        <!-- 店铺卡片 -->
        <div class="shop-card" @click="goToShop">
          <div class="shop-logo"><img :src="defaultShopLogo" alt="" /></div>
          <div class="shop-info">
            <div class="shop-name">小米官方旗舰店</div>
            <div class="shop-score">评分 4.9</div>
          </div>
          <button class="shop-btn">进入店铺</button>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="loading-container" v-if="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 商品详情标签页 -->
    <div class="detail-tabs" v-if="!loading">
      <div class="tabs-header">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="tab-content">
        <div v-show="activeTab === 'detail'" class="detail-content">
          <div class="detail-html">
            <img :src="currentImage" alt="产品展示" style="width: 100%; border-radius: 16px" />
            <h3>{{ product.productName }}，巅峰性能</h3>
            <p>搭载最新一代处理器，性能强劲，功耗更低。专业级影像系统，让每一拍都成为大片。</p>
            <h4>主要特性：</h4>
            <ul>
              <li>新一代旗舰芯片</li>
              <li>超视网膜 XDR 显示屏</li>
              <li>Pro 级摄像头系统</li>
              <li>超长续航电池</li>
              <li>IP68 级防尘抗水</li>
            </ul>
          </div>
        </div>
        <div v-show="activeTab === 'spec'" class="spec-content">
          <table class="spec-table">
            <tr>
              <td class="param-name">产品名称</td>
              <td class="param-value">{{ product.productName }}</td>
            </tr>
            <tr>
              <td class="param-name">产品型号</td>
              <td class="param-value">Xiaomi 17 Pro Max</td>
            </tr>
            <tr v-for="(value, key) in currentSpecParams" :key="key">
              <td class="param-name">{{ key }}</td>
              <td class="param-value">{{ value }}</td>
            </tr>
          </table>
        </div>
        <div v-show="activeTab === 'review'" class="review-content">
          <div class="review-stats">
            <div class="review-score">
              <span class="score">4.9</span><span class="total">/5分</span>
            </div>
            <div class="review-count">共 128 条评价</div>
          </div>
          <div class="review-list">
            <div v-for="review in reviewList" :key="review.id" class="review-item">
              <div class="review-user">
                <span class="avatar">{{ review.userName.charAt(0) }}</span
                ><span class="name">{{ review.userName }}</span
                ><span class="time">{{ review.time }}</span>
              </div>
              <div class="review-content">{{ review.content }}</div>
              <div class="review-sku">规格：{{ review.sku }}</div>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 'recommend'" class="recommend-content">
          <div class="recommend-header-full">
            <span class="recommend-title-full">📦 猜你喜欢</span>
          </div>
          <div class="recommend-grid-full">
            <div
              v-for="item in recommendList"
              :key="item.spuId"
              class="recommend-item-full"
              @click="handleRecommendClick(item.spuId, item.skuId)"
            >
              <div class="recommend-image-full">
                <img :src="item.productUrl" :alt="item.productName" loading="lazy" />
              </div>
              <div class="recommend-info-full">
                <h4 class="recommend-name-full">{{ item.productName }}</h4>
                <div class="recommend-spec" v-if="item.specName">{{ item.specName }}</div>
                <p class="recommend-price-full">¥{{ formatPrice(item.price) }}</p>
                <div class="recommend-sales">月销 {{ item.sales || 0 }}+</div>
              </div>
            </div>
            <div v-if="recommendList.length === 0 && !recommendLoading" class="empty-full">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>暂无推荐商品</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <div v-if="previewVisible" class="preview-overlay">
      <div class="preview-content">
        <img :src="previewUrl" alt="" /><button class="preview-close" @click="closePreview">
          ×
        </button>
      </div>
    </div>

    <!-- 确认订单弹窗 -->
    <div v-if="orderModalVisible" class="modal-overlay">
      <div class="modal-container order-modal-new">
        <div class="modal-header">
          <h3>确认订单</h3>
          <button class="close-btn" @click="closeOrderModal">×</button>
        </div>
        <div class="modal-body">
          <div class="order-product-section">
            <div class="order-product-img">
              <img :src="currentImage" :alt="product.productName" />
            </div>
            <div class="order-product-detail">
              <div class="order-product-name">{{ product.productName }}</div>
              <div class="order-product-specs">
                <span v-for="(value, key) in selectedSpecs" :key="key">{{ key }}：{{ value }}</span>
              </div>
              <div class="order-product-price">
                <span class="price-label">单价：</span
                ><span class="price-value">¥{{ formatPrice(currentSku.price) }}</span
                ><span class="quantity-label">x{{ quantity }}</span>
              </div>
              <div class="order-product-total">
                <span>实付：</span
                ><span class="total-price">¥{{ formatPrice(payableAmount) }}</span>
              </div>
            </div>
          </div>
          <div class="order-address-section">
            <div class="section-title">收货信息</div>
            <div class="address-content">
              <div class="address-line">
                <span class="address-label">收货人：</span
                ><span>{{
                  orderForm.receiver || (currentAddress ? currentAddress.receiver : '')
                }}</span>
              </div>
              <div class="address-line">
                <span class="address-label">手机号码：</span
                ><span>{{ orderForm.phone || (currentAddress ? currentAddress.phone : '') }}</span>
              </div>
              <div class="address-line">
                <span class="address-label">收货地址：</span
                ><span>{{
                  orderForm.address || (currentAddress ? currentAddress.address : '')
                }}</span>
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
          <button class="btn-cancel" @click="closeOrderModal">取消</button
          ><button class="btn-confirm" @click="submitOrder" :disabled="submitting">
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
                  <span class="refresh-text">二维码无效？</span
                  ><span class="refresh-link">重新获取！</span>
                </p>
              </div>
            </div>
            <div class="qr-right">
              <div class="order-info-title">订单信息</div>
              <div class="order-info-list">
                <div class="order-info-item">
                  <span class="info-label">订单编号：</span
                  ><span class="info-value order-id">{{ currentOrderId }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品名称：</span
                  ><span class="info-value">{{ product.productName }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品规格：</span
                  ><span class="info-value"
                    ><span v-for="(value, key) in selectedSpecs" :key="key"
                      >{{ key }}：{{ value }}</span
                    ></span
                  >
                </div>
                <div class="order-info-item">
                  <span class="info-label">购买数量：</span
                  ><span class="info-value">{{ quantity }} 件</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品单价：</span
                  ><span class="info-value">¥{{ formatPrice(currentSku.price) }}</span>
                </div>
                <div class="order-info-item total">
                  <span class="info-label">支付金额：</span
                  ><span class="info-value total-price">¥{{ formatPrice(payableAmount) }}</span>
                </div>
              </div>
              <div class="delivery-info-title">收货信息</div>
              <div class="delivery-info-list">
                <div class="delivery-info-item">
                  <span class="info-label">收货人：</span
                  ><span class="info-value">{{
                    orderForm.receiver || (currentAddress ? currentAddress.receiver : '')
                  }}</span>
                </div>
                <div class="delivery-info-item">
                  <span class="info-label">手机号码：</span
                  ><span class="info-value">{{
                    orderForm.phone || (currentAddress ? currentAddress.phone : '')
                  }}</span>
                </div>
                <div class="delivery-info-item">
                  <span class="info-label">收货地址：</span
                  ><span class="info-value address-text">{{
                    orderForm.address || (currentAddress ? currentAddress.address : '')
                  }}</span>
                </div>
                <div class="qr-footer-center">
                  <button class="btn-secondary" @click="closeQrModal">关闭</button
                  ><button class="btn-primary" @click="checkPaymentStatus">我已支付</button>
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
            <span class="icon-line line-tip"></span><span class="icon-line line-long"></span>
            <div class="icon-circle"></div>
            <div class="icon-fix"></div>
          </div>
        </div>
        <h3 class="success-title">支付成功！</h3>
        <p class="success-desc">正在为您跳转订单详情页...</p>
      </div>
    </div>

    <!-- 地址管理弹窗 -->
    <div v-if="addressManagerVisible" class="modal-overlay">
      <div class="modal-container address-manager-modal">
        <div class="modal-header">
          <h3>地址管理</h3>
          <button class="close-btn" @click="closeAddressManager">×</button>
        </div>
        <div class="modal-body address-list-body">
          <div v-if="addressList.length === 0" class="empty-address">
            <div class="empty-icon">📍</div>
            <p>暂无收货地址</p>
            <button class="btn-add-address" @click="openAddressForm('add')">+ 新建地址</button>
          </div>
          <div v-else>
            <div
              v-for="(addr, idx) in addressList"
              :key="addr.id"
              class="address-item"
              :class="{ active: currentAddress && currentAddress.id === addr.id }"
              @click="selectAddress(addr)"
            >
              <div class="address-info">
                <div class="address-contact">
                  <span class="addr-receiver">{{ addr.receiver }}</span
                  ><span class="addr-phone">{{ addr.phone }}</span
                  ><span v-if="addr.isDefault" class="default-tag">默认</span>
                </div>
                <div class="addr-full-address">{{ addr.address }}</div>
              </div>
              <div class="address-actions">
                <button class="action-edit" @click.stop="openAddressForm('edit', addr)">编辑</button
                ><button class="action-delete" @click.stop="deleteAddress(addr.id)">删除</button
                ><button
                  v-if="!addr.isDefault"
                  class="action-set-default"
                  @click.stop="setDefaultAddress(addr.id)"
                >
                  设为默认
                </button>
              </div>
            </div>
            <div class="add-address-btn" @click="openAddressForm('add')">
              <span>+ 新建地址</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 地址编辑/新建弹窗 -->
    <div v-if="addressFormVisible" class="modal-overlay">
      <div class="modal-container address-form-modal">
        <div class="modal-header">
          <h3>{{ addressFormMode === 'add' ? '新建地址' : '编辑地址' }}</h3>
          <button class="close-btn" @click="closeAddressForm">×</button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <label>收货人 <span class="required">*</span></label
            ><input v-model="addressFormData.receiver" placeholder="请输入收货人姓名" />
          </div>
          <div class="form-row">
            <label>电话号码 <span class="required">*</span></label
            ><input v-model="addressFormData.phone" placeholder="请输入手机号码" />
          </div>
          <div class="form-row">
            <label>收货地址 <span class="required">*</span></label
            ><input v-model="addressFormData.address" placeholder="请输入详细收货地址" />
          </div>
          <div class="form-row checkbox-row">
            <label class="checkbox-label"
              ><input type="checkbox" v-model="addressFormData.isDefault" /><span
                >设为默认地址</span
              ></label
            >
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeAddressForm">取消</button
          ><button class="btn-primary" @click="saveAddressForm">
            {{ addressFormMode === 'add' ? '新建' : '保存' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 购物车通知 -->
    <Transition name="cart-toast"
      ><div v-if="cartToastVisible" class="cart-toast">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M20 6L9 17l-5-5" /></svg
        >{{ toastMessage }}
      </div></Transition
    >
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProductDetail, getOrderPreview } from '@/api/product/product'
import { createOrder } from '@/api/order'
import { payOrder } from '@/api/payment'
import { getHomeRecommend } from '@/api/home/home'

const router = useRouter()
const route = useRoute()

// 商品ID
const spuId = ref(route.params.spuId || '')
// 登录状态
const isLoggedIn = ref(false)
// 加载状态
const loading = ref(true)
const orderPreviewLoading = ref(false)
const recommendLoading = ref(false)
const submitting = ref(false)

// 商品信息
const product = reactive({ productName: '', spuId: '', sales: 342, praiseRate: 98, isNew: true })
// SKU
const skuList = ref([])
const currentSku = ref({ price: 0, stock: 0, skuId: '', productUrl: '', specData: '{}' })
// 规格
const specList = ref([])
const selectedSpecs = reactive({})
const currentSpecParams = ref({})
// 图片
const imageList = ref([])
const currentImage = ref('')
// 订单预览数据
const orderPreviewData = ref(null)
const availableCoupons = ref([])
const unavailableCoupons = ref([])
const selectedCouponIds = ref([])
const isFirstRequest = ref(true)

// 商品推荐列表
const recommendList = ref([])

// 支付方式
const selectedPayment = ref('alipay')

// 支付宝支付相关
const qrModalVisible = ref(false)
const qrCodeBase64 = ref('')
const expireSeconds = ref(120)
let expireTimer = null
let currentOrderId = null
const refreshing = ref(false)

// 支付成功动画相关
const paymentSuccessVisible = ref(false)
let successTimer = null

// 多地址管理相关
const addressManagerVisible = ref(false)
const addressFormVisible = ref(false)
const addressFormMode = ref('add')
const addressFormData = reactive({
  id: null,
  receiver: '',
  phone: '',
  address: '',
  isDefault: false,
})
const editingAddressId = ref(null)
const addressList = ref([])
const currentAddress = ref(null)
const STORAGE_KEY = 'user_address_list'

// 订单弹窗
const orderModalVisible = ref(false)
const orderForm = reactive({ receiver: '', phone: '', address: '', remark: '' })

// 显示的价格 - 修复：确保数量变化时价格更新
const displayPrice = computed(() => {
  if (orderPreviewData.value && orderPreviewData.value.payableAmount) {
    return orderPreviewData.value.payableAmount
  }
  return currentSku.value.price * quantity.value
})

const payableAmount = computed(() => {
  if (orderPreviewData.value && orderPreviewData.value.payableAmount) {
    return orderPreviewData.value.payableAmount
  }
  return currentSku.value.price * quantity.value
})

// 评价
const reviewList = ref([
  {
    id: 1,
    userName: '小米粉丝',
    content: '手机性能很强，拍照效果很好！',
    time: '2025-03-15',
    sku: '原色钛金属 256GB',
  },
  {
    id: 2,
    userName: '科技爱好者',
    content: '外观质感很棒，系统流畅，值得购买。',
    time: '2025-03-10',
    sku: '沙漠色钛金属 1TB',
  },
])

const tabs = ref([
  { id: 'detail', name: '商品详情' },
  { id: 'spec', name: '规格参数' },
  { id: 'review', name: '用户评价' },
  { id: 'recommend', name: '猜你喜欢' },
])
const activeTab = ref('detail')
const searchKeyword = ref('')
const cartCount = ref(0)
const cartToastVisible = ref(false)
const toastMessage = ref('')
const previewVisible = ref(false)
const previewUrl = ref('')
const quantity = ref(1)
const defaultShopLogo =
  'https://img14.360buyimg.com/n1/s720x720_jfs/t1/415738/21/12598/49473/69d8ba7fF0bffe763/00833203205eba0d.jpg'

// ========== 规格相关函数 ==========

// 中英文映射表
const getSpecKey = (specName) => {
  const mapping = {
    颜色: 'color',
    容量: 'size',
    配置: 'config',
    版本: 'version',
    套餐类型: 'packageType',
    适用面积: 'area',
    规格: 'spec',
    型号: 'model',
    尺寸: 'size',
    内存: 'memory',
    存储: 'storage',
    颜色分类: 'color',
    尺码: 'size',
  }
  return mapping[specName] || specName
}

// 从specData中获取值
const getSpecValueFromData = (specData, specName, specKey) => {
  if (specData[specKey] !== undefined) return specData[specKey]
  if (specData[specName] !== undefined) return specData[specName]
  const lowerKey = specKey.toLowerCase()
  for (const [k, v] of Object.entries(specData)) {
    if (k.toLowerCase() === lowerKey) return v
  }
  return null
}

// 构建规格列表
const buildSpecList = (specNameStr, skus) => {
  if (!skus || skus.length === 0) return []

  let specNames = []
  if (specNameStr && specNameStr.trim()) {
    specNames = specNameStr.split(';').filter((s) => s.trim())
  }

  if (specNames.length === 0) {
    const allKeys = new Set()
    for (const sku of skus) {
      let specData = {}
      try {
        specData = typeof sku.specData === 'string' ? JSON.parse(sku.specData) : sku.specData
      } catch (e) {
        continue
      }
      Object.keys(specData).forEach((key) => {
        if (!['productName', 'price', 'stock', 'skuId', 'productUrl'].includes(key)) {
          allKeys.add(key)
        }
      })
    }
    specNames = Array.from(allKeys)
  }

  const specs = []
  for (const specName of specNames) {
    const optionsSet = new Map()
    const specKey = getSpecKey(specName)

    for (const sku of skus) {
      let specData = {}
      try {
        specData = typeof sku.specData === 'string' ? JSON.parse(sku.specData) : sku.specData
      } catch (e) {
        continue
      }

      const value = getSpecValueFromData(specData, specName, specKey)

      if (value && !optionsSet.has(value)) {
        optionsSet.set(value, { value, label: value, stock: sku.stock })
      }
    }

    if (optionsSet.size > 0) {
      specs.push({ name: specName, key: specKey, options: Array.from(optionsSet.values()) })
    }
  }
  return specs
}

// 根据规格查找SKU
const findSkuBySpecs = () => {
  if (Object.keys(selectedSpecs).length === 0 && skuList.value.length > 0) {
    return skuList.value[0]
  }

  for (const sku of skuList.value) {
    let specData = {}
    try {
      specData = typeof sku.specData === 'string' ? JSON.parse(sku.specData) : sku.specData
    } catch (e) {
      continue
    }

    let match = true
    for (const [specName, specValue] of Object.entries(selectedSpecs)) {
      const specKey = getSpecKey(specName)
      const skuValue = getSpecValueFromData(specData, specName, specKey)
      if (skuValue !== specValue) {
        match = false
        break
      }
    }
    if (match) return sku
  }
  return skuList.value[0]
}

// 规格选项是否可用
const isSpecOptionAvailable = (specName, optionValue) => {
  if (selectedSpecs[specName] === optionValue) return true
  const tempSpecs = { ...selectedSpecs, [specName]: optionValue }

  for (const sku of skuList.value) {
    let specData = {}
    try {
      specData = typeof sku.specData === 'string' ? JSON.parse(sku.specData) : sku.specData
    } catch (e) {
      continue
    }

    let match = true
    for (const [sName, sValue] of Object.entries(tempSpecs)) {
      const sKey = getSpecKey(sName)
      const skuValue = getSpecValueFromData(specData, sName, sKey)
      if (skuValue !== sValue) {
        match = false
        break
      }
    }
    if (match) return true
  }
  return false
}

// 选择规格 - 确保价格更新
const selectSpecOption = async (specName, value) => {
  if (selectedSpecs[specName] === value) {
    delete selectedSpecs[specName]
  } else {
    selectedSpecs[specName] = value
  }

  const newSku = findSkuBySpecs()
  if (newSku) {
    currentSku.value = { ...newSku }
    currentImage.value = getValidImageUrl(newSku.productUrl)

    let specData = {}
    try {
      specData = typeof newSku.specData === 'string' ? JSON.parse(newSku.specData) : newSku.specData
    } catch (e) {}
    currentSpecParams.value = specData

    // 重新获取订单预览，更新价格
    if (isLoggedIn.value) {
      await fetchOrderPreview()
    }
  }
}

// 初始化选中规格
const initSelectedSpecs = () => {
  if (specList.value.length === 0) {
    if (skuList.value.length > 0) {
      currentSku.value = { ...skuList.value[0] }
      currentImage.value = getValidImageUrl(currentSku.value.productUrl)
      let specData = {}
      try {
        specData =
          typeof currentSku.value.specData === 'string'
            ? JSON.parse(currentSku.value.specData)
            : currentSku.value.specData
      } catch (e) {}
      currentSpecParams.value = specData
    }
    return
  }

  Object.keys(selectedSpecs).forEach((key) => {
    delete selectedSpecs[key]
  })

  for (const spec of specList.value) {
    if (spec.options && spec.options.length > 0) {
      selectedSpecs[spec.name] = spec.options[0].value
    }
  }

  const newSku = findSkuBySpecs()
  if (newSku) {
    currentSku.value = { ...newSku }
    currentImage.value = getValidImageUrl(newSku.productUrl)
    let specData = {}
    try {
      specData = typeof newSku.specData === 'string' ? JSON.parse(newSku.specData) : newSku.specData
    } catch (e) {}
    currentSpecParams.value = specData
  }
}

// ========== 辅助函数 ==========
const formatPrice = (price) => (price === undefined || price === null ? '0.00' : price.toFixed(2))
const parseSpecData = (specData) => {
  try {
    return typeof specData === 'string' ? JSON.parse(specData) : specData
  } catch {
    return {}
  }
}
const getValidImageUrl = (url) => url || defaultShopLogo
const getSpecLabel = (specName) => specName

// 生成唯一ID
const generateAddressId = () => Date.now() + '_' + Math.random().toString(36).substr(2, 9)

// 加载地址列表
const loadAddressList = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      addressList.value = JSON.parse(saved)
    } else {
      const oldInfo = localStorage.getItem('user_delivery_info')
      if (oldInfo) {
        const info = JSON.parse(oldInfo)
        addressList.value = [
          {
            id: generateAddressId(),
            receiver: info.receiver || '',
            phone: info.phone || '',
            address: info.address || '',
            isDefault: true,
          },
        ]
        saveAddressList()
        localStorage.removeItem('user_delivery_info')
      } else {
        addressList.value = []
      }
    }
    if (addressList.value.length > 0) {
      const defaultAddr = addressList.value.find((addr) => addr.isDefault)
      currentAddress.value = defaultAddr || addressList.value[0]
    } else {
      currentAddress.value = null
    }
  } catch (e) {
    console.error('读取地址列表失败:', e)
    addressList.value = []
  }
}

const saveAddressList = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(addressList.value))

const openAddressManager = () => {
  addressManagerVisible.value = true
}
const closeAddressManager = () => {
  addressManagerVisible.value = false
}

const openAddressForm = (mode, address = null) => {
  addressFormMode.value = mode
  if (mode === 'edit' && address) {
    addressFormData.id = address.id
    addressFormData.receiver = address.receiver
    addressFormData.phone = address.phone
    addressFormData.address = address.address
    addressFormData.isDefault = address.isDefault
    editingAddressId.value = address.id
  } else {
    addressFormData.id = null
    addressFormData.receiver = ''
    addressFormData.phone = ''
    addressFormData.address = ''
    addressFormData.isDefault = addressList.value.length === 0
    editingAddressId.value = null
  }
  addressFormVisible.value = true
  addressManagerVisible.value = false
}

const closeAddressForm = () => {
  addressFormVisible.value = false
}

const saveAddressForm = () => {
  if (!addressFormData.receiver.trim()) {
    showToast('请填写收货人姓名')
    return
  }
  if (!addressFormData.phone.trim()) {
    showToast('请填写电话号码')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(addressFormData.phone.trim())) {
    showToast('请输入正确的手机号码')
    return
  }
  if (!addressFormData.address.trim()) {
    showToast('请填写收货地址')
    return
  }

  if (addressFormMode.value === 'add') {
    const newAddress = {
      id: generateAddressId(),
      receiver: addressFormData.receiver,
      phone: addressFormData.phone,
      address: addressFormData.address,
      isDefault: addressFormData.isDefault,
    }
    if (newAddress.isDefault) addressList.value.forEach((addr) => (addr.isDefault = false))
    addressList.value.push(newAddress)
    showToast('地址添加成功')
  } else {
    const index = addressList.value.findIndex((addr) => addr.id === editingAddressId.value)
    if (index !== -1) {
      if (addressFormData.isDefault) addressList.value.forEach((addr) => (addr.isDefault = false))
      addressList.value[index] = {
        ...addressList.value[index],
        receiver: addressFormData.receiver,
        phone: addressFormData.phone,
        address: addressFormData.address,
        isDefault: addressFormData.isDefault,
      }
      showToast('地址修改成功')
    }
  }
  saveAddressList()
  if (addressFormData.isDefault) {
    currentAddress.value = addressList.value.find((addr) => addr.isDefault)
  } else if (currentAddress.value && currentAddress.value.id === editingAddressId.value) {
    const updated = addressList.value.find((addr) => addr.id === editingAddressId.value)
    if (updated) currentAddress.value = updated
  }
  if (!currentAddress.value && addressList.value.length > 0)
    currentAddress.value = addressList.value[0]
  closeAddressForm()
  openAddressManager()
}

const deleteAddress = (id) => {
  if (addressList.value.length === 1) {
    showToast('至少保留一个地址')
    return
  }
  const addrToDelete = addressList.value.find((addr) => addr.id === id)
  const isDeletingCurrent = currentAddress.value && currentAddress.value.id === id
  const isDeletingDefault = addrToDelete && addrToDelete.isDefault
  addressList.value = addressList.value.filter((addr) => addr.id !== id)
  if (isDeletingDefault && addressList.value.length > 0) addressList.value[0].isDefault = true
  if (isDeletingCurrent && addressList.value.length > 0) {
    const defaultAddr = addressList.value.find((addr) => addr.isDefault)
    currentAddress.value = defaultAddr || addressList.value[0]
  }
  saveAddressList()
  showToast('地址已删除')
}

const setDefaultAddress = (id) => {
  addressList.value.forEach((addr) => (addr.isDefault = addr.id === id))
  if (currentAddress.value) currentAddress.value = addressList.value.find((addr) => addr.id === id)
  saveAddressList()
  showToast('默认地址已更新')
}

const selectAddress = (addr) => {
  currentAddress.value = addr
  if (!addr.isDefault) setDefaultAddress(addr.id)
  closeAddressManager()
  showToast(`已切换至 ${addr.receiver} 的地址`)
}

const isCouponSelectable = (coupon) => {
  if (selectedCouponIds.value.includes(coupon.couponId)) return true
  const hasNonStackableSelected = selectedCouponIds.value.some((id) => {
    const c = availableCoupons.value.find((cou) => cou.couponId === id)
    return c && c.stackable !== 1
  })
  if (coupon.stackable === 1 && hasNonStackableSelected) return false
  if (coupon.stackable !== 1 && hasNonStackableSelected) return false
  return true
}

const toggleSelectCoupon = async (coupon) => {
  const index = selectedCouponIds.value.indexOf(coupon.couponId)
  let newSelectedIds = [...selectedCouponIds.value]
  if (index === -1) {
    if (coupon.stackable === 1) {
      newSelectedIds = newSelectedIds.filter((id) => {
        const c = availableCoupons.value.find((cou) => cou.couponId === id)
        return c && c.stackable === 1
      })
      newSelectedIds.push(coupon.couponId)
    } else {
      newSelectedIds = [coupon.couponId]
    }
  } else {
    newSelectedIds.splice(index, 1)
  }
  selectedCouponIds.value = newSelectedIds
  if (newSelectedIds.length > 0) await fetchOrderPreview()
  else orderPreviewData.value = null
}

const formatCouponDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()}到期`
}

// ========== 数量操作 - 确保价格更新 ==========
const increaseQty = async () => {
  if (quantity.value < currentSku.value.stock) {
    quantity.value++
    // 数量变化后重新获取订单预览，更新价格
    if (isLoggedIn.value) {
      await fetchOrderPreview()
    }
  }
}

const decreaseQty = async () => {
  if (quantity.value > 1) {
    quantity.value--
    if (isLoggedIn.value) {
      await fetchOrderPreview()
    }
  }
}

const onQuantityChange = async () => {
  if (quantity.value < 1) quantity.value = 1
  if (currentSku.value.stock && quantity.value > currentSku.value.stock) {
    quantity.value = currentSku.value.stock
  }
  if (isLoggedIn.value) {
    await fetchOrderPreview()
  }
}

// 获取订单预览数据
const fetchOrderPreview = async () => {
  if (!isLoggedIn.value) return
  if (!currentSku.value?.skuId) return

  orderPreviewLoading.value = true
  try {
    const requestData = {
      items: [{ skuId: currentSku.value.skuId, quantity: quantity.value }],
      usedCouponIds: selectedCouponIds.value,
      isFirstRequest: isFirstRequest.value,
    }
    const res = await getOrderPreview(requestData)
    if (res.code === 200 && res.data) {
      orderPreviewData.value = res.data
      const optimalCouponIds = res.data.usedCouponIds || []
      availableCoupons.value = (res.data.availableCoupons || []).map((coupon) => ({
        ...coupon,
        isOptimal: optimalCouponIds.includes(coupon.couponId),
      }))
      unavailableCoupons.value = res.data.unavailableCoupons || []
      if (optimalCouponIds.length > 0 && selectedCouponIds.value.length === 0) {
        selectedCouponIds.value = optimalCouponIds
      }
      if (res.data.items && res.data.items.length > 0) {
        currentSku.value.price = res.data.items[0].price
      }
      isFirstRequest.value = false
    }
  } catch (error) {
    console.error('获取订单预览失败:', error)
  } finally {
    orderPreviewLoading.value = false
  }
}

const previewImage = (url) => {
  previewUrl.value = url
  previewVisible.value = true
}
const closePreview = () => {
  previewVisible.value = false
}

const saveRecentProduct = () => {
  const productInfo = {
    id: spuId.value,
    name: product.productName,
    price: currentSku.value.price,
    image: currentImage.value,
  }
  let recentList = JSON.parse(localStorage.getItem('recent_products') || '[]')
  recentList = recentList.filter((item) => item.id !== productInfo.id)
  recentList.unshift(productInfo)
  recentList = recentList.slice(0, 10)
  localStorage.setItem('recent_products', JSON.stringify(recentList))
}

const fetchRecommendProducts = async () => {
  recommendLoading.value = true
  try {
    const res = await getHomeRecommend({ pageNum: 1, pageSize: 8 })
    if (res.code === 200 && res.data && res.data.list) {
      recommendList.value = res.data.list.map((item) => ({
        ...item,
        productUrl: item.productUrl || item.image || defaultShopLogo,
        isHot: item.sales > 1000,
      }))
    } else if (res.data && Array.isArray(res.data)) {
      recommendList.value = res.data.map((item) => ({
        ...item,
        productUrl: item.productUrl || item.image || defaultShopLogo,
        isHot: item.sales > 1000,
      }))
    } else {
      recommendList.value = []
    }
  } catch (error) {
    console.error('获取推荐商品失败:', error)
    recommendList.value = []
  } finally {
    recommendLoading.value = false
  }
}

const handleRecommendClick = (spuId, skuId) => {
  if (String(spuId) === String(route.params.spuId)) {
    showToast('您正在浏览当前商品')
    return
  }
  if (skuId) router.push(`/product/detail/${spuId}?skuId=${skuId}`)
  else router.push(`/product/detail/${spuId}`)
}

const fetchProductDetail = async () => {
  loading.value = true
  try {
    const res = await getProductDetail(spuId.value)
    if (res.code === 200 && res.data) {
      const data = res.data
      product.productName = data.productName
      product.spuId = data.spuId
      if (data.skuList?.length) {
        skuList.value = data.skuList.map((sku) => ({
          ...sku,
          parsedSpecData: parseSpecData(sku.specData),
        }))
        currentSku.value = skuList.value[0]
        currentSpecParams.value = parseSpecData(currentSku.value.specData)
        currentImage.value = getValidImageUrl(currentSku.value.productUrl)
        specList.value = buildSpecList(data.specName || '', skuList.value)
        initSelectedSpecs()
      }
      const uniqueImages = new Map()
      skuList.value.forEach((sku) => {
        if (sku.productUrl && !uniqueImages.has(sku.productUrl))
          uniqueImages.set(sku.productUrl, getValidImageUrl(sku.productUrl))
      })
      imageList.value = Array.from(uniqueImages.values())
      if (isLoggedIn.value) await fetchOrderPreview()
      saveRecentProduct()
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    showToast('加载失败，请重试')
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (!isLoggedIn.value) {
    showToast('请先登录')
    router.push('/login')
    return
  }
  if (Object.keys(selectedSpecs).length !== specList.value.length) {
    showToast('请先完成规格选择')
    return
  }
  if (!currentSku.value.skuId) {
    showToast('请先选择有效规格')
    return
  }
  cartCount.value++
  showToast('已添加到购物车')
}

const buyNow = () => {
  if (!isLoggedIn.value) {
    showToast('请先登录')
    router.push('/login')
    return
  }
  if (Object.keys(selectedSpecs).length !== specList.value.length) {
    showToast('请先完成规格选择')
    return
  }
  if (!currentSku.value.skuId) {
    showToast('请先选择有效规格')
    return
  }
  openOrderModal()
}

const showToast = (msg) => {
  toastMessage.value = msg
  cartToastVisible.value = true
  setTimeout(() => {
    cartToastVisible.value = false
  }, 1500)
}

const getUserInfo = () => {
  const info =
    localStorage.getItem('mall-user_merchant-info') ||
    sessionStorage.getItem('mall-user_merchant-info')
  if (info)
    try {
      return JSON.parse(info)
    } catch (e) {
      return null
    }
  return null
}

const openOrderModal = () => {
  if (currentAddress.value) {
    orderForm.receiver = currentAddress.value.receiver
    orderForm.phone = currentAddress.value.phone
    orderForm.address = currentAddress.value.address
  } else {
    const userInfo = getUserInfo()
    if (userInfo) {
      orderForm.receiver = userInfo.realName || ''
      orderForm.phone = userInfo.phone || ''
      orderForm.address = userInfo.address || ''
    } else {
      orderForm.receiver = ''
      orderForm.phone = ''
      orderForm.address = ''
    }
    if (!currentAddress.value && addressList.value.length === 0) {
      showToast('请先添加收货地址')
      openAddressManager()
      return
    }
  }
  selectedPayment.value = 'alipay'
  orderModalVisible.value = true
}

const closeOrderModal = () => {
  orderModalVisible.value = false
}

const showPaymentSuccess = () => {
  paymentSuccessVisible.value = true
  if (successTimer) clearTimeout(successTimer)
  successTimer = setTimeout(() => {
    paymentSuccessVisible.value = false
    router.push('/order/list')
  }, 2000)
}

const closeQrModal = () => {
  console.log('关闭二维码弹窗')
  if (expireTimer) {
    clearInterval(expireTimer)
    expireTimer = null
  }
  qrModalVisible.value = false
  qrCodeBase64.value = ''
  currentOrderId = null
  expireSeconds.value = 120
  refreshing.value = false
}

const checkPaymentStatus = () => {
  console.log('手动确认支付,订单ID:', currentOrderId)
  showToast('支付成功！')
  closeQrModal()
  showPaymentSuccess()
}

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

const createPayment = async (orderId) => {
  console.log('开始创建支付单，订单ID:', orderId, '支付方式:', selectedPayment.value)
  try {
    const payType = selectedPayment.value === 'alipay' ? 'Alipay' : 'Balance'
    const requestData = { orderId, payType }
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
          closeOrderModal()
        } else {
          showToast('获取二维码失败，请重试')
        }
      } else if (selectedPayment.value === 'balance') {
        showPaymentSuccess()
      }
    } else {
      showToast(res.msg || '创建支付单失败，请重试')
    }
  } catch (error) {
    console.error('创建支付单异常:', error)
    showToast('支付失败，请重试')
  }
}

const refreshQrCode = async () => {
  if (!currentOrderId) {
    showToast('订单信息错误，请重新下单')
    closeQrModal()
    return
  }

  refreshing.value = true
  try {
    const payType = selectedPayment.value === 'alipay' ? 'Alipay' : 'Balance'
    const requestData = { orderId: currentOrderId, payType }
    const res = await payOrder(requestData)

    let responseData = null
    if (res.code === 200 && res.data) responseData = res.data
    else if (res.orderId && res.qrCode) responseData = res
    else if (res.qrCode) responseData = res

    if (responseData) {
      let qrData = responseData.qrCode || responseData.qrcode || ''
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
        showToast('二维码已更新，请尽快扫码支付')
      } else {
        showToast('获取二维码失败，请重试')
      }
    } else {
      showToast(res.msg || '获取二维码失败，请重试')
    }
  } catch (error) {
    showToast('网络错误，请重试')
  } finally {
    refreshing.value = false
  }
}

const submitOrder = async () => {
  const receiver = orderForm.receiver || (currentAddress ? currentAddress.receiver : '')
  const phone = orderForm.phone || (currentAddress ? currentAddress.phone : '')
  const address = orderForm.address || (currentAddress ? currentAddress.address : '')

  if (!receiver.trim()) {
    showToast('请填写收货人')
    return
  }
  if (!phone.trim()) {
    showToast('请填写电话号码')
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone.trim())) {
    showToast('请输入正确的手机号码')
    return
  }
  if (!address.trim()) {
    showToast('请填写收货地址')
    return
  }

  submitting.value = true
  try {
    const requestData = {
      items: [{ skuId: currentSku.value.skuId, quantity: quantity.value }],
      usedCouponIds: selectedCouponIds.value,
      address: address.trim(),
      remark: orderForm.remark || '',
      receiverName: receiver.trim(),
      receiverPhone: phone.trim(),
      paymentMethod: selectedPayment.value === 'alipay' ? 'ALIPAY' : 'BALANCE',
    }
    const res = await createOrder(requestData)

    if (res.code === 200 && res.data && res.data.orderId) {
      currentOrderId = res.data.orderId
      await createPayment(currentOrderId)
    } else {
      showToast(res.msg || '下单失败，请重试')
    }
  } catch (error) {
    console.error('提交订单异常:', error)
    showToast('网络错误，请稍后重试')
  } finally {
    submitting.value = false
  }
}

const checkLoginStatus = () => {
  const info =
    localStorage.getItem('mall-user_merchant-info') ||
    sessionStorage.getItem('mall-user_merchant-info')
  isLoggedIn.value = !!info
}

const searchProduct = () => {
  if (searchKeyword.value.trim()) router.push(`/search?keyword=${searchKeyword.value}`)
}

const goToHome = () => router.push('/')
const goToProducts = () => router.push('/search')
const goToCategories = () => router.push('/categories')
const goToCart = () => router.push('/cart')
const goToLogin = () => router.push('/login')
const goToProfile = () => {
  if (!isLoggedIn.value) router.push('/login')
  else {
    const info = JSON.parse(
      localStorage.getItem('mall-user_merchant-info') ||
        sessionStorage.getItem('mall-user_merchant-info'),
    )
    if (info.identityType == '用户') router.push(`/user/detail/${info.userId}`)
    else if (info.identityType == '商家') router.push(`/merchant/detail/${info.merchantId}`)
  }
}
const goToShop = () => router.push('/merchant/detail/1')

watch(
  () => route.params.spuId,
  (newSpuId) => {
    if (newSpuId) {
      spuId.value = newSpuId
      loading.value = true
      fetchProductDetail()
      fetchRecommendProducts()
    }
  },
  { immediate: true },
)

onMounted(() => {
  checkLoginStatus()
  loadAddressList()
  fetchProductDetail()
  fetchRecommendProducts()

  // ✅ 只需要监听全局事件，不需要初始化 WebSocket
  window.addEventListener('user-payment-notification', handlePaymentNotification)
  window.addEventListener('merchant-payment-notification', handlePaymentNotification)
})
const handlePaymentNotification = (event) => {
  const notification = event.detail
  console.log('收到支付成功信号（全局事件）:', notification)
  const orderId = notification.orderId || notification

  // 只处理当前订单
  if (currentOrderId && String(orderId) === String(currentOrderId)) {
    if (qrModalVisible.value) {
      closeQrModal()
    }
    showPaymentSuccess()
    currentOrderId = null
  }
}

onUnmounted(() => {
  // 清理定时器
  if (expireTimer) {
    clearInterval(expireTimer)
    expireTimer = null
  }
  if (successTimer) {
    clearTimeout(successTimer)
    successTimer = null
  }

  // ✅ 移除事件监听
  window.removeEventListener('user-payment-notification', handlePaymentNotification)
  window.removeEventListener('merchant-payment-notification', handlePaymentNotification)
})
</script>
<style scoped>
/* ========== 基础样式 ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.product-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #eef2f6 100%);
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
  background: #ffffff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
}
.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
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
  background: linear-gradient(135deg, #ff6700, #ffaa66);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nav-search {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 40px;
  padding: 8px 16px;
  width: 300px;
}
.nav-search input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}
.nav-search button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #999;
}
.nav-links {
  display: flex;
  gap: 24px;
}
.nav-item {
  cursor: pointer;
  color: #333;
  font-size: 14px;
  position: relative;
  transition: color 0.2s;
}
.nav-item:hover {
  color: #ff6700;
}
.cart-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: #ff6700;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 20px;
}

/* ========== 面包屑 ========== */
.breadcrumb {
  background: transparent;
  padding: 16px 0;
}
.breadcrumb-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-size: 13px;
  color: #666;
}
.breadcrumb a {
  cursor: pointer;
  color: #666;
  text-decoration: none;
}
.breadcrumb a:hover {
  color: #ff6700;
}
.breadcrumb .current {
  color: #333;
}
.breadcrumb span {
  margin: 0 8px;
}

/* ========== 主体容器 ========== */
.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

/* ========== 商品图库 ========== */
.product-gallery {
  position: sticky;
  top: 100px;
}
.main-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background: #f8f9fa;
}
.main-image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}
.thumbnail-list {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}
.thumbnail.active {
  border-color: #ff6700;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ========== 商品推荐区域 ========== */
.product-recommend-section {
  margin-top: 32px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
}
.recommend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.recommend-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  position: relative;
  padding-left: 12px;
}
.recommend-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 2px;
}
.recommend-more {
  font-size: 12px;
  color: #ff6700;
  cursor: pointer;
  transition: color 0.2s;
}
.recommend-more:hover {
  color: #ff8533;
  text-decoration: underline;
}
.recommend-grid-horizontal {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.recommend-card {
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}
.recommend-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.recommend-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #fff;
}
.recommend-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.recommend-card:hover .recommend-image img {
  transform: scale(1.05);
}
.recommend-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 14px;
}
.recommend-info {
  padding: 10px;
}
.recommend-name {
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recommend-price {
  font-size: 15px;
  font-weight: 700;
  color: #ff6700;
}
.recommend-loading {
  grid-column: span 4;
  display: flex;
  justify-content: center;
  padding: 20px;
}
.recommend-empty {
  grid-column: span 4;
  text-align: center;
  padding: 20px;
  color: #94a3b8;
  font-size: 13px;
}

/* ========== 商品信息 ========== */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.product-tag {
  display: inline-block;
  width: fit-content;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
.product-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.3;
}
.product-subtitle {
  font-size: 14px;
  color: #888;
}

/* ========== 价格区域 ========== */
.price-section {
  background: #f8f9fa;
  padding: 16px 20px;
  border-radius: 16px;
  margin: 8px 0;
}
.price-main {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.current-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.price-symbol {
  font-size: 24px;
  font-weight: 600;
  color: #ff6700;
}
.price-value {
  font-size: 42px;
  font-weight: 700;
  color: #ff6700;
}
.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}
.price-discount {
  font-size: 13px;
  color: #10b981;
  text-align: right;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed #e0e0e0;
}
.discount-amount {
  font-weight: 700;
  font-size: 14px;
}
.sales-info {
  display: flex;
  gap: 24px;
  margin-top: 12px;
  font-size: 13px;
  color: #666;
}

/* ========== 收货信息区域样式 ========== */
.delivery-info-section {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background: #f8fafc;
  padding: 14px 16px;
  border-radius: 16px;
  margin: 8px 0;
  transition: all 0.2s;
  border: 1px solid #e2e8f0;
}
.delivery-label {
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  flex-shrink: 0;
}
.delivery-details {
  flex: 1;
  cursor: pointer;
}
.info-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.contact-info {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.receiver {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}
.phone {
  font-size: 14px;
  color: #475569;
}
.default-badge {
  font-size: 11px;
  background: #ff6700;
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
}
.address {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  word-break: break-all;
}
.address-tip {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
}
.empty-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f97316;
  font-size: 13px;
}
.empty-info svg {
  stroke: #f97316;
}

/* ========== 优惠券区域 ========== */
.coupon-section {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff8ef;
  padding: 16px;
  border-radius: 20px;
}
.coupon-label {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  min-width: 60px;
  flex-shrink: 0;
  padding-top: 4px;
}
.coupon-list-wrapper {
  flex: 1;
  min-width: 0;
}
.coupon-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.coupon-list.has-scroll {
  max-height: 320px;
  overflow-y: auto;
  padding-right: 6px;
}
.coupon-list.has-scroll::-webkit-scrollbar {
  width: 4px;
}
.coupon-list.has-scroll::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}
.coupon-list.has-scroll::-webkit-scrollbar-thumb {
  background: #ff6700;
  border-radius: 4px;
}
.coupon-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  color: #999;
  font-size: 13px;
}
.loading-spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid #f0f0f0;
  border-top-color: #ff6700;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
.coupon-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  transition: all 0.2s;
  cursor: pointer;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.coupon-item.available {
  border-left: 4px solid #ff6700;
}
.coupon-item.available:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.12);
}
.coupon-item.available.selected {
  background: linear-gradient(135deg, #fff7ed, #fff0e6);
  border: 2px solid #ff6700;
  box-shadow: 0 4px 14px rgba(255, 103, 0, 0.2);
}
.coupon-item.available.optimal {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-left: 4px solid #10b981;
}
.coupon-item.available.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.1);
}
.coupon-item.unavailable {
  background: #f8f8f8;
  border-left: 4px solid #ddd;
  opacity: 0.6;
  cursor: not-allowed;
}
.coupon-item.login-tip,
.coupon-item.empty-tip {
  cursor: default;
  justify-content: space-between;
  background: #f5f5f5;
}
.coupon-item.empty-tip {
  justify-content: center;
}
.coupon-icon {
  font-size: 24px;
  min-width: 36px;
  text-align: center;
}
.coupon-info {
  flex: 1;
}
.coupon-amount {
  color: #ff6700;
  font-weight: 700;
  min-width: 80px;
  margin-right: 16px;
}
.amount-wrapper {
  display: flex;
  align-items: baseline;
}
.amount-symbol {
  font-size: 14px;
}
.amount-value {
  font-size: 22px;
  margin-left: 2px;
}
.amount-discount {
  font-size: 18px;
}
.coupon-detail {
  flex: 1;
}
.coupon-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}
.coupon-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.coupon-condition {
  font-size: 11px;
  color: #fff;
  background: #ff6700;
  padding: 2px 8px;
  border-radius: 20px;
}
.coupon-stackable {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  background: #f0f0f0;
  color: #999;
}
.coupon-stackable.stackable {
  background: #dcfce7;
  color: #10b981;
}
.coupon-date {
  font-size: 11px;
  color: #94a3b8;
}
.coupon-status {
  min-width: 80px;
  text-align: right;
}
.coupon-select-icon {
  font-size: 12px;
  color: #10b981;
  font-weight: 600;
  background: #dcfce7;
  padding: 4px 12px;
  border-radius: 20px;
}
.coupon-optimal-icon {
  font-size: 11px;
  color: #10b981;
  font-weight: 500;
  background: #dcfce7;
  padding: 4px 12px;
  border-radius: 20px;
}
.coupon-disabled-icon {
  font-size: 11px;
  color: #94a3b8;
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 20px;
}
.coupon-unusable-reason {
  font-size: 11px;
  color: #f56c6c;
  background: #fef0f0;
  padding: 4px 12px;
  border-radius: 20px;
}
.coupon-login-btn {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
}

/* ========== 规格选择 ========== */
.spec-section {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.spec-label {
  width: 80px;
  font-size: 14px;
  color: #666;
}
.spec-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.spec-option {
  position: relative;
  padding: 8px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.spec-option:hover {
  border-color: #ff6700;
  color: #ff6700;
}
.spec-option.active {
  background: #ff6700;
  border-color: #ff6700;
  color: white;
}
.spec-option.disabled {
  background: #f5f5f5;
  border-color: #e0e0e0;
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
.disabled-tag {
  color: #f56c6c;
  background: #fef0f0;
  padding: 2px 6px;
  border-radius: 20px;
  font-size: 10px;
  margin-left: 6px;
}
.stock-low {
  font-size: 10px;
  color: #ff6700;
  margin-left: 6px;
}

/* ========== 数量选择 ========== */
.quantity-section {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.quantity-label {
  width: 80px;
  font-size: 14px;
  color: #666;
}
.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 40px;
  overflow: hidden;
}
.qty-btn {
  width: 36px;
  height: 36px;
  background: #f5f5f5;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}
.qty-btn:hover:not(:disabled) {
  background: #ff6700;
  color: white;
}
.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.quantity-selector input {
  width: 60px;
  text-align: center;
  border: none;
  outline: none;
  font-size: 14px;
}
.stock-info {
  font-size: 13px;
  color: #999;
}

/* ========== 服务保障 ========== */
.service-section {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.service-label {
  width: 80px;
  font-size: 14px;
  color: #666;
}
.service-list {
  display: flex;
  gap: 24px;
}
.service-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}
.service-item svg {
  stroke: #10b981;
}

/* ========== 操作按钮 ========== */
.action-buttons {
  display: flex;
  gap: 16px;
  margin: 8px 0;
}
.btn-cart {
  flex: 1;
  background: transparent;
  border: 1px solid #ff6700;
  color: #ff6700;
  padding: 14px 24px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cart:hover {
  background: #fff7ed;
  transform: translateY(-1px);
}
.btn-buy {
  flex: 1;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  color: white;
  padding: 14px 24px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}
.btn-buy:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 103, 0, 0.35);
}

/* ========== 店铺卡片 ========== */
.shop-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f8f9fa;
  padding: 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 8px;
}
.shop-card:hover {
  background: #f0f2f5;
}
.shop-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.shop-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shop-info {
  flex: 1;
}
.shop-name {
  font-weight: 600;
  margin-bottom: 4px;
}
.shop-score {
  font-size: 12px;
  color: #ff6700;
}
.shop-btn {
  background: transparent;
  border: 1px solid #ddd;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.shop-btn:hover {
  border-color: #ff6700;
  color: #ff6700;
}

/* ========== 加载状态 ========== */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f0f0f0;
  border-top-color: #ff6700;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ========== 详情标签页 ========== */
.detail-tabs {
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 20px;
}
.tabs-header {
  display: flex;
  gap: 8px;
  background: white;
  border-radius: 60px;
  padding: 6px;
  width: fit-content;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.tab-btn {
  padding: 12px 32px;
  background: transparent;
  border: none;
  border-radius: 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn.active {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.3);
}
.tab-content {
  margin-top: 24px;
}
.detail-content,
.spec-content,
.review-content,
.recommend-content {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
.spec-table {
  width: 100%;
  border-collapse: collapse;
}
.spec-table tr {
  border-bottom: 1px solid #f0f0f0;
}
.spec-table td {
  padding: 16px 0;
}
.param-name {
  width: 150px;
  font-weight: 500;
  color: #666;
}
.param-value {
  color: #333;
}
.review-stats {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}
.review-score .score {
  font-size: 48px;
  font-weight: 700;
  color: #ff6700;
}
.review-score .total {
  font-size: 14px;
  color: #999;
}
.review-count {
  font-size: 14px;
  color: #666;
}
.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}
.review-user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.review-user .avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
}
.review-user .time {
  font-size: 12px;
  color: #999;
}
.review-sku {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

/* ========== 推荐标签页全屏样式 ========== */
.recommend-header-full {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}
.recommend-title-full {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  position: relative;
  padding-left: 12px;
}
.recommend-title-full::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 18px;
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border-radius: 2px;
}
.recommend-grid-full {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.recommend-item-full {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}
.recommend-item-full:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  border-color: #ff6700;
}
.recommend-image-full {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f8f9fa;
}
.recommend-image-full img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.recommend-item-full:hover .recommend-image-full img {
  transform: scale(1.05);
}
.recommend-info-full {
  padding: 16px;
}
.recommend-name-full {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recommend-spec {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
}
.recommend-price-full {
  font-size: 18px;
  font-weight: 700;
  color: #ff6700;
  margin-bottom: 6px;
}
.recommend-sales {
  font-size: 11px;
  color: #94a3b8;
}
.empty-full {
  grid-column: span 4;
  text-align: center;
  padding: 60px 20px;
  color: #c9cdd4;
}
.empty-full svg {
  stroke: #e5e6eb;
  margin-bottom: 16px;
}
.empty-full p {
  font-size: 14px;
}

/* ========== 图片预览 ========== */
.preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.preview-content {
  position: relative;
  max-width: 80vw;
  max-height: 80vh;
}
.preview-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 16px;
}
.preview-close {
  position: absolute;
  top: -40px;
  right: -40px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
}

/* ========== 购物车通知 ========== */
.cart-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a2e;
  color: white;
  padding: 12px 28px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  z-index: 1000;
  animation: fadeInUp 0.3s ease;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* ========== 订单弹窗 ========== */
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
.order-modal-new .modal-footer {
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

/* ========== 新版二维码弹窗样式 ========== */
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
  height: 70vh;

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
  max-height: 240px;

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

/* ========== 支付成功动画样式 ========== */
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
.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}
.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 100px;
  animation: rotateCircle 4.25s ease-in;
}
.check-icon::before,
.check-icon::after {
  content: '';
  height: 100px;
  position: absolute;
  background: #ffffff;
  transform: rotate(-45deg);
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
@keyframes rotateCircle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

/* ========== 地址管理弹窗样式 ========== */
.address-manager-modal {
  width: 560px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}
.address-list-body {
  flex: 1;
  overflow-y: auto;
}
.address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.address-item:hover {
  border-color: #ff6700;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.1);
}
.address-item.active {
  border-color: #ff6700;
  background: #fff7ed;
}
.address-info {
  flex: 1;
}
.address-contact {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.addr-receiver {
  font-weight: 600;
  color: #1e293b;
}
.addr-phone {
  color: #64748b;
  font-size: 13px;
}
.default-tag {
  font-size: 10px;
  background: #ff6700;
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
}
.addr-full-address {
  font-size: 13px;
  color: #475569;
  line-height: 1.4;
}
.address-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.address-actions button {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  border: none;
  transition: 0.2s;
}
.action-edit {
  background: #e2e8f0;
  color: #475569;
}
.action-edit:hover {
  background: #cbd5e1;
}
.action-delete {
  background: #fee2e2;
  color: #ef4444;
}
.action-delete:hover {
  background: #fecaca;
}
.action-set-default {
  background: #dcfce7;
  color: #10b981;
}
.action-set-default:hover {
  background: #bbf7d0;
}
.add-address-btn {
  margin-top: 16px;
  padding: 12px;
  text-align: center;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  color: #ff6700;
  cursor: pointer;
  transition: 0.2s;
}
.add-address-btn:hover {
  border-color: #ff6700;
  background: #fff7ed;
}
.empty-address {
  text-align: center;
  padding: 40px 20px;
}
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.empty-address p {
  color: #94a3b8;
  margin-bottom: 20px;
}
.btn-add-address {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-add-address:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}
.address-form-modal {
  width: 480px;
}
.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}
.form-row label {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}
.form-row .required {
  color: #ef4444;
}
.form-row input,
.form-row textarea {
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
.checkbox-row {
  flex-direction: row;
  align-items: center;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
}
.checkbox-label input {
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
}
.btn-secondary {
  background: #f1f5f9;
  border: none;
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
}
.btn-secondary:hover {
  background: #e2e8f0;
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
  transition: 0.2s;
  box-shadow: 0 2px 6px rgba(255, 103, 0, 0.3);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.35);
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .recommend-grid-full {
    grid-template-columns: repeat(3, 1fr);
  }
  .empty-full {
    grid-column: span 3;
  }
}
@media (max-width: 768px) {
  .detail-container {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  .recommend-grid-horizontal {
    grid-template-columns: repeat(2, 1fr);
  }
  .recommend-grid-full {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .recommend-loading {
    grid-column: span 2;
  }
  .recommend-empty {
    grid-column: span 2;
  }
  .empty-full {
    grid-column: span 2;
  }
  .nav-search {
    display: none;
  }
  .product-title {
    font-size: 22px;
  }
  .price-value {
    font-size: 32px;
  }
  .coupon-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .coupon-info {
    width: 100%;
  }
  .coupon-status {
    width: 100%;
    text-align: left;
  }
  .coupon-date {
    white-space: normal;
  }
  .delivery-info-section {
    flex-direction: column;
    gap: 8px;
  }
  .delivery-label {
    width: auto;
  }
  .address-manager-modal,
  .address-form-modal,
  .order-modal-new,
  .qr-modal-new {
    width: 95%;
  }
  .qr-layout {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .qr-left {
    width: 100%;
    max-width: 20px;
  }
  .qr-right {
    width: 100%;
  }
  .qr-code img {
    width: 180px;
    height: 180px;
  }
  .qr-code-expired {
    width: 180px;
    height: 180px;
  }
  .address-item {
    flex-direction: column;
    gap: 12px;
  }
  .address-actions {
    width: 100%;
    justify-content: flex-end;
  }
  .recommend-info-full {
    padding: 12px;
  }
  .recommend-name-full {
    font-size: 12px;
  }
  .recommend-price-full {
    font-size: 15px;
  }
  .payment-option {
    padding: 12px;
  }
  .payment-name {
    font-size: 13px;
  }
  .payment-icon {
    font-size: 20px;
  }
  .btn-cancel,
  .btn-confirm {
    padding: 8px 20px;
  }
  .success-animation {
    padding: 32px 40px;
  }
  .success-checkmark {
    width: 60px;
    height: 60px;
  }
  .check-icon {
    width: 60px;
    height: 60px;
  }
  .icon-line.line-tip {
    top: 34px;
    left: 10px;
    width: 20px;
  }
  .icon-line.line-long {
    top: 28px;
    right: 6px;
    width: 36px;
  }
  .icon-circle {
    width: 60px;
    height: 60px;
  }
  .icon-fix {
    top: 6px;
    left: 20px;
    height: 60px;
  }
  .success-title {
    font-size: 20px;
  }
  .success-desc {
    font-size: 12px;
  }
}
@media (max-width: 480px) {
  .recommend-grid-horizontal {
    grid-template-columns: repeat(2, 1fr);
  }
  .recommend-grid-full {
    grid-template-columns: 1fr;
  }
  .empty-full {
    grid-column: span 1;
  }
}
</style>
