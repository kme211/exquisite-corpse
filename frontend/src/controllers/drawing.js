import axios from 'axios'

const drawings = axios.create({
  baseURL: 'http://localhost:3000/api/drawings/',
  timeout: 1000
})

export function newDrawing({ width, height }) {
  return drawings.get(`${width}/${height}`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') }})
}

export function saveDrawing(data) {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') } }
  return drawings.post('', data, config)
}

export function getDrawing(id) {
  return drawings.get(id, {headers: { 'Authorization': 'Bearer ' + localStorage.getItem('id_token') }})
}