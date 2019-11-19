import Vue from "vue/dist/vue.js";
import Vuex from 'vuex';
import editableTabs from './editableTabs';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    editableTabs
  }
});
export default store;