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
            <div class="cost">价格：{{item.cost}}元</div>
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
      activityList: [
        {
          id: 1,
          title: "新用户停车八折活动~",
          time: "1553852340000"
        },
        {
          id: 2,
          title: "新增2号停车场",
          time: "1553852340000"
        },
        {
          id: 3,
          title: "会员限时免费停车",
          time: "1553852340000"
        },
        {
          id: 4,
          title: "会员专享停车服务，首次充值会员多赠送一个月",
          time: "1553852340000"
        }
      ],
      parkingList: [
        {
          id: 1,
          parkingName: "秋名山停车场",
          description:
            "停车场说明停车场说明停车场说明停车场说明停车场说明停车场说明停车场说明搜索明搜索明搜索明搜索",
          cost: 1.5,
          url: "http://study.esunr.xyz/Fimec3PBRpgu1tKfqymZAtL-CTFx"
        },
        {
          id: 2,
          parkingName: "黄山停车场",
          description: "停车场说明",
          cost: 1.5,
          url: "http://study.esunr.xyz/FgJxJ8KCVAfp1ADjbwCTm6vpWSoX"
        },
        {
          id: 3,
          parkingName: "国家停车场",
          description: "停车场说明",
          cost: 1.5,
          url: "http://study.esunr.xyz/Fimec3PBRpgu1tKfqymZAtL-CTFx"
        },
        {
          id: 4,
          parkingName: "停车场名",
          description: "停车场说明",
          cost: 1.5,
          url: "http://study.esunr.xyz/Fimec3PBRpgu1tKfqymZAtL-CTFx"
        },
        {
          id: 5,
          parkingName: "停车场名",
          description: "停车场说明",
          cost: 1.5,
          url: "http://study.esunr.xyz/Fimec3PBRpgu1tKfqymZAtL-CTFx"
        },
        {
          id: 6,
          parkingName: "停车场名",
          description: "停车场说明",
          cost: 1.5,
          url: "http://study.esunr.xyz/Fimec3PBRpgu1tKfqymZAtL-CTFx"
        }
      ],
      page: 1,
      total: 0
    };
  },
  methods: {
    // TODO: 获取活动列表
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
      // TODO: 获取停车场列表
      this.axios
        .get("/getParkingList?page=" + this.page)
        .then(res => {
          if (res.data.code == 1) {
            this.parkingList = res.data.data;
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
    }
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
    cursor: pointer;
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