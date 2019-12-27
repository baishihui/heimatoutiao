<template>
  <div class="cover-image">
      <!-- 根据封面的image长度 进行渲染 一个 或者 三个 或者 不渲染 -->
      <div @click="openDialog(index)" class="cover-item" v-for="(item,index) in list" :key="index">
          <img :src="item ? item : defaultImg " alt="">
      </div>
      <!-- 生成的元素在body上 用visible控制显示隐藏 -->
      <el-dialog @close="closeDialog" :visible="dialogVisible">
          <!-- 选择素材组件 -->
          <!-- 监听谁的事件 就在谁的标签上写监听 -->
          <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  // 接收属性
  props: ['list'], // 接收属性
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 将图片变成变量
      dialogVisible: false, // 控制弹层打开关闭的变量
      selectIndex: -1 // 默认下标 -1
    }
  },
  methods: {
    // 接收URL方法
    receiveImg (img) {
      // props是只读的  不能修改
      // 接收数据之后 发现 list 为props数据 要想修改 => 再次传递
      this.$emit('clickOneImg', img, this.selectIndex) // 再次触发一个自定义事件
      this.closeDialog() // 直接关闭
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true // 打开弹层
      this.selectIndex = index // 记住点击的下标
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }

}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    margin: 20px 0;
    margin-left: 100px;
.cover-item{
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img{
        height: 100%;
        width: 100%;
    }
}
}

</style>
