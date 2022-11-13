import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CustomerView from '../views/CustomerView.vue'
import TransactionView from '../views/TransactionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/',
      name: 'transaction',
      component: TransactionView
    }
  ]
})

export default router