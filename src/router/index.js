import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeaksIndex from '../views/PeaksIndex.vue'
import PeaksShow from '../views/PeaksShow.vue'
import PeaksMap from '../views/PeaksMap.vue'
import PeaksMap2 from '../views/PeaksMap2.vue'
import RecAreasIndex from '../views/RecAreasIndex.vue'
import RecAreasShow from '../views/RecAreasShow.vue'
import RecAreasMap from '../views/RecAreasMap.vue'
import SignUp from '../views/SignUp.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import ActivitiesIndex from '../views/ActivitiesIndex.vue'
import ActivitiesShow from '../views/ActivitiesShow.vue'
import UsersShow from '../views/UsersShow.vue'

const routes = [
  {
    path: '/',
    name: 'home-view',
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
    path: '/peaks/map',
    name: '14ers-map',
    component: PeaksMap
  },
  {
    path: '/peaks/map2',
    name: '14ers-map-2',
    component: PeaksMap2
  },
  {
    path: '/rec_areas',
    name: 'rec-areas',
    component: RecAreasIndex
  },
  {
    path: '/rec_areas/:id',
    name: 'rec-areas-show',
    component: RecAreasShow
  },
  {
    path: '/rec_areas/map',
    name:'rec-areas-map',
    component: RecAreasMap
  },
  {
    path: '/activities',
    name: 'activities-index',
    component: ActivitiesIndex
  },
  {
    path: '/activities/:id',
    name: 'activities-show',
    component: ActivitiesShow
  },
  { 
    path: "/signup", 
    name: "signup", 
    component: SignUp 
  },
  {
    path: "/login", 
    name: "login", 
    component: LoginView
  },
  {
    path: "/logout", 
    name: "logout", 
    component: LogoutView
  },
  {
    path: "/users/profile", 
    name: "users-show", 
    component: UsersShow
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
