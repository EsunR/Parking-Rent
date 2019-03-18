import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import global from './common.vue'
import "bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

Vue.prototype.COMMON = global

Vue.use(VueAxios, axios);
// axios.defaults.baseURL = global.host;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false