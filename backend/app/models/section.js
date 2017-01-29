const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sectionSchema = new Schema({
  artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  drawing: { type: Schema.Types.ObjectId, ref: 'Drawing' },
  status: Schema.Types.String,
  x: Schema.Types.Number,
  y: Schema.Types.Number,
  image: Schema.Types.String,
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Section', sectionSchema, 'sections')
