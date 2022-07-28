// 权限管理
export default {
  path: '/permission',
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permission'), meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
