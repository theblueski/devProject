/*
 * @Author: your name
 * @Date: 2019-11-10 15:52:07
 * @LastEditTime: 2019-11-10 20:26:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/utils/globalFn.js
 */
import store from '@/store'
window.setBluetoothList = function (data) {
  store.commit('bluetooth/SETBLUETOOTHLIST', data)
  console.log(store.state, 'store')
}

window.jumpPre = function () {
  const tabList = ['submitInfo', 'mine', 'discover']
  const path = window.location.href

  let flag = false
  tabList.forEach(item => {
    if (path.indexOf(item) !== -1) {
      flag = true
    }
  })

  if (flag) {
    return 0
  } else {
    window.history.back()
    return 1
  }
}

window.getCookie = function (name) {
  var arr; var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  // eslint-disable-next-line no-cond-assign
  if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
}
