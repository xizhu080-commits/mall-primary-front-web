import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
    },
    // 商品搜索页
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/product/search.vue'),
    },

    // 注册页
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/common/register.vue'),
    },

    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/common/login.vue'),
    },
    // 重置密码页
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('@/views/common/resetPassword.vue'),
    },

    // 商品详情页
    {
      path: '/product/detail/:spuId',
      name: 'productDetail',
      component: () => import('@/views/product/productDetail.vue'),
    },

    //个人中心页
    {
      path: '/user/detail/:userId',
      name: 'user',
      component: () => import('@/views/user/userInfo.vue'),
      // 需要登录才能访问
      meta: { requiresAuth: true },
    },
    // 更新用户信息页
    {
      path: '/user/update',
      name: 'updateUserInfo',
      component: () => import('@/views/user/updateUserInfo.vue'),
      // 需要登录才能访问
      meta: { requiresAuth: true },
    },

    // 商户中心页
    {
      path: '/merchant/detail/:merchantId',
      name: 'merchant',
      component: () => import('@/views/merchant/merchantInfo.vue'),
      meta: { requiresAuth: true },
    },

    // 搜索结果页
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/home/search.vue'),
    },

    // 我的订单页
    {
      path: '/order/suborder/list',
      name: 'myOrder',
      component: () => import('@/views/order/mySuborderList.vue'),
      meta: { requiresAuth: true },
    },

    // 订单详情页
    {
      path: '/order/suborder/detail/:suborderId',
      name: 'suborderDetail',
      component: () => import('@/views/order/suborderDetail.vue'),
      meta: { requiresAuth: true },
    },

    // 订单管理页
    {
      path: '/order/suborder/managerment',
      name: 'merchantSuborderManagerment',
      component: () => import('@/views/order/merchantSuborderManagerment.vue'),
      meta: { requiresAuth: true },
    },
    // 商品管理页
    {
      path: '/merchant/productManage',
      name: 'productManage',
      component: () => import('@/views/merchant/merchant-product-manage.vue'),
      meta: { requiresAuth: true },
    },

    // 优惠券管理页
    {
      path: '/coupon/manage',
      name: 'couponManage',
      component: () => import('@/views/coupon/couponManage.vue'),
      meta: { requiresAuth: true },
    },
    // 售后管理页
    {
      path: '/merchant/after-sale',
      name: 'afterSaleManage',
      component: () => import('@/views/merchant/after-sales-manage.vue'),
      meta: { requiresAuth: true },
    },
    // 店铺管理页
    {
      path: '/merchant/shopManage',
      name: 'shopManage',
      component: () => import('@/views/merchant/shopManage.vue'),
      meta: { requiresAuth: true },
    },

    //店铺详情页
    {
      path: '/shop/detail/:shopId',
      name: 'shopDetail',
      component: () => import('@/views/merchant/shopDetail.vue'),
      //  meta: { requiresAuth: true },
    },

    // 捕获所有未匹配的路由，重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// 路由守卫 - 增强版
router.beforeEach((to, from, next) => {
  // 判断目标页面是否需要登录
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const identityInfoStr = localStorage.getItem('mall-user_merchant-info')
    const identityInfo = JSON.parse(identityInfoStr)

    // 获取登录状态和用户信息
    const token = identityInfo.token
    const userRole = identityInfo.role

    if (!token) {
      // 未登录 → 跳转登录页，并携带原本想去的页面地址
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      // 检查角色权限
      const requiredRole = to.meta.role
      if (requiredRole && userRole !== requiredRole) {
        // 角色不匹配，根据角色跳转到对应的首页
        if (userRole === '0') {
          next('/user/detail/' + identityInfo.userId)
        } else if (userRole === '1') {
          next('/merchant/detail/' + identityInfo.merchantId)
        } else if (userRole === '2') {
          next('/admin/detail/' + identityInfo.adminId)
        } else {
          next('/')
        }
      } else {
        next() // 已登录且有权限，放行
      }
    }
  } else {
    next() // 不需要登录，直接放行
  }
})

export default router
