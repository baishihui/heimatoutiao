<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 放置上传组件 -->
    <el-upload :http-request="uploadImg" class='head-upload' action="" :show-file-list="false">
        <img :src="formData.photo ? formData.photo :defaultImg " alt="">

    </el-upload>
    <!-- 放置表单组件 -->
    <el-form :model="formData" :rules="rules" style="margin-left:100px" label-width="100px">
      <el-form-item prop="name" label="用户名">
          <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="简介">
          <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
          <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button  type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''// 手机号
      },
      //   定义一个规则
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名的长度限制为1到7个字符'
        }],
        email: [{ required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }]
      },
      //   定义一个默认头像
      defaultImg: require('../../assets/img/header-logo.jpg')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo() // 获取用户信息
  }
}
</script>

<style lang="less" scoped>
.head-upload{
    position: absolute;
    right: 300px;
    img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }

}
</style>
