<template>
  <div class="login">
<!-- 放置一个卡片 -->
<el-card class="login-card">
<div class="title">
    <img src="../../assets/img/logo_index.png" alt="">
</div>
<!-- 表单 -->
<el-form style="margin-top:30px">
    <!-- 表单域 -->
    <el-form-item>
         <el-input placeholder="请输入手机号"></el-input>
    </el-form-item>
   <el-form-item>
         <el-input style="width:65%" placeholder="请输入验证码"></el-input>
         <el-button plain style="float:right">发送验证码</el-button>
   </el-form-item>
    <el-form-item>
   <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
    </el-form-item>
     <el-form-item>
   <el-button  type="primary" style="width:100%">登录</el-button>
    </el-form-item>
</el-form>

</el-card>
  </div>
</template>

<script>
export default {

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
        margin-top: ;
        .title {
            text-align: center;
            img {
                height: 44px;
            }
        }
    }
}
</style>
