<template>
  <div>
    <!-- <div style="margin-bottom: 20px;">
      <el-button size="small" @click="addTab">add tab</el-button>
    </div> -->
    <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"> -->
    <el-tabs :value="editableTabsValue" @tab-click="changeTab" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
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
    addTab(targetName) {
      this.$emit("add-tab", this.editableTabsValue);
    },
    removeTab(targetName) {
      this.$emit("remove-tab", targetName);
    },
    changeTab(component){
      this.$emit('change-tab',component.name);
    }
  },
};
</script> 