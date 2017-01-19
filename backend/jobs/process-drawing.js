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


module.exports = function processDrawing(params, callback) {
  const id = params.id
  const drawing = Drawing.findById(id, (err, drawing) => {
    if(err) return console.log('processDrawing error: ' + err)
    let image = images(drawing.width * 500, drawing.height * 500)
    drawing.canvasData.forEach((data, i) => {
      const decoded = dataUriToBuffer(data.image)
      image.draw(images(decoded).resize(500), 500 * data.pos[0], 500 * data.pos[1])
    })
    image.save(`images/${id}.png`, { quality: 60 }) 
    cloudinary.uploader.upload(`images/${id}.png`, (result) => {
      fs.unlink(`images/${id}.png`, () => {})
      drawing.canvasData = drawing.canvasData.map((data) => {
        return Object.assign({}, data, { image: null })
      })
      drawing.status = 'complete'
      drawing.url = result.url
      drawing.save((err, drawing) => {
        if(err) return console.log('drawing save error in jobs/process-drawing')
        callback()
      })
    })
  })
}