import fetch from 'utils/fetch'

export function uploadImage (data) {
  return fetch({
    url: '/api/oa/bpm/category/page',
    method: 'post',
    data
  })
}
