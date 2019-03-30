<template>
  <div id="checkIdentity">
    <div class="container">
      <div class="e_card">正在检查身份信息... ...</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    checkIdentity() {
      let identity = this.$store.state.identity;
      if (identity == "user" || identity == "vip") {
        this.$router.push("/user");
      } else if (identity == "admin" || identity == "staff") {
        this.$router.push("/admin");
      }
    }
  },
  mounted() {
    this.checkIdentity();
  }
};
</script>

<style lang='scss' scoped>
.e_card {
  color: white;
  background-color: #f56c6c;
  margin-top: 20px;
}
</style>