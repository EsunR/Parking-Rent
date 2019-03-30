<template>
  <div id="addParking" class="e_card">
    <el-form :model="form" :rules="rules" ref="form" label-position="top">
      <el-form-item label="停车场名称" prop="parkingName">
        <el-input v-model="form.parkingName"></el-input>
      </el-form-item>
      <el-form-item label="上传停车场图片" required>
        <el-upload
          action="http://upload.qiniup.com"
          :on-success="uploadSuccess"
          :limit="1"
          list-type="picture-card"
          :data="postData"
          accept=".png, .jpg"
          style="width: 100%"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">( 只能上传jpg/png文件，推荐上传16:9尺寸的图片 )</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="停车场收费（单位：元/小时）" prop="cost">
        <el-input v-model="form.cost"></el-input>
      </el-form-item>
      <el-form-item label="车位数量（单位：个）" prop="count">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="停车场描述" prop="description">
        <el-input type="textarea" v-model="form.description" rows="5"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">添加停车场</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        parkingName: "",
        description: "",
        cost: "",
        url: "",
        count: ""
      },
      postData: {
        // 测试token
        token:
          "noucWTUuRY84Z0DSDJyJiszjO7OtRY3Vtj4yAWT1:1D6bk4yfCW51XqjgG-igP_Bi6dc=:eyJzY29wZSI6Im5vdmVsLXN5c3RlbSIsImRlYWRsaW5lIjoxNTc1MTI5NjAwfQ=="
      },
      rules: {
        parkingName: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          }
        ],
        description: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          }
        ],
        cost: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[0-9]*(|.[0-9]+)$/,
            message: "请输入数字",
            trigger: ["blur", "change"]
          }
        ],
        count: [
          {
            required: true,
            message: "请填写信息",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[1-9][0-9]?$/,
            message: "请输入范围在1~100的整数",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    uploadSuccess(res) {
      this.form.url = "http://study.esunr.xyz/" + res.key;
    },
    submit() {
      if (this.form.url == "") {
        this.$message("请上传一张停车场图片");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.addParking();
          } else {
            return false;
          }
        });
      }
    },
    addParking() {
      let obj = {};
      for (let key in this.form) {
        obj[key] = this.form[key].toString();
      }
      obj.cost = Number(obj.cost)
        .toFixed(2)
        .toString();
      console.log(obj);
      this.axios
        .post('/addParking', obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success('上传成功！');
            this.$router.push('/admin');
          }
      })
      .catch(err => {
        console.log(err);
        this.$message('服务器无法连接');
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>

