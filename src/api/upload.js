/*
 * @Author: your name
 * @Date: 2019-11-03 16:51:14
 * @LastEditTime: 2019-11-06 23:00:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /devProject/src/api/upload.js
 */
import fetch from 'utils/fetch'
import { getToken } from '@/utils/auth' // eslint-disable-line

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
// 获取新闻列表
export function queryNewsList (data) {
  return fetch.post(
    '/smartfeet/news/newsList',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
// 获取新闻内容
export function queryNewsContent (data) {
  return fetch.post(
    '/smartfeet/news/newsDetail',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

export function getIllnessCaseList () {
  // const data = `page=0&size=200&unionid=${getToken()}`
  const data = `page=0&size=200&unionid=okRox1XRMovZBcctZ-_k8F9rZrFo`
  return fetch.post(
    '/smartfeet/app/illnessCaseList',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

export function getIllnessCaseDetail (id) {
  const data = `illnessCaseId=${id}`
  return fetch.post(
    '/smartfeet/app/illnessCaseDetail',
    data,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
