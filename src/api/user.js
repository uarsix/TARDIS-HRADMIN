import request from '@/utils/request'

/**
 * 登陆
 * @param {Object} data
 * @returns
 */
export function login (data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 获取个人资料
 * @returns
 */
export const getInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/** *
 *
 * 获取用户的基本信息  完全是为了显示头像
 * **/
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

