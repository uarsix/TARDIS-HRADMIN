// 导入
export default {
  path: '/import',
  hidden: true,
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'import',
    component: () => import('@/views/import')
  }]
}
