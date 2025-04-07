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
    meta: { breadcrumb: 'Главная' },
  },
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: CatalogPage,
    meta: { breadcrumb: "Каталог" },
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
    meta: { breadcrumb: "Корзина" },
  },
  {
    path: '/personal',
    name: 'PersonalPage',
    component: PersonalPage,
    meta: { breadcrumb: 'Личный кабинет' },
    children: [
      {
        path: 'profile',
        name: 'PersonalProfile',
        component: PersonalProfile,
        meta: { breadcrumb: 'Настройки профиля' },
      },
      {
        path: 'favorites',
        name: 'PersonalFavorites',
        component: PersonalFavorites,
        meta: { breadcrumb: 'Избранное' },
      },
      {
        path: 'orders',
        name: 'PersonalOrders',
        component: PersonalOrders,
        meta: { breadcrumb: 'История заказов' },
      },
      {
        path: '', // /personal (дефолтный маршрут)
        name: 'PersonalDefault',
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
