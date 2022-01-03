import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Home from "../views/Home.vue";
import Folder from "../views/Folder.vue";
import { checkUser } from "../components/helpers/checkUser.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      let x = checkUser();
      if (x)
        next({
          path: "/dashboard/AllTasks",
        });
      else next();
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (to, from, next) => {
      let x = checkUser();
      if (x)
        next({
          path: "/dashboard/AllTasks",
        });
      else next();
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/dashboard/:idFolder",
        name: "Folder",
        component: Folder,
        beforeEnter: (to, from, next) => {
          let x = checkUser();
          if (!x)
            next({
              path: "/",
            });
          else next();
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
