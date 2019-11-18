<template>
  <div>
    <el-tabs
      :value="editableTabsValue"
      @tab-click="changeTab"
      @tab-remove="removeTab"
      class="tabbar"
    >
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.title != '首页'"
      >
        <slot></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: ["editableTabs", "editableTabsValue"],
  methods: {
    removeTab(targetName) {
      this.$emit("remove-tab", targetName);
    },
    changeTab(component) {
      this.$emit("change-tab", component.name);
    }
  }
};
</script> 

<style>
.tabbar{
  padding: 0 10px;
}
.tabbar .el-tabs__nav-wrap::after{
  background-color: #fff;
}
.tabbar .el-tabs__item{
  font-size: 12px;
}
</style>