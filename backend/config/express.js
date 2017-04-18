const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')
const logger = require('morgan')
const config = require('./')

const env = process.env.NODE_ENV || 'development'

module.exports = function(app) {
  app.use(cors())
  // set views path and template engine
  app.set('view engine', 'ejs')
  app.set('views', config.root + '/views');
  // Middleware
  app.use(logger('dev'))
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  app.use(cookieParser())

  const authenticate = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
  })

  app.use('/', authenticate)

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token');
    }
  })
}
