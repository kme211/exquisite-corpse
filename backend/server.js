require('dotenv').config();
const fs = require('fs')
const join = require('path').join
const express = require('express')
const config = require('./config')
const db = require('./db')

const models = join(__dirname, 'app/models')
const port = process.env.PORT || 3000;
const app = express()

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connected to mongodb'))

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .filter(file => !file.match('.test.'))
  .forEach(file => require(join(models, file)))

// Bootstrap routes
require('./config/express')(app)
require('./config/routes')(app)

db.once('open', listen)

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port)
  console.log('Exquisite Corpse app started on port ' + port)
}

module.exports = app
