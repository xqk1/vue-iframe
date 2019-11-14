<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="4">
        <nav-tree></nav-tree>
      </el-col>
      <el-col :span="19" :offset="1">
        <!-- <nav-tab
          :editableTabs="editableTabs"
          :editableTabsValue="editableTabsValue"
          @add-tab="addTab"
          @remove-tab="removeTab"
        >-->
        <nav-tab
          :editableTabs="editableTabs"
          :editableTabsValue="editableTabsValue"
          @remove-tab="removeTab"
          @handle-editable-tabs-value="handleEditableTabsValue"
        ></nav-tab>

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
      editableTabs: [],
      tabIndex: 0,
      componentsArr: []
    };
  },
  created() {
    //初次加载，挂载
    this.mountRoute(this.$route);
    //路由切换，动态挂载component
    this.$router.beforeEach((to, from, next) => {
      this.mountRoute(to);
      next();
    });
  },
  methods: {
    addTab(path, title) {
      let flag = this.editableTabs.find(item => {
        return item.title === title;
      });
      let newTabName = "";
      if (!flag) {
        newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title,
          name: newTabName,
          path
        });
      } else {
        newTabName = flag.name;
      }

      this.editableTabsValue = newTabName;
    },
    removeTab(name) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      let lastActiveName = this.editableTabsValue;
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
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== name);
      this.componentsArr = this.componentsArr.filter(tab => tab.name !== name);

      lastActiveName === name &&
        this.editableTabs.length &&
        this.$router.push({ path });
    },
    handleEditableTabsValue(name) {
      let flag = this.editableTabs.find(item => {
        return item.name === name;
      });
      let { path } = flag;
      this.$router.push({ path });
      this.editableTabsValue = name;
    },
    mountRoute(oRouter) {
      let { fullPath, query } = oRouter;
      let { title } = query;
      this.isAddIframePage(fullPath, title);
      this.addTab(fullPath, title);
    },
    // 判断是否挂载到editableTabs
    isAddIframePage(path, title, name) {
      let component = this.$router.getMatchedComponents(path)[0];

      if (!component) {
        let isComponentRepeat = this.componentsArr.find(item => {
          return item.path == path;
        });
        if (!isComponentRepeat) {
          let newTabName = ++this.tabIndex + "";
          this.componentsArr.push({ path, title, name: newTabName });
        }
      }
    }
  }
};
</script>