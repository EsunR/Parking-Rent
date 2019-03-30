<template>
  <div id="manageActivity">
    <div class="list-group shadow_base" id="activity_box">
      <div class="list-group-item list-group-item-action active">
        <div class="title">会员活动 | VIP Activities</div>
        <el-button size="medium" @click="clickAddActivity">添 加</el-button>
      </div>
      <button
        type="button"
        class="activity_list list-group-item list-group-item-action"
        v-for="item in activityList"
        :key="item.id"
        @click="getDetail(item.id)"
      >
        <div class="title">{{item.title}}</div>
        <div class="time">{{item.time | dateFormat('YYYY-MM-DD')}}</div>
      </button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="activity_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="activity_modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">活动详情</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="title">{{current.title}}</div>
            <div class="content">活动内容：{{current.content}}</div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="deleteActivity"
              class="btn btn-danger"
              style="float: left"
            >删除</button>
            <div class="btn_box">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal addActivity -->
    <div
      class="modal fade"
      id="addActivity_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addActivity_modalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">添加活动</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <el-form :model="form" :rules="rules" ref="form" label-position="'top'">
              <el-form-item label="活动标题" prop="title" required>
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="活动内容" prop="content" required>
                <el-input v-model="form.content" type="textarea" rows="5"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关 闭</button>
            <button type="button" class="btn btn-primary" @click="submit">提 交</button>
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
      activityList: [],
      current: {},
      rules: {},
      form: {
        title: "",
        content: "",
        time: ""
      }
    };
  },
  methods: {
    getActivityList() {
      this.axios
        .get("/getActivityList")
        .then(res => {
          if (res.data.code == 1) {
            this.activityList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取活动列表失败");
        });
    },
    getDetail(id) {
      this.axios
        .get("/getActivity?id=" + id)
        .then(res => {
          if (res.data.code == 1) {
            this.current = res.data.data;
            $("#activity_modal").modal("show");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，详情获取失败");
        });
    },
    deleteActivity() {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteActive?id=" + this.current.id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("删除成功");
                this.getActivityList();
                $("#activity_modal").modal("hide");
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
    },
    clickAddActivity() {
      $("#addActivity_modal").modal("show");
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addActivity();
        } else {
          return false;
        }
      });
    },
    addActivity() {
      this.form.time = Date.parse(new Date());
      this.axios
        .post("/addActivity", this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$refs.form.resetFields();
            this.$message.success("添加成功");
            this.getActivityList();
            $("#activity_modal").modal("hide");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getActivityList();
  }
};
</script>

<style lang='scss' scoped>
#activity_box {
  .active {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: white;
    }
  }
  .activity_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      width: 70%;
      line-height: 1.7;
      text-align: justify;
    }
    .time {
      font-size: 14px;
      color: #909399;
    }
  }
}

#activity_modal {
  .modal-body {
    .title {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
  .modal-footer {
    display: flex;
    justify-content: space-between;
    .btn_box {
      button {
        margin-left: 10px;
      }
    }
  }
  .btn {
    font-size: 16px !important;
  }
}
</style>