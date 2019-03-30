<template>
  <div id="activity" class="e_card">
    <div class="title"><span>[活动]</span> {{title}}</div>
    <div class="time">{{time | dateFormat('YYYY年MM月DD日')}}</div>
    <div class="content">活动内容：{{content}}</div>
    <el-button type="primary" style="margin: 0 auto; margin-top: 20px;  justify-content: center; display: flex;" size="medium" @click="$router.push('/user/home')">返回首页</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      time: ""
    };
  },
  methods: {
    getActivity() {
      // TODO: 获取会员活动
      this.axios
        .get("/getActivity?id=" + this.$route.params.id)
        .then(res => {
          if (res.data.code == 1) {
            this.title = res.data.data.title;
            this.content = res.data.data.content;
            this.time = res.data.data.time;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，无法获取会员活动信息");
        });
    }
  },
  mounted() {
    this.getActivity();
  }
};
</script>

<style lang='scss' scoped>
.title{
  font-size: 20px;
  span{
    color: red;
  }
  margin-bottom: 5px;
}
.time{
  font-size: 16px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1)
}
.content{
  line-height: 1.7;
}
</style>