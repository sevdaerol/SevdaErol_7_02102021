import { createRouter, createWebHistory } from 'vue-router' //importer createRouter + createWebHistory pour la version 3 de Vue
//importer les components
import loginSignup from '../components/loginSignup'
import home from '../components/home'
import construction from '../components/construction'
import profilePage from '../components/profilePage'
import newMessage from '../components/newMessage'
import modifyMessage from '../components/modifyMessage'

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
  {
    path: '/construction',
    name: 'construction',
    component: construction
  },
  {
    path: '/user',
    name: 'profilePage',
    component: profilePage
  },
  {
    path: '/new',
    name: 'newMessage',
    component: newMessage
  },
  {
    path: '/message/:id',
    name: 'modifyMessage',
    component: modifyMessage
  },

]

const router = new createRouter({
  history: createWebHistory(),
  routes,
})

export default router