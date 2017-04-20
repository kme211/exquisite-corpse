const fs = require('fs')
const Drawing = require('../app/models/drawing')
const images = require('images')
const dataUriToBuffer = require('data-uri-to-buffer')
const config = require('../config')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret
})

const overlapSizePx = 25 / 2
const sectionSizePx = 500

module.exports = function processDrawing(params, callback) {
  const id = params.id
  console.log('starting image processing...')
  const drawing = Drawing.findById(id, (err, drawing) => {
    if(err) return console.log('processDrawing error: ' + err)
    console.log('found the drawing')
    const height = (drawing.width * sectionSizePx) - ((drawing.width - 1) * overlapSizePx) 
    let image = images(drawing.width * sectionSizePx, drawing.height * sectionSizePx)
    drawing.canvasData.forEach((data, i) => {
      console.log('adding section ' + i)
      const decoded = dataUriToBuffer(data.image)
      const posX = data.pos[0]
      const posY = data.pos[1]
      const x = posX === 0 ? 0 : (sectionSizePx * posX) - overlapSizePx
      const y = posY === 0 ? 0 : (sectionSizePx * posY) - overlapSizePx

      image.draw(images(decoded).resize(sectionSizePx), x, y)
    })
    image.save(`images/${id}.png`, { quality: 60 }) 
    cloudinary.uploader.upload(`images/${id}.png`, (result) => {
      console.log('image uploaded to cloudinary', result)
      fs.unlink(`images/${id}.png`, () => {
        console.log('image removed from node server')
      })
      drawing.canvasData = drawing.canvasData.map((data) => {
        return Object.assign({}, data, { image: null })
      })
      drawing.status = 'complete'
      drawing.url = result.url
      drawing.save((err, drawing) => {
        if(err) return console.log('drawing save error in jobs/process-drawing')
        console.log('drawing saved')
        callback()
      })
    })
  })
}