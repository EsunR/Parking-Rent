import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: "1",
    account: "16031210105",
    name: "EsunR",
    identity: "user"

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
