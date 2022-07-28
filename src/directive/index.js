// 自定义指令

// 数据更新执行
export const imgError = {
  update (el, binding) {
    el.onerror = function () {
      this.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
    }
  }
}
// 标签指令插入时执行
// inserted (el, binding) {
//   el.src = 'http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'
// }

