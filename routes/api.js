const router = require('express').Router()
const mongoose = require('mongoose')
const drawingSchema = require('../models/drawings')

const Drawing = mongoose.model('Drawing', drawingSchema)

router.get('/drawings/:id', getDrawing)
router.post('/drawings/save/:id/:part', saveDrawing)

function getDrawing(req, res) {
  const id = req.params.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    res.json(drawing)
  })
}


function saveDrawing(req, res) {
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

module.exports = router;
