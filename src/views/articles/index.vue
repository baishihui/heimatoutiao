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
        <el-radio-group v-model="formData.status">
            <!-- 这个5 是默认  传参的时候判断 是5 传 null -->
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
        <el-select v-model="formData.channel_id">
              <el-option v-for="item in channels" :key="item.id"
             :label="item.name"
             :value="item.id"></el-option>

        </el-select>
      </el-col>
    </el-row>
    <!-- 文章选择 -->
    <el-row class="searchTool">
      <el-col :span="2">时间选择</el-col>
      <el-col :span="18">
          <!-- 日期选择 -->
        <el-date-picker
          v-model="formData.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <!-- 主题内容 -->
    <el-row class="total">
        <span>共找到0条符合条件的内容</span>
    </el-row>
    <!-- 循环模板 -->
     <el-row v-for="item in 100" :key="item" class='article-item' type="flex" justify="space-between">
         <!-- 左侧 -->
         <el-col :span="14" >
             <el-row type="flex">
                  <img src="../../assets/img/404.png" alt="">
             <div class="info">
                 <span>大家好,今天是平安夜,晚上吃苹果</span>
                 <el-tag class='tag'>标签一</el-tag>
                 <span class='data'>2019-12-24 11:00:43</span>
             </div>
             </el-row>

         </el-col>
         <!-- 右侧 -->
         <el-col :span="6">
             <el-row class="right" type="flex" justify="end">
                <span><i class="el-icon-edit"></i>修改</span>
                <span><i class="el-icon-delete"></i>删除</span>
             </el-row>
         </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 状态
        channel_id: null, // 默认是空
        dateRange: [] // 默认为一个空数组
      },
      channels: [] // 定义一个channels 接收频道
    }
  },
  methods: {
    //   获取频道数据
    getChannels () {
      // 调接口
      this.$axios({
        url: '/channels'

      }).then((result) => {
        this.channels = result.data.channels // 获取频道数据
      })
    }

  },
  created () {
    this.getChannels() // 调用获取频道数据
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
  }
  .total{
      margin:60px 0;
      height: 30px;
      border-bottom: 1px dashed #ccc;
  }
  .article-item{
      margin: 20px 0;
      padding: 10px 0;
      border-bottom: 1px solid #f2f3f5;
      img{
          width: 180px;
          height: 100px;
          border-radius: 4px;
           margin-right: 10px;
      }
      .info{
           height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tag {
              max-width:60px;
            }

          .data{
            color: #999;
              font-size:12px;
          }
      }
  .right {
          span {
              margin-left:8px;
              font-size: 14px;
              cursor: pointer;
          }
      }
  }
}
</style>
