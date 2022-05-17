import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import VueInputAutowidth from 'vue-input-autowidth'
Vue.use(VueInputAutowidth)
// import * as turf from '@turf/turf'


axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
 if (jwt) {
   axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
 }

createApp(App).use(router).mount('#app')

// createElement('img', {
//   attrs: {
//     src: require('@/assets/images/Rocky-Mountains.jpg') // this is now a module request
//   }
// })
