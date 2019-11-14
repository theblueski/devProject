/*
 * @Author: your name
 * @Date: 2019-10-22 22:12:01
 * @LastEditTime: 2019-11-10 16:24:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import bluetooth from './bluetooth/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    doctorInfo: {}
  },
  mutations: {
    setDoctorInfo (state, payload) {
      state.doctorInfo = payload || {}
    }
  },
  actions: {
  },
  modules: {
    bluetooth
  }
})
