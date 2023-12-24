import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue from 'vue'
import { createPinia } from 'pinia'
import Cookies from 'vue-cookies'


const app = createApp(App)

const pinia = createPinia()

app.use(Cookies, {expires: '1d'})
app.use(pinia)
app.use(router)

app.mount('#app')
