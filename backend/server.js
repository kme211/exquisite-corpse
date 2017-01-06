require('dotenv').config();
const fs = require('fs')
const join = require('path').join
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const models = join(__dirname, 'app/models')
const port = process.env.PORT || 3000;
const app = express()

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)))
  
// Bootstrap routes
require('./config/express')(app)
require('./config/routes')(app)

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port)
  console.log('Exquisite Corpse app started on port ' + port)
}

function connect() {
  return mongoose.connect(`mongodb://${config.db_user}:${config.db_pass}@${config.db_host}`).connection
}

module.exports = app