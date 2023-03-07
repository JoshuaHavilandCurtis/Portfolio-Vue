import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* global components */
import Container from "./components/Container.vue";

import './assets/main.css'

const app = createApp(App)

/* global components */
app.component("Container", Container);

app.use(createPinia())
app.use(router)

app.mount('#app')
