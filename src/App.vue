<template>
  <div id="app">
    <el-row>
      <nav-tab
        :editableTabs="editableTabs"
        :editableTabsValue="editableTabsValue"
        @remove-tab="removeTab"
        @change-tab="changeTab"
      ></nav-tab>
    </el-row>
    <el-row class="tac">
      <el-col :span="4">
        <nav-tree></nav-tree>
      </el-col>
      <el-col :span="19" :offset="1">
        <iframe-router-view :componentsArr="componentsArr"></iframe-router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import iframeRouterView from "./components/iframe-router-view";
import navTree from "./components/nav-tree";
import navTab from "./components/nav-tab";
export default {
  name: "app",
  components: {
    iframeRouterView,
    navTree,
    navTab
  },
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        //默认首页，首页不可关闭
        {
          title: "首页",
          name: "1",
          path: "/home-page?title=首页&chain=1"
        }
      ],
      tabIndex: 1,
      data :[]
    };
  },
  created() {
    //如果当前为首页
    if (this.$route.path === "/") {
      this.$router.push("/home-page?title=首页&chain=1");
    }
    //初次加载，挂载
    this.mountRoute(this.$route);
    //路由切换，动态挂载component
    this.$router.beforeEach((to, from, next) => {
      this.mountRoute(to);
      next();
    });
    //暴露接口
    window.frameWrapper = {
      open: this.openRoute.bind(this)
    };
  },
  computed: {
    componentsArr() {
      return this.editableTabs.filter(item => {
        return item.chain === "2";
      });
    }
  },
  methods: {
    /**
     * 增加tab
     * @method addTab
     * @param {string} path 全路径
     * @param {string} title tab名称
     * @param {string} chain 外链 1为内链 2为外链
     */

    addTab(path, title, chain) {
      //通过tab名称判断是否重复
      let flag = this.editableTabs.find(item => {
        return item.title === title;
      });
      let newTabName = "";
      //如果存在该tab
      if (!flag) {
        newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title,
          name: newTabName,
          path,
          chain
        });
      } else {
        newTabName = flag.name;
      }

      this.editableTabsValue = newTabName;
    },
    /**
     * 删除tab
     * @method removeTab
     * @param {string} name tab的id
     */
    removeTab(name) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      let path = "";

      if (activeName === name) {
        tabs.forEach((tab, index) => {
          if (tab.name === name) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              path = nextTab.path;
            }
          }
        });
        this.$router.push({ path });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== name);
    },
    /**
     * 切换tab
     * @method changeTab
     * @param {string} name tab的id
     */
    changeTab(name) {
      //如果点击active，不切换
      if (name === this.editableTabsValue) {
        return false;
      }
      //通过id切换tab
      let flag = this.editableTabs.find(item => {
        return item.name === name;
      });
      let { path } = flag;
      this.editableTabsValue = name;
      this.$router.push({ path });
    },
    /**
     * @method mountRoute
     * @param {object} oRoute route实例
     */
    mountRoute(oRoute) {
      let { fullPath, query } = oRoute;
      let { title, chain } = query;
      this.addTab(fullPath, title, chain);
    },
    /**
     * @method openRoute
     * @param {string} path 全路径
     */
    openRoute(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
</style>