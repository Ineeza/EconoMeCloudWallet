const express = require('express')
const router = express.Router()
const { Account, Keystore, Token } = require('../model')

module.exports = (app, server) => {
  router.get('/', (req, res, next) => {
    res.json({
      message: 'Get token',
      account: req.user
    })
  })

  router.post('/', (req, res, next) => {
    res.json({
      message: 'Post token',
      account: req.user
    })
  })

  router.patch('/:id', (req, res, next) => {
    res.json({
      message: 'Patch token',
      account: req.user,
      resourceId: req.params.id
    })
  })

  router.delete('/:id', (req, res, next) => {
    res.json({
      message: 'Delete token',
      account: req.user,
      resourceId: req.params.id
    })
  })

  return router
}
