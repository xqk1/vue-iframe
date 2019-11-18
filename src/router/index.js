import VueRouter from "vue-router";
import F1 from "../components/f1";
import F2 from "../components/f2";

const HomePage = { template: "<div>Index</div>" };
const routes = [
  {
    path: "/home-page",
    name: "homePage",
    component: HomePage
  },
  {
    path: "/f1",
    name: "f1",
    component: F1
  },
  {
    path: "/f2",
    name: "f2",
    component: F2
  },
  {
    path: "*"
  }
];

const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes,
  base: "/boss-web",
  mode:'history'
});
export default router;