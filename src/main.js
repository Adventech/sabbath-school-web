import axios from 'axios'
import mitt from 'mitt'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '@/App.vue'
import router from '@/router'
import DayJS from 'dayjs'
import Bible from '@/plugins/Bible/'
import Block from '@/components/Resources/Blocks/Block.vue';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ContextMenu from '@/plugins/ContextMenu/'
import Highlighter from '@/plugins/Highlighter/'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authStore } from '@/stores/auth'
import { VueHeadMixin, createHead } from '@unhead/vue'

DayJS.extend(customParseFormat)

import './style.css'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
})

// TODO: deprecate after dev version
const axiosInstanceResources = axios.create({
    baseURL: import.meta.env.VITE_APP_API_RESOURCES_HOST
})

const axiosInstanceAuth = axios.create({
    baseURL: import.meta.env.VITE_APP_API_HOST
})

const axiosInstanceAuthResources = axios.create({
    baseURL: import.meta.env.VITE_APP_API_RESOURCES_HOST
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
            error.config.headers['x-ss-auth-access-token'] = authStore().stsTokenManager.accessToken
            return axios.request(error.config)
        } catch (e) {
            console.log('auth error aborting')
        }
    }
    return Promise.reject(error);
});

axiosInstanceAuthResources.interceptors.request.use(function (config) {
    config.headers['x-ss-auth-access-token'] = authStore().stsTokenManager.accessToken
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstanceAuthResources.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    if (error.response.status === 401) {
        try {
            let r = await axiosInstance.post('/auth/refresh', authStore().userObject)
            authStore().setAccount(r.data)
            error.config.headers['x-ss-auth-access-token'] = authStore().stsTokenManager.accessToken
            return axios.request(error.config)
        } catch (e) {
            console.log('auth error aborting')
        }
    }
    return Promise.reject(error);
});

const app = createApp(App)
const pinia = createPinia()
const emitter = mitt()
const head = createHead()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mixin(VueHeadMixin)
app.use(head)
app.use(Highlighter)
app.use(ContextMenu)
app.use(Bible)

app.config.globalProperties.$api = { ...axiosInstance }
app.config.globalProperties.$apiResources = { ...axiosInstanceResources }
app.config.globalProperties.$apiAuth = { ...axiosInstanceAuth }
app.config.globalProperties.$apiAuthResources = { ...axiosInstanceAuthResources }
app.config.globalProperties.emitter = emitter

app.component('Block', Block);

app.mount('#app')
