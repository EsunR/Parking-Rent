<template>
  <div id="manageUser">
    <div id="tab_bar" class="row">
      <div
        class="col-md"
        @click="changeTab('userList')"
        :class="{active: active == 'userList'}"
      >管理用户</div>
      <div
        class="col-md"
        @click="changeTab('staffList')"
        :class="{active: active == 'staffList'}"
        v-if="$store.state.identity == 'admin'"
      >管理员工</div>
      <div
        class="col-md"
        @click="changeTab('manageActivity')"
        :class="{active: active == 'manageActivity'}"
      >管理活动</div>
      <div
        class="col-md"
        @click="changeTab('backOrderList')"
        :class="{active: active == 'backOrderList'}"
      >退单管理</div>
      <div
        class="col-md"
        @click="changeTab('feedback')"
        :class="{active: active == 'feedback'}"
      >查看反馈</div>
    </div>
    <div class="info_bar e_card">
      <div class="left">
        <div class="name">用户：{{$store.state.name}}</div>
        <div class="identity">权限级别：{{$store.state.identity}}</div>
      </div>
      <div class="right">
        <el-button @click="logout" type="danger" icon="el-icon-circle-close
        ">注销</el-button>
      </div>
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
      active: this.$route.path.split("/")[3]
    };
  },
  methods: {
    changeTab(index) {
      this.active = index;
      this.$router.push("/admin/manageUser/" + index);
    },
    logout() {
      localStorage.clear();
      window.location.href = this.COMMON.login_location;
    }
  }
};
</script>

<style lang='scss' scoped>
.info_bar {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .name {
    margin-bottom: 5px;
  }
}
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
.main {
  margin-top: 20px;
}
</style>