<template>
  <div>
    <!-- Vue的router-view -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- iframe页 -->
    <component
      v-for="(item,index) in componentsArr"
      :key="index"
      :is="myCom"
      v-show="$route.fullPath === item.path"
    ></component>
  </div>
</template>

<script>
import iframeWrapper from "./iframe-wrapper";
export default {
  name: "iframe-router-view",
  props: ["componentsArr"],
  data() {
    return {
      myCom: "iframe-wrapper"
    };
  },
  components: {
    iframeWrapper
  },
  created() {},
  watch: {},
  computed: {},
  methods: {}
};
</script>