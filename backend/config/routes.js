const join = require('path').join;
const drawings = require('../app/controllers/drawings')

module.exports = function (app) {
  // drawing routes
  app.get('/api/drawings/:width/:height', drawings.new)
  // api routes
  app.get('/api/drawings/:id', drawings.get)
  app.post('/api/drawings', drawings.save)
}
