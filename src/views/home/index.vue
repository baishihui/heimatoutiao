<template>
<div>
    <!-- 放置一个外层容器 -->
    <el-container>
        <!-- 左右布局 -->
        <el-aside style="background-color:#323745;height:100vh;width:230px">
            <!-- 左侧导航 组件 -->
            <layout-aside></layout-aside>
            </el-aside>
          <el-container>
              <!-- 上下布局 -->

              <el-header>
                  <!-- 头部组件 -->
                  <layout-header></layout-header>
              </el-header>

              <!-- 主要区域 -->
              <el-main>主要区域</el-main>

          </el-container>
    </el-container>
</div>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style>

</style>
