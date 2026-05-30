<template>
  <div class="order-detail-page">
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
          <span>京东生态商城</span>
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
          <div class="nav-item" @click="goToOrders">我的订单</div>
          <div class="nav-item" @click="goToCart">
            购物车
            <span class="cart-badge" v-if="cartCount > 0">{{ cartCount }}</span>
          </div>
          <div class="nav-item" @click="goToProfile">个人中心</div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="orderDetail">
      <!-- 店铺信息区域 -->
      <div class="shop-header-card">
        <div class="container">
          <div class="shop-info-wrapper">
            <div class="shop-avatar" @click="goToShop(orderDetail.shopId)">
              <img
                :src="orderDetail.shopLogo || '/default-shop-logo.png'"
                :alt="orderDetail.shopName"
                @error="handleImageError"
              />
            </div>
            <div class="shop-details">
              <div class="shop-name" @click="goToShop(orderDetail.shopId)">
                {{ orderDetail.shopName }}
              </div>
            </div>

            <div class="shop-actions">
              <button class="btn-contact-shop" @click="handleTalkToCustomer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                联系客服
              </button>
              <button class="btn-view-shop" @click="goToShop(orderDetail.shopId)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                进入店铺
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 1. 订单状态横幅 -->
      <!-- 1. 订单状态横幅 -->
      <!-- 1. 订单状态横幅 -->
      <div class="status-banner" :class="getBannerClass(orderDetail.status)">
        <div class="container">
          <div class="banner-content">
            <div class="banner-left">
              <div class="status-icon" :class="getStatusIconClass(orderDetail.status)">
                <svg
                  v-if="orderDetail.status === 4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <svg
                  v-else-if="orderDetail.status === 3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
              </div>
              <div class="banner-text">
                <h2>{{ getStatusText(orderDetail.status) }}</h2>
                <p>{{ getStatusDesc(orderDetail.status) }}</p>
              </div>
            </div>

            <!-- 所有按钮都放在 banner-right 内部 -->
            <div class="banner-right">
              <!-- 待收货状态：显示确认收货和申请退款 -->
              <!-- 待付款状态：显示立即付款和取消订单 -->
              <template v-if="orderDetail.status === 1">
                <button class="btn-pay" @click="openPaymentDialog">立即付款</button>
                <button class="btn-cancel-order" @click="openCancelConfirm">取消订单</button>
              </template>

              <!-- 除待付款外，其他状态都显示申请退款 -->
              <template
                v-if="
                  orderDetail.status !== 1 &&
                  orderDetail.status !== 5 &&
                  orderDetail.status !== 6 &&
                  orderDetail.status !== 0
                "
              >
                <button class="btn-refund-apply" @click="openRefundModal">申请退款</button>
              </template>

              <!-- 退款中状态：显示退款处理中和查看退款详情 -->
              <template v-if="orderDetail.status === 5">
                <button class="btn-refund-apply disabled" disabled>退款处理中</button>
                <button class="btn-view-refund-detail" @click="viewRefundDetail">
                  查看退款详情
                </button>
              </template>

              <!-- 退款成功状态：显示已退款和查看退款详情 -->
              <template v-if="orderDetail.status === 6">
                <button class="btn-refund-apply disabled" disabled>已退款</button>
                <button class="btn-view-refund-detail" @click="viewRefundDetail">
                  查看退款详情
                </button>
              </template>

              <!-- 已关闭状态：显示订单已关闭 -->
              <template v-if="orderDetail.status === 0">
                <button class="btn-refund-apply disabled" disabled>订单已关闭</button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="container main-content">
        <!-- 2. 进度追踪 -->
        <div class="card progress-card">
          <div class="progress-steps">
            <div
              class="step"
              :class="{ active: orderDetail.status >= 1, completed: orderDetail.status >= 2 }"
            >
              <div class="step-circle">
                <span v-if="orderDetail.status >= 2">✓</span>
                <span v-else>1</span>
              </div>
              <div class="step-info">
                <div class="step-name">提交订单</div>
                <div class="step-time">{{ orderDetail.createTime }}</div>
              </div>
            </div>
            <div class="step-line" :class="{ active: orderDetail.status >= 2 }"></div>
            <div
              class="step"
              :class="{ active: orderDetail.status >= 2, completed: orderDetail.status >= 2 }"
            >
              <div class="step-circle">
                <span v-if="orderDetail.status >= 2">✓</span>
                <span v-else>2</span>
              </div>
              <div class="step-info">
                <div class="step-name">付款成功</div>
                <div class="step-time">{{ orderDetail.payTime || '等待付款' }}</div>
              </div>
            </div>
            <div class="step-line" :class="{ active: orderDetail.status >= 2 }"></div>
            <div
              class="step"
              :class="{ active: orderDetail.status >= 2, completed: orderDetail.status >= 3 }"
            >
              <div class="step-circle">
                <span v-if="orderDetail.status >= 3">✓</span>
                <span v-else>3</span>
              </div>
              <div class="step-info">
                <div class="step-name">商品发货</div>
                <div class="step-time">
                  {{ orderDetail.shipperTime }}
                </div>
              </div>
            </div>
            <div class="step-line" :class="{ active: orderDetail.status >= 3 }"></div>
            <div
              class="step"
              :class="{ active: orderDetail.status >= 3, completed: orderDetail.status >= 4 }"
            >
              <div class="step-circle">
                <span v-if="orderDetail.status >= 4">✓</span>
                <span v-else>4</span>
              </div>
              <div class="step-info">
                <div class="step-name">配送中</div>
                <div class="step-time">{{ orderDetail.deliveryTime || '等待配送' }}</div>
              </div>
            </div>
            <div class="step-line" :class="{ active: orderDetail.status >= 4 }"></div>
            <div
              class="step"
              :class="{ active: orderDetail.status >= 4, completed: orderDetail.status == 4 }"
            >
              <div class="step-circle">
                <span v-if="orderDetail.status == 4">✓</span>
                <span v-else>5</span>
              </div>
              <div class="step-info">
                <div class="step-name">确认收货</div>
                <div class="step-time">{{ orderDetail.signTime || '等待确认' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 双列布局 -->
        <div class="grid-2">
          <!-- 收货信息 -->
          <div class="card info-card">
            <div class="card-header">
              <h3>📦 收货信息</h3>
              <span class="edit-link" @click="editAddress">修改</span>
            </div>
            <div class="card-body">
              <div class="info-row">
                <div class="info-label">收货人</div>
                <div class="info-value">{{ orderDetail.receiverName || '待补充' }}</div>
              </div>
              <div class="info-row">
                <div class="info-label">联系电话</div>
                <div class="info-value">
                  {{ formatPhone(orderDetail.receiverPhone) || '待补充' }}
                </div>
              </div>
              <div class="info-row">
                <div class="info-label">收货地址</div>
                <div class="info-value">
                  {{ orderDetail.address || '待补充' }} {{ orderDetail.remark || '' }}
                </div>
              </div>
            </div>
          </div>

          <!-- 物流信息 -->
          <div class="card info-card">
            <div class="card-header">
              <h3>🚚 物流信息</h3>
              <span class="edit-link" @click="trackLogistics" v-if="orderDetail.logisticId"
                >查看轨迹</span
              >
            </div>
            <div class="card-body">
              <div class="info-row">
                <div class="info-label">快递公司</div>
                <div class="info-value">{{ orderDetail.logisticCompanyName || '暂未发货' }}</div>
              </div>
              <div class="info-row">
                <div class="info-label">运单号码</div>
                <div class="info-value">
                  {{ orderDetail.logisticId || '暂未发货' }}
                  <span
                    class="copy-link"
                    v-if="orderDetail.logisticId"
                    @click="copyLogisticId(orderDetail.logisticId)"
                    >复制</span
                  >
                </div>
              </div>
              <div class="info-row">
                <div class="info-label">支付单号</div>
                <div class="info-value">
                  {{ orderDetail.paymentId || '暂无' }}
                  <span class="copy-link" @click="copyPaymentId(orderDetail.paymentId)">复制</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. 商品清单 -->
        <div class="card product-card">
          <div class="card-header">
            <h3>🛍️ 商品清单</h3>
          </div>
          <div class="product-list">
            <div class="product-item">
              <div class="product-image" @click="goToProductDetail(orderDetail.spuId)">
                <img :src="orderDetail.productUrl" :alt="orderDetail.productName" />
              </div>
              <div class="product-details">
                <div class="product-title" @click="goToProductDetail(orderDetail.spuId)">
                  {{ orderDetail.productName }}
                </div>
                <div class="product-sku" @click="goToProductDetail(orderDetail.spuId)">
                  规格：{{ orderDetail.specData || '标准版' }}
                </div>
              </div>
              <div class="product-price">¥{{ formatMoney(orderDetail.price) }}</div>
              <div class="product-quantity">x1</div>
              <div class="product-total">¥{{ formatMoney(orderDetail.price) }}</div>
            </div>
          </div>
        </div>

        <!-- 5. 订单信息与费用 -->
        <div class="grid-2">
          <!-- 订单信息 -->
          <div class="card info-card">
            <div class="card-header">
              <h3>📋 订单信息</h3>
            </div>
            <div class="card-body">
              <div class="info-row">
                <div class="info-label">订单编号</div>
                <div class="info-value">
                  {{ orderDetail.orderId }}
                  <span class="copy-link" @click="copyOrderNo(orderDetail.orderId)">复制</span>
                </div>
              </div>
              <div class="info-row">
                <div class="info-label">子订单号</div>
                <div class="info-value">
                  {{ orderDetail.suborderId }}
                  <span class="copy-link" @click="copySuborderId(orderDetail.suborderId)"
                    >复制</span
                  >
                </div>
              </div>
              <div class="info-row">
                <div class="info-label">下单时间</div>
                <div class="info-value">{{ orderDetail.createTime }}</div>
              </div>
              <div class="info-row">
                <div class="info-label">支付方式</div>
                <div class="info-value">{{ getPayTypeText(orderDetail.payType) }}</div>
              </div>
              <div class="info-row">
                <div class="info-label">支付时间</div>
                <div class="info-value">{{ orderDetail.payTime || '未支付' }}</div>
              </div>
            </div>
          </div>

          <!-- 费用明细 -->
          <div class="card price-card">
            <div class="card-header">
              <h3>💰 费用明细</h3>
            </div>
            <div class="card-body">
              <div class="price-row">
                <span>商品总价</span>
                <span>¥{{ formatMoney(orderDetail.price) }}</span>
              </div>
              <div
                class="price-row discount-row"
                v-if="orderDetail.discountAmount && orderDetail.discountAmount > 0"
              >
                <span>折扣</span>
                <span class="discount-value">-¥{{ formatMoney(orderDetail.discountAmount) }}</span>
              </div>
              <div class="price-row">
                <span>运费</span>
                <span>¥0.00</span>
              </div>
              <div class="price-row total">
                <span>实付款</span>
                <span class="total-amount">¥{{ formatMoney(orderDetail.payAmount) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="errorMsg" class="error-container">
      <div class="error-icon">
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
      </div>
      <p>{{ errorMsg }}</p>
      <button class="btn-primary" @click="goToOrders">返回订单列表</button>
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
              <img :src="orderDetail?.productUrl" :alt="orderDetail?.productName" />
            </div>
            <div class="order-product-detail">
              <div class="order-product-name">{{ orderDetail?.productName }}</div>
              <div class="order-product-specs">
                <span>规格：{{ orderDetail?.specData || '标准版' }}</span>
              </div>
              <div class="order-product-price">
                <span class="price-label">单价：</span>
                <span class="price-value">¥{{ formatMoney(orderDetail?.price) }}</span>
                <span class="quantity-label">x1</span>
              </div>
              <div class="order-product-total">
                <span>实付：</span>
                <span class="total-price">¥{{ formatMoney(orderDetail?.payAmount) }}</span>
              </div>
            </div>
          </div>
          <div class="order-address-section">
            <div class="section-title">收货信息</div>
            <div class="address-content">
              <div class="address-line">
                <span class="address-label">收货人：</span>
                <span>{{ orderDetail?.receiverName }}</span>
              </div>
              <div class="address-line">
                <span class="address-label">手机号码：</span>
                <span>{{ orderDetail?.receiverPhone }}</span>
              </div>
              <div class="address-line">
                <span class="address-label">收货地址：</span>
                <span>{{ orderDetail?.address }} {{ orderDetail?.remark || '' }}</span>
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
                  <span class="info-value order-id">{{ currentOrderId }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品名称：</span>
                  <span class="info-value">{{ orderDetail?.productName }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品规格：</span>
                  <span class="info-value">{{ orderDetail?.specData || '标准版' }}</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">购买数量：</span>
                  <span class="info-value">1 件</span>
                </div>
                <div class="order-info-item">
                  <span class="info-label">商品单价：</span>
                  <span class="info-value">¥{{ formatMoney(orderDetail?.price) }}</span>
                </div>
                <div class="order-info-item total">
                  <span class="info-label">支付金额：</span>
                  <span class="info-value total-price"
                    >¥{{ formatMoney(orderDetail?.payAmount) }}</span
                  >
                </div>
              </div>
              <div class="delivery-info-title">收货信息</div>
              <div class="delivery-info-list">
                <div class="delivery-info-item">
                  <span class="info-label">收货人：</span>
                  <span class="info-value">{{ orderDetail?.receiverName }}</span>
                </div>
                <div class="delivery-info-item">
                  <span class="info-label">手机号码：</span>
                  <span class="info-value">{{ orderDetail?.receiverPhone }}</span>
                </div>
                <div class="delivery-info-item">
                  <span class="info-label">收货地址：</span>
                  <span class="info-value address-text"
                    >{{ orderDetail?.address }} {{ orderDetail?.remark || '' }}</span
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
        <p class="success-desc">正在刷新订单状态...</p>
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
          <div class="refund-product-card">
            <img
              :src="orderDetail?.productUrl"
              :alt="orderDetail?.productName"
              class="product-img"
            />
            <div class="product-info">
              <div class="product-name">{{ orderDetail?.productName }}</div>
              <div class="product-spec">规格：{{ orderDetail?.specData || '标准版' }}</div>
              <div class="product-price">
                <span class="price">¥{{ formatMoney(orderDetail?.price) }}</span>
                <span class="quantity">x1</span>
              </div>
            </div>
          </div>

          <!-- 退款金额 -->
          <div class="form-section">
            <div class="section-title">退款金额</div>
            <div class="amount-display-group">
              <span class="currency-symbol">¥</span>
              <span class="amount-display">{{ formatMoney(orderDetail?.payAmount) }}</span>
            </div>
            <div class="amount-hint">可退金额：¥{{ formatMoney(orderDetail?.payAmount) }}</div>
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
          <button class="close-btn" @click="closeCancelConfirm">×</button>
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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSuborderDetail } from '@/api/order'
import { payOrder } from '@/api/payment'
import { getOrCreateSession } from '@/api/message'
import { applyRefund } from '@/api/refund'

const router = useRouter()
const route = useRoute()
// 子订单ID
const suborderId = ref(route.params.suborderId || route.query.suborderId || '')
// 订单详情数据
const orderDetail = ref(null)
const loading = ref(true)
const errorMsg = ref('')
const searchKeyword = ref('')
const cartCount = ref(0)

// 支付相关状态
const paymentModalVisible = ref(false)
const qrModalVisible = ref(false)
const selectedPayment = ref('alipay')
const submitting = ref(false)
const refreshing = ref(false)
const qrCodeBase64 = ref('')
const expireSeconds = ref(120)
const currentOrderId = ref(null)
const paymentSuccessVisible = ref(false)
let expireTimer = null
let successTimer = null

const formatMoney = (val) => {
  if (val === undefined || val === null) return '0.00'
  return val.toFixed(2)
}

const formatPhone = (phone) => {
  if (!phone) return ''
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

const getPayTypeText = (payType) => {
  const map = { Alipay: '支付宝', Wechat: '微信支付', UnionPay: '银联支付', CreditCard: '信用卡' }
  return map[payType] || payType || '在线支付'
}

const getStatusText = (status) => {
  const map = {
    1: '待付款',
    2: '待发货',
    3: '已发货',
    4: '已完成',
    5: '退款中',
    6: '退款成功',
    0: '已关闭',
  }
  return map[status] || '未知状态'
}

const getStatusDesc = (status) => {
  const map = {
    1: '请尽快完成付款，逾期订单将自动关闭',
    2: '商家正在准备商品，请耐心等待',
    3: '商品正在配送中，请保持电话畅通',
    4: '感谢您的购买，欢迎再次光临',
    5: '商家正在处理退款申请，请耐心等待',
    6: '退款已原路返回，请注意查收',
    0: '订单已关闭，感谢您的支持',
  }
  return map[status] || '感谢您的支持'
}

const getBannerClass = (status) => {
  const map = {
    1: 'banner-pending',
    2: 'banner-pending',
    3: 'banner-shipping',
    4: 'banner-completed',
    5: 'banner-refund',
    6: 'banner-refund',
    0: 'banner-closed',
  }
  return map[status] || 'banner-default'
}

const getStatusIconClass = (status) => {
  const map = {
    1: 'icon-pending',
    2: 'icon-pending',
    3: 'icon-shipping',
    4: 'icon-completed',
    5: 'icon-refund',
    6: 'icon-refund',
    0: 'icon-closed',
  }
  return map[status] || ''
}

const copyOrderNo = (text) => {
  navigator.clipboard.writeText(text)
  showMessage('订单编号复制成功')
}
const copyPaymentId = (text) => {
  navigator.clipboard.writeText(text)
  showMessage('支付单号复制成功')
}
const copyLogisticId = (text) => {
  navigator.clipboard.writeText(text)
  showMessage('物流单号复制成功')
}
const copySuborderId = (text) => {
  navigator.clipboard.writeText(text)
  showMessage('子订单号复制成功')
}
const trackLogistics = () => showMessage('查看物流轨迹')
const contactSeller = () => showMessage('联系卖家')
const editAddress = () => showMessage('修改地址')
const cancelOrder = () => showMessage('取消订单')

const confirmReceipt = () => {
  showMessage('确认收货成功')
}

const viewRefundDetail = () => {
  showMessage('查看退款详情')
}

const searchProduct = () => {
  if (searchKeyword.value.trim()) {
    router.push(`/search?keyword=${searchKeyword.value}`)
  }
}

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

const handleImageError = (event) => {
  event.target.src = '/default-shop-logo.png'
}

const fetchOrderDetail = async () => {
  if (!suborderId.value) {
    errorMsg.value = '缺少订单参数'
    loading.value = false
    return
  }
  loading.value = true
  try {
    const res = await getSuborderDetail(suborderId.value)
    if (res.code === 200 && res.data) {
      orderDetail.value = res.data
      console.log('后端传来的数据:', orderDetail.value)
    } else {
      errorMsg.value = res.msg || '获取订单详情失败'
    }
  } catch (error) {
    errorMsg.value = '网络错误，无法获取订单信息'
  } finally {
    loading.value = false
  }
}

// ========== 支付相关函数 ==========

// 打开支付弹窗
const openPaymentDialog = () => {
  if (!orderDetail.value) {
    showMessage('订单信息不存在', true)
    return
  }
  selectedPayment.value = 'alipay'
  paymentModalVisible.value = true
}

// 关闭支付弹窗
const closePaymentModal = () => {
  paymentModalVisible.value = false
}

// 提交支付
const submitPayment = async () => {
  if (!orderDetail.value) {
    showMessage('订单信息不存在', true)
    return
  }

  submitting.value = true
  try {
    const payType = selectedPayment.value === 'alipay' ? 'Alipay' : 'Balance'
    const requestData = { orderId: orderDetail.value.orderId, payType }
    const res = await payOrder(requestData)

    if (res.code === 200 && res.data) {
      currentOrderId.value = orderDetail.value.orderId

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
        // 余额支付直接显示成功
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
  if (!currentOrderId.value) {
    showMessage('订单信息错误，请重新支付', true)
    closeQrModal()
    return
  }

  refreshing.value = true
  try {
    const payType = selectedPayment.value === 'alipay' ? 'Alipay' : 'Balance'
    const requestData = { orderId: currentOrderId.value, payType }
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
  currentOrderId.value = null
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
    // 刷新订单详情
    fetchOrderDetail()
    showMessage('支付成功！')
  }, 2000)
}

// 支付成功后的刷新（监听全局事件）
const handlePaymentNotification = (event) => {
  const notification = event.detail
  console.log('收到支付成功信号:', notification)
  const orderId = notification.orderId || notification

  if (currentOrderId.value && String(orderId) === String(currentOrderId.value)) {
    if (qrModalVisible.value) {
      closeQrModal()
    }
    showPaymentSuccess()
    currentOrderId.value = null
  }
}

const goToProductDetail = (spuId) => {
  router.push(`/product/detail/${spuId}`)
}
const goToShop = (shopId) => {
  router.push(`/shop/detail/${shopId}`)
}

const goToHome = () => router.push('/')
const goToOrders = () => router.push('/order/suborder/list')
const goToCart = () => router.push('/cart')
const goToProfile = () => {
  const userInfo = localStorage.getItem('mall-user_merchant-info')
  if (userInfo) {
    try {
      const info = JSON.parse(userInfo)
      router.push(`/user/detail/${info.userId}`)
    } catch {
      router.push('/profile')
    }
  } else {
    router.push('/login')
  }
}

/**
 * 联系客服
 */
const handleTalkToCustomer = async () => {
  if (!orderDetail.value) {
    showMessage('订单信息不存在', true)
    return
  }

  const data = {
    partnerId: orderDetail.value.shopId,
    partnerName: orderDetail.value.shopName,
    partnerAvatar: orderDetail.value.shopLogo,
    partnerType: 'MERCHANT',
  }

  console.log('[订单详情] 联系客服参数:', data)
  showMessage('正在联系客服...')

  try {
    const response = await getOrCreateSession(data)
    console.log('[订单详情] 获取会话信息响应:', response)

    if (response.code === 200 && response.data) {
      const event = new CustomEvent('open-userChatToMerchant-session', { detail: response.data })
      window.dispatchEvent(event)
      showMessage('正在打开聊天窗口...')
    } else {
      showMessage(response.msg || '获取会话信息失败', true)
    }
  } catch (error) {
    console.error('[订单详情] 联系客服异常:', error)
    showMessage('网络错误，请稍后重试', true)
  }
}

// ========== 退款相关状态 ==========
const refundModalVisible = ref(false)
const refundConfirmModalVisible = ref(false)
const refundSubmitting = ref(false)
const fileInput = ref(null)

const refundForm = ref({
  amount: 0,
  reason: '',
  description: '',
  evidence: [],
})

// 监听订单金额变化，自动设置退款金额
watch(
  () => orderDetail.value?.payAmount,
  (newAmount) => {
    if (newAmount) {
      refundForm.value.amount = newAmount
    }
  },
  { immediate: true },
)

// 打开退款弹窗
const openRefundModal = () => {
  // 重置表单
  refundForm.value = {
    amount: orderDetail.value?.payAmount || 0,
    reason: '',
    description: '',
    evidence: [],
  }
  refundModalVisible.value = true
}

// 关闭退款弹窗
const closeRefundModal = () => {
  refundModalVisible.value = false
}

// 关闭退款确认弹窗
const closeRefundConfirmModal = () => {
  refundConfirmModalVisible.value = false
  // 刷新订单详情
  fetchOrderDetail()
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

  // 清空input，以便再次选择相同文件
  event.target.value = ''
}

// 删除凭证图片
const removeEvidence = (index) => {
  refundForm.value.evidence.splice(index, 1)
}

// 提交退款申请
const submitRefund = async () => {
  // 验证
  if (!refundForm.value.reason) {
    showMessage('请选择退款原因', true)
    return
  }

  refundSubmitting.value = true

  console.log('准备提交退款申请...')
  console.log('订单ID:', orderDetail.value.orderId)
  console.log('子订单ID:', orderDetail.value.suborderId)
  console.log('退款原因:', refundForm.value.reason)

  try {
    // 使用真实API调用
    console.log('正在调用 applyRefund API...')
    const response = await applyRefund({
      orderId: orderDetail.value.orderId,
      suborderId: orderDetail.value.suborderId,
      refundReason: refundForm.value.reason,
    })
    console.log('API响应:', response)

    if (response.code === 200) {
      // 关闭退款弹窗
      closeRefundModal()
      // 显示成功确认弹窗
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

// 查看退款记录
const viewRefundRecord = () => {
  closeRefundConfirmModal()
  // 跳转到退款记录页面或打开退款详情
  router.push(`/order/refund/detail/${orderDetail.value?.suborderId}`)
  // 或者显示退款详情弹窗
  // viewRefundDetail()
}
// ========== 取消订单相关状态 ==========
const cancelConfirm = ref({
  visible: false,
})

// 打开取消订单确认弹窗
const openCancelConfirm = () => {
  cancelConfirm.value.visible = true
}

// 关闭取消订单确认弹窗
const closeCancelConfirm = () => {
  cancelConfirm.value.visible = false
}

// 确认取消订单
const confirmCancelOrder = async () => {
  try {
    // 模拟API调用 - 实际使用时替换为真实取消订单接口
    // const response = await cancelOrder({ suborderId: orderDetail.value.suborderId })
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 更新本地订单状态为已关闭 (0)
    if (orderDetail.value) {
      orderDetail.value.status = 0
    }

    showMessage('订单已取消')
    closeCancelConfirm()
  } catch (error) {
    console.error('取消订单失败:', error)
    showMessage('取消订单失败，请重试', true)
  }
}
onMounted(() => {
  fetchOrderDetail()
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.order-detail-page {
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

/* 导航栏 */
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
  font-size: 18px;
  font-weight: 700;
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
  width: 280px;
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

/* 加载状态 */
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

/* 状态横幅 */
.status-banner {
  padding: 32px 0;
  margin-bottom: 24px;
}

.banner-pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.banner-shipping {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.banner-completed {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.banner-refund {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.banner-default {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.status-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon svg {
  width: 32px;
  height: 32px;
  stroke: white;
}

.status-icon.icon-completed svg {
  stroke: #10b981;
}

.status-icon.icon-shipping svg {
  stroke: #3b82f6;
}

.banner-text h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #1e293b;
}

.banner-text p {
  font-size: 13px;
  color: #475569;
}

/* 右侧按钮区域 - 紧凑排列 */
.banner-right {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

/* 立即付款按钮 */
.btn-pay {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 10px 28px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.3);
  white-space: nowrap;
}

.btn-pay:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.4);
}

/* 确认收货按钮 */
.btn-confirm {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.3);
  white-space: nowrap;
}

.btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.4);
}

/* 申请退款按钮 */
.btn-refund-apply {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  white-space: nowrap;
}

.btn-refund-apply:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-refund-apply.refund-disabled,
.btn-refund-apply:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-refund-apply svg {
  stroke: white;
}

/* 取消订单按钮 */
.btn-cancel {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-cancel:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* 查看退款详情按钮 */
.btn-view-refund-detail {
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 10px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-view-refund-detail:hover {
  background: #ef4444;
  color: white;
}

/* 主容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 进度卡片 */
.progress-card {
  background: white;
  border-radius: 24px;
  padding: 28px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.progress-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-circle {
  width: 44px;
  height: 44px;
  background: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #94a3b8;
  transition: all 0.3s;
}

.step.active .step-circle {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.step.completed .step-circle {
  background: #10b981;
  color: white;
}

.step-info {
  display: flex;
  flex-direction: column;
}

.step-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.step-time {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 2px;
}

.step-line {
  flex: 1;
  height: 2px;
  background: #e2e8f0;
  margin: 0 8px;
}

.step-line.active {
  background: linear-gradient(90deg, #ff6700, #ff8533);
}

/* 通用卡片 */
.card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.card-header {
  padding: 18px 24px;
  background: #fafbfc;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.edit-link {
  font-size: 13px;
  color: #ff6700;
  cursor: pointer;
}

.refund-link {
  font-size: 13px;
  color: #ef4444;
  cursor: pointer;
  transition: color 0.2s;
}

.refund-link:hover {
  color: #dc2626;
  text-decoration: underline;
}

.card-body {
  padding: 20px 24px;
}

/* 双列布局 */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 信息行 */
.info-row {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px dashed #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  width: 90px;
  font-size: 14px;
  color: #94a3b8;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #1e293b;
}

.copy-link {
  margin-left: 12px;
  color: #ff6700;
  font-size: 12px;
  cursor: pointer;
}

/* 商品卡片 */
.product-card .card-header {
  justify-content: space-between;
}

.shop-info,
.to-custom {
  font-weight: 600;
  color: #1f8827;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
}

.shop-info:hover,
.to-custom:hover,
.product-image:hover,
.product-title:hover,
.product-sku:hover {
  color: #ff6700;
  cursor: pointer;
}

.product-image:hover {
  transition: transform 0.3s;
  transform: scale(1.1);
}

.product-list {
  padding: 0 24px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.product-item:last-child {
  border-bottom: none;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 2;
}

.product-title {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
}

.product-sku {
  font-size: 12px;
  color: #94a3b8;
}

.product-price {
  width: 100px;
  text-align: center;
  color: #475569;
  font-size: 14px;
}

.product-quantity {
  width: 60px;
  text-align: center;
  color: #64748b;
  font-size: 14px;
}

.product-total {
  width: 110px;
  text-align: right;
  font-weight: 700;
  color: #ff6700;
  font-size: 16px;
}

/* 费用卡片 */
.price-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: #64748b;
}

.price-row .discount-value {
  color: #10b981;
}

.price-row.total {
  border-top: 1px solid #f0f0f0;
  margin-top: 8px;
  padding-top: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
}

.price-row.total .total-amount {
  color: #ff6700;
  font-size: 22px;
  font-weight: 800;
}

/* 错误状态 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.error-icon svg {
  color: #cbd5e1;
}

.error-container p {
  font-size: 16px;
  color: #64748b;
}

.btn-primary {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  border: none;
  padding: 10px 28px;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
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

/* 店铺信息卡片样式 */
.shop-header-card {
  background: white;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 0;
  margin-bottom: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.shop-info-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 20px;
  background: linear-gradient(135deg, #fff9f5 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 20px;
}

.shop-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #ff6700;
  padding: 2px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.shop-avatar:hover {
  transform: scale(1.05);
}

.shop-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #f0f0f0;
}

.shop-details {
  flex: 1;
}

.shop-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  transition: color 0.2s;
  margin-bottom: 8px;
}

.shop-name:hover {
  color: #ff6700;
}

.shop-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #64748b;
}

.shop-rating,
.shop-sales {
  display: flex;
  align-items: center;
  gap: 4px;
}

.shop-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.btn-contact-shop,
.btn-view-shop {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-contact-shop {
  background: linear-gradient(135deg, #ff6700, #ff8533);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 103, 0, 0.2);
}

.btn-contact-shop:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.3);
}

.btn-view-shop {
  background: white;
  color: #ff6700;
  border: 1px solid #ff6700;
}

.btn-view-shop:hover {
  background: #fff5ed;
  transform: translateY(-2px);
}

/* ========== 支付弹窗相关样式 ========== */
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-icon {
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

.btn-confirm-modal {
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

.btn-confirm-modal:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 103, 0, 0.35);
}

.btn-confirm-modal:disabled {
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

/* ========== 退款弹窗样式 ========== */
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #ffffff;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
}

.close-btn {
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

.close-btn:hover {
  background: #ff6700;
  color: white;
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
} /* 退款金额显示区域 - 不可编辑 */
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

.reason-select-optimized option[disabled] {
  color: #cbd5e1;
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

/* 响应式 */
@media (max-width: 640px) {
  .refund-modal-optimized {
    width: 95%;
  }

  .refund-product-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .refund-product-card .product-price {
    justify-content: center;
  }

  .upload-area-optimized {
    gap: 10px;
  }

  .upload-item,
  .upload-btn-optimized {
    width: 70px;
    height: 70px;
  }

  .modal-footer-optimized {
    flex-direction: column-reverse;
  }

  .btn-cancel-optimized,
  .btn-submit-optimized {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}

/* 退款成功确认弹窗 */
.refund-confirm-modal {
  width: 420px;
  max-width: 90%;
  text-align: center;
}

.refund-confirm-body {
  padding: 32px 24px;
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon svg {
  width: 36px;
  height: 36px;
  stroke: white;
}

.confirm-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.confirm-desc {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 24px;
}

.refund-info-box {
  background: #f8f9fc;
  border-radius: 16px;
  padding: 16px;
  text-align: left;
  margin-bottom: 24px;
}

.refund-info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.refund-info-item:first-child {
  border-bottom: 1px solid #e2e8f0;
}

.refund-info-item strong {
  color: #ff6700;
}

.btn-view-refund {
  width: 100%;
  background: transparent;
  border: 1px solid #ff6700;
  color: #ff6700;
  padding: 12px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view-refund:hover {
  background: #fff7ed;
  transform: translateY(-1px);
}

/* 响应式 */
@media (max-width: 900px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .progress-steps {
    flex-direction: column;
    gap: 16px;
  }

  .step-line {
    width: 2px;
    height: 20px;
    margin: 4px 0;
  }

  .step {
    width: 100%;
  }

  .product-item {
    flex-wrap: wrap;
  }

  .product-price,
  .product-quantity,
  .product-total {
    margin-left: 100px;
  }

  .banner-content {
    flex-direction: column;
    text-align: center;
  }

  .banner-left {
    flex-direction: column;
  }

  .banner-right {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .nav-search {
    display: none;
  }

  .nav-links {
    gap: 16px;
  }

  .nav-item {
    font-size: 13px;
  }

  .toast {
    white-space: normal;
    text-align: center;
    max-width: 90%;
  }

  .shop-info-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .shop-avatar {
    width: 56px;
    height: 56px;
  }

  .shop-name {
    font-size: 16px;
  }

  .shop-meta {
    justify-content: center;
  }

  .shop-actions {
    width: 100%;
    justify-content: center;
  }

  .btn-contact-shop,
  .btn-view-shop {
    flex: 1;
    justify-content: center;
  }

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

@media (max-width: 640px) {
  .refund-modal-new {
    width: 95%;
  }

  .upload-area {
    gap: 8px;
  }

  .evidence-img,
  .upload-btn {
    width: 70px;
    height: 70px;
  }

  .refund-product-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .refund-product-section .product-price {
    justify-content: center;
  }

  .btn-confirm,
  .btn-refund-apply,
  .btn-cancel,
  .btn-pay,
  .btn-view-refund-detail {
    padding: 8px 20px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .shop-info-wrapper {
    padding: 16px;
  }

  .btn-contact-shop,
  .btn-view-shop {
    padding: 6px 16px;
    font-size: 13px;
  }
}
/* 取消订单按钮（用于详情页） */
.btn-cancel-order {
  background: transparent;
  border: 1px solid #ef4444;
  padding: 10px 24px;
  border-radius: 40px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-cancel-order:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* 取消订单弹窗样式 */
.cancel-modal {
  width: 420px;
  max-width: 90%;
}

.cancel-modal .modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cancel-modal .close-btn {
  margin-left: auto;
}

.warning-icon {
  background: #fee2e2;
  color: #ef4444;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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

.modal-btn-cancel:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.modal-btn-confirm-cancel,
.modal-btn-confirm-refund {
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
</style>
