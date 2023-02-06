import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import DayJS from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { authStore } from '@/stores/auth'

DayJS.extend(customParseFormat)

import './style.css'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
})

const axiosInstanceAuth = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
})

axiosInstanceAuth.interceptors.request.use(function (config) {
    config.headers['x-ss-auth-access-token'] = authStore().stsTokenManager.accessToken
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstanceAuth.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if (error.response.status === 401) {
        try {
            let r = await axiosInstance.post('/auth/refresh', authStore().userObject)
            authStore().setAccount(r.data)
            return axios.request(error.config)
        } catch (e) {
            console.log('test')
        }
    }
    return Promise.reject(error);
});

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.config.globalProperties.$api = { ...axiosInstance }
app.config.globalProperties.$apiAuth = { ...axiosInstanceAuth }

app.mount('#app')
