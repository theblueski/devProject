import fetch from 'utils/fetch'

export function page (query) {
  return fetch({
    url: '/api/oa/bpm/category/page',
    method: 'get',
    params: query
  })
}
