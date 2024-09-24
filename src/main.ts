import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { InitLocalStorageForPinia } from '@/stores/initLocalStorage'
import App from './App.vue'
import '@flaticon/flaticon-uicons/css/all/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
InitLocalStorageForPinia()

app.mount('#app')
