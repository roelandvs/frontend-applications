import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
// import Calculator from "../views/Calculator.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/calculator",
  //   name: "Calculator",
  //   component: Calculator
  // },
  {
    path: "/",
    name: "Fetching",
    component: () =>
      import("../views/Fetching.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
