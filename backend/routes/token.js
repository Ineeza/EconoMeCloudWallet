const express = require('express')
const router = express.Router()

module.exports = (app, server) => {
  router.get('/', (req, res, next) => {
    res.json({
      message: 'Get token',
      account: req.user,
      token: req.query.secret_token
    })
  })

  router.post('/', (req, res, next) => {
    res.json({
      message: 'Post token',
      account: req.user,
      token: req.query.secret_token
    })
  })

  router.patch('/', (req, res, next) => {
    res.json({
      message: 'Patch token',
      account: req.user,
      token: req.query.secret_token
    })
  })

  router.delete('/', (req, res, next) => {
    res.json({
      message: 'Delete token',
      account: req.user,
      token: req.query.secret_token
    })
  })

  return router
}
