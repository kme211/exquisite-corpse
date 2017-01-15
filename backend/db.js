const config = require('./config')
const mongoose = require('mongoose')
const Bluebird = require('bluebird')

function connect() {
    return mongoose.connect(`mongodb://${config.db_user}:${config.db_pass}@${config.db_host}`).connection
  }

mongoose.Promise = Bluebird
if (!mongoose.connection.db) connect()
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.on('disconnected', connect)
db.once('open', console.log.bind(console, 'connected to mongodb'))

module.exports = db
