import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/home/HomePage.vue'
import CatalogPage from '@/pages/catalog/CatalogPage.vue'
import ProductPage from '@/pages/product/ProductPage.vue'
import CartPage from '@/pages/cart/CartPage.vue'
import PersonalPage from '@/pages/personal/PersonalPage.vue'
import PersonalProfile from '@/pages/personal/PersonalProfile.vue'
import PersonalFavorites from '@/pages/personal/PersonalFavorite.vue'
import PersonalOrders from '@/pages/personal/PersonalOrders.vue'
import AboutUsPage from '@/pages/about-us/AboutUsPage.vue'
import FaqPage from '@/pages/faq/FaqPage.vue'

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
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    meta: { breadcrumb: "Товар" },
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
  {
    path: '/about-us',
    name: 'AboutUsPage',
    component: AboutUsPage,
    meta: { breadcrumb: "О нас" },
  },
  {
    path: '/faq',
    name: 'FaqPage',
    component: FaqPage,
    meta: { breadcrumb: "Вопросы и ответы" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохранённая позиция (например, при возврате назад), используем её
    if (savedPosition) {
      return savedPosition;
    }
    // Иначе всегда прокручиваем в начало страницы
    return { top: 0 };
  },
})

export default router
