import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Share from "@/views/Share.vue";
import { auth } from "@/firebase/config";
import Browse from "@/views/Browse.vue";

const authControl = (to, from, next) => {
  let user = auth.currentUser;

  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/share",
      name: "Share",
      component: Share,
      beforeEnter: authControl,
    },
    {
      path: "/browse/:id",
      name: "Browse",
      component: Browse,
    },
  ],
});

export default router;
