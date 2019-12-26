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
            <quill-editor style="height:400px;" v-model="formData.content" type="textarea" :rows="4"></quill-editor>
        </el-form-item>
        <el-form-item prop="type" label="封面" style="margin-top:100px">
            <!-- 单选框组 -->
            <el-radio-group v-model="formData.cover.type">
                <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
                <el-radio :label="1">单图</el-radio>
                <el-radio :label="3">三图</el-radio>
                <el-radio :label="0">无图</el-radio>
                <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            {{formData.cover}}
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <!-- 下拉列表 -->
            <el-select v-model="formData.channel_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <!-- （）不传 表示一个参数都没有 默认 false -->
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
  watch: {
    $route: function (to, from) {
      // console.log(to)
      // 判断to.parmas是否为空
      if (Object.keys(to.params).length) {
        // 有参数 => 修改
        this.getAticleById(to.params.articleId)
      } else {
        // 无参数 => 发表
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: { // 文章封面
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 存储的图片的地址
          },
          channel_id: null // 文章所属频道id

        }
      }
    },
    'formData.cover.type': function () {
      // this指向组件实例
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图模式
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
        if (isOk) {
          let { articleId } = this.$route.params // 获取动态路由参数
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: {
              draft
            },
            data: this.formData
          }).then(result => {
            this.$router.push('/home/articles') // 回到内容列表
          })
        }

        // if (articleId) {
        //   // 修改文章
        //   this.$axios({
        //     url: `/articles/${articleId}`,
        //     method: 'put',
        //     params: {
        //       draft
        //     },
        //     data: this.formData
        //   }).then(() => {
        //     this.$router.push('/home/articles') // 回到内容列表
        //   })
        // } else {
        //   // 调用接口  发布文章
        //   this.$axios({
        //     url: '/articles',
        //     method: 'post',
        //     params: {
        //       draft
        //     },
        //     data: this.formData
        //   }).then(() => {
        //   // 新增成功，应该去内容列表
        //     this.$router.push('/home/articles')
        //   })
        // }
      })
    },
    // 获取文章详情 通过id
    getAticleById (articleId) {
      // 调接口
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给 data数据
      })
    }
  },
  created () {
    this.getChannels() // 获取 频道数据
    // 获取id 判断有无id 有id 就是修改 无id就是发表
    let { articleId } = this.$route.params // 获取动态路由参数  articleId已经是字符串
    articleId && this.getAticleById(articleId) // 获取文章数据
  }
}
</script>

<style>

</style>
