/*
 * @Author: your name
 * @Date: 2019-11-10 15:52:07
 * @LastEditTime: 2019-11-10 16:29:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/utils/globalFn.js
 */
import store from '@/store'
import router from '@/router'
window.setBluetoothList = function (data) {
  store.commit('bluetooth/SETBLUETOOTHLIST', data)
  console.log(store.state, 'store')
}

window.jumpPre = function () {
  let routeLen = store.state.routeLen
  if (routeLen > 0) {
    router.back()
    return routeLen - 1
  } else {
    return 0
  }
}
