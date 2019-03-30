import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: "",
    account: "",
    name: "",
    identity: "",
    money: 0
  },
  mutations: {
    setState(state, obj) {
      for (let key in obj) {
        state[key] = obj[key];
      }
    }
  },
  actions: {

  }
})
