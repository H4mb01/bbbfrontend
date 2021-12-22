import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Beobachtungsboegen from "../views/Beobachtungsboegen.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Bearbeiten from "../views/Bearbeiten.vue"
import Neu from "../views/Neu.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/beobachtungsboegen",
    name: "Beobachtungsbögen",
    component: Beobachtungsboegen
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/neu",
    name: "Neu",
    component: Neu
  },
  {
    path: "/beobachtungsboegen/:kindID",
    name: "Bearbeiten",
    component: Bearbeiten
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
