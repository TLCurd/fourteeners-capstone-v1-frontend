import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css'

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

createApp(App).use(router).mount('#app')

// createElement('img', {
//   attrs: {
//     src: require('@/assets/images/Rocky-Mountains.jpg') // this is now a module request
//   }
// })
