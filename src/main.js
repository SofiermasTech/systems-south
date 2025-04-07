// import './assets/main.css'
import router from "@/routers/index.js";
import { createPinia } from "pinia";
import { createApp } from 'vue'
import App from '@/App.vue'
import components from "@/components/common";
import { useFavoritesStore } from "@/stores/favorites.js";

import "@/assets/styles/style.scss";

const app = createApp(App);
const pinia = createPinia(); // Создаём экземпляр Pinia
app.use(pinia);
app.use(router)

components.forEach((component) => {
  app.component(component.name, component);
});

const favoritesStore = useFavoritesStore();
favoritesStore.loadFavorites();

app.mount("#app");
