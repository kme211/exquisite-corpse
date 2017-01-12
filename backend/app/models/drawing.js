const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
  width: Schema.Types.Number,
  height: Schema.Types.Number,
  canvasData: [Schema.Types.Mixed],
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Drawing', drawingSchema, 'drawings')