import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor' // 引入了quill组件
import CoverImage from './publish/cover-image.vue'
import SelectImage from './publish/select-image.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 全局注册
    Vue.component('layout-header', layoutHeader) // 全局注册
    Vue.component('bread-crumb', breadCrumb) // 全局注册一个面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器
    Vue.component('cover-image', CoverImage) // 注册一个封面组件
    Vue.component('select-image', SelectImage) // 注册一个封面组件
  }

}
