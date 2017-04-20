const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  auth0_id: Schema.Types.String,
  email: Schema.Types.String,
  drawings: [{ type: Schema.Types.ObjectId, ref: 'Drawing' }]
})

module.exports = mongoose.model('User', userSchema, 'users')