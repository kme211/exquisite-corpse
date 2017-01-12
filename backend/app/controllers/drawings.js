const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')

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
    res.json(drawing)
  })
}

exports.save = function (req, res) {
  const id = req.body.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    if(!drawing) res.status(404).send('No drawing with that ID')
    drawing.canvasData.push(req.body.canvasData)
    drawing.save((err, d) => {
      if(err) return res.send(err)
      res.json({
        id: id
      })
    })

  })
}
