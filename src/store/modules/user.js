import { login, getInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken, setTime } from '@/utils/auth'
const state = {
  token: getToken(), userInfo: {}
}
const mutations = {
  setToken (state, payload) { state.token = payload },
  setUserInfo (state, payload) { state.userInfo = payload },
  removeToken (state) {
    state.token = null
    removeToken()
  },
  removeUserInfo () { state.userInfo = {} }
}
const actions = {
  async login (context, data) {
    try {
      const res = await login(data)
      // 状态200登入失败抛出reject
      context.commit('setToken', res)
      setToken(res)
      setTime(Date.now())
    } catch (err) {
      return err.message
    }
  },
  async getInfo (context) {
    const res = await getInfo()
    const res1 = await getUserDetailById(res.userId)
    context.commit('setUserInfo', { ...res, ...res1 })
    return res
  },
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

