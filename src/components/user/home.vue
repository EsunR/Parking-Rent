<template>
  <div id="home">
    <div class="list-group shadow_base" id="activity_box">
      <button
        type="button"
        class="list-group-item list-group-item-action active"
      >会员活动 | VIP Activities</button>
      <button
        type="button"
        class="activity_list list-group-item list-group-item-action"
        v-for="item in activityList"
        :key="item.id"
        @click="$router.push('/user/activity/' + item.id)"
      >
        <div class="title">{{item.title}}</div>
        <div class="time">{{item.time | dateFormat('YYYY-MM-DD')}}</div>
      </button>
    </div>
    <div class="row" id="parking_list_box">
      <div class="col-md-6" v-for="item in parkingList" :key="item.id">
        <div class="list_content">
          <div class="img_box" :style="`background: url(${item.url});`"></div>
          <div class="info_box">
            <div class="name">{{item.parkingName}}</div>
            <div class="description">简介：{{item.description | description}}</div>
          </div>
          <div class="btn_box">
            <div class="cost">{{item.cost}}元/小时</div>
            <el-button @click="getDetail(item)" type="primary">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-button
      id="get_more_btn"
      type="primary"
      @click="getMore"
      v-if="parkingList.length < total"
      style="display: flex; margin: 40px auto;"
      icon="el-icon-arrow-down"
      circle
    ></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityList: [],
      parkingList: [],
      page: 1,
      total: 0
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
    getParkingList() {
      this.axios
        .get("/getParkingList?page=" + this.page)
        .then(res => {
          if (res.data.code == 1) {
            this.parkingList = [...this.parkingList, ...res.data.data.parkingList];
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getDetail(item) {
      this.$router.push({
        name: "detail",
        params: item
      });
    },
    getMore() {
      this.page++;
      this.getParkingList();
    }
  },
  mounted() {
    this.getActivityList();
    this.getParkingList();
  }
};
</script>

<style lang='scss' scoped>
#activity_box {
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

#parking_list_box {
  margin-top: 20px;
  .list_content {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-bottom: 20px;
    overflow: hidden;
    .img_box {
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      background-size: 100% 100% !important;
    }
    .info_box {
      padding: 20px;
      padding-bottom: 0px;
      .name {
        font-size: 1.5rem;
        color: #303133;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      .description {
        color: #606266;
        font-size: 14px;
        text-align: justify;
        min-height: 42px;
      }
    }
    .btn_box {
      display: flex;
      padding: 0 20px 20px;
      margin-top: 20px;
      justify-content: space-between;
      align-items: center;
      .cost {
        color: #606266;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
}
</style>