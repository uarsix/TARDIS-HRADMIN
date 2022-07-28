// 社保
export default {
  path: '/employees/detail/:id',
  component: () => import('@/layout'),
  children: [{
    path: '',
    name: 'employeesDetail',
    component: () => import('@/views/employees/detail.vue'),
    // 解耦合
    props: true
  }]
}
