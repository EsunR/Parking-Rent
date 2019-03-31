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
moment.locale('zh-cn');
Vue.prototype.$moment = moment;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = global.host;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(parseInt(dataStr)).format(pattern);
})

Vue.filter('description', function (description) {
  if (description.length > 50) {
    return description.substring(0, 50) + ' ... ...'
  } else {
    return description;
  }
})

Vue.filter('status', function (status) {
  status = status.toString();
  switch (status) {
    case '2':
      return '已选';
    case '1':
      return '正被租用';
    case '0':
      return '未被租用';
  }
})

Vue.filter('orderStatus', function (code) {
  code = code.toString();
  switch (code) {
    case '1':
      return '未达租用时间';
    case '2':
      return '正在租用';
    case '3':
      return '正在退单';
    case '4':
      return '已退单';
    case '5':
      return '租用结束';
  }
})

Vue.filter('identity', function (identity) {
  switch (identity) {
    case 'admin':
      return '管理员';
    case 'user':
      return '普通用户';
    case 'vip':
      return '会员';
    case 'staff':
      return '员工';
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false