import router from '@/shared/routers/index.js'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/app/App.vue'
import components from '@/shared/ui'
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import { useCartStore } from '@/shared/stores/cart.js'
import { useAuthStore } from '@/shared/stores/auth.js'

import '@/assets/styles/style.scss'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

components.forEach((component) => {
  app.component(component.name, component)
})

async function initializeApp() {
  try {
    console.log('Starting app initialization')
    console.log('Environment mode:', import.meta.env.MODE, 'VITE_MODE:', import.meta.env.VITE_MODE)
    let isMswEnabled =
      import.meta.env.MODE === 'development' || import.meta.env.VITE_MODE === 'production-poc'
    console.log('Is MSW enabled:', isMswEnabled)
    if (isMswEnabled) {
      try {
        console.log('Attempting to start MSW')
        const { worker } = await import('@/mocks/browser')
        console.log('MSW module loaded:', worker)
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        console.log('MSW started successfully')
      } catch (mswError) {
        console.error('Failed to start MSW:', mswError)
      }
    }

    // Инициализация авторизации
    const authStore = useAuthStore()
    console.log('Initializing auth store')
    authStore.initializeAuth()

    // Инициализация магазинов
    const catalogStore = useCatalogStore()
    console.log('Loading catalog')
    await catalogStore.loadProducts()

    const favoritesStore = useFavoritesStore()
    console.log('Fetching favorites')
    await favoritesStore.fetchFavorites()

    const cartStore = useCartStore()
    console.log('Loading cart')
    await cartStore.loadCart()

    // Монтируем приложение
    console.log('Mounting app')
    app.mount('#app')
  } catch (error) {
    console.error('Failed to initialize app:', error)
  }
}
initializeApp()
