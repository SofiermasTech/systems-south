// import './assets/main.css'
import router from "@/routers/index.js";

import { createApp } from 'vue'
import App from '@/App.vue'

import "@/assets/styles/style.scss";

const app = createApp(App);
app.use(router).mount("#app");
