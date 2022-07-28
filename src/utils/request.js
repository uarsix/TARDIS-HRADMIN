import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTime } from '@/utils/auth'
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data, success, message } = response.data
  // console.log(response.data)
  // console.log(success)
  // console.log(data)
  if (success) {
    Message.success(message)
    return data
  } else { return Promise.reject(message) }
}, function (error) {
  // 对响应错误做点什么
  if (error.response && error.response.data && error.response.data.code === 1002) {
    store.dispatch('user/logout')
    router.push('/login')
  } Message.error(error.message)
  return Promise.reject(error)
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = store.state.user.token
  if (token) {
    // 请求的token时间戳距离上一次已经2小时，重新发送请求
    const time = Date.now() - getTime()
    if (time > 2 * 60 * 60 * 1000) {
      store.dispatch('user/logout')
      router.push('/login')
    }

    config.headers['Authorization'] = 'Bearer ' + token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request
