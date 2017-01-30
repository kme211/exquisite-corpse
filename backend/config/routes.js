const join = require('path').join;
const drawings = require('../app/controllers/drawings')
const sections = require('../app/controllers/sections')

module.exports = function (app) {
  // drawing routes
  app.get('/api/drawings', drawings.new)
  // api routes
  app.get('/api/drawings/:id', drawings.get)
  app.post('/api/drawings', drawings.save)
  app.get('/api/sections/:id', sections.getSurroundingSections)
  app.post('/api/sections/:id', sections.save)
}
