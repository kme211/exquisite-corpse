const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')

exports.newDrawing = function (req, res) {
  let drawing = new Drawing;
  drawing.save((err, d) => {
    if(err) return res.send(err)
    res.redirect(`/drawings/${d.id}/0`)
  })
}

exports.getDrawing = function (req, res) {
  const id = req.params.id;
  const part = req.params.part;
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    if(part === 'final') {
      return res.render('final', { id: drawing.id })
    }
    let locked = drawing.canvasData[part] ? true : false;
    if(locked) return res.render('locked', { title: `Drawing ${drawing.id}`, part: part  })
    res.render('index', { id: drawing.id, title: `Drawing ${drawing.id}`, part: part })
  })
}

exports.getDrawingJSON = function (req, res) {
  const id = req.params.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    res.json(drawing)
  })
}

exports.saveDrawing = function (req, res) {
  const id = req.params.id
  const part = parseInt(req.params.part);
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    drawing.canvasData.push(req.body)
    drawing.save((err, d) => {
      if(err) return console.log(err)
      res.json({
        nextUrl: `http://${req.hostname}/drawings/${id}/${part+1}`
      })
    })

  })
}