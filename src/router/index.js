//import Vue from 'vue'
//import VueRouter from 'vue-router'

//Vue.use(VueRouter)
import { createRouter, createWebHistory } from 'vue-router'

import loginSignup from '../components/loginSignup' //importer le components loginSignup



const routes = [

  {
    path: '/',
    name: 'login',
    component: loginSignup
  },

]

const router = new createRouter({
  history: createWebHistory(),
  routes,
})

export default router
