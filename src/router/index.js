import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'
import Folder from '../views/Folder.vue'

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
    path: '/dashboard',
    name: 'Dashboard2',
    component: Home
  },
  {
    path: '/dashboard/:user',
    name: 'Dashboard',
    props: true,
    component: Dashboard,
    // beforeEnter: (to, from)=> {
    //   let user = to.params.user
    //   console.log(user)
    //   return true
    // },
    children: [
      {
        path: ':folder',
        name: 'Folder',
        component: Folder
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
