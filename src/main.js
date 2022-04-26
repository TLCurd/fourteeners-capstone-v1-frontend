import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css'

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

createApp(App).use(router).mount('#app')
