import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import ClientsView from '@/views/ClientsView.vue'
import ConsultantsView from '@/views/ConsultantsView.vue'
import PartnerView from '@/views/PartnerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/partner/:partner',
      name: 'partner',
      component: PartnerView,
      beforeEnter: (to, _from, next) => {
        // Validate partner parameter
        const validPartners = ['globe', 'rcbc', 'sme', 'tai']
        const partner = (to.params.partner as string).toLowerCase()
        
        if (validPartners.includes(partner)) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'clients',
          name: 'clients',
          component: ClientsView
        },
        {
          path: 'consultants',
          name: 'consultants',
          component: ConsultantsView
        }
      ]
    }
  ]
})

// Navigation guard
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('auth_token')
  const isAuthenticated = !!token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
