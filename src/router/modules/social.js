// 社保
export default {
  path: '/social',
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'social_securitys',
    component: () => import('@/views/social'), meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
