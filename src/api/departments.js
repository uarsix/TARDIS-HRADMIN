import request from '@/utils/request'

/**
 * 获取组织列表
 * @returns
 */
export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}

// 根据部门id删除
export const delDepartment = id => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

/**
 * 获取简单列表
 * @returns
 */
export const getSimpleUserList = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 新增部门
 * @param code 编码
 * @returns
 */
export const addDepartment = ({ code, introduce, manager, name, pid }) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data: { code, introduce, manager, name, pid }
  })
}

/**
 * 修改
 * @param {*} id
 * @returns
 */
export const isEditDepartment = (data) => {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}

