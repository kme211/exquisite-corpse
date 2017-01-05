const express = require('express')
const bodyParser = require('body-parser')
const config = require('./')

const env = process.env.NODE_ENV || 'development'

module.exports = function(app) {
  // set views path and template engine
  app.set('view engine', 'ejs')
  app.set('views', config.root + '/views');
  // Middleware
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  
  const myLogger = function (req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`)
    next()
  }
  app.use(myLogger)
}