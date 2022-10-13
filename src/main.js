import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import '@picocss/pico'
import particles from 'vue3-particles'
import './style.scss'
import App from './App.vue'
import routes from './routes.js'

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})
const app = createApp(App)

app.use(router)
app.use(particles)
app.mount('#app')
