//import Vue from 'vue'
//import VueRouter from 'vue-router'

//Vue.use(VueRouter)
import { createRouter, createWebHistory } from 'vue-router'

import loginSignup from '../components/loginSignup' //importer le components loginSignup
import home from '../components/home'

const routes = [

  {
    path: '/',
    name: 'login',
    component: loginSignup
  },
  {
    path: '/login',
    name: 'loginredir',
    component: loginSignup
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },

]

const router = new createRouter({
  history: createWebHistory(),
  routes,
})

export default router
