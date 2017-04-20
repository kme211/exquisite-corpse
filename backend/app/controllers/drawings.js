const mongoose = require('mongoose')
const Drawing = mongoose.model('Drawing')
const User = mongoose.model('User')
const users = require('./users')
const omit = require('lodash/omit')
const queue = require('../../jobs/client')
const utils = require('../utils')

function newDrawing(width, height) {
  let drawing = new Drawing
  drawing.width = width
  drawing.height = height
  return drawing.save()
}

function getDrawing(id) {
  return Drawing.findOne({ '_id': id })
}

function processDrawing(id) {
  queue.enqueue('processDrawing', { id: id }, (err, job) => {
    if(err) return console.log('enqueue error: ' + err)
    console.log('enqueued', job.data)
  })
}

function saveDrawing(id, canvasData) {
  console.log('saveDrawing')
  const contributorId = canvasData.contributor.auth0_id

  const drawingPromise = getDrawing(id)
  const userPromise = User.findOne({ auth0_id: contributorId })

  return Promise.all([drawingPromise, userPromise])
    .then((responses) => {
      const drawing = responses[0]
      const user = responses[1]

      // Add drawing to contributor's drawings
      if(user.drawings.indexOf(drawing._id) === -1) user.drawings.push(drawing._id)
      
      // Add new data to drawing
      drawing.canvasData.push(canvasData)

      const saveDrawingPromise = drawing.save()
      const saveUserPromise = user.save()

      return Promise.all([saveDrawingPromise, saveUserPromise])
    }, (err) => res.status(500).send(err))
    .then((responses) => {
      const drawing = responses[0]
      // send drawing to be processed if all the canvasData has been completed
      if(utils.canvasDataIsAllThere(drawing.height, drawing.width, drawing.canvasData)) processDrawing(drawing._id)
      // remove contributors' email from response
      const data = drawing.canvasData.map(data => Object.assign({}, data, { contributor: data.contributor.picture }))
      return data
    }, (err) => res.status(500).send(err))
}

module.exports = {
  get: getDrawing,
  new: newDrawing,
  save: saveDrawing
}