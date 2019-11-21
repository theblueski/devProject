/*
 * @Author: your name
 * @Date: 2019-10-27 10:58:18
 * @LastEditTime: 2019-10-28 23:30:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/discover',
    name: '发现',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/discover/index.vue')
  },
  {
    path: '/richPage',
    name: 'richPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/discover/richText/index.vue')
  },
  {
    path: '/submitInfo',
    name: '登记基本信息',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/submitInfo/index.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/mine',
    name: '我的',
    component: () => import(/* webpackChunkName: "mine" */ '@/views/mine/index.vue')
  },
  {
    path: '/deviceList',
    name: '我的设备',
    component: () => import(/* webpackChunkName: "deviceList" */ '@/views/mine/deviceList/index.vue')
  },
  {
    path: '/caseDetail',
    name: 'caseDetail',
    component: () => import(/* webpackChunkName: "caseDetail" */ '@/views/mine/caseDetail/index.vue')
  },
  {
    path: '/graphicPage',
    name: 'graphicPage',
    component: () => import(/* webpackChunkName: "graphicPage" */ '@/views/mine/deviceGraphic/index.vue')
  },
  {
    path: '/graphicDetail',
    name: 'graphicDetail',
    component: () => import(/* webpackChunkName: "graphicDetail" */ '@/views/mine/deviceGraphic/graphicDetail/index.vue')
  },
  {
    path: '/doctorList',
    name: '智能支具平台',
    component: () => import(/* webpackChunkName: "doctorList" */ '@/views/DoctorList/index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  window.title = to.name
})

export default router
