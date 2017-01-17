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

export function addDrawingToLibrary(id) {
  let appData = JSON.parse(window.localStorage.getItem('exquisite-corpse'))
  if(appData.drawings.find(drawingId => drawingId === id)) return
  appData = JSON.stringify(Object.assign({}, appData, { drawings: appData.drawings.concat(id) }))
  window.localStorage.setItem('exquisite-corpse', appData)
}

export function getAllDrawings() {
  console.log('get all drawings')
  let appData = JSON.parse(window.localStorage.getItem('exquisite-corpse'))
  return appData.drawings
}