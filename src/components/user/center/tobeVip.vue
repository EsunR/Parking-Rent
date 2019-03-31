<template>
  <div id="tobeVip">
    <div class="e_card" style="padding-bottom: 80px">
      <div class="title">成为会员</div>
      <hr>
      <div class="content">充值100元后，将获得会员资格，您可以参加会员活动。</div>
      <el-button
        style="margin-top: 20px; float: right"
        type="danger"
        @click="rechargeClick"
        v-if="$store.state.identity == 'user'"
      >充值会员</el-button>
      <el-button
        style="margin-top: 20px; float: right"
        type="success"
        v-if="$store.state.identity == 'vip'"
      >您已为会员</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    recharge() {
      this.axios
        .get("/userInfo")
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.data.money < 100) {
              this.$message.error("您的账户余额不足");
              return;
            } else {
              this.axios
                .get("/tobeVip?id=" + this.$store.state.uid)
                .then(res => {
                  if (res.data.code == 1) {
                    this.$message.success("充值成功!");
                    this.setUserInfo();
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$message("服务器无法连接，购买失败");
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，检查余额失败");
        });
    },
    rechargeClick() {
      this.$confirm("您确定要充值会员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.recharge();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    },
    setUserInfo() {
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
  }
};
</script>

<style lang='scss' scoped>
</style>