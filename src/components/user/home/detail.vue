<template>
  <div id="detail">
    <div id="cover" :style="`background: url(${parkingInfo.url});`"></div>
    <div id="parking_info_box" class="e_card">
      <div class="name">{{parkingInfo.parkingName}}</div>
      <div class="description">说明：{{parkingInfo.description}}</div>
      <div class="cost">
        租借费用：
        <span>{{parkingInfo.cost}}元</span>
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
        class="commit_btn"
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
              <el-time-picker v-model="startTime" placeholder="请选择" style="width: 100%"></el-time-picker>

              <div class="title">租借时常：</div>
              <el-select v-model="timeLength" placeholder="请选择" style="width: 100%">
                <el-option label="1小时" value="1"></el-option>
                <el-option label="2小时" value="2"></el-option>
                <el-option label="3小时" value="3"></el-option>
                <el-option label="4小时" value="4"></el-option>
              </el-select>
            </div>
            <div class="total">支付金额：{{(parkingInfo.cost * selectedList.length * timeLength).toFixed(2)}} 元</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取 消</button>
            <button type="button" class="btn btn-primary">确 定</button>
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
      parkingInfo: this.$route.params,
      spaceList: [
        {
          id: 1,
          status: 0,
          parkingId: 1
        },
        {
          id: 2,
          status: 1,
          parkingId: 1
        },
        {
          id: 3,
          status: 0,
          parkingId: 1
        },
        {
          id: 4,
          status: 1,
          parkingId: 1
        },
        {
          id: 5,
          status: 0,
          parkingId: 1
        },
        {
          id: 6,
          status: 0,
          parkingId: 0
        },
        {
          id: 7,
          status: 0,
          parkingId: 1
        }
      ],
      selectedList: [],
      startTime: "",
      timeLength: "1"
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
            this.$message.error("最多选择三个车位");
            return;
          } else {
            list.status = 2;
            this.selectedList.push(item);
          }
        }
      }
    }
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
  .total{
    margin-top: 20px;
    font-size: 1.2rem;
    text-align: right;
  }
}
</style>