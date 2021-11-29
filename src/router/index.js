import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard/:user',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from)=> {
      let user = to.params.user
      console.log(user)
      return true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
