import { createRouter, createWebHistory } from 'vue-router'
import { useNewsStore } from '@/shared/stores/news.js'
import { usePromoStore } from '@/shared/stores/promo.js'
// import { useCatalogStore } from '@/shared/stores/catalog.js'
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
import SearchPage from '@/pages/search/SearchPage.vue'
import ContactsPage from '@/pages/contacts/ContactsPage.vue'
import NewsPage from '@/pages/news/NewsPage.vue'
import NewsItemPage from '@/pages/news/NewsItemPage.vue'
import PromoPage from '@/pages/promo/PromoPage.vue'
import PromoItemPage from '@/pages/promo/PromoItemPage.vue'

const categoryNames = {
  'interior-lighting': 'Домашнее освещение',
  'light-bulbs': 'Лампочки',
  chandelier: 'Люстры',
  category1: 'Категория 1',
  category2: 'Категория 2',
  category3: 'Категория 3',
}

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
    props: true,
    meta: { breadcrumb: 'Каталог' },
  },
  {
    path: '/catalog/:category',
    name: 'CatalogCategory',
    component: CatalogPage,
    props: true,
    meta: {
      breadcrumb: (route) => {
        return categoryNames[route.params.category] || route.params.category || 'Категория'
      },
      parentRoute: {
        path: '/catalog',
        name: 'CatalogPage',
        breadcrumb: 'Каталог',
        parentRoute: {
          path: '/',
          name: 'HomePage',
          breadcrumb: 'Главная',
        },
      },
    },
  },
  {
    path: '/catalog/:category/:subcategory',
    name: 'CatalogSubcategory',
    component: CatalogPage,
    props: true,
    meta: {
      breadcrumb: (route) => {
        return categoryNames[route.params.subcategory] || route.params.subcategory || 'Подкатегория'
      },
      parentRoute: {
        path: '/catalog/:category',
        name: 'CatalogCategory',
        breadcrumb: (route) => {
          return categoryNames[route.params.category] || route.params.category || 'Категория'
        },
        parentRoute: {
          path: '/catalog',
          name: 'CatalogPage',
          breadcrumb: 'Каталог',
          parentRoute: {
            path: '/',
            name: 'HomePage',
            breadcrumb: 'Главная',
          },
        },
      },
    },
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    meta: { breadcrumb: 'Товар' },
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
    meta: { breadcrumb: 'Корзина' },
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
    meta: { breadcrumb: 'О нас' },
  },
  {
    path: '/faq',
    name: 'FaqPage',
    component: FaqPage,
    meta: { breadcrumb: 'Вопросы и ответы' },
  },
  {
    path: '/contacts',
    name: 'ContactsPage',
    component: ContactsPage,
    meta: { breadcrumb: 'Контакты' },
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    meta: { breadcrumb: 'Результат поиска' },
  },
  {
    path: '/news',
    name: 'NewsPage',
    component: NewsPage,
    meta: { breadcrumb: 'Новости' },
  },
  {
    path: '/news/:id',
    name: 'NewsItemPage',
    component: NewsItemPage,
    meta: {
      breadcrumb: (route) => {
        const newsStore = useNewsStore()
        const news = newsStore.getNewsById(route.params.id)
        return news ? news.title : 'Новость'
      },
      parentRoute: {
        path: '/news',
        name: 'NewsPage',
        breadcrumb: 'Новости',
      },
    },
  },
  {
    path: '/promo',
    name: 'PromoPage',
    component: PromoPage,
    meta: { breadcrumb: 'Акции' },
  },
  {
    path: '/promo/:id',
    name: 'PromoItemPage',
    component: PromoItemPage,
    meta: {
      breadcrumb: (route) => {
        const promoStore = usePromoStore()
        const promo = promoStore.getPromoById(route.params.id)
        return promo ? promo.title : 'Новость'
      },
      parentRoute: {
        path: '/promo',
        name: 'PromoPage',
        breadcrumb: 'Акции',
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохранённая позиция (например, при возврате назад), используем её
    if (savedPosition) {
      return savedPosition
    }
    // Иначе всегда прокручиваем в начало страницы
    return { top: 0 }
  },
})

export default router
