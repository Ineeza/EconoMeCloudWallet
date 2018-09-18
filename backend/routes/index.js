const express = require('express')
const router = express.Router()

module.exports = (app, server) => {
  server.get('/signup', (req, res) => {
    if (req.cookies.token) {
      res.redirect('/')
    } else {
      return app.render(req, res, '/register', req.query)
    }
  })

  server.get('/login', (req, res, next) => {
    if (req.cookies.token) {
      res.redirect('/')
    } else {
      return app.render(req, res, '/login', req.query)
    }
  })

  server.get('/tokens', (req, res) => {
    return app.render(req, res, '/tokens', req.query)
  })

  return router
}
