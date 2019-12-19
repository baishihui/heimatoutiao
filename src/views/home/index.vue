<template>
<div>
    <!-- 放置一个外层容器 -->
    <el-container>
        <!-- 左右布局 -->
        <el-aside style="background-color:#323745;height:100vh;width:230px">
            <!-- 左侧导航 -->
            <layout-aside></layout-aside>
            </el-aside>
          <el-container>
              <!-- 上下布局 -->

              <el-header>顶部</el-header>

              <!-- 主要区域 -->
              <el-main>主要区域</el-main>

          </el-container>
    </el-container>
</div>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
