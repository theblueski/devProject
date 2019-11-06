/*
 * @Author: your name
 * @Date: 2019-10-28 22:49:43
 * @LastEditTime: 2019-11-06 22:44:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/utils/format.js
 */
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function formatDate (cellValue) {
  if (!cellValue) return
  cellValue = cellValue instanceof Date ? cellValue : new Date(cellValue)
  const year = cellValue.getFullYear()
  const month = padLeftZero(cellValue.getMonth() + 1 + '')
  const date = padLeftZero(cellValue.getDate() + '')
  return `${year}-${month}-${date}`
}

export function dateFormat (fmt, date) {
  let ret
  let opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    };
  };
  return fmt
}
