import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from "../components/Dashboard.vue"
import Login from "../components/auth/Login.vue"
import ChangePassword from "../components/auth/ChangePassword.vue"
import User from "../components/users/User.vue"
import Users from "../components/users/Users.vue"

import { useUserStore } from "../stores/user.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
    },
    {
      path: '/users/:id',
      name: 'User',
      component: User,
      //props: true
      // Replaced with the following line to ensure that id is a number
      props: route => ({ id: parseInt(route.params.id) })
    },
  ]
})
let handlingFirstRoute = true
router.beforeEach( async (to, from, next) => {
  const userStore = useUserStore()
  if (handlingFirstRoute) {
    handlingFirstRoute = false
    await userStore.restoreToken()
    }
  if ((to.name == 'Login') || (to.name == 'home')) {
    next()
    return
  }
  if (!userStore.user) {
    next({ name: 'Login' })
    return
  }
  next()
})

export default router