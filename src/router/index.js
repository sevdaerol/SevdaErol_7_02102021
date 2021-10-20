//import Vue from 'vue'
//import VueRouter from 'vue-router'

//Vue.use(VueRouter)
import { createRouter, createWebHistory } from 'vue-router'

import loginForm from '../components/loginForm' //importer le components loginform



const routes = [

  {
    path: '/',
    name: 'login',
    component: loginForm
  },

]

const router = new createRouter({
  history: createWebHistory(),
  routes,
})

export default router
