const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema({
  email: Schema.Types.String,
  drawings: [{ type: Schema.Types.ObjectId, ref: 'Drawing' }]
})

artistSchema.static('findByEmail', function (email) {
  return this.findOne({ email: email })
})

module.exports = mongoose.model('Artist', artistSchema, 'artists')
