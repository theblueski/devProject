import fetch from 'utils/fetch'

export function getDoctor () {
  return fetch.get(
    '/smartfeet/selectDoctorList'
  )
}

export function submitPatient (data) {
  return fetch.post('/smartfeet/submitDetails', data)
}
