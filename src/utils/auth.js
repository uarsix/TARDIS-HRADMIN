import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 时间戳
const TimeKey = 'vue_admin_template_timeKey'
export function setTime (time) {
  return Cookies.set(TimeKey, time)
}
export function getTime () {
  return Cookies.set(TimeKey)
}

