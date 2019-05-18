const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { Account, Token } = require('../model')

module.exports = (app, server) => {
  router.get('/', (req, res, next) => {
    Token.findAll({ where: { account_id: req.user.id } }).then(tokens => {
      res.json({
        message: 'Get token',
        account: req.user,
        tokens: tokens
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
    Account.findOne({ where: { id: req.user.id } }).then(account => {
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
        Token.findAll({ where: { account_id: account.id } }).then(tokens => {
          res.json({
            message: 'Get token',
            account: req.user,
            tokens: tokens,
            newToken: token
          })
        })
      })
    })
  })

  router.patch('/:id', (req, res, next) => {
    Account.findOne({ where: { id: req.user.id } }).then(account => {
      Token.update({
        account_id: account.id,
        contract_address: req.body.contractAddress,
        name: req.body.name,
        symbol: req.body.symbol,
        decimal: req.body.decimal
      }, {
        returning: true,
        where: {
          id: req.params.id,
          account_id: account.id
        }
      }).then((token) => {
        res.json({
          message: 'Patch token',
          account: req.user,
          resourceId: req.params.id,
          token: token
        })
      }).catch(next)
    })
  })

  router.delete('/:id', (req, res, next) => {
    Account.findOne({ where: { id: req.user.id } }).then(account => {
      Token.destroy({
        where: {
          id: req.params.id,
          account_id: account.id
        }
      }).then((result) => {
        Token.findAll({ where: { account_id: account.id } }).then(tokens => {
          res.json({
            message: 'Delete token',
            account: req.user,
            resourceId: req.params.id,
            tokens: tokens
          })
        })
      })
    })
  })

  return router
}
