/*
 * @Author: your name
 * @Date: 2019-11-03 16:51:14
 * @LastEditTime: 2019-11-04 23:35:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/api/upload.js
 */
import fetch from 'utils/fetch'

export function uploadImage (data) {
  return fetch.post(
    '/smartfeet/qiniuUploadImg',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
export function deviceList (data) {
  return fetch.post(
    '/smartfeet/showDeviceIdList',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
// 获取设备穿戴数据
export function deviceGraphicData (data) {
  return fetch.post(
    '/smartfeet/queryShoesRecordsDetails',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
// 获取设备穿戴数据根据设备id
export function deviceGraphicDataForId (data) {
  return fetch.post(
    '/smartfeet/queryRecordChartFromApp',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
