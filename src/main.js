import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import DayJS from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

DayJS.extend(customParseFormat)

import './style.css'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)


app.use(pinia)
app.use(router)

app.config.globalProperties.$api = { ...axiosInstance }

app.mount('#app')
