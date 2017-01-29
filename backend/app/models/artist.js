const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema({
  email: Schema.Types.String,
  drawings: [{ type: Schema.Types.ObjectId, ref: 'Drawing' }]
})

artistSchema.static('findByEmail', function (email, callback) {
  return this.find({ email: email }, callback);
})

module.exports = mongoose.model('Artist', artistSchema, 'artists')
