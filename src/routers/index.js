import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import CartPage from '@/pages/CartPage.vue'
import PersonalPage from '@/pages/PersonalPage.vue'
import PersonalProfile from '@/pages/Personal/PersonalProfile.vue'
import PersonalFavorites from '@/pages/Personal/PersonalFavorite.vue'
import PersonalOrders from '@/pages/Personal/PersonalOrders.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: CatalogPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/personal',
    name: 'PersonalPage',
    component: PersonalPage,
    // meta: { requiresAuth: true }, // Требуется авторизация
    children: [
      {
        path: 'profile',
        name: 'PersonalProfile',
        component: PersonalProfile,
      },
      {
        path: 'favorites',
        name: 'PersonalFavorites',
        component: PersonalFavorites,
      },
      {
        path: 'orders',
        name: 'PersonalOrders',
        component: PersonalOrders,
      },
      {
        path: '', // /personal (дефолтный маршрут)
        name: "PersonalDefault",
        redirect: { name: 'PersonalProfile' }, // Перенаправляем на профиль
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
