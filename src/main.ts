import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import './types/common.d'



createApp(App).use(createPinia()).mount('#app')

