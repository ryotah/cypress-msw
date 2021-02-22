import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Foo from "../views/Foo.vue";
import Bar from "../views/Bar.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/foo",
    name: "Foo",
    component: Foo
  },
  {
    path: "/bar",
    name: "Bar",
    component: Bar
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
