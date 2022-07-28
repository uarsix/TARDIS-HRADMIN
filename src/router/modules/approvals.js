// 审批路由规则
export default {
  path: '/approvals',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals'),
      // 路由元信息 存储数据 可以放任何信息
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
