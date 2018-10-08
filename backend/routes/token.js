const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { Account, Token } = require('../model')

module.exports = (app, server) => {
  router.get('/', (req, res, next) => {
    Account.findOne({ where: { email: req.user.email } }).then(account => {
      Token.findAll().then(tokens => {
        res.json({
          message: 'Get token',
          account: req.user,
          tokens: tokens
        })
      })
    })
  })

  router.post('/', [
    check('contractAddress').exists(),
    check('name').exists(),
    check('symbol').exists(),
    check('decimal').exists()
  ], (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    Account.findOne({ where: { email: req.user.email } }).then(account => {
      Token.findOrCreate({
        where: {
          contract_address: req.body.contractAddress
        },
        defaults: {
          account_id: account.id,
          contract_address: req.body.contractAddress,
          name: req.body.name,
          symbol: req.body.symbol,
          decimal: req.body.decimal
        } }).then(token => {
        res.json({
          message: 'Post token',
          account: req.user,
          token: token
        })
      })
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
