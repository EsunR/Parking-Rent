<template>
  <div id="manageSpace">
    <div id="modify_box" class="e_card">
      <div class="title">修改信息</div>
      <el-form :model="form" :rules="rules" ref="form" label-position="top">
        <el-form-item label="停车场名称" prop="parkingName">
          <el-input v-model="form.parkingName"></el-input>
        </el-form-item>
        <el-form-item label="停车场收费（单位：元/小时）" prop="cost">
          <el-input v-model="form.cost"></el-input>
        </el-form-item>
        <el-form-item label="停车场描述" prop="description">
          <el-input type="textarea" v-model="form.description" rows="5"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">提交修改</el-button>
      </el-form>
    </div>
    <div id="spaceList">
      <div class="row">
        <div class="col-md-6" v-for="item in spaceList" :key="item.id" @click="select(item)">
          <div class="content e_card" :class="{rented: item.status.toString() == '1'}">
            <div class="id">车位编号：{{item.id}}</div>
            <div class="status">状态：{{item.status | status}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">修改车位状态</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="currentId">车位编号：{{currentId}}</div>
            <div class="group">
              <div class="label">修改状态：</div>
              <el-select v-model="currentStatus" placeholder="请选择">
                <el-option label="已被租用" value="1"></el-option>
                <el-option label="未被租用" value="0"></el-option>
              </el-select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关 闭</button>
            <button
              type="button"
              @click="modifySpaceStatus(currentId, currentStatus)"
              class="btn btn-primary"
            >保存更改</button>
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
      form: {
        id: this.$route.params.id,
        parkingName: this.$route.params.parkingName,
        description: this.$route.params.description,
        cost: this.$route.params.cost,
        url: this.$route.params.url
      },
      rules: {
        parkingName: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          }
        ],
        description: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          }
        ],
        cost: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[0-9]*(|.[0-9]+)$/,
            message: "请输入数字",
            trigger: ["blur", "change"]
          }
        ]
      },
      spaceList: [],
      currentId: "",
      currentStatus: ""
    };
  },
  methods: {
    submit() {
      this.axios
        .post("/modifyParkingInfo", this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("修改成功！");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getSpaceList() {
      this.axios
        .get("/getSpaceList?id=" + this.$route.params.id)
        .then(res => {
          if (res.data.code == 1) {
            this.spaceList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("页面已过期，请重新进入");
          this.$router.push("/admin/manageParking/parkingList");
        });
    },
    select(item) {
      $("#exampleModalCenter").modal("show");
      this.currentId = item.id;
      this.currentStatus = item.status.toString();
    },
    modifySpaceStatus(id, status) {
      this.axios
        .get("/modifySpaceStatus", {
          params: {
            id,
            status
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success("修改成功");
            $("#exampleModalCenter").modal('hide');
            this.getSpaceList();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getSpaceList();
  }
};
</script>

<style lang='scss' scoped>
#modify_box {
  .title {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
#spaceList {
  margin-bottom: 40px;
  cursor: pointer;
  .content {
    display: flex;
    justify-content: space-between;
  }
  .rented {
    color: white;
    background-color: #f56c6c;
  }
  .selected {
    color: white;
    background-color: #67c23a;
  }
}

#exampleModalCenter {
  font-size: 14px !important;
  .group {
    display: flex;
    align-content: center;
    margin-top: 10px;
    .label {
      line-height: 40px;
    }
  }
}
</style>