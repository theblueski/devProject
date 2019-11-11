/*
 * @Author: your name
 * @Date: 2019-10-27 10:58:18
 * @LastEditTime: 2019-11-10 16:02:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './styles/reset.css'
import './styles/index.css'
import '@/icons'
import echarts from 'echarts'

import { Icon, Toast } from 'vant'
import '@/utils/globalFn'
import 'utils/historyHack'
Vue.component('icon', Icon)
Vue.use(Toast)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
