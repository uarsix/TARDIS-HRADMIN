// 考勤
export default {
  path: '/attendances',
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'attendances',
    component: () => import('@/views/attendances'), meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}
