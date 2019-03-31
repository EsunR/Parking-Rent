<template>
  <div id="leaveFeedback">
    <div class="feedback_box e_card">
      <div class="titel">留言反馈</div>
      <hr>
      <div class="content">
        <el-input type="textarea" v-model="content" rows="5" placeholder="请留下您的反馈内容"></el-input>
      </div>
      <div class="btn_box">
        <el-button type="primary" @click="submitClick">提交反馈</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    submitClick() {
      if (this.content == "") {
        this.$message.error("内容不能为空");
        return;
      } else {
        this.submitFeedback();
      }
    },
    submitFeedback() {
      this.axios
        .post("/submitFeedback", {
          content: this.content
        })
        .then(res => {
          if (res.data.code == 1) {
            this.content = "";
            this.$message.success('提交成功!');
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，提交失败");
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.btn_box {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}
</style>