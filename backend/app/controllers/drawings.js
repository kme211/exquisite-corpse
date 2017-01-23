const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')
const omit = require('lodash/omit')
const queue = require('../../jobs/client')
const isEqual = require('lodash/isEqual')

function getAllPositions({ height, width }) {
  const positions = []
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      positions.push([x, y])
    }
  }
  return positions
}

function removeContributorEmail(data) {
  if(!data.contributor) return data
  return Object.assign({}, data, { contributor: data.contributor.initials })
}

exports.new = function (req, res) {
  const width = req.params.width
  const height = req.params.height
  let drawing = new Drawing
  drawing.width = width
  drawing.height = height
  drawing.canvasData = getAllPositions({ width, height }).map(pos => {
    return { pos: pos, status: 'available' }
  })
  drawing.save((err, d) => {
    if(err) return res.send(err)
    console.log('drawing saved', d)
    res.json({
      drawingId: d.id
    })
  })
}

exports.get = function (req, res) {
  const id = req.params.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    drawing.canvasData = drawing.canvasData.map(removeContributorEmail)
    res.json(drawing)
  })
}

exports.save = function (req, res) {
  const id = req.body.id
  Drawing.findOne({ '_id': id }, (err, drawing) => {
    if(err) return res.send(err)
    if(!drawing) res.status(404).send('No drawing with that ID')
    const pos = req.body.canvasData.pos
    const index = drawing.canvasData.findIndex(data => {
      console.log('isEqual', data.pos, pos)
      return isEqual(data.pos, pos)
    })
    console.log('pos', pos, 'index', index)
    drawing.canvasData = [
      ...drawing.canvasData.slice(0, index),
      req.body.canvasData,
      ...drawing.canvasData.slice(index + 1)
    ]
    console.log(drawing.canvasData.map(data => data.pos))
    drawing.save((err, drawing) => {
      if(err) return res.send(err)
      // return the new canvasData without the contributors' email
      res.json(drawing.canvasData.map(removeContributorEmail))
      console.log('drawing saved! number of sections: ', drawing.canvasData.length)
      // if all the sections are complete, enqueue the `processDrawing` job for it
      if(drawing.canvasData.every(data => data.status === 'complete')) {
        queue.enqueue('processDrawing', { id: id }, (err, job) => {
          if(err) return console.log('enqueue error: ' + err)
          console.log('enqueued', job.data)
        })
      }

    })

  })
}
