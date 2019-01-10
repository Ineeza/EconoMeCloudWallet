const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

module.exports = (app, server) => {
  router.post('/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      if (req.user.error !== undefined) {
        if (req.user.error === '409') {
          return res.send(409)
        }
      }
      res.json({
        message: 'Signup successful',
        account: req.user
      })
    })

  router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, account, info) => {
      try {
        if (err || !account) {
          return res.json({ error: 'Something happen' })
        }
        req.login(account, { session: false }, async (error) => {
          if (error) return next(error)
          const body = { _id: account._id, email: account.email }
          const token = jwt.sign({ account: body }, 'top_secret')
          return res.json({ token })
        })
      } catch (error) {
        return res.json({ error: 'Something happen' })
      }
    })(req, res, next)
  })

  return router
}
