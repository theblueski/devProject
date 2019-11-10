/*
 * @Author: your name
 * @Date: 2019-11-10 15:32:59
 * @LastEditTime: 2019-11-10 16:32:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/store/bluetooth/index.js
 */
export default {
  namespaced: true,

  state: {
    bluetoothList: []
  },
  getters: {
    bluetoothList (state) {
      return state.bluetoothList
    }
  },
  mutations: {
    SETBLUETOOTHLIST (state, data) {
      state.bluetoothList = data
    }
  },
  actions: {
    setBluetoothList (context, data) {
      context.commit('SETBLUETOOTHLIST', data)
    }
  }
}
