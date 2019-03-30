<template>
  <div id="staffList">
    <div class="e_card" style="padding-bottom: 10px;">
      <div class="title">添加员工</div>
      <hr>
      <el-form
        :model="registerForm"
        ref="registerForm"
        :rules="rules"
        label-width="80px"
        :label-position="'left'"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="registerForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="password2" required>
          <el-input type="password" v-model="registerForm.password2"></el-input>
        </el-form-item>
        <el-form-item class="btn_box">
          <el-button type="primary" style="float:right" @click="registerClick">添 加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="staffList e_card" v-for="item in staffList" :key="item.id">
      <div class="info">
        <div class="name">{{item.name}}</div>
        <div class="account">账号：{{item.account}}</div>
      </div>
      <el-button type="danger" @click="deleteStaff(item.id)">删 除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        account: "",
        name: "",
        password: "",
        password2: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { validator: validatePassword2, trigger: ["blur", "change"] }
        ]
      },
      staffList: []
    };
  },
  methods: {
    registerClick() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          let obj = {
            account: this.registerForm.account,
            password: this.registerForm.password,
            name: this.registerForm.name
          };
          this.axios
            .post("/addStaff", obj)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("添加成功!");
                this.$refs.registerForm.resetFields();
                this.getStafList();
              } else {
                this.$message("该账号已被占用，添加失败");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("无法连接服务器，添加失败");
            });
        } else {
          return false;
        }
      });
    },
    getStafList() {
      this.axios
        .get("/getStaffList")
        .then(res => {
          if (res.data.code == 1) {
            this.staffList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，员工列表获取失败");
        });
    },
    deleteStaff(id) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteUser?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message("删除成功");
                this.getStafList();
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    }
  },
  mounted() {
    this.getStafList();
  }
};
</script>

<style lang='scss' scoped>
.staffList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-size: 16px;
    font-weight: bold;
  }
  .account {
    font-size: 14px;
  }
}
</style>