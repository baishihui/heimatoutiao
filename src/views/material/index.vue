<template>
<!-- 基本页面结构 -->
<el-card>
     <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="全部素材" name='all'>
                <!-- 全部素材内容 -->
               <div class="img-list">
                   <el-card class="img-card" v-for="item in list" :key="item.id">
                       <!-- 图片 -->
                        <img :src="item.url" alt="">
                        <!-- 图片下边的收藏 删除 -->
                        <el-row class="operate" type="flex" align="middle" justify="space-around">
                           <i class="el-icon-star-on"></i>
                           <i class="el-icon-delete-solid"></i>
                        </el-row>
                   </el-card>
               </div>
               <!-- 分页组件 -->
               <el-row type="flex" justify="center" align="middle" style="height:80px">
                 <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                     @current-change="changePage"
                     >
                  </el-pagination>
               </el-row>
            </el-tab-pane>
            <el-tab-pane label="收藏素材" name='collect'>
                <!-- 收藏素材内容 -->
                  <div class="img-list">
                   <el-card class="img-card" v-for="item in list" :key="item.id">
                       <!-- 图片 -->
                        <img :src="item.url" alt="">
                   </el-card>
               </div>
                  <!-- 分页组件 -->
               <el-row type="flex" justify="center" align="middle" style="height:80px">
                 <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="page.total"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                     @current-change="changePage"
                     >
                  </el-pagination>
               </el-row>
            </el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [], // 定义数组  接收全部数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 8, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    // 分页的方法
    changePage (newPage) {
      this.page.currentPage = newPage // 得到最新页码
      this.getAllMaterial()
    },
    //   切换tab事件
    changeTab () {
      this.page.currentPage = 1 // 应该把当前页码回到第一页 如果不重置第一页 就会直接去找不到对应页码
      this.getAllMaterial()
    },
    //   获取所有素材/收藏
    getAllMaterial () {
      // 发送请求
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize

        }
      }).then((result) => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 获取总页数
      })
    }

  },
  created () {
    this.getAllMaterial() // 获取所有数据  第一次 所有数据
  }
}
</script>

<style lang="less" scoped>
.img-list{
    display: flex;
     flex-wrap: wrap;
    .img-card{
    width: 200px;
    height: 240px;
    margin: 20px 30px;
    position: relative;
    img{
        width: 100%;
        height: 100%;
    }
    .operate{
        font-size: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #f4f5f6;
        height: 30px;
        width: 100%
    }
}
}

</style>
