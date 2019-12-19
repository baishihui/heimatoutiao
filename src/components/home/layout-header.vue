<template>
  <!-- 头部组件 -->
  <!-- 行 -->
  <el-row class="layout-header" type="flex"  align="middle" justify="space-between">
      <!-- 左侧 -->
        <el-col class="left" :span="7">
            <i class="el-icon-s-unfold"></i>
            <span class="title">江苏传智播客教育科技股份有限公司</span>
        </el-col>
         <!-- 右侧 -->
        <el-col class="right" :span="4">
          <el-row type="flex" justify="end" align="middle">
             <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
             <!-- 下拉列表 -->
             <el-dropdown>

               <span>{{userInfo.name}}</span>
               <!-- 下拉菜单  具体插槽 -->
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>Git地址</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
          </el-row>

           </el-col>

  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/header-logo.jpg') // 先把地址转换成变量
    }
  },
  // 生命周期
  created () {
    let token = window.localStorage.getItem('user-token') // 获取 令牌

    // 查询数据
    this.$axios({
      url: '/user/profile',
      // headers参数
      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then((result) => {
      this.userInfo = result.data.data // 获取用户个人信息
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header{
height: 60px;
.left{
  font-size: 18px;
  .title{
    font-size: 16px;
    margin-left: 4px;
    color: #2c3e50;
  }
}
.right{
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
}
</style>
