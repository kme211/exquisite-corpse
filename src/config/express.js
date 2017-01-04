const express = require('express')
const bodyParser = require('body-parser')
const config = require('./')
const join = require('path').join

const env = process.env.NODE_ENV || 'development'

module.exports = function(app) {
  if(env === 'development') {
    
    const webpack = require('webpack')
    const webpackConfig = require('../../webpack.config.dev.js')
    const compiler = webpack(webpackConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
  } else {
    app.use(express.static(config.root + '/public'));
  }
  
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