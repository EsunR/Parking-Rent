<template>
  <div id="login">
    <div class="title">用户登录 | LOGIN</div>
    <hr>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="70px"
      :label-position="'left'"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="登录方式">
        <el-select v-model="loginForm.loginWay" style="width: 100%">
          <el-option label="普通用户" value="user"></el-option>
          <el-option label="员工登录" value="staff"></el-option>
        </el-select>
      </el-form-item> -->
      <el-checkbox v-model="rememberPwd" class="rememberPwd">记住密码</el-checkbox>
      <el-form-item class="btn_box">
        <el-button type="primary" @click="loginClick">登 录</el-button>
        <el-button type="info" @click="$router.push('/register')">注 册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
        // loginWay: "user"
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      rememberPwd: true
    };
  },
  methods: {
    loginClick() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.axios
            .post("/login", this.loginForm)
            .then(res => {
              if (res.data.code == 1) {
                this.$message("登录成功，正在跳转");
                console.log(res.data);
                // 记住用户名、密码
                if (this.rememberPwd) {
                  this.setCookie("account", this.loginForm.account);
                  this.setCookie("password", this.loginForm.password);
                } else {
                  this.setCookie("account", "");
                  this.setCookie("password", "");
                }
                // 保存token
                localStorage.setItem("token", res.data.data.token);
                setTimeout(() => {
                  window.location.href = this.COMMON.index_location;
                }, 1000);
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(() => {
              this.$message("账号不存在");
            });
        } else {
          return false;
        }
      });
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
#login {
  .title {
    font-size: 1.5rem;
  }
  .btn_box {
    float: right;
    @media screen and (max-width: 560px) {
      float: initial;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .el-form-item__content{
        margin: 0 !important;
      }
    }
  }
  .rememberPwd {
    margin-left: 70px;
    margin-bottom: 20px;
  }
}
</style>

