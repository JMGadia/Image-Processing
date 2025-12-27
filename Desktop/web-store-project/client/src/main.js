import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Explicit path to the router file
import './assets/main.css'

const app = createApp(App)

app.use(router) // This "plugs in" the GPS
app.mount('#app')