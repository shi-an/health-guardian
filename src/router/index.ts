import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { requiresAuth: false } // 明确设置首页不需要认证
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/diet',
      name: 'Diet',
      component: () => import('@/views/DietPlan.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/workout',
      name: 'Workout',
      component: () => import('@/views/WorkoutAdvice.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mental',
      name: 'Mental',
      component: () => import('@/views/MentalSupport.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('@/views/TermsOfService.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('@/views/PrivacyPolicy.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('@/views/ContactUs.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 确保首页总是可以直接访问
  if (to.path === '/') {
    next()
    return
  }
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router