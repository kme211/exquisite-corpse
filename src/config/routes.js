const drawings = require('../controllers/drawings')

module.exports = function (app) {
  // drawing routes
  app.get('/drawings/:id/:part', drawings.getDrawing)
  app.get('/drawings/new', drawings.newDrawing)
  // api routes
  app.get('/api/drawings/:id', drawings.getDrawingJSON)
  app.post('/api/drawings/save/:id/:part', drawings.saveDrawing)
}