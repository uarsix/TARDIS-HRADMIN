// 公司设置
export default {
  path: '/setting',
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'settings',
    component: () => import('@/views/setting'), meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
