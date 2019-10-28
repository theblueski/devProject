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
    name: 'discover',
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
    name: 'submitInfo',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/submitInfo/index.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/mine/index.vue')
  },
  {
    path: '/deviceList',
    name: 'deviceList',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/mine/deviceList/index.vue')
  },
  {
    path: '/caseDetail',
    name: 'caseDetail',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/mine/caseDetail/index.vue')
  },
  {
    path: '/graphicPage',
    name: 'graphicPage',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/mine/deviceGraphic/index.vue')
  },
  {
    path: '/graphicDetail',
    name: 'graphicDetail',
    component: () => import(/* webpackChunkName: "submitInfo" */ '@/views/mine/deviceGraphic/graphicDetail/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
