<template>
  <el-container id="admin">
    <el-header id="tobar" class="shadow_base">
      <div class="title">
        <span class="mdi mdi-book"></span> 停车位租借系统
        <span class="subtitle">| ParkingRent</span>
      </div>
      <el-menu
        :default-active="'manageParking/parkingList'"
        class="nav_menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="manageParking/parkingList">停车场管理</el-menu-item>
        <el-menu-item index="manageUser">用户管理</el-menu-item>
      </el-menu>
    </el-header>

    <div id="main" class="container">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect(index) {
      this.$router.push("/admin/" + index);
    }
  }
};
</script>

<style lang='scss' scoped>
#tobar {
  z-index: 1;
  position: fixed;
  width: 100%;
  display: flex;
  background-color: #fff;
  .title {
    background-color: #fff;
    line-height: 60px;
    width: 50%;
    color: rgba(0, 0, 0, 0.8);
    font-size: 1.3rem;
    font-weight: lighter;
  }
  .nav_menu {
    width: 50%;
    li {
      float: right;
    }
  }
  @media screen and (max-width: 550px) {
    .title {
      font-size: 16px;
      width: 60%;
      .subtitle {
        display: none;
      }
    }
    .nav_menu {
      width: 100%;
    }
  }
}
@media screen and (max-width: 360px) {
  .el-header {
    padding: 0px !important;
  }
  .title {
    display: none;
  }
  .nav_menu {
    li {
      float: left !important;
    }
  }
}
#main {
  margin-top: 80px;
}
</style>