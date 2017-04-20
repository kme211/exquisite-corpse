const join = require('path').join;
const drawings = require('../app/controllers/drawings')
const users = require('../app/controllers/users')

module.exports = function (app) {
  // drawing routes
  app.get('/api/drawings/:width/:height', (req, res) => {
    drawings.new(req.params.width, req.params.height)
      .then((drawing) => {
        res.json({ drawingId: drawing.id })
      }, (err) => {
        res.status(500).send(err)
      })
  })

  app.get('/api/drawings/:id', (req, res) => {
    drawings.get(req.params.id)
      .then((drawing) => {
        // remove contributors' email
        drawing.canvasData = drawing.canvasData.map(data => Object.assign({}, data, { contributor: data.contributor.picture }))
        res.json(drawing)
      }, (err) => {
        res.status(500).send(err)
      })
  })

  app.post('/api/drawings', (req, res) => {
    drawings.save(req.body.id, req.body.canvasData)
      .then((data) => res.json(data), (err) =>  res.status(500).send(err))
  })

  // user routes
  app.get('/api/users/:auth0_id', (req, res) => {
    users.get(req.params.auth0_id)
      .then((user) => {
          if(!user) return res.status(404).send('User not found')
          res.json(user)
      }, (err) => {
          res.status(500).send(err)
      })
  })

  app.post('/api/users', (req, res) => {
    users.new(req.body.auth0_id, req.body.email)
      .then((user) => {
        res.json(user)
    }, (err) => {
      res.status(500).send(err)
    })
  })
}
