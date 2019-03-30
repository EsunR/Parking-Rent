<template>
  <div id="main">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios
      .get("/userInfo")
      .then(res => {
        if (res.data.code == 1) {
          let obj = res.data.data;
          if (obj.money == null) {
            obj.money = 0;
          }
          this.$store.commit("setState", obj);
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
};
</script>

<style lang="scss" scoped>
</style>


