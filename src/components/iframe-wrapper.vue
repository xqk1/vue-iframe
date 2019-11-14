<template>
  <div>
    <iframe width="500px" height="500px" :src="iframeUrl"></iframe>
  </div>
</template>

<script>
export default {
  name: "iframe-wrapper",
  data() {
    return {
      iframeUrl: ""
    };
  },
  mounted() {
    this.iframeUrl = this.$route.query.iframeUrl;
  }
};
</script>