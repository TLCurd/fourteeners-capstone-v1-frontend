import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeaksIndex from '../views/PeaksIndex.vue'
import PeaksShow from '../views/PeaksShow.vue'
import MapView from '../views/MapView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/peaks',
    name: 'peaks-index',
    component: PeaksIndex
  },
  {
    path: '/peaks/:id',
    name: 'peaks-show',
    component: PeaksShow
  },
  {
    path: '/14ers-map',
    name: '14ers-map',
    component: MapView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
