import axios from 'axios'

export function getUser(auth0_id) {
  console.log('controllers/user.getUser()', auth0_id)
  return axios.get(`users/${auth0_id}`)
}

export function newUser(auth0_id, email) {
  console.log('controllers/user.newUser()', auth0_id, email)
  const data = {
    auth0_id,
    email
  }
  return axios.post('users', data)
}