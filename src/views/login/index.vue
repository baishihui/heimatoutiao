<template>
  <div class="login">
<!-- 放置一个卡片 -->
<el-card class="login-card">
<div class="title">
    <img src="../../assets/img/logo_index.png" alt="">
</div>
<!-- 表单 -->
 <!-- 登录表单 表单容器  el-form 需要绑定model属性 rules属性绑定验证规则对象-->
<el-form ref="myForm" :rules="loginRules" :model="loginForm" style="margin-top:30px">
    <!-- 表单域 -->
    <!-- 手机号 -->
   <!-- 表单域 el-form-item => 一行   => 校验 => prop => 要检验的字段名-->
    <el-form-item prop="mobile">
        <!-- 实际组件的 双向绑定 v-model-->
         <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <!-- 验证码 -->
   <el-form-item prop="code">
         <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
         <el-button plain style="float:right">发送验证码</el-button>
   </el-form-item>
   <!-- 协议 -->
    <el-form-item prop="check">
   <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
    </el-form-item>

     <el-form-item>
   <el-button @click="submitLogin"  type="primary" style="width:100%">登录</el-button>
    </el-form-item>
</el-form>

</el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: true// 是否选中
      },
      loginRules: {
        // 验证规则 验证登录表单的  key(字段名):value(数组)
        // required true -> 必填
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/, message: '验证码格式不正确'
          }],
        check: [{ validator: function (rule, value, callback) {
          //   rule当前的规则 没什么用
          // value指的就是我们要校验的字段的值
          if (value) {
            //   认为校验通过
            callback() // 直接执行callback 认为通过
          } else {
            //  认为校验不通过 要提示信息
            callback(new Error('没有同意协议'))
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin () {
      // validate 对整个表单进行校验的方法
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          // 认为前端校验登录表成功
          // 地址参数  查询参数 params 对象
          // body参数 data对象
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then((result) => {
            // 成功以后才会进入then
            window.localStorage.setItem('user-token', result.data.data.token) // 前端缓存 令牌
            this.$router.push('/home') // 跳转到主页
          }).catch(() => {
            // UI自带的方法
            this.$message({
              message: '您的手机号或者验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    background-image: url(../../assets/img/login_bg.jpg);
    background-size : cover; //背景图片自适应
    height: 100vh; //可视区域
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 440px;
        height: 350px;
        .title {
            text-align: center;
            img {
                height: 44px;
            }
        }
    }
}
</style>
