import axios from 'axios'
const URL = 'http://localhost:3000/api/drawings'

export function newDrawing({ width, height }) {
  return axios.get(`${URL}/${width}/${height}`)
}

export function saveDrawing(data) {
  return axios.post(URL, data)
}

export function getDrawing(id) {
  return axios.get(`${URL}/${id}`)
}
