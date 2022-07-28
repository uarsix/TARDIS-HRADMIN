import request from '@/utils/request'

/**
 *获取全部角色
 * @param {当前页，每页数量} param0
 * @returns
 */
export const getRoleList = ({ page, pagesize }) => {
  return request({
    url: '/sys/role',
    params: { page, pagesize }
  })
}

// 根据id删除角色
export const delRole = id => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 获取所有的权限点
export const getPermissions = () => {
  return request({
    url: '/sys/permission'
  })
}

// 根据角色id获取权限
export const getPermissionsById = id => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 *分配全选
 * @param {*} id 当前角色id
 * @param {*} permIds 选中数组
 * @returns
 */
export const getAssignPrem = (id, permIds) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data: { id, permIds }
  }
  )
}
/**
 *添加角色
 * @param {*} param0
 * @returns
 */
export const addRole = ({ name, description }) => {
  return request({
    method: 'POST',
    url: '/sys/role',
    data: { name, description }
  })
}

/**
 *修改角色
 * @param {*} data
 * @returns
 */
export const editRole = data => {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

/**
 *根据id查询公司信息
 * @param {*} id
 * @returns
 */
export const getCompanyInfo = id => {
  return request({
    url: `/company/${id}`
  })
}
