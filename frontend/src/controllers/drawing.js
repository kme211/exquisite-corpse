import axios from 'axios'
const URL = 'http://localhost:3000/api/drawings'

export function newDrawing() {
  return axios.get(URL)
}

export function saveDrawing(data) {
  console.log('data', data)
  return axios.post(URL, data)
}
