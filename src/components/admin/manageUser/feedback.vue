<template>
  <div id="feedback">
    <div class="e_card feedback_list" v-for="item in feedbackList" :key="item.id">
      <div class="name">{{item.name}}</div>
      <hr>
      <div class="content">{{item.content}}</div>
      <div class="account">来自账号：{{item.account}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbackList: [
        {
          id: 1,
          content: "反馈内容",
          name: "姓名",
          account: "111111"
        },
        {
          id: 2,
          content:
            "反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容",
          name: "姓名",
          account: "111111"
        }
      ]
    };
  },
  methods: {
    getFeedback() {
      this.axios
        .get("/getFeedback")
        .then(res => {
          if (res.data.code == 1) {
            this.feedbackList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取反馈列表失败");
        });
    }
  },
  mounted(){
    this.getFeedback()
  }
};
</script>

<style lang='scss' scoped>
.feedback_list {
  .name {
    font-size: 20px;
  }
  .content {
    font-size: 16px;
  }
  .account {
    font-size: 14px;
    margin-top: 20px;
    color: #909399;
  }
}
</style>