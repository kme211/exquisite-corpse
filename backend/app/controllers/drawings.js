const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')

exports.new = function (req, res) {
  let drawing = new Drawing;
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
  const id = req.params.id
  const part = parseInt(req.params.part);
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    drawing.canvasData.push(req.body)
    drawing.save((err, d) => {
      if(err) return console.log(err)
      res.json({
        id: id,
        nextPartNumber: (part + 1)
      })
    })

  })
}