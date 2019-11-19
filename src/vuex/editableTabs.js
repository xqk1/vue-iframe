const editableTabs = {
  namespaced: true,
  state: {
    editableTabsValue: "2",
    editableTabs: [
      //默认首页，首页不可关闭
      {
        title: "首页",
        name: "1",
        path: "/home-page?title=首页&chain=1"
      }
    ],
    tabIndex: 1
  },
  mutations: {
    changeEditableTabsValue(state, val) {
      state.editableTabsValue = val;
    },
    addEditableTabs(state, tab) {
      state.editableTabs.push(tab);
    },
    removeEditableTabs(state, val) {
      state.editableTabs = state.editableTabs.filter(tab => tab.name !== val);
    },
    changeTabIndex(state, val) {
      state.tabIndex = val;
    },
  },
};

export default editableTabs;
