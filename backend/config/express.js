const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')
const morgan = require('morgan')
const config = require('./')



module.exports = function(app) {
  app.use(cors())
  // set views path and template engine
  app.set('view engine', 'ejs')
  app.set('views', config.root + '/views');
  // Middleware
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  
  const logger = app.get('env') === 'production' ? morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  }) : morgan('dev')

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

  app.use(logger)
}
