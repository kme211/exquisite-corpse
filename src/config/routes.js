const join = require('path').join;
const drawings = require('../controllers/drawings')

module.exports = function (app) {
  app.get('*', (req, res) => {
    res.sendFile(join( __dirname, '../frontend/index.html'))
  })
  // drawing routes
  app.get('/drawings/:id/:part', drawings.showDrawing)
  app.get('/drawings/new', drawings.newDrawing)
  // api routes
  app.get('/api/drawings/:id', drawings.getDrawing)
  app.post('/api/drawings/save/:id/:part', drawings.saveDrawing)
}