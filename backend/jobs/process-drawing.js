const Drawing = require('../app/models/drawing')
const images = require('images')
const dataUriToBuffer = require('data-uri-to-buffer')

module.exports = function processDrawing(params, callback) {
  const id = params.id
  console.log('starting image processing...')
  const drawing = Drawing.findById(id, (err, drawing) => {
    if(err) return console.log('processDrawing error: ' + err)
    console.log('found the drawing')
    let image = images(drawing.width * 500, drawing.height * 500)
    drawing.canvasData.forEach((data, i) => {
      console.log('adding section ' + i)
      const decoded = dataUriToBuffer(data.image)
      image.draw(images(decoded).resize(500), 500 * data.pos[0], 500 * data.pos[1])
    })
    image.save(`images/${id}.png`, { quality: 60 })
    console.log('done with image processing')
    callback()
  })
}
