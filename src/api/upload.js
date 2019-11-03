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
