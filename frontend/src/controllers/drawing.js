import axios from 'axios'

export function newDrawing({ width, height }) {
  return axios.get(`drawings/${width}/${height}`)
}

export function saveDrawing(data) {
  return axios.post('drawings', data)
}

export function getDrawing(id) {
  return axios.get(`drawings/${id}`)
}