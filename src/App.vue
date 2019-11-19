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
import { mapMutations, mapState } from "vuex";
export default {
  name: "app",
  components: {
    iframeRouterView,
    navTree,
    navTab
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    //如果当前为首页
    if (this.$route.path === "/") {
      this.$router.push("/home-page?title=首页&chain=1");
    }
    //暴露接口
    window.frameWrapper = {
      open: this.openRoute.bind(this)
    };
  },
  computed: {
    ...mapState('editableTabs',["editableTabsValue", "editableTabs"]),
    componentsArr() {
      return this.editableTabs.filter(item => {
        return item.chain === "2";
      });
    }
  },
  methods: {
    ...mapMutations('editableTabs',["changeEditableTabsValue", "removeEditableTabs"]),
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
      this.changeEditableTabsValue(activeName);
      this.removeEditableTabs(name);
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
      this.changeEditableTabsValue(name);
      this.$router.push({ path });
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
body {
  padding: 0;
  margin: 0;
}
</style>