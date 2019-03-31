<template>
  <div id="backOrderList">
    <div class="e_card" v-if="backOrderList.length == 0">暂无退单</div>
    <div class="e_card back_order_list" v-for="item in backOrderList" :key="item.id">
      <div class="title">
        <div class="id">订单编号：{{item.id}}</div>
      </div>
      <hr>
      <div class="parkingName">{{item.parkingName}}</div>
      <div class="info">
        <div class="spaceName">车位编号：{{item.spaceName}}</div>
        <div class="timeLength">停车时长：{{item.timeLength}}小时</div>
      </div>
      <div class="startTime">开始租用时间：{{item.startTime | dateFormat('YYYY-MM-DD HH:mm')}}</div>
      <hr>
      <div class="bottom">
        <el-button type="primary" class="sure_back_order" @click="modifyOrderState(4,item.id)">确认退单</el-button>
        <el-button type="danger" class="turn_down" @click="modifyOrderState(5,item.id)">驳 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backOrderList: []
    };
  },
  methods: {
    getBackOrderList() {
      this.axios
        .get("/getBackOrder")
        .then(res => {
          if (res.data.code == 1) {
            this.backOrderList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取退单列表失败");
        });
    },
    modifyOrderState(status, id) {
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/modifyOrderState", {
              id: id.toString(),
              status: status.toString()
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("操作成功");
                this.getBackOrderList();
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
    this.getBackOrderList();
  }
};
</script>

<style lang='scss' scoped>
.back_order_list {
  overflow: hidden;
  .title {
    font-size: 14px;
  }
  .parkingName {
    font-size: 20px;
  }
  .info {
    display: flex;
    margin: 10px 0;
    font-size: 14px;
    .spaceName {
      margin-right: 20px;
    }
  }
  .bottom {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .turn_down {
      margin-right: 10px;
    }
  }
}
</style>