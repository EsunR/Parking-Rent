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
      this.axios
        .get("/userInfo")
        .then(res => {
          if (res.data.code == 1) {
            let identity = res.data.data.identity;
            if (identity == "user" || identity == "vip") {
              this.$router.push("/user");
            } else if (identity == "admin" || identity == "staff") {
              this.$router.push("/admin");
            }
          } else {
            this.$message.error("登录状态异常，请重新登录");
            setTimeout(() => {
              window.location.href = this.COMMON.login_location;
            }, 1000);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，身份获取失败");
        });
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