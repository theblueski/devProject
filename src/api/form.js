import fetch from 'utils/fetch'

export function getDoctor () {
  return fetch.get(
    '/smartfeet/selectDoctorList'
  )
}

export function submitPatient (data) {
  return fetch.post('/smartfeet/submitPatientDetail', data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getPatient (data) {
  return fetch.post('/smartfeet/getDetails', data)
}
