import fetch from 'utils/fetch'

export function getDoctor () {
  return fetch.get(
    '/smartfeet/selectDoctorList'
  )
}

export function submitPatient (data) {
  return fetch.post('/smartfeet/submitPatientDetail', data)
}

export function getPatient (unionid) {
  return fetch.get('/smartfeet/getDetails', {
    params: {
      unionid
    }
  })
}
