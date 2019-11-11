/*
 * @Author: your name
 * @Date: 2019-11-10 15:52:07
 * @LastEditTime: 2019-11-10 20:26:21
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

window.getCookie = function (name) {
  var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  // eslint-disable-next-line no-cond-assign
  if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
}
