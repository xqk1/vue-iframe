import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
import store from "../vuex/index";
import F1 from "../components/f1";
import F2 from "../components/f2";

Vue.use(VueRouter);

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
  mode: "history"
});

/**
 * 增加tab
 * @method addTab
 * @param {string} path 全路径
 * @param {string} title tab名称
 * @param {string} chain 外链 1为内链 2为外链
 */

const addTab = (path, title, chain) => {
  let editableTabs= store.state.editableTabs.editableTabs;
  let tabIndex= store.state.editableTabs.tabIndex;
  //通过tab名称判断是否重复
  let flag = editableTabs.find(item => {
    return item.title === title;
  });
  let newTabName = "";
  //如果存在该tab
  if (!flag) {
    ++tabIndex;
    newTabName = tabIndex + "";
    store.commit('editableTabs/addEditableTabs',{
      title,
      name: newTabName,
      path,
      chain
    });
    store.commit('editableTabs/changeTabIndex',tabIndex);
  } else {
    newTabName = flag.name;
  }
  store.commit('editableTabs/changeEditableTabsValue',newTabName);
};

router.beforeEach((to, from, next) => {
  let { fullPath, query ,path} = to;
  let { title, chain } = query;
  if(path !== "/"){
    addTab(fullPath, title, chain);
  }
  next();
});

export default router;
