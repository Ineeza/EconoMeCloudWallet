const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.json({
    message: 'Signup successful',
    account: req.account
  })
})

router.get('/test', (req, res, next) => {
  res.json({
    status : '/test'
  })
})

module.exports = router
