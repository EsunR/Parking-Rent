<template>
  <div id="recharge">
    <div class="recharge_box e_card">
      <div class="money">账户余额：{{$store.state.money}} 元</div>
      <hr>
      <el-input placeholder="请输入内容" v-model="moeny" class="input-with-select">
        <el-button slot="append" icon="el-icon-circle-check-outline" @click="recharge">充值</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moeny: ""
    };
  },
  methods: {
    recharge() {
      this.axios
        .post("/recharge", {
          uid: this.$store.state.uid.toString(),
          money: this.moeny
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("充值成功！");
            this.setUserInfo();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，充值失败");
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
  },
  mounted() {
    this.setUserInfo();
  }
};
</script>

<style lang='scss' scoped>
</style>