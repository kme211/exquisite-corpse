const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')
const omit = require('lodash/omit')
const queue = require('../../jobs/client')

exports.new = function (req, res) {
  const width = req.params.width
  const height = req.params.height
  let drawing = new Drawing
  drawing.width = width
  drawing.height = height
  drawing.save((err, d) => {
    if(err) return res.send(err)
    res.json({
      drawingId: d.id
    })
  })
}

exports.get = function (req, res) {
  const id = req.params.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    drawing.canvasData = drawing.canvasData.map(data => Object.assign({}, data, { contributor: data.contributor.initials }))
    res.json(drawing)
  })
}

exports.save = function (req, res) {
  const id = req.body.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    if(!drawing) res.status(404).send('No drawing with that ID')
    drawing.canvasData.push(req.body.canvasData)
    drawing.save((err, drawing) => {
      if(err) return res.send(err)
      res.json(drawing.canvasData.map(data => Object.assign({}, data, { contributor: data.contributor.initials })))
      console.log('drawing saved! number of sections: ', drawing.canvasData.length)
      if(drawing.canvasData.length === (drawing.width * drawing.height)) {
        queue.enqueue('processDrawing', { id: id }, (err, job) => {
          if(err) return console.log('enqueue error: ' + err)
          console.log('enqueued', job.data)
        })
      }

    })

  })
}
