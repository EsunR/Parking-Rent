<template>
  <div id="detail" v-loading.fullscreen.lock="loading" element-loading-text="正在提交订单">
    <div id="cover" :style="`background: url(${parkingInfo.url});`"></div>
    <div id="parking_info_box" class="e_card">
      <div class="name">{{parkingInfo.parkingName}}</div>
      <div class="description">说明：{{parkingInfo.description}}</div>
      <div class="cost">
        租借费用：
        <span>{{parkingInfo.cost}}元/小时</span>
      </div>
    </div>

    <div id="spaceList">
      <div class="row">
        <div
          class="col-md-6"
          v-for="(item, index) in spaceList"
          :key="item.id"
          @click="select(item, index)"
        >
          <div
            class="content e_card"
            :class="{rented: item.status.toString() == '1', selected: item.status == 2}"
          >
            <div class="id">车位编号：{{item.id}}</div>
            <div class="status">状态：{{item.status | status}}</div>
          </div>
        </div>
      </div>
    </div>

    <transition>
      <el-button
        type="success"
        icon="el-icon-check"
        circle
        class="commit_btn shadow_base"
        v-if="selectedList.length != 0"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      ></el-button>
    </transition>

    <!-- model -->
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
            <h5 class="modal-title" id="exampleModalLongTitle">支付确认</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="selectedList">
              <div class="title">预订列表：</div>
              <div class="item_box">
                <div class="item" v-for="item in selectedList" :key="item.id">
                  <div class="id">编号：{{item.id}}</div>
                </div>
              </div>

              <div class="title">租借时间：</div>
              <el-time-picker
                v-model="startTime"
                placeholder="请选择"
                style="width: 100%"
                value-format="timestamp"
                :picker-options="{
                  selectableRange: `${this.$moment(Date.parse(new Date()) + 60000).format('HH:mm:ss')} - 22:30:00}`
                }"
                format="HH:mm"
              ></el-time-picker>

              <div class="title">租借时长：</div>
              <el-select v-model="timeLength" placeholder="请选择" style="width: 100%">
                <el-option label="1小时" value="1"></el-option>
                <el-option label="2小时" value="2"></el-option>
                <el-option label="3小时" value="3"></el-option>
                <el-option label="4小时" value="4"></el-option>
              </el-select>
            </div>
            <div class="total">
              支付金额：
              <span
                style="color: red"
              >{{(parkingInfo.cost * selectedList.length * timeLength).toFixed(2)}}</span> 元
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取 消</button>
            <button type="button" class="btn btn-primary" @click="submitOrder()">确 定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div
      class="modal fade"
      id="reminder_Modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="reminder_ModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">预订结果</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div
              :class="{success: item.status == 1, fail: item.status == 0}"
              class="reminderList"
              v-for="item in reminderList"
              :key="item.spaceName"
            >车位编号：{{item.spaceName}} -- {{item.msg}}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取 消</button>
            <button type="button" class="btn btn-primary" @click="close">确 定</button>
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
      loading: false,
      parkingInfo: this.$route.params,
      spaceList: [],
      selectedList: [],
      timeLength: "1",
      startTime: Date.parse(new Date()) + 60000,
      reminderList: []
    };
  },
  methods: {
    select(item, index) {
      if (item.status == 1) {
        this.$message.error("该车位已被租用");
        return;
      } else {
        let list = this.spaceList[index];
        if (list.status == 2) {
          list.status = 0;
          this.selectedList.some((current, index) => {
            if (current.id == item.id) {
              this.selectedList.splice(index, 1);
              return true;
            }
          });
        } else {
          if (this.selectedList.length >= 3) {
            this.$message("最多选择三个车位");
            return;
          } else {
            list.status = 2;
            this.selectedList.push(item);
          }
        }
      }
    },
    submitOrder() {
      for (let i in this.selectedList) {
        let order = {};
        order.spaceName = this.selectedList[i].id;
        order.startTime = this.startTime;
        order.timeLength = this.timeLength;
        order.cost = this.parkingInfo.cost;
        for (let key in order) {
          order[key] = order[key].toString();
        }
        $("#reminder_Modal").modal("show");
        this.reminderList = [];
        // TODO: 逐条提交订单
        this.axios
          .post("/submitOrder", order)
          .then(res => {
            // 成功预订
            if (res.data.code == 1) {
              let obj = {
                spaceName: order.spaceName,
                msg: "预订成功",
                status: 1
              };
              this.reminderList = [...this.reminderList, obj];
            } else {
              // 失败预订
              let obj = { spaceName: order.spaceName };
              if (res.data.data) {
                obj.msg = "已有人在该时间段预订";
                obj.status = 0;
              } else {
                obj.msg = this.data.msg;
                obj.status = 0;
              }
              this.reminderList = [...this.reminderList, obj];
            }
          })
          .catch(err => {
            console.log(err);
            this.$message(
              `服务器无法连接，${i}号订单预订失败，请返回订单页面查看详情`
            );
            this.loading = false;
          });
      }
    },
    getSpaceList() {
      this.axios
        .get("/getSpaceList?id=" + this.parkingInfo.id)
        .then(res => {
          if (res.data.code == 1) {
            this.spaceList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("页面失效，请重新进入");
          this.$router.push("/user");
        });
    },
    close() {
      $("#reminder_Modal").modal("hide");
      $("#exampleModalCenter").modal("hide");
      this.$router.push("/user/center");
    }
  },
  mounted() {
    this.getSpaceList();
  }
};
</script>

<style lang='scss' scoped>
#cover {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding-bottom: 56.25%;
  height: 0;
  background-size: 100% 100% !important;
}
#parking_info_box {
  margin-top: 20px;
  position: relative;
  .name {
    font-size: 18px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .description {
    font-size: 14px;
    text-align: justify;
  }
  .cost {
    font-weight: bold;
    margin-top: 5px;
    span {
      color: #f56c6c;
    }
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
    cursor: not-allowed;
  }
  .selected {
    color: white;
    background-color: #67c23a;
  }
}
.commit_btn {
  position: fixed;
  bottom: 50px;
  right: 300px;
  height: 50px;
  width: 50px;
  @media screen and (max-width: 1700px) {
    right: 50px;
  }
  @media screen and (max-width: 680px) {
    right: 20px;
    bottom: 20px;
  }
}

#exampleModalCenter {
  .modal-body {
    .title {
      font-size: 16px;
      color: #909399;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .item_box {
      display: flex;
      .item {
        font-size: 14px;
        text-align: left;
        background-color: rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        margin-right: 10px;
        padding: 5px 10px;
        text-align: center;
      }
      &:last-child {
        margin-right: 0px !important;
      }
    }
    .total {
      margin-top: 20px;
      font-size: 1.2rem;
      text-align: right;
    }
  }
}

#reminder_Modal {
  .reminderList {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .success {
    color: white;
    background-color: #67c23a;
  }
  .fail {
    color: white;
    background-color: #f56c6c;
  }
}
</style>