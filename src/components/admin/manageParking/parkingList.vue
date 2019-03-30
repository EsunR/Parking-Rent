<template>
  <div id="parkingList">
    <div id="listInfo">
      <div class="total">停车场总数：{{total}}</div>
      <el-button
        class="add_btn"
        type="success"
        icon="el-icon-plus"
        circle
        @click="$router.push('/admin/manageParking/addParking')"
      ></el-button>
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
            <el-button @click="getDetail(item)" type="primary">管 理</el-button>
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
      parkingList: [],
      page: 1,
      total: 0
    };
  },
  methods: {
    getParkingList() {
      this.axios
        .get("/getParkingList?page=" + this.page)
        .then(res => {
          if (res.data.code == 1) {
            this.parkingList = [
              ...this.parkingList,
              ...res.data.data.parkingList
            ];
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getMore() {
      this.page++;
      this.getParkingList();
    },
    getDetail(item) {
      this.$router.push({
        name: "manageSpace",
        params: item
      });
    }
  },
  mounted() {
    this.getParkingList();
  }
};
</script>

<style lang='scss' scoped>
#listInfo {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  position: relative;
  margin-bottom: 30px;
  .add_btn {
    position: absolute;
    right: 20px;
  }
}
#parking_list_box {
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