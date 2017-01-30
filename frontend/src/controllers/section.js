import axios from 'axios'
const URL = 'http://localhost:3000/api/sections'

export function getSection(id) {
  return axios.get(`${URL}/${id}`)
}

export function saveSection({ id, artist, image, drawing }) {
  return axios.post(`${URL}/${id}`, { artist, image, drawing })
}
