import PageTool from '@/components/PageTool'
import UploadImage from './UploadImage'
export default {
  // Vue插件写法
  install (Vue) {
    Vue.component('PageTool', PageTool)
    Vue.component('UploadImage', UploadImage)
  }
}
