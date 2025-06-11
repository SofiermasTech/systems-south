// import './assets/main.css'
import router from '@/shared/routers/index.js'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/app/App.vue'
import components from '@/shared/ui'
import { useCatalogStore } from '@/shared/stores/catalog.js';
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import { useCartStore } from '@/shared/stores/cart.js'

import '@/assets/styles/style.scss'
// import '@/assets/images/icons/svg-sprite.svg';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

components.forEach((component) => {
  app.component(component.name, component)
})

const catalogStore = useCatalogStore();
catalogStore.loadProducts();

const favoritesStore = useFavoritesStore()
favoritesStore.fetchFavorites()

const cartStore = useCartStore();
cartStore.loadCart();

// Запускаем MSW только в режиме разработки или при параметре ?test=true
if (import.meta.env.MODE === 'development' || window.location.search.includes('test=true')) {
  import('@/mocks/browser').then(({ worker }) => {
    worker.start();
  });
}
app.mount('#app')
