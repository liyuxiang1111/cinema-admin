// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import cookies from 'vue-cookies'
Vue.use(cookies)
// 导入字体图标
import '@/common/css/style.css'

Vue.config.productionTip = true
// Vue.config.productionTip = false
// 引入echars
import * as echarts from 'echarts'
Vue.prototype.echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
