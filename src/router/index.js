import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Calculator from "../views/Calculator.vue";
import Fetching from "../views/Fetching.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: Calculator
  },
  {
    path: "/fetching",
    name: "Fetching",
    component: Fetching
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
