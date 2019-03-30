<template>
  <div id="userList">
    <div class="e_card user_list" v-for="item in userList" :key="item.key">
      <div class="info_box">
        <div class="sub_info">
          <div class="name">{{item.name}}</div>
          <div class="identity">{{item.identity | identity}}</div>
        </div>
        <div class="account">账号：{{item.account}}</div>
      </div>
      <el-button type="primary" @click="manage(item)">管 理</el-button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modify_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modify_modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">管理用户信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <el-form :model="form" ref="form" label-position="'top'">
              <el-form-item label="用户姓名" prop="name" required>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="用户账号" prop="account" required>
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <el-form-item label="身份" prop="identity" required>
                <el-select v-model="form.identity" style="width: 100%">
                  <el-option label="普通用户" value="user"></el-option>
                  <el-option label="会员" value="vip"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账户余额" prop="money" required>
                <el-input v-model="form.money"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <button type="button" @click="deleteUser" class="btn btn-danger" style="float: left">删除</button>
            <div class="btn_box">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" @click="modifyUserInfo">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          id: 1,
          name: "张三",
          account: "123456",
          identity: "vip",
          money: 100
        },
        {
          id: 2,
          name: "张三",
          account: "123456",
          identity: "user",
          money: 100
        }
      ],
      form: {
        name: "",
        id: "",
        identity: "",
        account: "",
        money: ""
      },
      rules: {
        money: [
          {
            pattern: /^[0-9]*(|.[0-9]+)$/,
            message: "请输入合法数字",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    getUserList() {
      this.axios
        .get("/getUserList")
        .then(res => {
          if (res.data.code == 1) {
            this.userList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，用户列表获取失败");
        });
    },
    manage(item) {
      this.currentUser = item;
      $("#modify_modal").modal("show");
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.account = item.account;
      this.form.identity = item.identity;
      item.money == null
        ? (this.form.money = 0)
        : (this.form.money = item.money);
    },
    modifyUserInfo() {
      this.axios
        .post("/modifyUserInfo", this.form)
        .then(res => {
          if (res.data.code == 1) {
            $("#modify_modal").modal("hide");
            this.$message.success("修改成功");
            this.getUserList();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，修改失败");
        });
    },
    deleteUser() {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteUser?id=" + this.form.id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("删除成功");
                $("#modify_modal").modal("hide");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接，删除失败");
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
    this.getUserList();
  }
};
</script>

<style lang='scss' scoped>
.user_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sub_info {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .name {
      margin-right: 10px;
      font-weight: bold;
    }
    .identity {
      background-color: #e6a23c;
      color: white;
      padding: 2px 10px;
      font-size: 14px;
      border-radius: 5px;
    }
  }
  .account {
    font-size: 14px;
    color: #909399;
  }
}

#modify_modal {
  .modal-footer {
    display: flex;
    justify-content: space-between;
    .btn_box {
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>