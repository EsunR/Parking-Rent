<template>
  <div id="orderList">
    <div class="orderList e_card" :key="item.id" v-for="item in orderList">
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
        <div 
          class="status" 
          :class="{
            active: item.status == 2,
            wait: item.status == 1
          }"
        >{{item.status | orderStatus}}</div>
        <el-button type="danger" @click="backOrder(item.id)" v-if="item.status == 1">退 单</el-button>
        <el-button type="danger" v-if="item.status != 1" disabled>已不可退单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList: []
    };
  },
  methods: {
    getOrderList() {
      this.axios
        .get("/getOrderList")
        .then(res => {
          if (res.data.code == 1) {
            this.orderList = res.data.data.reverse();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    backOrder(id) {
      this.$confirm("您确定要退单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/applyBackOrder?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.$message.success("申请成功!");
                this.getOrderList();
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
    this.getOrderList();
  }
};
</script>

<style lang='scss' scoped>
.orderList {
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
    justify-content: space-between;
    align-items: center;
    .status {
      border-radius: 5px;
      font-size: 16px;
      color: #909399;
    }
    .active {
      color: #67c23a;
    }
    .wait{
      color: #F56C6C;
    }
  }
}
</style>