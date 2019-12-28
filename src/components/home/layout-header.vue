<template>
  <!-- 头部组件 -->
  <!-- 行 -->
  <el-row class="layout-header" type="flex"  align="middle" justify="space-between" >
      <!-- 左侧 -->
        <el-col class="left" :span="7">
            <i @click="collaspseOrOpen" :class="{'el-icon-s-fold':!collaspse,'el-icon-s-unfold':collaspse }"></i>
            <span class="title">江苏传智播客教育科技股份有限公司</span>
        </el-col>
         <!-- 右侧 -->
        <el-col class="right" :span="4">
          <el-row type="flex" justify="end" align="middle">
             <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="哈哈哈哈">
             <!-- 下拉列表 -->
             <el-dropdown @command="handle">

               <span>{{userInfo.name}}</span>
               <!-- 下拉菜单  具体插槽 -->
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="git">Git地址</el-dropdown-item>
                  <el-dropdown-item command="lgout">退出</el-dropdown-item>
               </el-dropdown-menu>
             </el-dropdown>
          </el-row>

           </el-col>

  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collaspse: false, // 是否折叠
      userInfo: {}, // 用户信息
      defaultImg: require('../../assets/img/header-logo.jpg') // 先把地址转换成变量
    }
  },
  // 生命周期
  created () {
    // 查询数据
    this.getUserInfo()
    // 实例创建完毕 立刻监听
    eventBus.$on('updateUserInfoSuccess', () => {
      // 别人告诉你 它更新了数据 应该立刻处理
      this.getUserInfo()
    })
  },
  methods: {
    // 是否折叠
    collaspseOrOpen () {
      // 直接取反
      this.collaspse = !this.collaspse
      // 通知要改变宽度的组件
      eventBus.$emit('changeCollapse') // 改变了折叠状态
    },
    // 封装获取数据
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
        // headers参数

      }).then((result) => {
        this.userInfo = result.data // 获取用户个人信息
      })
    },
    handle (command) {
    //  区分点击的菜单项
      if (command === 'lgout') {
        // 退出
        window.localStorage.removeItem('user-token') // 删除令牌
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/baishihui/heimatoutiao'
      }
    }
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
  i{
    font-size: 22px;
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
