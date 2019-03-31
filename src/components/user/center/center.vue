<template>
  <div id="center">
    <div id="tab_bar" class="row">
      <div
        class="col-md"
        @click="changeTab('orderList')"
        :class="{active: active == 'orderList'}"
      >订单列表</div>
      <div
        class="col-md"
        @click="changeTab('reCharge')"
        :class="{active: active == 'reCharge'}"
      >账户充值</div>
      <div class="col-md" @click="changeTab('tobeVip')" :class="{active: active == 'tobeVip'}">会员充值</div>
      <div
        class="col-md"
        @click="changeTab('leaveFeedback')"
        :class="{active: active == 'leaveFeedback'}"
      >留言反馈</div>
    </div>
    <div class="main">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "orderList"
    };
  },
  methods: {
    changeTab(index) {
      this.active = index;
      this.$router.push("/user/center/" + index);
    }
  }
};
</script>

<style lang='scss' scoped>
#tab_bar {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin: 0;
  .col-md {
    text-align: center;
    padding: 5px;
    cursor: pointer;
  }
  .active {
    background-color: #409eff;
    color: #fff;
  }
}

.main{
  margin-top: 20px;
}
</style>