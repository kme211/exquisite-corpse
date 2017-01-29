const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
  width: Schema.Types.Number,
  height: Schema.Types.Number,
  status: {type: String, default: 'in progress'},
  url: {type: String, default: ''},
  sections:  [Schema.Types.Mixed],
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Drawing', drawingSchema, 'drawings')
