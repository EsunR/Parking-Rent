import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import './plugins/element.js'
import global from './common.vue'
import "bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './assets/style.css'

Vue.prototype.COMMON = global

Vue.use(VueAxios, axios);
axios.defaults.baseURL = global.host;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(parseInt(dataStr)).format(pattern);
})

Vue.filter('description', function (description) {
  if (description.length > 36) {
    return description.substring(0, 36) + ' ... ...'
  } else {
    return description;
  }
})

Vue.filter('status', function (status) {
  status = status.toString();
  switch (status){
    case '2':
      return '已选';
    case '1':
      return '已租用';
    case '0':
      return '未租用';
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false