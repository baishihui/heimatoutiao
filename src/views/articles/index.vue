<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 行 -->
    <el-row class="searchTool">
      <!-- 列 -->
      <el-col :span="2">文章状态</el-col>
      <el-col :span="18">
        <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 -->
        <!-- 单选组件 -->
        <el-radio-group v-model="radio">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 频道列表 -->
    <el-row class="searchTool">
      <el-col :span="2">频道列表</el-col>
      <el-col :span="18">
        <el-select></el-select>
      </el-col>
    </el-row>
    <!-- 文章选择 -->
    <el-row class="searchTool">
      <el-col :span="2">时间选择</el-col>
      <el-col :span="18">
          <!-- 日期选择 -->
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
}
</style>
