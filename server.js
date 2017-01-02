require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const api = require('./routes/api')
const drawings = require('./routes/drawings')
const { DB_USER, DB_PASS, DB_HOST } = process.env;

app.set('view engine', 'ejs')

// Database
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}`);

// Middleware
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const myLogger = function (req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
}

app.use(myLogger)

// Routes
app.use('/api', api)
app.use('/drawings', drawings)

app.listen(3000, () => {
  console.log('Exquisite Corpse listening on port 3000!')
})
