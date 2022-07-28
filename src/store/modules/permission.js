import { asyncRouters, constantRoutes } from '@/router/index'
const state = {
  routes: []
}
const mutations = {
  setRoutes (state, payload) {
    state.routes = payload
    console.log(state.routes)
  }
}
// 能写同步也能写异步
const actions = {
  async filter (context, menus) {
    const newRoutes = asyncRouters.filter(item => {
      return menus.includes(item.children[0].name)
      // console.log(item.children[0].name)
      // console.log(menus)
    })

    console.log(newRoutes)
    context.commit('setRoutes', [...constantRoutes, ...newRoutes])
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
