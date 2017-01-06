const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
  canvasData: [Schema.Types.Mixed],
  date: { type: Date, default: Date.now }
})

mongoose.model('Drawing', drawingSchema)

module.exports = drawingSchema