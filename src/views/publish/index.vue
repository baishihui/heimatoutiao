<template>
<el-card>
    <!-- 面包屑 -->
    <bread-crumb slot="header">
        <template slot="title">发表文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form ref="publishForm" :model="formData" :rules="publicRules" style="margin-left:50px" label-width="100px">
        <el-form-item prop="title" label="标题">
            <el-input v-model="formData.title" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item  prop="content" label="内容">
            <el-input v-model="formData.content" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="封面">
            <!-- 单选框组 -->
            <el-radio-group v-model="formData.cover.type">
                <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <!-- 下拉列表 -->
            <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="publishArticle()" type="primary">发表</el-button>
             <el-button @click="publishArticle(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels 接收频道
      formData: { // 表单数据
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 存储的图片的地址
        },
        channel_id: null // 文章所属频道id
      },
      //   校验规则
      publicRules: {
        title: [{ required: true, message: '标题内容不能为空' },
          { min: 5, max: 30, message: '标题长度需要在5到30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels // 将服务器频道数据 赋值给 channels
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate((isOk) => {
        // 调用接口
        this.$axios({
          url: '/articles',
          method: 'post',
          params: {
            draft
          },
          data: this.formData
        }).then(() => {
          // 新增成功，应该去内容列表
          this.$router.push('/home/articles')
        })
      })
    }
  },
  created () {
    this.getChannels() // 获取 频道数据
  }
}
</script>

<style>

</style>
