const router = require('express').Router()
const mongoose = require('mongoose')
const drawingSchema = require('../models/drawings')

const Drawing = mongoose.model('Drawing', drawingSchema)

router.get('/', function(req, res) {
  res.send('drawings!')
})
router.get('/:id/:part', getDrawing)
router.get('/new', newDrawing)

function newDrawing(req, res) {
  let drawing = new Drawing;
  drawing.save((err, d) => {
    if(err) return res.send(err)
    res.redirect(`/drawings/${d.id}/0`)
  })
}

function getDrawing(req, res) {
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

module.exports = router;
