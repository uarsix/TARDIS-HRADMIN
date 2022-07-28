import request from '@/utils/request'
/**
 *添加权限点
 * @param {*} data
 * @returns
 */
export const addPermission = data => {
  return request({
    method: 'POST',
    url: '/sys/permission',
    data
  })
}

/**
 *修改权限点
 * @param {*} data
 * @returns
 */
export const editPermission = (data) => {
  return request({
    method: 'PUT',
    url: `/sys/permission/${data.id}`,
    data
  })
}
