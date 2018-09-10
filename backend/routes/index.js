const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = (app, server) => {
  server.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return app.render(req, res, '/', req.query)
  })

  server.get('/signup', (req, res, next) => {
    return app.render(req, res, '/register', req.query)
  })

  router.post('/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.writeHead(302, { Location: '/login' })
      res.end()
      res.finished = true
    })

  router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, account, info) => {
      try {
        if (err || !account) {
          return app.render(req, res, '/errors/error400page', req.query)
        }
        req.login(account, { session: false }, async (error) => {
          if (error) return next(error)
          const body = { _id: account._id, email: account.email }
          const token = jwt.sign({ account: body }, 'top_secret')
          res.writeHead(302, { Location: '/' })
          res.end()
          res.finished = true
        })
      } catch (error) {
        return app.render(req, res, '/errors/error400page', req.query)
      }
    })(req, res, next)
  })

  server.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    return app.render(req, res, '/dashboard', req.query)
  })

  server.get('/tokens', (req, res) => {
    return app.render(req, res, '/tokens', req.query)
  })

  // server.get('/tokens/:id', (req, res) => {
  //   return app.render(req, res, '/tokens', { id: req.params.id })
  // })

  return router
}
