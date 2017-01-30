import axios from 'axios'
const URL = 'http://localhost:3000/api/drawings'

export function newDrawing({ width, height }) {
  return axios.get(URL, {
    params: { width, height }
  })
}

export function saveDrawing(data) {
  return axios.post(URL, data)
}

export function getDrawing(id, params) {
  return axios.get(`${URL}/${id}`, params)
}
