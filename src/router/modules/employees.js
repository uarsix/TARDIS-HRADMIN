// 员工
export default {
  path: '/employees',
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees'), meta: {
      title: '员工',
      icon: 'people'
    }
  }]
}
